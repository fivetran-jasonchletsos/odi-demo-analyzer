// ── Types ─────────────────────────────────────────────────────────────────
export interface CategoryScore {
  score: number
  rationale: string
}

export interface PanelReview {
  panelist: string
  role: string
  says: string
  unique_insight: string
  would_share: boolean
}

export interface PanelDiscussion {
  consensus: string[]
  key_disagreement: string
  verdict: string
  coaching: string[]
  score_discussion: string
  panelists: PanelReview[]
}

export interface Video {
  id: string
  presenter: string
  title: string
  topic: string
  duration: string
  url: string
  total: number
  color: string
  verdict: string
  score_to_improve: string
  audience: string
  categories: CategoryScore[]
  strengths: string[]
  gaps: string[]
  panel: PanelDiscussion
}

// ── Rubric ────────────────────────────────────────────────────────────────
export const RUBRIC_CATEGORIES = [
  {
    id: 'business_opening',
    name: 'Business Problem Opening',
    short: 'Opening',   // abbreviated label for chart x-axis
    max: 15,
    description: 'Does the demo open with the specific customer pain this topic solves, before any product UI?',
    great: 'Opens with the exact customer pain in business language. No product UI for the first 60 seconds. A buyer says "that\'s my problem."',
    good: 'Problem is stated before product, but generic or without quantification.',
    weak: 'Opens immediately with product UI, product category label, or feature walkthrough.',
  },
  {
    id: 'topic_completeness',
    name: 'Topic Completeness',
    short: 'Completeness',
    max: 20,
    description: 'Does the demo cover its stated topic fully, end-to-end? Nothing important left out.',
    great: 'Covers the full scope of the topic. A viewer could replicate it. Nothing important missing.',
    good: 'Covers most of the topic. One or two meaningful gaps.',
    weak: 'Covers only part of the topic. Material aspects missing.',
  },
  {
    id: 'technical_accuracy',
    name: 'Technical Accuracy',
    short: 'Accuracy',
    max: 15,
    description: 'Are all technical claims, product names, and feature descriptions accurate?',
    great: 'Zero factual errors. Correct terminology and nuanced claims appropriately qualified.',
    good: 'Minor inaccuracies that do not mislead.',
    weak: 'Material errors in features, product names, or technical claims that would confuse or mislead.',
  },
  {
    id: 'demo_execution',
    name: 'Demo Execution Quality',
    short: 'Execution',
    max: 15,
    description: 'Does the demo run smoothly? Dead ends, errors, and backtracking signal unpreparedness.',
    great: 'Smooth end-to-end. Errors handled gracefully. No dead ends. The demo proves what it set out to prove.',
    good: 'Minor stumbles but recovers cleanly. Core demo points land.',
    weak: 'Multiple errors, dead ends, failed operations, or abandoned flows. Session ends unresolved.',
  },
  {
    id: 'audience_targeting',
    name: 'Audience Targeting',
    short: 'Audience',
    max: 10,
    description: 'Is the language and depth calibrated to the right buyer for this topic?',
    great: 'Vocabulary and depth perfectly matched to the audience. Would not confuse a CDO or bore a DBA.',
    good: 'Mostly calibrated but drifts too technical or too high-level at points.',
    weak: 'Clearly wrong depth for the stated or implied audience.',
  },
  {
    id: 'objection_handling',
    name: 'Objection Handling',
    short: 'Objections',
    max: 10,
    description: 'Does the demo proactively address the objections a buyer would have about this specific topic?',
    great: 'Top 2–3 objections for this topic addressed before the buyer raises them. Factual, not defensive.',
    good: 'One or two objections addressed.',
    weak: 'No objection handling relevant to the topic.',
  },
  {
    id: 'narrative_arc',
    name: 'Narrative Arc',
    short: 'Narrative',
    max: 10,
    description: 'Is there a clear beginning (problem) / middle (solution in action) / end (proof)?',
    great: 'Clean three-act structure. Each transition is deliberate. Buyer always knows where they are.',
    good: 'Generally organized but transitions are abrupt or sections feel disconnected.',
    weak: 'Wanders without a through-line. Buyer loses context.',
  },
  {
    id: 'closing_cta',
    name: 'Closing & Call to Action',
    short: 'CTA',
    max: 5,
    description: 'Does the demo end with a clear summary and a concrete next step?',
    great: 'Crisp recap of what was proved. Explicit next step (doc link, POC offer, follow-up).',
    good: 'Summary present but next step is vague.',
    weak: 'Trails off, no recap, no next step.',
  },
]

export const VIDEOS: Video[] = [
  {
    id: 'justin',
    presenter: 'Justin Beausoleil',
    title: 'Oracle Proxy Agent',
    topic: 'Connecting Fivetran to a private Oracle database using the Proxy Agent (outbound-only, mTLS)',
    duration: '18:39',
    url: 'https://www.loom.com/share/76602e280b82402b947f791c5c368d28',
    total: 85,
    color: '#1d6fb8',
    audience: 'DBAs and security engineers evaluating Oracle CDC connectivity in a private-network deployment',
    verdict: 'A technically precise, objection-aware walkthrough that is among the strongest demo content for this topic — held back only by the absent agent install steps and a closing that lands the proof but provides no forward motion for the viewer.',
    score_to_improve: 'Show the agent installation end-to-end (download, install command, certificate provisioning) — this is the step a DBA would block on, and demonstrating it live closes the biggest gap in topic completeness.',
    categories: [
      { score: 14, rationale: 'Opens immediately with the exact pain: private network, no public IP, strict firewall, security team blocking inbound ports — and no product UI until the situation is fully established. A DBA or security engineer recognizes their situation before the product is mentioned. The only missing element is a quantified cost or time reference to anchor the alternatives.' },
      { score: 17, rationale: 'Covers Oracle connector configuration (host, port, credentials, SID vs service name, least-privilege grants), all five connectivity options with honest trade-offs, Proxy Agent mechanics in depth (outbound-only, mTLS, certificate bound to agent ID, revocation by stopping the process), agent hardware requirements, TDE toggle, and a validated save-and-test with all checks listed. The material gap: the agent appears pre-configured — no download, install, or certificate provisioning is shown, leaving a DBA without a path from zero to running agent.' },
      { score: 14, rationale: 'BLR vs LogMiner framing is accurate. Ports 1521 and 2484 are correct for their respective scenarios. The mTLS explanation is technically sound: CN tied to specific agent ID, Fivetran-issued certificate, mutual verification before data flows. Supplemental logging surfaces correctly in the test-validation list. Minor deduction for stating the SID is "typically Oracle" for a standard instance — true as a common default but presented as a general rule without qualification.' },
      { score: 13, rationale: 'The walkthrough flows end-to-end with no dead ends: form fill, five-option comparison, proxy agent selection, TDE toggle, save-and-test, all-green result in under two minutes, closing summary. No stumbles appear in the transcript. Pre-configuring the agent is a reasonable demo choice but the install step is absent from the proof, which is a real gap for the target audience.' },
      { score: 9, rationale: 'Language throughout is calibrated to a DBA or security engineer: inbound vs outbound firewall directionality, bastion patching burden, key rotation, CDB/PDB and SID distinctions, supplemental logging requirements, least-privilege grants, and mTLS certificate semantics. Well matched to the decision-maker this topic requires.' },
      { score: 10, rationale: 'Every major security-team objection is addressed proactively: inbound port exposure (outbound-only, zero inbound rules), channel security (mTLS, cert bound to agent ID, cannot be impersonated without Fivetran-issued cert), public internet traversal (honest caveat with clear guidance on when Private Link is the right call instead), SSH bastion overhead (direct comparison on key rotation, patching, and inbound connection direction), and VPN lead time. The transparency about the public internet trade-off is exactly what a security team needs to hear.' },
      { score: 9, rationale: 'Clear three-part structure: problem (private DB, security team blocking inbound) → solution in action (all five options evaluated, proxy agent selected and configured, test executed) → proof (all green, zero inbound firewall rules, no bastion, no support ticket). The five-option comparison is dense but earns its place as the "why this solution" argument rather than padding.' },
      { score: 3, rationale: 'The closing is a crisp enumeration of what was not needed and what was achieved — a strong proof summary. No explicit next step follows: no documentation link, no trial prompt, no "reach out to your SE." The demo lands the proof but does not tell the viewer what to do next.' },
    ],
    strengths: [
      'Objection handling is the best element: every security-team concern about this connectivity approach is addressed proactively and honestly, including the candid acknowledgment that data traverses the public internet — exactly the transparency that builds trust with a DBA or CISO.',
      'The five-option comparison makes the Proxy Agent recommendation feel earned rather than assumed. The direct SSH-vs-proxy-agent contrast (inbound client vs outbound-only, bastion vs no bastion, key rotation vs cert-bound mTLS) is the argument a security team needs to make an informed decision.',
      'mTLS mechanics are explained with real technical precision: CN tied to the specific agent ID, Fivetran-issued certificate, mutual verification before any data flows.',
    ],
    gaps: [
      'Agent installation and certificate provisioning are entirely absent. The agent appears pre-configured. A DBA who wants to replicate this setup has no guidance on download, install, or how the initial certificate is issued.',
      'No call to action. The demo ends with a strong proof summary but gives the viewer no next step — no documentation link, no trial prompt, no follow-up offer.',
      'No quantified business impact. The opening names the pain but never attaches a cost to the alternatives (e.g., weeks of VPN setup, ongoing bastion patching burden).',
    ],
    panel: {
      consensus: [
        'The five-option connectivity framework is genuinely strong and customer-ready positioning — not just a feature checklist.',
        'The revocation story ("stop the agent process, no firewall changes") is one of the most effective sixty seconds in the demo and will land with compliance audiences.',
        'The demo ends too early: no data movement, no recap, no next step, no POC offer.',
        'The VPN section is undercooked and will generate follow-up objections from regulated-vertical customers.',
        'The high-availability gap — single agent, no failover story — is a real risk in enterprise Oracle deals.',
      ],
      key_disagreement: 'Andy argued the score should drop further, citing that a demo with no data movement and no ODI framing cannot score in the high 80s. Doug pushed back, saying the video executes its specific scope well. Kelly sided partially with Doug on scope but agreed with Andy that the missing data-residency framing — redo logs never traverse the public internet — is a thirty-second gap in the security story with a direct competitive cost in regulated deals.',
      verdict: 'The connectivity and security story is technically accurate, well-sequenced, and will hold up in front of a skeptical DBA or network engineer. The mTLS detail and revocation narrative are genuinely strong. But the demo leaves the most important sentences unsaid: redo log contents never traverse the public internet (which closes the legal objection in regulated verticals), and this same architecture is the unlock for getting fresh operational data into agentic AI pipelines without a six-week security review. The demo also ends the moment the test goes green — no data movement, no downstream framing, no next step.',
      coaching: [
        'Add thirty seconds after the mTLS explanation explicitly stating that redo log contents never traverse the public internet under the Proxy Agent model — this closes the legal objection in financial services, healthcare, and other regulated verticals.',
        'Extend the demo past the green validation screen: show at least one table syncing, name where the data lands (Iceberg, a warehouse), and close with an explicit next step or POC offer.',
        'Either record a thirty-second addendum on the specific Oracle grants required for least-privilege access, or publish a companion reference card — the current single-sentence treatment fails when a skeptical DBA asks for the exact privilege list.',
      ],
      score_discussion: 'Andy opened at 83, arguing that a demo with no data movement and no ODI framing cannot score in the high 80s regardless of technical quality. Doug countered that 89 is defensible if you accept that the demo is scoped to a specific objection. Kelly split the difference: the missing data-residency sentence is not a scope issue — it is a thirty-second gap in the security story Justin is already telling, with a direct cost in regulated deals. The group landed at 85.',
      panelists: [
        {
          panelist: 'Kelly Parker',
          role: 'Sales Engineering Director, North America',
          says: 'This is team-ready content on the connectivity story, but it stops cold at the moment a junior SE needs the most guidance. Justin is so fluent he compresses the Oracle grants into one sentence, and a new SE hears that as a complete answer. In the field, a skeptical DBA is going to ask "what grants exactly," and that SE is going to freeze. The video needs a companion one-pager on the specific Oracle privileges or it\'s only useful for experienced SEs who already know the answer.',
          unique_insight: 'From a team-enablement standpoint, this video has a hidden coaching problem: Justin is so fluent that a junior SE watching it may not realize how much context he is compressing. That assumption breaks down in the field exactly when it matters most — in a live customer environment where the DBA is skeptical and asking what exactly Fivetran is requesting access to.',
          would_share: true,
        },
        {
          panelist: 'Andy Ellman',
          role: 'Senior Manager Sales Engineering East (HVR alumni)',
          says: 'I\'m going to be direct: 89 was too high for a demo that never moves a row of data. The Proxy Agent mTLS story is technically correct — Justin knows what he\'s talking about — but he\'s treating the Proxy Agent as a networking workaround when it\'s actually the deployment model that lets Fivetran compete with on-premise replication tools on the data-residency objection. He had thirty seconds to say "redo log contents never traverse the public internet" and close every legal objection for an enterprise Oracle customer. He left that sentence out.',
          unique_insight: 'The Proxy Agent mTLS story is sound, but the deeper competitive differentiation Justin missed is this: HVR\'s architecture — which became the binary log reader — was specifically designed so the log reader component runs inside the customer network while the control plane stays outside. Justin treats the Proxy Agent as a networking workaround. It is actually the deployment model that lets Fivetran compete with Attunity and IBM CDC on the data-residency objection. He left the most important sentence in the demo unsaid.',
          would_share: false,
        },
        {
          panelist: 'Doug Jauregui',
          role: 'Sr. Enterprise SE Manager, US-LATAM',
          says: 'For the audience this video is built for — a DBA who has been told "Fivetran is a security risk, prove otherwise" — this is exactly what they need. What I\'d add is that the proxy agent pattern Justin is showing is also the architecture that makes Fivetran viable as a real-time source for agentic AI workflows inside private cloud environments. Justin is one paragraph away from the biggest enterprise AI pitch in the field right now, and he doesn\'t take it.',
          unique_insight: 'The proxy agent isn\'t just a connectivity feature — it\'s the unlock for getting fresh Oracle ERP data into agent memory and RAG pipelines without a six-week security review. Enterprises building AI agents right now are doing it on Oracle ERP data sitting behind exactly these firewalls. That framing is missing and it\'s worth two minutes at the end of this demo.',
          would_share: true,
        },
      ],
    },
  },
  {
    id: 'niraj',
    presenter: 'Niraj Vora',
    title: 'Oracle BLR Demo (Take 3)',
    topic: 'Change Data Capture from Oracle (Binary Log Reader) to Databricks',
    duration: '15:11',
    url: 'https://www.loom.com/share/f848fb812bfa49999fd26b10a182d922',
    total: 62,
    color: '#FF3621',
    audience: 'DBA or data engineer evaluating Oracle CDC replication to Databricks',
    verdict: 'The demo delivers a credible end-to-end CDC proof-point and a useful sync-method comparison, but a Postgres detour, missing supplemental logging coverage, and no explicit next step hold it back from being a complete, DBA-ready artifact.',
    score_to_improve: 'Add a 60-second supplemental logging setup segment before triggering the first sync — this is the single prerequisite a DBA will block on, and covering it would lift Topic Completeness, Technical Accuracy, and Objection Handling simultaneously.',
    categories: [
      { score: 9, rationale: 'Opens with real pain: operational DBs under heavy load, homegrown pipelines requiring constant maintenance, backlogs eating engineering time. That lands well for the target audience. The Fivetran dashboard description appears within the first 90 seconds, and there is no quantification or customer-voice framing. Problem-first, but softly executed.' },
      { score: 14, rationale: 'Covers redo logs vs archive logs, four sync options (HVA, LogMiner, BLR, Teleport) with deprecation status, connector configuration, table and column selection, column hashing for PII, schema change handling, and a live CDC round-trip from source update to destination verification. Three material gaps: supplemental logging (a required BLR prerequisite) is never mentioned; archive log retention risk and replication LAG are not addressed; and initial historical load vs ongoing CDC distinction is absent.' },
      { score: 11, rationale: 'The core BLR description is accurate: reads redo and archive logs, no agent on the host, uses Oracle pfile objects to access redo files remotely. ACID framing and LogMiner sunset messaging are correct. Minor deduction for the Postgres section: describing ctid alongside xmin as change-detection columns conflates two different purposes — ctid is a physical row locator, not a change-tracking mechanism in the same sense. The BLR "minimal impact" claim is directionally true but stated without qualification on concurrent archive log access patterns.' },
      { score: 12, rationale: 'The end-to-end flow completes cleanly: connector configured and tested, schema fetched, initial sync triggered and completed, source row updated from 1245 to 1250, change verified at destination with row count of one. The CDC proof-point is unambiguous. The Postgres detour runs for approximately two minutes inside an Oracle demo without an explicit transition back, which breaks the demonstration\'s momentum at a key moment.' },
      { score: 7, rationale: 'Depth is broadly appropriate for a DBA or senior data engineer: redo logs, archive logs, ACID properties, sync method trade-offs. The Postgres WAL digression (WAL plugin names, xmin/ctid) is conceptually useful context but unexpectedly deep given this is an Oracle BLR demo, and may slow down an Oracle-focused evaluator without a clear payoff.' },
      { score: 7, rationale: 'Source-system impact is addressed directly ("much more minimal impact to the source system"). The no-agent, no-code maintenance angle handles the "I don\'t want anything installed" objection. Schema change handling is shown explicitly in the UI. Missing: supplemental logging requirement is never acknowledged; archive log retention and LAG risk are not addressed; the primary-key objection is raised mid-flow but not resolved with a clear answer on how Fivetran handles PK-less tables.' },
      { score: 6, rationale: 'Recognizable structure: pain → mechanism explanation → connector setup → sync → change proof. The Postgres detour materially disrupts the arc — a viewer following the Oracle thread loses context for roughly two minutes without a clear explanation of why PostgreSQL is being discussed inside an Oracle demo. Transitions between the mechanism explanation and the live demo are abrupt rather than story-driven.' },
      { score: 4, rationale: 'The closing summary is substantive: BLR is lightweight, no code/API/agent, automatic schema creation, type mapping, and schema change replication are all recapped. No explicit next step follows — no trial link, no documentation pointer, no "talk to your SE." Ends with "Thank you for watching this demo" and nothing more.' },
    ],
    strengths: [
      'The live CDC round-trip is unambiguous and credible: source cell value changes from 1245 to 1250, Fivetran reports exactly one row extracted, destination value matches. That is the core proof a DBA needs to see.',
      'The four-option comparison (HVA, LogMiner, BLR, Teleport) with honest deprecation and sunset status gives a technically sophisticated viewer real context for why BLR is the current recommendation.',
      'Schema change handling is shown in the UI rather than just claimed, which directly addresses a top-of-mind concern for any team that has maintained rigid ETL pipelines.',
    ],
    gaps: [
      'Supplemental logging is never mentioned. For Oracle BLR this is a required prerequisite (ALL COLUMNS or PRIMARY KEY supplemental logging must be enabled). A DBA evaluating this will ask immediately and the demo leaves them without an answer.',
      'The Postgres WAL detour runs for roughly two minutes inside an Oracle demo without a stated rationale. It breaks topic coherence and the connection back to Oracle is not explicit.',
      'Archive log retention window and replication LAG risk are omitted — a real production concern for DBAs who manage Oracle archive log purge schedules.',
      'No call to action closes the video. The viewer has no path to try it, contact the team, or read documentation.',
    ],
    panel: {
      consensus: [
        'Immediately: the Postgres detour is indefensible in an Oracle demo — 90 seconds of WAL explanation that never pays off.',
        'The live CDC proof (ID 28, 1245 to 1250, one row extracted, destination confirmed) is the single best moment in the demo and the emotional peak the entire video should build toward.',
        'Animal Crossing as the demo schema actively undermines the enterprise positioning, given Niraj\'s own opening naming banking, e-commerce, and CRM.',
        'The close is a product spec sheet read back verbatim — "no code, no API, no changes needed" — with no CTA, no POC offer, no next step.',
        'This is a connector demo that stops at ingest, not an ODI demo. The missing dbt and open-format layers represent the largest single point loss on the rubric.',
      ],
      key_disagreement: 'Kelly and Andy disagreed on how much credit to give the BLR technical explanation. Kelly\'s position: accurate product terminology is table stakes, not praise-worthy. Andy pushed back: the BLR vs LogMiner differentiation is subtle and most SEs get it wrong in ways that embarrass us in front of DBAs — Niraj earning 12/15 on technical accuracy is genuinely meaningful and should protect the score from dropping further. Doug sided with Andy on the specific claim that most field SEs cannot explain the pfile mechanism correctly.',
      verdict: 'Niraj is technically one of the best Oracle SEs in the field and this demo proves it — which is exactly the problem. It is an SE-to-SE video masquerading as a customer demo. The BLR explanation is accurate, the live proof lands, and the deprecation callout builds credibility. But there is no buyer, no business problem, no ODI story, no Hybrid deployment mention for the data-residency objection, no competitive framing, and no call to action. The starting score of 70 was too generous. The panel lands at 62.',
      coaching: [
        'Before recording Take 4, sit on one live discovery call with an AE and an Oracle prospect. The first 60 seconds of your next demo should be the buyer\'s actual business consequence — a compliance deadline, a pipeline that breaks at quarter-close, an AI initiative — not a product category.',
        'Complete the pipeline. Show Fivetran moving the row, dbt running a model that surfaces a business metric from that Oracle data, and that metric appearing somewhere a human can act on it. The CDC proof is the setup. The downstream value is the story.',
        'Cut the Postgres detour entirely or give it one explicit sentence of purpose. Do not spend 90 seconds on WAL and PGOutputPlugin in the middle of an Oracle BLR demo.',
      ],
      score_discussion: 'Kelly came in wanting to drop to 65. Andy initially defended 70 for a DBA-level connector walkthrough, then shifted when Doug pointed out that the ODI completeness category — scored at 5/20 — anchors the number. Kelly proposed 62, Andy said 63, Doug said 62. Settled at 62.',
      panelists: [
        {
          panelist: 'Kelly Parker',
          role: 'Sales Engineering Director, North America',
          says: 'This demo was built to pass a technical review, not to move a deal. Niraj knows the product cold, but there is no buyer in this story. The coaching intervention here is not about adding slides. It is about Niraj doing one live discovery call with a quota-carrying AE before recording Take 4, so the business framing is earned, not scripted.',
          unique_insight: 'I\'ve run enablement programs at Informatica and here, and this video has a specific failure mode I recognize immediately: it was built to pass a technical review, not to move a deal. When I hand this to one of my SEs as a reference demo and they pattern-match to it in front of a CDO, they will spend 15 minutes educating the CDO on WAL internals and walk out without a next step.',
          would_share: false,
        },
        {
          panelist: 'Andy Ellman',
          role: 'Senior Manager Sales Engineering East (HVR alumni)',
          says: 'The LogMiner sunset line is correct, but Niraj does not explain WHY we moved away from it — and that explanation is the actual differentiation. I helped design the BLR architecture at HVR. Binary LogReader reads raw redo log files at the OS layer using the pfile mechanism, bypassing LogMiner\'s I/O overhead, licensing implications, and Oracle patch dependency entirely. When you skip that explanation you leave the DBA thinking BLR is just a renamed LogMiner. It is not, and that misunderstanding costs you the deal.',
          unique_insight: 'Also: Hybrid deployment is not mentioned once. These Oracle shops almost always have data residency constraints. That is not a footnote — it is the reason half of them are talking to us in the first place.',
          would_share: false,
        },
        {
          panelist: 'Doug Jauregui',
          role: 'Sr. Enterprise SE Manager, US-LATAM',
          says: 'The latency story is told without explaining what the downstream system can do with it. BinaryLogReader at one-minute intervals is a near-real-time event feed. Databricks on the other end can power a streaming feature store, a fraud detection model, an AI agent that reacts to row-level changes. The only argument that cracks Oracle inertia in 2026 is: your Oracle data can now feed agentic AI workflows in under sixty seconds without touching your source system. That sentence is not in this demo anywhere.',
          unique_insight: 'Oracle customers are the hardest to move off on-prem — they have spent twenty years justifying the license cost. The only argument that cracks that inertia in 2026 is "your Oracle data can now feed agentic AI workflows in under sixty seconds without touching your source system." That sentence is not in this demo anywhere, and it is the sentence that closes the deal with the VP of Data whose CEO just handed them an AI mandate.',
          would_share: false,
        },
      ],
    },
  },
  {
    id: 'chris',
    presenter: 'Chris Rudolph',
    title: 'Hybrid Deployment (Take 2)',
    topic: 'Fivetran Hybrid Deployment — architecture, agent setup, and live connector demonstration',
    duration: '24:33',
    url: 'https://www.loom.com/share/2d9582acc1754bb0a7b21522075fa778',
    total: 42,
    color: '#6b7280',
    audience: 'Security-conscious infrastructure architect at a regulated enterprise',
    verdict: 'The conceptual explanation of Hybrid Deployment is solid, but a failed Docker image pull means data movement is never proven — which is the single thing this demo exists to do.',
    score_to_improve: 'Re-record the demo section with a pre-validated environment where the full sync completes successfully — a working end-to-end proof would lift Demo Execution Quality from 4 to at least 12, adding roughly 8 points and pushing the total past 63.',
    categories: [
      { score: 11, rationale: 'Opens with real pain — sensitive on-prem data that regulations or company policy prevent from leaving the network — before naming the product. The data-breach framing and the "patchwork of tools" before-state are credible and will resonate with a regulated enterprise buyer. Loses points for being generic (no specific regulation named, no quantified cost) and a brief detour to Trust.Fivetran.com that briefly pivots back to SaaS selling before anchoring on Hybrid.' },
      { score: 13, rationale: 'The architectural explanation is present and largely correct: egress-only agent pings the control plane, all data stays inside the customer network, containerized runtime on Docker/Podman/Kubernetes. Agent installation on a real Debian host is shown. Connector creation with SQL Server and BigQuery is attempted and the connection test passes. The core gap: the Docker image pull for the actual sync fails and the session ends unresolved, so end-to-end data movement — the central promise of a Hybrid demo — is never proven.' },
      { score: 11, rationale: 'Egress-only control-plane model, Docker/Podman/Kubernetes support, rootless Docker requirement, and MAR pricing parity are all correctly stated. One material factual error: "ISO 9000" is cited as a Fivetran security certification. ISO 9000 is a quality management standard; the relevant infosec certification is ISO/IEC 27001, which Fivetran does hold. Citing the wrong certification in front of a security-focused buyer is a credibility error a CISO will catch immediately.' },
      { score: 4, rationale: 'Multiple stumbles are visible in the transcript: UI confusion, an agent token regenerated mid-session, wrong directory navigation, and a Docker image pull failure that ends the session without a successful sync. The session is titled "Take 2," meaning a prior attempt already failed. The closing line — "I\'m sure this is going to recover itself" — is not a graceful recovery; it concedes the demo ended in an unresolved error state. No data movement was proven.' },
      { score: 7, rationale: 'The opening speaks to a security-conscious enterprise buyer and the technical depth (rootless Docker, vCPU sizing guidelines, Kubernetes context) is appropriate for a technical evaluator. The Fivetran MCP mention at the end is out of place — it introduces a separate product at the moment when a failing demo most needs a confident close, compounding the confusion rather than recovering from it.' },
      { score: 6, rationale: 'The demo proactively addresses the "does Fivetran touch my data?" objection via the egress-only architecture, and the "what if I also have SaaS sources?" objection via the single-pane-of-glass framing. Missing: no handling of "who is responsible if the agent goes down?", "what is the operational burden of running a container fleet?", or "does Hybrid support the same connector set as SaaS?" — all common regulated-enterprise questions.' },
      { score: 6, rationale: 'There is a recognizable structure: problem (data can\'t leave) → architecture explanation → live setup. The Trust.Fivetran.com detour and pricing section interrupt the flow before the demo begins. The ending is structurally broken — the demo fails mid-proof and the MCP mention adds a non-sequitur rather than returning to the Hybrid story.' },
      { score: 2, rationale: 'No explicit closing summary of what was demonstrated and no next step for the buyer. The session ends on an unresolved Docker error and a tangential MCP mention. A viewer finishing this recording has no clear action to take and no summary of what was proved.' },
    ],
    strengths: [
      'Architecture explanation is the strongest section — the egress-only model, agent-pings-control-plane description, and "all data stays in your network" framing are clear and accurate.',
      'The business problem opening correctly identifies the regulated-data persona and gives a concrete before-state (patchwork tools, DB2 on z/OS) that resonates with enterprise buyers.',
      'Agent installation is shown live on a real Debian host with a real Docker environment, which adds credibility compared to a slide-only explanation.',
      'Pricing parity with SaaS MAR and single-pane-of-glass management are proactively addressed, removing a common commercial objection early.',
    ],
    gaps: [
      'A successful end-to-end sync never happens — the Docker image pull fails and the session ends unresolved, which means the core promise of the demo is unproven.',
      'ISO 9000 is cited instead of ISO 27001. In front of a CISO or compliance team this error damages credibility immediately.',
      'No handling of operational-burden objections: who maintains the agent, what happens during agent downtime, what is the blast radius of a misconfigured container.',
      'No closing summary or next step — a buyer watching this recording has no prompt to act and no clear memory of what was proven.',
    ],
    panel: {
      consensus: [
        'Immediately: the ISO 9000 error is disqualifying for the intended audience — a CISO catches it in real time and the credibility damage is not recoverable in that meeting.',
        'The session cannot be shared externally in its current form.',
        'The egress-only architecture explanation is technically precise and the one element worth preserving.',
        'The patchwork-of-tools pain framing is the strongest business-value statement in the session.',
        'There is no ODI story — no dbt mention, no destination layer, no Iceberg or Delta Lake — and this is a structural gap, not a polish issue.',
      ],
      key_disagreement: 'Doug pushed back on the framing that the Docker failure is the primary problem. His position: the real damage is the missing downstream AI story — hybrid deployment enables agentic workloads in air-gapped environments, and Chris never touched that. Kelly and Andy disagreed: the failure is unrecoverable because there is no bailout and no recovery line. For this specific ICP — customers who already rejected cloud-native ETL once — the broken execution validates their prior objections. Doug conceded the point but held that the missing agentic story is an equal missed opportunity.',
      verdict: 'The technical foundation in Chris\'s head is real — the security architecture is accurate, the egress-only description is precise, and the DB2 on z/OS example is the right ICP signal. None of that saves this recording. The ISO 9000 slip is a deal-ending error with the exact audience this demo targets. The Docker failure would be survivable with a rehearsed recovery, but there is no recovery line, and the closing — "I\'m sure Fivetran will fix itself" — is the worst possible note to leave a data-residency-sensitive buyer on.',
      coaching: [
        'Fix the ISO error before anything else — Fivetran holds ISO 27001, not ISO 9000. In a security demo with a CISO in the room, that slip ends the meeting.',
        'Build a bailout before you record: a pre-recorded 90-second clip of a successful agent registration and Docker pull, or a fallback diagram with a clean connector screenshot, so that when the live environment breaks you have a scripted recovery line. After five years in this seat that plan should exist before you hit record on Take 1.',
        'Connect the security story to the ODI architecture. Hybrid deployment is the answer to the data-residency objection in the open-lakehouse narrative. Add one spoken bridge that takes the buyer from "your data never leaves the network" to what the dbt transformation layer and the Iceberg destination look like running on top of that.',
      ],
      score_discussion: 'Kelly opened at 55 and would not move it up. Andy moved immediately to lower: the ISO 9000 error alone costs five points with this specific audience, and the broken Docker pull with no recovery adds another five. His proposed score was 40. Doug pushed back — 40 was punitive given the architecture explanation is genuinely strong. He proposed 45. Kelly sided with Andy on the ISO error being more damaging than Doug weighted it. The group landed on 42: below the original 55 because the ISO error is a hard deduction with this ICP, the missing recovery plan is a preparation failure, and the complete absence of an ODI connection is structural.',
      panelists: [
        {
          panelist: 'Kelly Parker',
          role: 'Sales Engineering Director, North America',
          says: 'This recording should not leave the building. A broken Docker pull is survivable. What I cannot coach around is a session titled "Take 2" that still ends on an unresolved failure. That tells every SE on my team it\'s acceptable to ship a second attempt that doesn\'t work. The preparation discipline is missing.',
          unique_insight: 'An SE on my team picks this up, watches it, and has two possible takeaways: either the product has reliability problems, or it\'s okay to send a customer a broken demo. Both outcomes are worse than no recording at all. What concerns me most is the absence of a bailout — a polished SE has a scripted recovery line and a pre-built fallback before they ever hit record. Chris has neither.',
          would_share: false,
        },
        {
          panelist: 'Andy Ellman',
          role: 'Senior Manager Sales Engineering East (HVR alumni)',
          says: 'ISO 9000. He said ISO 9000 in a security demo. That is a quality management certification for manufacturing processes. Fivetran holds ISO 27001. I sat across the table from CISOs at banks and utilities for years at HVR — that slip ends the meeting. And the customers who need hybrid deployment are specifically the ones who already rejected cloud-native ETL once. The broken Docker pull does not read as a fluke to them. It reads as confirmation that they were right to say no the first time.',
          unique_insight: 'I spent years at HVR on exactly this deployment pattern — agent-based, log-native, on-prem-aware CDC. The customers who need hybrid deployment have a higher bar for trust. When Chris fumbles the Docker pull and says the system will "recover itself," he has just validated every concern that buyer had when they said no the first time. The demo has to be flawless precisely because of that dynamic, and the execution here works against it.',
          would_share: false,
        },
        {
          panelist: 'Doug Jauregui',
          role: 'Sr. Enterprise SE Manager, US-LATAM',
          says: 'The DB2 on z/OS mention almost saves the whole session — that single example names the entire addressable market. But Chris stopped there and never connected hybrid to the downstream story. Air-gapped ML training clusters, on-prem vector stores, local LLM inference endpoints — hybrid deployment is the architectural primitive that makes all of that possible. He left the most compelling forward-looking argument completely untouched.',
          unique_insight: 'I built one of the world\'s first real-time monitoring systems on on-prem infrastructure. The real objection surface for hybrid is whether your agent can run on RHEL in a DMZ with no inbound ports, and whether your container image passes their CVE scan before deployment. A 24-minute video that ends on a failed Docker pull without speaking to air-gapped registry workflows or image signing is going to lose those deals.',
          would_share: false,
        },
      ],
    },
  },
]
