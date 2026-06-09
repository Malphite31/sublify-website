// HEADLESS — Copy to Small Size
// Copies visible layers from active PSD → Small_Size.psd.
// Each layer is scaled to fit the small doc dimensions and centered.
// The Small_Size.psd template is NEVER resized — only the pasted content is scaled.
// Result saved to output folder (or temp), original template unmodified.
try { try { app.bringToFront(); } catch(_) {} } catch(_) {}
try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

var P = _EP;

function kpLog(msg) {
  try { var lf=new File(_KP_LOG);lf.encoding='UTF-8';lf.open('a');lf.writeln(msg);lf.close(); } catch(e){$.writeln(msg);}
}

function centerLayer(layer, docWidth, docHeight) {
  try {
    var bounds = layer.bounds;
    var layerW = bounds[2].as('px') - bounds[0].as('px');
    var layerH = bounds[3].as('px') - bounds[1].as('px');
    var offsetX = (docWidth - layerW) / 2 - bounds[0].as('px');
    var offsetY = (docHeight - layerH) / 2 - bounds[1].as('px');
    layer.translate(offsetX, offsetY);
  } catch(e) {
    kpLog("WARN:Could not center layer '" + layer.name + "': " + e.message);
  }
}

try {
  // ── 1. Validate source document ──
  if (!app.documents.length) {
    kpLog("ERROR:NO_DOC:No document is open. Please open your PSD first.");
    throw new Error("no doc");
  }

  var sourceDoc = app.activeDocument;
  var sourceName = sourceDoc.name;
  var savedUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.INCHES;
  var srcWin = sourceDoc.width.as('in');
  var srcHin = sourceDoc.height.as('in');

  var allLayers = sourceDoc.layers;
  var totalLayers = 0;
  for (var ci = 0; ci < allLayers.length; ci++) {
    if (allLayers[ci].visible) totalLayers++;
  }

  kpLog("PROGRESS:0:" + (totalLayers + 2) + ":" + sourceName +
        "|" + Math.round(srcWin * 100) / 100 + "\" \u00d7 " +
              Math.round(srcHin * 100) / 100 + "\"|source|inf");

  // ── 2. Open Small_Size.psd ──
  var smallFile = new File(P.smallPsdPath);
  if (!smallFile.exists) {
    kpLog("ERROR:Small_Size.psd not found at: " + P.smallPsdPath);
    throw new Error("no small psd");
  }

  var smallDoc = app.open(smallFile);
  kpLog("PROGRESS:1:" + (totalLayers + 2) + ":Opened Small_Size.psd||Small_Size.psd|inf");

  app.preferences.rulerUnits = Units.INCHES;
  var smallWin = smallDoc.width.as('in');
  var smallHin = smallDoc.height.as('in');
  app.preferences.rulerUnits = Units.PIXELS;
  var smallPxW = smallDoc.width.as('px');
  var smallPxH = smallDoc.height.as('px');
  app.preferences.rulerUnits = savedUnits;

  // ── 3. Copy layers, scale to fit, center in canvas ──
  app.activeDocument = sourceDoc;
  var done = 0;
  var scalePercent = Math.min(smallWin / srcWin, smallHin / srcHin) * 100;

  for (var li = allLayers.length - 1; li >= 0; li--) {
    var lyr = allLayers[li];

    if (!lyr.visible) {
      kpLog("WARN:Skipping hidden layer: " + lyr.name);
      continue;
    }

    try {
      var newLyr = lyr.duplicate(smallDoc, ElementPlacement.PLACEATBEGINNING);
      if (scalePercent < 100) {
        newLyr.resize(scalePercent, scalePercent, AnchorPosition.MIDDLECENTER);
        kpLog("INFO:Scaled layer '" + lyr.name + "' to " + Math.round(scalePercent) + "%");
      }
      centerLayer(newLyr, smallPxW, smallPxH);
      done++;
      kpLog("PROGRESS:" + (done + 1) + ":" + (totalLayers + 2) + ":" + lyr.name +
            "|" + (lyr.typename === 'LayerSet' ? 'Group' : 'Layer') + "||inf");
    } catch(e) {
      kpLog("WARN:Could not copy layer '" + lyr.name + "': " + e.message);
    }
  }

  // ── 4. Save to output folder (or temp if none selected) ──
  app.activeDocument = smallDoc;

  var baseName   = sourceName.replace(/\.psd$/i, '').replace(/[\\\/\:\*\?\"\<\>\|]/g, '_');
  var outFolder  = P.outputFolder ? new Folder(P.outputFolder) : Folder.temp;
  if (!outFolder.exists) outFolder = Folder.temp;
  var saveFile   = new File(outFolder.fsName + "/" + baseName + "_SmallSize.psd");

  var psdOpts = new PhotoshopSaveOptions();
  psdOpts.embedColorProfile     = true;
  psdOpts.maximizeCompatibility = true;
  psdOpts.layers                = true;
  smallDoc.saveAs(saveFile, psdOpts, true);

  // ── 5. Close smallDoc WITHOUT saving changes to original template ──
  smallDoc.close(SaveOptions.DONOTSAVECHANGES);

  kpLog("DONE:Copied " + done + " visible layers (scaled to fit). Output at: " + saveFile.fsName);
  kpLog("OUTPUT_FOLDER:" + outFolder.fsName);
  kpLog("SMALL_PSD:" + saveFile.fsName);

} catch(e) {
  if (e.message !== "no doc" && e.message !== "no small psd") {
    kpLog("ERROR:" + e.message);
  }
}
