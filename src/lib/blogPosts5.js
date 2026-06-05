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
];