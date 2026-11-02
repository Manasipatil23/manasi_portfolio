import sharp from 'sharp';
import fs from 'fs';

async function removeWhiteBackground() {
  const inputPath = 'design-assets/coral_rose.jpg';
  const outputPath = 'public/images/coral_rose_transparent.png';

  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  // Convert to raw RGBA buffer
  const rawBuffer = await image.ensureAlpha().raw().toBuffer();

  const threshold = 238;
  const feather = 18; // soft edge

  for (let i = 0; i < rawBuffer.length; i += 4) {
    const r = rawBuffer[i];
    const g = rawBuffer[i + 1];
    const b = rawBuffer[i + 2];

    // Check if pixel is white/near-white
    const brightness = (r + g + b) / 3;
    const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

    // If near neutral grey/white and bright
    if (brightness > threshold && diff < 15) {
      if (brightness >= 250) {
        rawBuffer[i + 3] = 0; // completely transparent
      } else {
        const factor = (brightness - threshold) / (250 - threshold);
        rawBuffer[i + 3] = Math.round((1 - factor) * 255);
      }
    }
  }

  await sharp(rawBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Successfully created transparent PNG: ${outputPath}`);

  // Lighter copy served to browsers that support WebP (see HeroSection)
  const webpPath = outputPath.replace(/\.png$/, '.webp');
  await sharp(outputPath)
    .resize({ width: 800 })
    .webp({ quality: 72, alphaQuality: 85, effort: 6 })
    .toFile(webpPath);

  console.log(`Successfully created WebP: ${webpPath}`);
}

removeWhiteBackground().catch(console.error);
