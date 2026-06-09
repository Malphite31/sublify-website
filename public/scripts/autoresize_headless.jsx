// HEADLESS AutoResize — pause/cancel/progress enabled
////#target photoshop  // not needed when run via COM

function _kpSplitLockNames(v){var arr=[];var raw=String(v||'').split(/[\n,]/);for(var i=0;i<raw.length;i++){var s=String(raw[i]||'').replace(/^\s+|\s+$/g,'');if(s)arr.push(s.toLowerCase());}return arr;}
function _kpVisitLayers(container, fn){for(var i=0;i<container.layers.length;i++){var lyr=container.layers[i];fn(lyr);if(lyr.typename==='LayerSet')_kpVisitLayers(lyr, fn);}}
function _kpLayerSizeIn(lyr){var b=lyr.bounds;return{w:Math.abs(b[2].as('in')-b[0].as('in')),h:Math.abs(b[3].as('in')-b[1].as('in'))};}
function _kpResizeLayerToInches(lyr, wIn, hIn){if(!(wIn>0)||!(hIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.w>0)||!(cur.h>0))return;lyr.resize((wIn/cur.w)*100,(hIn/cur.h)*100,AnchorPosition.MIDDLECENTER);}
function _kpResizeLayerWidthInches(lyr, wIn){if(!(wIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.w>0))return;lyr.resize((wIn/cur.w)*100,100,AnchorPosition.MIDDLECENTER);}
function _kpResizeLayerHeightInches(lyr, hIn){if(!(hIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.h>0))return;lyr.resize(100,(hIn/cur.h)*100,AnchorPosition.MIDDLECENTER);}
function _kpSnapshotLockedLayers(doc, cfg){var snap={};if(!cfg||!cfg.enabled)return snap;var rules=cfg.layerRules||{};var wanted=_kpSplitLockNames(cfg.layerNames);var set={};for(var rn in rules){if(rules.hasOwnProperty(rn))set[String(rn).toLowerCase()]=true;}for(var i=0;i<wanted.length;i++)set[wanted[i]]=true;_kpVisitLayers(doc,function(lyr){var nm=String(lyr.name||'').toLowerCase();if(!set[nm])return;var sz=_kpLayerSizeIn(lyr);if(!snap[nm])snap[nm]=[];snap[nm].push(sz);});return snap;}
function _kpGetLockRule(cfg,nm){var key=String(nm||'').toLowerCase();var rules=(cfg&&cfg.layerRules)?cfg.layerRules:null;if(rules&&rules[key])return rules[key];return{mode:cfg.mode||'original',customWidth:cfg.customWidth,customHeight:cfg.customHeight};}
function _kpApplyLockedLayers(doc, cfg, snap){if(!cfg||!cfg.enabled)return;var counters={};_kpVisitLayers(doc,function(lyr){var nm=String(lyr.name||'').toLowerCase();if(!snap[nm])return;var rule=_kpGetLockRule(cfg,nm);var idx=counters[nm]||0;var tgt=(snap[nm]&&snap[nm][idx])?snap[nm][idx]:null;counters[nm]=idx+1;if(!tgt)return;if(rule.mode==='custom'){var cw=parseFloat(rule.customWidth)||0;var ch=parseFloat(rule.customHeight)||0;if(cw>0&&ch>0)_kpResizeLayerToInches(lyr,cw,ch);return;}if(rule.mode==='width_only'){var onlyW=parseFloat(rule.customWidth)||0;if(onlyW>0)_kpResizeLayerWidthInches(lyr,onlyW);return;}if(rule.mode==='height_only'){var onlyH=parseFloat(rule.customHeight)||0;if(onlyH>0)_kpResizeLayerHeightInches(lyr,onlyH);return;}_kpResizeLayerToInches(lyr,tgt.w,tgt.h);});}

try { try { app.bringToFront(); } catch(_) {} } catch(_) {}
try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

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

function gen(sizes,iW,iH,dW,dH){var m={};var w=iW;var h=iH;for(var i=0;i<sizes.length;i++){m[sizes[i]]={width:w,height:h};w+=dW;h+=dH;}return m;}
var S=["2XS","XS","SMALL","MEDIUM","LARGE","XL","2XL","3XL","4XL","5XL","7XL"];
var sizeMappings={"Assorted Jersey":gen(S,40.5,31,2,1),"Football Jersey Big":gen(S,42.5,29.5,2,1),"Football Jersey Big Sleeve":gen(S,40.5,12,2,0.5),"Crop Football Womens":gen(S,38.5,23,2,1),"Crop Football Womens Sleeves":gen(S,38.5,11,2,0.5),"Men Sleeves":gen(S,34.033,8.5,2,0.5),"Boxy Sleeves":gen(S,35.78,9,2,0.5),"Women Sleeves":gen(S,30.033,7.5,2,0.5),"Longsleeves":gen(S,34.494,24.5,0.66,0.5),"Jacket Sleeves":gen(S,36.5,24.5,0.66,0.5),"Longsleeves with Cuffs":gen(S,34.494,22.5,0.66,0.5),"Men Shirt":gen(S,36.5,27,2,1),"Boxy Shirt":gen(S,42.5,28,2,1),"Women Shirt":gen(S,32.5,25,2,1),"Shorts":gen(S,61,21,2,1),"Raglan Shirt Body":gen(S,34.5,27.5,2,1),"Raglan Sleeves":gen(S,16.622,27,0.614,1),"Boxy With Cut":gen(S,42.5,28.5,2,1),"Boxy Longsleeves":gen(S,37.133,26.5,0.66,0.5),"Boxy Baseball":gen(S,42.5,31,2,1),"Kids Jersey":{"size 2":{width:32.5,height:21},"size 4":{width:34.5,height:23},"size 6":{width:36.5,height:25},"size 8":{width:38.5,height:27},"size 10":{width:40.5,height:29},"size 12":{width:42.5,height:31}}};

function parseInchSizeFromLayerName(n){var m=n.match(/^\s*([\d.]+)\s*[xX]\s*([\d.]+)\s*$/);if(!m)return null;var w=parseFloat(m[1]);var h=parseFloat(m[2]);if(isNaN(w)||isNaN(h)||w<=0||h<=0)return null;return{wIn:w,hIn:h};}
function maintainInchLayers(container,doc){for(var i=0;i<container.layers.length;i++){var lyr=container.layers[i];if(lyr.typename==="LayerSet"){maintainInchLayers(lyr,doc);continue;}var spec=parseInchSizeFromLayerName(lyr.name);if(!spec)continue;var tWpx=spec.wIn*doc.resolution;var tHpx=spec.hIn*doc.resolution;var b=lyr.bounds;var cw=b[2].value-b[0].value;var ch=b[3].value-b[1].value;if(cw<=0||ch<=0)continue;lyr.resize((tWpx/cw)*100,(tHpx/ch)*100,AnchorPosition.MIDDLECENTER);}}
function setSizeText(container,value){for(var i=0;i<container.layers.length;i++){var lyr=container.layers[i];if(lyr.typename==="LayerSet"){setSizeText(lyr,value);continue;}try{if(lyr.kind==LayerKind.TEXT&&lyr.name.toLowerCase()=="size")lyr.textItem.contents=value;}catch(_){}}}
function sanitize(n){return n.replace(/[\\\/\:\*\?\"\<\>\|]/g,"_");}
function buildFolderName(tpl,type,size){return sanitize(tpl.replace(/\{type\}/g,type).replace(/\{size\}/g,size).replace(/^\s+|\s+$/g,"")||type);}
function buildFileName(tpl,type,size,ext){return sanitize(tpl.replace(/\{type\}/g,type).replace(/\{size\}/g,size).replace(/\{ext\}/g,ext).replace(/^\s+|\s+$/g,"")||size);}
function fileExists(p){return(new File(p)).exists;}
function ensureFolder(p){var f=new Folder(p);if(!f.exists)f.create();return f;}
// Adds a white fill layer at the bottom if the doc has no Background layer
function ensureWhiteBackground(doc){
  var hasBackground=false;
  for(var bi=0;bi<doc.layers.length;bi++){if(doc.layers[bi].isBackgroundLayer){hasBackground=true;break;}}
  if(!hasBackground){
    var savedFG=app.foregroundColor;var savedBG=app.backgroundColor;
    var wc=new SolidColor();wc.rgb.red=255;wc.rgb.green=255;wc.rgb.blue=255;
    app.backgroundColor=wc;
    var bgLyr=doc.artLayers.add();bgLyr.name="_WhiteBG";bgLyr.kind=LayerKind.NORMAL;
    bgLyr.move(doc.layers[doc.layers.length-1],ElementPlacement.PLACEAFTER);
    var sel=doc.selection;sel.selectAll();
    app.foregroundColor=wc;sel.fill(wc);sel.deselect();
    app.foregroundColor=savedFG;app.backgroundColor=savedBG;
  }
}

try {
  if(!app.documents.length) throw new Error("No active document open in Photoshop.");
  var doc=app.activeDocument;
  var initialState=doc.activeHistoryState;
  var savedUnits=app.preferences.rulerUnits;
  app.preferences.rulerUnits=Units.INCHES; // always work in inches
  var doJpg=(P.format==="JPG"||P.format==="Both");
  var layerLockSnapshot=_kpSnapshotLockedLayers(doc,P.layerSizeLock);
  var doPsd=(P.format==="PSD"||P.format==="Both");
  var jpgQ=parseInt(P.jpgQuality)||10;
  var done=0;var total=0;

  // Merge built-in + custom type mappings
  var allMappings=sizeMappings;
  if(P.customTypeMaps){
    for(var ctn in P.customTypeMaps){
      if(!allMappings[ctn]) allMappings[ctn]={};
      for(var csz in P.customTypeMaps[ctn]){
        allMappings[ctn][csz]=P.customTypeMaps[ctn][csz];
      }
    }
  }

  for(var t=0;t<P.selectedTypes.length;t++){var map=allMappings[P.selectedTypes[t]];if(!map)continue;for(var s=0;s<P.selectedSizes.length;s++){if(P.selectedSizes[s] in map)total++;}}

  for(var ti=0;ti<P.selectedTypes.length;ti++){
    var typeName=P.selectedTypes[ti];
    var map=allMappings[typeName];
    if(!map)continue;

    for(var si=0;si<P.selectedSizes.length;si++){
      if(!kpCheck()) break;

      var sizeName=P.selectedSizes[si];
      if(!(sizeName in map))continue;
      doc.activeHistoryState=initialState;
      // Always resize in inches regardless of ruler unit setting
      app.preferences.rulerUnits=Units.INCHES;
      doc.resizeImage(UnitValue(map[sizeName].width,'in'),UnitValue(map[sizeName].height,'in'));
      app.preferences.rulerUnits=Units.PIXELS;
      if(P.keepInch)maintainInchLayers(doc,doc);
      var dispSize=sizeName;
      // Detect female/women type for F-prefix abbreviations (e.g. FS, FM, FL)
      var isFemaleType=(/women|womens|female|crop.*women|women.*crop/i.test(typeName));
      if(P.abbrev){
        if(sizeName==="SMALL")dispSize=isFemaleType?"FS":"S";
        else if(sizeName==="MEDIUM")dispSize=isFemaleType?"FM":"M";
        else if(sizeName==="LARGE")dispSize=isFemaleType?"FL":"L";
        else if(sizeName==="XL"&&isFemaleType)dispSize="FXL";
        else if(sizeName==="2XL"&&isFemaleType)dispSize="F2XL";
        else if(sizeName==="3XL"&&isFemaleType)dispSize="F3XL";
        else if(sizeName==="4XL"&&isFemaleType)dispSize="F4XL";
        else if(sizeName==="5XL"&&isFemaleType)dispSize="F5XL";
        else if(sizeName==="XS"&&isFemaleType)dispSize="FXS";
        else if(sizeName==="2XS"&&isFemaleType)dispSize="F2XS";
      }
      setSizeText(doc,dispSize);
      _kpApplyLockedLayers(doc,P.layerSizeLock,layerLockSnapshot);
      var folderName=buildFolderName(P.folderTemplate||"{type}",typeName,dispSize);
      var outPath=P.rootFolder+"/"+folderName;
      ensureFolder(outPath);
      if(doJpg){var jpgName=buildFileName(P.fileTemplate||"{size}",typeName,dispSize,"jpg")+".jpg";var jpgPath=outPath+"/"+jpgName;if(P.overwrite||!fileExists(jpgPath)){var jo=new JPEGSaveOptions();jo.quality=jpgQ;doc.saveAs(new File(jpgPath),jo,true);}}
      if(doPsd){var psdName=buildFileName(P.fileTemplate||"{size}",typeName,dispSize,"psd")+".psd";var psdPath=outPath+"/"+psdName;if(P.overwrite||!fileExists(psdPath)){ensureWhiteBackground(doc);var po=new PhotoshopSaveOptions();po.embedColorProfile=true;po.layers=true;doc.saveAs(new File(psdPath),po,true);}}
      done++;
      var dims2=map[sizeName]; var szLabel=dims2?dims2.width+"in × "+dims2.height+"in":"—";
      kpLog("PROGRESS:"+done+":"+total+":"+typeName+"|"+dispSize+" ("+szLabel+")|"+buildFileName(P.fileTemplate||"{size}",typeName,dispSize,(doJpg?"jpg":"psd"))+"."+(doJpg?"jpg":"psd")+"|ok");
    }
    if(!kpCheck()) break;
  }

  app.preferences.rulerUnits=savedUnits;
  doc.activeHistoryState=initialState;
  kpLog("DONE:"+done+"/"+total+" variations exported.");
} catch(e){ kpLog("ERROR:"+e.message); }
