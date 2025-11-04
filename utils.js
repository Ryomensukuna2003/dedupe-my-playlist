import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import cosine from "ml-distance/lib-esm/similarities/cosine.js";

export const formatAllData = async (playlist) => {
  const tracks = playlist.tracks.map(t =>
    t.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim()
  );

  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L12-v2", // local model
  });

  const vectors = await embeddings.embedDocuments(tracks);

  const threshold = 0.8; // slightly stricter for better grouping
  const clusters = [];
  const used = new Set();

  for (let i = 0; i < tracks.length; i++) {
    if (used.has(i)) continue;
    const group = [playlist.tracks[i]];
    used.add(i);

    for (let j = i + 1; j < tracks.length; j++) {
      const sim = cosine(vectors[i], vectors[j]);
      if (sim > threshold) {
        group.push(playlist.tracks[j]);
        used.add(j);
      }
    }

    clusters.push(group);
  }

  return clusters.filter(g => g.length > 1);
};
