# kwin-dynamic-virtual-desktops
KWin script that automatically adds/removes virtual desktops.

## Installation

```sh
git clone https://github.com/rliang/kwin-dynamic-virtual-desktops ~/.local/share/kwin/scripts/dynamicVirtualDesktops
mkdir -p ~/.local/share/kservices5
ln -s ~/.local/share/{kwin/scripts/dynamicVirtualDesktops/metadata,kservices5/kwin-script-dynamicVirtualDesktops}.desktop
qdbus org.kde.KWin /KWin reconfigure
```
