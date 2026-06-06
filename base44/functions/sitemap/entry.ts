const SITE_URL = 'https://web3tech.site';

const BLOG_SLUGS = [
  // batch 1
  "debian-vm-pixel-9a-kali-tools-no-root",
  "diskpart-full-wipe-partition-format-script",
  "install-google-chrome-ubuntu-desktop-quick-guide",
  "alison-free-online-courses-professional-development-guide",
  "docker-containers-smart-contract-interaction",
  "smart-contract-interactions-private-networks",
  "crypto-scam-safeguards-community-onboarding",
  "ethereum-node-docker-geth-setup-guide",
  "ubuntu-change-default-storage-locations-downloads-documents",
  "rufus-access-denied-iso-extraction-failure-fix",
  "manually-update-snap-store-ubuntu-20-04",
  "kali-linux-vnc-password-reset-windows-wsl-vm",
  "hidden-cybersecurity-toolkit-5-resources-pros",
  "purpose-software-computer-architecture-design",
  "manual-partitioning-ubuntu-20-04-uefi-gpt-guide",
  "kaspa-stratum-bridge-docker-environment-variables",
  "fix-unable-to-locate-docker-compose-plugin-linux-debian",
  "benefits-google-advanced-protection-program",
  "interact-deployed-smart-contract-any-network",
  "extract-data-smart-contracts-containers-docker",
  "majorgeeks-trusted-software-download-hub-2026-guide",
  "tailsos-bootable-usb-persistent-storage-full-guide",
  // batch 2 (blogPosts2)
  "kaspa-mining-setup-ubuntu-hiveos-nicehash-docker",
  "kaspa-miner-solo-pool-cli-guide",
  "setup-kaspa-wallet-cli-web-guide",
  "kaspa-node-setup-ubuntu-docker-guide",
  "monero-mining-p2pool-xmrig-complete-guide",
  "privacy-coins-monero-zcash-dash-comparison",
  "bitcoin-full-node-ubuntu-guide",
  "ethereum-staking-validator-node-guide",
  "linux-command-line-essentials-beginners-guide",
  "docker-beginners-complete-guide",
  "git-github-complete-guide-beginners",
  "web3-development-environment-setup-guide",
  "smart-contract-security-audit-guide",
  "defi-yield-farming-liquidity-mining-guide",
  "nft-minting-smart-contract-guide",
  "metamask-setup-security-guide",
  "hardware-wallet-ledger-trezor-guide",
  "crypto-tax-reporting-guide",
  "blockchain-consensus-mechanisms-explained",
  "web3-wallet-types-comparison",
  // batch 3 (blogPosts3)
  "docker-container-logs-linux-guide",
  "linux-no-such-file-or-directory-error-fix",
  "exit-programs-ubuntu-server-keyboard-shortcuts",
  "run-kaspa-rust-node-ubuntu-rpc",
  "switch-gui-to-terminal-tty-ubuntu",
  "restart-x-server-ubuntu-display-manager",
  "send-crypto-command-line-cli-guide",
  // batch 4 (blogPosts4)
  "format-ssd-debian-linux-ext4-gparted-cli",
  "change-root-password-switch-accounts-ubuntu-server",
  "ai-generated-website-github-pages-deploy-guide",
  // batch 5 (blogPosts5)
  "update-upgrade-debian-linux-full-guide",
  "install-debian-persistent-live-usb-rufus-guide",
  "windows-sound-microphone-configuration-fix-audio-issues",
  "flash-tails-os-512gb-ssd-internal-drive-guide",
  "install-kali-linux-wsl2-windows-11-win-kex-gui",
  "monero-gui-couldnt-start-mining-solo-mode-fix",
  "update-windows-11-apps-cmd-winget-usoclient",
  "copilot-ai-transforming-business-everyday-users",
  "create-cryptocurrency-token-reach-bitcoin-value",
];

const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/blog', priority: '0.9', changefreq: 'daily' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
];

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = STATIC_PAGES.map(p => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  const postUrls = BLOG_SLUGS.map(slug => `  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;
}

Deno.serve(async (_req) => {
  const xml = buildSitemap();
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
});