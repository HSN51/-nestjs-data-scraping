import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // Directory already exists or another error
  }
}

export function getFilePath(source: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dir = join('storage', `${yyyy}-${mm}-${dd}`);
  const filename = `${source}_${uuidv4()}.json`;
  return join(dir, filename);
}

export async function saveJsonToFile(source: string, data: any) {
  const filePath = getFilePath(source);
  const dir = dirname(filePath);
  await ensureDir(dir);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
} 