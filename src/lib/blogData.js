export const BLOG_POSTS = [
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

## Prerequisites

- A network with a deployed smart contract (see the deploying smart contracts tutorial)
- web3.js library for public contracts
- web3js-quorum library for private contract interactions
- Basic understanding of Solidity smart contracts

## SimpleStorage Contract

This tutorial uses the \`SimpleStorage.sol\` contract as an example:

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

This simple contract allows you to store a value on-chain and retrieve it. Once deployed, you can perform read operations using the \`get\` function and write operations using the \`set\` function.

## Interacting with Public Contracts

### 1. Perform a Read Operation

To perform a read operation, you need:
- The contract's deployed address
- The contract's ABI (obtained from compilation)

Use the \`web3.eth.Contract\` object to create an instance and call the \`get\` function:

\`\`\`javascript
async function getValueAtAddress(
  host,
  deployedContractAbi,
  deployedContractAddress,
) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(
    deployedContractAbi,
    deployedContractAddress,
  );
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: " + res);
  return res;
}
\`\`\`

This function:
- Initializes a Web3 instance with your network endpoint
- Creates a contract instance using the ABI and address
- Calls the \`get\` method (read-only, no gas cost)
- Returns the stored value

### 2. Perform a Write Operation

To perform a write operation, send a transaction to update the stored value. You need:
- The deployed contract address and ABI
- An account address with sufficient ETH for gas fees
- Gas parameters

\`\`\`javascript
async function setValueAtAddress(
  host,
  accountAddress,
  value,
  deployedContractAbi,
  deployedContractAddress,
) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(
    deployedContractAbi,
    deployedContractAddress,
  );
  const res = await contractInstance.methods
    .set(value)
    .send({ from: accountAddress, gasPrice: "0xFF", gasLimit: "0x24A22" });
  return res;
}
\`\`\`

Key parameters:
- \`from\`: The account sending the transaction
- \`gasPrice\`: Amount of ETH per gas unit
- \`gasLimit\`: Maximum gas units the transaction can consume

### 3. Verify Updated Values

After writing a value with \`set\`, perform a \`get\` call to verify the update was successful. This confirms the transaction was mined and the state change persisted.

## Interacting with Private Contracts

Private contract interactions require additional setup using the \`web3js-quorum\` library, which handles encryption and privacy at the transaction level. Both read and write operations use the \`generateAndSendRawTransaction\` method.

### 1. Perform a Read Operation on Private Contracts

For private operations, you need:
- Sender's private and public keys
- Recipient's public key
- Contract address and ABI

\`\`\`javascript
async function getValueAtAddress(
  clientUrl,
  address,
  contractAbi,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey,
) {
  const Web3 = require("web3");
  const Web3Quorum = require("web3js-quorum");
  const web3 = new Web3Quorum(new Web3("http://localhost:22000"));
  
  // Find the get function ABI
  const functionAbi = contractAbi.find((e) => {
    return e.name === "get";
  });
  
  // Prepare transaction parameters
  const functionParams = {
    to: address,
    data: functionAbi.signature,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey],
  };
  
  // Send and wait for receipt
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams,
  );
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash,
  );
  console.log("Value from private contract is: " + result.output);
  return result;
}
\`\`\`

Key differences from public contracts:
- Uses \`generateAndSendRawTransaction\` for encryption handling
- Specifies \`privateFrom\` and \`privateFor\` to control who sees the transaction
- Returns encrypted transaction data visible only to participants

### 2. Perform a Write Operation on Private Contracts

For write operations, encode the new value into the function's ABI:

\`\`\`javascript
async function setValueAtAddress(
  clientUrl,
  address,
  value,
  contractAbi,
  fromPrivateKey,
  fromPublicKey,
  toPublicKey,
) {
  const Web3 = require("web3");
  const Web3Quorum = require("web3js-quorum");
  const web3 = new Web3Quorum(new Web3("http://localhost:22000"));
  
  // Find the set function ABI
  const functionAbi = contractAbi.find((e) => {
    return e.name === "set";
  });
  
  // Encode the new value as function arguments
  const functionArgs = web3quorum.eth.abi
    .encodeParameters(functionAbi.inputs, [value])
    .slice(2);
  
  // Prepare transaction with encoded data
  const functionParams = {
    to: address,
    data: functionAbi.signature + functionArgs,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey],
  };
  
  // Send transaction and get receipt
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(
    functionParams,
  );
  console.log(\`Transaction hash: \${transactionHash}\`);
  const result = await web3quorum.priv.waitForTransactionReceipt(
    transactionHash,
  );
  return result;
}
\`\`\`

Key steps:
1. Extract the function signature from the ABI
2. Encode the parameters using \`encodeParameters\`
3. Append encoded arguments to the function signature
4. Send as a private transaction

### 3. Verify Updated Values

Like public contracts, perform a \`get\` call after a \`set\` operation to verify the state was updated. The privacy constraints remain in effect.

## Key Takeaways

- **Read operations** are view-only calls that don't consume gas (public) or create on-chain records (private)
- **Write operations** require transactions that modify contract state and consume gas
- **Public contracts** use standard \`web3.eth.Contract\` calls
- **Private contracts** use \`web3js-quorum\` with encryption and participant specification
- Always verify state changes with follow-up read operations
- Handle errors gracefully in production environments

Use the Developer Quickstart to rapidly generate local blockchain networks for testing these interactions.`
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

As cryptocurrency adoption grows across sectors, so do the risks of user exploitation. Traditional onboarding systems often overlook the emotional and psychological toll of scams, leaving users unprepared and unsupported. This paper proposes a decentralized, narrative-based approach to onboarding that empowers users through storytelling, peer advocacy, and visual learning. Drawing from firsthand experiences in crypto recovery and community engagement, we explore how federal tech initiatives can play a pivotal role in bridging safety with innovation.

## Introduction

The promise of crypto is seductive: financial freedom, decentralized governance, instant global transactions. But for newcomers, it's often a minefield—one wrong click, and a wallet's contents are gone. In this world, trust isn't just technical—it's emotional, tribal, and volatile.

Like many users, the first real lesson came from falling victim to a scam that disguised itself as community-led progress. It wasn't just the loss of tokens—it was the disorientation, embarrassment, and betrayal. But that experience transformed into a builder role, a watchdog responsibility, and an advocate mission.

In this piece, we unpack the anatomy of scams, the path to recovery, and the systems we can build to prevent others from falling into the same traps. What if we treated onboarding not just as technical documentation, but as communal storytelling? What if every misstep became a lesson shared—visually, accessibly, empathetically?

## II. Anatomy of a Crypto Scam

Crypto scams don't just exploit technology—they exploit people. They borrow language from legitimate platforms, mimic trusted visual identities, and prey on urgency and exclusivity to trigger impulsive decisions. You don't just lose coins—you lose time, confidence, and trust in the space itself.

Here's how it typically unfolds:

**Setup:** A fake token or DAO appears, complete with slick branding, buzzwords, and shallow community activity.

**Bait:** The project promises "early adopter" rewards, uses high-pressure tactics, and showcases social proof—often fabricated.

**Hook:** Users are asked to connect wallets, approve transactions, or swap assets using third-party tools.

**Drain:** Once permission is granted, assets vanish into mixers or inaccessible contracts.

The scammers were engineering a trap with familiar design and good timing—targeting those drawn to the potential of building something meaningful.

By breaking down what happened, you aren't just recounting an event. You're offering a map for others—so they can spot the same warning signs before it's too late.

## III. Recovery and Resilience

Emerging from a crypto scam isn't just technical—it's emotional. The path forward requires clarity, community, and a mindset shift.

### Wallet Audits

Run thorough audits, scanning approvals, contract interactions, and wallet permissions. Each line of code is an insight into vulnerability—and a tool for future protection.

### Community Alerts

Turn your experience into a cautionary tale, warning others through social posts, DAO channels, and direct outreach. The story of how you were duped becomes a lesson others don't have to learn the hard way.

### Platform Reports

File detailed breakdowns of the scam mechanics to platforms like Etherscan, MetaMask forums, and developer hubs. You aren't just reporting—you're reverse engineering deception.

### Emotional Debrief

Recovery isn't just about ETH—it's about self-confidence. Reflect, recalibrate, and find new strength in vulnerability. What scammers tried to shake, you can turn into advocacy.

And then came the pivotal question: What could have made this easier? You envision onboarding resources not built on jargon or fear, but human insight. Something that feels like guidance—not a warning label. A toolkit that is visual, interactive, and steeped in community stories.

## IV. Community-Driven Safeguards

Crypto safety shouldn't live in a silo—it thrives in community. By weaving peer support, shared stories, and accessible visuals into onboarding, we transform users from passive readers into active guardians of their own security.

### DAO-Anchored Peer Education

Build micro-communities inside DAOs where vetted members mentor newcomers. These "safety pods" meet regularly to discuss recent threats, share red-flag checklists, and co-review transaction approvals before any assets move.

### Storytelling Circles

Structured forums—text, voice, or video—where users recount real scam attempts and survival tips. Each narrative becomes a template: a "before/after" case study that highlights warning signs and recovery steps, then gets pinned in a communal knowledge base.

### Visual Incident Reports

Instead of dense text, use infographics and flowcharts to map scam mechanics. A step-by-step storyboard of a rug pull—branding cues, approval screens, exit patterns—helps users intuitively recognize the playbook next time.

### Decentralized Help Desk

A DAO-governed support channel staffed by trusted volunteers and rotating "safety ambassadors." Requests—"Did this token contract look legit?"—get triaged publicly, ensuring transparent resolution and building a living repository of answered questions.

### Gamified Safety Simulations

Interactive modules where users practice spotting phishing sites, reviewing smart contracts, or rejecting malicious wallet prompts. Points, badges, and leaderboards incentivize engagement and reinforce secure habits in a low-risk environment.

These safeguards stitch personal lessons into the fabric of every new user's experience, spotlighting the human side of security—empathy, shared accountability, and collective wisdom.

## V. A New Onboarding Framework

This framework transforms onboarding into a living, decentralized experience—one that evolves with emerging threats and leverages community wisdom.

### 1. Modular Toolkit Architecture

**Scam Simulation Walkthroughs**
- Interactive, step-by-step sandbox environments
- Practice connecting wallets, approving transactions, spotting red flags
- Real-time feedback with hints and explanations

**Community-Curated Safety Checklists**
- Template checklists that update automatically via DAO governance
- Peer-voted additions when new scam tactics emerge
- Offline printouts and mobile-friendly versions

**Visual Storytelling Modules**
- Storyboards and micro-animations illustrating common scam plays
- Short video "case studies" narrated by survivors
- Downloadable infographics for easy sharing

### 2. Technical & Governance Design

**Content Verification Smart Contract**
- Stores hashes of approved checklists and storyboards on-chain
- Enables users to verify authenticity before trusting materials

**Decentralized Storage & Delivery**
- IPFS for versioned content distribution
- CDN gateways for fast global access

**DAO-Driven Updates**
- Proposal mechanism to add or revise modules
- Token-based voting ensures active contributors steer the curriculum

### 3. Integration with Key Platforms

**MetaMask Plugin**
- Context-aware banner prompts when users visit unverified sites
- Quick-launch simulator button directly in wallet UI

**Tron Snap Extension**
- Embedded safety checklist before any contract approval
- One-click flag reporting to community channels

**Samsung Wallet Deep Link**
- Visual "Onboarding Hub" shortcut on mobile home
- Push notifications for urgent safety alerts

### 4. Roles, Incentives & Metrics

**Safety Ambassadors**
- Rotating volunteer roles within the DAO to host training sessions
- Earn reputation badges and token rewards for validated contributions

**Key Performance Indicators**
- Simulation completion rate
- Reduction in first-month loss incidents
- Community-submitted module growth

## VI. Federal Implications

Agencies like DHS, CISA, and FTC are on the front lines of protecting citizens in the digital age. By adopting a decentralized, narrative-driven onboarding framework, federal employers can leap from reactive defenses to proactive empowerment—shifting the mission from simply "detect and respond" to "educate and inoculate."

### Policy Alignment

- **NIST Cybersecurity Framework:** Embed community-curated threat intelligence into onboarding modules
- **OMB Digital Modernization:** IPFS-backed content delivery and verifiable smart contracts
- **CISA Security Ethos:** Turn every user into a vigilant reporter and educator

### Operationalizing the Framework

**Pilot Programs**
Launch in high-visibility federal apps (e.g., government benefit portals, student loan dashboards) to test gamified simulations and visual incident reports.

**Grant & Funding Opportunities**
Tap into Innovation Challenges (e.g., GSA's 18F, DHS Science & Technology Directorate grants) to develop DAO-governed safety pods and MetaMask plugins tailored for civilian use.

**Integration into FedTech Labs**
Collaborate with FedTech's accelerator programs to refine smart-contract verification tools and DAO voting mechanisms for continuous curriculum updates.

### Partnership Opportunities

**Public-Private Collaborations**
Co-create onboarding modules with blockchain leaders (e.g., ConsenSys, Chainlink) and civic tech incubators (e.g., Code for America).

**Academic Alliances**
Engage university cybersecurity and human-factors research centers to measure emotional resilience gains and iterate module designs.

### Measurable Impact

- **35%** reduction in first-month fraud incidents among pilot participants
- **50%** increase in self-reported scam alerts through decentralized help desks
- **$2M** annual savings in fraud-recovery costs for high-risk user groups

By weaving user advocacy, community governance, and cutting-edge tech into federal onboarding, agencies not only safeguard public funds—they build trust, boost digital literacy, and set a global standard for citizen-centric security.

## VII. Conclusion and Call to Action

The rise of digital currency demands more than technical fixes—it demands empathetic, community-first solutions that scale with emerging threats. By embedding narrative-driven onboarding modules into federal tech platforms, agencies can transform every user into an informed advocate, dramatically reducing fraud and strengthening trust in public systems.

We invite DHS, CISA, FTC, and other innovators to pilot this decentralized framework in their most critical applications. Partner with blockchain experts, civic tech incubators, and academic researchers to co-create, iterate, and deploy these modules. Together, we can shift from a posture of reaction to one of proactive resilience—empowering citizens with the skills and stories they need to navigate the crypto frontier safely.

Join us in building a future where every newcomer is guided by shared experiences, visual insights, and peer-driven safeguards. Let's set a new standard for citizen-centric security and digital literacy—one narrative at a time.`
  },
  {
    id: "ethereum-node-docker-geth",
    title: "Run an Ethereum Node with Docker and Geth — Complete Setup Guide",
    slug: "ethereum-node-docker-geth-setup-guide",
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

Below is a step-by-step guide to setting up a Docker container that runs an Ethereum node using Geth, the Go Ethereum client, and enables you to interact with the blockchain.

## 1. Install Docker

Before anything else, ensure you have Docker installed on your host machine. You can download and install Docker Desktop for your operating system from Docker's website. On a Linux system, you can install it via your package manager. Once installed, verify by running:

\`\`\`bash
docker --version
\`\`\`

## 2. Pull the Official Ethereum Client Image

Geth is one of the most common Ethereum clients. Pull its official Docker image using:

\`\`\`bash
docker pull ethereum/client-go
\`\`\`

This image is maintained by the Ethereum team and is widely used for running a node.

## 3. Running the Ethereum Node in a Container

You can run a container with several configuration flags to expose the necessary ports, persist data, and specify the node settings. A typical command might look like this:

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

### Explanation of the flags:

- \`-d\` runs the container in detached mode
- \`--name geth_node\` assigns a friendly name to the container
- \`-v $(pwd)/ethereum_data:/root/.ethereum\` mounts a local directory to persist blockchain data
- \`-p 30303:30303\` exposes the default P2P networking port
- \`-p 8545:8545\` exposes the JSON-RPC API port, which allows you to interact with the node

### Command arguments (after the image name) configure Geth:

- \`--syncmode "fast"\` speeds up the sync process
- \`--rpc\` enables the remote procedure call interface
- \`--rpcaddr "0.0.0.0"\` listens on all network interfaces (use with caution in production)
- \`--rpcport "8545"\` sets the port for JSON-RPC connections
- \`--rpcapi "eth,net,web3,personal"\` exposes a set of APIs you might need for interacting with the blockchain

**Note:** In production, exposing the RPC endpoint via \`--rpcaddr "0.0.0.0"\` might have security implications. You may want to limit access with a firewall or by binding only to localhost.

## 4. Using Docker Compose for a Reproducible Setup

For easier management, you can use a \`docker-compose.yml\` file. Create a file with the following contents:

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

Run the container with:

\`\`\`bash
docker-compose up -d
\`\`\`

This file helps you codify your setup so you can easily redeploy or share with collaborators.

## 5. Interacting with the Ethereum Node

Once your container is running, you can interact with the Ethereum blockchain by making JSON-RPC calls to the node. For example, using web3.js:

\`\`\`javascript
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

web3.eth.getBlockNumber().then(console.log);
\`\`\`

This snippet retrieves the current block number. You can expand your application logic to deploy contracts, send transactions, and more.

## 6. Additional Considerations

### Data Persistence
The mounted volume (\`./ethereum_data\`) keeps your blockchain data intact between container restarts. Ensure you back up this folder if it contains valuable state.

### Network Modes
Depending on your goals (mainnet, testnet, or a private chain), you may add flags like \`--testnet\` or configure custom genesis files.

### Resource Usage
Running a fully synced Ethereum node can be resource-intensive. Adjust container resource limits if needed using Docker's options (\`--memory\`, \`--cpus\`).

### Security
If you're exposing the JSON-RPC interface, consider adding authentication, encryption (e.g., using an NGINX reverse proxy over HTTPS), or firewall rules to limit the request origin.

### Advanced Configurations
For more advanced usage—like enabling mining, configuring peers manually, or optimizing sync parameters—refer to the Geth documentation.

## More Ideas and Related Topics

### Smart Contract Development Environment
Consider complementing your node container with a developer toolchain (such as Truffle or Hardhat) in another container. This multi-container setup using Docker Compose isolates your smart contract deployment and testing processes.

### Private Ethereum Networks
For learning or isolated testing, you might want to set up a private Ethereum network. This involves creating a custom genesis block, configuring multiple containers as nodes, and setting up a consensus mechanism.

### Monitoring and Logging
Integrate a containerized logging solution (like the ELK stack) to monitor blockchain events and node performance. This is particularly useful in production environments.

### Scaling and Cloud Deployments
If you plan to deploy in the cloud, research orchestration tools like Kubernetes. They can manage multiple containers, automated scaling, and rolling updates for your Ethereum nodes and associated services.`
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

Ubuntu uses the XDG user directories system to decide where apps save data by default. You can change these locations with one command — the actual system-level method Ubuntu uses, not app-specific hacks.

## ✅ Method 1 — Change Default Folders (Recommended)

Use this format:

\`\`\`bash
xdg-user-dirs-update --set NAME /absolute/path
\`\`\`

### Valid folder names (case-sensitive):

- DESKTOP
- DOWNLOAD
- DOCUMENTS
- MUSIC
- PICTURES
- PUBLICSHARE
- TEMPLATES
- VIDEOS

### Examples

**Change Downloads to another drive:**

\`\`\`bash
xdg-user-dirs-update --set DOWNLOAD /mnt/Data/Downloads
\`\`\`

**Change Pictures to a custom folder:**

\`\`\`bash
xdg-user-dirs-update --set PICTURES /home/$USER/Images
\`\`\`

**Change Documents to an external SSD:**

\`\`\`bash
xdg-user-dirs-update --set DOCUMENTS /media/$USER/SSD/Documents
\`\`\`

After running the command, log out and back in to apply changes.

## 📝 Method 2 — Edit the Config File Directly

Open your user directories config:

\`\`\`bash
nano ~/.config/user-dirs.dirs
\`\`\`

You'll see lines like:

\`\`\`bash
XDG_DOWNLOAD_DIR="$HOME/Downloads"
XDG_PICTURES_DIR="$HOME/Pictures"
\`\`\`

Change the paths, save, and log out/in.

## 🌍 System-Wide (All Users)

Edit the system-wide defaults:

\`\`\`bash
sudo nano /etc/xdg/user-dirs.defaults
\`\`\`

**Note:** Per-user settings override system-wide settings.

## 🧠 Important Notes

- Paths must be absolute (/home/... or /mnt/...)
- \`$HOME\` works in the config file but not in the command
- Apps that ignore XDG standards (rare) may need individual configuration
- If your path contains spaces, always quote it: \`"/media/derek samuel/FOLDER"\`

## Moving Data to External Drives

If you want to move all user folders to an external drive:

1. Create the new folders on the external drive
2. Move existing data safely
3. Update all XDG paths
4. Fix permissions
5. Verify the drive is mounted before login

**Example for external drive at** \`/media/user/EXTERNAL-DRIVE\`:

\`\`\`bash
mkdir -p "/media/user/EXTERNAL-DRIVE/Downloads"
mkdir -p "/media/user/EXTERNAL-DRIVE/Documents"
mkdir -p "/media/user/EXTERNAL-DRIVE/Pictures"

xdg-user-dirs-update --set DOWNLOAD "/media/user/EXTERNAL-DRIVE/Downloads"
xdg-user-dirs-update --set DOCUMENTS "/media/user/EXTERNAL-DRIVE/Documents"
xdg-user-dirs-update --set PICTURES "/media/user/EXTERNAL-DRIVE/Pictures"
\`\`\`

Then log out and back in to apply changes.

## Moving Just Kaspad (or Other Apps)

If you only want to move a specific app's data (like Kaspad), you don't touch Ubuntu user folders at all. Instead, relocate the app's data directory and point the app to it.

**For Kaspad on an external drive:**

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
  -p 16111:16111 \\
  -v "/media/derek-samuel/KASPA-NODE/kaspad:/app/data" \\
  rusty-kaspa/kaspad:latest \\
  --appdir=/app/data
\`\`\`

External drives must be mounted before the app starts.`
  },
  {
    id: "docker-compose-plugin-fix",
    title: 'How to Fix "Unable to Locate Package docker-compose-plugin" on Linux PC (Debian)',
    slug: "fix-unable-to-locate-docker-compose-plugin-linux-debian",
    excerpt: "The Docker repository is not added on your system. Ubuntu/Debian's default repos do not contain this package. Add Docker's official repo, update apt, and the install will work.",
    date: "2026-03-23",
    author: "Derrk Samuel",
    category: "Linux",
    tags: ["Docker", "Linux", "Debian", "DevOps"],
    readTime: "3 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/a6aaf5aba_generated_c2ca5b3e.png",
    featured: false,
    content: `## ⭐ Summary

Why am I seeing "Unable to locate package docker-compose-plugin" when I try to start a Docker container?

**Because the Docker repository is not added on your system.**

Ubuntu/Debian's default repos do not contain this package. Add Docker's official repo, update apt, and the install will work.

## ✅ Fix: Add Docker's Official Repository (Required)

Run these exact commands in order:

### 1. Update apt + install prerequisites:

\`\`\`bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
\`\`\`

### 2. Add Docker's GPG key:

\`\`\`bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \\
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
\`\`\`

### 3. Add the Docker repository:

\`\`\`bash
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \\
  https://download.docker.com/linux/ubuntu \\
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \\
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

### 4. Update apt again + install the plugin:

\`\`\`bash
sudo apt-get update
sudo apt-get install -y docker-compose-plugin
\`\`\`

### 5. Verify:

\`\`\`bash
docker compose version
\`\`\`

## 🧠 Why This Happens

The package only exists in Docker's own repo, not Ubuntu/Debian's defaults. If that repo isn't added, apt simply can't find it.`
  },
  {
    id: "google-advanced-protection",
    title: "Benefits of Google's Advanced Protection Program",
    slug: "benefits-google-advanced-protection-program",
    excerpt: "Google's Advanced Protection Program offers the strongest security available for personal and enterprise accounts. Designed for high-risk users—like political campaigners, activists, executives, and anyone guarding sensitive data.",
    date: "2025-08-04",
    author: "Derrk Samuel",
    category: "Security",
    tags: ["Google", "Cybersecurity", "Phishing", "Authentication"],
    readTime: "6 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/c77c43057_generated_92c1ff70.png",
    featured: true,
    content: `## Overview

Google's Advanced Protection Program offers the strongest security available for personal and enterprise accounts. Designed for high-risk users—like political campaigners, activists, executives, and anyone guarding sensitive data—it builds on standard protections with phishing-resistant keys, strict app controls, and robust download defenses. Enrolling is free for personal accounts, making iron-clad security accessible to everyone worried about targeted attacks.

## 1. Phishing-Resistant Authentication

- Enforced use of physical security keys or passkeys instead of SMS-based codes
- Even if attackers know your password, they can't sign in without your key
- Overrides other two-step verification settings to ensure consistency across devices and identity providers

## 2. Enhanced Download Protection

- Performs deep scans on every download initiated while signed into Chrome
- Flags or blocks suspicious files before they reach your system
- Restricts installations to apps from verified sources (Google Play Store or device-manufacturer stores)

## 3. Controlled Third-Party App Access

- Only Google apps and a curated list of verified third-party apps can request access to your account data
- Every app permission must be explicitly granted by you
- Reduces risk of OAuth-based phishing and unauthorized API access

## 4. Automatic High-Security Policy Updates

- Google maintains a curated suite of enterprise-grade policies that automatically apply to enrolled accounts
- New protections roll out seamlessly, ensuring accounts benefit from the latest defenses without manual configuration
- Designed for those at high risk of targeted attacks—campaigners, journalists, executives, and administrators

## 5. Free for Personal Accounts

- Enroll any personal Google Account in Advanced Protection at no charge
- Gain access to security keys, rigorous download checks, and app-access restrictions without subscription fees

## Feature Comparison

| Feature | Standard Google Account | Advanced Protection Program |
|---|---|---|
| Authentication | Password + 2FA (SMS/app) | Security keys or passkeys only |
| Phishing defense | Google blocks ~100M phishing attempts/day | Enforced phishing-resistant sign-in |
| Download protection | Google Safe Browsing | Deep scans and blocks harmful downloads |
| Third-party app access | OAuth consent for any app | Only Google and verified apps |
| Policy updates | Manual configuration | Automatic high-security policies |

## Conclusion

For anyone whose digital footprint attracts sophisticated threats, Google's Advanced Protection Program delivers unbeatable security without the complexity or cost of enterprise-only tools. By enforcing hardware-based authentication, locking down app permissions, and deep-scanning downloads, it practically eliminates credential theft and malware risks.

Ready to upgrade your defenses? Visit [Google's Advanced Protection Program](https://myaccount.google.com/advanced-protection) page to enroll today.`
  },
  {
    id: "interact-smart-contracts",
    title: "Interact with a Deployed Smart Contract on Any Network",
    slug: "interact-deployed-smart-contract-any-network",
    excerpt: "This tutorial shows you how to interact with smart contracts that have been deployed to a network, using web3js for both public and private contract interactions.",
    date: "2025-06-14",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["Smart Contracts", "Ethereum", "Web3", "Solidity"],
    readTime: "8 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/0a9cfa608_generated_0891f93e.png",
    featured: true,
    content: `## Prerequisites

- A network with a deployed smart contract as in the deploying smart contracts tutorial

## Interact with Public Contracts

This tutorial uses the \`SimpleStorage.sol\` contract:

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

Once the contract is deployed, you can perform a read operation using the \`get\` function call and a write operation using the \`set\` function call.

### 1. Perform a Read Operation

Use the \`web3.eth.Contract\` object to create a new instance of the smart contract, then make the \`get\` function call:

\`\`\`javascript
async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(
    deployedContractAbi,
    deployedContractAddress
  );
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: " + res);
  return res;
}
\`\`\`

### 2. Perform a Write Operation

Send a transaction to update the stored value. The account address must correspond to an actual account with some ETH:

\`\`\`javascript
async function setValueAtAddress(host, accountAddress, value, deployedContractAbi, deployedContractAddress) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(
    deployedContractAbi,
    deployedContractAddress
  );
  const res = await contractInstance.methods
    .set(value)
    .send({ from: accountAddress, gasPrice: "0xFF", gasLimit: "0x24A22" });
  return res;
}
\`\`\`

### 3. Verify an Updated Value

To verify that a value has been updated, perform a \`get\` call after a \`set\` update call.

## Interact with Private Contracts

The private contracts example uses the same \`SimpleStorage.sol\` contract but uses the \`web3js-quorum\` library and the \`generateAndSendRawTransaction\` method. Both read and write operations use this API call.

### Private Read Operation

\`\`\`javascript
async function getValueAtAddress(clientUrl, address, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
  const web3 = new Web3Quorum(new Web3("http://localhost:22000"));
  const functionAbi = contract._jsonInterface.find((e) => e.name === "get");
  const functionParams = {
    to: address,
    data: functionAbi.signature,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey],
  };
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);
  const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
  return result;
}
\`\`\`

Both public and private contract interactions follow similar patterns — the key difference is the privacy layer that encrypts transactions between specific parties on the network.`
  },
  {
    id: "extract-data-smart-contracts",
    title: "Extract Data from Smart Contracts Using Containers",
    slug: "extract-data-smart-contracts-containers-docker",
    excerpt: "The process of extracting data from smart contracts involves three main steps: scanning, slot analysis, and storage extraction with smart contracts on Ethereum networks.",
    date: "2025-06-14",
    author: "Derrk Samuel",
    category: "Blockchain",
    tags: ["Smart Contracts", "Docker", "Data Extraction", "Ethereum"],
    readTime: "5 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/6a632fa81_generated_1d6446c3.png",
    featured: false,
    content: `## Overview

Containers (like Docker containers) are valuable tools for extracting data from smart contracts, particularly when dealing with complex data structures and the need for standardized environments.

## 1. Scanning the Smart Contract

- **Connecting to the Blockchain:** A container can house the necessary software to connect to a blockchain network (e.g., Ethereum) via a node or API
- **Locating the Contract and ABI:** Within the container, execute code that accesses the contract's ABI (Application Binary Interface) to understand its structure and functions
- **Initial Data Scan:** The container facilitates the initial scanning process, allowing access to basic information about the contract and its data

## 2. Slot Analysis

- **Understanding Storage Layout:** The container can house tools or scripts that analyze the contract's ABI to determine how variables are mapped to storage slots
- **Complex Data Structures:** For contracts with intricate data structures like mappings and arrays, a container can provide a specialized environment with tools like SmartMuv for in-depth analysis

## 3. Storage Extraction

- **Retrieving Raw Data:** With a blockchain node or API, the container calls specific storage slots and retrieves raw hexadecimal data
- **Decoding and Processing:** The container hosts decoding tools like ABI decoders to convert raw hex data into human-readable format. Further processing (JSON, CSV) can also be performed within the container
- **Standardized Environment:** Using a container ensures a consistent and reproducible environment for data extraction

## Benefits of Using Containers

| Benefit | Description |
|---|---|
| **Portability** | A containerized solution can be easily moved and deployed across different environments |
| **Isolation** | Containers isolate the data extraction process, preventing conflicts with other applications |
| **Reproducibility** | Containers provide a standardized environment, ensuring consistent results every time |
| **Simplified Deployment** | Deploying and managing the extraction process is simpler with containers |

In essence, a container serves as a self-contained environment that packages the necessary tools and dependencies for scanning, analyzing, and extracting data from smart contracts efficiently and reliably.`
  },
  {
    id: "majorgeeks-guide",
    title: "MajorGeeks.com: A Powerful, Trusted & No-Nonsense Software Hub (2026 Guide)",
    slug: "majorgeeks-trusted-software-download-hub-2026-guide",
    excerpt: "Discover complete information on the site MajorGeeks.com, the powerful and trusted global platform for free software downloads, Windows tools, security utilities, and expert tech insights.",
    date: "2025-09-10",
    author: "Derrk Samuel",
    category: "Software",
    tags: ["Software", "Windows", "Downloads", "Security"],
    readTime: "10 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/3e90fcf71_generated_6266866e.png",
    featured: false,
    content: `## What Is MajorGeeks.com?

MajorGeeks.com is a globally recognized software download website focused mainly on Windows utilities, system tools, and security applications. Unlike flashy app stores or bloated download portals, MajorGeeks keeps things simple — built for users who value performance, transparency, and control over their systems.

What truly sets MajorGeeks apart is its **human-curated approach**. Every piece of software is reviewed, tested, and explained by experienced editors. No auto-generated listings. No hidden installers. Just clean downloads and honest descriptions.

## Why MajorGeeks.com Is Trusted Worldwide

- Software is **manually tested**
- Clear warnings for beta or experimental tools
- No forced sign-ups
- Active moderation and updates
- Honest pros and cons listed for each tool

## Types of Software Available

### Windows Utilities and System Tools
Registry cleaners, startup managers, task automation tools, and performance monitors to keep PCs fast, stable, and clutter-free.

### Security, Antivirus, and Malware Removal
Antivirus utilities, anti-malware scanners, ransomware protection tools, and rootkit detectors. Many tools are portable — perfect for emergency fixes.

### Backup, Recovery, and Disk Management
Backup software, disk cloning tools, partition managers, and file recovery utilities for professionals and power users.

### Networking and Internet Tools
Network monitoring software, Wi-Fi analyzers, bandwidth tools, and VPN-related utilities.

## How MajorGeeks Reviews and Tests Software

1. Installed on test systems
2. Checked for bundled software
3. Scanned for malware
4. Reviewed for usability and performance

## Is MajorGeeks.com Safe and Legit?

**Yes** — MajorGeeks.com is widely considered 100% legit with a long, clean reputation, no history of malware scandals, and transparent download practices.

## MajorGeeks Compared to Other Sites

| Feature | MajorGeeks | Generic Download Sites |
|---|---|---|
| Clean Software | ✅ | ❌ |
| Human Reviews | ✅ | ❌ |
| Bundled Installers | ❌ | ✅ |
| Transparency | ✅ | ❌ |

## Conclusion

If you're looking for honest, clean, and expert-reviewed software, MajorGeeks.com remains one of the best resources worldwide. It may not be flashy, but it delivers where it matters — **trust, performance, and transparency**.`
  },
  {
    id: "tails-os-bootable-usb",
    title: "TailsOS: How to Create a Bootable USB With Persistent Storage (Full Guide)",
    slug: "tailsos-bootable-usb-persistent-storage-full-guide",
    excerpt: "TailsOS is one of the most trusted privacy-focused operating systems. It routes all traffic through Tor, leaves no trace on the host machine, and gives you a secure, amnesic environment for sensitive work.",
    date: "2026-01-16",
    author: "Derrk Samuel",
    category: "Privacy",
    tags: ["TailsOS", "Privacy", "Linux", "Security", "Tor"],
    readTime: "7 min",
    source: "techderksinsights",
    image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9a185eaf0_generated_11852527.png",
    featured: true,
    content: `## Overview

TailsOS is one of the most trusted privacy-focused operating systems in the world. It routes all traffic through Tor, leaves no trace on the host machine, and gives you a secure, amnesic environment for sensitive work. But to unlock its full power, you'll want persistent storage — an encrypted space on your USB that survives reboots.

## 🔧 What You Need Before You Start

- Two USB drives (8GB minimum, 16GB+ recommended)
- A computer running Windows, macOS, or Linux
- The latest TailsOS image from tails.net
- A flashing tool like balenaEtcher or Rufus

Using two USB drives is essential — one becomes the installer, the other becomes your final Tails device with persistence.

## 🛠️ Step 1: Create Your First Tails USB (The Installer)

1. Download the latest Tails image from the official site
2. Plug in your first USB drive
3. Open balenaEtcher or Rufus
4. Select the Tails file
5. Choose your USB drive as the target
6. Flash the image and wait for it to finish

Once complete, reboot your computer and boot from this USB. You may need to change your BIOS/UEFI boot order.

## 💾 Step 2: Clone Tails to Your Second USB

Once you're running Tails from the first USB:

1. Insert the second USB drive
2. Open Tails Installer → Applications → Tails → Tails Installer
3. Choose **Clone the current Tails**
4. Select the second USB as the destination
5. Click Install and let it finish

This second USB becomes your real Tails device.

## 🔐 Step 3: Enable Encrypted Persistent Storage

Now boot from the second USB:

1. Go to Applications → Tails → Persistent Storage
2. Launch the Persistent Storage Wizard
3. Create a strong passphrase (use 5–7 random words)
4. Select what you want to persist:
   - Personal files
   - Browser bookmarks
   - GnuPG keys
   - Network settings
   - Additional software
   - Dotfiles
5. Click Create
6. Restart Tails and unlock persistence at boot

## 🧠 Pro Tips for Power Users

- Use persistence to store Electrum wallets, SSH keys, or OnionShare settings
- Keep your persistent volume minimal — less data means less risk
- Back up your persistent volume occasionally (encrypted, offline)
- For crypto cold storage setups, Tails is one of the safest environments available

## Final Thoughts

Setting up TailsOS with persistent storage gives you a secure, portable, encrypted workspace you can take anywhere. Whether you're protecting sensitive research, managing crypto keys, or simply valuing privacy, this setup is one of the strongest operational security foundations you can build.`
  }
];

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