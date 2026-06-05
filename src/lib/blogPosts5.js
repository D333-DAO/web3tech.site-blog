export const BLOG_POSTS_5 = [
  {
    id: "update-upgrade-debian-linux-commands",
    slug: "update-upgrade-debian-linux-full-guide",
    title: "How to Fully Update and Upgrade a Debian System — apt Commands Explained",
    excerpt: "The complete Debian update workflow using apt — from refreshing package lists to full-upgrade and cleanup. Covers update, upgrade, full-upgrade, autoremove, and when to reboot.",
    date: "2026-06-05",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["Debian", "Linux", "apt", "Update", "Upgrade", "Package Manager", "Terminal", "System Administration"],
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&auto=format&fit=crop&q=60",
    content: `## Fully Update and Upgrade a Debian System

Use the following commands in the terminal to refresh the package list and install all available updates.

---

## Quick One-Liner

\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

Then for a more complete upgrade:

\`\`\`bash
sudo apt update && sudo apt dist-upgrade -y
\`\`\`

---

## Key Commands Explained

### \`sudo apt update\`
Updates the **local index** of available packages from the repositories. This does not install anything — it only refreshes the list.

### \`sudo apt upgrade\`
Installs **newer versions** of all currently installed packages. It will not remove any packages.

### \`sudo apt full-upgrade\` (or \`dist-upgrade\`)
Installs updates and **intelligently handles changing dependencies**, including removing packages if necessary for the upgrade.

### \`-y\`
Automatically answers **yes** to prompts, allowing the process to run without manual confirmation.

### \`&&\`
Chains commands — ensures \`upgrade\` only runs if \`update\` completes successfully.

---

## Recommended Workflow

### 1. Update Repository List

\`\`\`bash
sudo apt update
\`\`\`

### 2. Upgrade Packages

Standard upgrade (safe, no package removal):

\`\`\`bash
sudo apt upgrade
\`\`\`

Or full upgrade (handles dependency changes):

\`\`\`bash
sudo apt full-upgrade
\`\`\`

### 3. Clean Up (Optional)

Remove unnecessary dependency packages:

\`\`\`bash
sudo apt autoremove
\`\`\`

### 4. Reboot (If Required)

If kernel updates were installed, reboot to apply them:

\`\`\`bash
sudo reboot
\`\`\`

---

## upgrade vs full-upgrade — When to Use Which

| Command | Use Case |
|---------|----------|
| \`apt upgrade\` | Routine updates — safe, never removes packages |
| \`apt full-upgrade\` | Major upgrades — handles dependency changes, may remove packages |
| \`apt dist-upgrade\` | Alias for full-upgrade — same behavior |

---

## Full Update Script (Copy/Paste Ready)

\`\`\`bash
sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove -y
\`\`\`

This single line handles everything: refresh, upgrade, and cleanup.`
  },
  {
    id: "debian-persistent-live-usb-guide",
    slug: "install-debian-persistent-live-usb-rufus-guide",
    title: "How to Install Debian as a Persistent Live USB — Step-by-Step Guide",
    excerpt: "Create a persistent Debian Live USB that saves your files and settings across reboots. Covers downloading the right ISO, using Rufus on Windows, and configuring the persistence.conf file.",
    date: "2026-06-05",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["Debian", "Linux", "Live USB", "Persistent", "Rufus", "Bootable USB", "Installation"],
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&auto=format&fit=crop&q=60",
    content: `## Install Debian as a Persistent Live USB

A persistent Debian Live USB runs Debian directly from the flash drive while saving your files and settings across reboots — no hard drive installation required.

> **Note:** Debian is slightly more complex than Ubuntu here because it requires a specific partition label and \`persistence.conf\` file to recognize persistent storage.

---

## What You Need

- A USB flash drive (**16GB+ recommended**)
- A second USB or the same machine to download/flash from
- [Rufus](https://rufus.ie) (Windows) or \`mkusb\` (Linux)

---

## Step 1: Download the Debian Live ISO

You **must** use a **Live image** — not the standard "netinst" installer.

1. Go to the [Debian Live ISO Download Page](https://www.debian.org/CD/live/)
2. Choose a desktop environment: **GNOME**, **KDE**, or **XFCE**
3. Select the **amd64** architecture

---

## Step 2: Flash the USB with Rufus (Windows)

Rufus handles the persistence partition automatically.

1. Plug in your USB drive
2. Open **Rufus** and select your USB under **Device**
3. Click **Select** and choose your Debian ISO
4. A **Persistent partition size** slider will appear — move it to your desired size (e.g., **4GB or more**)
5. Set **Partition scheme** to **GPT** (for modern UEFI systems)
6. Click **Start** — if prompted, select **"Write in ISO Image mode"**

---

## Step 3: Create the persistence.conf File

Even after Rufus creates the persistence partition, Debian won't use it until it sees a \`persistence.conf\` file.

### 3a. Boot into the Live USB

Restart your PC, press your boot menu key (**F12**, **F11**, or **Esc**), and select your USB drive.

### 3b. Add the persistence boot parameter

At the Debian boot menu, highlight the Live option and press **e** to edit boot parameters. Add the word \`persistence\` to the end of the line starting with \`linux\`, then press **F10** to boot.

### 3c. Find your persistence partition

Once inside Debian, open a terminal and run:

\`\`\`bash
lsblk
\`\`\`

Your persistence partition is usually \`/dev/sda3\` or \`/dev/sdb3\`.

### 3d. Mount it and create the config file

\`\`\`bash
sudo mkdir /mnt/persist
sudo mount /dev/sdX3 /mnt/persist
echo "/ union" | sudo tee /mnt/persist/persistence.conf
sudo umount /mnt/persist
\`\`\`

Replace \`sdX3\` with your actual partition identifier.

### 3e. Reboot

\`\`\`bash
sudo reboot
\`\`\`

---

## Step 4: Boot with Persistence Every Time

At the Debian boot menu, select **"Debian Live with Persistence"**.

If that option isn't visible, manually add \`persistence\` to the boot parameters as shown in Step 3b.

---

## Alternative: mkusb (Linux Only)

If you're already on Linux, **mkusb** automates the entire process — partition creation, labeling, and \`persistence.conf\` setup — for Debian images.

\`\`\`bash
sudo add-apt-repository universe
sudo apt install mkusb
\`\`\`

Then launch it and follow the guided prompts.

---

## Hardware Recommendations

| Use Case | Recommended Hardware |
|----------|---------------------|
| Occasional use | Standard USB 3.0 flash drive (16GB+) |
| Daily driver | USB 3.1/3.2 flash drive or external SSD |
| Long-term daily use | External SSD — flash drives wear out faster under OS load |

---

## Quick Checklist

- [ ] Download Debian **Live** ISO (not netinst)
- [ ] Flash with Rufus, set persistence partition size
- [ ] Boot into Live USB, add \`persistence\` boot parameter
- [ ] Create \`persistence.conf\` on the persistence partition
- [ ] Reboot and select "Live with Persistence" from boot menu`
  },
];