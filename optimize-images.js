#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфігурація
const IMAGES_DIR = './public/images';
const QUALITY = 80;
const FORMAT = 'webp';

// Функція для рекурсивного пошуку .jpg файлів
function findJpgFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.toLowerCase().endsWith('.jpg') || item.toLowerCase().endsWith('.jpeg')) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

// Функція для конвертації зображення
async function convertImage(inputPath) {
  const outputPath = inputPath.replace(/\.(jpg|jpeg)$/i, `.${FORMAT}`);
  
  // Перевіряємо, чи вже існує .webp файл
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Пропускаємо ${inputPath} - .webp вже існує`);
    return;
  }
  
  try {
    console.log(`🔄 Конвертуємо ${inputPath}...`);
    
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    // Отримуємо розміри файлів для порівняння
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Готово: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   Розмір: ${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (економія ${savings}%)`);
    
  } catch (error) {
    console.error(`❌ Помилка конвертації ${inputPath}:`, error.message);
  }
}

// Головна функція
async function optimizeImages() {
  console.log('🚀 Починаємо оптимізацію зображень...\n');
  
  // Перевіряємо, чи існує директорія
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Директорія ${IMAGES_DIR} не існує`);
    process.exit(1);
  }
  
  // Знаходимо всі .jpg файли
  const jpgFiles = findJpgFiles(IMAGES_DIR);
  
  if (jpgFiles.length === 0) {
    console.log('ℹ️  .jpg файлів не знайдено');
    return;
  }
  
  console.log(`📁 Знайдено ${jpgFiles.length} .jpg файлів\n`);
  
  // Конвертуємо кожен файл
  for (const file of jpgFiles) {
    await convertImage(file);
  }
  
  console.log('\n🎉 Оптимізація завершена!');
  
  // Підрахунок результатів
  const webpFiles = findJpgFiles(IMAGES_DIR).map(f => f.replace(/\.(jpg|jpeg)$/i, `.${FORMAT}`)).filter(f => fs.existsSync(f));
  console.log(`📊 Створено ${webpFiles.length} .webp файлів`);
}

// Запускаємо скрипт
optimizeImages().catch(console.error); 