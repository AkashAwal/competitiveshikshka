import { createClient } from "@sanity/client";
const client = createClient({ projectId: "cekjuoyu", dataset: "production", apiVersion: "2024-01-01", token: process.env.SANITY_API_TOKEN, useCdn: false });
const r = await client.fetch(`*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 3][0]{ "qCount": count(questions), "exCount": count(examples), questions[] { questionNumber, "stepCount": count(steps), "explCount": count(explanation) } }`);
const noSteps = r.questions?.filter(q => !q.stepCount);
console.log("Total questions:", r.qCount, "| Examples:", r.exCount);
console.log("Questions without steps:", noSteps?.length);
if (noSteps?.length) console.log("Missing steps:", noSteps.map(q => q.questionNumber));
console.log(JSON.stringify(r, null, 2));
