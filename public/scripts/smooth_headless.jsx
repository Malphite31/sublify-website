// HEADLESS - Smooth All Text
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

function smoothLayers(container) {
  for(var i=0;i<container.artLayers.length;i++){
    var layer=container.artLayers[i];
    if(layer.kind==LayerKind.TEXT){
      try { layer.textItem.antiAliasMethod=AntiAlias.SMOOTH; count++; } catch(_){}
    }
  }
  for(var j=0;j<container.layerSets.length;j++){
    smoothLayers(container.layerSets[j]);
  }
}

try {
  if(!app.documents.length) throw new Error("No active document open in Photoshop.");
  var count=0;
  smoothLayers(app.activeDocument);
  kpLog("DONE:"+count+" text layers smoothed.");
} catch(e){
  kpLog("ERROR:"+e.message);
}
