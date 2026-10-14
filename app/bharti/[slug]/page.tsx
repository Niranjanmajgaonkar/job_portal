import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, jobs } from "@/lib/jobs";

type JobPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((entry) => entry.slug === slug);

  return {
    title: job ? `${job.title} — नमुना` : "पान सापडले नाही",
    description: job
      ? `${job.title}: फ्रंटएंड प्रात्यक्षिकातील काल्पनिक भरती नोंद. ही प्रत्यक्ष भरती जाहिरात नाही.`
      : "ही भरती नोंद उपलब्ध नाही.",
    robots: { index: false, follow: false },
  };
}

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {external ? <><path d="M14 3h7v7M21 3 10 14" /><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></> : <><path d="m12 5-7 7 7 7" /><path d="M5 12h14" /></>}
    </svg>
  );
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = jobs.find((entry) => entry.slug === slug);

  if (!job) notFound();

  const relatedJobs = jobs.filter((entry) => entry.id !== job.id).slice(0, 3);

  return (
    <main id="main-content" className="detail-page page-shell">
      <nav className="breadcrumb" aria-label="पानाचा मार्ग">
        <Link href="/">मुख्यपृष्ठ</Link><span aria-hidden="true">/</span>
        <Link href="/#latest-jobs">भरती</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{job.shortName}</span>
      </nav>

      <div className="demo-notice" role="note">
        <strong>प्रात्यक्षिकासाठी नमुना नोंद.</strong> ही प्रत्यक्ष भरती जाहिरात नाही. पदसंख्या, पात्रता, वेतन आणि तारखा काल्पनिक आहेत.
      </div>

      <header className="detail-header">
        <div className="detail-tags"><span className={`category-pill ${job.accent}`}>{job.department}</span><span className="sample-badge">नमुना</span></div>
        <h1>{job.title}</h1>
        <p>{job.organization} <span aria-hidden="true">·</span> {job.location}</p>
        <p className="detail-meta">नमुना प्रकाशन: <time dateTime={job.postedOn}>{formatDate(job.postedOn)}</time></p>
      </header>

      <div className="detail-grid">
        <div className="detail-content">
          <section className="detail-card" aria-labelledby="about-job">
            <span className="eyebrow">एका नजरेत</span>
            <h2 id="about-job">या संधीविषयी</h2>
            <p>{job.description}</p>
            <dl className="detail-facts">
              <div><dt>एकूण जागा (नमुना)</dt><dd>{job.vacancies.toLocaleString("mr-IN")}</dd></div>
              <div><dt>नोकरीचे ठिकाण</dt><dd>{job.location}</dd></div>
              <div><dt>शिक्षणाचे वर्गीकरण (नमुना)</dt><dd>{job.education.join(" / ")}</dd></div>
              <div><dt>मासिक वेतन / मानधन (नमुना)</dt><dd>{job.salary}</dd></div>
              <div><dt>प्रकाशन तारीख (नमुना)</dt><dd><time dateTime={job.postedOn}>{formatDate(job.postedOn)}</time></dd></div>
              <div><dt>अंतिम तारीख (नमुना)</dt><dd><time dateTime={job.deadline}>{formatDate(job.deadline)}</time></dd></div>
            </dl>
          </section>

          <section className="detail-card" aria-labelledby="before-applying">
            <h2 id="before-applying">प्रत्यक्ष अर्ज करण्यापूर्वी</h2>
            <p>विभागाच्या अधिकृत संकेतस्थळावर संबंधित अधिसूचना शोधा. वयोमर्यादा, अचूक शैक्षणिक पात्रता, आरक्षण, शुल्क आणि निवड प्रक्रियेची माहिती त्या अधिसूचनेतून तपासा.</p>
            <ol className="detail-checklist">
              <li>जाहिरात क्रमांक आणि अर्जाची अंतिम तारीख तपासा.</li>
              <li>पदानुसार आवश्यक प्रमाणपत्रे व पात्रता वाचा.</li>
              <li>अधिकृत अधिसूचनेतील अर्जाच्या दुव्याचाच वापर करा.</li>
            </ol>
          </section>
        </div>

        <aside className="detail-summary" aria-label="अधिकृत स्रोत">
          <div className="detail-card detail-source">
            <span className="eyebrow">पुढचे पाऊल</span>
            <h2>अधिकृत माहिती पाहा</h2>
            <p>खालील दुवा विभागाच्या मुख्य संकेतस्थळाचा आहे. तो या काल्पनिक नोंदीचा अर्ज किंवा जाहिरात नाही.</p>
            <a className="primary-button" href={job.officialUrl} target="_blank" rel="noopener noreferrer">विभागाचे संकेतस्थळ <ArrowIcon external /><span className="sr-only"> (नवीन टॅबमध्ये उघडेल)</span></a>
            <Link className="secondary-button" href="/#latest-jobs"><ArrowIcon /> सर्व नमुना भरती पाहा</Link>
            <p className="detail-source-note">नोकरी महाराष्ट्र हे स्वतंत्र पोर्टल आहे. येथे सध्या अर्ज स्वीकारले जात नाहीत.</p>
          </div>
        </aside>
      </div>

      <section className="detail-related" aria-labelledby="more-jobs">
        <div className="section-heading"><div><span className="eyebrow">आणखी शोधा</span><h2 id="more-jobs">इतर नमुना संधी</h2></div><Link href="/#latest-jobs">सर्व पाहा <span aria-hidden="true">→</span></Link></div>
        <div className="detail-related-grid">
          {relatedJobs.map((entry) => <Link className="detail-card related-job" key={entry.id} href={`/bharti/${entry.slug}`}><span className="eyebrow">{entry.shortName} · नमुना</span><h3>{entry.title}</h3><p>{entry.location} · {entry.education.join(" / ")}</p><span className="related-link">माहिती पाहा <span aria-hidden="true">↗</span></span></Link>)}
        </div>
      </section>
    </main>
  );
}
