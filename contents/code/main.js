['clientAdded', 'clientRemoved', 'clientActivated', 'desktopPresenceChanged'].forEach(function(s) {
  workspace[s].connect(function() {
    var wins = workspace.clientList()
    var geos = wins.map(function(w) { return w.geometry })
    workspace.desktops = 1 + Math.max.apply(Math, wins.map(function(w) { return w.desktop }))
    wins.forEach(function(w, i) { w.geometry = geos[i] })
  })
})
