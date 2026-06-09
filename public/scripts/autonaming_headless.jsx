// HEADLESS - AutoNaming
////#target photoshop  // not needed when run via COM

try { try { app.displayDialogs = DialogModes.NO; } catch(_) {} } catch(_) {}

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

try {
  if(!app.documents.length) throw new Error("No active document open in Photoshop.");
  var doc=app.activeDocument;
  var renamed=[];
  var playerRx=/^(player|surname|name)$/i;
  var sizeRx=/^(size|2xs|xs|s|m|l|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|small|medium|large)$/i;
  var numRx=/^\d{1,2}$/;

  function moveToTop(layer){
    try{
      if(layer.parent!==doc) layer.move(doc,ElementPlacement.PLACEATBEGINNING);
      layer.move(doc.artLayers[0],ElementPlacement.PLACEBEFORE);
    }catch(_){}
  }

  function processSet(layerSet){
    for(var i=0;i<layerSet.artLayers.length;i++){
      var layer=layerSet.artLayers[i];
      if(layer.kind!==LayerKind.TEXT) continue;
      var content=(""+layer.textItem.contents).replace(/^\s+|\s+$/g,"").toLowerCase();
      var orig=layer.name;
      if(playerRx.test(content)){ layer.name="player"; moveToTop(layer); if(layer.name!==orig) renamed.push(orig+" → player"); continue; }
      if(numRx.test(content)){
        var hasNum1=false;
        for(var n=0;n<doc.artLayers.length;n++){ if(doc.artLayers[n].name==="num1"){hasNum1=true;break;} }
        layer.name=hasNum1?"num2":"num1"; moveToTop(layer); if(layer.name!==orig) renamed.push(orig+" → "+layer.name); continue;
      }
      if(sizeRx.test(content)){ layer.name="size"; moveToTop(layer); if(layer.name!==orig) renamed.push(orig+" → size"); continue; }
    }
    for(var j=0;j<layerSet.layerSets.length;j++) processSet(layerSet.layerSets[j]);
  }

  processSet(doc);
  kpLog("DONE:"+renamed.length+" layers renamed.\nRENAMED:"+renamed.join("|"));
} catch(e){
  kpLog("ERROR:"+e.message);
}
