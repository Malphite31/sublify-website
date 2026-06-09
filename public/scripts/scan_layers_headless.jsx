//#target photoshop

try { app.displayDialogs = DialogModes.NO; } catch(_) {}

function kpLog(msg) {
  try {
    var lf = new File(_KP_LOG);
    lf.encoding = 'UTF-8';
    lf.open('a');
    lf.writeln(msg);
    lf.close();
  } catch(e) { $.writeln(msg); }
}

function _kpVisitLayers(container, fn){for(var i=0;i<container.layers.length;i++){var lyr=container.layers[i];fn(lyr);if(lyr.typename==='LayerSet')_kpVisitLayers(lyr, fn);}}
function _kpLayerSizeIn(lyr){var b=lyr.bounds;return{w:Math.abs(b[2].as('in')-b[0].as('in')),h:Math.abs(b[3].as('in')-b[1].as('in'))};}
function _kpRound(n){return Math.round(n*1000)/1000;}
function _kpJsonEscape(s){return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\r/g,'\\r').replace(/\n/g,'\\n');}

try {
  if (!app.documents.length) throw new Error('No active document open in Photoshop.');
  var doc = app.activeDocument;
  var byName = {};
  _kpVisitLayers(doc, function(lyr){
    try {
      var nm = String(lyr.name || '').replace(/^\s+|\s+$/g,'');
      if (!nm) return;
      var key = nm.toLowerCase();
      var sz = _kpLayerSizeIn(lyr);
      if (!byName[key]) byName[key] = { name:nm, count:0, width:sz.w, height:sz.h };
      byName[key].count++;
    } catch(_) {}
  });
  var names = [];
  for (var k in byName) if (byName.hasOwnProperty(k)) names.push(k);
  names.sort();
  var out = [];
  for (var i=0;i<names.length;i++) {
    var row = byName[names[i]];
    out.push('{"name":"'+_kpJsonEscape(row.name)+'","count":'+row.count+',"width":'+_kpRound(row.width)+',"height":'+_kpRound(row.height)+'}');
  }
  kpLog('DONE:LAYER_SCAN:{"layers":[' + out.join(',') + ']}');
} catch(e) {
  kpLog('ERROR:' + (e && e.message ? e.message : e));
}
