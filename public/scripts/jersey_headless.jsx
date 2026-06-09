// HEADLESS Jersey Lineup — flexible columns, custom mapping, pause/cancel/progress
//#target photoshop
try { app.bringToFront(); } catch(_) {}
try { app.displayDialogs = DialogModes.NO; } catch(_) {}

var P = _EP;

// ── KP I/O: file-based logging + pause/cancel ──
function kpLog(msg) {
  try {
    var lf = new File(_KP_LOG);
    lf.encoding = 'UTF-8';
    lf.open('a');
    lf.writeln(msg);
    lf.close();
  } catch(e) { $.writeln(msg); }
}
function kpCheck() {
  try {
    var f = new File(_KP_FLAG);
    if (!f.exists) return true;
    f.open('r'); var state = f.readln(); f.close();
    if (state === 'cancel') { kpLog('CANCELLED:User cancelled.'); return false; }
    while (state === 'pause') {
      kpLog('PAUSED:Paused...');
      $.sleep(300);
      f.open('r'); state = f.readln(); f.close();
      if (state === 'cancel') { kpLog('CANCELLED:User cancelled during pause.'); return false; }
    }
  } catch(e) {}
  return true;
}

// ── Built-in size mappings ──
var jerseySizeMappings = {'size 2':{width:32.5,height:21},'size 4':{width:34.5,height:23},'size 6':{width:36.5,height:25},'size 8':{width:38.5,height:27},'size 10':{width:40.5,height:29},'10':{width:40.5,height:29},'size 12':{width:42.5,height:31},'2XS':{width:40.5,height:31},'XS':{width:42.5,height:32},'small':{width:44.5,height:33},'S':{width:44.5,height:33},'medium':{width:46.5,height:34},'M':{width:46.5,height:34},'large':{width:48.5,height:35},'L':{width:48.5,height:35},'XL':{width:50.5,height:36},'2XL':{width:52.5,height:37},'3XL':{width:54.5,height:38},'4XL':{width:56.5,height:39},'5XL':{width:58.5,height:40},'6XL':{width:60.5,height:41},'YS':{width:38.5,height:28},'YM':{width:40.5,height:29},'YL':{width:42.5,height:30},'YXL':{width:44.5,height:31},'Y2XL':{width:46.5,height:32},'Y3XL':{width:48.5,height:33}};
var PapawisSizeMappings=(function(){var m={};for(var k in jerseySizeMappings){m[k]={width:jerseySizeMappings[k].width,height:jerseySizeMappings[k].height-1.5};}return m;})();
var assortedJerseySizeMappings={'size 2':{width:32.5,height:20},'size 4':{width:34.5,height:22},'size 6':{width:36.5,height:24},'size 8':{width:38.5,height:26},'size 10':{width:40.5,height:28},'10':{width:40.5,height:28},'size 12':{width:42.5,height:30},'XS':{width:40.5,height:30},'small':{width:42.5,height:31},'medium':{width:44.5,height:32},'large':{width:46.5,height:33},'XL':{width:48.5,height:34},'2XL':{width:50.5,height:35},'3XL':{width:52.5,height:36},'4XL':{width:54.5,height:37},'5XL':{width:56.5,height:38},'6XL':{width:58.5,height:39},'7XL':{width:60.5,height:40}};
var menTShirtSizeMappings={'size 2':{width:32.5,height:21},'size 4':{width:34.5,height:23},'size 6':{width:36.5,height:25},'size 8':{width:38.5,height:27},'size 10':{width:40.5,height:29},'size 12':{width:42.5,height:31},'2XS':{width:36.5,height:27},'XS':{width:38.5,height:28},'small':{width:40.5,height:29},'medium':{width:42.5,height:30},'large':{width:44.5,height:31},'S':{width:40.5,height:29},'M':{width:42.5,height:30},'L':{width:44.5,height:31},'XL':{width:46.5,height:32},'2XL':{width:48.5,height:33},'3XL':{width:50.5,height:34},'4XL':{width:52.5,height:35},'5XL':{width:54.5,height:36},'6XL':{width:56.5,height:37}};
var womenShirtSizeMappings={'size 2':{width:32.5,height:21},'size 4':{width:34.5,height:23},'size 6':{width:36.5,height:25},'size 8':{width:38.5,height:27},'size 10':{width:40.5,height:29},'size 12':{width:42.5,height:31},'2XS':{width:32.5,height:25},'XS':{width:34.5,height:26},'small':{width:36.5,height:27},'medium':{width:38.5,height:28},'large':{width:40.5,height:29},'S':{width:36.5,height:27},'M':{width:38.5,height:28},'L':{width:40.5,height:29},'XL':{width:42.5,height:30},'2XL':{width:44.5,height:31},'3XL':{width:46.5,height:32},'4XL':{width:48.5,height:33},'5XL':{width:50.5,height:34},'6XL':{width:52.5,height:35}};
var youthShirtSizeMappings={'YS':{width:38.5,height:28},'YM':{width:40.5,height:29},'YL':{width:42.5,height:30},'YXL':{width:44.5,height:31},'Y2XL':{width:46.5,height:32},'Y3XL':{width:48.5,height:33}};
var VolleyballMenUpperSizeMappings={'XS':{width:42.5,height:30},'small':{width:44.5,height:31},'medium':{width:46.5,height:32},'large':{width:48.5,height:33},'XL':{width:50.5,height:34},'2XL':{width:52.5,height:35},'3XL':{width:54.5,height:36},'4XL':{width:56.5,height:37},'5XL':{width:58.5,height:38}};
var VolleyballWomenUpperSizeMappings={'XS':{width:38.5,height:27},'small':{width:40.5,height:28},'medium':{width:42.5,height:29},'large':{width:44.5,height:30},'XL':{width:46.5,height:31},'2XL':{width:48.5,height:32},'3XL':{width:50.5,height:33},'4XL':{width:52.5,height:34},'5XL':{width:54.5,height:35}};
var FootballBodySizeMappings={'2XS':{width:42.5,height:29.5},'XS':{width:44.5,height:30.5},'small':{width:46.5,height:31.5},'medium':{width:48.5,height:32.5},'large':{width:50.5,height:33.5},'XL':{width:52.5,height:34.5},'2XL':{width:54.5,height:35.5},'3XL':{width:56.5,height:36.5},'4XL':{width:58.5,height:37.5},'5XL':{width:60.5,height:38.5},'6XL':{width:62.5,height:39.5},'7XL':{width:64.5,height:40.5}};
var JacketBodyZipperSizeMappings={'small':{width:46.5,height:26.7},'medium':{width:48.5,height:27.847},'large':{width:50.5,height:28.707},'XL':{width:52.5,height:30.147},'2XL':{width:54.5,height:31.587},'3XL':{width:56.5,height:33.027},'4XL':{width:58.5,height:34.467},'5XL':{width:60.5,height:35.907},'6XL':{width:62.5,height:37.347}};
var RaglanShirtBodySizeMappings={'2XS':{width:36.5,height:28.5},'XS':{width:38.5,height:29.5},'small':{width:40.5,height:30.5},'medium':{width:42.5,height:31.5},'large':{width:44.5,height:32.5},'XL':{width:46.5,height:33.5},'2XL':{width:48.5,height:34.5},'3XL':{width:50.5,height:35.5},'4XL':{width:52.5,height:36.5},'5XL':{width:54.5,height:37.5},'6XL':{width:56.5,height:38.5},'7XL':{width:58.5,height:39.5}};
var WarmerLongsleeves=jerseySizeMappings;
var synonymsMap={"size2":"size 2","2":"size 2","size4":"size 4","4":"size 4","size6":"size 6","6":"size 6","size8":"size 8","8":"size 8","size10":"size 10","10":"size 10","size12":"size 12","12":"size 12","s":"small","small":"small","m":"medium","medium":"medium","l":"large","large":"large","xl":"XL","xlarge":"XL","2xl":"2XL","xxl":"2XL","3xl":"3XL","xxxl":"3XL","4xl":"4XL","xxxxl":"4XL","5xl":"5XL","xxxxxl":"5XL","6xl":"6XL","xxxxxxl":"6XL","7xl":"7XL","xxxxxxxl":"7XL"};

function normalizeSize(input){
  // ES3-safe: no .replace(/^\s+|\s+$/g,'') — use regex instead
  var s = (input === null || input === undefined) ? '' : String(input);
  var clean = s.replace(/\s*-\s*/g,'-').toLowerCase().replace(/\s+/g,'').replace(/,/g,'');
  var fallback = s.replace(/\s*-\s*/g,'-').replace(/^\s+|\s+$/g,'');
  return synonymsMap[clean] ? synonymsMap[clean] : fallback;
}
function getMappingByName(name){switch(name){case "Jersey":return jerseySizeMappings;case "Assorted Jersey":return assortedJerseySizeMappings;case "Men T-Shirt":return menTShirtSizeMappings;case "Women Shirt":return womenShirtSizeMappings;case "Youth Shirt":return youthShirtSizeMappings;case "Volleyball Men Upper":return VolleyballMenUpperSizeMappings;case "Volleyball Women Upper":return VolleyballWomenUpperSizeMappings;case "Warmer Longsleeves":return WarmerLongsleeves;case "Football Body":return FootballBodySizeMappings;case "Jacket Body Zipper":return JacketBodyZipperSizeMappings;case "Raglan Shirt Body":return RaglanShirtBodySizeMappings;case "Papawis Sizing":return PapawisSizeMappings;default:return jerseySizeMappings;}}
function readCSV(text){var rows=[];var lines=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");for(var i=0;i<lines.length;i++){var l=lines[i];if(!l||!l.replace(/\s/g,""))continue;var useTab=(l.indexOf("\t")>=0);var parts=useTab?l.split("\t"):l.split(",");for(var j=0;j<parts.length;j++)parts[j]=parts[j].replace(/^\s+|\s+$/g,"");rows.push(parts);}return rows;}
function rowToRecord(row,columns){var r={};for(var i=0;i<columns.length;i++)r[columns[i].toLowerCase()]=row[i]||'';return r;}
function collectTextLayers(container,layers){if(!layers)layers={};for(var i=0;i<container.artLayers.length;i++){var l=container.artLayers[i];if(l.kind==LayerKind.TEXT){var n=l.name;if(!layers[n])layers[n]=[];layers[n].push(l);}}for(var j=0;j<container.layerSets.length;j++)collectTextLayers(container.layerSets[j],layers);return layers;}
function adjustLayerScale(layer,maxW,maxH){var b=layer.bounds;var cw=b[2].value-b[0].value;var ch=b[3].value-b[1].value;if(cw>maxW)layer.textItem.horizontalScale=(maxW/cw)*100;else layer.textItem.horizontalScale=100;b=layer.bounds;ch=b[3].value-b[1].value;if(ch>maxH)layer.textItem.verticalScale=(maxH/ch)*100;else layer.textItem.verticalScale=100;}
function createNoteLayers(doc,noteText){var positions=[{x:1.64,y:6.78},{x:20.83,y:6.78},{x:23.77,y:6.78},{x:42.91,y:6.78}];for(var i=0;i<positions.length;i++){var tl=doc.artLayers.add();tl.kind=LayerKind.TEXT;tl.textItem.contents=noteText;tl.textItem.position=[UnitValue(positions[i].x,"in"),UnitValue(positions[i].y,"in")];tl.textItem.size=UnitValue(26,"pt");tl.textItem.font="Arial-BoldMT";tl.textItem.justification=Justification.CENTER;tl.rotate(-90);}}
function getUniqueFileName(base,used){var n=base,c=1;while(used[n]){n=base+"_"+c;c++;}used[n]=true;return n;}

function _kpSplitLockNames(v){var arr=[];var raw=String(v||'').split(/[\n,]/);for(var i=0;i<raw.length;i++){var s=String(raw[i]||'').replace(/^\s+|\s+$/g,'');if(s)arr.push(s.toLowerCase());}return arr;}
function _kpVisitLayers(container, fn){for(var i=0;i<container.layers.length;i++){var lyr=container.layers[i];fn(lyr);if(lyr.typename==='LayerSet')_kpVisitLayers(lyr, fn);}}
function _kpLayerSizeIn(lyr){var b=lyr.bounds;return{w:Math.abs(b[2].as('in')-b[0].as('in')),h:Math.abs(b[3].as('in')-b[1].as('in'))};}
function _kpResizeLayerToInches(lyr, wIn, hIn){if(!(wIn>0)||!(hIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.w>0)||!(cur.h>0))return;lyr.resize((wIn/cur.w)*100,(hIn/cur.h)*100,AnchorPosition.MIDDLECENTER);}
function _kpResizeLayerWidthInches(lyr, wIn){if(!(wIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.w>0))return;lyr.resize((wIn/cur.w)*100,100,AnchorPosition.MIDDLECENTER);}
function _kpResizeLayerHeightInches(lyr, hIn){if(!(hIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.h>0))return;lyr.resize(100,(hIn/cur.h)*100,AnchorPosition.MIDDLECENTER);}
function _kpSnapshotLockedLayers(doc, cfg){var snap={};if(!cfg||!cfg.enabled)return snap;var rules=cfg.layerRules||{};var wanted=_kpSplitLockNames(cfg.layerNames);var set={};for(var rn in rules){if(rules.hasOwnProperty(rn))set[String(rn).toLowerCase()]=true;}for(var i=0;i<wanted.length;i++)set[wanted[i]]=true;_kpVisitLayers(doc,function(lyr){var nm=String(lyr.name||'').toLowerCase();if(!set[nm])return;var sz=_kpLayerSizeIn(lyr);if(!snap[nm])snap[nm]=[];snap[nm].push(sz);});return snap;}
function _kpGetLockRule(cfg,nm){var key=String(nm||'').toLowerCase();var rules=(cfg&&cfg.layerRules)?cfg.layerRules:null;if(rules&&rules[key])return rules[key];return{mode:cfg.mode||'original',customWidth:cfg.customWidth,customHeight:cfg.customHeight};}
function _kpApplyLockedLayers(doc, cfg, snap){if(!cfg||!cfg.enabled)return;var counters={};_kpVisitLayers(doc,function(lyr){var nm=String(lyr.name||'').toLowerCase();if(!snap[nm])return;var rule=_kpGetLockRule(cfg,nm);var idx=counters[nm]||0;var tgt=(snap[nm]&&snap[nm][idx])?snap[nm][idx]:null;counters[nm]=idx+1;if(!tgt)return;if(rule.mode==='custom'){var cw=parseFloat(rule.customWidth)||0;var ch=parseFloat(rule.customHeight)||0;if(cw>0&&ch>0)_kpResizeLayerToInches(lyr,cw,ch);return;}if(rule.mode==='width_only'){var onlyW=parseFloat(rule.customWidth)||0;if(onlyW>0)_kpResizeLayerWidthInches(lyr,onlyW);return;}if(rule.mode==='height_only'){var onlyH=parseFloat(rule.customHeight)||0;if(onlyH>0)_kpResizeLayerHeightInches(lyr,onlyH);return;}_kpResizeLayerToInches(lyr,tgt.w,tgt.h);});}

function sanitizeFilename(s){return s.replace(/[\\\/\:\*\?\"\<\>\|]/g,'_');}
// Adds a white fill layer at the bottom if the doc has no Background layer
function ensureWhiteBackground(doc){
  var hasBackground=false;
  for(var bi=0;bi<doc.layers.length;bi++){if(doc.layers[bi].isBackgroundLayer){hasBackground=true;break;}}
  if(!hasBackground){
    var savedFG=app.foregroundColor;var savedBG=app.backgroundColor;
    var wc=new SolidColor();wc.rgb.red=255;wc.rgb.green=255;wc.rgb.blue=255;
    var bgLyr=doc.artLayers.add();bgLyr.name="_WhiteBG";bgLyr.kind=LayerKind.NORMAL;
    bgLyr.move(doc.layers[doc.layers.length-1],ElementPlacement.PLACEAFTER);
    var sel=doc.selection;sel.selectAll();
    app.foregroundColor=wc;sel.fill(wc);sel.deselect();
    app.foregroundColor=savedFG;app.backgroundColor=savedBG;
  }
}
function kpSanitizeFilePart(v){return sanitizeFilename(String(v===undefined||v===null?'':v)).replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');}
function kpBuildFileName(tpl, rec){
  var template=(tpl&&String(tpl).replace(/^\s+|\s+$/g,''))||'{player}_{num}_{size}';
  var name=template.replace(/\{(player|name|num|num1|num2|size|map)\}/gi,function(_,key){
    key=key.toLowerCase();
    return kpSanitizeFilePart(rec[key]!==undefined?rec[key]:'');
  });
  name=name.replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
  name=name.replace(/[\._\-\s]+$/g,'');
  return name||'output';
}

// ── Add ~ overlay on top of N/n where Ñ/ñ appeared ──
// For each Ñ/ñ: finds the N character x-position in the text layer,
// creates a new text layer with "~" in Impact font at that position,
// places it above the player layer.

function fillTextLayers(textLayers,rec,maxW,maxH,letterSizeOnly,letterMap) {
  var playerVal = rec['player']||rec['name']||rec['surname']||'';
  var playerHasN = (playerVal.indexOf('\u00D1')>=0||playerVal.indexOf('\u00F1')>=0);
  // Write N (without tilde) to the layer text — avoids PS font rendering issues
  // Filename still uses original Ñ (returned in hasN flow)
  var playerDisplay = playerHasN
    ? playerVal.replace(/\u00D1/g,'N').replace(/\u00F1/g,'n')
    : playerVal;
  if(textLayers['player'])for(var p=0;p<textLayers['player'].length;p++){
    var pl=textLayers['player'][p];
    try{pl.textItem.contents=playerDisplay;}catch(_){}
    adjustLayerScale(pl,maxW,maxH);

  }
  var numVal=rec['num']||rec['number']||rec['num1']||'';
  var numVal2=(P.numMode==='different'&&rec['num2'])?rec['num2']:numVal;
  if(textLayers['num1'])for(var n=0;n<textLayers['num1'].length;n++){try{textLayers['num1'][n].textItem.contents=numVal;}catch(_){}}
  if(textLayers['num2'])for(var n2=0;n2<textLayers['num2'].length;n2++){try{textLayers['num2'][n2].textItem.contents=numVal2;}catch(_){}}
  if(textLayers['num'])for(var nm=0;nm<textLayers['num'].length;nm++){try{textLayers['num'][nm].textItem.contents=numVal;}catch(_){}}
  var sizeRaw=String(rec['size']||'');
  var sizeNorm=normalizeSize(sizeRaw);
  // Apply female F-prefix when the selected mapping is a women/female type
  var isFemaleMapping=(/women|womens|female/i.test(P.sizeMapping||''));
  var sizeDisplay=sizeNorm;
  if(letterSizeOnly){
    sizeDisplay=letterMap[sizeNorm.toLowerCase()]||sizeNorm;
    if(isFemaleMapping){
      // Re-apply F-prefix to the abbreviated letter size
      var fMap={'S':'FS','M':'FM','L':'FL','XS':'FXS','XL':'FXL','2XL':'F2XL','3XL':'F3XL','4XL':'F4XL','5XL':'F5XL','2XS':'F2XS'};
      sizeDisplay=fMap[sizeDisplay]||sizeDisplay;
    }
  } else if(isFemaleMapping){
    // Non-letter-only: prefix known sizes with F
    var fMap2={'S':'FS','M':'FM','L':'FL','XS':'FXS','XL':'FXL','2XL':'F2XL','3XL':'F3XL','4XL':'F4XL','5XL':'F5XL','2XS':'F2XS','small':'FS','medium':'FM','large':'FL'};
    sizeDisplay=fMap2[sizeNorm]||fMap2[sizeNorm.toLowerCase()]||sizeNorm;
  }
  if(textLayers['size'])for(var s=0;s<textLayers['size'].length;s++){try{textLayers['size'][s].textItem.contents=sizeDisplay;}catch(_){}}
  var shirt=rec['shirttype']||rec['shirt']||rec['nickname']||'';
  if(textLayers['nickname'])for(var nn=0;nn<textLayers['nickname'].length;nn++){try{textLayers['nickname'][nn].textItem.contents=shirt;}catch(_){}}
  if(textLayers['shirt'])for(var sh=0;sh<textLayers['shirt'].length;sh++){try{textLayers['shirt'][sh].visible=(shirt==='shirt'||shirt==='wshirt');}catch(_){}}
  return {player:playerVal,num:numVal,size:sizeNorm,hasN:playerHasN};
}

try {
  if(!app.documents.length) throw new Error("No active document open in Photoshop.");
  var doc=app.activeDocument;
  var selectedMapping=P.useCustomMapping&&P.customMapping?P.customMapping:getMappingByName(P.sizeMapping);
  var outputFolder=new Folder(P.folder+"/"+P.folderName);
  if(!outputFolder.exists)outputFolder.create();
  var csvRows=readCSV(P.csvText);
  var columns=P.columns||['player','num','size','shirtType'];
  if(P.useFirstRowAsHeaders&&csvRows.length>0){columns=csvRows[0];csvRows=csvRows.slice(1);}
  var total=csvRows.length;
  var textLayers=collectTextLayers(doc);

  // ── Validate layers ──
  // Size layer always required (unless skipResize)
  // player/num only required when P.strictLayers === true (checkbox checked)
  var hasPlayer = (textLayers['player']||textLayers['name']||textLayers['surname']);
  var hasNum    = (textLayers['num']||textLayers['num1']||textLayers['num2']);
  var hasSize   = (textLayers['size']);
  if(!hasSize && !P.skipResize){
    var foundList=(function(obj){var k=[];for(var p in obj){if(obj.hasOwnProperty(p))k.push(p);}return k.join(', ');})(textLayers);
    kpLog('ERROR:MISSING_LAYERS:PSD is missing required \'size\' text layer. Found: '+foundList);
    throw new Error('MISSING_LAYERS:Missing size layer. Found: '+foundList);
  }
  if(P.strictLayers===true){
    var missing=[];
    if(!hasPlayer) missing.push('player');
    if(!hasNum)    missing.push('num');
    if(missing.length){
      var fl2=(function(obj){var k=[];for(var p in obj){if(obj.hasOwnProperty(p))k.push(p);}return k.join(', ');})(textLayers);
      kpLog('ERROR:MISSING_LAYERS:Missing: '+missing.join(', ')+'. Found: '+fl2);
      throw new Error('MISSING_LAYERS:'+missing.join(', '));
    }
  }
  var maxW=P.disableSizeLimits?99999:parseFloat(P.maxWidth)||13;
  var maxH=P.disableSizeLimits?99999:parseFloat(P.maxHeight)||4;
  if(P.note)createNoteLayers(doc,P.note);
  var playersWithN=[];var psdFilePaths=[];var used={};var initialState=doc.activeHistoryState;
  var layerLockSnapshot=_kpSnapshotLockedLayers(doc,P.layerSizeLock);
  var letterMap={'size 2':'2','size 4':'4','size 6':'6','size 8':'8','size 10':'10','size 12':'12','small':'S','medium':'M','large':'L'};
  var done=0;

  for(var i=0;i<total;i++){
    if(!kpCheck()) break;
    doc.activeHistoryState=initialState;
    var row=csvRows[i];
    var rec=rowToRecord(row,columns);
    var sizeRaw=String(rec['size']||'');
    var size=normalizeSize(sizeRaw);
    var dims=selectedMapping[size]||selectedMapping[String(size).toLowerCase()]||selectedMapping[sizeRaw]||selectedMapping[String(sizeRaw).toLowerCase()];
    // Custom size formats (jersey bleed: +2.5 width, +3 height):
    // "M-20"  → M's width,      height = 20+3
    // "40-M"  → width = 40+2.5, M's height  (WIDTH-SIZE reverse format)
    if(!dims && size.indexOf('-')>=0){
      var dashParts=size.split('-');
      var part0=String(dashParts[0]||'').replace(/\s+/g,'');
      var part1=String(dashParts[1]||'').replace(/\s+/g,'');
      var p0num=parseFloat(part0);
      var p1num=parseFloat(part1);

      // Reverse format: "40-M" → number first, size name second
      if(!isNaN(p0num) && isNaN(p1num) && part1.length>0){
        var revBase=normalizeSize(part1);
        var revDims=selectedMapping[revBase]||selectedMapping[String(revBase).toLowerCase()];
        if(revDims){
          dims={width:p0num+2.5, height:revDims.height};
        }
      } else {
        // Normal: "M-20" → size name first, height second
        var baseSize=normalizeSize(part0);
        if(!isNaN(p1num)){
          var baseDims=selectedMapping[baseSize]||selectedMapping[String(baseSize).toLowerCase()];
          if(baseDims){
            dims={width:baseDims.width, height:p1num+3};
          } else {
            dims={width:p0num+2.5, height:p1num+3};
          }
        }
      }
    }
    // Raw dimension format: "46.5x30" → width+2.5, height+3
    if(!dims){var sp=size.split("x");if(sp.length===2)dims={width:parseFloat(sp[0])+2.5,height:parseFloat(sp[1])+3};}
    if(!dims){
      if(P.skipResize){
        // On small PSD: size not in mapping is OK - still fill text layers
        dims={width:0,height:0}; // dummy - canvas won't be resized
      } else {
        kpLog("WARN:Size '"+sizeRaw+"' not found (row "+(i+1)+"), skipping.");continue;
      }
    }
    if(!P.skipResize)doc.resizeImage(new UnitValue(dims.width,"in"),new UnitValue(dims.height,"in"));
    var filled=fillTextLayers(textLayers,rec,maxW,maxH,P.letterSizeOnly,letterMap);
    // ── Filename: use original name WITH Ñ preserved in filename ──
    var wO=dims.width-2.5; var hO=dims.height-3;
    var mapName=P.sizeMapping.replace(/ /g,"");
    // For filename: keep Ñ as-is (Windows NTFS supports it; PS supports it)
    var baseName=kpBuildFileName(P.fileNameTemplate,{player:filled.player,name:filled.player,num:filled.num||rec.num||rec.num1||'',num1:rec.num1||filled.num||'',num2:rec.num2||'',size:size,map:mapName});
    var fname=getUniqueFileName(baseName,used);
    if(filled.hasN){
      // Save PSD with Ñ in filename (N written to layer, Ñ preserved in filename)
      var psdPath=outputFolder+"/"+fname+".psd";
      try{
        ensureWhiteBackground(doc);
        doc.saveAs(new File(psdPath),new PhotoshopSaveOptions(),true);
        kpLog("INFO:Saved Ñ PSD: "+fname+".psd");
      }catch(nErr){kpLog("WARN:Could not save Ñ PSD: "+nErr.message);}
      playersWithN.push(filled.player);
      psdFilePaths.push(fname+".psd");
    } else {
      _kpApplyLockedLayers(doc,P.layerSizeLock,layerLockSnapshot);
      if(P.saveJpg){
        try{
          // Try direct saveAs first (works on normal PS)
          var jo=new JPEGSaveOptions();jo.quality=parseInt(P.jpgQuality)||8;
          doc.saveAs(new File(outputFolder+"/"+fname+".jpg"),jo,true);
        }catch(saveErr){
          // Fallback: duplicate+flatten+save (works on layered/complex docs like small PSD)
          var flatDoc=null;
          try{
            flatDoc=doc.duplicate();
            try{app.displayDialogs=DialogModes.NO;}catch(_){}
            flatDoc.flatten();
            var jo2=new JPEGSaveOptions();jo2.quality=parseInt(P.jpgQuality)||8;
            flatDoc.saveAs(new File(outputFolder+"/"+fname+".jpg"),jo2,true);
          }catch(saveErr2){
            kpLog("WARN:JPG save failed row "+(i+1)+": "+saveErr2.message);
          }finally{
            try{if(flatDoc)flatDoc.close(SaveOptions.DONOTSAVECHANGES);}catch(_){}
          }
        }
      }
      if(P.savePsd){try{ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fname+".psd"),new PhotoshopSaveOptions(),true);}catch(_){}}
    }
    done++;
    var ext=filled.hasN?".psd":(P.saveJpg?".jpg":".psd");
    var sizeLabel=dims.width+"in \u00d7 "+dims.height+"in";
    kpLog("PROGRESS:"+done+":"+total+":"+filled.player+"|"+size+" ("+sizeLabel+")|"+fname+ext+"|"+(filled.hasN?"warn":"ok"));
  }

  try{if(initialState)doc.activeHistoryState=initialState;}catch(_){}
  var msg="DONE:"+done+"/"+total+" jerseys processed.";
  msg+="\nOUTPUT_FOLDER:"+outputFolder.fsName;
  if(playersWithN.length) msg+="\nN_NAMES:"+playersWithN.join("\u001F");
  if(psdFilePaths.length) msg+="\nN_PSDS:"+psdFilePaths.join("\u001F");
  kpLog(msg);

  // ── Post-process: open each Ñ PSD and add ~ tilde above the N ──
  for(var ni=0; ni<psdFilePaths.length; ni++){
    var nPsdPath = outputFolder.fsName + "/" + psdFilePaths[ni];
    kpLog("INFO:Adding tilde to: "+psdFilePaths[ni]);
    try{
      var nDoc = app.open(new File(nPsdPath));
      try{app.bringToFront();}catch(_){}
      try{app.displayDialogs=DialogModes.NO;}catch(_){}

      // Find the player text layer
      var nPlayerLayer = null;
      var nLayers = nDoc.layers;
      for(var li2=0; li2<nLayers.length; li2++){
        var nl = nLayers[li2];
        if(nl.kind === LayerKind.TEXT &&
           (nl.name==='player'||nl.name==='name'||nl.name==='surname'||nl.name==='Player')){
          nPlayerLayer = nl; break;
        }
        // also check inside groups
        if(nl.typename==='LayerSet'){
          for(var li3=0;li3<nl.layers.length;li3++){
            var nl2=nl.layers[li3];
            if(nl2.kind===LayerKind.TEXT&&
               (nl2.name==='player'||nl2.name==='name'||nl2.name==='surname'||nl2.name==='Player')){
              nPlayerLayer=nl2;break;
            }
          }
        }
        if(nPlayerLayer) break;
      }

      if(nPlayerLayer){
        // Get player name from the layer — contains N (replaced from Ñ)
        var nPlayerText = nPlayerLayer.textItem.contents;
        // Reconstruct original with Ñ from N_NAMES list
        var origName = playersWithN[ni] || nPlayerText;

        // Find Ñ positions in original name
        var nIndices = [];
        for(var ci=0;ci<origName.length;ci++){
          var ch=origName.charCodeAt(ci);
          if(ch===0xD1||ch===0xF1) nIndices.push(ci);
        }

        if(nIndices.length){
          var nTi   = nPlayerLayer.textItem;
          var nFontSizePt = 0;
          try{ nFontSizePt=nTi.size.as('pt'); }catch(_){ try{ nFontSizePt=Number(nTi.size); }catch(_){ nFontSizePt=72; } }
          var nFontSizeIn = nFontSizePt/72;
          var nColor = nTi.color;

          // Set ruler to inches for consistent positioning
          var nSavedRuler=app.preferences.rulerUnits;
          app.preferences.rulerUnits=Units.INCHES;

          var nBL=Number(nPlayerLayer.bounds[0]);
          var nBT=Number(nPlayerLayer.bounds[1]);
          var nBR=Number(nPlayerLayer.bounds[2]);
          var nLayerW=nBR-nBL;
          var nAvgCharW=nPlayerText.length>0&&nLayerW>0?nLayerW/nPlayerText.length:nFontSizeIn*0.6;
          var nTildeY=nBT+(nFontSizeIn*0.25); // ~ sits on top of letter

          for(var ni2=0;ni2<nIndices.length;ni2++){
            var nCharIdx=nIndices[ni2];
            var nCharX=nBL+(nCharIdx*nAvgCharW)+(nAvgCharW*0.5);

            var tLayer=nDoc.artLayers.add();
            tLayer.kind=LayerKind.TEXT;
            tLayer.name='_tilde_'+nCharIdx;

            var tti=tLayer.textItem;
            try{tti.contents='~';}catch(_){}
            try{tti.font='Impact';}catch(_){try{tti.font='ImpactMT';}catch(_){try{tti.font=nTi.font;}catch(_){}}}
            try{tti.size=new UnitValue(nFontSizePt,'pt');}catch(_){try{tti.size=nFontSizePt;}catch(_){}}
            try{
              var nc=new SolidColor();
              nc.rgb.red=nColor.rgb.red;
              nc.rgb.green=nColor.rgb.green;
              nc.rgb.blue=nColor.rgb.blue;
              tti.color=nc;
            }catch(_){try{tti.color=nColor;}catch(_){}}
            try{tti.justification=Justification.CENTER;}catch(_){}
            try{tti.position=[new UnitValue(nCharX,'in'),new UnitValue(nTildeY,'in')];}catch(_){
              try{tti.position=[nCharX,nTildeY];}catch(_){}
            }
            // Copy layer effects from player
            try{
              nDoc.activeLayer=nPlayerLayer;
              executeAction(stringIDToTypeID('copyEffects'),undefined,DialogModes.NO);
              nDoc.activeLayer=tLayer;
              executeAction(stringIDToTypeID('pasteEffects'),undefined,DialogModes.NO);
            }catch(_){
              try{
                var idcpEf=charIDToTypeID('CpEf');
                var desc=new ActionDescriptor();
                var r1=new ActionReference();r1.putLayer(tLayer);
                var r2=new ActionReference();r2.putLayer(nPlayerLayer);
                desc.putReference(charIDToTypeID('null'),r1);
                desc.putReference(charIDToTypeID('T   '),r2);
                executeAction(idcpEf,desc,DialogModes.NO);
              }catch(_){}
            }
            try{tLayer.moveBefore(nPlayerLayer);}catch(_){}
          }
          app.preferences.rulerUnits=nSavedRuler;
        }
      }

      // Save the PSD with tilde layers
      nDoc.save();
      // Leave it open so user can see it
      kpLog("INFO:Tilde added and saved: "+psdFilePaths[ni]);

    }catch(nErr){
      kpLog("WARN:Could not process Ñ file "+psdFilePaths[ni]+": "+nErr.message);
    }
  }

} catch(e){ kpLog("ERROR:"+e.message); }
