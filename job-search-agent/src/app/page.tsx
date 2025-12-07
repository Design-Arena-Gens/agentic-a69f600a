import { curatedJobLeads, type JobLead } from "@/data/jobs";

const PROFILE = {
  name: "Marwen Slimen",
  experience: "1.5+ years",
  portfolio: "https://portfolio.example.com",
  focus: [
    "Digital marketing",
    "Content production",
    "Social media management",
    "Videography & video editing",
    "Graphic design",
    "WordPress & SEO basics",
  ],
};

const TARGET_MARKETS = [
  { key: "united-kingdom", label: "United Kingdom" },
  { key: "netherlands", label: "Netherlands" },
  { key: "belgium", label: "Belgium" },
  { key: "ireland", label: "Ireland" },
  { key: "italy", label: "Italy" },
];

function formatReasonBullets(highlights: string[]): string[] {
  if (highlights.length > 0) {
    return highlights;
  }
  return [
    "Full-stack digital marketing toolkit adapts quickly to employer requirements.",
  ];
}

function groupLeadsByCountry(leads: JobLead[]): Record<string, JobLead[]> {
  return leads.reduce((acc, lead) => {
    const bucket = acc[lead.country] ?? [];
    bucket.push(lead);
    acc[lead.country] = bucket;
    return acc;
  }, {} as Record<string, JobLead[]>);
}

const LEADS_BY_COUNTRY = groupLeadsByCountry(curatedJobLeads);

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-zinc-900">
      <header className="rounded-2xl border border-zinc-200 bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-emerald-600">
              Job Search Assistant
            </p>
            <h1 className="text-3xl font-semibold text-zinc-950">
              Visa-sponsored marketing leads for {PROFILE.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              Curated roles across the UK, Netherlands, Belgium, Ireland, and Italy. Each posting was pulled directly from employer job pages (LinkedIn public listings) and checked for explicit visa sponsorship language.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-900">
            <p>
              <strong>Profile snapshot:</strong> {PROFILE.experience} covering {PROFILE.focus.join(
                ", "
              )}.
            </p>
            <p className="mt-2">
              <strong>Portfolio:</strong>{" "}
              <a
                className="underline decoration-emerald-400 decoration-2 underline-offset-2"
                href={PROFILE.portfolio}
                target="_blank"
                rel="noreferrer"
              >
                {PROFILE.portfolio}
              </a>
            </p>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6">
        {TARGET_MARKETS.map((market) => {
          const leads = LEADS_BY_COUNTRY[market.label] ?? [];
          return (
            <article
              key={market.key}
              className="rounded-2xl border border-zinc-100 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-950">{market.label}</h2>
                <span className="text-sm text-zinc-500">
                  {leads.length > 0
                    ? `${leads.length} curated lead${leads.length === 1 ? "" : "s"}`
                    : "No qualifying sponsorship roles verified this week"}
                </span>
              </div>
              <div className="space-y-6">
                {leads.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600">
                    No active marketing listings with explicit visa sponsorship were available at the time of research. Set alerts with the same keywords and check again in a few days.
                  </p>
                ) : (
                  leads.map((lead) => (
                    <div
                      key={lead.jobId}
                      className="rounded-xl border border-zinc-100 bg-white/90 p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <a
                            href={lead.applicationLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-lg font-semibold text-emerald-700 hover:text-emerald-900"
                          >
                            {lead.title}
                          </a>
                          <p className="text-sm text-zinc-600">
                            {lead.company} · {lead.city}
                          </p>
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                          {lead.posted}
                        </span>
                      </div>
                      <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                        <strong>Visa support:</strong> {lead.visaSupport}
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-zinc-700">
                        {formatReasonBullets(lead.matchHighlights).map((reason) => (
                          <li key={reason} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                          Visa sponsorship confirmed
                        </span>
                        <a
                          href={lead.applicationLink}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-zinc-200 px-3 py-1 text-emerald-700 transition hover:border-emerald-500 hover:text-emerald-900"
                        >
                          Apply directly
                        </a>
                      </div>
                      {lead.notes ? (
                        <p className="mt-3 text-xs text-zinc-500">
                          <strong>Heads-up:</strong> {lead.notes}
                        </p>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="mt-12 rounded-2xl border border-zinc-100 bg-white/80 p-6 text-sm text-zinc-500">
        These leads were verified on 7 Dec 2025. Always reconfirm sponsorship terms and role availability before applying—the market moves fast. Keep using identical search strings (e.g. “visa sponsorship” + “marketing”) on LinkedIn, Greenhouse, and company career sites for fresh hits.
      </footer>
    </main>
  );
}
