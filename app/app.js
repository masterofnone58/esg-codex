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

const L = (en, zh) => ({ en, zh });

const messages = {
  en: {
    titles: {
      home: "TraceLight ESG Cloud",
      store: "TraceLight Store Workspace",
      admin: "TraceLight ESG Admin Workspace",
      executive: "TraceLight Executive Workspace",
    },
    common: {
      tenant: "Tenant",
      open_workspace: "Open workspace",
      work_offline: "Work offline",
      go_online: "Go online",
      sync_queue: "Sync queued uploads",
      upload_evidence: "Upload evidence",
      save_to_queue: "Save to queue",
    },
    roles: {
      store: {
        label: "Store manager",
        description:
          "Upload photos, enter material type and weight, and send clean evidence before collection cut-off.",
      },
      admin: {
        label: "ESG admin",
        description:
          "Review incoming evidence, log operational records, and prepare reporting output.",
      },
      executive: {
        label: "Executive",
        description:
          "Track footprint by supplier, inspect evidence, and review supporting credentials.",
      },
    },
    home: {
      eyebrow: "ESG SaaS MVP",
      title: "Choose the right workspace for the job.",
      workspace_title: ({ role }) => `${role} workspace`,
      tenant_note: ({ name, industry, footprint }) => `${name} • ${industry} • ${footprint}`,
    },
    materials: {
      cardboard: "Cardboard",
      plastic_film: "Plastic film",
      food_waste: "Food waste",
      mixed_recyclables: "Mixed recyclables",
      metal: "Metal",
      glass: "Glass",
      textile: "Textile",
    },
    transport: {
      electric_van: "Electric van",
      diesel_truck: "Diesel truck",
      ocean_freight: "Ocean freight",
      air_freight: "Air freight",
    },
    store: {
      intro: {
        eyebrow: "Store manager",
        title: "Capture today's material evidence.",
      },
      note: ({ store, manager, cutoff }) => `${store} • ${manager} • ${cutoff}`,
      quick: {
        synced: {
          label: "Synced today",
          helper: "Uploads live in portal",
        },
        pending: {
          label: "Still needed",
          helper: "Open capture tasks",
        },
        queued: {
          label: "Queued",
          helper_online: "Ready to sync",
          helper_offline: "Waiting for connection",
        },
      },
      status: {
        eyebrow: "Capture status",
        online_title: "Online and ready",
        offline_title: "Offline capture mode",
        offline_copy:
          "New uploads will stay on this device until you reconnect. You can continue capturing photos and material details normally.",
        waiting_copy: ({ count }) =>
          `${count} upload${count === 1 ? "" : "s"} waiting. Sync them now or keep collecting.`,
        online_copy:
          "Everything you submit now will sync directly into the tenant evidence list.",
        queue_count: ({ count }) => `${count} queued`,
      },
      new: {
        eyebrow: "New upload",
      },
      form: {
        mobile_ready: "Mobile ready",
        photo: "Photo evidence",
        material: "Material type",
        weight: "Weight (kg)",
        zone: "Store zone",
        notes: "Notes",
        zone_placeholder: "Backroom recycling bay",
        notes_placeholder: "Add contamination, supplier, or handling notes",
      },
      submit: {
        online_label: "Upload to portal",
        online_copy: "Send this evidence straight into the ESG review flow.",
        offline_label: "Queue on this device",
        offline_copy: "Your entry will be saved locally until you reconnect.",
      },
      recent: {
        eyebrow: "Recent uploads",
        title: "What you already sent",
      },
      queue: {
        eyebrow: "Queued uploads",
        title: "Waiting to sync",
        empty:
          "No queued uploads. When the device is offline, new captures will appear here until you sync them.",
      },
      submission: {
        material_upload: ({ material }) => `${material} upload`,
      },
    },
    admin: {
      intro: {
        eyebrow: "ESG administrator",
        title: "Review incoming data and prepare disclosure output.",
      },
      note: ({ name, cycle, sites, evidence }) =>
        `${name} is on the ${cycle} with ${sites} reporting sites and ${evidence} linked evidence files.`,
      metric: {
        carbon: {
          label: "Carbon",
          helper: "Current working footprint",
        },
        sites: {
          label: "Sites reporting",
          helper: "Submitted this cycle",
        },
        coverage: {
          label: "Supplier coverage",
          helper: "Mapped supplier credentials",
        },
        evidence: {
          label: "Evidence linked",
          helper: "Photos and files attached",
        },
      },
      review: {
        eyebrow: "Review queue",
        title: "What needs attention",
        evidence_title: ({ store }) => `${store} evidence review`,
        evidence_copy: ({ material, weight }) =>
          `${material} entry at ${weight} is waiting for admin validation.`,
        credential_title: ({ supplier }) => `${supplier} credential check`,
        credential_copy: ({ certificate }) =>
          `${certificate} is on file. Confirm expiry and supplier coverage before reporting.`,
        logistics_title: ({ lane }) => `${lane} transport record`,
        logistics_copy: ({ mode, carbon }) =>
          `${mode} lane logged at ${carbon}. Confirm load factor assumptions.`,
      },
      logistics: {
        eyebrow: "Logistics",
        title: "Log transport records",
        lane: "Lane",
        mode: "Transport mode",
        distance: "Distance (km)",
        load: "Load (kg)",
        add_record: "Add record",
        lane_placeholder: "Shenzhen DC to Hong Kong stores",
        summary: ({ mode, distance, load }) => `${mode} • ${distance} km • ${load} kg load`,
      },
      report: {
        eyebrow: "Draft report",
        title: "Compliance narrative",
        generate: "Generate draft",
        heading: ({ name }) => `${name} draft report`,
        p1: ({ name, carbon, cycle }) =>
          `${name} is reporting ${carbon} across its mapped footprint for the ${cycle}.`,
        p2: ({ count, observedKg }) =>
          `Store and facility teams submitted ${count} recent evidence entries covering ${observedKg} of observed materials, each linked to location and note metadata.`,
        p3: ({ logisticsKg, supplier, supplierCarbon }) =>
          `Current logistics records contribute ${logisticsKg} in the working draft, while the highest emitting mapped supplier is ${supplier} at ${supplierCarbon} tCO2e.`,
        list1: "Keep measured values separate from estimates.",
        list2: "Maintain links to evidence and supplier credentials.",
        list3: "Require human approval before final publication.",
      },
    },
    executive: {
      intro: {
        eyebrow: "Executive",
        title: "Track footprint, supplier exposure, and supporting proof.",
      },
      note: ({ name, footprint, coverage }) =>
        `${name} spans ${footprint} with ${coverage} supplier coverage across the mapped supply chain.`,
      ranking: {
        eyebrow: "Supplier ranking",
        title: "Top emitting components",
      },
      detail: {
        eyebrow: "Supplier detail",
        choose: "Choose a supplier",
        carbon: "Carbon",
        share: "Footprint share",
        evidence: "Evidence linked",
        share_helper: "Of tenant emissions",
        evidence_helper: "Files in audit trail",
        evidence_title: "Supplier evidence",
        certificates_title: "Certificates and qualifications",
        expires: ({ date }) => `Expires ${date}`,
      },
      metric: {
        total: {
          label: "Total footprint",
          helper: "Current mapped emissions",
        },
        top: {
          label: "Top supplier",
          helper: ({ carbon }) => `${carbon} contribution`,
        },
        coverage: {
          label: "Supplier coverage",
          helper: "With evidence and credentials",
        },
        evidence: {
          label: "Evidence linked",
          helper: "Proof available for drill-down",
        },
      },
      supplier_summary: ({ carbon, share }) => `${carbon} • ${share} of footprint`,
    },
  },
  zh: {
    titles: {
      home: "TraceLight ESG 雲端平台",
      store: "TraceLight 店舖工作區",
      admin: "TraceLight ESG 管理工作區",
      executive: "TraceLight 管理層工作區",
    },
    common: {
      tenant: "租戶",
      open_workspace: "開啟工作區",
      work_offline: "離線作業",
      go_online: "重新連線",
      sync_queue: "同步佇列資料",
      upload_evidence: "上傳佐證",
      save_to_queue: "儲存至佇列",
    },
    roles: {
      store: {
        label: "店舖經理",
        description: "用手機拍照、填寫物料種類與重量，並在收集截單前提交現場佐證。",
      },
      admin: {
        label: "ESG 管理員",
        description: "審核前線上傳資料、補錄營運數據，並整理對外披露草稿。",
      },
      executive: {
        label: "管理層",
        description: "查看供應鏈排放熱點、下鑽佐證資料，並核對供應商證書與資格。",
      },
    },
    home: {
      eyebrow: "ESG SaaS MVP",
      title: "依工作角色切換到合適的工作區。",
      workspace_title: ({ role }) => `${role}工作區`,
      tenant_note: ({ name, industry, footprint }) => `${name} • ${industry} • ${footprint}`,
    },
    materials: {
      cardboard: "紙板",
      plastic_film: "塑膠薄膜",
      food_waste: "廚餘",
      mixed_recyclables: "混合可回收物",
      metal: "金屬",
      glass: "玻璃",
      textile: "紡織物",
    },
    transport: {
      electric_van: "電動客貨車",
      diesel_truck: "柴油貨車",
      ocean_freight: "海運",
      air_freight: "空運",
    },
    store: {
      intro: {
        eyebrow: "店舖經理",
        title: "上傳今天的物料佐證。",
      },
      note: ({ store, manager, cutoff }) => `${store} • ${manager} • ${cutoff}`,
      quick: {
        synced: {
          label: "今日已同步",
          helper: "已即時進入平台",
        },
        pending: {
          label: "尚待提交",
          helper: "仍有收集任務",
        },
        queued: {
          label: "待同步",
          helper_online: "可立即同步",
          helper_offline: "等待連線恢復",
        },
      },
      status: {
        eyebrow: "收集狀態",
        online_title: "已連線，可即時提交",
        offline_title: "離線收集模式",
        offline_copy: "新上傳內容會先保留在這台裝置。你仍可繼續拍照並填寫物料資料。",
        waiting_copy: ({ count }) => `目前有 ${count} 筆資料待同步，可立即同步或繼續收集。`,
        online_copy: "現在提交的內容會直接進入租戶的 ESG 佐證清單。",
        queue_count: ({ count }) => `${count} 筆待同步`,
      },
      new: {
        eyebrow: "新增上傳",
      },
      form: {
        mobile_ready: "手機可用",
        photo: "照片佐證",
        material: "物料種類",
        weight: "重量（kg）",
        zone: "店內區域",
        notes: "備註",
        zone_placeholder: "後場回收區",
        notes_placeholder: "補充污染情況、供應商或處理方式",
      },
      submit: {
        online_label: "上傳至平台",
        online_copy: "這筆佐證會直接送進 ESG 審核流程。",
        offline_label: "先存到本機",
        offline_copy: "資料會保留在本機，重新連線後再同步。",
      },
      recent: {
        eyebrow: "近期上傳",
        title: "已提交內容",
      },
      queue: {
        eyebrow: "待同步資料",
        title: "等待同步",
        empty: "目前沒有待同步資料。裝置離線時，新的收集內容會先出現在這裡。",
      },
      submission: {
        material_upload: ({ material }) => `${material}上傳`,
      },
    },
    admin: {
      intro: {
        eyebrow: "ESG 管理員",
        title: "審核進來的資料並整理合規披露內容。",
      },
      note: ({ name, cycle, sites, evidence }) =>
        `${name} 正進行 ${cycle}，目前有 ${sites} 個站點完成回報，並已連結 ${evidence} 份佐證檔案。`,
      metric: {
        carbon: {
          label: "碳排放",
          helper: "目前工作底稿口徑",
        },
        sites: {
          label: "已回報站點",
          helper: "本申報週期已提交",
        },
        coverage: {
          label: "供應商覆蓋率",
          helper: "已完成憑證映射",
        },
        evidence: {
          label: "已連結佐證",
          helper: "照片與檔案已掛接",
        },
      },
      review: {
        eyebrow: "審核佇列",
        title: "需要處理的事項",
        evidence_title: ({ store }) => `${store} 佐證審核`,
        evidence_copy: ({ material, weight }) => `${material}紀錄（${weight}）正等待管理員確認。`,
        credential_title: ({ supplier }) => `${supplier} 憑證檢查`,
        credential_copy: ({ certificate }) => `系統已有 ${certificate}，請確認有效期與供應商覆蓋範圍。`,
        logistics_title: ({ lane }) => `${lane} 運輸紀錄`,
        logistics_copy: ({ mode, carbon }) => `${mode} 路線目前記錄為 ${carbon}，請確認載運率假設。`,
      },
      logistics: {
        eyebrow: "物流",
        title: "補錄運輸資料",
        lane: "路線",
        mode: "運輸方式",
        distance: "距離（km）",
        load: "載重（kg）",
        add_record: "新增紀錄",
        lane_placeholder: "深圳配送中心至香港門市",
        summary: ({ mode, distance, load }) => `${mode} • ${distance} km • 載重 ${load} kg`,
      },
      report: {
        eyebrow: "報告草稿",
        title: "合規敘述",
        generate: "產生草稿",
        heading: ({ name }) => `${name} 報告草稿`,
        p1: ({ name, carbon, cycle }) => `${name} 目前按 ${cycle} 口徑統計，映射範圍內排放為 ${carbon}。`,
        p2: ({ count, observedKg }) =>
          `門市與設施團隊近期共提交 ${count} 筆佐證，涵蓋 ${observedKg} 已觀測物料，且每筆都附有位置與備註資料。`,
        p3: ({ logisticsKg, supplier, supplierCarbon }) =>
          `現有物流紀錄在工作底稿中合計 ${logisticsKg}，目前最高排放的已映射供應商為 ${supplier}，排放量 ${supplierCarbon} tCO2e。`,
        list1: "量測值與估算值需要分開保存。",
        list2: "保留每筆資料與供應商憑證的連結。",
        list3: "正式發布前仍需人工覆核。",
      },
    },
    executive: {
      intro: {
        eyebrow: "管理層",
        title: "掌握整體排放、供應鏈風險與佐證依據。",
      },
      note: ({ name, footprint, coverage }) =>
        `${name} 的營運版圖為 ${footprint}，目前供應鏈映射覆蓋率為 ${coverage}。`,
      ranking: {
        eyebrow: "供應商排名",
        title: "排放最高的供應鏈組件",
      },
      detail: {
        eyebrow: "供應商明細",
        choose: "選擇供應商",
        carbon: "碳排放",
        share: "排放占比",
        evidence: "已連結佐證",
        share_helper: "占租戶總排放",
        evidence_helper: "已納入稽核軌跡",
        evidence_title: "供應商佐證",
        certificates_title: "證書與資格",
        expires: ({ date }) => `到期日 ${date}`,
      },
      metric: {
        total: {
          label: "總排放",
          helper: "目前映射排放",
        },
        top: {
          label: "最高排放供應商",
          helper: ({ carbon }) => `排放貢獻 ${carbon}`,
        },
        coverage: {
          label: "供應商覆蓋率",
          helper: "含佐證與憑證資料",
        },
        evidence: {
          label: "已連結佐證",
          helper: "可供下鑽查看",
        },
      },
      supplier_summary: ({ carbon, share }) => `${carbon} • 占整體排放 ${share}`,
    },
  },
};

const MATERIAL_OPTIONS = [
  "cardboard",
  "plastic_film",
  "food_waste",
  "mixed_recyclables",
  "metal",
  "glass",
  "textile",
];

const TRANSPORT_OPTIONS = ["electric_van", "diesel_truck", "ocean_freight", "air_freight"];

const TRANSPORT_FACTORS = {
  electric_van: 0.04,
  diesel_truck: 0.11,
  ocean_freight: 0.02,
  air_freight: 1.72,
};

const tenants = {
  evergreen: {
    id: "evergreen",
    name: L("Evergreen Retail Group", "長青零售集團"),
    industry: L("Retail and distribution", "零售與分銷"),
    footprint: L("128 stores across Hong Kong, Shenzhen, and Singapore", "橫跨香港、深圳與新加坡的 128 間門市"),
    reportingCycle: L("CSRD-aligned Q2 cycle", "對齊 CSRD 的第二季申報週期"),
    store: {
      name: L("Causeway Bay Flagship", "銅鑼灣旗艦店"),
      manager: L("May Wong", "黃美儀"),
      pendingToday: 3,
      submittedToday: 7,
      shiftWindow: L("14:00 collection cut-off", "14:00 收集截單"),
    },
    kpis: {
      carbon: "1,248 tCO2e",
      storesReporting: "121 / 128",
      supplierCoverage: "84%",
      evidenceLinked: "2,406 files",
    },
    evidence: [
      {
        title: L("Cardboard baling batch", "紙板打包批次"),
        materialType: "cardboard",
        weightKg: 42.6,
        zone: L("Backroom recycling bay", "後場回收區"),
        store: L("Causeway Bay Flagship", "銅鑼灣旗艦店"),
        note: L(
          "Sorted by packaging vendor before pickup.",
          "已於收運前依包材供應商要求完成分類。"
        ),
        image: placeholderSvg("#d7c3a6", "#8e755d"),
        date: "2026-03-27 18:22",
      },
      {
        title: L("Plastic film recovery", "塑膠薄膜回收"),
        materialType: "plastic_film",
        weightKg: 11.3,
        zone: L("Receiving dock", "收貨碼頭"),
        store: L("Kowloon East Mall", "九龍東商場店"),
        note: L(
          "Clean wrap from inbound electronics shipments.",
          "來自電子貨品入庫的乾淨包裝薄膜。"
        ),
        image: placeholderSvg("#d8ddd4", "#71806e"),
        date: "2026-03-27 14:40",
      },
    ],
    logistics: [
      {
        lane: L("Shenzhen DC to Hong Kong stores", "深圳配送中心至香港門市"),
        mode: "electric_van",
        distanceKm: 42,
        loadKg: 720,
        carbonKg: 28,
      },
      {
        lane: L("Singapore consolidation hub to Orchard stores", "新加坡整合倉至烏節路門市"),
        mode: "diesel_truck",
        distanceKm: 16,
        loadKg: 520,
        carbonKg: 47,
      },
    ],
    suppliers: [
      {
        id: "packaging",
        name: L("GreenPack Materials", "GreenPack 包材"),
        role: L("Packaging supplier", "包裝材料供應商"),
        carbonTco2e: 214,
        share: "17%",
        evidenceCount: 18,
        region: L("Guangdong", "廣東"),
        certificates: [
          {
            title: L("FSC Chain of Custody", "FSC 產銷監管鏈"),
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
            title: L("Recycled kraft roll inspection", "再生牛皮紙捲檢查"),
            note: L(
              "Moisture-resistant kraft paper pallets documented at source.",
              "已於源頭記錄具防潮處理的牛皮紙棧板。"
            ),
            image: placeholderSvg("#d8c0a1", "#8d694b"),
          },
        ],
      },
      {
        id: "freight",
        name: L("HarborLine Logistics", "HarborLine 物流"),
        role: L("Regional freight partner", "區域物流夥伴"),
        carbonTco2e: 382,
        share: "31%",
        evidenceCount: 9,
        region: L("Pearl River Delta", "珠三角"),
        certificates: [
          {
            title: L("Verified emissions methodology", "排放方法學驗證"),
            expiry: "2026-12-31",
            issuer: "Smart Freight Centre",
            image: placeholderSvg("#d2d8dc", "#6b7f8e"),
          },
        ],
        evidence: [
          {
            title: L("EV route audit", "電動車路線稽核"),
            note: L(
              "Partial EV conversion completed on Hong Kong last-mile lanes.",
              "香港最後一哩路線已完成部分電動化轉換。"
            ),
            image: placeholderSvg("#d2ddd6", "#617a68"),
          },
          {
            title: L("Load factor log", "載運率紀錄"),
            note: L(
              "Average load factor improved from 61% to 74% this quarter.",
              "本季平均載運率已由 61% 提升至 74%。"
            ),
            image: placeholderSvg("#e0c7aa", "#9d734e"),
          },
        ],
      },
      {
        id: "ingredients",
        name: L("Pacific Ingredients Co.", "Pacific Ingredients 原料"),
        role: L("Private-label ingredient processor", "自有品牌原料加工商"),
        carbonTco2e: 156,
        share: "12%",
        evidenceCount: 14,
        region: L("Vietnam", "越南"),
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
            title: L("Wastewater treatment photo set", "廢水處理照片組"),
            note: L(
              "Treatment plant overhaul completed in February.",
              "處理設施翻新已於二月完成。"
            ),
            image: placeholderSvg("#d6dfde", "#6a8e93"),
          },
        ],
      },
    ],
  },
  northstar: {
    id: "northstar",
    name: L("Northstar Foods", "北辰食品"),
    industry: L("Food manufacturing and retail", "食品製造與零售"),
    footprint: L("56 stores and 4 regional kitchens", "56 間門市及 4 個區域中央廚房"),
    reportingCycle: L("Annual sustainability statement", "年度永續報告週期"),
    store: {
      name: L("Central Kitchen 02", "中央廚房 02"),
      manager: "Arjun Patel",
      pendingToday: 2,
      submittedToday: 5,
      shiftWindow: L("17:00 kitchen close audit", "17:00 關廚稽核"),
    },
    kpis: {
      carbon: "892 tCO2e",
      storesReporting: "52 / 56",
      supplierCoverage: "76%",
      evidenceLinked: "1,294 files",
    },
    evidence: [
      {
        title: L("Food waste segregation", "廚餘分類"),
        materialType: "food_waste",
        weightKg: 67.2,
        zone: L("Organic waste room", "有機廢棄物室"),
        store: L("Central Kitchen 02", "中央廚房 02"),
        note: L(
          "Separated for anaerobic digestion vendor pickup.",
          "已分類，待厭氧消化處理商收運。"
        ),
        image: placeholderSvg("#dde1c6", "#7e8f5a"),
        date: "2026-03-27 19:05",
      },
      {
        title: L("Mixed recyclables dock photo", "混合回收物碼頭照片"),
        materialType: "mixed_recyclables",
        weightKg: 23.5,
        zone: L("Dispatch bay", "出貨區"),
        store: L("Harbourfront Store", "海濱門市"),
        note: L(
          "Captured after weekend promotional teardown.",
          "週末促銷拆架後拍攝記錄。"
        ),
        image: placeholderSvg("#d2ddd5", "#6a7f72"),
        date: "2026-03-26 16:12",
      },
    ],
    logistics: [
      {
        lane: L("Kitchen 02 to urban stores", "中央廚房 02 至市區門市"),
        mode: "electric_van",
        distanceKm: 24,
        loadKg: 400,
        carbonKg: 14,
      },
      {
        lane: L("Cold storage to airport retail", "冷庫至機場零售點"),
        mode: "air_freight",
        distanceKm: 1200,
        loadKg: 88,
        carbonKg: 182,
      },
    ],
    suppliers: [
      {
        id: "protein",
        name: L("BlueHarbor Proteins", "BlueHarbor 蛋白原料"),
        role: L("Protein supplier", "蛋白原料供應商"),
        carbonTco2e: 290,
        share: "33%",
        evidenceCount: 11,
        region: L("Thailand", "泰國"),
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
            title: L("Cold chain compliance images", "冷鏈合規照片"),
            note: L(
              "Temperature monitors photographed at loading point.",
              "已在裝貨點拍攝溫度監測設備。"
            ),
            image: placeholderSvg("#d8e0e3", "#6f8791"),
          },
        ],
      },
      {
        id: "pack",
        name: L("Circular Pack Asia", "Circular Pack Asia"),
        role: L("Packaging converter", "包裝加工商"),
        carbonTco2e: 168,
        share: "19%",
        evidenceCount: 7,
        region: L("Malaysia", "馬來西亞"),
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
            title: L("Bio-based resin invoice evidence", "生質樹脂發票佐證"),
            note: L(
              "Invoice and stock photos mapped to batch numbers.",
              "發票與庫存照片已對應到批號。"
            ),
            image: placeholderSvg("#e0d7b8", "#8b7e49"),
          },
        ],
      },
    ],
  },
};

const page = document.body.dataset.page || "home";
const query = new URLSearchParams(window.location.search);
const storagePrefix = "tracelight.store";
const languageStorageKey = "tracelight.lang";

function normalizeLang(value) {
  if (!value) return null;
  const normalized = String(value).toLowerCase();
  return normalized.startsWith("zh") ? "zh" : "en";
}

const initialTenantId = query.get("tenant");
const initialLang =
  normalizeLang(query.get("lang")) ||
  normalizeLang(readStoredLanguage()) ||
  normalizeLang(window.navigator.language) ||
  "en";

const state = {
  tenantId: tenants[initialTenantId] ? initialTenantId : "evergreen",
  lang: initialLang,
  selectedSupplierId: null,
};

const els = {
  brandLink: document.getElementById("brand-link"),
  languageSwitcher: document.getElementById("language-switcher"),
  tenantSelect: document.getElementById("tenant-select"),
  tenantNote: document.getElementById("tenant-note"),
  roleNav: document.getElementById("role-nav"),
  roleCardGrid: document.getElementById("role-card-grid"),
  storeQuickGrid: document.getElementById("store-quick-grid"),
  storeName: document.getElementById("store-name"),
  materialSelect: document.querySelector('#store-form select[name="materialType"]'),
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
  transportSelect: document.querySelector('#logistics-form select[name="mode"]'),
  logisticsList: document.getElementById("logistics-list"),
  generateReport: document.getElementById("generate-report"),
  reportOutput: document.getElementById("report-output"),
  executiveKpis: document.getElementById("executive-kpis"),
  supplierList: document.getElementById("supplier-list"),
  detailTitle: document.getElementById("detail-title"),
  detailPanel: document.getElementById("detail-panel"),
};

function readStoredLanguage() {
  try {
    return JSON.parse(window.localStorage.getItem(languageStorageKey));
  } catch {
    return null;
  }
}

function activeTenant() {
  return tenants[state.tenantId];
}

function lookup(source, path) {
  return path.split(".").reduce((value, key) => (value && key in value ? value[key] : undefined), source);
}

function interpolate(template, vars = {}) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ""));
}

function t(path, vars = {}) {
  const value = lookup(messages[state.lang], path);
  if (typeof value === "function") return value(vars);
  if (typeof value === "string") return interpolate(value, vars);
  return path;
}

function localized(value) {
  if (value && typeof value === "object" && "en" in value) {
    return value[state.lang] || value.en;
  }
  return value == null ? "" : String(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeLocalized(value) {
  return escapeHtml(localized(value));
}

function safeText(value) {
  return escapeHtml(String(value));
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

function persistLanguage() {
  writeJson(languageStorageKey, state.lang);
}

function formatKg(value) {
  return `${Number(value).toFixed(1)} kg`;
}

function emptyStateMarkup(copy) {
  return `<div class="empty-state">${safeText(copy)}</div>`;
}

function materialLabel(value) {
  if (!value) return "";
  if (lookup(messages.en.materials, value)) return t(`materials.${value}`);
  const normalized = String(value).toLowerCase().replace(/\s+/g, "_");
  if (lookup(messages.en.materials, normalized)) return t(`materials.${normalized}`);
  return String(value);
}

function transportModeLabel(value) {
  if (!value) return "";
  if (lookup(messages.en.transport, value)) return t(`transport.${value}`);
  const normalized = String(value).toLowerCase().replace(/\s+/g, "_");
  if (lookup(messages.en.transport, normalized)) return t(`transport.${normalized}`);
  return String(value);
}

function evidenceTitle(item) {
  if (item.titleKey) {
    return t(item.titleKey, { material: materialLabel(item.materialType) });
  }
  return localized(item.title);
}

function homeHref() {
  return buildHref(page === "home" ? "./" : "../");
}

function routeFor(roleId) {
  const base = page === "home" ? `./${roleId}/` : `../${roleId}/`;
  return buildHref(base);
}

function buildHref(base) {
  const params = new URLSearchParams();
  params.set("tenant", state.tenantId);
  params.set("lang", state.lang);
  return `${base}?${params.toString()}`;
}

function syncUrlState() {
  const url = new URL(window.location.href);
  url.searchParams.set("tenant", state.tenantId);
  url.searchParams.set("lang", state.lang);
  window.history.replaceState({}, "", url);
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
}

function renderDocumentLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  document.title = t(`titles.${page}`);
}

function renderBrandLink() {
  if (!els.brandLink) return;
  els.brandLink.href = homeHref();
}

function renderLanguageSwitcher() {
  if (!els.languageSwitcher) return;
  els.languageSwitcher.innerHTML = [
    { id: "en", label: "EN" },
    { id: "zh", label: "中文" },
  ]
    .map(
      (item) => `
        <button
          type="button"
          class="language-button ${item.id === state.lang ? "is-active" : ""}"
          data-lang="${item.id}"
          aria-pressed="${item.id === state.lang ? "true" : "false"}"
        >
          ${item.label}
        </button>
      `
    )
    .join("");

  els.languageSwitcher.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLang = normalizeLang(button.dataset.lang) || "en";
      if (nextLang === state.lang) return;
      state.lang = nextLang;
      persistLanguage();
      render();
    });
  });
}

function renderTenantSelect() {
  if (!els.tenantSelect) return;
  els.tenantSelect.innerHTML = Object.values(tenants)
    .map(
      (tenant) =>
        `<option value="${tenant.id}" ${tenant.id === state.tenantId ? "selected" : ""}>${safeLocalized(
          tenant.name
        )}</option>`
    )
    .join("");
}

function renderRoleNav() {
  if (!els.roleNav) return;
  const items = ["store", "admin", "executive"];
  els.roleNav.innerHTML = items
    .map((roleId) => {
      const isActive = page === roleId;
      return `<a class="role-link ${isActive ? "is-active" : ""}" href="${routeFor(roleId)}" ${
        isActive ? 'aria-current="page"' : ""
      }>${safeText(t(`roles.${roleId}.label`))}</a>`;
    })
    .join("");
}

function renderTenantNote() {
  if (!els.tenantNote) return;
  const tenant = activeTenant();

  if (page === "store") {
    els.tenantNote.textContent = t("store.note", {
      store: localized(tenant.store.name),
      manager: localized(tenant.store.manager),
      cutoff: localized(tenant.store.shiftWindow),
    });
    return;
  }

  if (page === "admin") {
    els.tenantNote.textContent = t("admin.note", {
      name: localized(tenant.name),
      cycle: localized(tenant.reportingCycle),
      sites: tenant.kpis.storesReporting,
      evidence: tenant.kpis.evidenceLinked,
    });
    return;
  }

  if (page === "executive") {
    els.tenantNote.textContent = t("executive.note", {
      name: localized(tenant.name),
      footprint: localized(tenant.footprint),
      coverage: tenant.kpis.supplierCoverage,
    });
    return;
  }

  els.tenantNote.textContent = t("home.tenant_note", {
    name: localized(tenant.name),
    industry: localized(tenant.industry),
    footprint: localized(tenant.footprint),
  });
}

function renderMaterialOptions() {
  if (!els.materialSelect) return;
  const selected = els.materialSelect.value || "cardboard";
  els.materialSelect.innerHTML = MATERIAL_OPTIONS.map((option) => {
    const isSelected = option === selected;
    return `<option value="${option}" ${isSelected ? "selected" : ""}>${safeText(
      t(`materials.${option}`)
    )}</option>`;
  }).join("");
}

function renderTransportOptions() {
  if (!els.transportSelect) return;
  const selected = els.transportSelect.value || "electric_van";
  els.transportSelect.innerHTML = TRANSPORT_OPTIONS.map((option) => {
    const isSelected = option === selected;
    return `<option value="${option}" ${isSelected ? "selected" : ""}>${safeText(
      t(`transport.${option}`)
    )}</option>`;
  }).join("");
}

function reviewQueueForTenant(tenant) {
  const latestEvidence = tenant.evidence[0];
  const supplier = tenant.suppliers[0];
  const logistics = tenant.logistics[0];
  return [
    {
      title: t("admin.review.evidence_title", {
        store: localized(latestEvidence.store),
      }),
      copy: t("admin.review.evidence_copy", {
        material: materialLabel(latestEvidence.materialType),
        weight: formatKg(latestEvidence.weightKg),
      }),
    },
    {
      title: t("admin.review.credential_title", {
        supplier: localized(supplier.name),
      }),
      copy: t("admin.review.credential_copy", {
        certificate: localized(supplier.certificates[0].title),
      }),
    },
    {
      title: t("admin.review.logistics_title", {
        lane: localized(logistics.lane),
      }),
      copy: t("admin.review.logistics_copy", {
        mode: transportModeLabel(logistics.mode),
        carbon: `${logistics.carbonKg} kgCO2e`,
      }),
    },
  ];
}

function reportSummaryForTenant(tenant) {
  const totalObservedKg = formatKg(
    tenant.evidence.reduce((sum, item) => sum + Number(item.weightKg), 0)
  );
  const totalLogisticsKg = `${tenant.logistics.reduce((sum, item) => sum + item.carbonKg, 0)} kgCO2e`;
  const topSupplier = tenant.suppliers.slice().sort((a, b) => b.carbonTco2e - a.carbonTco2e)[0];

  return `
    <h3>${safeText(t("admin.report.heading", { name: localized(tenant.name) }))}</h3>
    <p>${safeText(
      t("admin.report.p1", {
        name: localized(tenant.name),
        carbon: tenant.kpis.carbon,
        cycle: localized(tenant.reportingCycle),
      })
    )}</p>
    <p>${safeText(
      t("admin.report.p2", {
        count: tenant.evidence.length,
        observedKg: totalObservedKg,
      })
    )}</p>
    <p>${safeText(
      t("admin.report.p3", {
        logisticsKg: totalLogisticsKg,
        supplier: localized(topSupplier.name),
        supplierCarbon: topSupplier.carbonTco2e,
      })
    )}</p>
    <ul>
      <li>${safeText(t("admin.report.list1"))}</li>
      <li>${safeText(t("admin.report.list2"))}</li>
      <li>${safeText(t("admin.report.list3"))}</li>
    </ul>
  `;
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
  const materialType = String(form.get("materialType"));
  let image = placeholderSvg("#d8ddd4", "#71806e");

  if (file instanceof File && file.size > 0) {
    try {
      image = await readFileAsDataUrl(file);
    } catch {
      image = placeholderSvg("#d8ddd4", "#71806e");
    }
  }

  return {
    titleKey: "store.submission.material_upload",
    materialType,
    weightKg: Number(form.get("weightKg")),
    zone: String(form.get("zone")),
    store: tenant.store.name,
    note: String(form.get("notes")),
    image,
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
  };
}

function renderHome() {
  if (!els.roleCardGrid) return;
  els.roleCardGrid.innerHTML = ["store", "admin", "executive"]
    .map((roleId) => {
      const label = t(`roles.${roleId}.label`);
      return `
        <article class="role-card">
          <p class="eyebrow">${safeText(label)}</p>
          <h2>${safeText(t("home.workspace_title", { role: label }))}</h2>
          <p>${safeText(t(`roles.${roleId}.description`))}</p>
          <a class="primary-button" href="${routeFor(roleId)}">${safeText(t("common.open_workspace"))}</a>
        </article>
      `;
    })
    .join("");
}

function renderStorePage() {
  if (!els.storeQuickGrid || !els.storeName || !els.evidenceList) return;
  const tenant = activeTenant();
  const queue = currentStoreQueue();
  const isOffline = currentStoreOffline();

  renderMaterialOptions();
  els.storeName.textContent = `${localized(tenant.store.name)} • ${localized(tenant.store.manager)}`;

  els.storeQuickGrid.innerHTML = [
    {
      label: t("store.quick.synced.label"),
      value: tenant.store.submittedToday,
      helper: t("store.quick.synced.helper"),
    },
    {
      label: t("store.quick.pending.label"),
      value: tenant.store.pendingToday,
      helper: t("store.quick.pending.helper"),
    },
    {
      label: t("store.quick.queued.label"),
      value: queue.length,
      helper: isOffline ? t("store.quick.queued.helper_offline") : t("store.quick.queued.helper_online"),
    },
  ]
    .map(
      (item) => `
        <article class="quick-card">
          <p class="eyebrow">${safeText(item.label)}</p>
          <strong>${safeText(item.value)}</strong>
          <span>${safeText(item.helper)}</span>
        </article>
      `
    )
    .join("");

  if (els.connectionState) {
    els.connectionState.textContent = isOffline
      ? t("store.status.offline_title")
      : t("store.status.online_title");
  }

  if (els.connectionCopy) {
    els.connectionCopy.textContent = isOffline
      ? t("store.status.offline_copy")
      : queue.length
        ? t("store.status.waiting_copy", { count: queue.length })
        : t("store.status.online_copy");
  }

  if (els.connectionToggle) {
    els.connectionToggle.textContent = isOffline ? t("common.go_online") : t("common.work_offline");
  }

  if (els.queuePill) {
    els.queuePill.textContent = t("store.status.queue_count", { count: queue.length });
  }

  if (els.syncQueueButton) {
    els.syncQueueButton.textContent = t("common.sync_queue");
    els.syncQueueButton.hidden = isOffline || queue.length === 0;
    els.syncQueueButton.disabled = isOffline || queue.length === 0;
  }

  if (els.submitStateLabel) {
    els.submitStateLabel.textContent = isOffline
      ? t("store.submit.offline_label")
      : t("store.submit.online_label");
  }

  if (els.submitStateCopy) {
    els.submitStateCopy.textContent = isOffline
      ? t("store.submit.offline_copy")
      : t("store.submit.online_copy");
  }

  if (els.storeSubmitButton) {
    els.storeSubmitButton.textContent = isOffline
      ? t("common.save_to_queue")
      : t("common.upload_evidence");
  }

  els.evidenceList.innerHTML = tenant.evidence
    .map(
      (item) => `
        <article class="simple-item media-item">
          <div class="media-thumb"><img src="${item.image}" alt="${escapeHtml(evidenceTitle(item))}" /></div>
          <div>
            <strong>${escapeHtml(evidenceTitle(item))}</strong>
            <div class="meta-row">
              <span>${safeText(materialLabel(item.materialType))}</span>
              <span>${safeText(formatKg(item.weightKg))}</span>
              <span>${safeLocalized(item.zone)}</span>
            </div>
            <p>${safeLocalized(item.note)}</p>
            <span>${safeText(item.date)}</span>
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
                <strong>${escapeHtml(evidenceTitle(item))}</strong>
                <div class="meta-row">
                  <span>${safeText(materialLabel(item.materialType))}</span>
                  <span>${safeText(formatKg(item.weightKg))}</span>
                  <span>${safeText(item.zone)}</span>
                </div>
                <p>${safeText(item.note)}</p>
                <span>${safeText(item.date)}</span>
              </article>
            `
          )
          .join("")
      : emptyStateMarkup(t("store.queue.empty"));
  }
}

function renderAdminPage() {
  const tenant = activeTenant();
  renderTransportOptions();

  if (els.metricGrid) {
    els.metricGrid.innerHTML = [
      {
        label: t("admin.metric.carbon.label"),
        value: tenant.kpis.carbon,
        helper: t("admin.metric.carbon.helper"),
      },
      {
        label: t("admin.metric.sites.label"),
        value: tenant.kpis.storesReporting,
        helper: t("admin.metric.sites.helper"),
      },
      {
        label: t("admin.metric.coverage.label"),
        value: tenant.kpis.supplierCoverage,
        helper: t("admin.metric.coverage.helper"),
      },
      {
        label: t("admin.metric.evidence.label"),
        value: tenant.kpis.evidenceLinked,
        helper: t("admin.metric.evidence.helper"),
      },
    ]
      .map(
        (item) => `
          <article class="kpi-card">
            <p class="eyebrow">${safeText(item.label)}</p>
            <strong>${safeText(item.value)}</strong>
            <span>${safeText(item.helper)}</span>
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
            <strong>${safeText(item.title)}</strong>
            <p>${safeText(item.copy)}</p>
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
            <strong>${safeLocalized(entry.lane)}</strong>
            <p>${safeText(
              t("admin.logistics.summary", {
                mode: transportModeLabel(entry.mode),
                distance: entry.distanceKm,
                load: entry.loadKg,
              })
            )}</p>
            <span>${safeText(`${entry.carbonKg} kgCO2e`)}</span>
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

  els.detailTitle.textContent = localized(supplier.name) || t("executive.detail.choose");

  const evidenceMarkup = supplier.evidence
    .map(
      (item) => `
        <div class="detail-block">
          <h3>${safeLocalized(item.title)}</h3>
          <div class="media-thumb"><img src="${item.image}" alt="${safeLocalized(item.title)}" /></div>
          <p>${safeLocalized(item.note)}</p>
        </div>
      `
    )
    .join("");

  const certificateMarkup = supplier.certificates
    .map(
      (cert) => `
        <div class="certificate-row">
          <div class="certificate-thumb"><img src="${cert.image}" alt="${safeLocalized(cert.title)}" /></div>
          <div>
            <strong>${safeLocalized(cert.title)}</strong>
            <p>${safeLocalized(cert.issuer)}</p>
            <span class="mono">${safeText(t("executive.detail.expires", { date: cert.expiry }))}</span>
          </div>
        </div>
      `
    )
    .join("");

  els.detailPanel.innerHTML = `
    <section class="detail-grid">
      <article class="detail-block">
        <p class="eyebrow">${safeText(t("executive.detail.carbon"))}</p>
        <strong>${safeText(supplier.carbonTco2e)}</strong>
        <span>tCO2e</span>
      </article>
      <article class="detail-block">
        <p class="eyebrow">${safeText(t("executive.detail.share"))}</p>
        <strong>${safeText(supplier.share)}</strong>
        <span>${safeText(t("executive.detail.share_helper"))}</span>
      </article>
      <article class="detail-block">
        <p class="eyebrow">${safeText(t("executive.detail.evidence"))}</p>
        <strong>${safeText(supplier.evidenceCount)}</strong>
        <span>${safeText(t("executive.detail.evidence_helper"))}</span>
      </article>
    </section>
    <section class="detail-block">
      <h3>${safeText(t("executive.detail.evidence_title"))}</h3>
      ${evidenceMarkup}
    </section>
    <section class="detail-block">
      <h3>${safeText(t("executive.detail.certificates_title"))}</h3>
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
      {
        label: t("executive.metric.total.label"),
        value: tenant.kpis.carbon,
        helper: t("executive.metric.total.helper"),
      },
      {
        label: t("executive.metric.top.label"),
        value: localized(topSupplier.name),
        helper: t("executive.metric.top.helper", {
          carbon: `${topSupplier.carbonTco2e} tCO2e`,
        }),
      },
      {
        label: t("executive.metric.coverage.label"),
        value: tenant.kpis.supplierCoverage,
        helper: t("executive.metric.coverage.helper"),
      },
      {
        label: t("executive.metric.evidence.label"),
        value: tenant.kpis.evidenceLinked,
        helper: t("executive.metric.evidence.helper"),
      },
    ]
      .map(
        (item) => `
          <article class="kpi-card">
            <p class="eyebrow">${safeText(item.label)}</p>
            <strong>${safeText(item.value)}</strong>
            <span>${safeText(item.helper)}</span>
          </article>
        `
      )
      .join("");
  }

  if (els.supplierList) {
    els.supplierList.innerHTML = tenant.suppliers
      .map(
        (supplier) => `
          <button class="supplier-button ${supplier.id === state.selectedSupplierId ? "is-active" : ""}" data-supplier-id="${
            supplier.id
          }">
            <strong>${safeLocalized(supplier.name)}</strong>
            <p>${safeText(`${localized(supplier.role)} • ${localized(supplier.region)}`)}</p>
            <span>${safeText(
              t("executive.supplier_summary", {
                carbon: `${supplier.carbonTco2e} tCO2e`,
                share: supplier.share,
              })
            )}</span>
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
  syncUrlState();
  renderDocumentLanguage();
  renderBrandLink();
  renderLanguageSwitcher();
  applyStaticTranslations();
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
    renderMaterialOptions();
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
    const factor = TRANSPORT_FACTORS[mode];

    activeTenant().logistics.unshift({
      lane: String(form.get("lane")),
      mode,
      distanceKm,
      loadKg,
      carbonKg: Math.round(distanceKm * loadKg * factor * 0.01),
    });

    renderAdminPage();
    event.currentTarget.reset();
    renderTransportOptions();
  });
}

if (els.generateReport) {
  els.generateReport.addEventListener("click", () => {
    renderAdminPage();
  });
}

persistLanguage();
render();
