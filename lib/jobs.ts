export type Job = {
  id: string;
  slug: string;
  title: string;
  organization: string;
  shortName: string;
  department: string;
  location: string;
  education: string[];
  vacancies: number;
  salary: string;
  deadline: string;
  postedOn: string;
  accent: "blue" | "orange" | "green" | "purple";
  icon: "landmark" | "shield" | "train" | "zap" | "building" | "heart" | "mail" | "trees";
  tags: string[];
  description: string;
  officialUrl: string;
};

// Fictional records for the frontend preview. These are not recruitment notices.
export const demoToday = "2026-10-07";

export const jobs: Job[] = [
  {
    id: "demo-police-01",
    slug: "maharashtra-police-constable-demo",
    title: "महाराष्ट्र पोलीस — पोलीस शिपाई",
    organization: "महाराष्ट्र राज्य पोलीस",
    shortName: "पोलीस",
    department: "पोलीस व संरक्षण",
    location: "नागपूर",
    education: ["१२वी"],
    vacancies: 240,
    salary: "₹२१,७०० – ₹६९,१००",
    deadline: "2026-10-10",
    postedOn: "2026-10-07",
    accent: "blue",
    icon: "shield",
    tags: ["नमुना", "१२वी पास", "police", "constable", "nagpur"],
    description:
      "पोलीस शिपाई पदाची माहिती कशी दिसेल हे दाखवणारी काल्पनिक नोंद. पदसंख्या, वेतन आणि तारखा केवळ डिझाइनच्या प्रात्यक्षिकासाठी आहेत. ही अधिकृत भरती जाहिरात नाही.",
    officialUrl: "https://www.mahapolice.gov.in/",
  },
  {
    id: "demo-mpsc-02",
    slug: "mpsc-group-b-demo",
    title: "MPSC — गट ब संयुक्त पूर्व परीक्षा",
    organization: "महाराष्ट्र लोकसेवा आयोग",
    shortName: "MPSC",
    department: "MPSC",
    location: "पुणे",
    education: ["पदवी", "पदव्युत्तर"],
    vacancies: 180,
    salary: "₹३८,६०० – ₹१,२२,८००",
    deadline: "2026-10-15",
    postedOn: "2026-10-07",
    accent: "purple",
    icon: "landmark",
    tags: ["नमुना", "पदवीधर", "mpsc", "state", "group", "b", "pune"],
    description:
      "स्पर्धा परीक्षेच्या माहिती पानासाठी तयार केलेली काल्पनिक नोंद. येथे दिसणारी परीक्षा, पदसंख्या, वेतन आणि तारखा प्रात्यक्षिकाचा भाग आहेत. प्रत्यक्ष अधिसूचनेसाठी आयोगाचे संकेतस्थळ पाहा.",
    officialUrl: "https://mpsc.gov.in/",
  },
  {
    id: "demo-zp-03",
    slug: "zilla-parishad-pune-junior-assistant-demo",
    title: "जिल्हा परिषद पुणे — कनिष्ठ सहाय्यक",
    organization: "जिल्हा परिषद पुणे",
    shortName: "जि.प. पुणे",
    department: "जिल्हा परिषद",
    location: "पुणे",
    education: ["१२वी", "पदवी"],
    vacancies: 64,
    salary: "₹१९,९०० – ₹६३,२००",
    deadline: "2026-10-18",
    postedOn: "2026-10-06",
    accent: "orange",
    icon: "building",
    tags: ["नमुना", "स्थानिक संधी", "zilla", "parishad", "zp", "pune", "junior", "assistant"],
    description:
      "जिल्हानिहाय नोकरी शोधण्याचा अनुभव दाखवणारी काल्पनिक कनिष्ठ सहाय्यक नोंद. सर्व भरती तपशील नमुन्याचे आहेत; येथे अर्ज स्वीकारले जात नाहीत.",
    officialUrl: "https://www.punezp.gov.in/",
  },
  {
    id: "demo-railway-04",
    slug: "central-railway-apprentice-demo",
    title: "मध्य रेल्वे — अप्रेंटिस प्रशिक्षणार्थी",
    organization: "मध्य रेल्वे",
    shortName: "मध्य रेल्वे",
    department: "रेल्वे",
    location: "नागपूर",
    education: ["१०वी", "ITI / डिप्लोमा"],
    vacancies: 320,
    salary: "₹७,००० – ₹९,००० मानधन",
    deadline: "2026-10-21",
    postedOn: "2026-10-06",
    accent: "green",
    icon: "train",
    tags: ["नमुना", "अप्रेंटिस", "railway", "railways", "apprentice", "iti", "nagpur"],
    description:
      "तांत्रिक प्रशिक्षणाच्या संधींचे सादरीकरण करण्यासाठी तयार केलेली काल्पनिक नोंद. पदसंख्या, मानधन आणि अंतिम तारीख अधिकृत जाहिरातीवर आधारित नाहीत.",
    officialUrl: "https://cr.indianrailways.gov.in/",
  },
  {
    id: "demo-mahavitaran-05",
    slug: "mahavitaran-technician-demo",
    title: "महावितरण — विद्युत सहाय्यक",
    organization: "महाराष्ट्र राज्य विद्युत वितरण कंपनी",
    shortName: "महावितरण",
    department: "ऊर्जा व तांत्रिक",
    location: "मुंबई शहर",
    education: ["ITI / डिप्लोमा"],
    vacancies: 156,
    salary: "₹१८,००० – ₹२५,०००",
    deadline: "2026-10-25",
    postedOn: "2026-10-05",
    accent: "orange",
    icon: "zap",
    tags: ["नमुना", "तांत्रिक", "mahavitaran", "mseb", "electrical", "vidyut", "mumbai"],
    description:
      "तांत्रिक शिक्षणानुसार शोध आणि नोकरीची माहिती दाखवण्यासाठी तयार केलेली काल्पनिक नोंद. दाखवलेले वेतन व इतर तपशील केवळ नमुना आहेत.",
    officialUrl: "https://www.mahadiscom.in/",
  },
  {
    id: "demo-health-06",
    slug: "public-health-staff-nurse-demo",
    title: "आरोग्य विभाग — परिचारिका व आरोग्य सेवक",
    organization: "सार्वजनिक आरोग्य विभाग, महाराष्ट्र",
    shortName: "आरोग्य विभाग",
    department: "आरोग्य विभाग",
    location: "नाशिक",
    education: ["पदवी", "पदव्युत्तर"],
    vacancies: 96,
    salary: "₹२५,५०० – ₹८१,१००",
    deadline: "2026-10-27",
    postedOn: "2026-10-05",
    accent: "purple",
    icon: "heart",
    tags: ["नमुना", "आरोग्य सेवा", "health", "nurse", "nashik"],
    description:
      "आरोग्य क्षेत्रातील संधींच्या माहिती मांडणीसाठी काल्पनिक भरती नोंद. प्रत्यक्ष पात्रता, नोंदणी, अनुभव आणि भरतीचे नियम अधिकृत अधिसूचनेतूनच निश्चित करावेत.",
    officialUrl: "https://phd.maharashtra.gov.in/",
  },
  {
    id: "demo-post-07",
    slug: "india-post-gds-demo",
    title: "भारतीय टपाल — ग्रामीण डाक सेवक",
    organization: "भारतीय टपाल विभाग",
    shortName: "भारतीय टपाल",
    department: "केंद्र सरकार",
    location: "कोल्हापूर",
    education: ["१०वी"],
    vacancies: 128,
    salary: "₹१०,००० – ₹२४,४७०",
    deadline: "2026-10-09",
    postedOn: "2026-10-04",
    accent: "blue",
    icon: "mail",
    tags: ["नमुना", "१०वी पास", "post", "gds", "kolhapur"],
    description:
      "दहावीनंतरच्या संधींसाठीच्या शोधाचा अनुभव दाखवणारी काल्पनिक नोंद. ही प्रत्यक्ष ग्रामीण डाक सेवक भरतीची माहिती किंवा अर्जाची लिंक नाही.",
    officialUrl: "https://www.indiapost.gov.in/",
  },
  {
    id: "demo-forest-08",
    slug: "maharashtra-forest-guard-demo",
    title: "महाराष्ट्र वन विभाग — वनरक्षक",
    organization: "महाराष्ट्र वन विभाग",
    shortName: "वन विभाग",
    department: "वन विभाग",
    location: "चंद्रपूर",
    education: ["१२वी"],
    vacancies: 72,
    salary: "₹२१,७०० – ₹६९,१००",
    deadline: "2026-10-31",
    postedOn: "2026-10-04",
    accent: "green",
    icon: "trees",
    tags: ["नमुना", "क्षेत्रीय सेवा", "forest", "vanrakshak", "chandrapur"],
    description:
      "वन विभागातील क्षेत्रीय सेवेची माहिती दाखवण्यासाठी तयार केलेली काल्पनिक नोंद. पात्रता, शारीरिक निकष, पदसंख्या आणि तारीख यांची अधिकृत पुष्टी केलेली नाही.",
    officialUrl: "https://mahaforest.gov.in/",
  },
];

export const districts = [
  "पुणे", "मुंबई शहर", "मुंबई उपनगर", "ठाणे", "नाशिक", "नागपूर", "छत्रपती संभाजीनगर", "कोल्हापूर",
  "अहिल्यानगर", "अकोला", "अमरावती", "बीड", "भंडारा", "बुलढाणा", "चंद्रपूर", "धाराशिव", "धुळे",
  "गडचिरोली", "गोंदिया", "हिंगोली", "जळगाव", "जालना", "लातूर", "नांदेड", "नंदुरबार", "पालघर",
  "परभणी", "रायगड", "रत्नागिरी", "सांगली", "सातारा", "सिंधुदुर्ग", "सोलापूर", "वर्धा", "वाशीम", "यवतमाळ",
];

export const educationOptions = ["१०वी", "१२वी", "ITI / डिप्लोमा", "पदवी", "पदव्युत्तर"];

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("mr-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${iso}T00:00:00+05:30`));
}

/** Use the disclosed demo date consistently until live recruitment data is added. */
export function getDeadlineStatus(deadline: string, referenceDate = demoToday) {
  const days = Math.round(
    (Date.parse(`${deadline}T00:00:00+05:30`) - Date.parse(`${referenceDate}T00:00:00+05:30`)) / 86400000,
  );
  if (days < 0) return { days, kind: "closed", label: "मुदत संपली" } as const;
  if (days === 0) return { days, kind: "today", label: "आज शेवटचा दिवस" } as const;
  if (days <= 7) return { days, kind: "soon", label: `${new Intl.NumberFormat("mr-IN").format(days)} दिवस बाकी` } as const;
  return { days, kind: "open", label: "" } as const;
}

export function isClosingSoon(deadline: string, referenceDate = demoToday) {
  const { days } = getDeadlineStatus(deadline, referenceDate);
  return days >= 0 && days <= 7;
}
