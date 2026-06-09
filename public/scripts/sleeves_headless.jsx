// HEADLESS Sleeves Lineup — pause/cancel/progress enabled
//#target photoshop

function _kpSplitLockNames(v){var arr=[];var raw=String(v||'').split(/[\n,]/);for(var i=0;i<raw.length;i++){var s=String(raw[i]||'').replace(/^\s+|\s+$/g,'');if(s)arr.push(s.toLowerCase());}return arr;}
function _kpVisitLayers(container, fn){for(var i=0;i<container.layers.length;i++){var lyr=container.layers[i];fn(lyr);if(lyr.typename==='LayerSet')_kpVisitLayers(lyr, fn);}}
function _kpLayerSizeIn(lyr){var b=lyr.bounds;return{w:Math.abs(b[2].as('in')-b[0].as('in')),h:Math.abs(b[3].as('in')-b[1].as('in'))};}
function _kpResizeLayerToInches(lyr, wIn, hIn){if(!(wIn>0)||!(hIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.w>0)||!(cur.h>0))return;lyr.resize((wIn/cur.w)*100,(hIn/cur.h)*100,AnchorPosition.MIDDLECENTER);}
function _kpResizeLayerWidthInches(lyr, wIn){if(!(wIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.w>0))return;lyr.resize((wIn/cur.w)*100,100,AnchorPosition.MIDDLECENTER);}
function _kpResizeLayerHeightInches(lyr, hIn){if(!(hIn>0))return;var cur=_kpLayerSizeIn(lyr);if(!(cur.h>0))return;lyr.resize(100,(hIn/cur.h)*100,AnchorPosition.MIDDLECENTER);}
function _kpSnapshotLockedLayers(doc, cfg){var snap={};if(!cfg||!cfg.enabled)return snap;var rules=cfg.layerRules||{};var wanted=_kpSplitLockNames(cfg.layerNames);var set={};for(var rn in rules){if(rules.hasOwnProperty(rn))set[String(rn).toLowerCase()]=true;}for(var i=0;i<wanted.length;i++)set[wanted[i]]=true;_kpVisitLayers(doc,function(lyr){var nm=String(lyr.name||'').toLowerCase();if(!set[nm])return;var sz=_kpLayerSizeIn(lyr);if(!snap[nm])snap[nm]=[];snap[nm].push(sz);});return snap;}
function _kpGetLockRule(cfg,nm){var key=String(nm||'').toLowerCase();var rules=(cfg&&cfg.layerRules)?cfg.layerRules:null;if(rules&&rules[key])return rules[key];return{mode:cfg.mode||'original',customWidth:cfg.customWidth,customHeight:cfg.customHeight};}
function _kpApplyLockedLayers(doc, cfg, snap){if(!cfg||!cfg.enabled)return;var counters={};_kpVisitLayers(doc,function(lyr){var nm=String(lyr.name||'').toLowerCase();if(!snap[nm])return;var rule=_kpGetLockRule(cfg,nm);var idx=counters[nm]||0;var tgt=(snap[nm]&&snap[nm][idx])?snap[nm][idx]:null;counters[nm]=idx+1;if(!tgt)return;if(rule.mode==='custom'){var cw=parseFloat(rule.customWidth)||0;var ch=parseFloat(rule.customHeight)||0;if(cw>0&&ch>0)_kpResizeLayerToInches(lyr,cw,ch);return;}if(rule.mode==='width_only'){var onlyW=parseFloat(rule.customWidth)||0;if(onlyW>0)_kpResizeLayerWidthInches(lyr,onlyW);return;}if(rule.mode==='height_only'){var onlyH=parseFloat(rule.customHeight)||0;if(onlyH>0)_kpResizeLayerHeightInches(lyr,onlyH);return;}_kpResizeLayerToInches(lyr,tgt.w,tgt.h);});}

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

function gen(sizes,iW,iH,dW,dH){var m={};var w=iW;var h=iH;for(var i=0;i<sizes.length;i++){m[sizes[i]]={width:w,height:h};w+=dW;h+=dH;}return m;}
var SIZES=["2XS","XS","small","medium","large","XL","2XL","3XL","4XL","5XL","7XL"];
var maps={"Men Sleeves":gen(SIZES,34.033,8.5,2,0.5),"Women Sleeves":gen(SIZES,30.033,7.5,2,0.5),"Long Sleeves":gen(SIZES,34.494,24.5,0.66,0.5),"Long Sleeves with Cuff":gen(SIZES,34.494,22.5,0.66,0.5),"Football Jersey Big Sleeve":gen(SIZES,40.5,12,2,0.5)};

function readCSV(text){var rows=[];var lines=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");for(var i=0;i<lines.length;i++){var l=lines[i];if(!l||!l.replace(/\s/g,""))continue;var useTab=(l.indexOf("\t")>=0);var parts=useTab?l.split("\t"):l.split(",");for(var j=0;j<parts.length;j++)parts[j]=parts[j].replace(/^\s+|\s+$/g,"");rows.push(parts);}return rows;}
function rowToRecord(row,columns){var r={};for(var i=0;i<columns.length;i++)r[columns[i].toLowerCase()]=row[i]||"";return r;}
function visitLayers(container,fn){for(var i=0;i<container.artLayers.length;i++)fn(container.artLayers[i]);for(var j=0;j<container.layerSets.length;j++)visitLayers(container.layerSets[j],fn);}
function adjustLayerScale(layer,maxW,maxH){var b=layer.bounds;var cw=(b[2].as("in")-b[0].as("in"));var ch=(b[3].as("in")-b[1].as("in"));if(cw>maxW)layer.textItem.horizontalScale=(maxW/Math.max(cw,0.0001))*100;else layer.textItem.horizontalScale=100;b=layer.bounds;ch=(b[3].as("in")-b[1].as("in"));if(ch>maxH)layer.textItem.verticalScale=(maxH/Math.max(ch,0.0001))*100;else layer.textItem.verticalScale=100;}
function getUniqueFileName(base,used){var n=base,c=1;while(used[n]){n=base+"_"+c;c++;}used[n]=true;return n;}

function kpHasEnye(v){v=String(v||'');return (v.indexOf('\u00D1')>=0||v.indexOf('\u00F1')>=0);}
function kpDisplayEnye(v){return String(v||'').replace(/\u00D1/g,'N').replace(/\u00F1/g,'n');}
function kpFindPlayerTextLayer(container){
  for(var i=0;i<container.layers.length;i++){
    var l=container.layers[i];
    try{if(l.kind===LayerKind.TEXT){var nm=String(l.name||'').toLowerCase();if(nm==='player'||nm==='name'||nm==='surname')return l;}}catch(_){ }
    try{if(l.typename==='LayerSet'){var f=kpFindPlayerTextLayer(l);if(f)return f;}}catch(_){ }
  }
  return null;
}
function kpAddTildeForEnye(nDoc, origName){
  var nPlayerLayer=kpFindPlayerTextLayer(nDoc); if(!nPlayerLayer)return;
  var nPlayerText=String(nPlayerLayer.textItem.contents||'');
  var nIndices=[]; for(var ci=0;ci<String(origName||'').length;ci++){var ch=String(origName).charCodeAt(ci);if(ch===0xD1||ch===0xF1)nIndices.push(ci);} if(!nIndices.length)return;
  var nTi=nPlayerLayer.textItem; var nFontSizePt=72; try{nFontSizePt=nTi.size.as('pt');}catch(_){try{nFontSizePt=Number(nTi.size)||72;}catch(__){}}
  var nFontSizeIn=nFontSizePt/72; var nColor=null; try{nColor=nTi.color;}catch(_){}
  var nSavedRuler=app.preferences.rulerUnits; app.preferences.rulerUnits=Units.INCHES;
  var nBL=Number(nPlayerLayer.bounds[0]); var nBT=Number(nPlayerLayer.bounds[1]); var nBR=Number(nPlayerLayer.bounds[2]);
  var nLayerW=nBR-nBL; var nAvgCharW=nPlayerText.length>0&&nLayerW>0?nLayerW/nPlayerText.length:nFontSizeIn*0.6;
  var nTildeY=nBT+(nFontSizeIn*0.25);
  for(var ii=0;ii<nIndices.length;ii++){
    var idx=nIndices[ii]; var nCharX=nBL+(idx*nAvgCharW)+(nAvgCharW*0.5);
    var tLayer=nDoc.artLayers.add(); tLayer.kind=LayerKind.TEXT; tLayer.name='_tilde_'+idx;
    var tti=tLayer.textItem; try{tti.contents='~';}catch(_){}
    try{tti.font='Impact';}catch(_){try{tti.font='ImpactMT';}catch(__){try{tti.font=nTi.font;}catch(___){}}}
    try{tti.size=new UnitValue(nFontSizePt,'pt');}catch(_){try{tti.size=nFontSizePt;}catch(__){}}
    try{if(nColor){var nc=new SolidColor();nc.rgb.red=nColor.rgb.red;nc.rgb.green=nColor.rgb.green;nc.rgb.blue=nColor.rgb.blue;tti.color=nc;}}catch(_){try{tti.color=nColor;}catch(__){}}
    try{tti.justification=Justification.CENTER;}catch(_){}
    try{tti.position=[new UnitValue(nCharX,'in'),new UnitValue(nTildeY,'in')];}catch(_){try{tti.position=[nCharX,nTildeY];}catch(__){}}
    try{nDoc.activeLayer=nPlayerLayer;executeAction(stringIDToTypeID('copyEffects'),undefined,DialogModes.NO);nDoc.activeLayer=tLayer;executeAction(stringIDToTypeID('pasteEffects'),undefined,DialogModes.NO);}catch(_){}
    try{tLayer.moveBefore(nPlayerLayer);}catch(_){}
  }
  app.preferences.rulerUnits=nSavedRuler;
}
function kpPostProcessEnyePsds(outputFolder, psdFilePaths, playersWithN){
  for(var ni=0;ni<psdFilePaths.length;ni++){
    try{
      var nDoc=app.open(new File(outputFolder.fsName+'/'+psdFilePaths[ni]));
      kpAddTildeForEnye(nDoc, playersWithN[ni]||'');
      nDoc.save();
      kpLog('INFO:Tilde added and saved: '+psdFilePaths[ni]);
    }catch(nErr){kpLog('WARN:Could not process Ñ file '+psdFilePaths[ni]+': '+nErr.message);}
  }
}


try {
  if(!app.documents.length) throw new Error("No active document open in Photoshop.");
  var doc=app.activeDocument;
  var sizeMappings=(P.useCustomMapping&&P.customMapping)?P.customMapping:maps[P.sizeMapping];
  if(!sizeMappings) throw new Error("Unknown size mapping: "+P.sizeMapping);
  var outputFolder=new Folder(P.folder+"/"+P.sizeMapping);
  if(!outputFolder.exists)outputFolder.create();
  var csvRows=readCSV(P.csvText);
  var columns=P.columns||["player","num1","num2","size","position"];
  if(P.useFirstRowAsHeaders&&csvRows.length>0){columns=csvRows[0];csvRows=csvRows.slice(1);}
  var total=csvRows.length;
  var maxW=parseFloat(P.maxWidth)||13;
  var maxH=parseFloat(P.maxHeight)||4;

  // ── Validate required text layers ──
  var slMissing=[];
  var slHasPlayer=(sizeMappings&&(doc.layers)); // skip — sleeves may not need player
  var slHasSize=false;
  function slFindLayer(container,name){for(var ai=0;ai<container.artLayers.length;ai++){if(container.artLayers[ai].kind==LayerKind.TEXT&&container.artLayers[ai].name===name)return true;}for(var gi=0;gi<container.layerSets.length;gi++){if(slFindLayer(container.layerSets[gi],name))return true;}return false;}
  if(!slFindLayer(doc,'size')) slMissing.push('size');
  if(slMissing.length>0){
    var slErr="MISSING_LAYERS:PSD is missing required text layer(s): "+slMissing.join(', ')+". Check layer names in Photoshop (case-sensitive).";
    kpLog("ERROR:"+slErr); throw new Error(slErr);
  }
  var used={};var initialState=doc.activeHistoryState;var done=0;var playersWithN=[];var psdFilePaths=[];
  var layerLockSnapshot=_kpSnapshotLockedLayers(doc,P.layerSizeLock);

  for(var i=0;i<total;i++){
    if(!kpCheck()) break;
    doc.activeHistoryState=initialState;
    var rec=rowToRecord(csvRows[i],columns);
    var playerOriginal=rec["player"]||rec["name"]||"";
    var playerHasN=kpHasEnye(playerOriginal);
    var playerDisplay=playerHasN?kpDisplayEnye(playerOriginal):playerOriginal;
    var size=rec["size"]||"";
    var dims=sizeMappings[size];
    if(!dims){kpLog("WARN:Size '"+size+"' not found, skipping row "+(i+1));continue;}
    doc.resizeImage(new UnitValue(dims.width,"in"),new UnitValue(dims.height,"in"));

    visitLayers(doc,function(layer){
      if(layer.kind!=LayerKind.TEXT) return;
      var lname=layer.name.toLowerCase();
      if(rec.hasOwnProperty(lname)){
        var val=rec[lname];
        if(lname==="player"){val=playerDisplay;layer.textItem.contents=val;adjustLayerScale(layer,maxW,maxH);}
        else{layer.textItem.contents=String(val);}
      } else if((lname==="num"||lname==="num1")&&rec["num1"]!==undefined){layer.textItem.contents=String(rec["num1"]);
      } else if(lname==="num2"&&rec["num2"]!==undefined){layer.textItem.contents=String(rec["num2"]);
      } else if(lname==="nickname"&&rec["position"]!==undefined){layer.textItem.contents=String(rec["position"]);}
    });

    _kpApplyLockedLayers(doc,P.layerSizeLock,layerLockSnapshot);
    var playerName=(playerOriginal||"item").replace(/[\\\/\:\*\?\"\<\>\|]/g,"_");
    var baseName=playerName+"_"+size;
    var fname=getUniqueFileName(baseName,used);
    if(playerHasN){doc.saveAs(new File(outputFolder+"/"+fname+".psd"),new PhotoshopSaveOptions(),true);playersWithN.push(playerOriginal);psdFilePaths.push(fname+".psd");kpLog("INFO:Saved Ñ PSD: "+fname+".psd");}
    else {if(P.saveJpg){var jo=new JPEGSaveOptions();jo.quality=parseInt(P.jpgQuality)||8;doc.saveAs(new File(outputFolder+"/"+fname+".jpg"),jo,true);}
    if(P.savePsd){doc.saveAs(new File(outputFolder+"/"+fname+".psd"),new PhotoshopSaveOptions(),true);}}
    done++;
    var szLabel=dims.width+"in × "+dims.height+"in";
    kpLog("PROGRESS:"+done+":"+total+":"+playerName+"|"+size+" ("+szLabel+")|"+fname+(playerHasN?".psd":(P.saveJpg?".jpg":".psd"))+"|"+(playerHasN?"warn":"ok"));
  }

  doc.activeHistoryState=initialState;
  var msg="DONE:"+done+"/"+total+" sleeves processed."; if(playersWithN.length)msg+="\nN_NAMES:"+playersWithN.join("\u001F"); if(psdFilePaths.length)msg+="\nN_PSDS:"+psdFilePaths.join("\u001F"); kpLog(msg); kpPostProcessEnyePsds(outputFolder,psdFilePaths,playersWithN);
} catch(e){ kpLog("ERROR:"+e.message); }
