var LOCK = false;

function desktops() {
  return workspace.clientList().reduce(function(n, w) { return Math.max(n, w.desktop); }, -1);
}

function winsInDesktop(d) {
  return workspace.clientList().filter(function(w) { return w.desktop == d; });
}

function winsFromDesktop(d) {
  return workspace.clientList().filter(function(w) { return w.desktop > d; });
}

function pushWinsFromDesktop(n) {
  workspace.desktops++;
  winsFromDesktop(n).forEach(function(w) { w.desktop += 1; });
  if (n < workspace.currentDesktop)
    workspace.currentDesktop++;
}

function pullWinsFromDesktop(n) {
  winsFromDesktop(n).forEach(function(w) { w.desktop -= 1; });
  if (n < workspace.currentDesktop)
    workspace.currentDesktop--;
}

function updateDesktops() {
  if (winsInDesktop(1).length > 0)
    pushWinsFromDesktop(0);
  for (var i = 2; i <= workspace.desktops; i++)
    if (i != workspace.currentDesktop && winsInDesktop(i).length == 0)
      pullWinsFromDesktop(i);
  workspace.desktops = Math.max(readConfig('minimumDesktops', 1), desktops() + 1);
}

function update() {
  if (LOCK)
    return;
  LOCK = true;
  var wins = workspace.clientList();
  var geos = wins.map(function(w) { return w.geometry; })
  updateDesktops();
  wins.forEach(function(w, i) { w.geometry = geos[i]; })
  LOCK = false;
}

workspace.clientAdded.connect(update);
workspace.clientRemoved.connect(update);
workspace.clientActivated.connect(update);
workspace.currentDesktopChanged.connect(update);
workspace.desktopPresenceChanged.connect(update);
