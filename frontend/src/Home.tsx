import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, HeartPulse, MapPin, MoveUpRight, Check } from 'lucide-react';
import { media } from './api';

export const courseEnquiry = 'https://alvo.chat/8djp';
export const consultationEnquiry = 'https://wa.me/919355441199';

export default function Home() {
  return <main className="swasthya-home">
    <section className="welcome-section">
      <div className="container welcome-grid">
        <div className="welcome-copy">
          <span className="eyebrow">SWASTHYA MEDICAL YOGA INSTITUTE</span>
          <h1>A little more ease.<br />A better way<br />to <em>move through life.</em></h1>
          <p>Thoughtful medical yoga for spine and joint care. Discover a guided approach to movement, rehabilitation, and everyday wellbeing.</p>
          <div className="welcome-actions"><Link className="btn" to="/booking">Find your practice <ArrowRight size={17} /></Link><Link className="text-link" to="/courses">Explore our courses <MoveUpRight size={16} /></Link></div>
          <div className="welcome-location"><MapPin size={15} /> Pune & Navi Mumbai <span>In person & online</span></div>
        </div>
        <div className="welcome-visual">
          <img src={media.meditate} alt="A quiet moment of seated yoga practice" fetchPriority="high" />
          <span className="photo-credit">Practice inspiration · stock photography</span>
          <div className="practice-note"><span className="practice-symbol">ॐ</span><div><strong>Care begins with understanding.</strong><p>Movement. Awareness. A practice for you.</p></div></div>
        </div>
      </div>
    </section>

    <section className="principles-strip"><div className="container"><span>Rooted in yogic tradition</span><span>Informed by anatomy</span><span>Guided with personal attention</span><span>Made for everyday life</span></div></section>

    <section className="section pathways-section"><div className="container">
      <div className="section-head"><div><span className="eyebrow">HOW WE CAN HELP</span><h2>Your journey.<br /><em>Your own pace.</em></h2></div><p className="section-intro">Whether you’re looking for guidance or learning to guide others, begin with what matters to you.</p></div>
      <div className="pathway-grid">
        <Link to="/medical-yoga" className="pathway-card"><HeartPulse size={28} strokeWidth={1.3} /><h3>Care for your movement</h3><p>Explore medical yoga with a focus on the spine, joints, and movement awareness.</p><span>Discover medical yoga <ArrowRight size={16} /></span></Link>
        <Link to="/courses" className="pathway-card"><BookOpen size={28} strokeWidth={1.3} /><h3>Deepen your understanding</h3><p>Explore structured learning and enquire about medical yoga therapy training.</p><span>Find a course <ArrowRight size={16} /></span></Link>
        <Link to="/booking" className="pathway-card"><MapPin size={28} strokeWidth={1.3} /><h3>Begin with a conversation</h3><p>Tell us what brings you here. Find out about online and in-person sessions.</p><span>Request a consultation <ArrowRight size={16} /></span></Link>
      </div>
    </div></section>

    <section className="institute-section section"><div className="container institute-grid">
      <div className="institute-art"><img src={media.studio} alt="Yoga practice in a light-filled space" loading="lazy" /><span>SPACE TO LEARN. ROOM TO GROW.</span></div>
      <div className="institute-copy"><span className="eyebrow">THE SWASTHYA APPROACH</span><h2>Traditional wisdom.<br /><em>Thoughtful practice.</em></h2><p>At Swasthya, yoga brings together health, education, and lifestyle. Our focus is on understanding movement and supporting a practice suited to the individual.</p><p>Explore medical yoga education with Dr. Pradnyesh Naikwade and discover the institute’s work in spine and joint care.</p><ul className="approach-list"><li><Check size={17} /> An understanding of the body</li><li><Check size={17} /> Guided movement and practice</li><li><Check size={17} /> Learning that connects to daily life</li></ul><Link className="text-link" to="/about">Get to know Swasthya <ArrowRight size={16} /></Link></div>
    </div></section>

    <section className="section"><div className="container training-panel">
      <div><span className="eyebrow">MEDICAL YOGA EDUCATION</span><h2>Turn curiosity into<br /><em>deeper understanding.</em></h2><p>Interested in the Medical Yoga Therapy Course? Speak with the team about the curriculum, eligibility, format, and upcoming batch.</p><a className="btn" href={courseEnquiry} target="_blank" rel="noopener noreferrer">Enquire about the course <MoveUpRight size={16} /></a></div>
      <div className="training-details"><BookOpen size={34} strokeWidth={1.2} /><h3>Medical Yoga<br />Therapy Course</h3><p>December–January 2026–27</p><div className="training-divider" /><p>Course details and registration<br />through the Swasthya team</p><span>Enquiry via WhatsApp <ArrowRight size={16} /></span></div>
    </div></section>

    <section className="journal-preview section"><div className="container"><div className="section-head"><div><span className="eyebrow">THE JOURNAL</span><h2>A moment to <em>reflect.</em></h2></div><Link className="text-link" to="/blog">Visit the journal <ArrowRight size={16} /></Link></div><div className="journal-links"><Link to="/blog/make-space-for-a-mindful-routine"><span>EVERYDAY PRACTICE · SAMPLE ARTICLE</span><h3>Make space for a mindful routine</h3><ArrowRight size={20} /></Link><Link to="/blog/prepare-for-your-first-online-class"><span>LEARNING · SAMPLE ARTICLE</span><h3>Preparing for your first online class</h3><ArrowRight size={20} /></Link></div></div></section>
    <section className="closing-section"><div className="container"><span className="eyebrow">LET’S FIND YOUR NEXT STEP</span><h2>A more mindful way forward<br />starts with a conversation.</h2><a className="btn" href={consultationEnquiry} target="_blank" rel="noopener noreferrer">Talk to the Swasthya team <MoveUpRight size={16} /></a><p>Pune & Navi Mumbai · Online consultations available</p></div></section>
  </main>;
}
