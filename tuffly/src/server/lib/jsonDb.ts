import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const dataDir = join(process.cwd(), ".data");

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

export async function readCollection<T>(fileName: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = join(dataDir, fileName);
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

export async function writeCollection<T>(fileName: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = join(dataDir, fileName);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
