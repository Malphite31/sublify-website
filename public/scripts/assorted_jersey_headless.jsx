// HEADLESS Assorted Jersey — matches original AUTOLINEUP_Assorted_Jersey_By_ERROL.jsx exactly
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
  'small':   {width:42.5,height:32},  'medium':  {width:44.5,height:33},
  'large':   {width:46.5,height:34},  'XL':      {width:48.5,height:35},
  '2XL':     {width:50.5,height:36},  '3XL':     {width:52.5,height:37},
  '4XL':     {width:54.5,height:38},  '5XL':     {width:56.5,height:39},
  '6XL':     {width:58.5,height:40},  '7XL':     {width:60.5,height:41},
  'XS':      {width:40.5,height:31},  '2XS':     {width:38.5,height:30},
  'size 12': {width:42.5,height:31},  'size 10': {width:40.5,height:29},
  'size 8':  {width:38.5,height:27},  'size 6':  {width:36.5,height:25},
  'size 4':  {width:34.5,height:23},  'size 2':  {width:32.5,height:21}
};
var newSizeMappings = {
  '2':   {width:32.5,height:21}, '4':   {width:34.5,height:23},
  '6':   {width:36.5,height:25}, '8':   {width:38.5,height:27},
  '10':  {width:40.5,height:29}, '12':  {width:42.5,height:31},
  '2XS': {width:38.5,height:30}, 'XS':  {width:40.5,height:31},
  'S':   {width:42.5,height:32}, 'M':   {width:44.5,height:33},
  'L':   {width:46.5,height:34}, 'XL':  {width:48.5,height:35},
  '2XL': {width:50.5,height:36}, '3XL': {width:52.5,height:37},
  '4XL': {width:54.5,height:38}, '5XL': {width:56.5,height:39},
  '6XL': {width:58.5,height:40}, '7XL': {width:60.5,height:41}
};

try {
  if (!app.documents.length) {
    kpLog('ERROR:NO_DOC:No document open in Photoshop.');
    throw new Error('no doc');
  }

  var doc = app.activeDocument;

  // ── Set ruler to inches (like original relies on) ──
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
  kpLog('DONE:' + done + '/' + total + ' jersey sizes exported.');
  kpLog('OUTPUT_FOLDER:' + outputFolder.fsName);

} catch(e) {
  if (e.message !== 'no doc' && e.message !== 'no sizes' && e.message !== 'missing layers') {
    kpLog('ERROR:' + e.message);
  }
}
