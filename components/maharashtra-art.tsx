export default function MaharashtraArt() {
  return (
    <div className="maharashtra-art" aria-hidden="true">
      <div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" />
      <div className="map-sun" /><span className="art-plus plus-one">+</span><span className="art-plus plus-two">+</span>
      <svg className="maharashtra-map" viewBox="0 0 500 390" fill="none">
        <defs><pattern id="map-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#B4C8DD"/></pattern></defs>
        <path d="m93 102 19-15 23 11 17-16 20 7 15-21 25 9 18-12 25 14 29-10 20 13 23-7 18 14 26-4 15 18 27-4 14 17 27 1 7 22-14 17 7 23-21 18-24-5-7 24-29 6-11 24-27-4-14 27-25-8-20 17-28-7-9 23-25-2-16 25-21-9-7-31-17-23-2-31-14-21 6-24-9-22 8-19-5-22 12-17-5-24Z" fill="#E8F0F9" stroke="#A7BEDA" strokeWidth="1.7" strokeLinejoin="round"/>
        <path d="m93 102 19-15 23 11 17-16 20 7 15-21 25 9 18-12 25 14 29-10 20 13 23-7 18 14 26-4 15 18 27-4 14 17 27 1 7 22-14 17 7 23-21 18-24-5-7 24-29 6-11 24-27-4-14 27-25-8-20 17-28-7-9 23-25-2-16 25-21-9-7-31-17-23-2-31-14-21 6-24-9-22 8-19-5-22 12-17-5-24Z" fill="url(#map-dots)"/>
        <g stroke="#C5D5E7" strokeWidth="1.2"><path d="m146 101-5 56 30 23-10 54 26 28m-91-88 45-17 33-20 45 7 10 42 37 10 20 44m-115-60 58 6 29-29 37 2 28-33 13-42m-97 33-2-41m47 37 20-33-8-32m34 69 33 24 26-14 22 26 36-13m-84 42 29 10 2 40m-63-79-6 44-21 16 12 46m-6-62-32 2-19 41m-13-54-40 19m172-101 6-31m20 45 29-15"/></g>
        <path d="M143 213Q198 108 355 142" stroke="#0D47A1" strokeOpacity=".3" strokeDasharray="5 6"/>
        <g><circle cx="115" cy="193" r="13" fill="#0D47A1" fillOpacity=".1"/><circle cx="115" cy="193" r="5" fill="#0D47A1" stroke="white" strokeWidth="2"/><circle cx="169" cy="224" r="14" fill="#FB8C00" fillOpacity=".16"/><circle cx="169" cy="224" r="5" fill="#E77B00" stroke="white" strokeWidth="2"/><circle cx="257" cy="151" r="5" fill="#0D47A1" stroke="white" strokeWidth="2"/><circle cx="355" cy="142" r="14" fill="#0D47A1" fillOpacity=".1"/><circle cx="355" cy="142" r="5" fill="#0D47A1" stroke="white" strokeWidth="2"/></g>
      </svg>
      <div className="map-label label-mumbai"><span className="map-label-icon">मुं</span><div><strong>मुंबई</strong><span>स्वप्नांच्या दिशेने.</span></div><span className="map-label-dot" /></div>
      <div className="map-label label-nagpur"><span className="map-label-icon orange">ना</span><div><strong>नागपूर</strong><span>नव्या संधींच्या शोधात.</span></div><span className="map-label-dot" /></div>
      <div className="map-label label-pune"><span className="map-label-icon green">पु</span><div><strong>पुणे</strong><span>तुमच्या जवळची नोकरी.</span></div><span className="map-label-dot" /></div>
      <div className="map-caption"><span />एक महाराष्ट्र. अनेक संधी.</div>
    </div>
  );
}
