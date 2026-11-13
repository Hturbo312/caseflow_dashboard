export const VECTOR_DIMENSIONS = 384;
export const EMBEDDING_MODEL = "hashed-ngram-v1";

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "into",
  "are",
  "was",
  "were",
  "的",
  "了",
  "是",
  "在",
  "和",
  "与",
  "及",
  "把",
  "被",
  "对",
  "中",
  "为",
  "以",
  "让",
  "而",
  "不"
]);

function hashToken(token: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < token.length; i += 1) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function addToken(
  vector: Float32Array,
  token: string,
  weight: number,
  seen: Set<string>
) {
  if (!token || STOP_WORDS.has(token)) return;
  const key = `${token}:${weight.toFixed(2)}`;
  if (seen.has(key)) return;
  seen.add(key);
  const hash = hashToken(token);
  const index = hash % vector.length;
  const sign = (hash >>> 17) & 1 ? 1 : -1;
  vector[index] += sign * weight;
  const second = hashToken(`${token}#2`) % vector.length;
  vector[second] += sign * weight * 0.35;
}

/**
 * Deterministic local embedding: hashed character n-grams + Latin word tokens.
 * It keeps the demo fully offline. Swap this function for a model embedding
 * endpoint without changing the storage contract.
 */
export function embedText(text: string): Float32Array {
  const normalized = text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  const vector = new Float32Array(VECTOR_DIMENSIONS);
  const seen = new Set<string>();

  const latinWords = normalized.match(/[a-z][a-z0-9+.-]{1,}/g) ?? [];
  for (const word of latinWords) {
    addToken(vector, word, 1.35, seen);
    if (word.length > 5) {
      for (let i = 0; i <= word.length - 4; i += 1) {
        addToken(vector, word.slice(i, i + 4), 0.45, seen);
      }
    }
  }

  const cjkRuns = normalized.match(/[\u3400-\u9fff]+/g) ?? [];
  for (const run of cjkRuns) {
    for (const char of run) {
      addToken(vector, char, 0.3, seen);
    }
    for (let i = 0; i < run.length - 1; i += 1) {
      addToken(vector, run.slice(i, i + 2), 1.15, seen);
    }
    for (let i = 0; i < run.length - 2; i += 1) {
      addToken(vector, run.slice(i, i + 3), 0.62, seen);
    }
    if (run.length <= 12) {
      addToken(vector, run, 0.75, seen);
    }
  }

  let magnitude = 0;
  for (const value of vector) magnitude += value * value;
  magnitude = Math.sqrt(magnitude) || 1;
  for (let i = 0; i < vector.length; i += 1) {
    vector[i] /= magnitude;
  }
  return vector;
}

export function embeddingBuffer(text: string): Buffer {
  const vector = embedText(text);
  return Buffer.from(vector.buffer, vector.byteOffset, vector.byteLength);
}
