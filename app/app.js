const placeholderSvg = (label, toneA, toneB) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${toneA}" />
          <stop offset="100%" stop-color="${toneB}" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#g)" rx="20" />
      <circle cx="48" cy="44" r="16" fill="rgba(255,255,255,0.24)" />
      <rect x="28" y="102" width="182" height="20" rx="10" fill="rgba(255,255,255,0.22)" />
      <rect x="28" y="132" width="136" height="14" rx="7" fill="rgba(255,255,255,0.18)" />
      <text x="28" y="82" fill="white" font-size="22" font-family="Avenir Next, Segoe UI, sans-serif">${label}</text>
    </svg>`
  )}`;

const tenants = {
  evergreen: {
    id: "evergreen",
    name: "Evergreen Retail Group",
    industry: "Retail and distribution",
    footprint: "128 stores across Hong Kong, Shenzhen, and Singapore",
    reportingCycle: "CSRD-aligned Q2 cycle",
    kpis: {
      carbon: "1,248 tCO2e",
      storesReporting: "121 / 128",
      supplierCoverage: "84%",
      evidenceLinked: "2,406 files",
    },
    store: {
      name: "Causeway Bay Flagship",
      manager: "May Wong",
    },
    evidence: [
      {
        title: "Cardboard baling batch",
        materialType: "Cardboard",
        weightKg: 42.6,
        zone: "Backroom recycling bay",
        store: "Causeway Bay Flagship",
        note: "Sorted by packaging vendor before pickup.",
        image: placeholderSvg("Cardboard", "#d6764b", "#cda35f"),
        date: "2026-03-27 18:22",
      },
      {
        title: "Plastic film recovery",
        materialType: "Plastic film",
        weightKg: 11.3,
        zone: "Receiving dock",
        store: "Kowloon East Mall",
        note: "Clean wrap from inbound electronics shipments.",
        image: placeholderSvg("Plastic film", "#5f816f", "#264f44"),
        date: "2026-03-27 14:40",
      },
    ],
    logistics: [
      {
        lane: "Shenzhen DC to Hong Kong stores",
        mode: "Electric van",
        distanceKm: 42,
        loadKg: 720,
        carbonKg: 28,
      },
      {
        lane: "Singapore consolidation hub to Orchard stores",
        mode: "Diesel truck",
        distanceKm: 16,
        loadKg: 520,
        carbonKg: 47,
      },
    ],
    suppliers: [
      {
        id: "packaging",
        name: "GreenPack Materials",
        role: "Packaging supplier",
        carbonTco2e: 214,
        share: "17%",
        evidenceCount: 18,
        region: "Guangdong",
        certificates: [
          {
            title: "FSC Chain of Custody",
            expiry: "2027-11-01",
            issuer: "SGS",
            image: placeholderSvg("FSC", "#527b6e", "#1f3b33"),
          },
          {
            title: "ISO 14001",
            expiry: "2028-02-14",
            issuer: "Bureau Veritas",
            image: placeholderSvg("ISO 14001", "#c88863", "#8a5133"),
          },
        ],
        evidence: [
          {
            title: "Recycled kraft roll inspection",
            note: "Moisture-resistant kraft paper pallets documented at source.",
            image: placeholderSvg("Kraft roll", "#b97d4a", "#7c5635"),
          },
        ],
      },
      {
        id: "freight",
        name: "HarborLine Logistics",
        role: "Regional freight partner",
        carbonTco2e: 382,
        share: "31%",
        evidenceCount: 9,
        region: "Pearl River Delta",
        certificates: [
          {
            title: "Smart Freight Centre verified emissions methodology",
            expiry: "2026-12-31",
            issuer: "Smart Freight Centre",
            image: placeholderSvg("Freight cert", "#617f86", "#23404a"),
          },
        ],
        evidence: [
          {
            title: "EV route audit",
            note: "Partial EV conversion completed on Hong Kong last-mile lanes.",
            image: placeholderSvg("EV route", "#41765f", "#17392d"),
          },
          {
            title: "Load factor log",
            note: "Average load factor improved from 61% to 74% this quarter.",
            image: placeholderSvg("Load factor", "#d18a58", "#8e5a34"),
          },
        ],
      },
      {
        id: "ingredients",
        name: "Pacific Ingredients Co.",
        role: "Private-label ingredient processor",
        carbonTco2e: 156,
        share: "12%",
        evidenceCount: 14,
        region: "Vietnam",
        certificates: [
          {
            title: "SA8000 Social Accountability",
            expiry: "2027-06-18",
            issuer: "SAI",
            image: placeholderSvg("SA8000", "#40685f", "#20423a"),
          },
        ],
        evidence: [
          {
            title: "Wastewater treatment photo set",
            note: "Treatment plant overhaul completed in February.",
            image: placeholderSvg("Water treatment", "#689d9d", "#315a63"),
          },
        ],
      },
    ],
  },
  northstar: {
    id: "northstar",
    name: "Northstar Foods",
    industry: "Food manufacturing and retail",
    footprint: "56 stores and 4 regional kitchens",
    reportingCycle: "Annual sustainability statement",
    kpis: {
      carbon: "892 tCO2e",
      storesReporting: "52 / 56",
      supplierCoverage: "76%",
      evidenceLinked: "1,294 files",
    },
    store: {
      name: "Central Kitchen 02",
      manager: "Arjun Patel",
    },
    evidence: [
      {
        title: "Food waste segregation",
        materialType: "Food waste",
        weightKg: 67.2,
        zone: "Organic waste room",
        store: "Central Kitchen 02",
        note: "Separated for anaerobic digestion vendor pickup.",
        image: placeholderSvg("Food waste", "#819d59", "#43552d"),
        date: "2026-03-27 19:05",
      },
      {
        title: "Mixed recyclables dock photo",
        materialType: "Mixed recyclables",
        weightKg: 23.5,
        zone: "Dispatch bay",
        store: "Harbourfront Store",
        note: "Captured after weekend promotional teardown.",
        image: placeholderSvg("Recyclables", "#608170", "#314b41"),
        date: "2026-03-26 16:12",
      },
    ],
    logistics: [
      {
        lane: "Kitchen 02 to urban stores",
        mode: "Electric van",
        distanceKm: 24,
        loadKg: 400,
        carbonKg: 14,
      },
      {
        lane: "Cold storage to airport retail",
        mode: "Air freight",
        distanceKm: 1200,
        loadKg: 88,
        carbonKg: 182,
      },
    ],
    suppliers: [
      {
        id: "protein",
        name: "BlueHarbor Proteins",
        role: "Protein supplier",
        carbonTco2e: 290,
        share: "33%",
        evidenceCount: 11,
        region: "Thailand",
        certificates: [
          {
            title: "BRCGS Food Safety",
            expiry: "2027-04-21",
            issuer: "BRCGS",
            image: placeholderSvg("BRCGS", "#5a8090", "#254757"),
          },
        ],
        evidence: [
          {
            title: "Cold chain compliance images",
            note: "Temperature monitors photographed at loading point.",
            image: placeholderSvg("Cold chain", "#87a8b2", "#48616a"),
          },
        ],
      },
      {
        id: "pack",
        name: "Circular Pack Asia",
        role: "Packaging converter",
        carbonTco2e: 168,
        share: "19%",
        evidenceCount: 7,
        region: "Malaysia",
        certificates: [
          {
            title: "ISCC PLUS",
            expiry: "2026-10-10",
            issuer: "ISCC",
            image: placeholderSvg("ISCC", "#7c9b69", "#334b2a"),
          },
        ],
        evidence: [
          {
            title: "Bio-based resin invoice evidence",
            note: "Invoice and stock photos mapped to batch numbers.",
            image: placeholderSvg("Bio resin", "#91a15a", "#57602b"),
          },
        ],
      },
    ],
  },
};

const state = {
  tenantId: "evergreen",
  role: "store",
  selectedNodeId: "packaging",
};

const els = {
  tenantSelect: document.getElementById("tenant-select"),
  tenantNote: document.getElementById("tenant-note"),
  personaSwitch: document.getElementById("persona-switch"),
  summaryStrip: document.getElementById("summary-strip"),
  storeName: document.getElementById("store-name"),
  evidenceList: document.getElementById("evidence-list"),
  metricGrid: document.getElementById("metric-grid"),
  logisticsList: document.getElementById("logistics-list"),
  reportOutput: document.getElementById("report-output"),
  supplyChainList: document.getElementById("supply-chain-list"),
  detailTitle: document.getElementById("detail-title"),
  detailPanel: document.getElementById("detail-panel"),
  storeForm: document.getElementById("store-form"),
  logisticsForm: document.getElementById("logistics-form"),
  generateReport: document.getElementById("generate-report"),
  views: Array.from(document.querySelectorAll(".view-panel")),
};

function activeTenant() {
  return tenants[state.tenantId];
}

function formatKg(value) {
  return `${Number(value).toFixed(1)} kg`;
}

function renderTenants() {
  els.tenantSelect.innerHTML = Object.values(tenants)
    .map(
      (tenant) =>
        `<option value="${tenant.id}" ${tenant.id === state.tenantId ? "selected" : ""}>${tenant.name}</option>`
    )
    .join("");
}

function renderPersonaSwitch() {
  const items = [
    { id: "store", label: "Store manager" },
    { id: "admin", label: "ESG admin" },
    { id: "executive", label: "Executive" },
  ];
  els.personaSwitch.innerHTML = items
    .map(
      (item) =>
        `<button class="persona-chip ${item.id === state.role ? "active" : ""}" data-role="${item.id}">${item.label}</button>`
    )
    .join("");
  els.personaSwitch.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.role = button.dataset.role;
      render();
    });
  });
}

function renderSummary() {
  const tenant = activeTenant();
  els.tenantNote.textContent = `${tenant.industry}. ${tenant.footprint}. Reporting cycle: ${tenant.reportingCycle}.`;
  const summaryCards = [
    { label: "Carbon footprint", value: tenant.kpis.carbon, helper: "Across tenant network" },
    { label: "Sites reporting", value: tenant.kpis.storesReporting, helper: "Store and facility participation" },
    { label: "Supplier coverage", value: tenant.kpis.supplierCoverage, helper: "Suppliers with mapped credentials" },
    { label: "Evidence linked", value: tenant.kpis.evidenceLinked, helper: "Photos, certificates, and logs" },
  ];
  els.summaryStrip.innerHTML = summaryCards
    .map(
      (item) =>
        `<article class="summary-card"><p class="eyebrow">${item.label}</p><strong>${item.value}</strong><span>${item.helper}</span></article>`
    )
    .join("");
}

function renderStoreView() {
  const tenant = activeTenant();
  els.storeName.textContent = `${tenant.store.name} • ${tenant.store.manager}`;
  els.evidenceList.innerHTML = tenant.evidence
    .slice()
    .reverse()
    .map(
      (item) => `
        <article class="evidence-item">
          <div class="evidence-thumb"><img src="${item.image}" alt="${item.title}" /></div>
          <div class="evidence-meta">
            <h4>${item.title}</h4>
            <div class="mini-meta">
              <span>${item.store}</span>
              <span>${item.materialType}</span>
              <span>${formatKg(item.weightKg)}</span>
              <span>${item.date}</span>
            </div>
            <p>${item.note}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderAdminView() {
  const tenant = activeTenant();
  els.metricGrid.innerHTML = [
    {
      title: "Scope 1 + 2",
      value: tenant.kpis.carbon,
      helper: "Latest modelled total",
    },
    {
      title: "Evidence freshness",
      value: `${tenant.evidence.length} live`,
      helper: "Recent store submissions",
    },
    {
      title: "Open review items",
      value: `${Math.max(3, tenant.evidence.length - 1)}`,
      helper: "Awaiting admin decision",
    },
    {
      title: "Supplier credentials",
      value: `${tenant.suppliers.reduce((sum, s) => sum + s.certificates.length, 0)}`,
      helper: "Certificates on file",
    },
  ]
    .map(
      (metric) => `
        <article class="metric-card">
          <p class="eyebrow">${metric.title}</p>
          <strong>${metric.value}</strong>
          <span>${metric.helper}</span>
        </article>
      `
    )
    .join("");

  els.logisticsList.innerHTML = tenant.logistics
    .map(
      (entry) => `
        <article class="table-row">
          <strong>${entry.lane}</strong>
          <span>${entry.mode} • ${entry.distanceKm} km • ${entry.loadKg} kg load • ${entry.carbonKg} kgCO2e</span>
        </article>
      `
    )
    .join("");
}

function renderExecutiveView() {
  const tenant = activeTenant();
  els.supplyChainList.innerHTML = tenant.suppliers
    .map(
      (supplier) => `
        <button class="supply-node" data-node-id="${supplier.id}">
          <strong>${supplier.name}</strong>
          <span>${supplier.role} • ${supplier.region}</span>
          <span>${supplier.carbonTco2e} tCO2e • ${supplier.share} of tenant footprint • ${supplier.evidenceCount} evidence items</span>
        </button>
      `
    )
    .join("");

  els.supplyChainList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedNodeId = button.dataset.nodeId;
      renderExecutiveDetail();
    });
  });

  renderExecutiveDetail();
}

function renderExecutiveDetail() {
  const tenant = activeTenant();
  const supplier =
    tenant.suppliers.find((item) => item.id === state.selectedNodeId) || tenant.suppliers[0];
  state.selectedNodeId = supplier.id;
  els.detailTitle.textContent = supplier.name;

  const evidenceMarkup = supplier.evidence
    .map(
      (item) => `
        <div class="gallery-item">
          <div class="evidence-thumb"><img src="${item.image}" alt="${item.title}" /></div>
          <strong>${item.title}</strong>
          <span class="detail-meta">${item.note}</span>
        </div>
      `
    )
    .join("");

  const certificateMarkup = supplier.certificates
    .map(
      (cert) => `
        <div class="certificate-row">
          <div class="certificate-thumb"><img src="${cert.image}" alt="${cert.title}" /></div>
          <div class="certificate-copy">
            <p><strong>${cert.title}</strong></p>
            <span>${cert.issuer}</span><br />
            <span class="mono">Expires ${cert.expiry}</span>
          </div>
        </div>
      `
    )
    .join("");

  els.detailPanel.innerHTML = `
    <section class="detail-section">
      <div class="detail-kpis">
        <div class="detail-kpi">
          <p class="eyebrow">Carbon</p>
          <strong>${supplier.carbonTco2e}</strong>
          <span>tCO2e</span>
        </div>
        <div class="detail-kpi">
          <p class="eyebrow">Footprint share</p>
          <strong>${supplier.share}</strong>
          <span>Of tenant emissions</span>
        </div>
        <div class="detail-kpi">
          <p class="eyebrow">Evidence linked</p>
          <strong>${supplier.evidenceCount}</strong>
          <span>Files in audit trail</span>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <p class="eyebrow">Evidence trail</p>
      <div class="gallery">${evidenceMarkup}</div>
    </section>
    <section class="detail-section">
      <p class="eyebrow">Supplier certificates</p>
      <div class="certificate-list">${certificateMarkup}</div>
    </section>
  `;
}

function renderReportOutput() {
  const tenant = activeTenant();
  const wasteTotal = tenant.evidence
    .reduce((sum, item) => sum + Number(item.weightKg), 0)
    .toFixed(1);
  const logisticsCarbon = tenant.logistics.reduce((sum, item) => sum + item.carbonKg, 0);
  const highestSupplier = tenant.suppliers
    .slice()
    .sort((a, b) => b.carbonTco2e - a.carbonTco2e)[0];

  els.reportOutput.innerHTML = `
    <h4>${tenant.name} ESG draft report</h4>
    <p>
      ${tenant.name} is currently reporting ${tenant.kpis.carbon} across its operational
      and upstream footprint, with ${tenant.kpis.storesReporting} reporting sites and
      ${tenant.kpis.supplierCoverage} supplier coverage in the mapped supply chain.
    </p>
    <p>
      During the current reporting cycle, stores uploaded ${tenant.evidence.length}
      evidence submissions representing ${wasteTotal} kg of material observations, each
      attached to store-level notes and photo evidence for audit review.
    </p>
    <p>
      Logistics records in scope currently account for ${logisticsCarbon} kgCO2e, with
      the highest-emitting mapped supply-chain component being ${highestSupplier.name}
      at ${highestSupplier.carbonTco2e} tCO2e. Executive drill-down remains available
      for supporting evidence and current certifications.
    </p>
    <ul>
      <li>All generated copy in the final system should remain reviewable before publication.</li>
      <li>Each KPI should link to source data, evidence photos, and supplier credentials.</li>
      <li>Tenants need role-based access for store, admin, and executive users.</li>
    </ul>
  `;
}

function setActiveView() {
  els.views.forEach((view) => {
    view.classList.toggle("active", view.dataset.view === state.role);
  });
}

function render() {
  renderTenants();
  renderPersonaSwitch();
  renderSummary();
  renderStoreView();
  renderAdminView();
  renderExecutiveView();
  renderReportOutput();
  setActiveView();
}

els.tenantSelect.addEventListener("change", (event) => {
  state.tenantId = event.target.value;
  const tenant = activeTenant();
  state.selectedNodeId = tenant.suppliers[0].id;
  render();
});

els.storeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const tenant = activeTenant();
  const file = form.get("photo");
  const image =
    file && file.size > 0
      ? URL.createObjectURL(file)
      : placeholderSvg(form.get("materialType"), "#5f816f", "#2c4b43");

  tenant.evidence.push({
    title: `${form.get("materialType")} upload`,
    materialType: String(form.get("materialType")),
    weightKg: Number(form.get("weightKg")),
    zone: String(form.get("zone")),
    store: tenant.store.name,
    note: String(form.get("notes")),
    image,
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
  });

  renderStoreView();
  renderAdminView();
  renderReportOutput();
  event.currentTarget.reset();
});

els.logisticsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const mode = String(form.get("mode"));
  const distanceKm = Number(form.get("distanceKm"));
  const loadKg = Number(form.get("loadKg"));
  const factor = {
    "Electric van": 0.04,
    "Diesel truck": 0.11,
    "Ocean freight": 0.02,
    "Air freight": 1.72,
  }[mode];

  activeTenant().logistics.unshift({
    lane: String(form.get("lane")),
    mode,
    distanceKm,
    loadKg,
    carbonKg: Math.round(distanceKm * loadKg * factor * 0.01),
  });

  renderAdminView();
  renderReportOutput();
  event.currentTarget.reset();
});

els.generateReport.addEventListener("click", () => {
  renderReportOutput();
  state.role = "admin";
  render();
});

render();
