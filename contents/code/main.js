var LOCK = false;

function desktops() {
  return workspace.clientList().reduce(function(n, w) { return Math.max(n, w.skipPager ? -1 : w.desktop); }, -1);
}

function winsInDesktop(d) {
  return workspace.clientList().filter(function(w) { return w.desktop == d && !w.skipPager; });
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
  var showInFront = readConfig('showEmptyDesktopInFront', true);
  var showAtBack = readConfig('showEmptyDesktopAtBack', true);
  print(showInFront);
  print(showAtBack);
  if (showInFront)
    if (winsInDesktop(1).length > 0)
      pushWinsFromDesktop(0);
  for (var i = (showInFront ? 2 : 1); i <= workspace.desktops; i++)
    if (i != workspace.currentDesktop && winsInDesktop(i).length == 0)
      pullWinsFromDesktop(i);
  workspace.desktops = Math.max(readConfig('minimumDesktops', 1), desktops() + (showAtBack ? 1 : 0));
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
