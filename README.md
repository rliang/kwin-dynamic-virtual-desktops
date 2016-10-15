# kwin-dynamic-virtual-desktops
KWin script that automatically adds/removes virtual desktops.

## Installation

```sh
git clone https://github.com/rliang/kwin-dynamic-virtual-desktops ~/.local/share/kwin/scripts/kwin-dynamic-virtual-desktops
plasmapkg -t kwinscript -i ~/.local/share/kwin/scripts/kwin-dynamic-virtual-desktops
qdbus org.kde.KWin /KWin reconfigure
```
