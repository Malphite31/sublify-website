// HEADLESS — Team Banner
// Copies all visible layers from active PSD → banner.psd
// Layer order matches source exactly (top layer stays on top).
// Hidden layers are skipped. Centres each layer in the banner canvas.
// Closes banner template without saving so it's never modified.
try { try { app.bringToFront(); } catch(_) {} } catch(_) {}
try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

var P = _EP;

function kpLog(msg) {
  try { var lf=new File(_KP_LOG);lf.encoding='UTF-8';lf.open('a');lf.writeln(msg);lf.close(); } catch(e){$.writeln(msg);}
}

function centerLayer(layer, doc) {
  try {
    var bounds = layer.bounds;
    var lw = bounds[2].value - bounds[0].value;
    var lh = bounds[3].value - bounds[1].value;
    var dw = doc.width.value;
    var dh = doc.height.value;
    var offX = (dw - lw) / 2 - bounds[0].value;
    var offY = (dh - lh) / 2 - bounds[1].value;
    layer.translate(offX, offY);
  } catch(e) {
    kpLog("WARN:Could not center layer '" + layer.name + "': " + e.message);
  }
}

try {
  if (!app.documents.length) {
    kpLog("ERROR:NO_DOC:No document is open. Please open your PSD first.");
    throw new Error("no doc");
  }

  var sourceDoc  = app.activeDocument;
  var sourceName = sourceDoc.name;

  var allLayers   = sourceDoc.layers;
  var totalLayers = 0;
  for (var ci = 0; ci < allLayers.length; ci++) {
    if (allLayers[ci].visible) totalLayers++;
  }

  kpLog("PROGRESS:0:" + (totalLayers + 2) + ":" + sourceName + "||source|inf");

  var bannerFile = new File(P.bannerPsdPath);
  if (!bannerFile.exists) {
    kpLog("ERROR:banner.psd not found at: " + P.bannerPsdPath);
    throw new Error("no banner psd");
  }

  var bannerDoc = app.open(bannerFile);
  kpLog("PROGRESS:1:" + (totalLayers + 2) + ":Opened banner.psd||banner.psd|inf");

  app.activeDocument = sourceDoc;
  var done = 0;

  for (var li = allLayers.length - 1; li >= 0; li--) {
    var lyr = allLayers[li];

    if (!lyr.visible) {
      kpLog("WARN:Skipping hidden layer: " + lyr.name);
      continue;
    }

    try {
      lyr.duplicate(bannerDoc, ElementPlacement.PLACEATBEGINNING);
      done++;
      kpLog("PROGRESS:" + (done + 1) + ":" + (totalLayers + 2) + ":" + lyr.name +
            "|" + (lyr.typename === 'LayerSet' ? 'Group' : 'Layer') + "||inf");
    } catch(e) {
      kpLog("WARN:Could not copy layer '" + lyr.name + "': " + e.message);
    }
  }

  // Center all duplicated layers in banner doc
  app.activeDocument = bannerDoc;
  for (var li2 = 0; li2 < bannerDoc.layers.length; li2++) {
    centerLayer(bannerDoc.layers[li2], bannerDoc);
  }

  var outFolder = (P.outputFolder && P.outputFolder.length)
    ? new Folder(P.outputFolder)
    : sourceDoc.path;

  var baseName  = sourceName.replace(/\.psd$/i, '').replace(/[\\\/\:\*\?\"\<\>\|]/g, '_');
  var outName   = (P.outputName && P.outputName.length) ? P.outputName : (baseName + "_banner");
  var savePath  = outFolder.fsName + "/" + outName + ".psd";
  var saveFile  = new File(savePath);

  var psdOpts = new PhotoshopSaveOptions();
  psdOpts.embedColorProfile     = true;
  psdOpts.maximizeCompatibility = true;
  psdOpts.layers                = true;
  bannerDoc.saveAs(saveFile, psdOpts, true);
  bannerDoc.close(SaveOptions.DONOTSAVECHANGES);

  kpLog("DONE:Copied " + done + " visible layers to banner. File saved.");
  kpLog("OUTPUT_FOLDER:" + outFolder.fsName);
  kpLog("BANNER_PSD:" + saveFile.fsName);

} catch(e) {
  if (e.message !== "no doc" && e.message !== "no banner psd") {
    kpLog("ERROR:" + e.message);
  }
}
