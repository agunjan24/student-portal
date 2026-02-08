import { writeFile, mkdir, unlink, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return `File type "${file.type}" is not supported. Please upload an image (JPEG, PNG, WebP, GIF) or PDF.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File is too large. Maximum size is 10MB.";
  }
  return null;
}

export async function saveFile(
  materialId: string,
  file: File
): Promise<{ filepath: string; filename: string }> {
  const dir = path.join(UPLOAD_DIR, materialId);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filepath = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return {
    filepath: `/uploads/${materialId}/${filename}`,
    filename,
  };
}

export async function deleteFile(materialId: string, filename: string): Promise<void> {
  const filepath = path.join(UPLOAD_DIR, materialId, filename);
  try {
    await unlink(filepath);
  } catch {
    // File may not exist
  }
}

export async function readFileAsBase64(filepath: string): Promise<string> {
  const absolutePath = path.join(process.cwd(), "public", filepath);
  const buffer = await readFile(absolutePath);
  return buffer.toString("base64");
}

export function getMimeType(filepath: string): string {
  const ext = path.extname(filepath).toLowerCase();
  const mimeMap: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
  };
  return mimeMap[ext] || "application/octet-stream";
}
