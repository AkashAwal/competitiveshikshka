import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Delete all existing ncertSolution documents, then reimport via separate scripts
const existing = await client.fetch('*[_type == "ncertSolution"]{ _id, class, subject, chapter }');
console.log(`Found ${existing.length} existing documents:`);
existing.forEach(d => console.log(`  - Class ${d.class} ${d.subject} Ch.${d.chapter} (${d._id})`));

if (existing.length > 0) {
  await Promise.all(existing.map(d => client.delete(d._id)));
  console.log(`Deleted ${existing.length} documents.`);
}
