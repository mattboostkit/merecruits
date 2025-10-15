#!/usr/bin/env node

/**
 * Script to upload team member photos to Convex
 *
 * Usage:
 *   node scripts/upload-team-photos.js <path-to-photos-folder>
 *
 * Example:
 *   node scripts/upload-team-photos.js C:/Users/YourName/Desktop/team-photos
 *
 * Photo naming convention:
 *   neil-simmons.jpg
 *   ellie-waterman.jpg
 *   helen-barham.jpg
 *   kate-byrom.jpg
 *   sarah-bysouth.jpg
 *   melissa-staveley.jpg
 *   jo-marsden-strong.jpg
 *   rachel-fisher.jpg
 *   emma-moss.jpg
 *   isobel-colman.jpg
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Team member mapping (filename -> database name)
const TEAM_MEMBERS = {
  'neil-simmons': 'Neil Simmons',
  'ellie-waterman': 'Ellie Waterman',
  'helen-barham': 'Helen Barham',
  'kate-byrom': 'Kate Byrom',
  'sarah-bysouth': 'Sarah Bysouth',
  'melissa-staveley': 'Melissa Staveley',
  'jo-marsden-strong': 'Jo Marsden-Strong',
  'rachel-fisher': 'Rachel Fisher',
  'emma-moss': 'Emma Moss',
  'isobel-colman': 'Isobel Colman',
};

// Get Convex deployment URL from environment
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error('❌ Error: NEXT_PUBLIC_CONVEX_URL not found in environment');
  console.error('Please make sure you have .env.local file with NEXT_PUBLIC_CONVEX_URL set');
  process.exit(1);
}

// Get photos folder from command line argument
const photosFolder = process.argv[2];

if (!photosFolder) {
  console.error('❌ Error: Please provide the path to your photos folder');
  console.error('Usage: node scripts/upload-team-photos.js <path-to-photos-folder>');
  console.error('Example: node scripts/upload-team-photos.js C:/Users/YourName/Desktop/team-photos');
  process.exit(1);
}

if (!fs.existsSync(photosFolder)) {
  console.error(`❌ Error: Folder not found: ${photosFolder}`);
  process.exit(1);
}

console.log('🚀 Starting team photo upload process...\n');

// Function to get upload URL from Convex
async function getUploadUrl() {
  return new Promise((resolve, reject) => {
    const url = `${CONVEX_URL}/api/mutation`;
    const data = JSON.stringify({
      path: 'files:generateUploadUrl',
      args: {},
    });

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Function to upload file to Convex storage
async function uploadFile(uploadUrl, filePath) {
  return new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(filePath);
    const url = new URL(uploadUrl);

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': fileBuffer.length,
      },
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(fileBuffer);
    req.end();
  });
}

// Function to update team member photo in database
async function updateTeamMemberPhoto(name, storageId) {
  return new Promise((resolve, reject) => {
    const url = `${CONVEX_URL}/api/mutation`;
    const imageUrl = `${CONVEX_URL}/api/storage/${storageId}`;
    const data = JSON.stringify({
      path: 'teamPhotos:updatePhoto',
      args: { name, imageUrl },
    });

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Main upload process
async function uploadTeamPhotos() {
  const results = {
    success: [],
    failed: [],
    notFound: [],
  };

  console.log(`📁 Scanning folder: ${photosFolder}\n`);

  for (const [filename, memberName] of Object.entries(TEAM_MEMBERS)) {
    const extensions = ['.jpg', '.jpeg', '.png'];
    let foundFile = null;

    // Try to find the file with any of the extensions
    for (const ext of extensions) {
      const filePath = path.join(photosFolder, filename + ext);
      if (fs.existsSync(filePath)) {
        foundFile = filePath;
        break;
      }
    }

    if (!foundFile) {
      console.log(`⚠️  ${memberName}: Photo not found (tried ${filename}.jpg, .jpeg, .png)`);
      results.notFound.push(memberName);
      continue;
    }

    try {
      console.log(`📸 Uploading ${memberName}...`);

      // Step 1: Get upload URL
      const uploadUrlResponse = await getUploadUrl();
      const uploadUrl = uploadUrlResponse;

      // Step 2: Upload file
      const uploadResponse = await uploadFile(uploadUrl, foundFile);
      const storageId = uploadResponse.storageId;

      // Step 3: Update database
      await updateTeamMemberPhoto(memberName, storageId);

      console.log(`✅ ${memberName}: Successfully uploaded and updated\n`);
      results.success.push(memberName);

    } catch (error) {
      console.error(`❌ ${memberName}: Failed to upload`);
      console.error(`   Error: ${error.message}\n`);
      results.failed.push({ name: memberName, error: error.message });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully uploaded: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️  Not found: ${results.notFound.length}`);
  console.log('='.repeat(50) + '\n');

  if (results.success.length > 0) {
    console.log('✅ Successfully uploaded:');
    results.success.forEach(name => console.log(`   - ${name}`));
    console.log('');
  }

  if (results.failed.length > 0) {
    console.log('❌ Failed uploads:');
    results.failed.forEach(item => console.log(`   - ${item.name}: ${item.error}`));
    console.log('');
  }

  if (results.notFound.length > 0) {
    console.log('⚠️  Photos not found:');
    results.notFound.forEach(name => console.log(`   - ${name}`));
    console.log('\nPlease ensure photos are named correctly:');
    Object.keys(TEAM_MEMBERS).forEach(filename => {
      console.log(`   - ${filename}.jpg (or .jpeg, .png)`);
    });
    console.log('');
  }

  if (results.success.length === Object.keys(TEAM_MEMBERS).length) {
    console.log('🎉 All team member photos uploaded successfully!');
    console.log('Visit https://merecruits.vercel.app/meet-the-team to see the results.\n');
  }
}

// Run the upload process
uploadTeamPhotos().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
