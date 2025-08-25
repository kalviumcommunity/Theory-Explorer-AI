import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const EMBED_FILE = path.resolve("embeddings.json");

export class VectorStore {
  constructor({ genAI, embedModelName }) {
    this.genAI = genAI;
    this.embedModel = genAI.getGenerativeModel({ model: embedModelName });
    this.items = [];     // { id, text, vector, meta }
    this.index = [];     // vectors (Float32Array)
    this.id2idx = new Map();
    this.loaded = false;
  }

  // Utility: cosine similarity
  static cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-10);
  }

  // Persist embeddings to disk
  save() {
    const data = this.items.map(it => ({
      id: it.id,
      text: it.text,
      vector: Array.from(it.vector),
      meta: it.meta
    }));
    fs.writeFileSync(EMBED_FILE, JSON.stringify({ items: data }, null, 2));
  }

  // Load embeddings if present
  load() {
    if (!fs.existsSync(EMBED_FILE)) return;
    const raw = JSON.parse(fs.readFileSync(EMBED_FILE, "utf-8"));
    this.items = raw.items.map(r => ({
      id: r.id,
      text: r.text,
      vector: Float32Array.from(r.vector),
      meta: r.meta
    }));
    this.index = this.items.map(it => it.vector);
    this.id2idx.clear();
    this.items.forEach((it, i) => this.id2idx.set(it.id, i));
    this.loaded = true;
  }

  // Create a rich text representation for embedding
  static theoryToText(th) {
    return [
      th.name, th.type, th.domain, th.era || "",
      th.summary,
      `Key concepts: ${th.key_concepts?.join(", ") || ""}`,
      `Status: ${th.status || ""}`,
      `Tags: ${th.tags?.join(", ") || ""}`,
      `Sources: ${th.sources?.join(", ") || ""}`
    ].join(" | ");
  }

async embedText(text) {
  const res = await this.embedModel.embedContent({
    content: {
      parts: [
        { text }   // Gemini expects text wrapped inside parts[]
      ]
    }
  });

  // For embeddings, the SDK returns something like { embedding: { values: number[] } }
  const values = res.embedding?.values || res.data?.[0]?.embedding?.values;
  if (!values) throw new Error("Embedding values not found in Gemini response");
  return Float32Array.from(values);
}


  async upsertTheory(th) {
    const text = VectorStore.theoryToText(th);
    const vec = await this.embedText(text);
    const existingIdx = this.id2idx.get(th.id);
    const item = { id: th.id, text, vector: vec, meta: { ...th } };

    if (existingIdx !== undefined) {
      this.items[existingIdx] = item;
      this.index[existingIdx] = vec;
    } else {
      this.items.push(item);
      this.index.push(vec);
      this.id2idx.set(th.id, this.items.length - 1);
    }
  }

  async buildFromSeed(theories) {
    // Only embed if not already loaded
    if (!this.loaded) {
      for (const th of theories) {
        await this.upsertTheory(th);
      }
      this.save();
      this.loaded = true;
    }
  }

  async search(query, k = 5) {
    if (!this.loaded || this.index.length === 0) return [];
    const qvec = await this.embedText(query);
    const scored = this.items.map((it, i) => ({
      id: it.id,
      score: VectorStore.cosine(qvec, this.index[i]),
      meta: it.meta
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, Math.min(k, scored.length));
  }
}
