#!/usr/bin/env node

/**
 * Asset Optimization Script for PDCL Frontend
 * This script optimizes images and videos to improve performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  // Directories to process
  assetsDir: './src/assets',
  outputDir: './src/assets/optimized',
  
  // Image optimization settings
  webp: {
    quality: 80,
    effort: 6
  },
  jpeg: {
    quality: 85,
    progressive: true
  },
  
  // Video optimization settings
  video: {
    quality: 28, // Lower is better quality, higher compression
    maxWidth: 1920,
    maxHeight: 1080
  }
};

// Utility functions
const log = (message, type = 'info') => {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m'
  };
  console.log(`${colors[type]}[${type.toUpperCase()}] ${message}\x1b[0m`);
};

const getFileSizeInMB = (filePath) => {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
};

const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Image optimization functions
const optimizeWebP = async (inputPath, outputPath) => {
  try {
    const command = `npx @squoosh/cli --webp '{"quality":${CONFIG.webp.quality},"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' "${inputPath}"`;
    execSync(command, { cwd: path.dirname(outputPath) });
    log(`WebP optimized: ${path.basename(inputPath)}`, 'success');
  } catch (error) {
    log(`Failed to optimize WebP: ${path.basename(inputPath)} - ${error.message}`, 'error');
  }
};

const convertJPGtoWebP = async (inputPath, outputPath) => {
  try {
    const webpPath = outputPath.replace(path.extname(outputPath), '.webp');
    const command = `npx @squoosh/cli --webp '{"quality":${CONFIG.webp.quality}}' "${inputPath}" -d "${path.dirname(webpPath)}"`;
    execSync(command);
    log(`Converted to WebP: ${path.basename(inputPath)} -> ${path.basename(webpPath)}`, 'success');
    return webpPath;
  } catch (error) {
    log(`Failed to convert to WebP: ${path.basename(inputPath)} - ${error.message}`, 'error');
    return null;
  }
};

// Video optimization functions
const optimizeVideo = async (inputPath, outputPath) => {
  try {
    const inputSize = getFileSizeInMB(inputPath);
    
    // Use ffmpeg for video compression
    const command = `ffmpeg -i "${inputPath}" -c:v libx264 -crf ${CONFIG.video.quality} -preset medium -vf "scale='min(${CONFIG.video.maxWidth},iw)':'min(${CONFIG.video.maxHeight},ih)':force_original_aspect_ratio=decrease" -c:a aac -b:a 128k -movflags +faststart "${outputPath}" -y`;
    
    log(`Compressing video: ${path.basename(inputPath)} (${inputSize}MB)`, 'info');
    execSync(command, { stdio: 'pipe' });
    
    const outputSize = getFileSizeInMB(outputPath);
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    log(`Video optimized: ${path.basename(inputPath)} (${inputSize}MB -> ${outputSize}MB, ${savings}% savings)`, 'success');
  } catch (error) {
    log(`Failed to optimize video: ${path.basename(inputPath)} - ${error.message}`, 'error');
  }
};

// Main optimization process
const processDirectory = async (dirPath) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }
    
    const ext = path.extname(entry.name).toLowerCase();
    const relativePath = path.relative(CONFIG.assetsDir, fullPath);
    const outputPath = path.join(CONFIG.outputDir, relativePath);
    
    ensureDirectory(path.dirname(outputPath));
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        await convertJPGtoWebP(fullPath, outputPath);
        break;
        
      case '.webp':
        // Re-optimize existing WebP files
        const currentSize = getFileSizeInMB(fullPath);
        if (currentSize > 0.1) { // Only process files larger than 100KB
          await optimizeWebP(fullPath, outputPath);
        }
        break;
        
      case '.mp4':
        const videoSize = getFileSizeInMB(fullPath);
        if (videoSize > 1) { // Only process videos larger than 1MB
          await optimizeVideo(fullPath, outputPath);
        }
        break;
        
      default:
        // Copy other files as-is
        fs.copyFileSync(fullPath, outputPath);
        break;
    }
  }
};

// Generate optimization report
const generateReport = () => {
  const originalSize = execSync(`du -sh "${CONFIG.assetsDir}" | cut -f1`).toString().trim();
  const optimizedSize = execSync(`du -sh "${CONFIG.outputDir}" | cut -f1`).toString().trim();
  
  log('\n📊 OPTIMIZATION REPORT', 'info');
  log(`Original assets size: ${originalSize}`, 'info');
  log(`Optimized assets size: ${optimizedSize}`, 'success');
  log('\n✅ Next Steps:', 'info');
  log('1. Review optimized files in ./src/assets/optimized/', 'info');
  log('2. Replace original assets with optimized versions', 'info');
  log('3. Update import paths if necessary', 'info');
  log('4. Test the application thoroughly', 'info');
  log('5. Deploy and measure performance improvements', 'success');
};

// Main execution
const main = async () => {
  log('🚀 Starting PDCL Asset Optimization', 'info');
  
  // Check if required tools are installed
  try {
    execSync('npx @squoosh/cli --help', { stdio: 'pipe' });
    log('✓ Squoosh CLI available', 'success');
  } catch {
    log('Installing @squoosh/cli...', 'info');
    execSync('npm install --save-dev @squoosh/cli');
  }
  
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    log('✓ FFmpeg available', 'success');
  } catch {
    log('FFmpeg not found. Video optimization will be skipped.', 'warning');
    log('Install FFmpeg: https://ffmpeg.org/download.html', 'warning');
  }
  
  // Create output directory
  ensureDirectory(CONFIG.outputDir);
  
  // Process all assets
  await processDirectory(CONFIG.assetsDir);
  
  // Generate report
  generateReport();
  
  log('\n🎉 Asset optimization completed!', 'success');
};

// Run the script
if (require.main === module) {
  main().catch(error => {
    log(`Optimization failed: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { main, CONFIG };
