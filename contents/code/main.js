[
  'clientAdded',
  'clientRemoved',
  'clientActivated',
  'desktopPresenceChanged',
].forEach(function(s) {
  workspace[s].connect(function() {
    workspace.desktops = (workspace.clientList().reduce(function(n, c) {
      if (c.desktop >= 0)
        n[c.desktop - 1] = true
      return n
    }, []).length || 1) + 1
  })
})
