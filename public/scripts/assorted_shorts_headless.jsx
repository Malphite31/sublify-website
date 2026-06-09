// HEADLESS Assorted Shorts — matches original AUTOLINEUP_Assorted_Shorts_By_ERROL.jsx exactly
////#target photoshop  // not needed when run via COM
try { try { app.bringToFront(); } catch(_) {} } catch(_) {}
try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

var P = _EP;

function kpLog(msg) {
  try { var lf=new File(_KP_LOG);lf.encoding='UTF-8';lf.open('a');lf.writeln(msg);lf.close(); } catch(e){$.writeln(msg);}
}
function kpCheck() {
  try {
    var f=new File(_KP_FLAG); if(!f.exists) return true;
    f.open('r'); var s=f.readln(); f.close();
    if(s==='cancel'){kpLog('CANCELLED:User cancelled.');return false;}
    while(s==='pause'){kpLog('PAUSED:Paused...');$.sleep(300);f.open('r');s=f.readln();f.close();if(s==='cancel'){kpLog('CANCELLED:Cancelled during pause.');return false;}}
  } catch(e){}
  return true;
}

// ── Size mappings (exact from original) ──
  function findTextLayerByName(container, name) {
    for (var i = 0; i < container.layers.length; i++) {
      var lyr = container.layers[i];
      if (lyr.typename === 'ArtLayer' && lyr.kind == LayerKind.TEXT && lyr.name.toLowerCase() === name.toLowerCase()) {
        return lyr;
      }
      if (lyr.typename === 'LayerSet') {
        var found = findTextLayerByName(lyr, name);
        if (found) return found;
      }
    }
    return null;
  }

var originalSizeMappings = {
  '2':    {width:43.772,height:13}, '4':    {width:47.139,height:14},
  '6':    {width:50.506,height:15}, '8':    {width:53.873,height:16},
  '10':   {width:57.24, height:17}, '12':   {width:60.607,height:18},
  '2XS':  {width:57.239,height:17}, 'XS':   {width:60.486,height:18},
  'small':{width:63.733,height:19}, 'medium':{width:66.98,height:20},
  'large':{width:70.227,height:21}, 'XL':   {width:73.474,height:22},
  '2XL':  {width:76.721,height:23}, '3XL':  {width:79.968,height:24},
  '4XL':  {width:83.215,height:25}, '5XL':  {width:86.462,height:26},
  '6XL':  {width:89.709,height:27}, '7XL':  {width:92.956,height:28}
};
var newSizeMappings = {
  'size 2': {width:53,  height:14}, 'size 4': {width:55,  height:16},
  'size 6': {width:57,  height:18}, 'size 8': {width:59,  height:20},
  'size 10':{width:61,  height:22}, 'size 12':{width:63,  height:24},
  '2XS':    {width:50.391,height:19},'XS':    {width:53.043,height:20},
  'SMALL':  {width:55.696,height:21},'MEDIUM':{width:58.348,height:22},
  'LARGE':  {width:61,  height:23}, 'XL':     {width:65,  height:24.5},
  '2XL':    {width:66.304,height:25},'3XL':   {width:68.957,height:26},
  '4XL':    {width:71.609,height:27},'5XL':   {width:74.261,height:28},
  '6XL':    {width:76.913,height:29}
};

try {
  if (!app.documents.length) {
    kpLog('ERROR:NO_DOC:No document open in Photoshop.');
    throw new Error('no doc');
  }

  var doc = app.activeDocument;

  // ── Set ruler to inches ──
  var oldUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.INCHES;

  var chosenMapping = (P.sizeMapping === 'new') ? newSizeMappings : originalSizeMappings;
  var selectedSizes = P.selectedSizes || [];
  var total = selectedSizes.length;

  if (total === 0) {
    kpLog('ERROR:No sizes selected.');
    throw new Error('no sizes');
  }

  // Check "size" layer exists
  var sizeLayerRef = findTextLayerByName(doc, 'size');
  var hasSizeLayer = (sizeLayerRef !== null);
  if (!hasSizeLayer) {
    kpLog('ERROR:MISSING_LAYERS:Missing text layer named "size".');
    throw new Error('missing layers');
  }

  var outputFolder = new Folder(P.folder + '/' + P.folderName);
  if (!outputFolder.exists) outputFolder.create();

  var initialState = doc.activeHistoryState;
  var done = 0;

  for (var i = 0; i < total; i++) {
    if (!kpCheck()) break;

    var sizeName = selectedSizes[i];
    var sizeData = chosenMapping[sizeName];
    if (!sizeData) { kpLog('WARN:Size "' + sizeName + '" not in mapping, skipping.'); continue; }

    doc.activeHistoryState = initialState;

    // ── Resize exactly like original: raw numbers + BICUBIC ──
    doc.resizeImage(sizeData.width, sizeData.height, null, ResampleMethod.BICUBIC);

    // ── Update size layer ──
    var sLayer = findTextLayerByName(doc, 'size');
    if (sLayer) {
      sLayer.textItem.contents = sizeName;
    }

    // ── Save as JPEG ──
    var fname = sizeName.replace(/\s+/g, '_') + '.jpg';
    var jo = new JPEGSaveOptions();
    jo.quality = parseInt(P.jpgQuality) || 12;
    doc.saveAs(new File(outputFolder + '/' + fname), jo, true);

    done++;
    kpLog('PROGRESS:' + done + ':' + total + ':' + sizeName + '|' + sizeData.width + 'x' + sizeData.height + 'in|' + fname + '|ok');
  }

  app.preferences.rulerUnits = oldUnits;
  doc.activeHistoryState = initialState;
  kpLog('DONE:' + done + '/' + total + ' shorts sizes exported.');
  kpLog('OUTPUT_FOLDER:' + outputFolder.fsName);

} catch(e) {
  if (e.message !== 'no doc' && e.message !== 'no sizes' && e.message !== 'missing layers') {
    kpLog('ERROR:' + e.message);
  }
}
