// scripts/upload.js
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function uploadFolder(folderName, bucketName, contentType) {
  const dirPath = path.join(process.cwd(), 'public', folderName);
  const files = await readdir(dirPath);

  console.log(`Uploading ${files.length} files to ${bucketName}...`);

  for (const file of files) {
    if (file === '.DS_Store') continue;

    const filePath = path.join(dirPath, file);
    const fileBuffer = await readFile(filePath);
    
    // Check if file exists
    const { data: existing } = await supabase.storage
      .from(bucketName)
      .list('', { search: file });

    if (existing && existing.length > 0) {
      console.log(`Skipped (exists): ${file}`);
      continue;
    }

    // Upload
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(file, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`Error ${file}:`, error.message);
    } else {
      console.log(`Uploaded: ${file}`);
    }
  }
}

async function main() {
  await uploadFolder('images', 'images', 'image/webp');
  await uploadFolder('audio', 'audio', 'audio/mpeg');
  console.log('All uploads complete!');
}

main();
