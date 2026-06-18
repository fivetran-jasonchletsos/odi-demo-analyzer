export const CATEGORIES = [
  { id: 'business_opening', name: 'Business Problem Opening', max: 15 },
  { id: 'odi_completeness', name: 'ODI Story Completeness', max: 20 },
  { id: 'technical_accuracy', name: 'Technical Accuracy', max: 15 },
  { id: 'demo_execution', name: 'Demo Execution', max: 15 },
  { id: 'audience_targeting', name: 'Audience Targeting', max: 10 },
  { id: 'objection_handling', name: 'Objection Handling', max: 10 },
  { id: 'narrative_arc', name: 'Narrative Arc', max: 10 },
  { id: 'closing_cta', name: 'Closing & CTA', max: 5 },
]

export const VIDEOS = [
  {
    id: 'justin',
    presenter: 'Justin Beausoleil',
    title: 'Oracle Proxy Agent',
    duration: '18:39',
    url: 'https://www.loom.com/share/76602e280b82402b947f791c5c368d28',
    total: 58,
    verdict: 'Technically excellent Oracle connectivity walkthrough that would win the trust of any DBA, but it is not an ODI demo — it covers one connector configuration with zero mention of dbt, open formats, or destination value.',
    odi_coverage: 'single-layer' as const,
    audience: 'DBAs and security engineers evaluating Oracle CDC in a private-network deployment',
    categories: [
      { score: 12, rationale: 'Opens with the customer\'s actual pain ("your security team hasn\'t made it quite clear that opening inbound ports just isn\'t happening") — no product UI in the first 60 seconds. Loses 3 points because the pain is FAQ framing rather than a buyer-identified business consequence, and there is no quantified risk or cost.' },
      { score: 4, rationale: 'Single-layer connector-configuration walkthrough. Fivetran ingest is covered in detail, but dbt is never mentioned, open formats are never mentioned, and the destination analytics layer is entirely absent. The demo ends when Fivetran confirms "all green" on the connector test — no data lands in a warehouse.' },
      { score: 14, rationale: 'Highly accurate throughout. BLR vs LogMiner correctly explained. mTLS correctly distinguished from standard TLS. Port 1521 vs 2484, SID vs service name for CDB/PDB, and supplemental logging as a prerequisite are all accurate.' },
      { score: 12, rationale: 'The narrative flows without visible dead ends or backtracking. Five connection options are presented in logical order before any selection is made. Three points withheld because the demo is scoped exclusively to connector setup — no data is visible in the destination.' },
      { score: 7, rationale: 'Depth is well-matched to the DBA and security engineer persona. Score is capped at 7 because the ODI rubric is evaluated against deal-winning personas (CDO, CIO, VP Engineering), and this demo would not land with any of them.' },
      { score: 8, rationale: 'Strongest category relative to its scope. Justin works through all five connection methods with honest trade-offs, addresses SSH bastion overhead, VPN lead time, and the public-internet caveat for Private Link buyers. Differentiation is factual, not feature-bashing.' },
      { score: 8, rationale: 'Clean three-act structure within its narrow scope: problem → five options evaluated → proof. The through-line holds. Two points deducted because the arc never closes at the business outcome level — data does not surface anywhere meaningful.' },
      { score: 2, rationale: 'Ends with "Self-service and very quick to stand up" — a soft landing that recaps setup efficiency but offers no next step. No POC offer, no documentation link, no follow-up framing.' },
    ],
    strengths: [
      'Problem-first opening that resonates immediately with any DBA or security engineer who has fought a firewall review.',
      'Five-way comparison of connection methods with honest trade-offs before recommending one — this is trusted-advisor structure.',
      'mTLS explanation is accurate and persuasive. Neutralizes the security team\'s interception concern.',
      'Revocation story: "To revoke Fivetran\'s access: stop the agent process. No firewall changes." — closes security objections in one sentence.',
      'Technically precise BLR vs LogMiner framing. 14/15 on accuracy is the highest in the batch.',
    ],
    gaps: [
      'Zero ODI story. dbt, Iceberg/Delta, and the destination analytics layer are never mentioned. This demo could be from any CDC vendor.',
      'Demo ends at a green connector validation test. No data lands anywhere. Buyer is left to imagine what happens after "all green."',
      'No closing CTA. 18 minutes of strong content, then "self-service and very quick to stand up." Offer a POC or send documentation.',
      'Audience ceiling is DBA-level. A 60-second business framing layer at the top would make this usable in a CDO conversation.',
      'Hybrid deployment is never named despite covering the exact use case it addresses.',
    ],
  },
  {
    id: 'niraj',
    presenter: 'Niraj Vora',
    title: 'Oracle BLR Demo (Take 3)',
    duration: '15:11',
    url: 'https://www.loom.com/share/f848fb812bfa49999fd26b10a182d922',
    total: 56,
    verdict: 'Technically accurate and well-executed CDC connector demo that scores 56/100 primarily because it never becomes an ODI demo — dbt, open formats, and the full pipeline story are absent, and the opening leads with product UI instead of buyer pain.',
    odi_coverage: 'single-layer' as const,
    audience: 'DBA or data engineer — CDC mechanics depth is calibrated for a technical practitioner with no business-value framing for an executive buyer',
    categories: [
      { score: 6, rationale: 'Opening line is "Today we\'ll talk about change data capture from a relational database" with the Fivetran dashboard already on screen. Pain context does arrive ("homegrown pipeline requires constant maintenance") but is sandwiched between UI navigation, not used to anchor the opening.' },
      { score: 5, rationale: 'Single-layer connector demo. Fivetran ingest via BLR is covered in depth. Databricks is present only as a landing target — nothing analytical is shown there. dbt, bronze/silver/gold, open formats, and the AI-readiness story are entirely absent.' },
      { score: 12, rationale: 'Core CDC mechanics are accurate: WAL/redo log explanation, ACID description, BLR using pfile object types, LogMiner being sunset, HVA deprecation, Teleport Sync trade-offs. Minor: demo opens saying "we will use Oracle" then navigates to PostgreSQL first — not a factual error but slightly misleading.' },
      { score: 12, rationale: 'Live workflow runs cleanly end-to-end: connection tests pass, initial sync completes, CDC change (cell 1245→1250 on ID 28) is shown on source and confirmed on destination. No dead ends, no failed syncs. The PostgreSQL detour is awkward narratively but recovers.' },
      { score: 6, rationale: 'Calibrated at DBA/data-engineer depth: ACID properties, xmin/ctid, PGOutputPlugin, pfile object types. For a DBA audience that is appropriate. No business-value framing that would land with a CDO or VP Engineering.' },
      { score: 6, rationale: 'Three objections addressed proactively: source-system impact, maintenance burden, and primary-key absence. Schema-drift auto-handling differentiates from homegrown pipelines. No response to "we already use Databricks Autoloader/Lakeflow Connect — why do we need Fivetran?"' },
      { score: 6, rationale: 'Recognizable beginning/middle/end: pain framing → connector setup → live CDC proof. Arc is disrupted by the PostgreSQL detour mid-demo with no stated rationale. Pain statements are scattered rather than anchoring the opening.' },
      { score: 3, rationale: 'Recap is substantive and covers the ingest layer well. However there is no explicit next step — no POC offer, no documentation link, no "reach out to your SE." Demo ends with "Thank you for watching this demo."' },
    ],
    strengths: [
      'Technical depth on Oracle CDC mechanics is strong and accurate: BLR vs LogMiner vs HVA vs Teleport Sync gives a sophisticated buyer a clear mental model.',
      'Live CDC proof is the best moment in all three demos: cell value 1245→1250 shown on source, synced, confirmed on destination in real time.',
      'Source-impact objection handled twice and proactively — BLR\'s log-read-only approach explicitly addresses "additional utilization frowned upon."',
      'Schema drift handling called out clearly as a differentiator vs homegrown pipelines.',
      'Demo execution is clean end-to-end with no failed syncs and competent narration during wait times.',
    ],
    gaps: [
      'No ODI story beyond the ingest layer. dbt, open formats, bronze/silver/gold, and AI-readiness are entirely absent.',
      'Opening does not lead with buyer pain — Fivetran dashboard and destination navigation appear before any problem statement.',
      'PostgreSQL detour has no stated purpose in an Oracle demo and creates narrative confusion.',
      'No competitive response to the most likely objection in a Databricks context: "we already use Autoloader or Lakeflow Connect."',
      'No call to action. Demo ends without a next step or POC offer.',
    ],
  },
  {
    id: 'chris',
    presenter: 'Chris Rudolph',
    title: 'Hybrid Deployment (Take 2)',
    duration: '24:33',
    url: 'https://www.loom.com/share/2d9582acc1754bb0a7b21522075fa778',
    total: 45,
    verdict: 'Solid security and data-residency framing collapses under broken demo execution, a wrong certification claim (ISO 9000, not ISO 27001), no ODI story, and a session that ends on an unresolved Docker failure.',
    odi_coverage: 'single-layer' as const,
    audience: 'Security-conscious infrastructure architect — opening targets CISO/CDO but demo quickly shifts to hands-on Docker/Kubernetes setup',
    categories: [
      { score: 10, rationale: 'Opens with genuine, relevant problem — data breach costs, regulation, company policy preventing data leaving the network. The DB2 on z/OS example is concrete. However, no regulation is named, no customer story, no quantified pain. Stays at a general level.' },
      { score: 5, rationale: 'Single-layer ingest demo. No mention of dbt, no open formats, no medallion architecture, no analytics layer. The destination (BigQuery) is only a landing target, not framed as the pluggable-engine story. The full ODI arc is absent.' },
      { score: 10, rationale: 'Egress-only architecture and Docker/Podman/Kubernetes support are accurate. However, "ISO 9000" is cited as a Fivetran security certification. ISO 9000 is a quality management standard; Fivetran holds ISO 27001. This is a material credibility error in front of a security-focused buyer.' },
      { score: 3, rationale: 'Multiple stumbles, UI confusion, agent registration issues, wrong directory, agent re-created mid-session, Docker image pull failures. Session titled "Take 2." Ends unresolved: "I\'ve been error-pulling the image... until we have that pull successful, we\'re not going to see any further information." No successful sync shown.' },
      { score: 6, rationale: 'Opening tries to speak to a CISO or CDO (reputation damage, regulatory risk) while the demo dives into rootless Docker prerequisites, vCPU/RAM t-shirt sizing, and Kubernetes managed clusters. The mix is inconsistent — the executive framing is abandoned entirely once the CLI appears.' },
      { score: 6, rationale: 'Primary data-residency objection addressed proactively and with architectural specificity. "Patchwork of tools" objection named explicitly. Missing: no differentiation from HVR, Qlik, AWS DMS, or native cloud connectors.' },
      { score: 4, rationale: 'Talk track has a recognizable structure: problem → architecture → demo. The first half holds together. But the demo section collapses into repeated backtracking and an unresolved Docker pull failure. The story never delivers its payoff.' },
      { score: 1, rationale: 'Demo ends on a broken state. Final lines: "I\'ve been error-pulling the image. Fivetran is very resilient, so I\'m sure this is going to recover itself." No summary of what was demonstrated, no POC offer, no documentation link, no follow-up prompt.' },
    ],
    strengths: [
      'Security/data-residency problem framing is topically accurate and leads with customer pain before showing product.',
      'Egress-only architecture explanation is technically correct: "only egress access from the agent to the cloud for orchestration... all the data processing itself stays within this network."',
      'Patchwork-of-tools objection named explicitly and proactively — frames Hybrid as a consolidation play, not just a security feature.',
      'DB2 on z/OS is a specific, credible unlock example for large enterprise buyers with legacy infrastructure.',
      'Pricing parity and plan-level requirements stated accurately and proactively.',
    ],
    gaps: [
      'Demo execution is broken end-to-end. Docker image pull fails, agent re-created mid-flow, no successful sync shown. Cannot be used externally.',
      'ISO 9000 cited as a Fivetran security certification. It is a quality management standard. Fivetran holds ISO 27001. A CISO will catch this immediately.',
      'No closing or call to action — demo ends mid-failure with no recap and no next step.',
      'No ODI story. No dbt, no open formats, no destination analytics layer.',
      'No competitive differentiation against HVR, Qlik Replicate, AWS DMS, or native cloud connectors.',
    ],
  },
]

export const PATTERNS = [
  'All three demos are single-layer ingest demos. Not one mentions dbt, open formats (Iceberg or Delta Lake), a medallion architecture, or the destination analytics layer. The ODI story is structurally absent across the entire sample.',
  'None of the three demos closes with a call to action. Justin: "self-service and very quick to stand up." Niraj: "Thank you for watching." Chris ends mid-failure. No demo offers a POC, a documentation link, or a next meeting.',
  'All three presenters default to DBA or infrastructure engineer depth, even when the opening attempts executive framing. The persona pivot — starting at CISO or CDO level then immediately descending into rootless Docker or xmin/ctid internals — appears in all three.',
  'Technical accuracy is the strongest suit across the board. All three presenters know the product well. The gap is in storytelling, not knowledge.',
  'Hybrid deployment is absent or mentioned in passing in all three demos. Justin\'s entire session is about private-network connectivity — the natural home for Hybrid — yet Hybrid is never named.',
  'No demo quantifies business pain. Data breach costs, pipeline maintenance hours, compliance fines — no number appears in any opening or objection-handling section.',
  'The "why Fivetran instead of X" question goes unanswered in all three. No demo names a realistic competitor and explains why Fivetran wins that comparison.',
]

export const COACHING = [
  { title: 'Open with a named buyer consequence', detail: 'The first 60 seconds must establish a specific, painful business situation. A regulation, a cost, a missed deadline — quantified. No product UI until the viewer has a reason to care. All three presenters skip this or execute it partially.' },
  { title: 'Complete the ODI arc in every demo', detail: 'Show Fivetran moving data, dbt running a model that surfaces a business metric, and that metric appearing in a dashboard or AI query. The connector configuration is setup, not the story. None of the three demos reaches this point.' },
  { title: 'End with a specific, concrete next step', detail: 'Say it out loud. "I\'ll send the documentation after this call." "Our standard POC for Hybrid runs two weeks — can we put that on the calendar?" A demo without a CTA is a presentation, not a sales motion.' },
  { title: 'Rehearse to a clean resolution before recording', detail: 'If the demo requires Docker, pre-pull the image. If it requires an agent, pre-register it. A broken demo with accurate commentary about product reliability produces cognitive dissonance that damages the deal.' },
  { title: 'Name the competitive alternative and explain specifically why Fivetran wins', detail: 'In a Databricks context, address Lakeflow Connect. In a regulated enterprise, address HVR. Generic "no code, no API" does not answer "but we already have X."' },
]

export const PERFECT_DEMO = `A perfect Fivetran ODI demo opens with a named persona and a specific, quantified business consequence — not a product category. The first 60 seconds establish the problem entirely in business language: a regulation, a cost, a missed deadline. No product UI appears until the viewer has a reason to care.

The demo then narrates a complete three-layer pipeline in sequence. First, Fivetran moves data: a private source connects via Proxy Agent or Hybrid deployment, the egress-only architecture is explained in two sentences, and the viewer watches a CDC change propagate end-to-end — the before and after at the row level. Second, dbt transforms that raw data: a model runs, a business metric emerges from the raw schema. Third, a consumption layer — a dashboard or an AI agent — answers a business question using the data that just moved.

Objection handling is woven into the narrative rather than appended. The five-way connection method comparison (with honest trade-offs for each, then a recommendation) is the right structure. The revocation story — "stop the agent, no firewall changes" — is a one-liner delivered at the moment when the security buyer is most likely thinking it. Competitive differentiation names the specific alternative the buyer is evaluating.

The demo closes by summarizing what was proved, not just what was shown, and states a specific next step out loud. Total runtime: under 20 minutes. The demo works on the first attempt.`
