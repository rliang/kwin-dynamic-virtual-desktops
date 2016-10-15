function refresh() {
  workspace.clientList().forEach(function(win) {
    win.savedGeometry = win.geometry
  })
  workspace.desktops = workspace.clientList().reduce(function(d, win) {
    if (win.desktop >= 0)
      d[win.desktop] = true
    return d
  }, [,]).length
  workspace.clientList().forEach(function(win) {
    if (win.savedGeometry)
      win.geometry = win.savedGeometry
  })
}

workspace.clientAdded.connect(refresh)
workspace.clientRemoved.connect(refresh)
workspace.clientActivated.connect(refresh)
workspace.desktopPresenceChanged.connect(refresh)
