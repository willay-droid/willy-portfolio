import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import GIFEncoder from "gifencoder";

const inputDir = "./src/assets/profile/gallery";
const outputFile = "./src/assets/profile/foto.gif";

const files = [
  "neutral.png",
  "smile.png",
  "laugh.png",
  "angry.png",
  "thinking.png",
  "confused.png",
  "blonde.png",
  "wink.png",
  "glasses.png",
  "headphone.png",
  "pouting.png",
  "surprised.png",
];

const size = 420;
const delay = 350;

const encoder = new GIFEncoder(size, size);
encoder.createReadStream().pipe(fs.createWriteStream(outputFile));

encoder.start();
encoder.setRepeat(0);
encoder.setDelay(delay);
encoder.setQuality(10);

const canvas = createCanvas(size, size);
const ctx = canvas.getContext("2d");

for (const file of files) {
  const img = await loadImage(path.join(inputDir, file));

  ctx.clearRect(0, 0, size, size);

  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(img, 0, 0, size, size);
  ctx.restore();

  encoder.addFrame(ctx);
}

encoder.finish();

console.log("GIF berhasil dibuat:", outputFile);
