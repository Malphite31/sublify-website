// HEADLESS — Add Size Text Layer
// Adds a white text layer named "size" at the bottom-center of the active document.
// Font: Arial Bold, 12pt, white, anti-alias Smooth.
// If a "size" layer already exists, updates it instead of adding a new one.
////#target photoshop  // not needed when run via COM

try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

var P = _EP;

function kpLog(msg) {
  try { var lf=new File(_KP_LOG);lf.encoding='UTF-8';lf.open('a');lf.writeln(msg);lf.close(); } catch(e){$.writeln(msg);}
}

// Recursively find a layer named "size" (case-insensitive)
function findSizeLayer(container) {
  for (var i = 0; i < container.artLayers.length; i++) {
    if (container.artLayers[i].name.toLowerCase() === 'size') return container.artLayers[i];
  }
  for (var j = 0; j < container.layerSets.length; j++) {
    var found = findSizeLayer(container.layerSets[j]);
    if (found) return found;
  }
  return null;
}

try {
  if (!app.documents.length) {
    kpLog("ERROR:NO_DOC:No document is open. Please open your PSD first.");
    throw new Error("no doc");
  }

  var doc    = app.activeDocument;
  var params = P;

  // Read config from params (with sensible defaults)
  var fontSize   = parseFloat(params.fontSize)   || 12;   // pt
  var fontName   = params.fontName               || "ArialMT";  // PostScript name
  var fontBold   = (params.fontBold !== false);            // default true
  var textColor  = params.textColor              || "#ffffff"; // hex
  var layerName  = params.layerName              || "size";
  var sampleText = params.sampleText             || "MEDIUM";
  var marginPct  = parseFloat(params.marginPct)  || 2;    // % from bottom

  // Save + set ruler to pixels
  var savedUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.PIXELS;

  var docW = doc.width.as('px');
  var docH = doc.height.as('px');

  // ── Parse hex color ──
  function hexToRgb(hex) {
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return {
      r: parseInt(hex.substring(0,2),16),
      g: parseInt(hex.substring(2,4),16),
      b: parseInt(hex.substring(4,6),16)
    };
  }
  var rgb = hexToRgb(textColor);
  var color = new SolidColor();
  color.rgb.red   = rgb.r;
  color.rgb.green = rgb.g;
  color.rgb.blue  = rgb.b;

  // ── Find existing size layer or create new one ──
  var existing = findSizeLayer(doc);
  var textLayer;

  if (existing && existing.kind === LayerKind.TEXT) {
    // Update existing layer
    textLayer = existing;
    kpLog("PROGRESS:0:1:Found existing 'size' layer|Updating…||inf");
  } else {
    // Create new text layer at top of stack
    textLayer = doc.artLayers.add();
    textLayer.kind = LayerKind.TEXT;
    textLayer.name = layerName;
    kpLog("PROGRESS:0:1:Creating new 'size' layer|Adding…||inf");
  }

  // ── Configure text item ──
  var ti = textLayer.textItem;
  ti.kind       = TextType.POINTTEXT;
  ti.contents   = sampleText;
  ti.size       = UnitValue(fontSize, 'pt');
  ti.color      = color;
  ti.antiAliasMethod = AntiAlias.SMOOTH;
  ti.justification   = Justification.CENTER;

  // Try to set font — fall back gracefully
  try {
    if (fontBold) {
      try { ti.font = "Arial-BoldMT"; } catch(_) {
        try { ti.font = "ArialMT"; }    catch(_) {}
      }
    } else {
      try { ti.font = "ArialMT"; } catch(_) {}
    }
  } catch(_) {}

  // ── Position: horizontally centered, near bottom ──
  // After setting contents, bounds are available
  var b = textLayer.bounds;
  var tw = b[2].value - b[0].value; // text width
  var th = b[3].value - b[1].value; // text height

  var marginPx = Math.round(docH * (marginPct / 100));
  var posX = Math.round((docW - tw) / 2);          // center horizontally
  var posY = Math.round(docH - marginPx - th);      // near bottom

  ti.position = [UnitValue(posX, 'px'), UnitValue(posY, 'px')];

  // ── Move layer to top of stack so it's accessible ──
  textLayer.move(doc.artLayers[0], ElementPlacement.PLACEBEFORE);

  app.preferences.rulerUnits = savedUnits;

  kpLog("DONE:Size layer '" + layerName + "' added at bottom-center (" + Math.round(posX) + ", " + Math.round(posY) + ")px.");

} catch(e) {
  if (e.message !== "no doc") kpLog("ERROR:" + e.message);
}
