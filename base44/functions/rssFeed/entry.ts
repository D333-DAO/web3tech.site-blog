import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SITE_URL = 'https://theweb3tech.site';
const SITE_TITLE = 'TheWeb3Tech — Web3, Crypto & Linux Insights';
const SITE_DESCRIPTION = 'Web3, crypto, and Linux PC insights — practical guides, security tips, mining setups, blockchain tools, and decentralized tech strategies for techs.';
const AUTHOR_NAME = 'Derrk Samuel';

// All blog posts inlined (no local imports allowed in backend functions)
const BLOG_POSTS = [
  { slug: "debian-vm-pixel-9a-kali-tools-no-root", title: "Running a Debian VM on Pixel 9a — Install Kali Tools Without Root", excerpt: "Use Google's Android Virtualization Framework to run a real Debian VM on your Pixel 9a — no root, no bootloader unlock. Then install Kali tools inside it for a production-safe mobile security lab.", date: "2026-05-30", author: "Derrk Samuel", category: "Security", tags: ["Debian", "Android", "Pixel", "Kali", "Virtualization", "Linux", "Security"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/241ccc70a_generated_image.png" },
  { slug: "diskpart-full-wipe-partition-format-script", title: "Full Wipe → Partition → Format → Ready-to-Use (DiskPart Script)", excerpt: "The cleanest, safest, and most correct DiskPart sequence for preparing any drive on Windows.", date: "2026-05-30", author: "Derrk Samuel", category: "Software", tags: ["DiskPart", "Windows", "Disk Management", "Formatting"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/3e90fcf71_generated_6266866e.png" },
  { slug: "install-google-chrome-ubuntu-desktop-quick-guide", title: "How to Install Google Chrome on Ubuntu Desktop — Quick & Easy Methods", excerpt: "The quickest, cleanest way to install Google Chrome on Ubuntu Desktop using either the terminal or GUI.", date: "2026-05-30", author: "Derrk Samuel", category: "Linux", tags: ["Chrome", "Ubuntu", "Linux", "Installation"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9dfb627de_generated_image.png" },
  { slug: "alison-free-online-courses-professional-development-guide", title: "Alison.com: The Complete Guide to Free Online Learning and Professional Development", excerpt: "Discover Alison.com, the leading free online learning platform offering thousands of certified courses.", date: "2026-05-24", author: "Derrk Samuel", category: "Software", tags: ["Online Learning", "Free Courses", "Professional Development"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/90549dee9_generated_image.png" },
  { slug: "docker-containers-smart-contract-interaction", title: "Using Docker Containers to Interact with Smart Contracts", excerpt: "Package your blockchain development environment into isolated, reproducible Docker containers.", date: "2026-05-24", author: "Derrk Samuel", category: "Blockchain", tags: ["Docker", "Smart Contracts", "Ethereum"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/f8853543a_generated_image.png" },
  { slug: "smart-contract-interactions-private-networks", title: "Interact with Deployed Smart Contracts — Read and Write Operations on Private Networks", excerpt: "Learn how to interact with deployed smart contracts using web3.js and web3js-quorum.", date: "2026-05-23", author: "Derrk Samuel", category: "Blockchain", tags: ["Smart Contracts", "Web3", "Ethereum", "Private Networks"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/61655169e_generated_image.png" },
  { slug: "crypto-scam-safeguards-community-onboarding", title: "From Scams to Safeguards: Strengthening Crypto Onboarding Through Community-Driven Narratives", excerpt: "A comprehensive framework for crypto safety through community-driven narratives, peer education, and decentralized safeguards.", date: "2026-05-23", author: "Derrk Samuel", category: "Security", tags: ["Crypto", "Scams", "Security", "Community", "DAO"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/241ccc70a_generated_image.png" },
  { slug: "ethereum-node-docker-geth-setup-guide", title: "Run an Ethereum Node with Docker and Geth — Complete Setup Guide", excerpt: "Step-by-step guide to setting up a Docker container that runs an Ethereum node using Geth.", date: "2026-05-23", author: "Derrk Samuel", category: "Blockchain", tags: ["Ethereum", "Docker", "Geth", "Blockchain"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/d3452c52b_generated_image.png" },
  { slug: "ubuntu-change-default-storage-locations-downloads-documents", title: "Change Where Ubuntu Stores New Data (Downloads, Documents, Pictures, etc.)", excerpt: "The clean, reliable way to change where Ubuntu stores your default user folders using XDG user directories system.", date: "2026-05-23", author: "Derrk Samuel", category: "Linux", tags: ["Ubuntu", "Linux", "Storage", "XDG"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9dfb627de_generated_image.png" },
  { slug: "rufus-access-denied-iso-extraction-failure-fix", title: "Rufus 'Access to the Drive is Denied' & 'ISO Image Extraction Failure' — Complete Fix Guide", excerpt: "Fix Rufus errors 'Access to the drive is denied' and 'ISO image extraction failure' with this power-user breakdown.", date: "2026-05-30", author: "Derrk Samuel", category: "Software", tags: ["Rufus", "Windows", "ISO", "USB"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/3e90fcf71_generated_6266866e.png" },
  { slug: "manually-update-snap-store-ubuntu-20-04", title: "Step-by-Step: Manually Update the Snap Store in Ubuntu Desktop 20.04.6", excerpt: "Learn how to manually update the Snap Store on Ubuntu 20.04.6 by stopping its background processes.", date: "2026-05-30", author: "Derrk Samuel", category: "Linux", tags: ["Ubuntu", "Snap", "Linux"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9dfb627de_generated_image.png" },
  { slug: "kali-linux-vnc-password-reset-windows-wsl-vm", title: "How to Find or Reset Your VNC Password on Kali Linux (Windows, WSL & VM)", excerpt: "A professional guide to locating, setting, and resetting VNC passwords on Kali Linux — covering standard installations, virtual machines, and Win-KeX on WSL.", date: "2026-06-01", author: "Derrk Samuel", category: "Security", tags: ["Kali Linux", "VNC", "WSL", "Windows", "Linux"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/c77c43057_generated_92c1ff70.png" },
  { slug: "hidden-cybersecurity-toolkit-5-resources-pros", title: "The Hidden Toolkit: 5 Cybersecurity Resources the Pros Keep Quiet About", excerpt: "Beyond antivirus — discover the five lesser-known tools security experts use to stay ahead of threats.", date: "2026-05-31", author: "Derrk Samuel", category: "Security", tags: ["Cybersecurity", "Security Tools", "VirusTotal", "Shodan"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/c77c43057_generated_92c1ff70.png" },
  { slug: "purpose-software-computer-architecture-design", title: "Purpose of Software in Computer Architecture — Control, Abstraction, and Intelligence", excerpt: "Software gives hardware purpose by controlling resources, creating abstraction layers, enabling scalability.", date: "2026-05-31", author: "Derrk Samuel", category: "Software", tags: ["Software Architecture", "Computer Architecture", "Systems Design"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/3e90fcf71_generated_6266866e.png" },
  { slug: "manual-partitioning-ubuntu-20-04-uefi-gpt-guide", title: "Manual Partitioning in Ubuntu 20.04 — Complete UEFI + GPT Setup Guide", excerpt: "Step-by-step guide to manual partitioning during Ubuntu 20.04 installation.", date: "2026-05-31", author: "Derrk Samuel", category: "Linux", tags: ["Ubuntu", "Partitioning", "UEFI", "GPT"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9dfb627de_generated_image.png" },
  { slug: "kaspa-stratum-bridge-docker-environment-variables", title: "Kaspa Stratum Bridge Docker Environment Variables — Complete Guide", excerpt: "The definitive list of all environment variables for running the Kaspa Stratum Bridge inside Docker.", date: "2026-05-31", author: "Derrk Samuel", category: "Blockchain", tags: ["Kaspa", "Stratum Bridge", "Docker", "Mining"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/241ccc70a_generated_image.png" },
  { slug: "fix-unable-to-locate-docker-compose-plugin-linux-debian", title: 'How to Fix "Unable to Locate Package docker-compose-plugin" on Linux PC (Debian)', excerpt: "The Docker repository is not added on your system. Add Docker's official repo, update apt, and the install will work.", date: "2026-03-23", author: "Derrk Samuel", category: "Linux", tags: ["Docker", "Linux", "Debian", "DevOps"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/a6aaf5aba_generated_c2ca5b3e.png" },
  { slug: "benefits-google-advanced-protection-program", title: "Benefits of Google's Advanced Protection Program", excerpt: "Google's Advanced Protection Program offers the strongest security available for personal and enterprise accounts.", date: "2025-08-04", author: "Derrk Samuel", category: "Security", tags: ["Google", "Cybersecurity", "Phishing", "Authentication"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/c77c43057_generated_92c1ff70.png" },
  { slug: "interact-deployed-smart-contract-any-network", title: "Interact with a Deployed Smart Contract on Any Network", excerpt: "This tutorial shows you how to interact with smart contracts that have been deployed to a network.", date: "2025-06-14", author: "Derrk Samuel", category: "Blockchain", tags: ["Smart Contracts", "Ethereum", "Web3", "Solidity"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/0a9cfa608_generated_0891f93e.png" },
  { slug: "extract-data-smart-contracts-containers-docker", title: "Extract Data from Smart Contracts Using Containers", excerpt: "The process of extracting data from smart contracts involves three main steps: scanning, slot analysis, and storage extraction.", date: "2025-06-14", author: "Derrk Samuel", category: "Blockchain", tags: ["Smart Contracts", "Docker", "Data Extraction", "Ethereum"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/6a632fa81_generated_1d6446c3.png" },
  { slug: "majorgeeks-trusted-software-download-hub-2026-guide", title: "MajorGeeks.com: A Powerful, Trusted & No-Nonsense Software Hub (2026 Guide)", excerpt: "Discover MajorGeeks.com, the powerful and trusted global platform for free software downloads.", date: "2025-09-10", author: "Derrk Samuel", category: "Software", tags: ["Software", "Windows", "Downloads", "Security"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/3e90fcf71_generated_6266866e.png" },
  { slug: "tailsos-bootable-usb-persistent-storage-full-guide", title: "TailsOS: How to Create a Bootable USB With Persistent Storage (Full Guide)", excerpt: "TailsOS is one of the most trusted privacy-focused operating systems, routing all traffic through Tor.", date: "2026-01-16", author: "Derrk Samuel", category: "Privacy", tags: ["TailsOS", "Privacy", "Linux", "Security", "Tor"], image: "https://media.base44.com/images/public/6a112c3e2737801908a7c002/9a185eaf0_generated_11852527.png" },
];

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss(posts) {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastBuildDate = new Date(sorted[0]?.date || Date.now()).toUTCString();

  const items = sorted.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    const cats = (post.tags || []).map((t) => `    <category>${escapeXml(t)}</category>`).join('\n');
    return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${pubDate}</pubDate>
    <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>
${cats}
    <enclosure url="${escapeXml(post.image)}" type="image/jpeg" length="0"/>
  </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>${escapeXml(AUTHOR_NAME)}</managingEditor>
    <generator>TheWeb3Tech RSS Generator</generator>
    <atom:link href="${SITE_URL}/api/rssFeed" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

Deno.serve(async (_req) => {
  const xml = buildRss(BLOG_POSTS);
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
});