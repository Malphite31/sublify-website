#target photoshop
try { app.bringToFront(); } catch(e) {}
try { app.displayDialogs = DialogModes.NO; } catch(e) {}

var P = _EP;

function kpLog(msg) {
  try {
    var f = new File(_KP_LOG);
    f.encoding = "UTF-8";
    f.open("a");
    f.write(msg);
    f.close();
  } catch(e) { $.writeln(msg); }
}

function main() {
  if (app.documents.length === 0) {
    kpLog("ERROR:No document open\n");
    return;
  }

  var doc = app.activeDocument;
  var csvLines = P.csvText.split("\n").filter(function(l) { return l.trim().length > 0; });
  if (csvLines.length < 2) {
    kpLog("ERROR:No data rows in CSV\n");
    return;
  }

  var headers = csvLines[0].split(",").map(function(h) { return h.trim(); });
  if (P.useFirstRowAsHeaders) { csvLines.shift(); }

  var outFolder = new Folder(P.folder);
  if (!outFolder.exists) outFolder.create();

  var productType = P.productType || P.sizeMapping;
  var mappingName = P.mappingName || P.sizeMapping;
  
  var sizeCol = P.columns.indexOf(productType === "Men Sleeves" || productType === "Sleeves" ? "sleevesSize" : (productType === "Shorts" ? "shortsSize" : "jerseySize"));
  var playerCol = P.columns.indexOf("player");
  var numCol = P.columns.indexOf("num");

  for (var i = 0; i < csvLines.length; i++) {
    var cols = csvLines[i].split(",");
    var player = cols[playerCol] ? cols[playerCol].trim() : "";
    var number = cols[numCol] ? cols[numCol].trim() : "";
    var sizeVal = cols[sizeCol] ? cols[sizeCol].trim() : "";

    if (!player && !number) continue;

    try {
      var pLayer = doc.artLayers.getByName("player");
      pLayer.textItem.contents = player;
    } catch(e) {}
    try {
      var nLayer = doc.artLayers.getByName("num1");
      nLayer.textItem.contents = number;
    } catch(e) {}
    try {
      var n2Layer = doc.artLayers.getByName("num2");
      n2Layer.textItem.contents = number;
    } catch(e) {}
    try {
      var sLayer = doc.artLayers.getByName("size");
      sLayer.textItem.contents = sizeVal;
    } catch(e) {}

    var sanitized = player.replace(/[^a-zA-Z0-9]/g, "_") || "player";
    var fileName = sanitized + "_" + (number || "0") + "_" + mappingName + ".jpg";
    var saveFile = new File(outFolder + "/" + fileName);
    var jpgOpt = new JPEGSaveOptions();
    jpgOpt.quality = P.jpgQuality || 10;
    doc.saveAs(saveFile, jpgOpt, true, Extension.LOWERCASE);

    kpLog("PROGRESS:" + (i + 1) + ":" + csvLines.length + ":Processing " + player + "|" + sizeVal + "|" + number + "\n");
  }

  doc.close(SaveOptions.DONOTSAVECHANGES);
  kpLog("DONE:Set Autolineup completed\n");
}

main();
