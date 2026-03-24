import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

export default pinecone;

export async function upsertVector({
  indexName,
  vectors,
  namespace = "",
}: {
  indexName: string;
  vectors: any[];
  namespace?: string;
}) {
  const index = pinecone.index(indexName);
  await index.upsert(vectors);
}

export async function queryVector({
  indexName,
  vector,
  topK = 5,
}: {
  indexName: string;
  vector: number[];
  topK?: number;
}) {
  const index = pinecone.index(indexName);
  const results = await index.query({
    vector,
    topK,
    includeMetadata: true,
  });
  return results;
}
