// HEADLESS — Merge Unnamed Layers
// Merges all layers that are NOT named: player, num1, num2, size
// into a single flat layer. Named text layers stay untouched.
////#target photoshop  // not needed when run via COM

try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

var P = _EP;

function kpLog(msg) {
  try { var lf=new File(_KP_LOG);lf.encoding='UTF-8';lf.open('a');lf.writeln(msg);lf.close(); } catch(e){$.writeln(msg);}
}

// Reserved layer names — these will NOT be merged
var RESERVED = { 'player':1,'num1':1,'num2':1,'size':1,'num':1 };

// Recursively collect all layers into a flat list (top-to-bottom)
function collectAll(container, out) {
  for (var i = 0; i < container.layers.length; i++) {
    var lyr = container.layers[i];
    out.push(lyr);
    if (lyr.typename === 'LayerSet') {
      collectAll(lyr, out);
    }
  }
  return out;
}

try {
  if (!app.documents.length) {
    kpLog("ERROR:NO_DOC:No document is open in Photoshop.");
    throw new Error("no doc");
  }

  var doc = app.activeDocument;
  var mergeName = P.mergeName || 'design';

  // ── 1. Collect top-level layers only for merging ──
  // We operate on top-level because merging inside groups gets complex.
  // Groups themselves are treated as unnamed unless their name is reserved.
  var allTop = doc.layers;
  var toMerge = [];    // layers to merge (unnamed)
  var toKeep  = [];    // layers to keep separate (named text layers)

  for (var i = 0; i < allTop.length; i++) {
    var lyr = allTop[i];
    var lname = lyr.name.toLowerCase().replace(/\s+/g,'');
    if (RESERVED[lname]) {
      toKeep.push(lyr.name);
    } else {
      toMerge.push(lyr);
    }
  }

  kpLog("PROGRESS:0:3:Scanning layers|" + toMerge.length + " to merge, " + toKeep.length + " to keep||inf");

  if (toMerge.length === 0) {
    kpLog("DONE:No unnamed layers to merge — all layers are already named.");
    throw new Error("nothing to merge");
  }

  if (toMerge.length === 1) {
    // Only one unnamed layer — just rename it
    toMerge[0].name = mergeName;
    kpLog("DONE:Only one unnamed layer — renamed to '" + mergeName + "'.");
    throw new Error("done single");
  }

  // ── 2. Select all unnamed layers ──
  // Deselect all first via clicking the first unnamed layer
  app.activeDocument = doc;

  // Use action descriptors to select multiple layers
  // First: make one unnamed layer active, then Ctrl+click the rest
  doc.activeLayer = toMerge[0];

  for (var j = 1; j < toMerge.length; j++) {
    // Use the scriptListener approach to add to selection
    var desc = new ActionDescriptor();
    var ref  = new ActionReference();
    ref.putName(charIDToTypeID('Lyr '), toMerge[j].name);
    desc.putReference(charIDToTypeID('null'), ref);
    desc.putEnumerated(stringIDToTypeID('selectionModifier'),
                       stringIDToTypeID('selectionModifierType'),
                       stringIDToTypeID('addToSelection'));
    desc.putBoolean(charIDToTypeID('MkVs'), false);
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
  }

  kpLog("PROGRESS:1:3:Selected " + toMerge.length + " unnamed layers|Merging…||inf");

  // ── 3. Merge selected layers (Merge Layers command) ──
  executeAction(charIDToTypeID('Mrg2'), undefined, DialogModes.NO);

  // ── 4. Rename the merged result ──
  doc.activeLayer.name = mergeName;

  kpLog("PROGRESS:2:3:Merged into '" + mergeName + "'|" + toMerge.length + " layers merged||inf");

  // ── 5. Move merged layer to bottom (below named layers) ──
  var mergedLyr = doc.activeLayer;
  mergedLyr.move(doc.artLayers[doc.artLayers.length - 1], ElementPlacement.PLACEAFTER);

  kpLog("PROGRESS:3:3:'" + mergeName + "' moved to bottom||inf");
  kpLog("DONE:Merged " + toMerge.length + " unnamed layers into '" + mergeName + "'. Kept: " + toKeep.join(', '));

} catch(e) {
  if (e.message !== "no doc" && e.message !== "nothing to merge" && e.message !== "done single") {
    kpLog("ERROR:" + e.message);
  }
}
