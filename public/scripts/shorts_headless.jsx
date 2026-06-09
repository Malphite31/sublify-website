// HEADLESS Shorts Lineup — pause/cancel/progress enabled
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
var _shortsSynonyms={"s":"small","m":"medium","l":"large","xl":"XL","2xl":"2XL","xxl":"2XL","3xl":"3XL","4xl":"4XL","5xl":"5XL","6xl":"6XL","7xl":"7XL","xs":"XS","2xs":"2XS","ys":"YS","ym":"YM","yl":"YL","yxl":"YXL","y2xl":"Y2XL","y3xl":"Y3XL"};
function _sNorm(s){var clean=(s||'').replace(/\s*-\s*/g,'-').toLowerCase().replace(/\s+/g,'');return _shortsSynonyms[clean]||clean;}

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

var sizeMappingsStandard={'size 2':{width:53,height:14},'size 4':{width:55,height:16},'size 6':{width:57,height:18},'size 8':{width:59,height:20},'size 10':{width:61,height:22},'size 12':{width:63,height:24},'2XS':{width:61,height:21},'XS':{width:63,height:22},'small':{width:65,height:23},'medium':{width:67,height:24},'large':{width:69,height:25},'XL':{width:71,height:26},'2XL':{width:73,height:27},'3XL':{width:75,height:28},'4XL':{width:77,height:29},'5XL':{width:79,height:30},'6XL':{width:81,height:31},'YXS':{width:57,height:20},'YS':{width:59,height:21},'YM':{width:61,height:22},'YL':{width:63,height:23},'YXL':{width:65,height:24},'Y2XL':{width:67,height:25},'Y3XL':{width:69,height:26},'Y4XL':{width:71,height:27},'Y5XL':{width:73,height:28}};
var sizeMappingsMeshShorts={'2XS':{width:55.239,height:17},'XS':{width:58.486,height:18},'small':{width:61.733,height:19},'medium':{width:64.98,height:20},'large':{width:68.227,height:21},'XL':{width:71.474,height:22},'2XL':{width:74.721,height:23},'3XL':{width:77.968,height:24},'4XL':{width:81.215,height:25},'5XL':{width:84.462,height:26},'6XL':{width:87.709,height:27},'7XL':{width:90.956,height:28}};
var WomensizeMappings={'size 2':{width:53,height:14},'size 4':{width:55,height:16},'size 6':{width:57,height:18},'size 8':{width:59,height:20},'size 10':{width:61,height:22},'size 12':{width:63,height:24},'2XS':{width:48.5,height:16},'XS':{width:51.5,height:17},'small':{width:54.5,height:18},'medium':{width:57.5,height:19},'large':{width:60.5,height:20},'XL':{width:63.5,height:21},'2XL':{width:66.5,height:22},'3XL':{width:69.5,height:23},'4XL':{width:72.5,height:24},'5XL':{width:75.5,height:25},'6XL':{width:78.5,height:27}};
var VolleyballShirtMen={'XS':{width:60.5,height:19.5},'small':{width:62.5,height:20.5},'medium':{width:64.5,height:21.5},'large':{width:66.5,height:22.5},'XL':{width:68.5,height:23.5},'2XL':{width:70.5,height:24.5},'3XL':{width:72.5,height:25.5},'4XL':{width:74.5,height:26.5},'5XL':{width:76.5,height:27.5},'6XL':{width:78.5,height:28.5}};
var sizeMappingsVolleyballMens={'XS':{width:63,height:19},'small':{width:65,height:20},'medium':{width:67,height:21},'large':{width:69,height:22},'XL':{width:71,height:23},'2XL':{width:73,height:24},'3XL':{width:75,height:25},'4XL':{width:77,height:26},'5XL':{width:79,height:27},'6XL':{width:81,height:28}};
var sizeMappingsVolleyballWomens={'XS':{width:59,height:15},'small':{width:61,height:16},'medium':{width:63,height:17},'large':{width:65,height:18},'XL':{width:67,height:19},'2XL':{width:69,height:20},'3XL':{width:71,height:21},'4XL':{width:73,height:22},'5XL':{width:75,height:23},'6XL':{width:77,height:24}};

function getMappingByName(name){switch(name){case "Standard":return sizeMappingsStandard;case "Mesh Shorts":return sizeMappingsMeshShorts;case "Womens Shorts":return WomensizeMappings;case "Volleyball Mens Top":return VolleyballShirtMen;case "Volleyball Mens Shorts":return sizeMappingsVolleyballMens;case "Volleyball Womens Shorts":return sizeMappingsVolleyballWomens;default:return sizeMappingsStandard;}}
function readCSV(text){var rows=[];var lines=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");for(var i=0;i<lines.length;i++){var l=lines[i];if(!l||!l.replace(/\s/g,""))continue;var useTab=(l.indexOf("\t")>=0);var parts=useTab?l.split("\t"):l.split(",");for(var j=0;j<parts.length;j++)parts[j]=parts[j].replace(/^\s+|\s+$/g,"");rows.push(parts);}return rows;}
function updateTextLayers(container,num,size,player){for(var i=0;i<container.artLayers.length;i++){var l=container.artLayers[i];if(l.kind==LayerKind.TEXT){if(l.name=="num1"||l.name=="num2")l.textItem.contents=num;else if(l.name=="size")l.textItem.contents=size;else if(l.name=="player")l.textItem.contents=player;}}for(var j=0;j<container.layerSets.length;j++)updateTextLayers(container.layerSets[j],num,size,player);}
function getUniqueFileName(base,used){var n=base,c=1;while(used[n]){n=base+"_"+c;c++;}used[n]=true;return n;}
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
// Returns F-prefixed size string for women/female mappings
function femaleSize(s){var m={'S':'FS','M':'FM','L':'FL','XS':'FXS','XL':'FXL','2XL':'F2XL','3XL':'F3XL','4XL':'F4XL','5XL':'F5XL','2XS':'F2XS','small':'FS','medium':'FM','large':'FL'};return m[s]||m[(s||'').toLowerCase()]||s;}
function kpSanitizeFilePart(v){return String(v===undefined||v===null?'':v).replace(/[\\\/\:\*\?"\<\>\|]/g,'_').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');}

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

try {
  if(!app.documents.length) throw new Error("No active document open in Photoshop.");
  var doc=app.activeDocument;
  var selectedSizeMappings=(P.useCustomMapping&&P.customMapping)?P.customMapping:getMappingByName(P.sizeMapping);
  var outputFolder=new Folder(P.folder+"/"+P.sizeMapping);
  if(!outputFolder.exists)outputFolder.create();
  var csvRows=readCSV(P.csvText);
  var total=csvRows.length;
  var used={};var initialState=doc.activeHistoryState;var done=0;var playersWithN=[];var psdFilePaths=[];
  var layerLockSnapshot=_kpSnapshotLockedLayers(doc,P.layerSizeLock);

  for(var i=0;i<total;i++){
    if(!kpCheck()) break;
    doc.activeHistoryState=initialState;
    var row=csvRows[i];
    // flexible column mapping
    var columns=P.columns||['num','size','player','pocket'];
    if(P.useFirstRowAsHeaders&&i===0){columns=row;continue;}
    var rec={}; for(var ci=0;ci<columns.length;ci++) rec[columns[ci].toLowerCase()]=row[ci]||'';
    var num=rec['num']||rec['num1']||rec['number']||row[0]||'';
    var size=(rec['size']||row[1]||'').replace(/\s*-\s*/g,'-').replace(/^\s+|\s+$/g,'');
    var sizeLookup=_sNorm(size);
    var player=rec['player']||rec['name']||'';
    var playerHasN=kpHasEnye(player);
    var playerDisplay=playerHasN?kpDisplayEnye(player):player;
    // Detect female/women mapping for F-prefix size display
    var isFemaleMapping=(/women|womens|female/i.test(P.sizeMapping||''));
    var sizeDisplay=isFemaleMapping?femaleSize(size):size;
    var hasPocket=(P.pocket||(rec['pocket']&&rec['pocket'].toLowerCase()==='pocket')||(row[2]&&row[2].toLowerCase()==='pocket'));
    var waistbandLayer=null;
    for(var j=0;j<doc.artLayers.length;j++){if(doc.artLayers[j].name==="waistband"){waistbandLayer=doc.artLayers[j];break;}}

    updateTextLayers(doc,num,sizeDisplay,playerDisplay);

    var dims=selectedSizeMappings[size]||selectedSizeMappings[sizeLookup]||selectedSizeMappings[String(size).toLowerCase()];
    // Custom size formats (shorts bleed: +25 width, +4 height):
    // "L-18"  → L's width,      height = 18+4
    // "42-L"  → width = 42+25,  L's height  (WIDTH-SIZE reverse format)
    if(!dims && size.indexOf('-')>=0){
      var dashParts=size.split('-');
      var sp0=String(dashParts[0]||'').replace(/\s+/g,'');
      var sp1=String(dashParts[1]||'').replace(/\s+/g,'');
      var n0=parseFloat(sp0);
      var n1=parseFloat(sp1);

      // Reverse format: "42-L" → number first, size name second
      if(!isNaN(n0) && isNaN(n1) && sp1.length>0){
        var revBase=_sNorm(sp1);
        var revDims=selectedSizeMappings[revBase]||selectedSizeMappings[revBase.toLowerCase()];
        if(revDims){
          dims={width:n0+25, height:revDims.height};
        }
      } else {
        // Normal: "L-18" → size name first, height second
        var baseSize=_sNorm(sp0);
        if(!isNaN(n1)){
          var baseDims=selectedSizeMappings[baseSize]||selectedSizeMappings[baseSize.toLowerCase()];
          if(baseDims){
            dims={width:baseDims.width, height:n1+4};
          }
        }
      }
    }
    // Raw WxH format for shorts: "42x16" → canvas = (42+25) x (16+4)
    if(!dims){var spx=size.split('x');if(spx.length===2)dims={width:parseFloat(spx[0])+25,height:parseFloat(spx[1])+4};}
    if(!dims){
      if(P.skipResize){dims={width:0,height:0};}
      else{kpLog("WARN:Size '"+size+"' not found, skipping row "+(i+1));continue;}
    }
    if(!P.skipResize)doc.resizeImage(new UnitValue(dims.width,"in"),new UnitValue(dims.height,"in"));

    if(waistbandLayer){var dh=3.29;var ch=waistbandLayer.bounds[3]-waistbandLayer.bounds[1];waistbandLayer.resize(100,(dh/ch)*100);}
    if(hasPocket){doc.flatten();try{app.doAction("Pocket Center","POCKET");}catch(pe){}}

    _kpApplyLockedLayers(doc,P.layerSizeLock,layerLockSnapshot);
    var wO=dims.width-23;var hO=dims.height-4;
    var baseName=kpBuildFileName(P.fileNameTemplate,{player:player,name:player,num:num,num1:num,size:size,map:P.sizeMapping});
    var fname=getUniqueFileName(baseName,used);

    if(P.crop){
      var w=doc.width.as("in");var h=doc.height.as("in");
      doc.crop([0,0,w/2,h]);
      var fnR=getUniqueFileName(fname+"_right",used);
      if(playerHasN){ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fnR+".psd"),new PhotoshopSaveOptions(),true);playersWithN.push(player);psdFilePaths.push(fnR+".psd");kpLog("INFO:Saved Ñ PSD: "+fnR+".psd");}
      else {if(P.saveJpg){try{var jo=new JPEGSaveOptions();jo.quality=parseInt(P.jpgQuality)||8;doc.saveAs(new File(outputFolder+"/"+fnR+".jpg"),jo,true);}catch(se){var fd=null;try{fd=doc.duplicate();fd.flatten();var jo2=new JPEGSaveOptions();jo2.quality=parseInt(P.jpgQuality)||8;fd.saveAs(new File(outputFolder+"/"+fnR+".jpg"),jo2,true);}catch(_){}finally{try{if(fd)fd.close(SaveOptions.DONOTSAVECHANGES);}catch(_){}}}}
      if(P.savePsd){ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fnR+".psd"),new PhotoshopSaveOptions(),true);}}
      doc.activeHistoryState=doc.historyStates[doc.historyStates.length-2];
      doc.crop([w/2,0,w,h]);
      var fnL=getUniqueFileName(fname+"_left",used);
      if(playerHasN){ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fnL+".psd"),new PhotoshopSaveOptions(),true);playersWithN.push(player);psdFilePaths.push(fnL+".psd");kpLog("INFO:Saved Ñ PSD: "+fnL+".psd");}
      else {if(P.saveJpg){var jo2=new JPEGSaveOptions();jo2.quality=parseInt(P.jpgQuality)||8;doc.saveAs(new File(outputFolder+"/"+fnL+".jpg"),jo2,true);}
      if(P.savePsd){ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fnL+".psd"),new PhotoshopSaveOptions(),true);}}
      doc.activeHistoryState=doc.historyStates[doc.historyStates.length-2];
    } else {
      if(playerHasN){ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fname+".psd"),new PhotoshopSaveOptions(),true);playersWithN.push(player);psdFilePaths.push(fname+".psd");kpLog("INFO:Saved Ñ PSD: "+fname+".psd");}
      else {if(P.saveJpg){var jo3=new JPEGSaveOptions();jo3.quality=parseInt(P.jpgQuality)||8;doc.saveAs(new File(outputFolder+"/"+fname+".jpg"),jo3,true);}
      if(P.savePsd){ensureWhiteBackground(doc);doc.saveAs(new File(outputFolder+"/"+fname+".psd"),new PhotoshopSaveOptions(),true);}}
    }
    done++;
    var szLabel=dims.width+"in × "+dims.height+"in";
    kpLog("PROGRESS:"+done+":"+total+":"+num+"|"+size+" ("+szLabel+")|"+fname+(playerHasN?".psd":(P.saveJpg?".jpg":".psd"))+"|"+(playerHasN?"warn":"ok"));
  }

  doc.activeHistoryState=initialState;
  var msg="DONE:"+done+"/"+total+" shorts processed."; if(playersWithN.length)msg+="\nN_NAMES:"+playersWithN.join("\u001F"); if(psdFilePaths.length)msg+="\nN_PSDS:"+psdFilePaths.join("\u001F"); kpLog(msg); kpPostProcessEnyePsds(outputFolder,psdFilePaths,playersWithN);
} catch(e){ kpLog("ERROR:"+e.message); }
