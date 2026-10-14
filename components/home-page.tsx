"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Icon, { type IconName } from "./icon";
import MaharashtraArt from "./maharashtra-art";
import { jobs, districts, educationOptions, formatDate, getDeadlineStatus, isClosingSoon, type Job } from "@/lib/jobs";

type ListingTab = "all" | "closing" | "saved";
type Panel = "alerts" | "results" | "admit" | "calendar" | "documents" | "application" | "safety" | "about" | "privacy" | null;
const numeral = (value: number) => new Intl.NumberFormat("mr-IN").format(value);
const scrollBehavior = (): ScrollBehavior => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
const departmentItems: { label: string; value: string; icon: IconName; color: string }[] = [
  { label: "MPSC", value: "MPSC", icon: "landmark", color: "blue" },
  { label: "पोलीस भरती", value: "पोलीस", icon: "shield", color: "orange" },
  { label: "रेल्वे भरती", value: "रेल्वे", icon: "train", color: "green" },
  { label: "जिल्हा परिषद", value: "जिल्हा परिषद", icon: "building", color: "purple" },
  { label: "महावितरण", value: "महावितरण", icon: "zap", color: "orange" },
  { label: "आरोग्य विभाग", value: "आरोग्य", icon: "heart", color: "red" },
];

function Dialog({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog?.close();
      queueMicrotask(() => {
        const returnTarget = opener?.isConnected ? opener : document.querySelector<HTMLElement>(".menu-button");
        returnTarget?.focus({ preventScroll: true });
      });
    };
  }, []);
  return <dialog ref={ref} className="dialog" aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}><div className="dialog-content"><div className="dialog-heading"><h2 id={titleId}>{title}</h2><button className="icon-button" aria-label="बंद करा" onClick={close}><Icon name="close" /></button></div>{children}</div></dialog>;
}

function JobRow({ job, saved, onSave }: { job: Job; saved: boolean; onSave: () => void }) {
  const status = getDeadlineStatus(job.deadline);
  return (
    <li className="job-row">
      <Link href={`/bharti/${job.slug}`} className="job-row-link">
        <div className="job-row-summary">
          <h3>{job.title}</h3>
          <p className="job-row-vacancies">{numeral(job.vacancies)} जागा</p>
        </div>
        <div className="job-row-deadline">
          <span className="sr-only">अंतिम तारीख: </span>
          <time dateTime={job.deadline}>{formatDate(job.deadline)}</time>
          {status.label && <span className={`job-row-status status-${status.kind}`}>{status.label}</span>}
        </div>
      </Link>
      <button
        type="button"
        className={`job-row-save ${saved ? "is-saved" : ""}`}
        onClick={onSave}
        aria-label={saved ? `${job.title} जतन यादीतून काढा` : `${job.title} जतन करा`}
        aria-pressed={saved}
      >
        <Icon name="bookmark" size={20} />
      </button>
    </li>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [education, setEducation] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");
  const [tab, setTab] = useState<ListingTab>("all");
  const [sort, setSort] = useState("latest");
  const [limit, setLimit] = useState(6);
  const [saved, setSaved] = useState<string[]>([]);
  const [panel, setPanel] = useState<Panel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [toast, setToast] = useState("");
  const [alertEducation, setAlertEducation] = useState("");
  const [alertDistrict, setAlertDistrict] = useState("");
  const [alertSaved, setAlertSaved] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const listingsHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem("nm-saved-jobs") ?? "[]");
      if (Array.isArray(stored)) setSaved(stored.filter((id): id is string => typeof id === "string" && jobs.some((job) => job.id === id)));
      const preferences = JSON.parse(localStorage.getItem("nm-alert-preferences") ?? "null");
      if (preferences && typeof preferences.education === "string" && typeof preferences.district === "string") {
        setAlertEducation(preferences.education); setAlertDistrict(preferences.district); setAlertSaved(true);
      }
    } catch { /* Local preferences are optional when browser storage is unavailable. */ }
  }, []);

  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 3000); return () => clearTimeout(timer); }, [toast]);

  function toggleSave(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    try { localStorage.setItem("nm-saved-jobs", JSON.stringify(next)); setToast(next.includes(id) ? "नोकरी तुमच्या यादीत जतन केली." : "नोकरी जतन यादीतून काढली."); }
    catch { setToast("या सत्रासाठी जतन केली. या ब्राउझरमध्ये कायम जतन करता येत नाही."); }
  }

  function showListings(nextTab: ListingTab = "all") {
    setTab(nextTab); setLimit(6); setMenuOpen(false);
    requestAnimationFrame(() => {
      listingsHeadingRef.current?.focus({ preventScroll: true });
      document.getElementById("latest-jobs")?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    });
  }

  function clearFilters() { setQuery(""); setEducation(""); setDistrict(""); setDepartment(""); setLimit(6); }
  function openSaved() { clearFilters(); showListings("saved"); }
  function search(event: FormEvent) { event.preventDefault(); showListings("all"); setMobileFilters(false); }
  function chooseDepartment(value: string) { clearFilters(); setDepartment(value); showListings("all"); }

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const text = [job.title, job.organization, job.shortName, job.department, job.location, ...job.tags, ...job.education].join(" ").toLocaleLowerCase();
    return (!normalizedQuery || normalizedQuery.split(/\s+/).every((word) => text.includes(word))) && (!education || job.education.includes(education)) && (!district || job.location === district || job.location === "संपूर्ण महाराष्ट्र") && (!department || job.department.includes(department) || job.shortName.includes(department)) && (tab !== "saved" || saved.includes(job.id)) && (tab !== "closing" || isClosingSoon(job.deadline));
  }).sort((a, b) => sort === "deadline" ? a.deadline.localeCompare(b.deadline) : b.postedOn.localeCompare(a.postedOn));
  const closingJobs = [...jobs].filter((job) => isClosingSoon(job.deadline)).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 3);
  const hasFilters = Boolean(query || education || district || department);
  const panels: Record<Exclude<Panel, null>, string> = { alerts: "तुमच्या आवडीनुसार संधी", results: "परीक्षांचे निकाल", admit: "प्रवेशपत्रे", calendar: "परीक्षा दिनदर्शिका", documents: "कागदपत्रांची तयारी", application: "ऑनलाइन अर्ज कसा करायचा?", safety: "सुरक्षितपणे अर्ज करा", about: "नोकरी महाराष्ट्रविषयी", privacy: "तुमची माहिती आणि गोपनीयता" };

  return <>
    <div className="top-strip"><div className="container top-strip-inner"><span><span className="tiny-spark">✦</span> योग्य माहिती. योग्य संधी. तुमच्या भाषेत.</span><span className="top-date">बुधवार, ७ ऑक्टोबर २०२६ <span className="top-divider">|</span> मराठी प्रथम <Icon name="heart" size={12} /></span></div></div>
    <header className="site-header"><div className="container header-inner">
      <Link href="/" className="brand" aria-label="नोकरी महाराष्ट्र मुख्यपृष्ठ"><span className="brand-symbol"><span /><span /><span /><i /></span><span><strong>नोकरी<span>महाराष्ट्र</span></strong><small>तुमच्या भविष्याची नवी दिशा</small></span></Link>
      <nav className="desktop-nav" aria-label="मुख्य नेव्हिगेशन"><a className="active" href="#latest-jobs" onClick={() => { clearFilters(); setTab("all"); }}>नवीन भरती</a><button onClick={() => setPanel("results")}>निकाल</button><button onClick={() => setPanel("admit")}>प्रवेशपत्रे</button><a href="#guidance">मार्गदर्शन</a></nav>
      <div className="header-actions"><button className="header-saved" onClick={openSaved} aria-label={`जतन केलेल्या ${numeral(saved.length)} नोकऱ्या`}><Icon name="bookmark" size={19} /><span>जतन केलेल्या</span>{saved.length > 0 && <b>{numeral(saved.length)}</b>}</button><button className="primary-button alerts-button" aria-label="जॉब अपडेट्सची पसंती निवडा" onClick={() => setPanel("alerts")}><Icon name="bell" size={17} /><span>जॉब अपडेट्स</span></button><button className="icon-button menu-button" aria-label={menuOpen ? "मेनू बंद करा" : "मेनू उघडा"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button></div>
    </div>{menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="मोबाईल नेव्हिगेशन"><button onClick={() => { clearFilters(); showListings(); }}>नवीन भरती</button><button onClick={() => { setPanel("results"); setMenuOpen(false); }}>निकाल</button><button onClick={() => { setPanel("admit"); setMenuOpen(false); }}>प्रवेशपत्रे</button><a href="#guidance" onClick={() => setMenuOpen(false)}>मार्गदर्शन</a><button onClick={openSaved}>जतन केलेल्या ({numeral(saved.length)})</button></nav>}</header>

    <main id="main-content">
      <section className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="eyebrow"><span />महाराष्ट्राच्या तरुणांसाठी, मराठीतून.</div><h1>तुमच्या पुढच्या<br /><span>संधीचा शोध,</span> इथूनच.</h1><p>सरकारी नोकरीच्या प्रवासात तुमची साथ.<br />भरतीची माहिती, पात्रता आणि महत्त्वाच्या तारखा—सोप्या मराठीत.</p><div className="hero-assurances"><span><Icon name="check" size={16} />तुमच्या पात्रतेनुसार</span><span><Icon name="check" size={16} />तुमच्या जिल्ह्यात</span><span><Icon name="check" size={16} />एकाच ठिकाणी</span></div></div><MaharashtraArt /></div></section>

      <div className="container search-container"><form className="search-panel" onSubmit={search} role="search" aria-label="नोकरी शोधा"><div className="search-panel-heading"><h2>तुमच्यासाठी योग्य नोकरी शोधा</h2><span>एक पाऊल तुमच्या स्वप्नांकडे.</span></div><div className="search-fields"><label className="keyword-field"><Icon name="search" size={21} /><span className="sr-only">नोकरी, पद किंवा विभाग</span><input ref={searchRef} type="search" placeholder="पद, विभाग किंवा नोकरीचे नाव..." value={query} onChange={(e) => { setQuery(e.target.value); setLimit(6); }} /></label><button type="button" className="mobile-filter-toggle" aria-expanded={mobileFilters} aria-controls="search-filters" onClick={() => setMobileFilters(!mobileFilters)}><Icon name="sliders" />फिल्टर्स{(education || district) && <span className="filter-dot" />}</button><div id="search-filters" className={`select-fields ${mobileFilters ? "filters-open" : ""}`}><label className="search-select"><Icon name="graduate" size={19} /><span className="sr-only">शैक्षणिक पात्रता</span><select value={education} onChange={(e) => { setEducation(e.target.value); setLimit(6); }}><option value="">तुमचे शिक्षण</option>{educationOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label className="search-select"><Icon name="pin" size={18} /><span className="sr-only">जिल्हा निवडा</span><select value={district} onChange={(e) => { setDistrict(e.target.value); setLimit(6); }}><option value="">सर्व जिल्हे</option>{districts.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div><button type="submit" className="primary-button search-submit"><Icon name="search" size={18} />नोकरी शोधा<Icon name="arrow" size={17} /></button></div><div className="popular-searches"><span>लोकप्रिय शोध :</span>{["१०वी", "१२वी", "पदवी", "ITI / डिप्लोमा"].map((item) => <button type="button" className={education === item ? "selected" : ""} key={item} onClick={() => { setEducation(education === item ? "" : item); setLimit(6); setTab("all"); }}>{item}</button>)}<span className="search-note"><Icon name="spark" size={14} />तुमची संधी, तुमच्या अटींवर</span></div></form></div>

      <section className="container quick-access" aria-label="झटपट दुवे"><button onClick={() => { clearFilters(); showListings(); }}><span className="quick-icon blue"><Icon name="file" size={22} /></span><span><strong>नवीन भरती</strong><small>संधींचा शोध घ्या</small></span><Icon name="arrow" size={17} /></button><button onClick={() => setPanel("results")}><span className="quick-icon green"><Icon name="landmark" size={22} /></span><span><strong>परीक्षांचे निकाल</strong><small>तुमचा निकाल तपासा</small></span><Icon name="arrow" size={17} /></button><button onClick={() => setPanel("admit")}><span className="quick-icon purple"><Icon name="ticket" size={22} /></span><span><strong>प्रवेशपत्रे</strong><small>परीक्षेची पुढची पायरी</small></span><Icon name="arrow" size={17} /></button><button onClick={() => setPanel("calendar")}><span className="quick-icon orange"><Icon name="calendar" size={22} /></span><span><strong>परीक्षा दिनदर्शिका</strong><small>तारखांचे नियोजन करा</small></span><Icon name="arrow" size={17} /></button></section>

      <section className="listings-section" id="latest-jobs"><div className="container"><div className="section-heading"><div><div className="section-kicker">संधी तुमच्यासाठी</div><h2 ref={listingsHeadingRef} tabIndex={-1}>ताज्या भरती, एकाच ठिकाणी<span className="heading-dot">.</span></h2></div><span className="demo-pill"><span />नमुना प्रिव्ह्यू</span></div><p className="demo-explanation">या प्रिव्ह्यूमधील पदे, जागा आणि तारखा नमुना आहेत. प्रत्यक्ष भरतीसाठी अधिकृत जाहिरात तपासा.</p><div className="listings-layout"><div className="listings-main"><div className="listings-toolbar"><div className="listing-tabs" role="group" aria-label="भरतीची यादी निवडा"><button className={tab === "all" ? "active" : ""} aria-pressed={tab === "all"} onClick={() => { setTab("all"); setLimit(6); }}>सर्व भरती <span>{numeral(jobs.length)}</span></button><button className={tab === "closing" ? "active" : ""} aria-pressed={tab === "closing"} onClick={() => { setTab("closing"); setLimit(6); }}>मुदत जवळ</button><button className={tab === "saved" ? "active" : ""} aria-pressed={tab === "saved"} onClick={() => { setTab("saved"); setLimit(6); }}><Icon name="bookmark" size={15} />जतन केलेल्या</button></div><label className="sort-control"><span className="sr-only">क्रमवारी</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="latest">नवीन आधी</option><option value="deadline">अंतिम तारीख आधी</option></select></label></div><div className="results-meta" aria-live="polite"><span>{numeral(filteredJobs.length)} भरती {hasFilters ? "तुमच्या शोधानुसार" : tab === "saved" ? "जतन केलेल्या" : "उपलब्ध"}</span>{hasFilters && <button onClick={clearFilters}>फिल्टर्स काढा <Icon name="close" size={13} /></button>}</div>{hasFilters && <div className="active-filters">{query && <button onClick={() => setQuery("")}>{query}<Icon name="close" size={12} /></button>}{education && <button onClick={() => setEducation("")}>{education}<Icon name="close" size={12} /></button>}{district && <button onClick={() => setDistrict("")}>{district}<Icon name="close" size={12} /></button>}{department && <button onClick={() => setDepartment("")}>{department}<Icon name="close" size={12} /></button>}</div>}{filteredJobs.length > 0 && (
          <div className="job-list">
            <div className="job-list-heading" aria-hidden="true">
              <span>भरती जाहिरात</span><span>अंतिम तारीख</span><span />
            </div>
            <ul className="job-list-rows" aria-label="भरती जाहिराती">
              {filteredJobs.slice(0, limit).map((job) => (
                <JobRow key={job.id} job={job} saved={saved.includes(job.id)} onSave={() => toggleSave(job.id)} />
              ))}
            </ul>
          </div>
        )}{filteredJobs.length === 0 && <div className="empty-state"><span className="quick-icon blue"><Icon name={tab === "saved" ? "bookmark" : "search"} size={28} /></span><h3>{tab === "saved" && !hasFilters ? "तुमची पहिली संधी जतन करा" : "या शोधासाठी भरती सापडली नाही"}</h3><p>{tab === "saved" && !hasFilters ? "भरतीवरील जतन चिन्हावर टॅप करा. तुमची यादी या ब्राउझरमध्ये राहील." : "वेगळा जिल्हा, शिक्षण किंवा शोधशब्द वापरून पाहा."}</p><button className="secondary-button" onClick={() => { clearFilters(); setTab("all"); }}>सर्व भरती पाहा <Icon name="arrow" size={17} /></button></div>}{limit < filteredJobs.length && <button className="load-more secondary-button" onClick={() => setLimit((current) => current + 6)}>आणखी भरती पाहा <span>({numeral(filteredJobs.length - limit)})</span><Icon name="arrow" size={17} /></button>}</div>

      <aside className="listings-sidebar"><section className="deadline-panel"><div className="sidebar-heading"><span className="sidebar-clock"><Icon name="clock" size={18} /></span><h3>शेवटची तारीख जवळ</h3></div><p>संधी हातातून निसटू देऊ नका.</p><div className="closing-list">{closingJobs.length === 0 && <p>पुढील सात दिवसांत मुदत संपणारी नमुना भरती नाही.</p>}{closingJobs.map((job) => <Link key={job.id} href={`/bharti/${job.slug}`}><div><span>{job.shortName}</span><strong>{job.title}</strong></div><div className="closing-date"><span>{getDeadlineStatus(job.deadline).label}</span><small>{formatDate(job.deadline)}</small></div></Link>)}</div><button className="sidebar-link" onClick={() => { clearFilters(); showListings("closing"); }}>मुदत जवळ असलेल्या भरती <Icon name="arrow" size={16} /></button><small className="deadline-reference">नमुना संदर्भ तारीख : ७ ऑक्टोबर २०२६</small></section><section className="alert-panel"><div className="alert-bell"><Icon name="bell" size={24} /><span /></div><h3>संधीची माहिती.<br />तुमच्या आवडीनुसार.</h3><p>तुमचे शिक्षण आणि जिल्हा निवडा.<br />पुढच्या भेटीसाठी पसंती जतन करा.</p><button onClick={() => setPanel("alerts")}>माझी पसंती निवडा <Icon name="arrow" size={17} /></button><small>मोफत · या ब्राउझरमध्ये जतन होते</small><div className="alert-decoration" /></section><div className="independent-note"><Icon name="shield" size={19} /><p>आम्ही एक स्वतंत्र माहिती पोर्टल आहोत. ही शासकीय वेबसाइट नाही.</p></div></aside></div></div></section>

      <section className="container departments-section" id="departments"><div className="section-heading"><div><div className="section-kicker">तुमच्या आवडीची वाट</div><h2>विभागानुसार नोकऱ्या शोधा</h2></div><button className="text-link" onClick={() => { clearFilters(); showListings(); }}>सर्व विभाग <Icon name="arrow" size={17} /></button></div><div className="department-grid">{departmentItems.map((item) => <button key={item.value} onClick={() => chooseDepartment(item.value)}><span className={`department-icon ${item.color}`}><Icon name={item.icon} size={26} /></span><strong>{item.label}</strong><span className="department-count">{numeral(jobs.filter((job) => job.department.includes(item.value) || job.shortName.includes(item.value)).length)} नमुना भरती</span><Icon name="arrow" size={16} /></button>)}</div></section>

      <section className="guidance-section" id="guidance"><div className="container"><div className="section-heading"><div><div className="section-kicker">प्रत्येक टप्प्यावर तुमच्यासोबत</div><h2>फक्त माहिती नाही, योग्य मार्गदर्शन.</h2></div><span className="guidance-caption">तयारी आजपासूनच सुरू करा.</span></div><div className="guide-grid"><button onClick={() => setPanel("application")}><span className="guide-number">01</span><div><span className="guide-category">अर्ज प्रक्रिया</span><h3>ऑनलाइन अर्ज कसा करायचा?</h3><p>नोंदणीपासून अंतिम सबमिशनपर्यंत,<br />प्रत्येक पायरी सोप्या भाषेत.</p><span className="guide-link">मार्गदर्शन वाचा <Icon name="arrow" size={16} /></span></div><Icon name="file" size={39} /></button><button onClick={() => setPanel("documents")}><span className="guide-number">02</span><div><span className="guide-category">पूर्वतयारी</span><h3>कागदपत्रे तयार आहेत ना?</h3><p>शेवटच्या क्षणी धावपळ टाळा.<br />गरजेच्या कागदपत्रांची यादी पाहा.</p><span className="guide-link">चेकलिस्ट पाहा <Icon name="arrow" size={16} /></span></div><Icon name="book" size={39} /></button><button onClick={() => setPanel("safety")}><span className="guide-number">03</span><div><span className="guide-category">सजग उमेदवार</span><h3>सुरक्षितपणे अर्ज करा.</h3><p>अधिकृत संकेतस्थळ ओळखा.<br />फसव्या जाहिरातींपासून सावध राहा.</p><span className="guide-link">अधिक जाणून घ्या <Icon name="arrow" size={16} /></span></div><Icon name="shield" size={39} /></button></div></div></section>

      <section className="container closing-banner"><div className="closing-banner-icon"><Icon name="spark" size={32} /></div><div><h2>तुमची मेहनत. तुमची स्वप्नं. योग्य संधी.</h2><p>तुमच्या पुढच्या पावलासाठी, नोकरी महाराष्ट्र तुमच्यासोबत.</p></div><button className="primary-button" onClick={() => { searchRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "center" }); searchRef.current?.focus({ preventScroll: true }); }}>माझी नोकरी शोधा <Icon name="arrow" size={17} /></button></section>
    </main>

    <footer className="site-footer"><div className="container footer-main"><div><Link href="/" className="brand footer-brand"><span className="brand-symbol"><span /><span /><span /><i /></span><span><strong>नोकरी<span>महाराष्ट्र</span></strong><small>तुमच्या भविष्याची नवी दिशा</small></span></Link><p>महाराष्ट्रातील तरुणांसाठी नोकरीची माहिती,<br />समजेल अशा मराठीत.</p></div><div className="footer-links"><div><strong>संधी शोधा</strong><button onClick={() => { clearFilters(); showListings(); }}>नवीन भरती</button><a href="#departments">विभागानुसार भरती</a><button onClick={openSaved}>जतन केलेल्या नोकऱ्या</button></div><div><strong>तुमच्या मदतीसाठी</strong><a href="#guidance">अर्ज मार्गदर्शन</a><button onClick={() => setPanel("about")}>आमच्याविषयी</button><button onClick={() => setPanel("privacy")}>गोपनीयता</button></div></div><div className="footer-source"><span><Icon name="shield" size={17} />माहितीचा आधार, अधिकृत स्रोत.</span><p>अर्ज करण्यापूर्वी संबंधित विभागाची मूळ जाहिरात आणि अटी नेहमी तपासा.</p><a href="https://www.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">महाराष्ट्र शासन संकेतस्थळ <Icon name="external" size={13} /></a></div></div><div className="container footer-bottom"><span>© २०२६ नोकरी महाराष्ट्र. स्वतंत्र माहिती पोर्टल.</span><span>महाराष्ट्रासाठी, मनापासून <span className="footer-heart">♡</span></span></div></footer>
    <nav className="mobile-bottom-nav" aria-label="झटपट मोबाईल नेव्हिगेशन"><a href="#main-content"><Icon name="home" size={21} /><span>मुख्यपृष्ठ</span></a><button onClick={() => { clearFilters(); showListings(); }}><Icon name="search" size={21} /><span>नोकऱ्या</span></button><button onClick={openSaved}><Icon name="bookmark" size={21} /><span>जतन {saved.length > 0 ? `(${numeral(saved.length)})` : ""}</span></button><button onClick={() => setPanel("alerts")}><Icon name="bell" size={21} /><span>पसंती</span></button></nav>
    {toast && !panel && <div className="toast" role="status"><Icon name="check" size={18} />{toast}</div>}

    {panel && <Dialog title={panels[panel]} close={() => setPanel(null)}>
      {toast && <div className="dialog-status" role="status"><Icon name="check" size={17} />{toast}</div>}
      {panel === "alerts" ? <form onSubmit={(event) => { event.preventDefault(); try { localStorage.setItem("nm-alert-preferences", JSON.stringify({ education: alertEducation, district: alertDistrict })); setAlertSaved(true); setToast("तुमची पसंती या ब्राउझरमध्ये जतन केली."); } catch { setAlertSaved(false); setToast("या ब्राउझरमध्ये पसंती जतन करता आली नाही."); } }}><p>तुमच्यासाठी महत्त्वाच्या संधी लवकर शोधण्यासाठी शिक्षण आणि जिल्हा निवडा.</p><label className="dialog-field">तुमचे शिक्षण<select value={alertEducation} onChange={(event) => { setAlertEducation(event.target.value); setAlertSaved(false); }}><option value="">सर्व पात्रता</option>{educationOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="dialog-field">तुमचा जिल्हा<select value={alertDistrict} onChange={(event) => { setAlertDistrict(event.target.value); setAlertSaved(false); }}><option value="">सर्व जिल्हे</option>{districts.map((item) => <option key={item}>{item}</option>)}</select></label><div className="preference-note"><Icon name="shield" size={20} /><p>ही पसंती फक्त या ब्राउझरमध्ये जतन होते. सध्या WhatsApp, ईमेल किंवा push सूचना पाठवल्या जात नाहीत.</p></div><button type="submit" className="primary-button full-width"><Icon name={alertSaved ? "check" : "bookmark"} size={18} />{alertSaved ? "पसंती जतन झाली" : "माझी पसंती जतन करा"}</button><button type="button" className="text-link preference-search" onClick={() => { clearFilters(); setEducation(alertEducation); setDistrict(alertDistrict); setPanel(null); showListings(); }}>या पसंतीनुसार नोकऱ्या पाहा <Icon name="arrow" size={17} /></button></form>
      : panel === "application" ? <><p>प्रत्येक भरतीची अर्ज प्रक्रिया वेगळी असते. नेहमी संबंधित विभागाच्या मूळ जाहिरातीला प्राधान्य द्या.</p><ol className="guide-steps"><li><strong>जाहिरात नीट वाचा</strong><span>पद, शैक्षणिक पात्रता, वयोमर्यादा, शुल्क आणि अर्जाची अंतिम तारीख तपासा.</span></li><li><strong>अधिकृत संकेतस्थळावर नोंदणी करा</strong><span>तुमचा स्वतःचा मोबाईल नंबर आणि ईमेल वापरा. पासवर्ड सुरक्षित ठेवा.</span></li><li><strong>माहिती आणि कागदपत्रे भरा</strong><span>नाव, जन्मतारीख आणि प्रमाणपत्रांतील तपशील जुळतात याची खात्री करा.</span></li><li><strong>पुन्हा तपासा आणि सबमिट करा</strong><span>सर्व तपशील व शुल्क तपासल्यानंतर अर्ज सबमिट करा. अर्जाची PDF व पावती जतन करा.</span></li></ol></>
      : panel === "documents" ? <><p>भरतीनुसार कागदपत्रे बदलू शकतात. मूळ जाहिरातीतील यादीशी ही तयारी तपासा.</p><ul className="document-checklist">{["शैक्षणिक गुणपत्रिका आणि प्रमाणपत्रे", "ओळखपत्र आणि जन्मतारखेचा पुरावा", "अलीकडील फोटो आणि स्वाक्षरीची स्कॅन प्रत", "लागू असल्यास जात / प्रवर्ग प्रमाणपत्र", "आवश्यक असल्यास अधिवास / नॉन-क्रीमी लेयर प्रमाणपत्र", "अनुभव प्रमाणपत्र आणि इतर आवश्यक कागदपत्रे"].map((item) => <li key={item}><Icon name="check" size={18} />{item}</li>)}</ul><p className="preference-note">फाइलचा प्रकार, आकार आणि प्रमाणपत्राची वैधता संबंधित जाहिरातीत दिल्याप्रमाणे तपासा.</p></>
      : panel === "safety" ? <><p>तुमची वैयक्तिक माहिती आणि पैसे सुरक्षित ठेवा.</p><ul className="document-checklist">{["अधिकृत विभागाच्या वेबसाइटवरूनच अर्जाची लिंक उघडा.", "नोकरी मिळवून देण्याच्या बदल्यात कोणालाही पैसे देऊ नका.", "OTP, पासवर्ड आणि बँक तपशील कोणाशीही शेअर करू नका.", "शुल्क भरण्यापूर्वी अधिकृत जाहिरातीतील रक्कम तपासा.", "अर्जाची प्रत, व्यवहार क्रमांक आणि पावती जतन करा."].map((item) => <li key={item}><Icon name="shield" size={18} />{item}</li>)}</ul><a className="secondary-button full-width" href="https://www.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">महाराष्ट्र शासन संकेतस्थळ <Icon name="external" size={16} /></a></>
      : panel === "about" ? <><p>नोकरी महाराष्ट्र हे मराठी भाषेत भरतीची माहिती समजून घेण्यासाठी तयार केलेले स्वतंत्र माहिती पोर्टल आहे. हे शासनाचे संकेतस्थळ नाही.</p><p>सध्या तुम्ही homepage चा नमुना प्रिव्ह्यू पाहत आहात. भरतीतील पदसंख्या, वेतन आणि तारखा डिझाइन दाखवण्यासाठी आहेत.</p><p>प्रत्यक्ष अर्जासाठी संबंधित विभागाच्या अधिकृत जाहिरातीतील माहितीच ग्राह्य धरा.</p></>
      : panel === "privacy" ? <><p>जतन केलेल्या नोकऱ्या आणि तुमची पसंती या ब्राउझरच्या स्थानिक स्टोरेजमध्ये राहतात. या प्रिव्ह्यूमध्ये खाते किंवा वैयक्तिक माहिती मागितली जात नाही.</p><p>ब्राउझरची site data साफ केल्यास ही यादी मिटेल. दुसऱ्या उपकरणावर ही माहिती आपोआप दिसणार नाही.</p><button className="secondary-button full-width" onClick={() => { try { localStorage.removeItem("nm-saved-jobs"); localStorage.removeItem("nm-alert-preferences"); setSaved([]); setAlertEducation(""); setAlertDistrict(""); setAlertSaved(false); setToast("या पोर्टलची जतन केलेली माहिती काढली."); } catch { setToast("या ब्राउझरमधील माहिती काढता आली नाही."); } }}>माझी जतन केलेली माहिती काढा</button></>
      : <><div className="updates-empty"><span className="quick-icon blue"><Icon name={panel === "results" ? "landmark" : panel === "admit" ? "ticket" : "calendar"} size={29} /></span><h3>या विभागात अद्याप नोंदी नाहीत.</h3><p>हा नमुना प्रिव्ह्यू आहे. {panel === "results" ? "निकाल" : panel === "admit" ? "प्रवेशपत्र" : "परीक्षेच्या तारखा"} तपासण्यासाठी संबंधित विभागाच्या अधिकृत वेबसाइटला भेट द्या.</p></div><div className="official-links"><a href="https://mpsc.gov.in/" target="_blank" rel="noopener noreferrer">महाराष्ट्र लोकसेवा आयोग <Icon name="external" size={15} /></a><a href="https://www.mahapolice.gov.in/" target="_blank" rel="noopener noreferrer">महाराष्ट्र पोलीस <Icon name="external" size={15} /></a></div></>}
    </Dialog>}
  </>;
}
