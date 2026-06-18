// ── Types ─────────────────────────────────────────────────────────────────
export interface CategoryScore {
  score: number
  rationale: string
}

export interface Video {
  id: string
  presenter: string
  title: string
  topic: string
  duration: string
  url: string
  total: number
  color: string          // chart colour — lives here, not in a parallel lookup
  verdict: string
  score_to_improve: string
  audience: string
  categories: CategoryScore[]  // must have exactly RUBRIC_CATEGORIES.length entries
  strengths: string[]
  gaps: string[]
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
    total: 89,
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
  },
  {
    id: 'niraj',
    presenter: 'Niraj Vora',
    title: 'Oracle BLR Demo (Take 3)',
    topic: 'Change Data Capture from Oracle (Binary Log Reader) to Databricks',
    duration: '15:11',
    url: 'https://www.loom.com/share/f848fb812bfa49999fd26b10a182d922',
    total: 70,
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
  },
  {
    id: 'chris',
    presenter: 'Chris Rudolph',
    title: 'Hybrid Deployment (Take 2)',
    topic: 'Fivetran Hybrid Deployment — architecture, agent setup, and live connector demonstration',
    duration: '24:33',
    url: 'https://www.loom.com/share/2d9582acc1754bb0a7b21522075fa778',
    total: 55,
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
  },
]
