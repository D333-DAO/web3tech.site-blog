import { BLOG_POSTS_2 } from "./blogPosts2";

const BLOG_POSTS_1 = [
  {
    id: "debian-vm-pixel-9a-kali-tools",
    title: "Running a Debian VM on Pixel 9a — Install Kali Tools Without Root",
    slug: "debian-vm-pixel-9a-kali-tools-no-root",
    excerpt: "Use Google's Android Virtualization Framework to run a real Debian VM on your Pixel 9a — no root, no bootloader unlock. Then install Kali tools inside it for a production-safe mobile security lab.",
    date: "2026-05-30",
    author: "Derrk Samuel",
    category: "Security",
    tags: ["Debian", "Android", "Pixel", "Kali", "Virtualization", "Linux", "Security"],
    readTime: "6 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/241ccc70a_generated_image.png",
    featured: false,
    content: `## 🐧 Running the Debian VM on Pixel 9a

This uses Google's Android Virtualization Framework (AVF). It gives you a real Debian environment running in a secure VM — no root, no bootloader unlock, no hacks.

Once Debian is running, you can install Kali tools inside it.

## ⭐ Step 1 — Enable Developer Options

1. Open **Settings → About phone**
2. Tap **Build number** seven times
3. Go back → **System → Developer options**
4. Enable:
   - **Virtualization support** (if present)
   - **USB debugging** (optional but useful)

## ⭐ Step 2 — Install the "Linux on Android" App

Google distributes a first-party app called **"Android Virtualization Framework Terminal"** or **"Linux Terminal"** depending on region.

When you enable the Linux VM in Developer Options, the Linux app is automatically downloaded and installed by default. You can also find it in the Play Store for your Pixel 9a. If it's not available in your region, you can sideload the official APK from Google's developer site.

Once installed, open it — it will automatically create and boot a Debian VM.

## ⭐ Step 3 — Update Debian

Inside the VM terminal:

\`\`\`bash
sudo apt update
sudo apt upgrade -y
\`\`\`

This gives you a clean, up-to-date Debian environment.

## ⭐ Step 4 — Add Kali Tools

You won't turn Debian into Kali, but you can install the Kali toolsets.

### Option A — Install the "Top 10" Kali Tools

\`\`\`bash
sudo apt install kali-tools-top10
\`\`\`

### Option B — Install the Full Kali Metapackages

\`\`\`bash
sudo apt install kali-linux-large
\`\`\`

### Option C — Install Specific Tools

\`\`\`bash
sudo apt install nmap hydra sqlmap wireshark
\`\`\`

Everything runs inside the VM, isolated from Android.

## ⭐ Step 5 — (Optional) Add a GUI

The Debian VM is terminal-only by default, but you can add a lightweight desktop.

For example, XFCE:

\`\`\`bash
sudo apt install xfce4
\`\`\`

Then run it through a VNC server:

\`\`\`bash
sudo apt install tightvncserver
vncserver
\`\`\`

Connect from Android using any VNC client.

## ⭐ What This Setup Gives You

- A real Debian environment
- Ability to install Kali tools
- No root required
- No risk to your Pixel 9a
- Works even with a locked bootloader
- Stable and supported by Google's virtualization stack

This is the most "production-safe" way to run Linux on a Pixel.

## Want to Go Further?

I can walk you through:

- Setting up a full Kali-like environment inside the VM
- Installing Metasploit, Burp Suite, or other heavy tools
- Adding GPU acceleration (where supported)
- Automating startup scripts
- Setting up a desktop environment that feels like a real Kali box`
  },
  {
    id: "diskpart-full-wipe-partition-format",
    title: "Full Wipe → Partition → Format → Ready-to-Use (DiskPart Script)",
    slug: "diskpart-full-wipe-partition-format-script",
    excerpt: "The cleanest, safest, and most correct DiskPart sequence for preparing any drive on Windows. Includes full wipe, GPT initialization, partition creation, and NTFS formatting.",
    date: "2026-05-30",
    author: "Derrk Samuel",
    category: "Software",
    tags: ["DiskPart", "Windows", "Disk Management", "Formatting", "Partition", "Command Line"],
    readTime: "4 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/3e90fcf71_generated_6266866e.png",
    featured: false,
    content: `## Full Wipe → Partition → Format → Ready-to-Use (DiskPart Script)

This is the cleanest, safest, and most correct sequence for preparing any drive on Windows.

It performs:

1. Full wipe (partition table removed)
2. GPT initialization (modern standard)
3. Primary partition creation
4. NTFS quick format
5. Drive letter assignment

## 🧨 ⚠️ WARNING — This Erases the Entire Disk

Double-check the disk number using \`list disk\` before running this.

**DiskPart does not ask for confirmation.**

## 🧱 DiskPart Command Sequence (Copy/Paste Ready)

\`\`\`bash
diskpart
list disk
select disk X
clean
convert gpt
create partition primary
format fs=ntfs label="NewDisk" quick
assign letter=Z
exit
\`\`\`

Replace \`X\` with the correct disk number.

## 🧩 What Each Step Does

### \`clean\`
Removes all partitions and volume info. Fast and effective for most cases.

### \`clean all\` (Optional)
Writes zeros to every sector. Use only if you need a forensic-level wipe (much slower).

### \`convert gpt\`
Sets the disk to GPT — required for modern UEFI systems and drives larger than 2TB.

### \`create partition primary\`
Creates a single, full-size primary partition.

### \`format fs=ntfs quick\`
Formats the new partition with NTFS.

You can swap NTFS for:
- \`fat32\` (for compatibility)
- \`exfat\` (for large removable drives)

### \`assign letter=Z\`
Mounts the new volume as drive Z:. Change the letter to whatever you want.

## 🧪 Optional Enhancements

### Create a Specific-Size Partition
\`\`\`bash
create partition primary size=50000
\`\`\`
(creates a 50GB partition)

### Create Multiple Partitions
\`\`\`bash
create partition primary size=100000
create partition primary
\`\`\`
(creates 2 primary partitions on the disk)

### Format as exFAT
\`\`\`bash
format fs=exfat quick
\`\`\`

### Make It Bootable (Windows Install Media)
\`\`\`bash
active
\`\`\`
(Only works on MBR disks)

## Key Points

- **Always verify the disk number** with \`list disk\` before proceeding
- \`clean\` is fast; \`clean all\` is secure but slow
- GPT is the modern standard for UEFI systems
- NTFS is the default for Windows; use exFAT for cross-platform compatibility
- This sequence leaves you with a clean, ready-to-use drive
- **One disk per sequence** — avoid mixing multiple operations on different disks in a single batch
- **Test in a VM first** if you're unfamiliar with DiskPart to prevent accidental data loss
- **Backup important data** before running any disk operations
- **Verify filesystem** — NTFS works on Windows, exFAT for cross-platform compatibility, and FAT32 for older systems or small flash drives`
  },
  {
    id: "alison-free-online-courses-platform",
    title: "Alison.com: The Complete Guide to Free Online Learning and Professional Development",
    slug: "alison-free-online-courses-professional-development-guide",
    excerpt: "Discover Alison.com, the leading free online learning platform offering thousands of certified courses in business, technology, health, and more. Learn how to advance your career without breaking the bank.",
    date: "2026-05-24",
    author: "Derrk Samuel",
    category: "Software",
    tags: ["Online Learning", "Free Courses", "Professional Development", "Career Growth", "Certification", "E-Learning", "Skills Training"],
    readTime: "9 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/90549dee9_generated_image.png",
    featured: false,
    content: `## What Is Alison.com?

Alison.com is a global online learning platform that provides free, high-quality courses to millions of learners worldwide. Founded in 2007, the platform has democratized education by removing financial barriers to learning. Unlike traditional online education providers, Alison offers genuine certifications and professional development opportunities at zero cost, making it one of the most accessible e-learning platforms available today.

With over 50 million registered learners across 200+ countries, Alison has established itself as a trusted resource for career advancement, skill development, and personal growth. The platform combines accessibility with quality, ensuring that anyone with internet access can upskill without financial constraints.

## Why Choose Alison.com? Key Benefits

### 100% Free Education

The most compelling advantage of Alison.com is that courses are completely free. There are no hidden fees, subscription costs, or premium paywalls. This makes professional development accessible to students, career changers, and professionals regardless of budget.

### Recognized Certifications

Unlike many free platforms, Alison offers genuine Diplomas and Certificates that you can add to your resume and LinkedIn profile. These credentials are recognized by employers and educational institutions globally, providing tangible proof of completed learning.

### Flexible, Self-Paced Learning

All courses are self-paced, allowing you to learn on your own schedule. Whether you're working full-time, managing family responsibilities, or studying other subjects, you control when and how fast you progress through material.

### Wide Range of Subjects

Alison covers virtually every professional field and interest, including:
- **Business & Management:** Leadership, Project Management, Digital Marketing, Entrepreneurship
- **Technology & IT:** Web Development, Data Science, Cloud Computing, Cybersecurity Basics
- **Health & Medicine:** Nursing Fundamentals, Psychology, Nutrition, First Aid
- **Language Learning:** English, Spanish, French, and dozens of other languages
- **Personal Development:** Time Management, Communication Skills, Personal Finance
- **Academic Subjects:** Mathematics, Sciences, History, Social Studies

### Mobile-Friendly Platform

Learn anywhere, anytime. Alison's mobile app (iOS and Android) allows you to access courses on smartphones and tablets, making it easy to study during commutes, breaks, or while traveling.

### No Prerequisites Required

Most courses are designed for beginners, so you don't need prior knowledge or qualifications to get started. Courses progress from foundational concepts to advanced topics.

## How Alison.com Works: Getting Started

### 1. Create Your Free Account

Visit Alison.com and sign up with your email address or social media account. Registration takes just a few minutes and is completely free.

### 2. Browse and Enroll in Courses

Search by subject, skill level, or career goal. Each course page displays:
- Course duration and time commitment
- Learning objectives
- Curriculum overview
- Instructor information
- Learner reviews and ratings

Simply click "Enroll Now" to start immediately—no waiting periods or admissions processes.

### 3. Complete Interactive Lessons

Courses combine video lectures, interactive quizzes, and hands-on projects. You progress through modules at your own pace, with built-in assessments to reinforce learning.

### 4. Earn Your Certificate

Upon completion, pass the final exam to earn your Alison Certificate or Diploma. Download it instantly, add it to your LinkedIn profile, and share it with employers.

### 5. Continue Your Learning Journey

Explore related courses to deepen expertise or pivot to new skills. Many learners complete multiple courses to build comprehensive skill sets.

## Alison vs. Other Online Learning Platforms

| Feature | Alison | Coursera | Udemy | edX |
|---|---|---|---|---|
| Cost | Completely Free | Paid (with free audit option) | Paid ($10–$200) | Mostly Free Audit |
| Certificates | Free Certificates & Diplomas | Paid Certificates | Certificates Included | Free or Paid |
| Course Variety | 3,000+ Courses | 200+ Subjects | 150,000+ Courses | University-Level |
| Prerequisites | Minimal | Varies | None | Varies |
| Mobile Learning | Yes, Full App | Yes | Yes | Limited |

## The Value Proposition: Free Learning Without Compromise

Alison.com proves that quality education doesn't require expensive tuition. By offering free courses with genuine certifications, the platform has made professional development accessible to millions globally. Whether you're looking to advance your career, switch industries, or pursue personal enrichment, Alison provides a legitimate, cost-effective pathway to skill acquisition and credential earning.

The best time to invest in yourself is now. Let Alison be your partner in lifelong learning and career growth.`
  },
  {
    id: "docker-containers-smart-contract-interaction",
    title: "Using Docker Containers to Interact with Smart Contracts",
    slug: "docker-containers-smart-contract-interaction",
    excerpt: "Package your blockchain development environment into isolated, reproducible Docker containers. Learn to containerize Web3 tools, set up multi-container networks with Ganache, and streamline smart contract interactions.",
    date: "2026-05-24",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["Docker", "Smart Contracts", "Containers", "Development", "Ethereum", "DevOps"],
    readTime: "8 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/f8853543a_generated_image.png",
    featured: false,
    content: `## Overview

Using a container to interact with smart contracts means packaging your blockchain development tools along with your code into an isolated, reproducible environment. This approach is often implemented using Docker or a similar container technology.

## 1. Containerizing Your Development Environment

### Create a Dockerfile

Your Dockerfile will specify a base image (often one that comes with Node.js, Python, or your language of choice) and install the necessary dependencies. For example, if you are using Node.js with Ethers.js or Web3.js:

\`\`\`dockerfile
FROM node:16
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

### Build the Image

\`\`\`bash
docker build -t smart-contract-interactor .
\`\`\`

## 2. Interacting with Smart Contracts Inside the Container

\`\`\`javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://your-provider-url");
const contractAddress = "0xYourContractAddress";
const abi = [ /* ABI definitions */ ];
const contract = new ethers.Contract(contractAddress, abi, provider);

async function getData() {
  const result = await contract.yourReadMethod();
  console.log("Data from contract:", result);
}

getData();
\`\`\`

### Run Your Container

\`\`\`bash
docker run -it smart-contract-interactor
\`\`\`

## 3. Using Docker Compose for Multi-Container Setups

\`\`\`yaml
version: '3'

services:
  blockchain:
    image: trufflesuite/ganache-cli
    ports:
      - "8545:8545"

  app:
    build: .
    depends_on:
      - blockchain
    environment:
      - RPC_URL=http://blockchain:8545
\`\`\`

\`\`\`bash
docker-compose up
\`\`\`

## 4. Benefits of Containerization

**Consistency** — Every developer and deployment environment runs the same software stack.

**Isolation** — Dependencies and configurations are bundled together.

**Scalability** — Containers can be easily deployed in the cloud with CI/CD pipelines.

**Reproducibility** — Eliminates "it works on my machine" issues.`
  },
  {
    id: "smart-contract-interactions-private-networks",
    title: "Interact with Deployed Smart Contracts — Read and Write Operations on Private Networks",
    slug: "smart-contract-interactions-private-networks",
    excerpt: "Learn how to interact with deployed smart contracts using web3.js and web3js-quorum. Master read and write operations on both public and private Ethereum networks.",
    date: "2026-05-23",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["Smart Contracts", "Web3", "Ethereum", "Private Networks", "Solidity", "Development"],
    readTime: "10 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/61655169e_generated_image.png",
    featured: false,
    content: `## Overview

This tutorial shows you how to interact with smart contracts that have been deployed to a network. Whether you're working with public blockchain networks or private Ethereum instances, understanding how to read from and write to deployed contracts is fundamental to Web3 development.

## SimpleStorage Contract

\`\`\`solidity
pragma solidity ^0.7.0;

contract SimpleStorage {
  uint public storedData;

  constructor(uint initVal) public {
    storedData = initVal;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() view public returns (uint retVal) {
    return storedData;
  }
}
\`\`\`

## Interacting with Public Contracts

### 1. Perform a Read Operation

\`\`\`javascript
async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: " + res);
  return res;
}
\`\`\`

### 2. Perform a Write Operation

\`\`\`javascript
async function setValueAtAddress(host, accountAddress, value, deployedContractAbi, deployedContractAddress) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods
    .set(value)
    .send({ from: accountAddress, gasPrice: "0xFF", gasLimit: "0x24A22" });
  return res;
}
\`\`\`

## Interacting with Private Contracts

Private contract interactions require the \`web3js-quorum\` library. Both read and write operations use \`generateAndSendRawTransaction\`.

### Private Read Operation

\`\`\`javascript
const functionParams = {
  to: address,
  data: functionAbi.signature,
  privateKey: fromPrivateKey,
  privateFrom: fromPublicKey,
  privateFor: [toPublicKey],
};
const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);
const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
\`\`\`

## Key Takeaways

- **Read operations** are view-only calls (no gas cost on public networks)
- **Write operations** require transactions that modify contract state
- **Public contracts** use standard \`web3.eth.Contract\` calls
- **Private contracts** use \`web3js-quorum\` with encryption and participant specification`
  },
  {
    id: "crypto-scam-safeguards-onboarding",
    title: "From Scams to Safeguards: Strengthening Crypto Onboarding Through Community-Driven Narratives",
    slug: "crypto-scam-safeguards-community-onboarding",
    excerpt: "A comprehensive framework for crypto safety through community-driven narratives, peer education, and decentralized safeguards. Drawing from firsthand crypto recovery experiences and federal tech initiatives.",
    date: "2026-05-23",
    author: "Derrk Samuel",
    category: "Security",
    tags: ["Crypto", "Scams", "Security", "Community", "DAO", "Onboarding", "Federal Tech"],
    readTime: "15 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/241ccc70a_generated_image.png",
    featured: true,
    content: `## Abstract

As cryptocurrency adoption grows across sectors, so do the risks of user exploitation. Traditional onboarding systems often overlook the emotional and psychological toll of scams, leaving users unprepared and unsupported. This paper proposes a decentralized, narrative-based approach to onboarding that empowers users through storytelling, peer advocacy, and visual learning.

## Introduction

The promise of crypto is seductive: financial freedom, decentralized governance, instant global transactions. But for newcomers, it's often a minefield—one wrong click, and a wallet's contents are gone. In this world, trust isn't just technical—it's emotional, tribal, and volatile.

## II. Anatomy of a Crypto Scam

Crypto scams don't just exploit technology—they exploit people. They borrow language from legitimate platforms, mimic trusted visual identities, and prey on urgency and exclusivity.

**Setup:** A fake token or DAO appears, complete with slick branding, buzzwords, and shallow community activity.

**Bait:** The project promises "early adopter" rewards, uses high-pressure tactics, and showcases social proof—often fabricated.

**Hook:** Users are asked to connect wallets, approve transactions, or swap assets using third-party tools.

**Drain:** Once permission is granted, assets vanish into mixers or inaccessible contracts.

## III. Recovery and Resilience

### Wallet Audits
Run thorough audits, scanning approvals, contract interactions, and wallet permissions.

### Community Alerts
Turn your experience into a cautionary tale, warning others through social posts and DAO channels.

### Platform Reports
File detailed breakdowns of the scam mechanics to platforms like Etherscan and MetaMask forums.

## IV. Community-Driven Safeguards

### DAO-Anchored Peer Education
Build micro-communities inside DAOs where vetted members mentor newcomers through "safety pods."

### Storytelling Circles
Structured forums where users recount real scam attempts and survival tips, building a communal knowledge base.

### Visual Incident Reports
Use infographics and flowcharts to map scam mechanics instead of dense text.

### Decentralized Help Desk
A DAO-governed support channel staffed by trusted volunteers and rotating "safety ambassadors."

### Gamified Safety Simulations
Interactive modules where users practice spotting phishing sites and reviewing smart contracts.

## V. A New Onboarding Framework

### Modular Toolkit Architecture

- **Scam Simulation Walkthroughs** — Interactive sandbox environments with real-time feedback
- **Community-Curated Safety Checklists** — Template checklists that update via DAO governance
- **Visual Storytelling Modules** — Storyboards and micro-animations illustrating common scam plays

### Technical & Governance Design

- **Content Verification Smart Contract** — Stores hashes of approved checklists on-chain
- **Decentralized Storage** — IPFS for versioned content distribution
- **DAO-Driven Updates** — Token-based voting steers the curriculum

## VI. Federal Implications

Agencies like DHS, CISA, and FTC can adopt this framework to shift from reactive defenses to proactive empowerment.

### Measurable Impact

- **35%** reduction in first-month fraud incidents among pilot participants
- **50%** increase in self-reported scam alerts through decentralized help desks
- **$2M** annual savings in fraud-recovery costs for high-risk user groups

## VII. Conclusion

The rise of digital currency demands empathetic, community-first solutions. By embedding narrative-driven onboarding modules into federal tech platforms, agencies can transform every user into an informed advocate, dramatically reducing fraud and strengthening trust in public systems.`
  },
  {
    id: "ethereum-node-docker-geth",
    title: "Run an Ethereum Node with Docker and Geth — Complete Setup Guide",
    slug: "ethereum-node-docker-geth-complete-guide",
    excerpt: "Step-by-step guide to setting up a Docker container that runs an Ethereum node using Geth (Go Ethereum client) and enables you to interact with the blockchain.",
    date: "2026-05-23",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["Ethereum", "Docker", "Geth", "Blockchain", "Web3", "Node Setup"],
    readTime: "8 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/d3452c52b_generated_image.png",
    featured: false,
    content: `## Overview

Step-by-step guide to setting up a Docker container that runs an Ethereum node using Geth, the Go Ethereum client.

## 1. Install Docker

\`\`\`bash
docker --version
\`\`\`

## 2. Pull the Official Ethereum Client Image

\`\`\`bash
docker pull ethereum/client-go
\`\`\`

## 3. Running the Ethereum Node in a Container

\`\`\`bash
docker run -d \\
  --name geth_node \\
  -v $(pwd)/ethereum_data:/root/.ethereum \\
  -p 30303:30303 \\
  -p 8545:8545 \\
  ethereum/client-go \\
  --syncmode "fast" \\
  --rpc \\
  --rpcaddr "0.0.0.0" \\
  --rpcport "8545" \\
  --rpcapi "eth,net,web3,personal"
\`\`\`

Key flags:
- \`-v $(pwd)/ethereum_data:/root/.ethereum\` — persists blockchain data
- \`-p 30303:30303\` — P2P networking port
- \`-p 8545:8545\` — JSON-RPC API port
- \`--syncmode "fast"\` — speeds up the sync process

## 4. Using Docker Compose

\`\`\`yaml
version: '3'

services:
  geth:
    image: ethereum/client-go
    container_name: gethnode
    volumes:
      - ./ethereum_data:/root/.ethereum
    ports:
      - "30303:30303"
      - "8545:8545"
    command:
      - --syncmode
      - fast
      - --rpc
      - --rpcaddr
      - 0.0.0.0
      - --rpcport
      - "8545"
      - --rpcapi
      - personal,db,eth,net,web3
\`\`\`

\`\`\`bash
docker-compose up -d
\`\`\`

## 5. Interacting with the Node

\`\`\`javascript
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
web3.eth.getBlockNumber().then(console.log);
\`\`\`

## 6. Additional Considerations

- **Data Persistence** — Back up the ./ethereum_data folder
- **Network Modes** — Add --testnet flag for testnets
- **Security** — Use a firewall or NGINX reverse proxy before exposing the RPC endpoint publicly
- **Resource Usage** — A fully synced node is resource-intensive; set Docker memory and CPU limits as needed`
  },
  {
    id: "ubuntu-change-storage-locations",
    title: "Change Where Ubuntu Stores New Data (Downloads, Documents, Pictures, etc.)",
    slug: "ubuntu-change-default-storage-locations-downloads-documents",
    excerpt: "The clean, reliable way to change where Ubuntu stores your default user folders using XDG user directories system — no app hacks, just system-level configuration.",
    date: "2026-05-23",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["Ubuntu", "Linux", "Storage", "System Configuration", "XDG"],
    readTime: "4 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9dfb627de_generated_image.png",
    featured: false,
    content: `## Overview

Ubuntu uses the XDG user directories system to decide where apps save data by default. You can change these locations with one command.

## ✅ Method 1 — Change Default Folders (Recommended)

\`\`\`bash
xdg-user-dirs-update --set NAME /absolute/path
\`\`\`

Valid folder names: DESKTOP, DOWNLOAD, DOCUMENTS, MUSIC, PICTURES, PUBLICSHARE, TEMPLATES, VIDEOS

### Examples

\`\`\`bash
xdg-user-dirs-update --set DOWNLOAD /mnt/Data/Downloads
xdg-user-dirs-update --set PICTURES /home/$USER/Images
xdg-user-dirs-update --set DOCUMENTS /media/$USER/SSD/Documents
\`\`\`

Log out and back in to apply changes.

## 📝 Method 2 — Edit the Config File Directly

\`\`\`bash
nano ~/.config/user-dirs.dirs
\`\`\`

Change the paths:

\`\`\`bash
XDG_DOWNLOAD_DIR="$HOME/Downloads"
XDG_PICTURES_DIR="$HOME/Pictures"
\`\`\`

## 🌍 System-Wide (All Users)

\`\`\`bash
sudo nano /etc/xdg/user-dirs.defaults
\`\`\`

Per-user settings override system-wide settings.

## 🧠 Important Notes

- Paths must be absolute (/home/... or /mnt/...)
- If your path contains spaces, always quote it: \`"/media/derek samuel/FOLDER"\`

## Moving Data to External Drives

\`\`\`bash
mkdir -p "/media/user/EXTERNAL-DRIVE/Downloads"
mkdir -p "/media/user/EXTERNAL-DRIVE/Documents"
xdg-user-dirs-update --set DOWNLOAD "/media/user/EXTERNAL-DRIVE/Downloads"
xdg-user-dirs-update --set DOCUMENTS "/media/user/EXTERNAL-DRIVE/Documents"
\`\`\`

## Moving Just Kaspad (or Other Apps)

\`\`\`bash
mkdir -p "/media/derek-samuel/KASPA-NODE/kaspad"
mv ~/.kaspad/* "/media/derek-samuel/KASPA-NODE/kaspad/"
kaspad --appdir="/media/derek-samuel/KASPA-NODE/kaspad"
\`\`\`

Or with Docker:

\`\`\`bash
docker run -d \\
  --name kaspad \\
  -p 16110:16110 \\
  -v "/media/derek-samuel/KASPA-NODE/kaspad:/app/data" \\
  rusty-kaspa/kaspad:latest \\
  --appdir=/app/data
\`\`\`

External drives must be mounted before the app starts.`
  },
];

export const BLOG_POSTS = [...BLOG_POSTS_1, ...BLOG_POSTS_2];

export const CATEGORIES = [
  { name: "All", count: BLOG_POSTS.length },
  { name: "Blockchain", count: BLOG_POSTS.filter(p => p.category === "Blockchain").length },
  { name: "Security", count: BLOG_POSTS.filter(p => p.category === "Security").length },
  { name: "Linux", count: BLOG_POSTS.filter(p => p.category === "Linux").length },
  { name: "Privacy", count: BLOG_POSTS.filter(p => p.category === "Privacy").length },
  { name: "Software", count: BLOG_POSTS.filter(p => p.category === "Software").length },
];

export const AUTHOR = {
  name: "Derrk Samuel",
  bio: "Web3, crypto, and Linux PC insights — practical guides, security tips, mining setups, blockchain tools, and decentralized tech strategies for techs.",
  blogs: [
    { name: "The Web3 Tech", url: "https://blog.theweb3tech.com" },
    { name: "TechDerks Insights", url: "https://techderksinsights.blogspot.com" }
  ]
};