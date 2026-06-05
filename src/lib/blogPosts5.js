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
  {
    id: "windows-sound-microphone-configuration-guide",
    slug: "windows-sound-microphone-configuration-fix-audio-issues",
    title: "Windows Sound & Microphone Configuration: The Complete Guide to Fix Audio Issues Fast",
    excerpt: "Route audio to the right device, fix silent microphones, clear app permissions, and set correct defaults — the full Windows audio troubleshooting checklist.",
    date: "2026-06-05",
    author: "Derrk Samuel",
    category: "Software",
    tags: ["Windows", "Audio", "Microphone", "Troubleshooting", "Sound Settings", "Configuration"],
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    content: `## Windows Sound & Microphone Configuration

Windows audio is modular, not magical. Once the correct device is selected, permissions are cleared, and defaults are enforced, sound behaves predictably. This guide covers every layer — from basic settings to the legacy control panel.

---

## Audio Output (Speakers / Headphones)

**Objective:** Route system audio to the correct device.

1. Open **Settings → System → Sound**
2. Under **Output**, select your target device (speakers, headset, HDMI, USB DAC)
3. Confirm **Volume** is non-zero and not muted
4. Click **Device properties** to:
   - Set balance (L/R)
   - Disable enhancements if audio distortion occurs
   - Verify format — **24-bit, 48 kHz** is stable for most setups

---

## Audio Input (Microphones)

**Objective:** Ensure the correct mic is active and audible.

1. Go to **Settings → System → Sound → Input**
2. Select the intended microphone (USB mic, headset mic, webcam mic)
3. Set **Input volume** to around **70–85%** as a starting point
4. Click **Test your microphone** to confirm signal detection

---

## App-Level Microphone Permissions

**Objective:** Remove privacy bottlenecks that silently block mic access.

1. Navigate to **Settings → Privacy & security → Microphone**
2. Ensure:
   - **Microphone access** = ON
   - **Let apps access your microphone** = ON
3. Scroll down and individually enable access for apps like Zoom, Discord, and browsers

---

## Advanced Control Panel (Legacy but Critical)

**Objective:** Fine-grained control and default device management.

1. Press **Win + R**, type \`mmsys.cpl\`, press **Enter**

### Playback Tab
- Right-click your desired output device → **Set as Default**

### Recording Tab
- Right-click your microphone → **Set as Default**
- Open **Properties → Levels** to boost mic gain
- Disable **Exclusive Mode** if multiple apps are fighting for control

### Set Default via Control Panel (Alternative)

1. Select **Start → Control Panel**
2. In the search box, type \`sound\` and select **Sound**
3. On the **Playback** tab, select the correct audio device → click **Set Default** → **OK**

---

## Common Failure Modes & Fixes

| Symptom | Fix |
|---------|-----|
| Mic detected but silent | Increase input level, check physical mute switch |
| Wrong device auto-selected | Disable unused devices in Sound Control Panel |
| Bluetooth audio sounds bad | Switch to non-hands-free profile in Bluetooth settings |
| App hears nothing | Recheck app-specific mic permissions in Privacy settings |
| Audio distortion | Disable audio enhancements in Device properties |

---

## Fast Verification Checklist

- [ ] Correct input/output device selected
- [ ] Volume levels set (non-zero, not muted)
- [ ] App microphone permissions enabled
- [ ] Default devices set in Sound Control Panel
- [ ] No physical mute switches engaged
- [ ] Exclusive Mode disabled if needed

---

## Summary

This setup scales cleanly across headsets, USB mics, DACs, and HDMI audio paths. Work through each layer in order — Settings → Permissions → Control Panel — and the issue will surface at one of these checkpoints.`
  },
  {
    id: "flash-tails-os-512gb-ssd-guide",
    slug: "flash-tails-os-512gb-ssd-internal-drive-guide",
    title: "How to Flash Tails OS to a 512GB SSD — Wipe, Flash & Configure Persistent Storage",
    excerpt: "Prepare a 512GB SSD for Tails OS using BalenaEtcher or dd. Covers wiping the drive, flashing the ISO, booting, and setting up persistent storage on first launch.",
    date: "2026-06-05",
    author: "Derrk Samuel",
    category: "Privacy",
    tags: ["Tails", "Privacy", "Linux", "SSD", "Security", "BalenaEtcher", "Bootable", "Persistent Storage"],
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&auto=format&fit=crop&q=60",
    content: `## Flash Tails OS to a 512GB SSD

To format a 512GB SSD for use with Tails, it is strongly recommended to use GUI tools like **BalenaEtcher** or **Rufus** to flash the official ISO.

> **Important:** Tails is designed to be amnesic and run from removable media for security. It does not "install" in the traditional sense — you flash its image directly to the drive. Running it on a 512GB SSD provides massive persistent storage space but does not change its core amnesic nature outside the designated persistent volume.

---

## Step 1: Identify the Target SSD

Open a terminal in a Linux environment and run:

\`\`\`bash
lsblk
\`\`\`

Identify your 512GB SSD — it will appear as something like \`/dev/nvme0n1\` or \`/dev/sda\`.

**Double-check the identifier before proceeding. The next steps will erase all data on this drive.**

---

## Step 2: Wipe and Prepare the Drive

Replace \`/dev/sdX\` with your actual SSD identifier.

\`\`\`bash
# Unmount the drive if it is mounted
sudo umount /dev/sdX*

# Wipe the partition table
sudo dd if=/dev/zero of=/dev/sdX bs=1M count=100
\`\`\`

---

## Step 3: Flash Tails to the SSD

### Option A — BalenaEtcher (Recommended)

1. Download the [Tails ISO](https://tails.net) from the official site
2. Open **BalenaEtcher**
3. Select the Tails \`.img\` file
4. Select your SSD as the target
5. Click **Flash**

### Option B — Command Line (dd)

\`\`\`bash
# Replace 'tails-amd64-x.x.img' with your actual downloaded file path
sudo dd if=tails-amd64-x.x.img of=/dev/sdX bs=1M conv=fsync
\`\`\`

Wait for the command to complete — no progress bar will show unless you add \`status=progress\`:

\`\`\`bash
sudo dd if=tails-amd64-x.x.img of=/dev/sdX bs=1M conv=fsync status=progress
\`\`\`

---

## Step 4: Boot and Configure Persistent Storage

1. Restart your computer and boot from the SSD (press **F12**, **F11**, or **Esc** at startup to select the boot device)
2. Tails will load into a live session — nothing is saved by default
3. To save files and settings across reboots, go to:

\`\`\`
Applications → Tails → Configure persistent volume
\`\`\`

4. Set a strong passphrase and choose what to persist (files, browser bookmarks, additional software, etc.)
5. Reboot and unlock persistent storage at the Tails greeter screen

---

## What Persistent Storage Gives You on a 512GB SSD

| Feature | Without Persistent Storage | With Persistent Storage |
|---------|---------------------------|------------------------|
| Files saved | No | Yes (in encrypted volume) |
| Settings saved | No | Yes |
| Installed packages | No | Yes (if configured) |
| Amnesic by default | Yes | Yes (outside the persistent volume) |

A 512GB SSD gives you an unusually large persistent volume — most Tails users run on 16–64GB drives. The extra space is useful for storing large encrypted files, Electrum wallets, or offline research archives.

---

## Quick Reference

| Task | Command |
|------|---------|
| List drives | \`lsblk\` |
| Wipe drive | \`sudo dd if=/dev/zero of=/dev/sdX bs=1M count=100\` |
| Flash Tails image | \`sudo dd if=tails.img of=/dev/sdX bs=1M conv=fsync status=progress\` |
| Unmount first | \`sudo umount /dev/sdX*\` |`
  },
];