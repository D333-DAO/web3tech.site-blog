export const BLOG_POSTS_6 = [
  {
    id: "linux-ufw-firewall-setup-guide",
    slug: "linux-ufw-firewall-setup-guide",
    title: "UFW Firewall Setup on Linux — Secure Your Server in 10 Minutes",
    excerpt: "UFW (Uncomplicated Firewall) is the easiest way to lock down your Linux server. This guide covers enabling UFW, allowing only the ports you need, blocking everything else, and verifying your rules.",
    date: "2026-06-06",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["UFW", "Firewall", "Ubuntu", "Linux", "Security", "Server", "Networking"],
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    content: `## UFW Firewall Setup on Linux

UFW (Uncomplicated Firewall) is the default firewall tool on Ubuntu and most Debian-based distros. It wraps \`iptables\` in a much simpler interface and is the fastest way to lock down a Linux server.

---

## Step 1 — Install UFW

UFW is pre-installed on most Ubuntu systems. Check if it's there:

\`\`\`bash
sudo apt install ufw
\`\`\`

---

## Step 2 — Check Current Status

\`\`\`bash
sudo ufw status verbose
\`\`\`

If it says **Status: inactive**, UFW is installed but not yet enforcing rules.

---

## Step 3 — Set Default Policies

Before enabling, set your default behavior:

\`\`\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
\`\`\`

This blocks all inbound traffic by default and allows all outbound. You then open only what you need.

---

## Step 4 — Allow SSH (Critical — Do This Before Enabling)

If you're connected via SSH, allow it before enabling UFW or you'll lock yourself out:

\`\`\`bash
sudo ufw allow ssh
\`\`\`

Or by port number:

\`\`\`bash
sudo ufw allow 22/tcp
\`\`\`

If you use a non-standard SSH port (e.g., 2222):

\`\`\`bash
sudo ufw allow 2222/tcp
\`\`\`

---

## Step 5 — Allow Other Ports You Need

### Web Server

\`\`\`bash
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
\`\`\`

### Blockchain Nodes

\`\`\`bash
sudo ufw allow 30303/tcp  # Ethereum P2P
sudo ufw allow 16110/tcp  # Kaspa RPC / P2P
sudo ufw allow 8333/tcp   # Bitcoin P2P
\`\`\`

### Custom App Port

\`\`\`bash
sudo ufw allow 8080/tcp
\`\`\`

---

## Step 6 — Enable UFW

\`\`\`bash
sudo ufw enable
\`\`\`

You'll be prompted to confirm. Type **y** and press Enter.

---

## Step 7 — Verify Your Rules

\`\`\`bash
sudo ufw status numbered
\`\`\`

Example output:
\`\`\`
Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 22/tcp                     ALLOW IN    Anywhere
[ 2] 80/tcp                     ALLOW IN    Anywhere
[ 3] 443/tcp                    ALLOW IN    Anywhere
\`\`\`

---

## Deleting Rules

Delete a rule by number (use \`status numbered\` to find the number):

\`\`\`bash
sudo ufw delete 2
\`\`\`

Or delete by rule spec:

\`\`\`bash
sudo ufw delete allow 80/tcp
\`\`\`

---

## Disable UFW (If Needed)

\`\`\`bash
sudo ufw disable
\`\`\`

This stops enforcement without deleting your rules.

---

## Rate Limiting (Brute Force Protection)

Limit connection attempts to SSH (blocks IPs that attempt 6+ connections in 30 seconds):

\`\`\`bash
sudo ufw limit ssh
\`\`\`

---

## Quick Reference

| Goal | Command |
|------|---------|
| Check status | \`sudo ufw status verbose\` |
| Default deny inbound | \`sudo ufw default deny incoming\` |
| Allow SSH | \`sudo ufw allow ssh\` |
| Allow port | \`sudo ufw allow 8080/tcp\` |
| Enable UFW | \`sudo ufw enable\` |
| Disable UFW | \`sudo ufw disable\` |
| Delete rule | \`sudo ufw delete [number]\` |
| Rate limit SSH | \`sudo ufw limit ssh\` |

UFW is fast to configure and straightforward to maintain — every Linux server exposed to the internet should have it enabled.`
  },
  {
    id: "linux-ssh-hardening-guide",
    slug: "linux-ssh-hardening-guide",
    title: "SSH Hardening on Linux — 7 Steps to Lock Down Remote Access",
    excerpt: "Default SSH settings are a security risk. This guide walks you through the essential hardening steps: disabling root login, using key-based auth, changing the default port, and more.",
    date: "2026-06-06",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["SSH", "Security", "Linux", "Ubuntu", "Server", "Hardening", "Authentication"],
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=60",
    content: `## SSH Hardening on Linux

The default SSH configuration on most Linux servers is functional but not secure. Bots and automated scanners probe port 22 constantly. These 7 steps significantly reduce your attack surface.

---

## Step 1 — Generate an SSH Key Pair (On Your Local Machine)

Before hardening, set up key-based auth so you don't lock yourself out when you disable password login.

On your **local machine**:

\`\`\`bash
ssh-keygen -t ed25519 -C "your-label"
\`\`\`

This creates two files in \`~/.ssh/\`:
- \`id_ed25519\` — private key (keep this safe, never share it)
- \`id_ed25519.pub\` — public key (this goes on the server)

---

## Step 2 — Copy Your Public Key to the Server

\`\`\`bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@your-server-ip
\`\`\`

Or manually append it to the server's \`~/.ssh/authorized_keys\`:

\`\`\`bash
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
\`\`\`

Test that key-based login works **before** disabling password auth:

\`\`\`bash
ssh -i ~/.ssh/id_ed25519 user@your-server-ip
\`\`\`

---

## Step 3 — Edit the SSH Config File

Open the SSH daemon config on the **server**:

\`\`\`bash
sudo nano /etc/ssh/sshd_config
\`\`\`

---

## Step 4 — Disable Root Login

Find and set:

\`\`\`bash
PermitRootLogin no
\`\`\`

Root is the most targeted account. Never allow direct root SSH access.

---

## Step 5 — Disable Password Authentication

Once key-based auth works, disable passwords entirely:

\`\`\`bash
PasswordAuthentication no
ChallengeResponseAuthentication no
\`\`\`

This makes brute-force attacks impossible — there's no password to guess.

---

## Step 6 — Change the Default Port

Change from port 22 to something less targeted:

\`\`\`bash
Port 2222
\`\`\`

This won't stop determined attackers but eliminates noise from mass scanners targeting port 22.

**Important:** Also update your firewall:

\`\`\`bash
sudo ufw allow 2222/tcp
sudo ufw delete allow 22/tcp
\`\`\`

---

## Step 7 — Restrict Login to Specific Users

Limit SSH access to specific usernames:

\`\`\`bash
AllowUsers yourusername
\`\`\`

Or restrict to a specific group:

\`\`\`bash
AllowGroups sshusers
\`\`\`

---

## Apply the Changes

After editing \`sshd_config\`, reload SSH:

\`\`\`bash
sudo systemctl reload sshd
\`\`\`

**Test the new connection in a new terminal window** before closing your current session.

---

## Bonus: Fail2Ban (Auto-Block Attackers)

Install Fail2Ban to automatically ban IPs that fail login attempts:

\`\`\`bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
\`\`\`

Check its status:

\`\`\`bash
sudo fail2ban-client status sshd
\`\`\`

---

## Hardening Checklist

| Step | Setting | Value |
|------|---------|-------|
| Root login | \`PermitRootLogin\` | \`no\` |
| Password auth | \`PasswordAuthentication\` | \`no\` |
| Default port | \`Port\` | Non-22 value |
| Allowed users | \`AllowUsers\` | Your username only |
| Key type | Key pair | \`ed25519\` |
| Brute force | Fail2Ban | Enabled |

These steps combined make your SSH setup resistant to the vast majority of automated attacks.`
  },
  {
    id: "solana-web3js-quickstart-guide",
    slug: "solana-web3js-quickstart-guide",
    title: "Solana Web3.js Quickstart — Connect, Check Balances, and Send SOL",
    excerpt: "Get started building on Solana using the @solana/web3.js library. Connect to devnet, generate a keypair, airdrop SOL, check balances, and send your first transaction — all from the command line.",
    date: "2026-06-06",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["Solana", "Web3", "JavaScript", "SOL", "Devnet", "Crypto", "Development", "Blockchain"],
    readTime: "8 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop&q=60",
    content: `## Solana Web3.js Quickstart

Solana is one of the fastest blockchains available, with sub-second finality and low fees. The \`@solana/web3.js\` library is the standard JavaScript SDK for building on Solana. This guide gets you connected and transacting on devnet in minutes.

---

## Prerequisites

Node.js 18+ installed. Check with:

\`\`\`bash
node --version
\`\`\`

---

## Step 1 — Install the SDK

\`\`\`bash
npm install @solana/web3.js
\`\`\`

---

## Step 2 — Connect to Devnet

\`\`\`javascript
const { Connection, clusterApiUrl } = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
console.log("Connected to Solana devnet");
\`\`\`

Available clusters:
- \`"devnet"\` — free test tokens, safe for development
- \`"testnet"\` — testing pre-production features
- \`"mainnet-beta"\` — real SOL, real money

---

## Step 3 — Generate a New Keypair

\`\`\`javascript
const { Keypair } = require("@solana/web3.js");

const keypair = Keypair.generate();
console.log("Public key:", keypair.publicKey.toString());
console.log("Secret key:", Buffer.from(keypair.secretKey).toString("hex"));
\`\`\`

> **Never expose your secret key in production or commit it to version control.**

---

## Step 4 — Airdrop SOL (Devnet Only)

\`\`\`javascript
const { LAMPORTS_PER_SOL } = require("@solana/web3.js");

async function airdrop(connection, keypair) {
  const signature = await connection.requestAirdrop(
    keypair.publicKey,
    1 * LAMPORTS_PER_SOL  // 1 SOL
  );
  await connection.confirmTransaction(signature);
  console.log("Airdropped 1 SOL. Signature:", signature);
}

airdrop(connection, keypair);
\`\`\`

---

## Step 5 — Check a Balance

\`\`\`javascript
async function getBalance(connection, publicKey) {
  const balance = await connection.getBalance(publicKey);
  console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");
}

getBalance(connection, keypair.publicKey);
\`\`\`

---

## Step 6 — Send SOL

\`\`\`javascript
const {
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

async function sendSol(connection, from, to, amountSol) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: amountSol * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
  console.log("Transaction sent! Signature:", signature);
  return signature;
}
\`\`\`

---

## Full Script (Put It All Together)

\`\`\`javascript
const {
  Connection, clusterApiUrl, Keypair,
  LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey
} = require("@solana/web3.js");

async function main() {
  // Connect
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Create wallets
  const sender = Keypair.generate();
  const receiver = Keypair.generate();

  console.log("Sender:", sender.publicKey.toString());
  console.log("Receiver:", receiver.publicKey.toString());

  // Airdrop to sender
  const sig = await connection.requestAirdrop(sender.publicKey, 2 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(sig);
  console.log("Airdrop confirmed");

  // Check balance
  const balance = await connection.getBalance(sender.publicKey);
  console.log("Sender balance:", balance / LAMPORTS_PER_SOL, "SOL");

  // Send 0.5 SOL
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver.publicKey,
      lamports: 0.5 * LAMPORTS_PER_SOL,
    })
  );
  const txSig = await sendAndConfirmTransaction(connection, tx, [sender]);
  console.log("Sent 0.5 SOL. TX:", txSig);

  // Final balance
  const finalBalance = await connection.getBalance(sender.publicKey);
  console.log("Final balance:", finalBalance / LAMPORTS_PER_SOL, "SOL");
}

main().catch(console.error);
\`\`\`

---

## Key Concepts

| Concept | Detail |
|---------|--------|
| LAMPORTS_PER_SOL | 1,000,000,000 (1 SOL = 1 billion lamports) |
| Keypair | Public + private key for signing transactions |
| Connection | Connects you to a Solana cluster (devnet/mainnet) |
| Transaction | Container for one or more instructions |
| SystemProgram.transfer | Native SOL transfer instruction |

---

## Useful Devnet Resources

- **Faucet:** [faucet.solana.com](https://faucet.solana.com) — Get free devnet SOL via browser
- **Explorer:** [explorer.solana.com](https://explorer.solana.com/?cluster=devnet) — Track your transactions
- **Docs:** [docs.solana.com](https://docs.solana.com) — Full SDK reference`
  },
  {
    id: "ipfs-upload-retrieve-files-guide",
    slug: "ipfs-upload-retrieve-files-guide",
    title: "IPFS Explained — Upload and Retrieve Files on the Decentralized Web",
    excerpt: "IPFS (InterPlanetary File System) is the backbone of decentralized storage in Web3. Learn how to install IPFS, add files to the network, retrieve them by hash, and pin them so they don't disappear.",
    date: "2026-06-06",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["IPFS", "Web3", "Decentralized Storage", "Blockchain", "NFT", "P2P", "Files"],
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
    content: `## What Is IPFS?

IPFS (InterPlanetary File System) is a peer-to-peer distributed file system that stores and retrieves content by its **cryptographic hash** rather than by location (like a URL).

Instead of asking "where is this file?", IPFS asks "what is this file?" — a content hash never changes, so you always get exactly what you requested. This is the foundation of NFT metadata storage, decentralized websites, and Web3 data permanence.

---

## Install IPFS (Kubo — Go Implementation)

### Linux/Ubuntu

\`\`\`bash
wget https://dist.ipfs.tech/kubo/v0.27.0/kubo_v0.27.0_linux-amd64.tar.gz
tar -xvzf kubo_v0.27.0_linux-amd64.tar.gz
cd kubo
sudo bash install.sh
\`\`\`

Verify:

\`\`\`bash
ipfs --version
\`\`\`

---

## Initialize Your IPFS Node

\`\`\`bash
ipfs init
\`\`\`

This creates your node identity and config at \`~/.ipfs/\`.

Your **Peer ID** (like an address on the IPFS network) is shown in the output.

---

## Start the IPFS Daemon

\`\`\`bash
ipfs daemon
\`\`\`

Leave this running in a terminal (or run it as a systemd service).

---

## Add a File to IPFS

\`\`\`bash
ipfs add myfile.txt
\`\`\`

Output:
\`\`\`
added QmXyz123... myfile.txt
\`\`\`

The \`QmXyz123...\` string is your file's **Content Identifier (CID)**. This is how anyone on IPFS can retrieve your file.

---

## Add a Folder

\`\`\`bash
ipfs add -r ./my-folder/
\`\`\`

This adds all files recursively and returns a CID for the folder root.

---

## Retrieve a File by CID

\`\`\`bash
ipfs cat QmXyz123...
\`\`\`

This fetches and prints the file contents. To save it:

\`\`\`bash
ipfs get QmXyz123... -o ./output-file.txt
\`\`\`

---

## Access Files via HTTP Gateway

If the IPFS daemon is running locally:

\`\`\`
http://localhost:8080/ipfs/QmXyz123...
\`\`\`

Via a public gateway (no local node required):

\`\`\`
https://ipfs.io/ipfs/QmXyz123...
https://cloudflare-ipfs.com/ipfs/QmXyz123...
\`\`\`

Public gateways are useful for sharing links with people who don't run IPFS nodes.

---

## Pinning — Keep Files Available

By default, IPFS may garbage-collect files that aren't pinned. Pin a file to keep it:

\`\`\`bash
ipfs pin add QmXyz123...
\`\`\`

List your pinned files:

\`\`\`bash
ipfs pin ls
\`\`\`

Remove a pin:

\`\`\`bash
ipfs pin rm QmXyz123...
\`\`\`

---

## Remote Pinning (Persistent Storage)

Your local node must stay online for files to be available. For permanent storage, use a pinning service:

- **Pinata** — [pinata.cloud](https://pinata.cloud) — Most popular for NFTs
- **web3.storage** — [web3.storage](https://web3.storage) — Free tier available
- **Infura IPFS** — [infura.io/product/ipfs](https://infura.io/product/ipfs)

These services keep your files pinned even when your node is offline.

---

## IPFS in Web3 Context

### NFT Metadata Example

Most NFT projects store metadata on IPFS:

\`\`\`json
{
  "name": "My NFT #1",
  "description": "A unique digital asset",
  "image": "ipfs://QmXyz123.../image.png",
  "attributes": [...]
}
\`\`\`

The \`ipfs://\` URI scheme ensures the metadata is content-addressed and tamper-proof.

### Upload Metadata with Node.js

\`\`\`javascript
const { create } = require("ipfs-http-client");

const client = create({ url: "http://localhost:5001" });

const metadata = JSON.stringify({
  name: "My NFT #1",
  description: "IPFS-stored metadata",
  image: "ipfs://QmImageHash..."
});

const result = await client.add(metadata);
console.log("CID:", result.path);
// → QmMetadataHash...
\`\`\`

---

## Quick Reference

| Goal | Command |
|------|---------|
| Initialize node | \`ipfs init\` |
| Start daemon | \`ipfs daemon\` |
| Add file | \`ipfs add file.txt\` |
| Add folder | \`ipfs add -r ./folder/\` |
| Retrieve by CID | \`ipfs cat QmXyz...\` |
| Save locally | \`ipfs get QmXyz... -o output\` |
| Pin file | \`ipfs pin add QmXyz...\` |
| List pins | \`ipfs pin ls\` |
| Check node info | \`ipfs id\` |
| Check peers | \`ipfs swarm peers\` |

IPFS is the foundation of most decentralized storage strategies in Web3 — understanding how it works is essential for anyone building dApps, NFT platforms, or censorship-resistant applications.`
  },
];