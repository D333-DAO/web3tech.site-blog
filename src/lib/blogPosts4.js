// Blog posts 4 — additional system administration and security guides
export const BLOG_POSTS_4 = [
  {
    id: "change-root-password-switch-accounts-ubuntu",
    slug: "change-root-password-switch-accounts-ubuntu-server",
    title: "Change Root Password & Switch Accounts on Ubuntu Server",
    excerpt: "Set or change the root password using sudo passwd root, lock the root account, and learn how to switch between user accounts with the su command.",
    date: "2026-06-05",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["Ubuntu", "Root Password", "Sudo", "Account Management", "Linux", "Server", "Security"],
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&auto=format&fit=crop&q=60",
    content: `## Change Root Password on Ubuntu Server

To change the root password on an Ubuntu server, log in with a user that has sudo privileges and run \`sudo passwd root\`. You will be prompted to enter your current user password, followed by the new password for the root account.

---

## Steps to Change Root Password

### 1. Log In to Your Ubuntu Server

Connect via SSH or open a terminal:

\`\`\`bash
ssh user@your-server-ip
\`\`\`

Or simply open a terminal window locally.

### 2. Run the Password Change Command

\`\`\`bash
sudo passwd root
\`\`\`

### 3. Enter Your Current User Password

When prompted, type your **current user's password** (not the root password):

\`\`\`
[sudo] password for user:
\`\`\`

### 4. Enter the New Root Password

Type the new root password:

\`\`\`
New password:
\`\`\`

Re-type it to confirm:

\`\`\`
Retype new password:
\`\`\`

Once confirmed, the root password is updated.

---

## Optional: Lock the Root Account After

If you want to disable root login after setting the password:

\`\`\`bash
sudo passwd -l root
\`\`\`

This locks the root account so it cannot be used directly (you can still use \`sudo\` commands).

---

## If You're Already Logged In as Root

If you're already running as the root user, you can simply type:

\`\`\`bash
passwd
\`\`\`

No \`sudo\` required—it will directly change the root password.

---

## If You Forgot the Root Password

If you've forgotten the root password and need to reset it:

1. Restart the server
2. Access the GRUB menu during boot (hold Shift)
3. Select recovery mode or single-user mode
4. You'll have root shell access without a password
5. Run \`passwd\` to set a new root password
6. Reboot normally

This requires physical or console access to the server.

---

## Switch Accounts on Ubuntu Server

### Switch to Root Account

\`\`\`bash
su -
\`\`\`

The \`-\` flag loads the root user's profile and environment variables. You'll be prompted for the root password.

### Switch to Another User Account

\`\`\`bash
su - ExampleUserName
\`\`\`

Replace \`ExampleUserName\` with the actual username. You'll be prompted for that user's password.

### Quick Account Switch (Without Profile)

To switch accounts without loading their shell profile:

\`\`\`bash
su root        # Just the username, no environment loaded
su ExampleUserName
\`\`\`

The difference is subtle—\`su -\` is generally preferred because it fully loads the user's environment.

---

## Quick Reference

| Task | Command |
|------|---------|
| Change root password | \`sudo passwd root\` |
| Change password as root | \`passwd\` |
| Lock root account | \`sudo passwd -l root\` |
| Unlock root account | \`sudo passwd -u root\` |
| Switch to root | \`su -\` |
| Switch to another user | \`su - username\` |
| Switch without profile | \`su username\` |

---

## Security Notes

- Root access should be restricted to necessary operations only
- Use \`sudo\` for individual commands rather than switching to root
- Consider locking the root account (\`passwd -l\`) if direct root login isn't needed
- Always use strong passwords for the root account
- Keep sudo access auditable by using it instead of direct root login`
  },
  {
    id: "restart-x-server-ubuntu",
    slug: "restart-x-server-ubuntu-display-manager",
    title: "Restart X Server on Ubuntu — Systemd, Service, and Kill Commands",
    excerpt: "Fix frozen GUIs or display issues by restarting your X server. Learn four methods: systemctl, service command, process kill, and keyboard shortcuts.",
    date: "2026-06-05",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["Ubuntu", "X Server", "Display Manager", "Troubleshooting", "Terminal", "Linux", "System Management"],
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&auto=format&fit=crop&q=60",
    content: `## Restart X Server on Ubuntu

When your GUI freezes, becomes unresponsive, or has display issues, restarting the X server often fixes the problem. Here are the most reliable methods.

---

## Method 1: Systemd Command (Recommended)

The modern, system-wide approach for most Ubuntu installations:

\`\`\`bash
sudo systemctl restart display-manager
\`\`\`

This restarts the active display manager (GDM3, LightDM, SDDM, etc.) and will log you out cleanly.

---

## Method 2: Service Command (LightDM)

If your system uses LightDM specifically:

\`\`\`bash
sudo service lightdm restart
\`\`\`

This is an older method but works reliably on systems running LightDM.

---

## Method 3: Kill the X Server Process

For immediate, hard termination:

\`\`\`bash
sudo pkill X
\`\`\`

Or:

\`\`\`bash
sudo killall Xorg
\`\`\`

This forcefully terminates the X server process, which will restart automatically. Use this when systemctl commands don't work.

---

## Method 4: Keyboard Shortcut

If enabled on your system:

\`\`\`
Ctrl + Alt + Backspace
\`\`\`

This immediately kills the X session. However, this shortcut is often disabled by default on modern Ubuntu systems.

---

## Using a Virtual Console

If the GUI is completely frozen and shortcuts don't work:

1. Press **Ctrl + Alt + F2** to switch to a terminal (TTY 2)
2. Log in with your username and password
3. Run one of the restart commands above:

\`\`\`bash
sudo systemctl restart display-manager
\`\`\`

4. Switch back to the GUI with **Ctrl + Alt + F1** or **Ctrl + Alt + F2**

---

## Important Note

**Restarting the X server will:**
- Close all open graphical applications without saving
- Log you out of your session
- Terminate any unsaved work

Make sure to save important files before restarting.

---

## Quick Reference

| Method | Command |
|--------|---------|
| Systemd (Recommended) | \`sudo systemctl restart display-manager\` |
| LightDM Service | \`sudo service lightdm restart\` |
| Kill X Process | \`sudo pkill X\` |
| Kill Xorg | \`sudo killall Xorg\` |
| Keyboard Shortcut | **Ctrl + Alt + Backspace** |
| Via Console | Switch to TTY, then run restart command |

Use the systemd method unless you have a specific reason not to. If that fails, switch to a virtual console and use \`pkill X\` or \`killall Xorg\` for a hard restart.`
  },
];