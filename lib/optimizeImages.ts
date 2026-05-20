import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const inputDir = path.join(process.cwd(), "public", "media");
const outputDir = path.join(process.cwd(), "public", "media", "optimized");

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    await sharp(inputPath)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outputPath);

    console.log(`Optimized ${file} -> optimized/${baseName}.webp`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});