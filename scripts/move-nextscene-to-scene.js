/**
 * Faqat barcha tanlovlari bir xil nextScene ga boradigan sahnalarda:
 * - sahna darajasida nextScene qo'shadi
 * - har bir tanlovdan nextScene ni olib tashlaydi
 * Filial (har xil nextScene) sahnalarga tegmaydi.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, '../src/data/startup.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let changed = 0;
for (const [id, scene] of Object.entries(data)) {
  const choices = scene.choices;
  if (!Array.isArray(choices) || choices.length === 0) continue;

  const nextScenes = choices.map((c) => c.nextScene).filter(Boolean);
  if (nextScenes.length === 0) continue;

  const unique = [...new Set(nextScenes)];
  if (unique.length !== 1) continue; // filial — tegmaymiz

  const singleNext = unique[0];
  if (scene.nextScene === singleNext) continue; // allaqachon sahna darajasida bor

  scene.nextScene = singleNext;
  for (const choice of choices) {
    delete choice.nextScene;
  }
  changed++;
  console.log(id, '->', singleNext);
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Total scenes updated:', changed);
