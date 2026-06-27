import { createClient } from "@sanity/client";
const client = createClient({ projectId: "cekjuoyu", dataset: "production", apiVersion: "2024-01-01", token: process.env.SANITY_API_TOKEN, useCdn: false });
const doc = await client.fetch('*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 1][0]{ "q2": questions[1] }');
console.log(doc.q2?.explanation ? "HAS EXPLANATION ✓" : "NO EXPLANATION ✗");
console.log(JSON.stringify(doc.q2?.explanation, null, 2));
