import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public/brand/opg-solutions-logo.svg");
const pngPath = path.join(root, "public/brand/opg-solutions-logo.png");
const pngDarkPath = path.join(root, "public/brand/opg-solutions-logo-dark.png");

const svg = fs.readFileSync(svgPath);
await sharp(svg, { density: 300 }).resize(880, 1100).png().toFile(pngPath);

const darkSvg = svg
  .toString()
  .replaceAll('fill="#FFFFFF"', 'fill="#0a0a0a"')
  .replaceAll('stroke="#FFFFFF"', 'stroke="#0a0a0a"');
await sharp(Buffer.from(darkSvg), { density: 300 }).resize(880, 1100).png().toFile(pngDarkPath);

console.log("Wrote", pngPath, pngDarkPath);
