import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcLogosDir = path.resolve('src', 'assets', 'logos');
const publicDirs = [
  path.resolve('public', 'metrics'),
  path.resolve('public', 'about'),
  path.resolve('public', 'capabilities')
];

async function processSVGs() {
  if (!fs.existsSync(srcLogosDir)) return;
  const files = fs.readdirSync(srcLogosDir);
  for (const file of files) {
    if (file.endsWith('.svg')) {
      const filePath = path.join(srcLogosDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Look for base64 encoded png or jpeg
      const match = content.match(/href="data:image\/(png|jpeg);base64,([^"]+)"/);
      if (match) {
        const base64Data = match[2];
        const buffer = Buffer.from(base64Data, 'base64');
        const outputName = file.replace('.svg', '.webp');
        const outputPath = path.join(srcLogosDir, outputName);
        
        console.log(`Converting ${file} -> ${outputName}`);
        await sharp(buffer)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        // Delete original SVG
        fs.unlinkSync(filePath);
      }
    }
  }
}

async function processPublicPNGs() {
  for (const dir of publicDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          const filePath = path.join(dir, file);
          const ext = path.extname(file);
          const outputName = file.replace(ext, '.webp');
          const outputPath = path.join(dir, outputName);
          
          console.log(`Converting ${file} -> ${outputName}`);
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputPath);
            
          // Delete original image
          fs.unlinkSync(filePath);
        }
      }
    }
  }
}

async function main() {
  await processSVGs();
  await processPublicPNGs();
  console.log('Done!');
}

main().catch(console.error);
