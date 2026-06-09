// ── FLAG FILE CONTROL (injected by Electron) ──
// _KP_FLAG is the path to a text file containing "run", "pause", or "cancel"
// Call kpCheck() between rows — it blocks on pause and returns false on cancel.
function kpCheck() {
  try {
    var f = new File(_KP_FLAG);
    if (!f.exists) return true; // if file gone, keep going
    f.open('r');
    var state = f.readln();
    f.close();
    if (state === 'cancel') {
      $.writeln('CANCELLED:User cancelled.');
      return false;
    }
    // Spin-wait while paused (polls every 200ms)
    while (state === 'pause') {
      $.writeln('PAUSED:Script is paused...');
      $.sleep(300);
      f.open('r'); state = f.readln(); f.close();
      if (state === 'cancel') {
        $.writeln('CANCELLED:User cancelled during pause.');
        return false;
      }
    }
    if (state === 'run') $.writeln('RESUMED:Resuming...');
  } catch(e) { /* file access error — keep going */ }
  return true;
}
