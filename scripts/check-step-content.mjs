import { createClient } from "@sanity/client";
const client = createClient({ projectId: "cekjuoyu", dataset: "production", apiVersion: "2024-01-01", token: process.env.SANITY_API_TOKEN, useCdn: false });

const r = await client.fetch(
  `*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 3][0].questions[0]`
);
console.log(JSON.stringify(r, null, 2));
