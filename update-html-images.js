#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функція для оновлення img тегів
function updateImageTags(htmlContent) {
  // Регулярний вираз для пошуку img тегів з .jpg файлами
  const imgRegex = /<img([^>]*?)src=["']([^"']*\.(jpg|jpeg))["']([^>]*?)>/gi;
  
  return htmlContent.replace(imgRegex, (match, beforeSrc, src, extension, afterSrc) => {
    // Створюємо .webp версію шляху
    const webpSrc = src.replace(/\.(jpg|jpeg)$/i, '.webp');
    
    // Перевіряємо, чи існує .webp файл
    // Видаляємо /public/ з шляху для перевірки файлу
    const relativePath = src.replace(/^\/public\//, '');
    const webpPath = path.join('./public', relativePath.replace(/\.(jpg|jpeg)$/i, '.webp'));
    
    if (!fs.existsSync(webpPath)) {
      return match; // Залишаємо оригінальний тег, якщо .webp не існує
    }
    
    // Створюємо picture тег з fallback
    return `<picture>
  <source srcset="${webpSrc}" type="image/webp">
  <img${beforeSrc}src="${src}"${afterSrc}>
</picture>`;
  });
}

// Функція для обробки одного файлу
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = updateImageTags(content);
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Оновлено: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  Пропущено: ${filePath} (змін не знайдено)`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Помилка обробки ${filePath}:`, error.message);
    return false;
  }
}

// Функція для рекурсивного пошуку HTML файлів
function findHtmlFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.toLowerCase().endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

// Головна функція
function updateHtmlImages() {
  console.log('🚀 Починаємо оновлення HTML файлів...\n');
  
  // Знаходимо всі HTML файли
  const htmlFiles = findHtmlFiles('.');
  
  if (htmlFiles.length === 0) {
    console.log('ℹ️  HTML файлів не знайдено');
    return;
  }
  
  console.log(`📁 Знайдено ${htmlFiles.length} HTML файлів\n`);
  
  let updatedCount = 0;
  
  // Обробляємо кожен файл
  for (const file of htmlFiles) {
    if (processFile(file)) {
      updatedCount++;
    }
  }
  
  console.log(`\n🎉 Оновлення завершено!`);
  console.log(`📊 Оновлено ${updatedCount} файлів з ${htmlFiles.length}`);
}

// Запускаємо скрипт
updateHtmlImages(); 