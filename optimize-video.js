const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const videos = ['banner-drone.mp4', 'drone-details.mp4'];

for (const video of videos) {
  const inputPath = path.join(__dirname, 'public', 'videos', video);
  const outputPath = path.join(__dirname, 'public', 'videos', `opt-${video}`);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    continue;
  }
  
  console.log(`Optimizing ${video}... This may take a few minutes.`);
  
  const args = [
    '-y',
    '-i', inputPath,
    '-vcodec', 'libx264',
    '-crf', '28',
    '-preset', 'fast',
    '-movflags', '+faststart',
    '-an', // Remove audio completely to save space (since it's muted in HeroBanner)
    outputPath
  ];
  
  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  
  if (result.status === 0) {
    console.log(`Successfully optimized ${video}`);
    // Replace original with optimized
    fs.renameSync(outputPath, inputPath);
  } else {
    console.error(`Failed to optimize ${video}`);
  }
}

console.log("All videos processed.");
