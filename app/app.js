const placeholderSvg = (toneA, toneB) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${toneA}" />
          <stop offset="100%" stop-color="${toneB}" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#g)" />
      <rect width="240" height="180" fill="rgba(255,255,255,0.18)" />
      <rect x="24" y="22" width="88" height="136" fill="rgba(255,255,255,0.16)" />
      <circle cx="176" cy="58" r="36" fill="rgba(255,255,255,0.16)" />
      <path d="M124 122 C154 94, 182 94, 214 122" fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="1.3" />
      <rect x="0" y="142" width="240" height="38" fill="rgba(17,17,17,0.12)" />
    </svg>`
  )}`;

const tenants = {
  evergreen: {
    id: "evergreen",
    name: "Evergreen Retail Group",
    industry: "Retail and distribution",
    footprint: "128 stores across Hong Kong, Shenzhen, and Singapore",
    reportingCycle: "CSRD-aligned Q2 cycle",
    store: {
      name: "Causeway Bay Flagship",
      manager: "May Wong",
      pendingToday: 3,
      submittedToday: 7,
      shiftWindow: "14:00 collection cut-off",
    },
    kpis: {
      carbon: "1,248 tCO2e",
      storesReporting: "121 / 128",
      supplierCoverage: "84%",
      evidenceLinked: "2,406 files",
    },
    evidence: [
      {
        title: "Cardboard baling batch",
        materialType: "Cardboard",
        weightKg: 42.6,
        zone: "Backroom recycling bay",
        store: "Causeway Bay Flagship",
        note: "Sorted by packaging vendor before pickup.",
        image: placeholderSvg("#d7c3a6", "#8e755d"),
        date: "2026-03-27 18:22",
      },
      {
        title: "Plastic film recovery",
        materialType: "Plastic film",
        weightKg: 11.3,
        zone: "Receiving dock",
        store: "Kowloon East Mall",
        note: "Clean wrap from inbound electronics shipments.",
        image: placeholderSvg("#d8ddd4", "#71806e"),
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
            image: placeholderSvg("#d9d8cf", "#7f8c6d"),
          },
          {
            title: "ISO 14001",
            expiry: "2028-02-14",
            issuer: "Bureau Veritas",
            image: placeholderSvg("#ddd1c3", "#9b7b61"),
          },
        ],
        evidence: [
          {
            title: "Recycled kraft roll inspection",
            note: "Moisture-resistant kraft paper pallets documented at source.",
            image: placeholderSvg("#d8c0a1", "#8d694b"),
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
            title: "Verified emissions methodology",
            expiry: "2026-12-31",
            issuer: "Smart Freight Centre",
            image: placeholderSvg("#d2d8dc", "#6b7f8e"),
          },
        ],
        evidence: [
          {
            title: "EV route audit",
            note: "Partial EV conversion completed on Hong Kong last-mile lanes.",
            image: placeholderSvg("#d2ddd6", "#617a68"),
          },
          {
            title: "Load factor log",
            note: "Average load factor improved from 61% to 74% this quarter.",
            image: placeholderSvg("#e0c7aa", "#9d734e"),
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
            image: placeholderSvg("#ccd7d0", "#63796e"),
          },
        ],
        evidence: [
          {
            title: "Wastewater treatment photo set",
            note: "Treatment plant overhaul completed in February.",
            image: placeholderSvg("#d6dfde", "#6a8e93"),
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
    store: {
      name: "Central Kitchen 02",
      manager: "Arjun Patel",
      pendingToday: 2,
      submittedToday: 5,
      shiftWindow: "17:00 kitchen close audit",
    },
    kpis: {
      carbon: "892 tCO2e",
      storesReporting: "52 / 56",
      supplierCoverage: "76%",
      evidenceLinked: "1,294 files",
    },
    evidence: [
      {
        title: "Food waste segregation",
        materialType: "Food waste",
        weightKg: 67.2,
        zone: "Organic waste room",
        store: "Central Kitchen 02",
        note: "Separated for anaerobic digestion vendor pickup.",
        image: placeholderSvg("#dde1c6", "#7e8f5a"),
        date: "2026-03-27 19:05",
      },
      {
        title: "Mixed recyclables dock photo",
        materialType: "Mixed recyclables",
        weightKg: 23.5,
        zone: "Dispatch bay",
        store: "Harbourfront Store",
        note: "Captured after weekend promotional teardown.",
        image: placeholderSvg("#d2ddd5", "#6a7f72"),
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
            image: placeholderSvg("#d2dae0", "#617d91"),
          },
        ],
        evidence: [
          {
            title: "Cold chain compliance images",
            note: "Temperature monitors photographed at loading point.",
            image: placeholderSvg("#d8e0e3", "#6f8791"),
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
            image: placeholderSvg("#dde0cb", "#7e8a5b"),
          },
        ],
        evidence: [
          {
            title: "Bio-based resin invoice evidence",
            note: "Invoice and stock photos mapped to batch numbers.",
            image: placeholderSvg("#e0d7b8", "#8b7e49"),
          },
        ],
      },
    ],
  },
};

const page = document.body.dataset.page || "home";
const routePrefix = document.body.dataset.routePrefix || ".";
const initialTenantId = new URLSearchParams(window.location.search).get("tenant");
const storagePrefix = "tracelight.store";

const state = {
  tenantId: tenants[initialTenantId] ? initialTenantId : "evergreen",
  selectedSupplierId: null,
};

const els = {
  tenantSelect: document.getElementById("tenant-select"),
  tenantNote: document.getElementById("tenant-note"),
  roleNav: document.getElementById("role-nav"),
  roleCardGrid: document.getElementById("role-card-grid"),
  storeQuickGrid: document.getElementById("store-quick-grid"),
  storeName: document.getElementById("store-name"),
  connectionState: document.getElementById("connection-state"),
  connectionCopy: document.getElementById("connection-copy"),
  connectionToggle: document.getElementById("connection-toggle"),
  queuePill: document.getElementById("queue-pill"),
  syncQueueButton: document.getElementById("sync-queue-button"),
  evidenceList: document.getElementById("evidence-list"),
  queueList: document.getElementById("queue-list"),
  storeForm: document.getElementById("store-form"),
  submitStateLabel: document.getElementById("submit-state-label"),
  submitStateCopy: document.getElementById("submit-state-copy"),
  storeSubmitButton: document.getElementById("store-submit-button"),
  metricGrid: document.getElementById("metric-grid"),
  reviewList: document.getElementById("review-list"),
  logisticsForm: document.getElementById("logistics-form"),
  logisticsList: document.getElementById("logistics-list"),
  generateReport: document.getElementById("generate-report"),
  reportOutput: document.getElementById("report-output"),
  executiveKpis: document.getElementById("executive-kpis"),
  supplierList: document.getElementById("supplier-list"),
  detailTitle: document.getElementById("detail-title"),
  detailPanel: document.getElementById("detail-panel"),
};

const roleMeta = {
  store: {
    label: "Store manager",
    description: "Upload photos, enter material type and weight, and send clean evidence before collection cut-off.",
  },
  admin: {
    label: "ESG admin",
    description: "Review incoming evidence, log operational records, and prepare reporting output.",
  },
  executive: {
    label: "Executive",
    description: "Track footprint by supplier, inspect evidence, and review supporting credentials.",
  },
};

function activeTenant() {
  return tenants[state.tenantId];
}

function readJson(key, fallbackValue) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage issues in static demo mode.
  }
}

function queueStorageKey(tenantId) {
  return `${storagePrefix}.queue.${tenantId}`;
}

function offlineStorageKey(tenantId) {
  return `${storagePrefix}.offline.${tenantId}`;
}

function currentStoreQueue() {
  return readJson(queueStorageKey(state.tenantId), []);
}

function setCurrentStoreQueue(queue) {
  writeJson(queueStorageKey(state.tenantId), queue);
}

function currentStoreOffline() {
  return readJson(offlineStorageKey(state.tenantId), false) === true;
}

function setCurrentStoreOffline(isOffline) {
  writeJson(offlineStorageKey(state.tenantId), isOffline === true);
}

function formatKg(value) {
  return `${Number(value).toFixed(1)} kg`;
}

function emptyStateMarkup(copy) {
  return `<div class="empty-state">${copy}</div>`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function buildStoreSubmission(form) {
  const tenant = activeTenant();
  const file = form.get("photo");
  let image = placeholderSvg("#d8ddd4", "#71806e");

  if (file instanceof File && file.size > 0) {
    try {
      image = await readFileAsDataUrl(file);
    } catch {
      image = placeholderSvg("#d8ddd4", "#71806e");
    }
  }

  return {
    title: `${form.get("materialType")} upload`,
    materialType: String(form.get("materialType")),
    weightKg: Number(form.get("weightKg")),
    zone: String(form.get("zone")),
    store: tenant.store.name,
    note: String(form.get("notes")),
    image,
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
  };
}

function routeFor(roleId) {
  const params = new URLSearchParams();
  params.set("tenant", state.tenantId);
  return `${routePrefix}/${roleId}/?${params.toString()}`;
}

function syncTenantQueryParam() {
  const url = new URL(window.location.href);
  url.searchParams.set("tenant", state.tenantId);
  window.history.replaceState({}, "", url);
}

function reviewQueueForTenant(tenant) {
  const latestEvidence = tenant.evidence[0];
  const supplier = tenant.suppliers[0];
  const logistics = tenant.logistics[0];
  return [
    {
      title: `${latestEvidence.store} evidence review`,
      copy: `${latestEvidence.materialType} entry at ${formatKg(latestEvidence.weightKg)} is waiting for admin validation.`,
    },
    {
      title: `${supplier.name} credential check`,
      copy: `${supplier.certificates[0].title} is on file. Confirm expiry and supplier coverage before reporting.`,
    },
    {
      title: `${logistics.lane} transport record`,
      copy: `${logistics.mode} lane logged at ${logistics.carbonKg} kgCO2e. Confirm load factor assumptions.`,
    },
  ];
}

function reportSummaryForTenant(tenant) {
  const totalObservedKg = tenant.evidence
    .reduce((sum, item) => sum + Number(item.weightKg), 0)
    .toFixed(1);
  const totalLogisticsKg = tenant.logistics.reduce((sum, item) => sum + item.carbonKg, 0);
  const topSupplier = tenant.suppliers.slice().sort((a, b) => b.carbonTco2e - a.carbonTco2e)[0];

  return `
    <h3>${tenant.name} draft report</h3>
    <p>${tenant.name} is reporting ${tenant.kpis.carbon} across its mapped footprint for the ${tenant.reportingCycle.toLowerCase()}.</p>
    <p>Store and facility teams submitted ${tenant.evidence.length} recent evidence entries covering ${totalObservedKg} kg of observed materials, each linked to location and note metadata.</p>
    <p>Current logistics records contribute ${totalLogisticsKg} kgCO2e in the working draft, while the highest emitting mapped supplier is ${topSupplier.name} at ${topSupplier.carbonTco2e} tCO2e.</p>
    <ul>
      <li>Keep measured values separate from estimates.</li>
      <li>Maintain links to evidence and supplier credentials.</li>
      <li>Require human approval before final publication.</li>
    </ul>
  `;
}

function renderTenantSelect() {
  if (!els.tenantSelect) return;
  els.tenantSelect.innerHTML = Object.values(tenants)
    .map(
      (tenant) =>
        `<option value="${tenant.id}" ${tenant.id === state.tenantId ? "selected" : ""}>${tenant.name}</option>`
    )
    .join("");
}

function renderRoleNav() {
  if (!els.roleNav) return;
  const items = ["store", "admin", "executive"];
  els.roleNav.innerHTML = items
    .map((roleId) => {
      const isActive = page === roleId;
      return `<a class="role-link ${isActive ? "is-active" : ""}" href="${routeFor(roleId)}" ${isActive ? 'aria-current="page"' : ""}>${roleMeta[roleId].label}</a>`;
    })
    .join("");
}

function renderTenantNote() {
  if (!els.tenantNote) return;
  const tenant = activeTenant();

  if (page === "store") {
    els.tenantNote.textContent = `${tenant.store.name} • ${tenant.store.manager} • ${tenant.store.shiftWindow}`;
    return;
  }

  if (page === "admin") {
    els.tenantNote.textContent = `${tenant.name} is on the ${tenant.reportingCycle} with ${tenant.kpis.storesReporting} reporting sites and ${tenant.kpis.evidenceLinked} linked evidence files.`;
    return;
  }

  if (page === "executive") {
    els.tenantNote.textContent = `${tenant.name} spans ${tenant.footprint} with ${tenant.kpis.supplierCoverage} supplier coverage across the mapped supply chain.`;
    return;
  }

  els.tenantNote.textContent = `${tenant.name} • ${tenant.industry} • ${tenant.footprint}`;
}

function renderHome() {
  if (!els.roleCardGrid) return;
  els.roleCardGrid.innerHTML = Object.entries(roleMeta)
    .map(
      ([roleId, meta]) => `
        <article class="role-card">
          <p class="eyebrow">${meta.label}</p>
          <h2>${meta.label} workspace</h2>
          <p>${meta.description}</p>
          <a class="primary-button" href="${routeFor(roleId)}">Open workspace</a>
        </article>
      `
    )
    .join("");
}

function renderStorePage() {
  if (!els.storeQuickGrid || !els.storeName || !els.evidenceList) return;
  const tenant = activeTenant();
  const queue = currentStoreQueue();
  const isOffline = currentStoreOffline();

  els.storeName.textContent = `${tenant.store.name} • ${tenant.store.manager}`;

  els.storeQuickGrid.innerHTML = [
    { label: "Synced today", value: tenant.store.submittedToday, helper: "Uploads live in portal" },
    { label: "Still needed", value: tenant.store.pendingToday, helper: "Open capture tasks" },
    { label: "Queued", value: queue.length, helper: isOffline ? "Waiting for connection" : "Ready to sync" },
  ]
    .map(
      (item) => `
        <article class="quick-card">
          <p class="eyebrow">${item.label}</p>
          <strong>${item.value}</strong>
          <span>${item.helper}</span>
        </article>
      `
    )
    .join("");

  if (els.connectionState) {
    els.connectionState.textContent = isOffline ? "Offline capture mode" : "Online and ready";
  }

  if (els.connectionCopy) {
    els.connectionCopy.textContent = isOffline
      ? "New uploads will stay on this device until you reconnect. You can continue capturing photos and material details normally."
      : queue.length
        ? `${queue.length} upload${queue.length === 1 ? "" : "s"} waiting. Sync them now or keep collecting.`
        : "Everything you submit now will sync directly into the tenant evidence list.";
  }

  if (els.connectionToggle) {
    els.connectionToggle.textContent = isOffline ? "Go online" : "Work offline";
  }

  if (els.queuePill) {
    els.queuePill.textContent = `${queue.length} queued`;
  }

  if (els.syncQueueButton) {
    els.syncQueueButton.hidden = isOffline || queue.length === 0;
    els.syncQueueButton.disabled = isOffline || queue.length === 0;
  }

  if (els.submitStateLabel) {
    els.submitStateLabel.textContent = isOffline ? "Queue on this device" : "Upload to portal";
  }

  if (els.submitStateCopy) {
    els.submitStateCopy.textContent = isOffline
      ? "Your entry will be saved locally until you reconnect."
      : "Send this evidence straight into the ESG review flow.";
  }

  if (els.storeSubmitButton) {
    els.storeSubmitButton.textContent = isOffline ? "Save to queue" : "Upload evidence";
  }

  els.evidenceList.innerHTML = tenant.evidence
    .map(
      (item) => `
        <article class="simple-item media-item">
          <div class="media-thumb"><img src="${item.image}" alt="${item.title}" /></div>
          <div>
            <strong>${item.title}</strong>
            <div class="meta-row">
              <span>${item.materialType}</span>
              <span>${formatKg(item.weightKg)}</span>
              <span>${item.zone}</span>
            </div>
            <p>${item.note}</p>
            <span>${item.date}</span>
          </div>
        </article>
      `
    )
    .join("");

  if (els.queueList) {
    els.queueList.innerHTML = queue.length
      ? queue
          .map(
            (item) => `
              <article class="simple-item">
                <strong>${item.title}</strong>
                <div class="meta-row">
                  <span>${item.materialType}</span>
                  <span>${formatKg(item.weightKg)}</span>
                  <span>${item.zone}</span>
                </div>
                <p>${item.note}</p>
                <span>${item.date}</span>
              </article>
            `
          )
          .join("")
      : emptyStateMarkup("No queued uploads. When the device is offline, new captures will appear here until you sync them.");
  }
}

function renderAdminPage() {
  const tenant = activeTenant();

  if (els.metricGrid) {
    els.metricGrid.innerHTML = [
      { label: "Carbon", value: tenant.kpis.carbon, helper: "Current working footprint" },
      { label: "Sites reporting", value: tenant.kpis.storesReporting, helper: "Submitted this cycle" },
      { label: "Supplier coverage", value: tenant.kpis.supplierCoverage, helper: "Mapped supplier credentials" },
      { label: "Evidence linked", value: tenant.kpis.evidenceLinked, helper: "Photos and files attached" },
    ]
      .map(
        (item) => `
          <article class="kpi-card">
            <p class="eyebrow">${item.label}</p>
            <strong>${item.value}</strong>
            <span>${item.helper}</span>
          </article>
        `
      )
      .join("");
  }

  if (els.reviewList) {
    els.reviewList.innerHTML = reviewQueueForTenant(tenant)
      .map(
        (item) => `
          <article class="simple-item">
            <strong>${item.title}</strong>
            <p>${item.copy}</p>
          </article>
        `
      )
      .join("");
  }

  if (els.logisticsList) {
    els.logisticsList.innerHTML = tenant.logistics
      .map(
        (entry) => `
          <article class="simple-item">
            <strong>${entry.lane}</strong>
            <p>${entry.mode} • ${entry.distanceKm} km • ${entry.loadKg} kg load</p>
            <span>${entry.carbonKg} kgCO2e</span>
          </article>
        `
      )
      .join("");
  }

  if (els.reportOutput) {
    els.reportOutput.innerHTML = reportSummaryForTenant(tenant);
  }
}

function renderExecutiveDetail() {
  if (!els.detailTitle || !els.detailPanel) return;
  const tenant = activeTenant();
  const supplier =
    tenant.suppliers.find((item) => item.id === state.selectedSupplierId) || tenant.suppliers[0];
  state.selectedSupplierId = supplier.id;

  els.detailTitle.textContent = supplier.name;

  const evidenceMarkup = supplier.evidence
    .map(
      (item) => `
        <div class="detail-block">
          <h3>${item.title}</h3>
          <div class="media-thumb"><img src="${item.image}" alt="${item.title}" /></div>
          <p>${item.note}</p>
        </div>
      `
    )
    .join("");

  const certificateMarkup = supplier.certificates
    .map(
      (cert) => `
        <div class="certificate-row">
          <div class="certificate-thumb"><img src="${cert.image}" alt="${cert.title}" /></div>
          <div>
            <strong>${cert.title}</strong>
            <p>${cert.issuer}</p>
            <span class="mono">Expires ${cert.expiry}</span>
          </div>
        </div>
      `
    )
    .join("");

  els.detailPanel.innerHTML = `
    <section class="detail-grid">
      <article class="detail-block">
        <p class="eyebrow">Carbon</p>
        <strong>${supplier.carbonTco2e}</strong>
        <span>tCO2e</span>
      </article>
      <article class="detail-block">
        <p class="eyebrow">Footprint share</p>
        <strong>${supplier.share}</strong>
        <span>Of tenant emissions</span>
      </article>
      <article class="detail-block">
        <p class="eyebrow">Evidence linked</p>
        <strong>${supplier.evidenceCount}</strong>
        <span>Files in audit trail</span>
      </article>
    </section>
    <section class="detail-block">
      <h3>Supplier evidence</h3>
      ${evidenceMarkup}
    </section>
    <section class="detail-block">
      <h3>Certificates and qualifications</h3>
      ${certificateMarkup}
    </section>
  `;
}

function renderExecutivePage() {
  const tenant = activeTenant();
  if (!tenant.suppliers.length) return;
  if (!state.selectedSupplierId) {
    state.selectedSupplierId = tenant.suppliers[0].id;
  }

  if (els.executiveKpis) {
    const topSupplier = tenant.suppliers.slice().sort((a, b) => b.carbonTco2e - a.carbonTco2e)[0];
    els.executiveKpis.innerHTML = [
      { label: "Total footprint", value: tenant.kpis.carbon, helper: "Current mapped emissions" },
      { label: "Top supplier", value: topSupplier.name, helper: `${topSupplier.carbonTco2e} tCO2e contribution` },
      { label: "Supplier coverage", value: tenant.kpis.supplierCoverage, helper: "With evidence and credentials" },
      { label: "Evidence linked", value: tenant.kpis.evidenceLinked, helper: "Proof available for drill-down" },
    ]
      .map(
        (item) => `
          <article class="kpi-card">
            <p class="eyebrow">${item.label}</p>
            <strong>${item.value}</strong>
            <span>${item.helper}</span>
          </article>
        `
      )
      .join("");
  }

  if (els.supplierList) {
    els.supplierList.innerHTML = tenant.suppliers
      .map(
        (supplier) => `
          <button class="supplier-button ${supplier.id === state.selectedSupplierId ? "is-active" : ""}" data-supplier-id="${supplier.id}">
            <strong>${supplier.name}</strong>
            <p>${supplier.role} • ${supplier.region}</p>
            <span>${supplier.carbonTco2e} tCO2e • ${supplier.share} of footprint</span>
          </button>
        `
      )
      .join("");

    els.supplierList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedSupplierId = button.dataset.supplierId;
        renderExecutivePage();
      });
    });
  }

  renderExecutiveDetail();
}

function render() {
  syncTenantQueryParam();
  renderTenantSelect();
  renderRoleNav();
  renderTenantNote();

  if (page === "home") renderHome();
  if (page === "store") renderStorePage();
  if (page === "admin") renderAdminPage();
  if (page === "executive") renderExecutivePage();
}

if (els.tenantSelect) {
  els.tenantSelect.addEventListener("change", (event) => {
    state.tenantId = event.target.value;
    state.selectedSupplierId = null;
    render();
  });
}

if (els.storeForm) {
  els.storeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const tenant = activeTenant();
    const submission = await buildStoreSubmission(form);
    const isOffline = currentStoreOffline();

    if (isOffline) {
      const queue = currentStoreQueue();
      queue.unshift(submission);
      setCurrentStoreQueue(queue);
    } else {
      tenant.evidence.unshift(submission);
      tenant.store.submittedToday += 1;
    }

    tenant.store.pendingToday = Math.max(0, tenant.store.pendingToday - 1);
    renderStorePage();
    event.currentTarget.reset();
  });
}

if (els.connectionToggle) {
  els.connectionToggle.addEventListener("click", () => {
    setCurrentStoreOffline(!currentStoreOffline());
    renderStorePage();
  });
}

if (els.syncQueueButton) {
  els.syncQueueButton.addEventListener("click", () => {
    if (currentStoreOffline()) return;
    const queue = currentStoreQueue();
    if (!queue.length) return;

    const tenant = activeTenant();
    tenant.evidence.unshift(...queue);
    tenant.store.submittedToday += queue.length;
    setCurrentStoreQueue([]);
    renderStorePage();
  });
}

if (els.logisticsForm) {
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

    renderAdminPage();
    event.currentTarget.reset();
  });
}

if (els.generateReport) {
  els.generateReport.addEventListener("click", () => {
    renderAdminPage();
  });
}

render();
