// KP I/O helper — injected at top of all headless scripts
// _KP_LOG  = path to log file (Electron polls this)
// _KP_FLAG = path to flag file (pause/cancel)

// Write a line to the log file (replaces $.writeln)
function kpLog(msg) {
  try {
    var f = new File(_KP_LOG);
    f.encoding = 'UTF-8';
    f.open('a'); // append
    f.writeln(msg);
    f.close();
  } catch(e) { $.writeln(msg); } // fallback to console if file fails
}

// Check pause/cancel — returns false if script should stop
function kpCheck() {
  try {
    var f = new File(_KP_FLAG);
    if (!f.exists) return true;
    f.open('r'); var state = f.readln(); f.close();
    if (state === 'cancel') { kpLog('CANCELLED:User cancelled.'); return false; }
    while (state === 'pause') {
      kpLog('PAUSED:Paused — waiting...');
      $.sleep(300);
      f.open('r'); state = f.readln(); f.close();
      if (state === 'cancel') { kpLog('CANCELLED:User cancelled during pause.'); return false; }
    }
  } catch(e) {}
  return true;
}
