import { useEffect, useRef, useState, type MouseEvent } from 'react';
import AboutBackground from './components/AboutBackground';
import AnimatedBackground from './components/AnimatedBackground';
import Avatar from './components/Avatar';
import ContactBackground from './components/ContactBackground';
import IeeeBackground from './components/IeeeBackground';
import JourneyBackground from './components/JourneyBackground';
import SkillsBackground from './components/SkillsBackground';
import useInView from './hooks/useInView';
import useSharedInView from './hooks/useSharedInView';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Coffee,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  ImagePlus,
  Layers,
  Lightbulb,
  Linkedin,
  Mail,
  Menu,
  Mic,
  Microscope,
  Presentation,
  Quote,
  Repeat,
  Send,
  Sparkles,
  Terminal,
  Trophy,
  X,
  Zap,
} from 'lucide-react';

type Project = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technical: string;
  tags: string[];
  accent: string;
  mark: string;
  icon: typeof Code2;
  category: string;
};

type Achievement = {
  title: string;
  description: string;
  year: string;
  organization: string;
  award?: string;
  className: string;
  ratio: string;
  image?: string;
  images?: string[];
  imagePosition?: string;
  imageFit?: 'cover' | 'contain' | 'contain-blur';
  imageZoom?: number;
  imageOrigin?: string;
  alt?: string;
};

type IeeeActivity = {
  title: string;
  role: string;
  text: string;
};

type Skill = {
  name: string;
  icon: typeof Code2;
  items: string[];
  color: string;
};

const navItems = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['IEEE', 'ieee'],
  ['Achievements', 'achievements'],
  ['Education', 'education'],
  ['Mantras', 'mantras'],
  ['Resume', 'resume'],
  ['Contact', 'contact'],
];

const projects: Project[] = [
  {
    number: '01',
    title: 'A.R.I.S',
    subtitle: 'AI-Enabled Self-Balancing Autonomous Robotic Intelligent System',
    description: 'A self-balancing robotic system developed as an academic project, combining sensor data, motor control, stabilization, voice interaction, and camera-based monitoring.',
    technical: 'The project explored MPU-6050 accelerometer and gyroscope data, sensor fusion, PID-based stabilization, PWM motor control, ESP32-based control, Raspberry Pi processing, voice interaction, camera monitoring, and web-based control.',
    tags: ['Robotics', 'ESP32', 'Raspberry Pi', 'PID'],
    accent: 'violet',
    mark: 'AR',
    icon: Cpu,
    category: 'Robotics',
  },
  {
    number: '02',
    title: 'PAWCARE',
    subtitle: 'Smart Dog Health Monitoring & Zoonotic Defense System',
    description: 'A smart dog health monitoring project designed to monitor health parameters and support early identification of potential health concerns.',
    technical: 'The project explored a wearable health-monitoring concept using an ESP32-C3 with sensors including the MLX90614 temperature sensor and MAX30102 heart-rate/SpO₂ sensor. It combined sensor data, cloud integration, alerts, and AI-based analysis as part of a broader approach to monitoring animal health.',
    tags: ['ESP32-C3', 'Sensors', 'Cloud', 'AI-Assisted'],
    accent: 'emerald',
    mark: 'PC',
    icon: Microscope,
    category: 'IoT / Embedded',
  },
  {
    number: '03',
    title: 'FinTrack',
    subtitle: 'Personal Finance Management System',
    description: 'A console-based personal finance application developed using Core Java to manage income, expenses, budgets, and transaction history.',
    technical: 'The application was structured around object-oriented programming principles and Java collections for organizing financial data. It also involved Java 8 features and Stream API operations for working with application data, along with exception handling and file handling for practical application operations. The project was manually tested and debugged during development.',
    tags: ['Core Java', 'OOP', 'Java 8', 'Stream API'],
    accent: 'amber',
    mark: 'FT',
    icon: Code2,
    category: 'Java Application',
  },
];

const ieeeActivities: IeeeActivity[] = [
  {
    title: 'IEEE Panimalar Student Branch',
    role: 'Student Secretary',
    text: 'Served as Student Secretary of the Panimalar Engineering College Student Branch, handling technical activities, events, content, design, and coordination.',
  },
  {
    title: 'IEEE YESIST12 Executive Committee ',
    role: 'Special Track Design Lead 2025 · Video Editing Lead 2026',
    text: 'Led the design work for the Special Track, and serving as Video Editing Lead in 2026 for the international innovation event.',
  },
  {
    title: 'IEEE Madras Section',
    role: 'Best Student Video Editor',
    text: 'Created and edited video content for national-level events organized by the Madras Section.',
  },
  {
    title: 'IEEE Day 2025',
    role: 'Video Editing Committee Lead',
    text: 'Led the video editing committee for an international-level celebration, growing as a young volunteer on a global stage.',
  },
  {
    title: 'IEEE Try Engineering',
    role: 'Video Editor · Content Creator',
    text: 'Produced educational video content that helps school and international students build engineering knowledge across many countries.',
  },
  {
    title: 'IEEE Smart Cities',
    role: 'Video Editor · Content Branding',
    text: 'Edited videos and shaped the content branding for the Smart Cities initiative.',
  },
  {
    title: 'IEEE India MOVE',
    role: 'Graphic & Video Designer',
    text: 'Designed graphics and video content that supported the outreach and visibility of IEEE India MOVE.',
  },
];

const achievements: Achievement[] = [
  {
    title: 'IEEE Xtreme 17.0',
    description: 'Achieved Global Rank 548, India Rank 184, and ECE Department Rank 1 in IEEE Xtreme 17.0.',
    year: '2024',
    organization: 'IEEE',
    className: 'achievement-one',
    ratio: '4:3',
    image: '/Xtreme17.0.png',
    imagePosition: 'center 8%',
    imageZoom: 1,
    imageOrigin: 'center',
    alt: 'IEEE Xtreme 17.0 — Global Rank 548, India Rank 184',
  },
  {
    title: 'IEEE YESIST12',
    description: 'Presented the PAWCARE project at the IEEE YESIST12 2025 Grand Finale, held at Universiti Kebangsaan Malaysia (UKM), Malaysia. Achieved under the guidance of our mentor, Dr. M. Arun.',
    year: '2025',
    organization: 'IEEE YESIST12 · UKM MALAYSIA',
    className: 'achievement-three',
    ratio: '16:9',
    image: '/Yesist12.png',
    imagePosition: 'center 30%',
    alt: 'IEEE YESIST12 2025 Grand Finale at Universiti Kebangsaan Malaysia, Panimalar Engineering College team',
  },
  {
    title: 'Hackatronics 2025',
    description: 'Winner of Hackatronics 2025, organized by UNO MINDA and Panimalar Engineering College.',
    year: '2025',
    organization: 'UNO MINDA × Panimalar',
    award: 'WINNER',
    className: 'achievement-two',
    ratio: '4:3',
    image: '/Hackatronics.png',
    imagePosition: 'center',
    imageZoom: 1,
    imageOrigin: 'center',
    alt: 'Hackatronics 2025 award celebration',
  },
  { title: 'Crown Jewel of Excellence', description: 'Recognized with the Best Student Performer award.', year: '2025', organization: 'Panimalar Engineering College', award: 'BEST STUDENT PERFORMER', className: 'achievement-four', ratio: '4:3', image: '/CrownJewel.png', imagePosition: 'center 45%', alt: 'Crown Jewel of Excellence award certificate' },
  { title: 'Best Student Volunteer', description: 'Awarded Best Student Volunteer by the IEEE Madras Section, presented by Section Chair Dr. P. Sakthivel.', year: '2024 — 2025', organization: 'IEEE MADRAS SECTION', award: 'BEST STUDENT VOLUNTEER', className: 'achievement-five', ratio: '4:3', image: '/MASIEEE.png', imagePosition: 'center 5%', imageZoom: 1, imageOrigin: 'center', alt: 'Best Student Volunteer award from IEEE Madras Section' },
  {
    title: 'AISYWLC Best Student Volunteer',
    description: 'Awarded Best Student Volunteer by IEEE India Council, IEEE Madras Section and Anna University, presented by Deepak Mathur, 2024 IEEE Vice President (MGA).',
    year: '2024',
    organization: 'IEEE INDIA COUNCIL × MADRAS SECTION',
    award: 'BEST STUDENT VOLUNTEER',
    className: 'achievement-best-volunteer',
    ratio: '16:9',
    image: '/BestVolunteer.png',
    imagePosition: 'center',
    alt: 'Poovarasan P receiving the AISYWLC Best Student Volunteer award, IEEE India Council and IEEE Madras Section',
  },
];

const skills: Skill[] = [
  { name: 'Java Development', icon: Code2, color: 'amber', items: ['OOP', 'Collections', 'Generics', 'Multithreading', 'Exception Handling', 'File Handling'] },
  { name: 'Java 8 & Functional', icon: Zap, color: 'amber', items: ['Lambda Expressions', 'Stream API', 'Functional Interfaces', 'Method References', 'Constructor References'] },
  { name: 'Data Structures & DSA', icon: Layers, color: 'sky', items: ['Arrays', 'Strings', 'Searching', 'Sorting', 'Recursion', 'Tree Traversal'] },
  { name: 'Database & SQL', icon: Database, color: 'emerald', items: ['Oracle SQL', 'MySQL', 'Joins', 'Subqueries', 'Normalization', 'Indexes', 'Views'] },
  { name: 'Web Technologies', icon: Code2, color: 'violet', items: ['HTML', 'CSS'] },
  { name: 'Tools & AI-Assisted', icon: Sparkles, color: 'rose', items: ['VS Code', 'ChatGPT', 'Debugging', 'Research'] },
];

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  message: string;
  ratio: number;
  width: number;
  height: number;
  link?: { label: string; url: string };
};

const galleryItems: GalleryItem[] = [
  {
    id: 'portrait',
    src: '/gallery/portrait.jpg',
    alt: 'Receiving an IEEE award plaque from Arun sir',
    title: 'Arun Sir, My Greatest Mentor',
    message: 'Arun Sir is my greatest mentor. None of my achievements would have been possible without him. He believed in me and gave me every opportunity, and every success of mine is a part of his guidance and support.',
    ratio: 0.8,
    width: 719,
    height: 899,
  },
  {
    id: 'event',
    src: '/gallery/event.jpg',
    alt: 'Selfie with Dr. Porkumaran at an IEEE event',
    title: 'Dr. Porkumaran',
    message: 'Dr. Porkumaran, Principal of Sri Krishna College of Engineering and Technology (SKCET), Coimbatore. A person who inspires me a lot and whom I deeply respect. His blessings and advice helped me grow in the IEEE Madras Section, and he is one of the most talented professionals I have met in my IEEE journey.',
    ratio: 1.778,
    width: 1282,
    height: 721,
  },
  {
    id: 'award',
    src: '/gallery/award.jpg',
    alt: 'IEEE Student Branch prizes: Slogan Rivalry, Standup Comedy, Adzap, Debate (I Prize) and Who is the Boss (II Prize)',
    title: 'Five Prizes, Inter-College Events',
    message: 'Five prizes won at inter-college events organized by the IEEE Student Branch: Slogan Rivalry, Standup Comedy, Adzap and Debate (I Prize), and Who is the Boss? (II Prize). Memorable moments.',
    ratio: 1.333,
    width: 1200,
    height: 900,
  },
  {
    id: 'robot',
    src: '/gallery/robot.jpg',
    alt: 'A.R.I.S self-balancing robot project',
    title: 'A.R.I.S, Our Robot Buddy',
    message: 'Our robot buddy A.R.I.S, the AI-Enabled Self-Balancing Autonomous Robotic Intelligent System, built as an academic project with my teammates Mukesh K and Praveen T. It brings together sensors, motor control, stabilization, voice interaction, and camera-based monitoring.',
    ratio: 1,
    width: 719,
    height: 719,
  },
  {
    id: 'malaysia',
    src: '/gallery/malaysia.jpg',
    alt: 'Petronas Twin Towers, Kuala Lumpur, Malaysia',
    title: 'Malaysia, My First International Experience',
    message: 'My first international experience. I learned a lot and I am proud to be a part of IEEE YESIST12 in Malaysia.',
    ratio: 1,
    width: 720,
    height: 720,
  },
  {
    id: 'linkededge',
    src: '/gallery/linkededge.jpg',
    alt: 'Team LinkedEdge: four friends sitting on a bench in a garden',
    title: 'Team LinkedEdge',
    message: "Team LinkedEdge: Mukunth, Mukesh, Praveen and me. These three were with me at every step of my achievements. They are my backbone, special people and very knowledgeable friends.",
    ratio: 1.337,
    width: 1000,
    height: 748,
  },
  {
    id: 'techx',
    src: '/gallery/techx.jpg',
    alt: 'Team members discussing a project on laptops at a technical event',
    title: 'Problem to Solution, Ideas to Projects',
    message: 'Every product we created began with a problem and ended with a solution built from our ideas. We solve problems in different technical ways and turn ideas into projects.',
    ratio: 1.5,
    width: 1400,
    height: 933,
  },
  {
    id: 'mentor-team',
    src: '/gallery/mentor-team.jpg',
    alt: 'Our team with our mentor in front of a brick wall',
    title: 'Our Team',
    message: 'A good mentor with a good team. Every win begins with effort and proper guidance.',
    ratio: 2.362,
    width: 1400,
    height: 593,
  },
  {
    id: 'yesist-committee',
    src: '/gallery/yesist-committee.jpg',
    alt: 'IEEE YESIST12 Steering and Executive Committee group photo',
    title: 'IEEE YESIST12 Steering and Executive Committee',
    message: 'The Steering and Executive Committee of IEEE YESIST12, a global committee that taught me a lot and treated me with love, like a family.',
    ratio: 1.78,
    width: 1200,
    height: 674,
  },
  // supavadee removed per request
];

const journeySteps = [
  { id: '01', label: 'Engineering', icon: Cpu },
  { id: '02', label: 'Public Speaking', icon: Mic },
  { id: '03', label: 'Technical Projects', icon: Code2 },
  { id: '04', label: 'IEEE Activities', icon: Sparkles },
  { id: '05', label: 'Competitions', icon: Trophy },
  { id: '06', label: 'Project Presentations', icon: Presentation },
  { id: '07', label: 'Current Java Development Learning', icon: Coffee },
] as const;

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.willChange = 'opacity, transform';
            target.classList.add('is-visible');
            requestAnimationFrame(() => {
              target.style.willChange = 'auto';
            });
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function JourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, '120px');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [step, setStep] = useState(-1);
  const [rippleIndex, setRippleIndex] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener('change', syncMotion);
    return () => media.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setStep(6);
      setRippleIndex(null);
      return;
    }

    if (!isInView) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setStep((current) => {
        if (current >= 8) return -1;
        return current + 1;
      });
    }, 1500);

    return () => window.clearInterval(intervalId);
  }, [isInView, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || step < 0 || step > 6) {
      setRippleIndex(null);
      return;
    }

    setRippleIndex(step);
    const timeoutId = window.setTimeout(() => setRippleIndex(null), 900);
    return () => window.clearTimeout(timeoutId);
  }, [step, reducedMotion]);

  const progress = reducedMotion ? 1 : step === 8 ? 0 : step === 7 ? 1 : step < 0 ? 0 : step / 6;

  return (
    <section className="section section-journey" ref={sectionRef}>
      <JourneyBackground />
      <div className="container journey-section-content">
        <div className="section-head" data-reveal>
          <h2 className="section-title">My <em>Journey</em></h2>
        </div>
        <div className="journey-shell" data-reveal>
          <div className="journey-route" aria-hidden="true" />
          <div className="journey-progress" aria-hidden="true" style={{ ['--p' as any]: progress }} />
          <div className="journey-light" aria-hidden="true" style={{ ['--p' as any]: progress }} />

          <ol className="journey" aria-label="My journey milestones">
            {journeySteps.map((item, index) => {
              const Icon = item.icon;
              const isLit = reducedMotion ? true : step === 8 ? false : step >= 7 ? true : index <= step;
              const cardOnLeft = index % 2 === 0;

              return (
                <li className="journey-row" key={item.id}>
                  <button
                    type="button"
                    className={`journey-node ${isLit ? 'is-lit' : ''} ${rippleIndex === index ? 'is-ripple' : ''}`}
                    aria-label={`${item.label} milestone ${item.id}`}
                  >
                    <span className="journey-node-glow" aria-hidden="true" />
                    <span className="journey-node-number">{item.id}</span>
                  </button>

                  <div className={`journey-card ${cardOnLeft ? 'journey-card--left' : 'journey-card--right'} ${isLit ? 'is-lit' : ''}`}>
                    <span className="journey-card-icon" aria-hidden="true"><Icon /></span>
                    <span className="journey-card-title">{item.label}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string; message: string; link?: { label: string; url: string } } | null>(null);
  const [failedAchievementImages, setFailedAchievementImages] = useState<Record<string, boolean>>({});
  const [failedGalleryImages, setFailedGalleryImages] = useState<Record<string, boolean>>({});
  const [achievementImageIndex, setAchievementImageIndex] = useState(0);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const ieeeTimelineProgressRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroInView = useSharedInView(heroSectionRef, '100px');

  useReveal();

  useEffect(() => {
    const section = document.getElementById('ieee');
    const progress = ieeeTimelineProgressRef.current;
    const markers = Array.from(document.querySelectorAll<HTMLElement>('.ieee-timeline-marker'));

    if (!section || !progress) return;

    let frameId = 0;

    const updateTimeline = () => {
      const rect = section.getBoundingClientRect();
      const ratio = Math.min(Math.max((window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.35), 0), 1);
      progress.style.transform = `scaleY(${ratio})`;

      markers.forEach((marker, index) => {
        const item = marker.closest('.ieee-timeline-item') as HTMLElement | null;
        if (!item) return;

        const trigger = item.getBoundingClientRect().top <= window.innerHeight * 0.82 || ratio > (index + 1) / (markers.length + 1);
        marker.classList.toggle('is-active', trigger);

        if (trigger && !marker.dataset.rippled) {
          marker.dataset.rippled = 'true';
          marker.classList.remove('is-ripple');
          void marker.offsetWidth;
          marker.classList.add('is-ripple');
        }
      });
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        updateTimeline();
        frameId = 0;
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        updateTimeline();
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateTimeline();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    document.title = 'Poovarasan P. — Java Developer';
  }, []);

  useEffect(() => {
    const section = skillsSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle('is-paused', !entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    let scrollTimer: number | undefined;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress / 100})`;
      }

      if (headerRef.current) {
        headerRef.current.classList.toggle('is-scrolled', scrollTop > 40);
      }

      document.body.classList.add('scrolling');
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 150);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      document.body.classList.toggle('background-paused', document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    if (!activeAchievement) return;
    setAchievementImageIndex(0);

    const onKeyDown = (event: KeyboardEvent) => {
      const images = activeAchievement.images?.length ? activeAchievement.images : activeAchievement.image ? [activeAchievement.image] : [];
      if (!images.length) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setAchievementImageIndex((current) => (current + 1) % images.length);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setAchievementImageIndex((current) => (current - 1 + images.length) % images.length);
      }

      if (event.key === 'Escape') {
        setActiveAchievement(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeAchievement]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
  };

  return (
    <div className="site-shell">
      <AnimatedBackground sectionRef={heroSectionRef} isActive={heroInView} />
      <div ref={scrollProgressRef} className="scroll-progress" />

      <header ref={headerRef} className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <Avatar size={44} loading="eager" fetchPriority="high" />
          <span className="brand-name">Poovarasan P.</span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={(event) => handleNavClick(event, id)}>{label}</a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          <span>Let's Talk</span>
          <ArrowUpRight />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home" ref={heroSectionRef}>
          <div className="hero-bg-grid" />
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />
          <div className="hero-inner">
            <div className="hero-copy" data-reveal>
              <div className="hero-eyebrow">
                <span className="status-pulse" />
                Available for opportunities
              </div>
              <h1 className="hero-title">
                <span className="hero-line">Poovarasan <em className="hero-line-italic">P.</em></span>
              </h1>
              <div className="hero-roles">
                <span>Java Developer</span>
                <span className="hero-dot" />
                <span>Engineering Graduate</span>
              </div>
              <p className="hero-intro">
                An Electronics and Communication Engineering graduate building a foundation in Java development, SQL, problem solving, and practical software projects.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Contact Me
                  <ArrowDown />
                </a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <Lightbulb className="hero-stat-icon" />
                  <div><strong>Learner</strong><span>ALWAYS LEARNING NEW THINGS</span></div>
                </div>
                <div className="hero-stat">
                  <Sparkles className="hero-stat-icon" />
                  <div><strong>IEEE</strong><span>ACTIVE VOLUNTEER</span></div>
                </div>
                <div className="hero-stat">
                  <BriefcaseBusiness className="hero-stat-icon" />
                  <div><strong>Freelancer</strong><span>OPEN TO PROJECTS</span></div>
                </div>
                <div className="hero-stat">
                  <Mic className="hero-stat-icon" />
                  <div><strong>Speaker</strong><span>PUBLIC SPEAKING &amp; PRESENTATIONS</span></div>
                </div>
              </div>
            </div>
            <div className="hero-visual" data-reveal>
              <div className="code-card">
                <div className="code-card-top">
                  <div className="code-dots">
                    <span /><span /><span />
                  </div>
                  <span className="code-filename">Poovarasan.java</span>
                  <Terminal className="code-terminal-icon" />
                </div>
                <div className="code-body">
                  <p><span className="ln">1</span> <span className="kw">public</span> <span className="kw">class</span> <span className="cls">Poovarasan</span> {'{'}</p>
                  <p><span className="ln">2</span>     <span className="kw">public</span> <span className="kw">static</span> <span className="kw">void</span> <span className="fn">main</span>(<span className="kw">String</span>[] args) {'{'}</p>
                  <p><span className="ln">3</span>         <span className="sys">System.out.println</span>(<span className="str">"Learn Java"</span>);</p>
                  <p><span className="ln">4</span>         <span className="sys">System.out.println</span>(<span className="str">"Practice daily"</span>);</p>
                  <p><span className="ln">5</span>         <span className="sys">System.out.println</span>(<span className="str">"Build with purpose"</span>);</p>
                  <p><span className="ln">6</span>     {'}'}</p>
                  <p><span className="ln">7</span> {'}'}</p>
                </div>
                <div className="code-footer">
                  <span className="code-pulse" />
                  <span className="code-status">Currently learning <strong>Java FullStack Development </strong></span>
                </div>
              </div>
              <div className="floating-badge badge-java">
                <Coffee />
                <span>Java</span>
              </div>
              <div className="floating-badge badge-sql">
                <Database />
                <span>SQL</span>
              </div>
              <div className="floating-badge badge-oop">
                <Layers />
                <span>OOP</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* ABOUT */}
        <section className="section section-about" id="about">
          <AboutBackground />
          <div className="container about-container">
            <div className="section-head" data-reveal>
              <h2 className="section-title">About <em>Me</em></h2>
            </div>
            <div className="about-grid">
              <div className="about-lead" data-reveal>
                <Quote className="about-quote-icon" />
                <p className="about-quote">
                  I am an Electronics and Communication Engineering graduate from Panimalar Engineering College, currently focused on building a strong foundation in Java development, object-oriented programming, SQL, and problem solving.
                </p>
              </div>
              <div className="about-detail" data-reveal>
                <p>My journey began with engineering fundamentals, where I explored IoT, embedded systems, robotics, and AI-assisted technologies through hands-on academic projects. Alongside, I actively contributed to IEEE activities, technical events, project presentations, design, video editing, content creation, and event coordination.</p>
                <p>Today, my focus has narrowed toward software development fundamentals. I am currently deepening my Java skills through structured learning, practicing data structures and algorithms, working with databases, and gradually expanding into web technologies.</p>
                <p>I believe in learning by building, practicing consistently, and growing one concept at a time.</p>
                <div className="about-signature">Poovarasan P.</div>
              </div>
            </div>
            <div className="about-meta" data-reveal>
              <div className="about-meta-item">
                <span className="about-meta-label">Based In</span>
                <span className="about-meta-value">Coimbatore TN, India</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label">Education</span>
                <span className="about-meta-value">B.E. ECE / 2022 — 2026</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label">Focus</span>
                <span className="about-meta-value"> Software Development</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section ref={skillsSectionRef} className="section section-skills" id="skills">
          <SkillsBackground sectionRef={skillsSectionRef} />
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="section-title">Technical <em>Skills</em></h2>
              <p className="section-sub">Hover over each card to see what it covers.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const I = skill.icon;
                return (
                  <div className="skill-card-shell" key={skill.name} data-reveal tabIndex={0} style={{ ['--rotation-delay' as string]: `${index * -1}s` }}>
                    <div className="skill-card-glow" aria-hidden="true" />
                    <div className="skill-card-ring" aria-hidden="true">
                      <span className="skill-card-spin" />
                    </div>
                    <div className="skill-flip">
                      <div className={`skill-flip-inner skill-${skill.color}`}>
                        <div className="skill-flip-front">
                          <div className="skill-flip-icon"><I /></div>
                          <h3 className="skill-flip-name">{skill.name}</h3>
                        </div>
                        <div className="skill-flip-back">
                          <div className="skill-flip-tags">
                            {skill.items.map((item) => <span key={item}>{item}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section section-projects" id="projects">
          <div className="container">
            <div className="section-head section-head-light" data-reveal>
              <h2 className="section-title">Selected <em>Projects</em></h2>
              <p className="section-sub">A collection of practical work, experiments, and academic projects that shaped how I approach problems.</p>
            </div>
            <div className="projects-list">
              {projects.map((project) => {
                const I = project.icon;
                return (
                  <article className={`project-card project-${project.accent}`} key={project.title} data-reveal>
                    <div className="project-card-bar" />
                    <div className="project-card-main">
                      <div className="project-card-left">
                        <div className="project-card-icon"><I /></div>
                      </div>
                      <div className="project-card-center">
                        <span className="project-card-category">{project.category}</span>
                        <h3 className="project-card-title">{project.title}</h3>
                        <p className="project-card-subtitle">{project.subtitle}</p>
                        <p className="project-card-desc">{project.description}</p>
                        <div className="project-card-tags">
                          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                      </div>
                      <div className="project-card-right">
                        <div className="project-mark" aria-label={project.mark}>
                          <span className="project-mark-layer project-mark-layer--blur" aria-hidden="true">{project.mark}</span>
                          <span className="project-mark-layer project-mark-layer--base">{project.mark}</span>
                        </div>
                        <button className="project-view" onClick={() => setActiveProject(project)}>
                          View Details
                          <ArrowUpRight />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* IEEE */}
        <section className="section section-ieee" id="ieee">
          <IeeeBackground />
          <div className="container ieee-section-content">
            <div className="section-head" data-reveal>
              <h2 className="section-title">IEEE & Technical <em>Activities</em></h2>
            </div>
            <div className="ieee-ticker" aria-label="IEEE roles ticker">
              <div className="ieee-ticker-track">
                <span className="ieee-ticker-content">
                  {ieeeActivities.map((item) => (
                    <span className="ieee-ticker-item" key={`${item.title}-ticker`}>
                      {item.role}
                      <span className="ieee-ticker-diamond" aria-hidden="true">◆</span>
                    </span>
                  ))}
                </span>
                <span className="ieee-ticker-content is-duplicate" aria-hidden="true">
                  {ieeeActivities.map((item) => (
                    <span className="ieee-ticker-item" key={`${item.title}-duplicate`}>
                      {item.role}
                      <span className="ieee-ticker-diamond" aria-hidden="true">◆</span>
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <div className="ieee-layout">
              <div className="ieee-intro" data-reveal>
                <div className="ieee-logo">IEEE</div>
                <p>During college I was actively involved in IEEE-related technical activities, events, project activities, content creation, design, video editing, social media, IT operations, event planning, and coordination.</p>
                <p>These experiences helped me become more comfortable working with people, presenting ideas, and contributing to technical communities.</p>
              </div>
              <div className="ieee-timeline" data-reveal>
                <div className="ieee-timeline-track" aria-hidden="true">
                  <span className="ieee-timeline-progress" ref={ieeeTimelineProgressRef} />
                </div>
                {ieeeActivities.map((item, index) => (
                  <div className="ieee-timeline-item" key={item.title} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                    <div className="ieee-timeline-marker" aria-hidden="true" />
                    <div className="ieee-timeline-content">
                      <h4>{item.title}</h4>
                      <span className="ieee-role-tag">{item.role}</span>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section section-achievements" id="achievements">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="section-title">Achievements & <em>Memories</em></h2>
            </div>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => {
                const hasImage = Boolean(achievement.image) && !failedAchievementImages[achievement.title];
                const imageAlt = achievement.alt ?? achievement.title;
                const canOpenLightbox = Boolean(achievement.image) && !failedAchievementImages[achievement.title];
                const fitMode = achievement.imageFit ?? 'cover';
                const imageZoom = achievement.imageZoom ?? 1;
                const imageOrigin = achievement.imageOrigin ?? 'center';

                return (
                  <button
                    className={`achievement-card ${achievement.className}`}
                    key={achievement.title}
                    onClick={() => setActiveAchievement(achievement)}
                    data-reveal
                  >
                    <div className={`achievement-photo ${hasImage ? 'achievement-photo--image' : ''}`} data-ratio={achievement.ratio}>
                      {hasImage ? (
                        <div className={`achievement-photo-media ${fitMode === 'contain-blur' ? 'achievement-photo-media--contain-blur' : ''}`} aria-label={imageAlt}>
                          <img
                            src={achievement.image}
                            alt={imageAlt}
                            loading="lazy"
                            decoding="async"
                            width={1200}
                            height={900}
                            style={{
                              ['--image-zoom' as any]: imageZoom,
                              objectPosition: achievement.imagePosition ?? 'center',
                              objectFit: fitMode === 'cover' ? 'cover' : 'contain',
                              width: '100%',
                              height: '100%',
                              transform: `scale(${imageZoom})`,
                              transformOrigin: imageOrigin,
                            }}
                            onError={() => setFailedAchievementImages((current) => ({ ...current, [achievement.title]: true }))}
                          />
                        </div>
                      ) : (
                        <>
                          <ImagePlus />
                          <span>Photo Slot / {String(index + 1).padStart(2, '0')}</span>
                        </>
                      )}
                      {!hasImage && <span className="achievement-ratio">{achievement.ratio}</span>}
                    </div>
                    <div className="achievement-body">
                      <div className="achievement-meta">
                        <span>{achievement.year}</span>
                        <span>{achievement.organization}</span>
                      </div>
                      <h3 className="achievement-title">{achievement.title}</h3>
                      <p className="achievement-desc">{achievement.description}</p>
                      {achievement.award && (
                        <span className="achievement-award"><Trophy /> {achievement.award}</span>
                      )}
                      <span
                        className="achievement-view"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (canOpenLightbox) {
                            setActiveAchievement(achievement);
                          }
                        }}
                        role="button"
                        tabIndex={canOpenLightbox ? 0 : -1}
                        onKeyDown={(event) => {
                          if ((event.key === 'Enter' || event.key === ' ') && canOpenLightbox) {
                            event.preventDefault();
                            event.stopPropagation();
                            setActiveAchievement(achievement);
                          }
                        }}
                      >
                        View Photos <ArrowUpRight />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="gallery-head" data-reveal>
              <h3>Achievement Gallery</h3>
              <p>A photo-ready space for awards, IEEE events, competitions, project presentations, team moments, and college activities.</p>
            </div>
            <div className="gallery-layout" data-reveal>
              {[galleryItems.slice(0, 2), galleryItems.slice(2, 5), galleryItems.slice(5, 7), galleryItems.slice(7, 9)].map((row, rowIndex) => (
                <div className={`gallery-row ${row.length === 1 ? 'gallery-row--single' : ''}`} key={`gallery-row-${rowIndex}`}>
                  {row.map((item) => {
                    const hasImage = Boolean(item.src) && !failedGalleryImages[item.id];

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`gallery-item ${hasImage ? 'gallery-item--filled' : 'gallery-item--placeholder'}`}
                        style={{ flex: `${item.ratio} 1 0`, aspectRatio: String(item.ratio) }}
                                onClick={() => {
                                    if (!hasImage) return;
                                    setLightboxImage({ src: item.src, alt: item.alt, title: item.title, message: item.message, link: item.link });
                                  }}
                        onKeyDown={(event) => {
                          if ((event.key === 'Enter' || event.key === ' ') && hasImage) {
                            event.preventDefault();
                            setLightboxImage({ src: item.src, alt: item.alt, title: item.title, message: item.message, link: item.link });
                          }
                        }}
                        aria-label={hasImage ? `${item.title}: ${item.alt}` : `Photo placeholder ${item.id}`}
                        tabIndex={0}
                        disabled={!hasImage}
                      >
                        {hasImage ? (
                          <>
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="gallery-image"
                              loading="lazy"
                              decoding="async"
                              width={item.width}
                              height={item.height}
                              onError={() => {
                                setFailedGalleryImages((current) => ({ ...current, [item.id]: true }));
                              }}
                            />
                            <span className="gallery-overlay" aria-hidden="true">
                              <span className="gallery-overlay__title">{item.title}</span>
                              <span className="gallery-overlay__message">{item.message}</span>
                            </span>
                            <span className="gallery-touch-hint" aria-hidden="true">i</span>
                          </>
                        ) : (
                          <ImagePlus />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section section-education" id="education">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="section-title"><em>Education</em></h2>
            </div>
            <div className="education-card" data-reveal>
              <div className="education-icon"><GraduationCap /></div>
              <div className="education-body">
                <span className="education-year">2022 — 2026</span>
                <h3>Bachelor of Electronics and Communication Engineering</h3>
                <p>Panimalar Engineering College, Chennai</p>
              </div>
              <ArrowUpRight className="education-arrow" />
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <JourneySection />

        {/* MANTRAS */}
        <section className="section section-mantras" id="mantras">
          <div className="container">
            <div className="section-head section-head-light" data-reveal>
              <h2 className="section-title">My Three <em>Mantras</em></h2>
            </div>
            <div className="mantras-flow" data-reveal>
              {[
                ['Learn', 'Keep learning new concepts, technologies, and skills.', BookOpen],
                ['Practice', 'Turn what I learn into practical work, projects, and problem solving.', Zap],
                ['Consistency', 'Keep showing up, improving, and continuing the process.', Repeat],
              ].map(([title, copy, Icon], index) => {
                const I = Icon as typeof BookOpen;
                return (
                  <div className="mantra-node" key={title as string}>
                    <div className="mantra-index">0{index + 1}</div>
                    <div className="mantra-circle"><I /></div>
                    <h3 className="mantra-word">{title as string}</h3>
                    <p className="mantra-text">{copy as string}</p>
                    {index < 2 && <div className="mantra-connector"><ArrowRight /></div>}
                  </div>
                );
              })}
            </div>
            <div className="mantras-quote" data-reveal>
              Learn what you don't know.<br />
              Practice what you learn.<br />
              Stay consistent with the journey.
            </div>
          </div>
        </section>

        {/* RESUME */}
        <section className="section section-resume" id="resume">
          <div className="container">
            <div className="resume-panel" data-reveal>
              <div className="resume-content">
                <h2 className="resume-title">A closer look at <em>the work so far.</em></h2>
                <p className="resume-text">For a concise view of my education, foundations, projects, and achievements, view or download my current resume.</p>
                <div className="resume-actions">
                  <a className="btn btn-light" href="/Poovarasan_P_Java_Developer_Resume_V2.pdf" target="_blank" rel="noreferrer">
                    View Resume <ExternalLink />
                  </a>
                  <a className="btn btn-outline-light" href="/Poovarasan_P_Java_Developer_Resume_V2.pdf" download>
                    Download Resume <Download />
                  </a>
                </div>
              </div>
              <FileText className="resume-decor" />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section section-contact" id="contact">
          <ContactBackground />
          <div className="container">
            <div className="section-head section-head-light" data-reveal>
              <h2 className="section-title">Let's build the <em>next chapter.</em></h2>
              <p className="section-sub">Have a question, an opportunity, or simply want to connect?     My inbox is open.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-links" data-reveal>
                <a href="mailto:poovarasap.mail@gmail.com" className="contact-link">
                  <div className="contact-link-icon"><Mail /></div>
                  <div className="contact-link-body">
                    <span className="contact-link-label">Email</span>
                    <span className="contact-link-value">poovarasap.mail@gmail.com</span>
                  </div>
                  <ArrowUpRight className="contact-link-arrow" />
                </a>
                <a href="tel:0000" className="contact-link">
                  <div className="contact-link-icon"><Send /></div>
                  <div className="contact-link-body">
                    <span className="contact-link-label">Phone</span>
                    <span className="contact-link-value">+91 9345691877</span>
                  </div>
                  <ArrowUpRight className="contact-link-arrow" />
                </a>
                <a href="https://linkedin.com/in/poovarasanpugalendhi29" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon"><Linkedin /></div>
                  <div className="contact-link-body">
                    <span className="contact-link-label">LinkedIn</span>
                    <span className="contact-link-value">linkedin.com/in/poovarasanpugalendhi29</span>
                  </div>
                  <ArrowUpRight className="contact-link-arrow" />
                </a>
              </div>
              <div className="contact-cta" data-reveal>
                <a href="mailto:poovarasap.mail@gmail.com" className="btn btn-primary btn-large">
                  Send Me an Email
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <Avatar size={48} loading="lazy" />
              <span className="brand-name">Poovarasan P.</span>
            </a>
            <p className="footer-tagline">Java Developer · Engineering Graduate</p>
          </div>
          <div className="footer-links">
            <a href="https://linkedin.com/in/poovarasanpugalendhi29" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href="mailto:poovarasap.mail@gmail.com" aria-label="Email"><Mail /></a>
            <a href="#projects" aria-label="Projects"><Code2 /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Poovarasan P. All rights reserved.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close">
              <X />
            </button>
            <span className="modal-kicker">{activeProject.category}</span>
            <h2 className="modal-title">{activeProject.title}</h2>
            <p className="modal-subtitle">{activeProject.subtitle}</p>
            <p className="modal-text">{activeProject.technical}</p>
            <div className="modal-tags">
              {activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* ACHIEVEMENT MODAL */}
      {activeAchievement && (() => {
        const achievementImages = (activeAchievement.images?.length ? activeAchievement.images : activeAchievement.image ? [activeAchievement.image] : []);
        const activeImageUrl = achievementImages[achievementImageIndex] ?? achievementImages[0];
        const hasImages = achievementImages.length > 0;

        return (
          <div className="modal-backdrop" onClick={() => setActiveAchievement(null)}>
            <div className="modal modal-photo" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveAchievement(null)} aria-label="Close">
                <X />
              </button>

              {hasImages ? (
                <div className="achievement-modal-media">
                  <div className="achievement-modal-image-shell">
                    <img
                      src={activeImageUrl}
                      alt={activeAchievement.alt ?? activeAchievement.title}
                      className="achievement-modal-image"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={900}
                    />
                  </div>
                  {achievementImages.length > 1 && (
                    <div className="achievement-modal-thumbs" aria-label="Achievement image thumbnails">
                      {achievementImages.map((image, index) => (
                        <button
                          key={`${activeAchievement.title}-${image}`}
                          type="button"
                          className={`achievement-modal-thumb ${index === achievementImageIndex ? 'is-selected' : ''}`}
                          onClick={() => setAchievementImageIndex(index)}
                          aria-label={`Show image ${index + 1}`}
                        >
                          <img src={image} alt="" loading="lazy" decoding="async" width={120} height={80} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`modal-photo-placeholder ${activeAchievement.className}`}>
                  <ImagePlus />
                  <span>Add image later</span>
                </div>
              )}

              <div className="achievement-modal-content">
                <span className="modal-kicker">{activeAchievement.year} / {activeAchievement.organization}</span>
                <h2 className="modal-title">{activeAchievement.title}</h2>
                <p className="modal-text">{activeAchievement.description}</p>
                {activeAchievement.award && (
                  <span className="achievement-award"><Trophy /> {activeAchievement.award}</span>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {lightboxImage && (
        <div className="modal-backdrop lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLightboxImage(null)} aria-label="Close lightbox">
              <X />
            </button>
            <div className="lightbox-content">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="lightbox-image"
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
              />
              <div className="lightbox-caption">
                <span className="lightbox-caption__title">{lightboxImage.title}</span>
                <p className="lightbox-caption__message">{lightboxImage.message}</p>
                {lightboxImage.link && (
                  <a className="lightbox-caption__link" href={lightboxImage.link.url} target="_blank" rel="noopener noreferrer">
                    {lightboxImage.link.label} ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
