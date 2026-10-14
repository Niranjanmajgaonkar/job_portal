import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="detail-page page-shell">
      <div className="empty-state not-found-state">
        <span className="eyebrow">४०४ · पान उपलब्ध नाही</span>
        <h1>हे पान सापडले नाही.</h1>
        <p>दुवा बदलला असू शकतो. मुख्यपृष्ठावरून तुमच्या शिक्षणानुसार किंवा जिल्ह्यानुसार संधी शोधा.</p>
        <Link className="primary-button" href="/">मुख्यपृष्ठावर जा <span aria-hidden="true">→</span></Link>
        <Link className="secondary-button" href="/#latest-jobs">नमुना भरती पाहा</Link>
      </div>
    </main>
  );
}
