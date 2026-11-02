import sharp from 'sharp';

// Builds the 1200x630 link-preview image (LinkedIn, Slack, X) at public/og-cover.png
const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#F5F0E8"/>
  <rect x="72" y="150" width="3" height="26" fill="#E9784F"/>
  <text x="90" y="171" font-family="Menlo, Courier New, monospace" font-size="22" font-weight="700" letter-spacing="4" fill="#174B79">DATA ENGINEERING · ANALYTICS · APPLIED ML</text>
  <text x="68" y="292" font-family="Helvetica Neue, Arial, sans-serif" font-size="104" font-weight="800" letter-spacing="-2" fill="#174B79">Manasi Patil</text>
  <text x="72" y="364" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="500" fill="#24699A">I build the data pipelines and warehouses that</text>
  <text x="72" y="410" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="500" fill="#24699A">analytics runs on, and the ML on top of them.</text>
  <rect x="72" y="470" width="660" height="1" fill="#D9C9B7"/>
  <text x="72" y="520" font-family="Menlo, Courier New, monospace" font-size="22" fill="#174B79">B.Tech CE '27 · CGPA 9.33/10 · K J Somaiya, Mumbai</text>
</svg>`;

const rose = await sharp('public/images/coral_rose_transparent.png')
  .resize({ height: 560 })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: rose, top: 35, left: 790 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-cover.png');

console.log('Created public/og-cover.png');
