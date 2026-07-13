const screens = {
  command: "Executive Command Center",
  pipeline: "Client DAG Workspace",
  stakeholders: "Stakeholder Power Map",
  assessment: "Workforce Assessment Engine",
  governance: "Sales Governance Gates",
  agents: "AI Agent Mesh",
  settings: "Admin Configuration"
};

const deals = [
  { name: "Apex Auto Components", industry: "Automotive", value: "Rs 4.8Cr", stage: "Technical Evaluation", health: 82, risk: "MAP 64%", owner: "Meera Sharma", spoc: "Ananya Rao", role: "CHRO", region: "Pune", employees: "8,400", source: "Founder referral", next: "Send technical evaluation pack" },
  { name: "Nova Retail Services", industry: "Retail", value: "Rs 2.1Cr", stage: "Qualified", health: 48, risk: "Buyer missing", owner: "Arjun Mehta", spoc: "Kabir Malhotra", role: "VP Operations", region: "Mumbai", employees: "3,200", source: "Inbound demo", next: "Identify economic buyer" },
  { name: "Helio Manufacturing", industry: "Manufacturing", value: "Rs 6.7Cr", stage: "Negotiation", health: 74, risk: "Legal redlines", owner: "Nisha Rao", spoc: "Ritika Sen", role: "CFO", region: "Chennai", employees: "11,700", source: "Partner intro", next: "Prepare value defense" },
  { name: "Zenith Healthcare", industry: "Healthcare", value: "Rs 3.9Cr", stage: "Discovery Completed", health: 68, risk: "Sponsor weak", owner: "Meera Sharma", spoc: "Dr. Neel Shah", role: "COO", region: "Bengaluru", employees: "5,600", source: "Conference lead", next: "Strengthen sponsor alignment" }
];

const alerts = [
  ["Founder touch due", "Helio has gone 17 days without founder contact."],
  ["Buyer missing", "Nova is frozen until the budget owner is confirmed."],
  ["MAP incomplete", "Apex needs security and commercial milestones."]
];

const signals = [
  ["Platform email", "CHRO follow-up sent with deck link.", "Apex Auto", "High"],
  ["LinkedIn script", "CIO outreach script ready for review.", "Helio Mfg", "Medium"],
  ["Assessment", "Payroll governance scored below 45.", "Zenith", "High"],
  ["Demo script", "Persona demo script generated from discovery.", "Nova Retail", "Medium"]
];

const stages = [
  ["01", "Assessment", "Scores created.", "done", 100, 80, 130],
  ["02", "Qualified", "Pain, budget, buyer.", "done", 91, 360, 130],
  ["03", "Discovery", "Transcript extracted.", "done", 86, 640, 130],
  ["04", "Power Map", "Critical roles mapped.", "done", 78, 920, 130],
  ["05", "Demo", "Script and score ready.", "done", 84, 1200, 130],
  ["06", "Alignment", "Impact confirmed.", "active", 72, 1480, 130],
  ["07", "Technical", "IT review active.", "active", 62, 1760, 130],
  ["08", "Security", "Artifacts pending.", "blocked", 44, 1760, 390],
  ["09", "Commercial", "Pricing review.", "locked", 0, 1480, 390],
  ["10", "Proposal", "Generated from context.", "locked", 0, 1200, 390],
  ["11", "Negotiation", "Counter plan ready.", "locked", 0, 920, 390],
  ["12", "Legal", "Sponsor required.", "locked", 0, 640, 390],
  ["13", "Procurement", "Vendor onboarding.", "locked", 0, 360, 390],
  ["14", "Contract", "Signature flow.", "locked", 0, 80, 390],
  ["15", "Won", "Handover bundle.", "locked", 0, 80, 650],
  ["16", "CS Handover", "Risks and commitments.", "locked", 0, 360, 650]
];

const stakeholders = [
  ["Ananya Rao", "CHRO / Executive Sponsor", "Advocate", "High", 92, "AR"],
  ["Vikram Sethi", "CIO / Technical Buyer", "Neutral", "High", 67, "VS"],
  ["Maya Iyer", "Compliance Head", "Advocate", "Medium", 81, "MI"],
  ["Rohit Menon", "Procurement Head", "Blocker", "High", 38, "RM"],
  ["Farah Khan", "Legal Reviewer", "Neutral", "Medium", 56, "FK"],
  ["Nitin Shah", "Implementation Owner", "Advocate", "Medium", 73, "NS"]
];

const assessment = [
  ["Workforce Visibility", "Live worker count, vendor footprint, location coverage", 76],
  ["Compliance Maturity", "PF, ESI, CLRA, OSH, audit preparedness", 43],
  ["Vendor Governance", "SLA control, onboarding, renewals, escalation history", 61],
  ["Payroll Governance", "Leakage, approvals, payroll cycle integrity", 58],
  ["AI Readiness", "Data quality, workflow automation, decision support", 69]
];

const gates = [
  ["Gate 1", "Proposal cannot enter Negotiation without MAP", "pass"],
  ["Gate 2", "Legal Stage requires Executive Sponsor", "blocked"],
  ["Gate 3", "No Economic Buyer identified", "blocked"],
  ["Gate 4", "Stakeholder coverage under four critical roles", "pass"],
  ["Gate 7", "No Discovery Summary means Demo cannot be scheduled", "pass"],
  ["Gate 8", "No Demo Score means Proposal cannot be generated", "blocked"]
];

const agents = [
  ["Assessment", "Scores workforce maturity."],
  ["Qualification", "Checks required fields."],
  ["Discovery", "Extracts buying signals."],
  ["Stakeholder", "Tracks power and sentiment."],
  ["Demo", "Creates persona scripts."],
  ["Proposal", "Builds cited proposals."],
  ["Negotiation", "Flags discount pressure."],
  ["Forecast", "Predicts from signals."],
  ["Executive", "Finds founder touches."],
  ["Revenue Coach", "Scores demo quality."]
];

let canvasState = { x: 60, y: 70, scale: 0.86, dragging: false, startX: 0, startY: 0 };
let activeClientIndex = 0;
let currentScreen = "command";
let screenHistory = [];

const conversationByStage = {
  Assessment: [
    ["SDR", "Sent assessment invite from RevenueOS."],
    ["Client", "Asked for compliance benchmark context."],
    ["AM", "AI drafted report email for CHRO."]
  ],
  Qualified: [
    ["SDR", "Captured pain, budget, and buyer signals."],
    ["AM", "Confirmed decision criteria in platform notes."],
    ["AI", "Suggested LinkedIn follow-up for CIO."]
  ],
  Discovery: [
    ["AM", "Uploaded meeting transcript."],
    ["AI", "Extracted pain points, stakeholders, and buying signals."],
    ["SDR", "Created follow-up tasks from transcript."]
  ],
  "Power Map": [
    ["AM", "Marked Procurement as blocker."],
    ["Founder", "Added executive relationship note."],
    ["AI", "Generated stakeholder-specific outreach."]
  ],
  Demo: [
    ["AM", "Generated persona demo script."],
    ["AI", "Created deck outline from assessment and discovery."],
    ["Client", "Requested compliance workflow demo."]
  ],
  Proposal: [
    ["AI", "Built proposal from context graph."],
    ["AM", "Reviewed ROI and pricing section."],
    ["Client", "Asked for implementation timeline."]
  ],
  Negotiation: [
    ["Procurement", "Requested revised commercial terms."],
    ["AI", "Detected discount pressure."],
    ["AM", "Prepared value defense response."]
  ],
  Legal: [
    ["Legal", "Added redline notes."],
    ["AI", "Prepared legal risk summary."],
    ["AM", "Assigned executive sponsor approval task."]
  ]
};

const mailChainByStage = {
  Assessment: {
    threads: [
      {
        id: "t1", subject: "Workforce maturity benchmark — Apex Auto Components", contact: "Ananya Rao", role: "CHRO", email: "ananya.rao@apexauto.example", unread: false, preview: "Thank you for sharing the report. The compliance score is concerning...", attachments: ["Assessment_Report_Apex.pdf", "Executive_Summary.pdf"],
        chain: [
          { dir: "out", from: "Meera Sharma", fromEmail: "meera@beeforce.com", to: "Ananya Rao", date: "Jun 18", time: "10:14 AM", body: "Hi Ananya,\n\nThank you for making time last week. As discussed, I've attached the AI-generated workforce maturity benchmark for Apex Auto Components.\n\nKey findings:\n• Workforce Visibility: 76 — Healthy\n• Compliance Maturity: 43 — Critical gap (PF, ESI, CLRA audit exposure)\n• Vendor Governance: 61 — Needs action\n• Payroll Governance: 58 — Needs action\n• AI Readiness: 69 — Healthy\n\nThe compliance gap is the highest-priority risk. I'd recommend a short call to walk through the remediation path before your Q3 audit cycle begins.\n\nLet me know a convenient time.\n\nBest,\nMeera Sharma | BeeForce RevenueOS", attachments: ["Assessment_Report_Apex.pdf"] },
          { dir: "in", from: "Ananya Rao", fromEmail: "ananya.rao@apexauto.example", to: "Meera Sharma", date: "Jun 18", time: "2:41 PM", body: "Hi Meera,\n\nThank you for sharing this. The compliance score of 43 is indeed concerning — we had flagged some gaps internally but this gives us a much clearer picture.\n\nA few questions:\n1. Is the CLRA gap specific to contract labour at our Pune and Chennai plants?\n2. What does the remediation timeline typically look like for organisations at this maturity level?\n3. Can BeeForce generate a report specifically for our Compliance Head, Maya Iyer?\n\nHappy to connect this Friday at 3pm IST if that works.\n\nThanks,\nAnanya", attachments: [] },
          { dir: "out", from: "Meera Sharma", fromEmail: "meera@beeforce.com", to: "Ananya Rao", date: "Jun 19", time: "9:08 AM", body: "Hi Ananya,\n\nYes — the CLRA exposure is concentrated at Pune (plant headcount ~2,400) and Chennai (~1,800 contract workers). The AI flagged 3 specific audit triggers there.\n\nTypical remediation for organisations at maturity 43 takes 6–9 months with the right governance layer. BeeForce accelerates this to ~3 months through automated compliance tracking.\n\nI've generated a dedicated Compliance Head report for Maya — attached here. Would it be useful to include her in Friday's call?\n\nConfirmed for Friday 3pm IST.\n\nBest,\nMeera", attachments: ["Compliance_Report_Maya_Iyer.pdf", "CLRA_Risk_Brief.pdf"] },
          { dir: "in", from: "Ananya Rao", fromEmail: "ananya.rao@apexauto.example", to: "Meera Sharma", date: "Jun 19", time: "11:22 AM", body: "Perfect — yes, please include Maya. I'll forward the compliance report to her now and send a calendar invite.\n\nSee you Friday.", attachments: [] }
        ]
      },
      {
        id: "t2", subject: "CIO briefing — system integration and AI readiness", contact: "Vikram Sethi", role: "CIO", email: "vikram.sethi@apexauto.example", unread: true, preview: "Can you share the integration architecture before the call?", attachments: ["Integration_Architecture.pdf"],
        chain: [
          { dir: "out", from: "Arjun Mehta", fromEmail: "arjun@beeforce.com", to: "Vikram Sethi", date: "Jun 20", time: "11:30 AM", body: "Hi Vikram,\n\nFollowing Ananya's note, I wanted to connect with you directly on the technology side. The assessment flagged an AI Readiness score of 69 — strong foundation, but there are specific data pipeline gaps that affect real-time workforce visibility.\n\nWould you be open to a 30-minute technical walkthrough of how BeeForce integrates with your existing HRMS and ERP?\n\nBest,\nArjun Mehta | Solutions Architect, BeeForce", attachments: [] },
          { dir: "in", from: "Vikram Sethi", fromEmail: "vikram.sethi@apexauto.example", to: "Arjun Mehta", date: "Jun 21", time: "3:15 PM", body: "Arjun,\n\nSure. Can you share the integration architecture doc before the call? We're running SAP SuccessFactors and Oracle Fusion — want to make sure your connectors are production-tested for both.\n\nAlso — what's the data residency model? We have strict on-prem requirements for plant operations data.\n\nVikram", attachments: [] }
        ]
      }
    ]
  },
  Qualified: {
    threads: [
      {
        id: "t1", subject: "Qualifying priorities — budget and decision process", contact: "Ananya Rao", role: "CHRO", email: "ananya.rao@apexauto.example", unread: false, preview: "The budget cycle closes in September, so we'd need a proposal before...", attachments: [],
        chain: [
          { dir: "out", from: "Meera Sharma", fromEmail: "meera@beeforce.com", to: "Ananya Rao", date: "Jun 22", time: "9:00 AM", body: "Hi Ananya,\n\nFollowing our Friday call — I wanted to confirm a few things to make sure we can move at the right pace for you:\n\n1. Budget: Is workforce governance already budgeted for FY25, or does this need a new approval?\n2. Decision process: Who else needs to be part of the final sign-off besides yourself?\n3. Timeline: Is there a specific go-live milestone driving urgency?\n\nOnce I have these, I can have a proposal structured appropriately.\n\nBest,\nMeera", attachments: [] },
          { dir: "in", from: "Ananya Rao", fromEmail: "ananya.rao@apexauto.example", to: "Meera Sharma", date: "Jun 22", time: "2:30 PM", body: "Meera,\n\nHelpful questions. Here are the answers:\n\n1. Budget: There's a contingency pool for compliance risk initiatives — roughly Rs 4–6Cr available pending CFO sign-off (Rohit Menon is the budget owner).\n2. Decision process: Me, Rohit, Vikram Sethi (CIO), and Legal (Farah Khan for contract review). I sponsor, Rohit approves.\n3. Timeline: Our Q3 audit is in October. We'd need to be live on compliance tracking by September at the latest.\n\nAnanya", attachments: [] }
        ]
      }
    ]
  },
  Discovery: {
    threads: [
      {
        id: "t1", subject: "Discovery recap — workforce governance pain points", contact: "Ananya Rao", role: "CHRO", email: "ananya.rao@apexauto.example", unread: false, preview: "This is a good summary. The payroll leakage figure is the one...", attachments: ["Discovery_Summary_Apex.pdf"],
        chain: [
          { dir: "out", from: "Meera Sharma", fromEmail: "meera@beeforce.com", to: "Ananya Rao", date: "Jun 25", time: "10:00 AM", body: "Hi Ananya,\n\nAttached is the AI-generated discovery summary from our session. Key pain points captured:\n\n• Payroll leakage: Estimated Rs 1.2Cr/year from contractor billing discrepancies\n• CLRA non-compliance: 3 audit triggers at Pune and Chennai plants\n• Vendor SLA breaches: 18% of active contracts with no escalation trail\n• Manual headcount reconciliation: 3-day lag between HR and finance data\n\nDoes this accurately represent what was discussed? I want to make sure we've captured everything correctly before moving forward.\n\nMeera", attachments: ["Discovery_Summary_Apex.pdf"] },
          { dir: "in", from: "Ananya Rao", fromEmail: "ananya.rao@apexauto.example", to: "Meera Sharma", date: "Jun 25", time: "4:15 PM", body: "This is a good summary. The payroll leakage figure is the one that will get Rohit's attention — he's been asking for a number for 6 months.\n\nOne addition: we also have a problem with attendance data from our contract labour — it comes from 4 different vendor systems and there's no single source of truth. Add that to the list.\n\nOtherwise accurate. What's next?", attachments: [] },
          { dir: "out", from: "Meera Sharma", fromEmail: "meera@beeforce.com", to: "Ananya Rao", date: "Jun 26", time: "8:45 AM", body: "Added — attendance data fragmentation is now captured as a 5th pain point in the DAG.\n\nNext step: I'd like to schedule a demo tailored to CHRO and CIO personas, focused on payroll governance, compliance tracking, and the unified attendance layer. Can we find a 90-minute slot next week?\n\nMeera", attachments: [] }
        ]
      }
    ]
  },
  "Technical Evaluation": {
    threads: [
      {
        id: "t1", subject: "Technical evaluation pack — security and integration", contact: "Vikram Sethi", role: "CIO", email: "vikram.sethi@apexauto.example", unread: true, preview: "The architecture doc looks solid. Two open items before we can...", attachments: ["Security_Pack.pdf", "Integration_Arch.pdf"],
        chain: [
          { dir: "out", from: "Arjun Mehta", fromEmail: "arjun@beeforce.com", to: "Vikram Sethi", date: "Jul 1", time: "9:30 AM", body: "Hi Vikram,\n\nAs discussed, I've shared the full technical evaluation pack. Covering:\n• Integration architecture for SAP SuccessFactors + Oracle Fusion\n• Data residency model (plant operations data stays on-prem, reporting layer is cloud)\n• Security controls: SOC 2 Type II, ISO 27001, role-based access\n• Implementation timeline: 8 weeks for Phase 1 (compliance + payroll modules)\n\nLet me know if you'd like a call with our solutions architect for a deeper technical walkthrough.\n\nArjun", attachments: ["Security_Pack.pdf", "Integration_Arch.pdf"] },
          { dir: "in", from: "Vikram Sethi", fromEmail: "vikram.sethi@apexauto.example", to: "Arjun Mehta", date: "Jul 1", time: "2:00 PM", body: "Arjun,\n\nThe architecture doc looks solid. Two open items before we can give IT sign-off:\n\n1. We need pen test results from the last 12 months\n2. Our infosec team wants to review the data encryption spec at rest and in transit\n\nCan you share those? If clean, I can confirm IT clearance by end of week.\n\nVikram", attachments: [] }
        ]
      }
    ]
  }
};

// Map client stage names to mailChainByStage keys
function getMailStageKey(stageName) {
  const map = { "Technical Evaluation": "Technical Evaluation", Assessment: "Assessment", Qualified: "Qualified", Discovery: "Discovery" };
  return map[stageName] || stageName;
}

const stageWorkflows = {
  Assessment: {
    module: "Workforce Assessment Engine",
    tasks: ["Run adaptive assessment", "Review maturity scores", "Draft email with report", "Generate CHRO/CIO summary"],
    draft: "Subject: Workforce maturity benchmark for {{client}}\n\nSharing the assessment summary with risk exposure, compliance readiness, quick wins, and the recommended transformation roadmap.",
    evidence: ["Assessment score", "Risk exposure", "Compliance readiness", "Automation readiness"]
  },
  Qualified: {
    module: "Qualification Governance",
    tasks: ["Complete BANT/MEDDIC fields", "Confirm economic buyer", "Draft qualification email", "Generate LinkedIn follow-up"],
    draft: "Subject: Confirming priorities and decision process\n\nRevenueOS captured pain, budget, decision process, decision criteria, timeline, and success criteria for review.",
    evidence: ["Pain identified", "Budget range", "Decision criteria", "Economic buyer"]
  },
  Discovery: {
    module: "Discovery Intelligence",
    tasks: ["Review transcript extract", "Approve discovery summary", "Create follow-up tasks", "Draft recap email"],
    draft: "Subject: Discovery recap and next steps\n\nHere are the confirmed business problems, compliance risks, buying signals, stakeholder notes, and next actions.",
    evidence: ["Business problems", "Pain points", "Budget indicators", "Buying signals"]
  },
  "Power Map": {
    module: "Stakeholder Matrix",
    tasks: ["Map missing roles", "Create executive touch", "Generate LinkedIn script", "Draft stakeholder update"],
    draft: "LinkedIn script: Reference the workforce governance initiative, shared compliance priorities, and request a short alignment conversation.",
    evidence: ["Influence level", "Decision power", "Sentiment", "Relationship strength"]
  },
  Demo: {
    module: "Demo Intelligence",
    tasks: ["Generate demo script", "Build demo deck", "Send demo agenda", "Create objection handling notes"],
    draft: "Demo script: Open with the client's risk exposure, map each module to the confirmed pain, then close with agreed success criteria.",
    evidence: ["Industry", "Persona", "Pain point", "Compliance gap"]
  },
  Alignment: {
    module: "Business Alignment",
    tasks: ["Generate ROI deck", "Draft alignment email", "Confirm success criteria", "Create MAP milestone"],
    draft: "Subject: Business alignment and success criteria\n\nThis summarizes impact, success metrics, milestones, and the recommended executive alignment path.",
    evidence: ["Business impact", "ROI narrative", "Success criteria", "Sponsor sentiment"]
  },
  Technical: {
    module: "Technical Evaluation",
    tasks: ["Send security pack", "Create IT task list", "Draft technical reply", "Track implementation owner"],
    draft: "Subject: Technical evaluation pack\n\nSharing architecture, security, integration, implementation, and governance artifacts from the workspace.",
    evidence: ["IT reviewer", "Security questions", "Integration needs", "Implementation owner"]
  },
  Security: {
    module: "Blocker Management",
    tasks: ["Generate risk response", "Send compliance deck", "Assign blocker owner", "Update gate status"],
    draft: "Subject: Security and compliance response\n\nAttached are the requested risk responses, compliance controls, and implementation safeguards.",
    evidence: ["Security blocker", "Compliance risk", "Owner", "Gate status"]
  },
  Commercial: {
    module: "Negotiation Intelligence",
    tasks: ["Generate ROI deck", "Draft commercial email", "Review discount pressure", "Create procurement narrative"],
    draft: "Subject: Commercial model and ROI case\n\nThis summarizes value justification, pricing assumptions, ROI, and commercial next steps.",
    evidence: ["Discount pressure", "Revenue potential", "ROI", "Procurement signals"]
  },
  Proposal: {
    module: "Proposal Intelligence",
    tasks: ["Generate proposal", "Draft proposal email", "Attach case studies", "Check MAP gate"],
    draft: "Subject: Proposal for workforce governance transformation\n\nThe proposal includes current state, business risk, future state, solution, ROI, implementation, pricing, and success metrics.",
    evidence: ["Assessment", "Discovery", "Qualification", "Demo outcomes"]
  },
  Negotiation: {
    module: "Negotiation Intelligence",
    tasks: ["Generate counter position", "Draft negotiation email", "Create value defense", "Log procurement tactic"],
    draft: "Subject: Commercial clarification\n\nRevenueOS recommends a value-based response covering risk, outcomes, implementation scope, and commercial guardrails.",
    evidence: ["Competitive threat", "Legal risk", "Commercial risk", "Executive concern"]
  },
  Legal: {
    module: "Legal Review",
    tasks: ["Create redline brief", "Assign legal owner", "Draft legal response", "Check executive sponsor gate"],
    draft: "Subject: Contract review response\n\nThis response summarizes accepted clauses, open redlines, risk position, and required executive approvals.",
    evidence: ["Executive sponsor", "Legal reviewer", "Redlines", "Risk response"]
  },
  Procurement: {
    module: "Procurement Review",
    tasks: ["Generate vendor pack", "Draft procurement email", "Track onboarding checklist", "Update blocker status"],
    draft: "Subject: Vendor onboarding pack\n\nSharing vendor documentation, commercial terms, compliance evidence, and onboarding milestones.",
    evidence: ["Procurement owner", "Vendor checklist", "Commercial terms", "Blockers"]
  },
  Contract: {
    module: "Contract Signing",
    tasks: ["Prepare signature packet", "Send signature request", "Create closure task", "Archive final terms"],
    draft: "Subject: Signature packet ready\n\nRevenueOS prepared the final agreement, signature steps, and implementation handover trigger.",
    evidence: ["Final terms", "Signatories", "Approval status", "Contract version"]
  },
  Won: {
    module: "Executive Relationship Management",
    tasks: ["Send win confirmation", "Create founder note", "Generate handover deck", "Notify CS"],
    draft: "Subject: Partnership kickoff\n\nConfirming closure, sponsor commitments, implementation path, and the customer success handover.",
    evidence: ["Founder notes", "Commitments", "Commercial summary", "Sponsor sentiment"]
  },
  "CS Handover": {
    module: "Implementation Handover",
    tasks: ["Generate CS brief", "Create onboarding tasks", "Send handover email", "Lock sales context"],
    draft: "Subject: Customer success handover\n\nThis handover includes pain points, stakeholders, risks, commitments, success metrics, and implementation milestones.",
    evidence: ["Pain summary", "Stakeholder map", "Risks", "Success metrics"]
  }
};

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
}

function activeClient() {
  return deals[activeClientIndex] || deals[0];
}

function renderAllScreens() {
  renderCommand();
  renderPipeline(qs("#personaTabs button.active")?.dataset.persona || "all");
  renderStakeholders();
  renderAssessment();
  renderGovernance();
  renderAgents();
  renderSettings();
  renderBreadcrumbs();
}

function setActiveClient(index) {
  activeClientIndex = Number(index);
  const clientSelect = qs("#clientSelect");
  if (clientSelect) clientSelect.value = String(activeClientIndex);
  closeOverlays();
  renderAllScreens();
}

function renderBreadcrumbs() {
  const breadcrumbs = qs("#breadcrumbs");
  if (!breadcrumbs) return;
  const client = activeClient();
  const currentLabel = screens[currentScreen] || screens.command;
  const previousScreen = screenHistory[screenHistory.length - 1];
  const parentScreen = currentScreen === "command" ? "" : (previousScreen || "command");
  breadcrumbs.innerHTML = `
    <button class="breadcrumb-button" type="button" data-breadcrumb-screen="command">RevenueOS</button>
    <span>/</span>
    <button class="breadcrumb-button" type="button" data-client-details>${client.name}</button>
    ${parentScreen ? `<span>/</span><button class="breadcrumb-button" type="button" data-breadcrumb-screen="${parentScreen}">${screens[parentScreen]}</button>` : ""}
    <span>/</span>
    <span class="breadcrumb-current">${currentLabel}</span>
  `;
}

function setScreen(id, pushHistory = true) {
  if (!screens[id]) return;
  if (id !== currentScreen && pushHistory) screenHistory.push(currentScreen);
  currentScreen = id;
  qsa(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id));
  qsa(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.screen === id));
  qs("#screenTitle").textContent = screens[id];
  renderBreadcrumbs();
  if (id === "pipeline") requestAnimationFrame(applyCanvasTransform);
}

function goBack() {
  const workspace = qs("#stageWorkspace");
  if (workspace?.classList.contains("open")) {
    closeOverlays();
    setScreen("pipeline", false);
    return;
  }
  const previous = screenHistory.pop();
  setScreen(previous || "command", false);
}

function renderWorkspaceBreadcrumbs(title, parentScreen = "pipeline") {
  const client = activeClient();
  const breadcrumbs = qs("#workspaceBreadcrumbs");
  if (!breadcrumbs) return;
  breadcrumbs.innerHTML = `
    <button class="breadcrumb-button" type="button" data-workspace-back="${parentScreen}">${screens[parentScreen]}</button>
    <span>/</span>
    <button class="breadcrumb-button" type="button" data-workspace-back="${parentScreen}">${client.name}</button>
    <span>/</span>
    <span class="breadcrumb-current">${title}</span>
  `;
}

function renderCommand() {
  const client = activeClient();
  qs("#alertList").innerHTML = [
    [`${client.risk} risk`, `${client.name} needs action at ${client.stage}.`],
    ["Next owner action", client.next],
    ["SPOC follow-up", `${client.spoc}, ${client.role}, is the current primary contact.`]
  ].map(([title, body]) => `
    <button class="alert-item" type="button" data-drawer="${title}">
      <div class="item-title">${title}</div>
      <div class="item-meta">${body}</div>
    </button>
  `).join("");

  qs("#dealList").innerHTML = [
    ["Stage", client.stage],
    ["Owner", client.owner],
    ["SPOC", `${client.spoc}, ${client.role}`],
    ["Value", client.value]
  ].map(([label, value]) => `
    <button class="deal-item" type="button" data-client-details>
      <div>
        <div class="item-title">${label}</div>
        <div class="item-meta">${value}</div>
      </div>
      <div class="deal-value">View</div>
    </button>
  `).join("");

  const clientSignals = [
    ["Platform email", `${client.spoc} follow-up ready from ${client.stage}.`, client.name, client.health < 60 ? "High" : "Medium"],
    ["LinkedIn script", `${client.role} outreach script generated.`, client.name, "Medium"],
    ["Next task", client.next, client.name, client.risk.includes("missing") ? "High" : "Medium"],
    ["Gate check", `${client.stage} evidence reviewed against current DAG.`, client.name, client.health < 65 ? "High" : "Medium"]
  ];
  qs("#signalTable").innerHTML = clientSignals.map(([type, summary, deal, priority]) => `
    <div class="signal-row">
      <div class="signal-type">${type}</div>
      <div>${summary}</div>
      <div>${deal}</div>
      <span class="badge ${priority === "High" ? "danger" : "warn"}">${priority}</span>
    </div>
  `).join("");
}

function renderPipeline(persona = "all") {
  const client = activeClient();
  qs("#clientSummary").innerHTML = `
    <div class="client-summary-main">
      <div class="client-name">${client.name}</div>
      <div class="client-meta">${client.industry} - ${client.value} - Owner: ${client.owner} - SPOC: ${client.spoc}</div>
    </div>
    <div class="client-kpis">
      <span class="badge blue">${client.stage}</span>
      <span class="badge green">${client.health}% health</span>
      <span class="badge warn">${client.risk}</span>
      <button class="small-button" type="button" data-client-details>View details</button>
    </div>
  `;

  renderConversationStrip();

  const lockedForFounder = new Set(["01", "02", "03", "05", "07", "08", "09", "10", "11", "13", "14"]);
  const filtered = stages.map((stage) => {
    const next = [...stage];
    if (persona === "founder" && lockedForFounder.has(stage[0])) next[3] = "locked";
    if (persona === "legal" && !["10", "11", "12"].includes(stage[0])) next[3] = "locked";
    if (persona === "cs" && !["15", "16"].includes(stage[0])) next[3] = "locked";
    return next;
  });

  const rails = filtered.slice(0, -1).map((stage, index) => {
    const next = filtered[index + 1];
    const x1 = stage[5] + 200;
    const y1 = stage[6] + 58;
    const x2 = next[5];
    const y2 = next[6] + 58;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const blocked = stage[3] === "blocked" || next[3] === "blocked";
    return `<div class="dag-rail ${blocked ? "blocked" : ""}" style="left:${x1}px;top:${y1}px;width:${length}px;transform:rotate(${angle}deg)"></div>`;
  }).join("");

  qs("#dagCanvas").innerHTML = `<div class="dag-space" id="dagSpace">${rails}${filtered.map(([num, title, body, state, score, x, y]) => `
    <button class="stage-card ${state}" style="left:${x}px;top:${y}px" type="button" data-stage="${title}">
      <div class="stage-kicker">Stage ${num}</div>
      <div class="stage-title">${title}</div>
      <div class="stage-body">${body}</div>
      <div class="stage-footer">
        <span class="badge ${state === "blocked" ? "danger" : state === "done" ? "green" : state === "locked" ? "warn" : "blue"}">${state}</span>
        <span class="stage-score">${score}% - ${getConversationCount(title)} msgs</span>
      </div>
    </button>
  `).join("")}</div>`;
  applyCanvasTransform();
}

function getConversationCount(stageName) {
  return (conversationByStage[stageName] || [["SDR", ""], ["AM", ""]]).length;
}

function renderConversationStrip() {
  const strip = qs("#conversationStrip");
  if (!strip) return;
  const collapsed = strip.classList.contains("collapsed");
  const activeStages = stages.slice(0, 8);
  strip.innerHTML = `
    <button class="conversation-title strip-toggle" type="button" id="stripToggle" aria-label="${collapsed ? "Expand" : "Minimize"} conversation strip">
      In-app conversation by DAG node
      <svg class="app-icon strip-chevron ${collapsed ? "collapsed" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="conversation-node-list">
      ${activeStages.map(([num, title]) => `
        <button class="conversation-node" type="button" data-stage="${title}">
          <span>${num}</span>
          <b>${title}</b>
          <em>${getConversationCount(title)} messages</em>
        </button>
      `).join("")}
    </div>
  `;
  qs("#stripToggle").addEventListener("click", () => {
    strip.classList.toggle("collapsed");
    renderConversationStrip();
  });
}

function renderStakeholders() {
  const client = activeClient();
  qs("#stakeholderMap").innerHTML = stakeholders.map(([name, role, sentiment, influence, score, initials]) => `
    <button class="person-card" type="button" data-drawer="${name}">
      <div class="avatar-row">
        <div class="avatar">${initials}</div>
        <div>
          <div class="person-name">${name}</div>
          <div class="person-role">${role}</div>
        </div>
      </div>
      <div class="person-metrics">
        <div class="mini-stat"><span>Sentiment</span><b>${sentiment}</b></div>
        <div class="mini-stat"><span>Influence</span><b>${influence}</b></div>
        <div class="mini-stat"><span>Engagement</span><b>${score}%</b></div>
        <div class="mini-stat"><span>Risk</span><b>${sentiment === "Blocker" ? "High" : "Low"}</b></div>
      </div>
    </button>
  `).join("");

  qs("#relationshipTasks").innerHTML = [
    `Send founder note to ${client.spoc} from RevenueOS`,
    `Confirm ${client.role} priorities for ${client.stage}`,
    `Create ${client.risk} action plan`,
    `Capture ${client.name} relationship notes in context graph`
  ].map((task, index) => `
    <div class="task-item">
      <div class="item-title">${task}</div>
      <div class="task-meta">Owner ${index % 2 ? "AE" : "Founder"} - Due ${index + 1}d</div>
    </div>
  `).join("");
}

function renderAssessment() {
  const client = activeClient();
  qs("#assessmentStack").innerHTML = assessment.map(([name, desc, score]) => `
    <button class="assessment-item" type="button" data-drawer="${name}">
      <div class="item-title">${name}</div>
      <div class="item-meta">${desc}</div>
      <div class="report-score"><i style="width:${score}%"></i></div>
    </button>
  `).join("");

  qs("#reportGrid").innerHTML = assessment.map(([name, desc, score]) => `
    <div class="report-card">
      <div class="item-title">${name}</div>
      <div class="item-meta">${client.name} - ${desc}</div>
      <div class="metric-value">${score}</div>
      <div class="metric-delta ${score < 50 ? "danger" : score < 65 ? "warn" : "good"}">${score < 50 ? "Critical gap" : score < 65 ? "Needs action" : "Healthy"}</div>
    </div>
  `).join("");
}

function renderGovernance() {
  const client = activeClient();
  qs("#gateGrid").innerHTML = gates.map(([gate, rule, state]) => `
    <button class="gate-card ${state}" type="button" data-drawer="${gate}">
      <div class="item-title">${gate}</div>
      <div class="item-meta">${rule}</div>
      <div style="margin-top:8px"><span class="badge ${state === "pass" ? "green" : "danger"}">${state === "pass" ? "Pass" : "Blocked"}</span></div>
    </button>
  `).join("");
  const blocker = qs(".blocker-card");
  if (blocker) {
    blocker.innerHTML = `
      <div class="blocker-title">${client.name}</div>
      <p>${client.risk} is blocking clean movement from ${client.stage}. Owner: ${client.owner}. SPOC: ${client.spoc}.</p>
      <div class="blocker-actions">
        <button class="small-button" type="button" data-client-details>View details</button>
        <button class="small-button danger-text" type="button" data-drawer="${client.risk}">Request Override</button>
      </div>
    `;
  }
}

function renderAgents() {
  const client = activeClient();
  qs("#agentGrid").innerHTML = agents.map(([name, desc], index) => `
    <button class="agent-card" type="button" data-drawer="${name} Agent">
      <div class="agent-icon">${String(index + 1).padStart(2, "0")}</div>
      <div class="item-title">${name} Agent</div>
      <div class="item-meta">${desc} Active for ${client.name}.</div>
    </button>
  `).join("");
}

function renderSettings() {
  const modules = ["Assessment Engine", "Lead Scoring", "Discovery Intelligence", "Stakeholder Matrix", "MAP Engine", "Forecast Engine"];
  qs("#moduleList").innerHTML = modules.map((module, index) => `
    <div class="toggle-row">
      <div>
        <div class="item-title">${module}</div>
        <div class="item-meta">${index < 4 ? "Active in phase 1" : "Planned for scale phase"}</div>
      </div>
      <button class="switch ${index < 4 ? "on" : ""}" type="button" aria-label="Toggle ${module}"></button>
    </div>
  `).join("");

  const integrations = ["Platform Outbox", "LinkedIn Script Studio", "Deck Generator", "Google Calendar", "Zoom", "DocuSign"];
  qs("#integrationList").innerHTML = integrations.map((name, index) => `
    <div class="integration-row">
      <div>
        <div class="item-title">${name}</div>
        <div class="item-meta">${index < 4 ? "Active in workspace" : "Pending admin credentials"}</div>
      </div>
      <span class="badge ${index < 4 ? "green" : "warn"}">${index < 4 ? "Live" : "Pending"}</span>
    </div>
  `).join("");
}

function openDrawer(title) {
  openWorkspace(title);
}

function openAssessmentWorkspace() {
  const client = activeClient();
  const stage = stages.find((s) => s[1] === "Assessment");
  const stageStatus = stage ? stage[3] : "active";
  const stageScore = stage ? stage[4] : 0;

  renderWorkspaceBreadcrumbs("Assessment");
  qs("#workspaceClient").textContent = `${client.name} - Workforce Assessment Engine`;
  qs("#workspaceTitle").textContent = "Assessment";

  if (stageStatus === "done") {
    // ── COMPLETED VIEW ─────────────────────────────────────────────────────────
    const scoreRows = assessment.map(([name, desc, score]) => {
      const pct = score;
      const statusLabel = pct < 50 ? "Critical gap" : pct < 65 ? "Needs action" : "Healthy";
      const statusClass = pct < 50 ? "danger" : pct < 65 ? "warn" : "green";
      return `
        <div class="assess-score-row">
          <div class="assess-score-meta">
            <div class="assess-score-name">${name}</div>
            <div class="assess-score-desc">${desc}</div>
          </div>
          <div class="assess-score-bar-wrap">
            <div class="assess-score-bar"><i style="width:${pct}%"></i></div>
          </div>
          <div class="assess-score-right">
            <span class="assess-score-value">${pct}</span>
            <span class="badge ${statusClass}">${statusLabel}</span>
          </div>
        </div>
      `;
    }).join("");

    const execReports = [
      ["CHRO Report", "Workforce governance, compliance exposure, and talent risk summary", "Ananya Rao"],
      ["CIO Report", "System integration gaps, data quality, and automation readiness", "Vikram Sethi"],
      ["Compliance Report", "PF, ESI, CLRA, OSH audit findings and critical gaps", "Maya Iyer"],
      ["CEO Report", "Strategic workforce risk, cost exposure, and AI readiness overview", "Board"],
      ["Procurement Report", "Vendor SLA control, onboarding deficiencies, renewal risk", "Rohit Menon"]
    ];

    const reportCards = execReports.map(([title, summary, owner]) => `
      <div class="exec-report-card">
        <div class="exec-report-header">
          <div class="exec-report-icon">✓</div>
          <div>
            <div class="exec-report-title">${title}</div>
            <div class="exec-report-owner">For ${owner}</div>
          </div>
          <span class="badge green">Generated</span>
        </div>
        <div class="exec-report-summary">${summary}</div>
        <div class="exec-report-actions">
          <button class="small-button" type="button" data-tool="mail">Send to ${owner}</button>
          <button class="small-button" type="button" data-tool="ai">Regenerate</button>
        </div>
      </div>
    `).join("");

    const evidenceItems = [
      ["Assessment invite sent", true],
      ["Answers captured", true],
      ["Scores reviewed", true],
      ["Executive report approved", true]
    ];

    qs("#workspaceContent").innerHTML = `
      <div class="stage-detail-layout">

        <!-- HERO -->
        <section class="workspace-section stage-hero">
          <div>
            <div class="workspace-label">Stage 01 — Assessment</div>
            <h3>Workforce maturity scored for ${client.name}</h3>
            <p>AI-guided assessment completed across 5 categories. Executive reports generated for CHRO, CIO, Compliance, CEO, and Procurement.</p>
          </div>
          <div class="stage-status-grid">
            <div><span>Status</span><b class="text-green">Done</b></div>
            <div><span>Score</span><b>${stageScore}%</b></div>
            <div><span>Owner</span><b>${client.owner}</b></div>
            <div><span>SPOC</span><b>${client.spoc}</b></div>
          </div>
        </section>

        <!-- MATURITY SCORES -->
        <section class="workspace-section stage-wide">
          <div class="workspace-label">Maturity Score Dashboard</div>
          <div class="assess-score-list">
            ${scoreRows}
          </div>
          <div class="assess-score-footer">
            <div class="assess-aggregate">
              <span>Overall Maturity</span>
              <b>${Math.round(assessment.reduce((sum, [,, s]) => sum + s, 0) / assessment.length)}</b>
            </div>
            <div class="assess-aggregate warn">
              <span>Critical Gaps</span>
              <b>${assessment.filter(([,, s]) => s < 50).length} category</b>
            </div>
            <div class="assess-aggregate">
              <span>Healthy Areas</span>
              <b>${assessment.filter(([,, s]) => s >= 65).length} of ${assessment.length}</b>
            </div>
          </div>
        </section>

        <!-- RISK HEATMAP -->
        <section class="workspace-section stage-wide">
          <div class="workspace-label">Risk Exposure Heatmap</div>
          <div class="heatmap-grid">
            ${assessment.map(([name,, score]) => {
              const level = score < 50 ? "heatmap-critical" : score < 65 ? "heatmap-warn" : "heatmap-ok";
              const label = score < 50 ? "Critical" : score < 65 ? "Moderate" : "Low";
              return `<div class="heatmap-cell ${level}"><div class="heatmap-name">${name}</div><div class="heatmap-score">${score}</div><div class="heatmap-label">${label}</div></div>`;
            }).join("")}
            <div class="heatmap-cell heatmap-critical"><div class="heatmap-name">Contractor Lifecycle</div><div class="heatmap-score">39</div><div class="heatmap-label">Critical</div></div>
            <div class="heatmap-cell heatmap-warn"><div class="heatmap-name">Attendance Controls</div><div class="heatmap-score">54</div><div class="heatmap-label">Moderate</div></div>
            <div class="heatmap-cell heatmap-ok"><div class="heatmap-name">Worker Experience</div><div class="heatmap-score">71</div><div class="heatmap-label">Low</div></div>
            <div class="heatmap-cell heatmap-warn"><div class="heatmap-name">Analytics</div><div class="heatmap-score">62</div><div class="heatmap-label">Moderate</div></div>
            <div class="heatmap-cell heatmap-warn"><div class="heatmap-name">Learning</div><div class="heatmap-score">57</div><div class="heatmap-label">Moderate</div></div>
            <div class="heatmap-cell heatmap-warn"><div class="heatmap-name">Risk Management</div><div class="heatmap-score">60</div><div class="heatmap-label">Moderate</div></div>
          </div>
        </section>

        <!-- EXECUTIVE REPORTS -->
        <section class="workspace-section stage-wide">
          <div class="workspace-label">Executive Reports — Generated</div>
          <div class="exec-report-list">
            ${reportCards}
          </div>
        </section>

        <!-- EVIDENCE + ACTIONS -->
        <section class="workspace-section">
          <div class="workspace-label">Evidence — all complete</div>
          <div class="evidence-list">
            ${evidenceItems.map(([label, done]) => `
              <div class="evidence-item ${done ? "done" : ""}">
                <span class="evidence-check">${done ? "✓" : "○"}</span>
                ${label}
              </div>
            `).join("")}
          </div>
        </section>

        <section class="workspace-section">
          <div class="workspace-label">Stage conversation</div>
          <div class="conversation-thread">
            ${(conversationByStage["Assessment"] || []).map(([role, message]) => `
              <div class="thread-message"><b>${role}</b><span>${message}</span></div>
            `).join("")}
          </div>
        </section>

        <section class="workspace-section stage-wide">
          <div class="workspace-label">Actions</div>
          <div class="stage-feature-grid">
            <button type="button" data-screen-link="assessment"><b>Open Assessment Engine</b><span>Full drill-down into all 11 categories and scores.</span></button>
            <button type="button" data-tool="mail"><b>Send Executive Report</b><span>Email CHRO, CIO, or Compliance officer from platform.</span></button>
            <button type="button" data-tool="ai"><b>Regenerate Scores</b><span>Re-run AI assessment with updated inputs.</span></button>
            <button type="button" data-screen-link="pipeline"><b>Update DAG Node</b><span>Confirm evidence and advance to Qualified.</span></button>
          </div>
        </section>

      </div>
    `;
  } else {
    // ── SETUP / IN-PROGRESS VIEW ────────────────────────────────────────────────
    qs("#workspaceContent").innerHTML = `
      <div class="stage-detail-layout">
        <section class="workspace-section stage-hero">
          <div>
            <div class="workspace-label">Assessment objective</div>
            <h3>Benchmark workforce maturity for ${client.name}</h3>
            <p>Run an AI-guided assessment, capture maturity and risk scores, then generate executive reports for CHRO, CIO, Compliance, CEO, and Procurement.</p>
          </div>
          <div class="stage-status-grid">
            <div><span>Depth</span><b>Standard</b></div>
            <div><span>Progress</span><b>${stageScore}%</b></div>
            <div><span>Owner</span><b>${client.owner}</b></div>
            <div><span>SPOC</span><b>${client.spoc}</b></div>
          </div>
        </section>

        <section class="workspace-section">
          <div class="workspace-label">Assessment flow</div>
          <div class="stage-step-list">
            <div><b>1. Configure</b><span>Select assessment depth, persona, industry, and recipient.</span></div>
            <div><b>2. Send link</b><span>Generate email or QR invite from RevenueOS.</span></div>
            <div><b>3. Capture answers</b><span>Dynamic AI questions adapt to risk areas and role.</span></div>
            <div><b>4. Score account</b><span>Maturity, risk, compliance, automation, and transformation scores.</span></div>
            <div><b>5. Generate reports</b><span>Create CHRO, CIO, Compliance, CEO, and Procurement views.</span></div>
          </div>
        </section>

        <section class="workspace-section stage-wide">
          <div class="workspace-label">Screens inside this DAG card</div>
          <div class="stage-feature-grid">
            <button type="button" data-tool="mail"><b>Create and Send Assessment</b><span>Assessment type, recipient, email copy, link, QR.</span></button>
            <button type="button"><b>Assessment Wizard</b><span>11-category question flow with adaptive AI follow-ups.</span></button>
            <button type="button" data-screen-link="assessment"><b>Maturity Score Dashboard</b><span>Workforce maturity, risk, compliance, automation, transformation.</span></button>
            <button type="button" data-screen-link="assessment"><b>Risk Exposure Heatmap</b><span>Compliance and operating risk by workforce area.</span></button>
            <button type="button" data-tool="ai"><b>Executive Reports</b><span>CHRO, CIO, Compliance, CEO, Procurement report variants.</span></button>
            <button type="button" data-screen-link="pipeline"><b>Update DAG Node</b><span>Confirm evidence and unlock qualification checks.</span></button>
          </div>
        </section>

        <section class="workspace-section">
          <div class="workspace-label">11 categories</div>
          <div class="compact-chip-grid">
            ${["Workforce Visibility", "Compliance Maturity", "Vendor Governance", "Payroll Governance", "Contractor Lifecycle", "Attendance Controls", "Worker Experience", "Learning", "Analytics", "Risk Management", "AI Readiness"].map((item) => `<span>${item}</span>`).join("")}
          </div>
        </section>

        <section class="workspace-section">
          <div class="workspace-label">Evidence to complete node</div>
          <div class="evidence-list">
            <div class="evidence-item"><span class="evidence-check">○</span>Assessment invite sent</div>
            <div class="evidence-item"><span class="evidence-check">○</span>Answers captured</div>
            <div class="evidence-item"><span class="evidence-check">○</span>Scores reviewed</div>
            <div class="evidence-item"><span class="evidence-check">○</span>Executive report approved</div>
          </div>
          <button class="primary-button workspace-send" type="button" data-tool="ai">Generate Assessment Summary</button>
          <button class="ghost-button workspace-send" type="button" data-tool="mail">Draft Report Email</button>
        </section>
      </div>
    `;
  }

  qs("#stageWorkspace").classList.add("open");
  qs("#stageWorkspace").setAttribute("aria-hidden", "false");
}

function openClientDetails() {
  const client = activeClient();
  renderWorkspaceBreadcrumbs("Client Details", "command");
  qs("#workspaceClient").textContent = `${client.name} - ${client.industry}`;
  qs("#workspaceTitle").textContent = "Client Details";
  qs("#workspaceContent").innerHTML = `
    <div class="workspace-grid">
      <section class="workspace-section">
        <div class="workspace-label">Basic details</div>
        <div class="evidence-list">
          <div>Industry: ${client.industry}</div>
          <div>Region: ${client.region}</div>
          <div>Employees: ${client.employees}</div>
          <div>Source: ${client.source}</div>
        </div>
      </section>
      <section class="workspace-section workspace-main">
        <div class="workspace-label">Account profile</div>
        <div class="client-detail-grid">
          <div><span>Value</span><b>${client.value}</b></div>
          <div><span>Stage</span><b>${client.stage}</b></div>
          <div><span>Health</span><b>${client.health}%</b></div>
          <div><span>Risk</span><b>${client.risk}</b></div>
        </div>
        <div class="workspace-label">Next action</div>
        <textarea class="workspace-draft">${client.next}</textarea>
      </section>
      <section class="workspace-section">
        <div class="workspace-label">SPOC</div>
        <div class="evidence-list">
          <div>${client.spoc}</div>
          <div>${client.role}</div>
          <div>Owner: ${client.owner}</div>
        </div>
        <div class="workspace-label">Open from here</div>
        <button class="primary-button workspace-send" type="button" data-screen-link="pipeline">Open DAG</button>
        <button class="ghost-button workspace-send" type="button" data-tool="mail">Mail SPOC</button>
      </section>
    </div>
  `;
  qs("#stageWorkspace").classList.add("open");
  qs("#stageWorkspace").setAttribute("aria-hidden", "false");
}

function openWorkspace(title) {
  if (title === "Assessment") {
    openAssessmentWorkspace();
    return;
  }

  const client = activeClient();
  const stage = stages.find((item) => item[1] === title);
  const config = stageWorkflows[title] || {
    module: "RevenueOS Workspace",
    tasks: ["Draft email", "Create task", "Generate script", "Update context"],
    draft: "RevenueOS will generate this output from the active client DAG.",
    evidence: ["Client DAG", "Stakeholder map", "Meetings", "Gate status"]
  };
  renderWorkspaceBreadcrumbs(title);
  qs("#workspaceClient").textContent = `${client.name} - ${client.industry} - ${config.module}`;
  qs("#workspaceTitle").textContent = title;
  qs("#workspaceContent").innerHTML = `
    <div class="workspace-grid">
      <section class="workspace-section">
        <div class="workspace-label">Step tasks</div>
        <div class="workspace-task-list">
          ${config.tasks.map((task, index) => `
            <label class="workspace-task">
              <input type="checkbox" ${index < 1 ? "checked" : ""} />
              <span>${task}</span>
            </label>
          `).join("")}
        </div>
      </section>
      <section class="workspace-section workspace-main">
        <div class="workspace-label">AI output</div>
        <div class="workbench-actions">
          <button class="small-button" type="button" data-tool="mail">Open Mail Suite</button>
          <button class="small-button" type="button" data-tool="ai">Generate with AI</button>
          <button class="small-button" type="button">Update Node</button>
        </div>
        <textarea class="workspace-draft">${config.draft.replace("{{client}}", client.name)}</textarea>
      </section>
      <section class="workspace-section">
        <div class="workspace-label">Stage conversation</div>
        <div class="conversation-thread">
          ${(conversationByStage[title] || [["SDR", "Started this stage in RevenueOS."], ["AM", "Waiting for AI output."]]).map(([role, message]) => `
            <div class="thread-message">
              <b>${role}</b>
              <span>${message}</span>
            </div>
          `).join("")}
        </div>
        <div class="workspace-label">Evidence</div>
        <div class="evidence-list">
          ${config.evidence.map((item) => `<div>${item}</div>`).join("")}
        </div>
        <div class="workspace-label">Gate action</div>
        <button class="primary-button workspace-send" type="button">Review and Send</button>
        <button class="ghost-button workspace-send" type="button">Update DAG Node</button>
      </section>
    </div>
  `;
  qs("#stageWorkspace").classList.add("open");
  qs("#stageWorkspace").setAttribute("aria-hidden", "false");
}

function openToolSuite(tool) {
  const client = activeClient();
  const workspaceOpen = qs("#stageWorkspace")?.classList.contains("open");
  const activeStage = workspaceOpen ? qs("#workspaceTitle")?.textContent : client.stage;
  const titles = {
    mail: "Mail Suite",
    linkedin: "LinkedIn Script Studio",
    deck: "Demo Deck Builder",
    script: "Script Studio",
    ai: "AI Copilot"
  };
  renderWorkspaceBreadcrumbs(titles[tool] || "RevenueOS Tool");
  qs("#workspaceClient").textContent = `${client.name} - ${activeStage}`;
  qs("#workspaceTitle").textContent = titles[tool] || "RevenueOS Tool";

  if (tool === "mail") {
    const stageKey = getMailStageKey(activeStage);
    const stageData = mailChainByStage[stageKey] || mailChainByStage["Assessment"];
    const threads = stageData.threads;
    const activeThread = threads[0];

    function initials(name) {
      return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    }

    function renderThreadList(threads, activeId) {
      return threads.map((t) => `
        <button class="mail-thread-item ${t.id === activeId ? "active" : ""}" type="button" data-thread-id="${t.id}">
          <div class="mail-thread-top">
            <span class="mail-thread-contact">${t.contact}</span>
            <span class="mail-thread-date">${t.chain[t.chain.length - 1].date}</span>
          </div>
          <div class="mail-thread-subject ${t.unread ? "unread" : ""}">${t.subject}</div>
          <div class="mail-thread-preview">${t.preview}</div>
          ${t.attachments.length ? `<div class="mail-thread-att">📎 ${t.attachments.length} attachment${t.attachments.length > 1 ? "s" : ""}</div>` : ""}
        </button>
      `).join("");
    }

    function renderChain(thread) {
      return thread.chain.map((msg, idx) => {
        const isOut = msg.dir === "out";
        const avatar = initials(msg.from);
        const atts = msg.attachments.length ? `
          <div class="mail-msg-attachments">
            ${msg.attachments.map((f) => `<span class="mail-att-chip">📎 ${f}</span>`).join("")}
          </div>` : "";
        const bodyLines = msg.body.split("\n").map((l) => `<p>${l}</p>`).join("");
        return `
          <div class="mail-msg ${isOut ? "outbound" : "inbound"}">
            <div class="mail-msg-avatar ${isOut ? "out" : "in"}">${avatar}</div>
            <div class="mail-msg-bubble">
              <div class="mail-msg-header">
                <span class="mail-msg-from">${msg.from}</span>
                <span class="mail-msg-email">&lt;${msg.fromEmail}&gt;</span>
                <span class="mail-msg-time">${msg.date} · ${msg.time}</span>
              </div>
              <div class="mail-msg-to">To: ${msg.to}</div>
              <div class="mail-msg-body">${bodyLines}</div>
              ${atts}
            </div>
          </div>
        `;
      }).join("");
    }

    const lastMsg = activeThread.chain[activeThread.chain.length - 1];
    const replyTo = lastMsg.dir === "in" ? lastMsg.fromEmail : activeThread.email;
    const replyToName = lastMsg.dir === "in" ? lastMsg.from : activeThread.contact;

    qs("#workspaceContent").innerHTML = `
      <div class="mail-client-layout">

        <!-- LEFT: deal phase panel + thread list -->
        <aside class="mail-sidebar">

          <!-- Deal phase card -->
          <div class="mail-deal-panel">
            <div class="mail-deal-header">
              <div class="mail-deal-name">${client.name}</div>
              <div class="mail-deal-meta">${client.industry} · ${client.value}</div>
            </div>
            <div class="mail-deal-vitals">
              <div class="mail-vital">
                <span>Health</span>
                <div class="mail-vital-bar"><i style="width:${client.health}%"></i></div>
                <b class="${client.health >= 70 ? "vital-good" : client.health >= 55 ? "vital-warn" : "vital-bad"}">${client.health}%</b>
              </div>
              <div class="mail-vital">
                <span>Owner</span>
                <b>${client.owner}</b>
              </div>
              <div class="mail-vital">
                <span>SPOC</span>
                <b>${client.spoc}</b>
              </div>
              <div class="mail-vital">
                <span>Risk</span>
                <b class="vital-warn">${client.risk}</b>
              </div>
            </div>

            <!-- Mini pipeline tracker -->
            <div class="mail-pipeline-label">Pipeline position</div>
            <div class="mail-pipeline-track">
              ${stages.map(([num, title,, state]) => {
                const isCurrent = title === activeStage || (title === "Technical" && activeStage === "Technical Evaluation");
                const cls = isCurrent ? "pip-current" : state === "done" ? "pip-done" : state === "active" ? "pip-active" : state === "blocked" ? "pip-blocked" : "pip-locked";
                return `<div class="pip-node ${cls}" title="Stage ${num} · ${title}">
                  <div class="pip-dot"></div>
                  <div class="pip-label">${title}</div>
                </div>`;
              }).join("")}
            </div>

            <div class="mail-next-action">
              <span>Next action</span>
              <p>${client.next}</p>
            </div>
          </div>

          <!-- Thread list -->
          <div class="mail-threads-label">
            <span>Threads · ${activeStage}</span>
            <span>${threads.length}</span>
          </div>
          <div class="mail-thread-list-new" id="mailThreadList">
            ${renderThreadList(threads, activeThread.id)}
          </div>
          <button class="mail-compose-new ghost-button" type="button">+ New thread</button>
        </aside>

        <!-- RIGHT: chain + reply -->
        <div class="mail-chain-col">
          <div class="mail-chain-header">
            <div>
              <div class="mail-chain-subject" id="mailChainSubject">${activeThread.subject}</div>
              <div class="mail-chain-meta">${activeThread.chain.length} messages · ${activeThread.contact} (${activeThread.role})</div>
            </div>
            <div class="mail-chain-actions">
              <button class="small-button" type="button" data-tool="ai">AI summary</button>
              <button class="small-button" type="button">Archive</button>
            </div>
          </div>

          <div class="mail-chain-messages" id="mailChainMessages">
            ${renderChain(activeThread)}
          </div>

          <!-- Reply composer -->
          <div class="mail-reply-box">
            <div class="mail-reply-header">
              <div class="mail-reply-fields">
                <div class="mail-reply-field"><span>From</span><input value="${lastMsg.dir === "in" ? lastMsg.to + " &lt;meera@beeforce.com&gt;" : lastMsg.from + " &lt;" + lastMsg.fromEmail + "&gt;"}" /></div>
                <div class="mail-reply-field"><span>To</span><input value="${replyToName} &lt;${replyTo}&gt;" /></div>
                <div class="mail-reply-field"><span>Subject</span><input value="Re: ${activeThread.subject}" /></div>
              </div>
            </div>
            <textarea class="mail-reply-textarea" placeholder="Write your reply..."></textarea>
            <div class="mail-reply-footer">
              <div class="mail-reply-att-row" id="mailReplyAtts">
                ${activeThread.attachments.map((f) => `<span class="mail-att-chip removable">📎 ${f} ✕</span>`).join("")}
              </div>
              <div class="mail-reply-controls">
                <button class="small-button" type="button" id="mailAiImprove">✦ Improve with AI</button>
                <button class="small-button" type="button">📎 Attach from DAG</button>
                <button class="primary-button" type="button">Send from RevenueOS</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    // wire thread switching
    qs("#mailThreadList").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-thread-id]");
      if (!btn) return;
      const tid = btn.dataset.threadId;
      const t = threads.find((x) => x.id === tid);
      if (!t) return;
      qsa("#mailThreadList .mail-thread-item").forEach((el) => el.classList.toggle("active", el.dataset.threadId === tid));
      qs("#mailChainSubject").textContent = t.subject;
      qs(".mail-chain-meta").textContent = `${t.chain.length} messages · ${t.contact} (${t.role})`;
      qs("#mailChainMessages").innerHTML = renderChain(t);
    });
  } else {
    const body = {
      linkedin: "AI-generated LinkedIn message for the selected stakeholder, based on the current DAG stage, persona, and recent conversation.",
      deck: "AI-generated demo deck outline with pain mapping, module flow, ROI narrative, success stories, and next steps.",
      script: "AI-generated call/demo script with agenda, discovery prompts, objection handling, and close plan.",
      ai: "Ask AI to generate outreach, decks, scripts, proposals, MAP tasks, or gate summaries from this client DAG."
    }[tool] || "AI workspace";
    qs("#workspaceContent").innerHTML = `
      <div class="workspace-grid">
        <section class="workspace-section">
          <div class="workspace-label">Source context</div>
          <div class="evidence-list"><div>${client.name}</div><div>${activeStage}</div><div>${client.risk}</div></div>
        </section>
        <section class="workspace-section workspace-main">
          <div class="workspace-label">Generated output</div>
          <textarea class="workspace-draft">${body}</textarea>
        </section>
        <section class="workspace-section">
          <div class="workspace-label">Actions</div>
          <button class="ghost-button workspace-send" type="button">Regenerate</button>
          <button class="ghost-button workspace-send" type="button">Save to DAG</button>
          <button class="primary-button workspace-send" type="button">Use in Platform</button>
        </section>
      </div>
    `;
  }
  qs("#stageWorkspace").classList.add("open");
  qs("#stageWorkspace").setAttribute("aria-hidden", "false");
}

function openModal(mode = "action") {
  const client = activeClient();
  qs("#modalTitle").textContent = mode === "email" ? "Compose Platform Outreach" : "Create Platform Task";
  qs("#modalSub").textContent = mode === "email"
    ? `AI drafts email, LinkedIn, deck, or demo copy for ${client.name}.`
    : `Assign the next task inside ${client.name}.`;
  const modalClient = qs("#modalClient");
  if (modalClient) modalClient.value = client.name;
  qs("#actionModal").classList.add("open");
  qs("#actionModal").setAttribute("aria-hidden", "false");
}

function closeOverlays() {
  qsa(".workspace-modal,.modal").forEach((node) => {
    node.classList.remove("open");
    node.setAttribute("aria-hidden", "true");
  });
}

function bindEvents() {
  qs("#navList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-screen]");
    if (button) setScreen(button.dataset.screen);
  });

  document.body.addEventListener("click", (event) => {
    const breadcrumbScreen = event.target.closest("[data-breadcrumb-screen]");
    if (breadcrumbScreen) {
      setScreen(breadcrumbScreen.dataset.breadcrumbScreen);
      return;
    }

    const workspaceBack = event.target.closest("[data-workspace-back]");
    if (workspaceBack) {
      closeOverlays();
      setScreen(workspaceBack.dataset.workspaceBack || "pipeline", false);
      return;
    }

    const backTarget = event.target.closest("[data-go-back]");
    if (backTarget) {
      goBack();
      return;
    }

    const clientDetails = event.target.closest("[data-client-details]");
    if (clientDetails) {
      openClientDetails();
      return;
    }

    const drawerTarget = event.target.closest("[data-drawer],[data-stage]");
    if (drawerTarget) openWorkspace(drawerTarget.dataset.drawer || drawerTarget.dataset.stage);
    const toolTarget = event.target.closest("[data-tool]");
    if (toolTarget) openToolSuite(toolTarget.dataset.tool);
    if (event.target.closest(".close-workspace,.close-modal")) closeOverlays();
    if (event.target.classList.contains("workspace-modal") || event.target.classList.contains("modal")) closeOverlays();
    const screenLink = event.target.closest("[data-screen-link]");
    if (screenLink) {
      closeOverlays();
      setScreen(screenLink.dataset.screenLink);
    }
    if (event.target.matches(".switch")) event.target.classList.toggle("on");
  });

  qs("#clientSelect").addEventListener("change", (event) => {
    setActiveClient(event.target.value);
  });

  qs("#openActionBtn").addEventListener("click", () => openModal("action"));
  const draftEmailBtn = qs("#draftEmailBtn");
  if (draftEmailBtn) draftEmailBtn.addEventListener("click", () => openModal("email"));
  qs("#addStakeholderBtn").addEventListener("click", () => openModal("action"));
  qs("#generateReport").addEventListener("click", () => openDrawer("Generated Executive Report"));
  qs("#refreshSignals").addEventListener("click", renderCommand);

  qs("#personaTabs").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    qsa("#personaTabs button").forEach((item) => item.classList.toggle("active", item === button));
    renderPipeline(button.dataset.persona);
  });

  qs("#zoomIn").addEventListener("click", () => setCanvasScale(canvasState.scale + 0.1));
  qs("#zoomOut").addEventListener("click", () => setCanvasScale(canvasState.scale - 0.1));
  qs("#zoomReset").addEventListener("click", () => {
    canvasState = { ...canvasState, x: 60, y: 70, scale: 0.86 };
    applyCanvasTransform();
  });

  qs("#dagFullscreen").addEventListener("click", () => {
    const panel = qs("#canvasPanel");
    const btn = qs("#dagFullscreen");
    const isFs = panel.classList.toggle("dag-fullscreen");
    btn.setAttribute("data-tooltip", isFs ? "Exit fullscreen" : "Fullscreen");
    btn.innerHTML = isFs
      ? `<svg class="app-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M4 4l5 5M15 4h5v5M20 4l-5 5M9 20H4v-5M4 20l5-5M15 20h5v-5M20 20l-5-5"/></svg>`
      : `<svg class="app-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h5M4 4v5M20 4h-5M20 4v5M4 20h5M4 20v-5M20 20h-5M20 20v-5"/></svg>`;
    requestAnimationFrame(applyCanvasTransform);
  });

  const canvas = qs("#dagCanvas");
  canvas.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".stage-card")) return;
    canvasState.dragging = true;
    canvasState.startX = event.clientX - canvasState.x;
    canvasState.startY = event.clientY - canvasState.y;
    canvas.classList.add("dragging");
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!canvasState.dragging) return;
    canvasState.x = event.clientX - canvasState.startX;
    canvasState.y = event.clientY - canvasState.startY;
    applyCanvasTransform();
  });
  canvas.addEventListener("pointerup", (event) => {
    canvasState.dragging = false;
    canvas.classList.remove("dragging");
    canvas.releasePointerCapture(event.pointerId);
  });
  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    setCanvasScale(canvasState.scale + (event.deltaY > 0 ? -0.06 : 0.06));
  }, { passive: false });

  qs("#actionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    closeOverlays();
  });

  qs("#searchInput").addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    qsa(".deal-item,.alert-item,.stage-card,.person-card,.gate-card,.agent-card").forEach((node) => {
      node.style.display = node.textContent.toLowerCase().includes(value) ? "" : "none";
    });
  });
}

function setCanvasScale(nextScale) {
  canvasState.scale = Math.min(1.4, Math.max(0.55, nextScale));
  qs("#zoomReset").textContent = `${Math.round(canvasState.scale * 100)}%`;
  applyCanvasTransform();
}

function applyCanvasTransform() {
  const space = qs("#dagSpace");
  if (!space) return;
  space.style.transform = `translate(${canvasState.x}px, ${canvasState.y}px) scale(${canvasState.scale})`;
  const reset = qs("#zoomReset");
  if (reset) reset.textContent = `${Math.round(canvasState.scale * 100)}%`;
}

function boot() {
  qs("#clientSelect").innerHTML = deals.map((deal, index) => `<option value="${index}">${deal.name}</option>`).join("");
  renderAllScreens();
  bindEvents();
}

boot();
