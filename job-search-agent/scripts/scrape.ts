import { fetchVisaFriendlyJobs } from "../src/lib/linkedin";

const MARKETS = [
  "United Kingdom",
  "Netherlands",
  "Belgium",
  "Ireland",
  "Italy",
];

const KEYWORDS =
  '("digital marketing" OR marketing OR "content creator" OR "social media" OR "video editor" OR videographer OR wordpress OR "content specialist")';

async function run() {
  for (const market of MARKETS) {
    const jobs = await fetchVisaFriendlyJobs({
      location: market,
      keywords: KEYWORDS,
      limit: 10,
      maxPages: 6,
      sleepBetween: 900,
    });
    console.log("\n===", market, "===");
    if (!jobs.length) {
      console.log("No jobs found.");
      continue;
    }
    for (const job of jobs) {
      console.log(
        `- ${job.title} @ ${job.company} (${job.location}) => ${job.visaSnippet}`,
      );
      console.log(`  Link: ${job.link}`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
