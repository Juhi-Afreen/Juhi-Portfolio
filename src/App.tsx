/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram,
  Mail, 
  ExternalLink, 
  Figma, 
  Layers, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  Code, 
  Palette, 
  Video,
  Search,
  CheckCircle2,
  ArrowRight,
  Play,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm, ValidationError } from '@formspree/react';

// --- Types ---
interface Project {
  title: string;
  category: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  image: string;
  link: string;
  embed?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  impact: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "TCI Dashboard",
    category: "UI/UX Design",
    problem: "Users struggled to track real-time environmental data due to cluttered and unintuitive interfaces.",
    solution: "Designed a minimalist, modular dashboard using design thinking principles and AI-assisted data visualization components.",
    result: "Increased user engagement by 45% and reduced task completion time for data analysis by 30%.",
    tags: ["Figma", "React", "AI-Driven UX"],
    image: "https://raw.githubusercontent.com/Juhi-Afreen/Juhi-Portfolio/main/src/assets/dashboard-mockup.jpg",
    link: "https://juhi-afreen.github.io/tci-dashboard/#/dashboard"
  },
  {
    title: "TeleMed Mobile App",
    category: "Mobile Design",
    problem: "A wellness app lacked a cohesive visual identity, leading to high user drop-off rates during onboarding.",
    solution: "Created a serene, human-centered UI with smooth micro-interactions and an AI-powered personalization flow.",
    result: "Onboarding completion rate improved by 60%, and the app received a 4.8-star rating on the App Store.",
    tags: ["Mobile UI", "Prototyping", "Adobe XD"],
    image: "https://raw.githubusercontent.com/Juhi-Afreen/Juhi-Portfolio/refs/heads/main/src/assets/mobile-app.jpg",
    link: "https://juhi-afreen.github.io/TeleMed-Premium-Healthcare/"
  },
  {
    title: "CIFS Brand Identity",
    category: "Graphic Design",
    problem: "A tech startup needed a brand that felt both futuristic and approachable in the crowded AI space.",
    solution: "Developed a comprehensive visual system including logo, typography, and marketing assets using Midjourney for conceptual ideation.",
    result: "Successfully secured $2M in seed funding with a brand that stood out to investors and early adopters.",
    tags: ["Branding", "Illustrator", "AI Ideation"],
    image: "https://raw.githubusercontent.com/Juhi-Afreen/Juhi-Portfolio/main/src/assets/branding.jpeg",
    link: "https://www.instagram.com/p/CUQZQcchQia/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="
  },
  {
    title: "DictaAI Social Media Campaign",
    category: "Social Media",
    problem: "DictaAI needed a high-impact social media presence to showcase their AI-driven transcription and creative solutions.",
    solution: "Developed a series of vibrant Instagram posts using neon gradients and bold typography to highlight key service benefits.",
    result: "Achieved significant growth in community engagement and consistent brand recognition across platforms.",
    tags: ["Social Media", "Branding", "AI Creative"],
    image: "https://raw.githubusercontent.com/Juhi-Afreen/Juhi-Portfolio/main/src/assets/social-posts.jpg",
    link: "https://www.instagram.com/dicta.ai"
  },
  {
    title: "University Frames Micro-video",
    category: "Video Editing",
    problem: "A luxury watch brand wanted a short, captivating video for their new collection launch.",
    solution: "Produced a 30-second cinematic reel combining high-quality product shots with AI-enhanced transitions and sound design.",
    result: "The reel went viral with over 500k views and directly contributed to a 25% spike in pre-orders.",
    tags: ["Video Editing", "Premiere Pro", "After Effects"],
    image: "https://picsum.photos/seed/video/800/600",
    link: "#",
    embed: "https://assets.pinterest.com/ext/embed.html?id=401946335512566660"
  },
  {
    title: "Modern Hospital Website",
    category: "Website UI",
    problem: "A local hospital needed a modern, accessible digital presence to streamline patient appointments and information access.",
    solution: "Developed a clean, user-friendly website with intuitive navigation and clear calls-to-action for healthcare services.",
    result: "Improved online appointment bookings by 40% and enhanced user accessibility for critical health information.",
    tags: ["Web Design", "Figma", "Healthcare UI"],
    image: "https://raw.githubusercontent.com/Juhi-Afreen/Modern-Hospital-Website-Design/refs/heads/main/assets/images/thumb.jpeg",
    link: "https://juhi-afreen.github.io/Modern-Hospital-Website-Design/"
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "UI/UX Designer",
    company: "FirstBit Digital Technologies",
    period: "Present",
    description: "Crafting seamless digital experiences by blending intuitive user interfaces with thoughtful user experiences.",
    impact: [
      "Driving design innovation through AI-integrated workflows.",
      "Collaborating with cross-functional teams to deliver high-fidelity prototypes.",
      "Ensuring 100% design consistency across multiple product lines."
    ]
  },
  {
    role: "Junior UI/UX Designer",
    company: "Repugen Web Team Pvt Ltd",
    period: "2021",
    description: "Collaborated on crafting user-centered digital experiences through intuitive interfaces.",
    impact: [
      "Designed 15+ responsive web interfaces for diverse clients.",
      "Reduced design-to-development handoff time by implementing structured design systems.",
      "Conducted user research that led to a 20% increase in conversion rates."
    ]
  },
  {
    role: "Creative Head",
    company: "WIZZOI Infotech Pvt. Ltd.",
    period: "2019",
    description: "Led the digital marketing team and conceptualized social media marketing strategies.",
    impact: [
      "Managed a team of 5 designers and marketers.",
      "Increased client social media reach by an average of 150% through creative campaigns.",
      "Standardized visual assets for all agency clients."
    ]
  },
  {
    role: "Social Media Optimization Executive",
    company: "WIZZOI Infotech Pvt. Ltd.",
    period: "2017",
    description: "Managed social media presence and ad campaigns for a diverse portfolio of clients.",
    impact: [
      "Developed and executed comprehensive social media content calendars.",
      "Managed paid ad campaigns across Facebook, Instagram, and LinkedIn.",
      "Analyzed performance metrics to optimize ROI for client marketing budgets."
    ]
  },
  {
    role: "SEO Trainee",
    company: "WIZZOI Infotech Pvt. Ltd.",
    period: "2016",
    description: "Assisted in website optimization and search engine ranking improvements.",
    impact: [
      "Performed keyword research and on-page SEO optimizations.",
      "Improved search engine visibility for major search engines like Google and Bing.",
      "Monitored website traffic and user behavior using analytics tools."
    ]
  },
  {
    role: "Graphic Designer (Freelance)",
    company: "Self-Employed",
    period: "2015",
    description: "Provided creative design solutions for local businesses and startups.",
    impact: [
      "Designed logos, brochures, and marketing collateral for 20+ clients.",
      "Developed visual brand identities from scratch for new businesses.",
      "Mastered Adobe Creative Suite tools through diverse project requirements."
    ]
  }
];

const SKILLS = {
  design: ["UI/UX Design", "Graphic Design", "Interaction Design", "Visual Branding", "Video Editing"],
  tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Premiere Pro"],
  ai: ["ChatGPT", "Midjourney", "DALL-E", "Adobe Firefly", "Claude", "AI-Assisted Prototyping"]
};

// --- Components ---

const variantsMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
  fade: {},
  scale: { scale: 0.9 },
};

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

const Reveal = ({ children, direction = 'up', delay = 0, duration = 0.6, className = '' }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, ...variantsMap[direction] }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Workflow', href: '#ai-workflow' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-medium font-display tracking-tight flex items-center gap-3">
          <img 
            src="https://raw.githubusercontent.com/Juhi-Afreen/Juhi-Portfolio/refs/heads/main/src/assets/logo-circle.png" 
            alt="Logo" 
            className="w-14 h-14 object-contain"
          />
          <span>Juhi Afreen</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-all"
          >
            Work with Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-t border-white/10 flex flex-col p-6 gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-zinc-300"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 bg-indigo-600 text-center rounded-xl font-bold"
            >
              Work with Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
    
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6">
          <Sparkles size={14} /> Open for Collaboration
        </span>
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9] mb-8">
          Juhi <span className="text-gradient">Afreen</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-zinc-400 mb-8 leading-tight">
          UI/UX Designer <span className="text-zinc-600">&</span> Graphic Designer 
          <span className="block text-zinc-200 mt-2">Pioneering AI-Driven Design Solutions.</span>
        </p>
        <p className="text-zinc-500 max-w-lg mb-10 text-lg">
          I bridge the gap between human intuition and artificial intelligence to create 
          seamless, high-converting digital experiences that define the next era of design.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#work" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all flex items-center gap-2">
            View My Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all">
            Let's Talk
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative lg:-translate-x-8"
      >
        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative group">
          <img 
            src="https://raw.githubusercontent.com/Juhi-Afreen/Juhi-Portfolio/main/src/assets/juhi-afreen-dp.jpg" 
            alt="Juhi Afreen" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        </div>
        
        {/* Floating Stats */}
        <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border border-white/10 shadow-2xl">
          <p className="text-4xl font-black font-display">7+</p>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Years Experience</p>
        </div>
        <div className="absolute -top-6 -right-6 glass p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Instagram size={18} className="text-indigo-400" />
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Instagram</span>
          </div>
          <p className="text-sm font-bold">#sassyartworks</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="section-padding bg-zinc-900/30">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4">About Me</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Designing for humans, <br />
            <span className="text-zinc-500 italic">powered by intelligence.</span>
          </h3>
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              I'm a professional UI/UX design expert and graphic designer with over 7 years of 
              experience in the creative industry. My journey has been defined by a relentless 
              pursuit of blending intuitive user interfaces with thoughtful user experiences.
            </p>
            <p>
              In the rapidly evolving AI era, I don't just use tools; I integrate AI into my 
              design thinking. From rapid prototyping to data-driven user research, I leverage 
              artificial intelligence to amplify creativity and deliver results that are both 
              visually stunning and functionally superior.
            </p>
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between aspect-square transition-all cursor-default group hover:border-indigo-500/50 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.4)]"
          >
            <Palette className="text-indigo-400 mb-4 group-hover:scale-110 group-hover:text-indigo-300 transition-all" size={32} />
            <div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-indigo-100 transition-colors">Design Thinking</h4>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">Empathy-led solutions for complex digital problems.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between aspect-square mt-8 transition-all cursor-default group hover:border-purple-500/50 hover:shadow-[0_0_40px_-15px_rgba(168,85,247,0.4)]"
          >
            <Cpu className="text-purple-400 mb-4 group-hover:scale-110 group-hover:text-purple-300 transition-all" size={32} />
            <div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-purple-100 transition-colors">AI Integration</h4>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">Leveraging cutting-edge AI to optimize creative output.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between aspect-square transition-all cursor-default group hover:border-pink-500/50 hover:shadow-[0_0_40px_-15px_rgba(236,72,153,0.4)]"
          >
            <Video className="text-pink-400 mb-4 group-hover:scale-110 group-hover:text-pink-300 transition-all" size={32} />
            <div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-pink-100 transition-colors">Motion Design</h4>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">Bringing interfaces to life with purposeful animation.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between aspect-square mt-8 transition-all cursor-default group hover:border-emerald-500/50 hover:shadow-[0_0_40px_-15px_rgba(16,185,129,0.4)]"
          >
            <Search className="text-emerald-400 mb-4 group-hover:scale-110 group-hover:text-emerald-300 transition-all" size={32} />
            <div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-100 transition-colors">SEO Aware</h4>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">Designing with search visibility and performance in mind.</p>
            </div>
          </motion.div>
        </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <Reveal direction="fade">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4">Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">My Creative Arsenal</h3>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        <Reveal direction="up" delay={0}>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2rem] glass border border-white/5 hover:border-indigo-500/50 hover:shadow-[0_0_50px_-15px_rgba(99,102,241,0.3)] transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
              <Layers className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-6 group-hover:text-indigo-100 transition-colors">UI/UX Design</h4>
            <ul className="space-y-4">
              {SKILLS.design.map(skill => (
                <li key={skill} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  <CheckCircle2 size={18} className="text-indigo-500" /> {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2rem] glass border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_50px_-15px_rgba(168,85,247,0.3)] transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
              <Code className="text-purple-400 group-hover:text-purple-300 transition-colors" size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-6 group-hover:text-purple-100 transition-colors">Tools & Tech</h4>
            <ul className="space-y-4">
              {SKILLS.tools.map(skill => (
                <li key={skill} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  <CheckCircle2 size={18} className="text-purple-500" /> {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2rem] glass border border-white/5 hover:border-pink-500/50 hover:shadow-[0_0_50px_-15px_rgba(236,72,153,0.3)] transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all">
              <Sparkles className="text-pink-400 group-hover:text-pink-300 transition-colors" size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-6 group-hover:text-pink-100 transition-colors">AI Workflow</h4>
            <ul className="space-y-4">
              {SKILLS.ai.map(skill => (
                <li key={skill} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  <CheckCircle2 size={18} className="text-pink-500" /> {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Work = () => (
  <section id="work" className="section-padding bg-zinc-900/30">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4">Portfolio</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold">Selected Works</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
        {/* Project 1 - Large Bento */}
        <motion.a 
          href={PROJECTS[0].link}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 group relative rounded-[2.5rem] overflow-hidden glass border border-white/5"
        >
          <img 
            src={PROJECTS[0].image} 
            alt={PROJECTS[0].title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-10 w-full flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">{PROJECTS[0].category}</p>
              <h4 className="text-3xl font-bold">{PROJECTS[0].title}</h4>
            </div>
            <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
              <ArrowRight size={24} />
            </div>
          </div>
        </motion.a>

        {/* Project 2 - Small Bento */}
        <motion.a 
          href={PROJECTS[1].link}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          whileHover={{ y: -5 }}
          className="md:col-span-1 md:row-span-1 group relative rounded-[2.5rem] overflow-hidden glass border border-white/5"
        >
          <img 
            src={PROJECTS[1].image} 
            alt={PROJECTS[1].title} 
            className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-[1.2] transition-transform duration-700"
            style={{ objectPosition: '25% 42%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-1">{PROJECTS[1].category}</p>
              <h4 className="text-xl font-bold">{PROJECTS[1].title}</h4>
            </div>
            <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.a>

        {/* Project 3 - Small Bento */}
        <motion.a 
          href={PROJECTS[2].link}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="md:col-span-1 md:row-span-1 group relative rounded-[2.5rem] overflow-hidden glass border border-white/5"
        >
          <img 
            src={PROJECTS[2].image} 
            alt={PROJECTS[2].title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em] mb-1">{PROJECTS[2].category}</p>
              <h4 className="text-xl font-bold">{PROJECTS[2].title}</h4>
            </div>
            <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.a>

        {/* Project 4 - Tall Bento (Video Embed) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ y: -5 }}
          className="md:col-span-1 md:row-span-2 group relative rounded-[2.5rem] overflow-hidden glass border border-white/5"
        >
          {PROJECTS[4].embed ? (
            <div className="absolute inset-0 w-full h-full">
              <iframe 
                src={PROJECTS[4].embed} 
                className="absolute inset-0 w-full h-full border-0 scale-[1.2] origin-center"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                title={PROJECTS[4].title}
              />
            </div>
          ) : (
            <img 
              src={PROJECTS[4].image} 
              alt={PROJECTS[4].title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">{PROJECTS[4].category}</p>
            <h4 className="text-xl font-bold leading-tight">{PROJECTS[4].title}</h4>
          </div>
          
          {/* View Project Link - Visible on hover */}
          <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <a 
              href={PROJECTS[4].link}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
            >
              <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>

        {/* Project 5 - Wide Bento */}
        <motion.a 
          href={PROJECTS[5].link}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-1 group relative rounded-[2.5rem] overflow-hidden glass border border-white/5"
        >
          <img 
            src={PROJECTS[5].image} 
            alt={PROJECTS[5].title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em] mb-1">{PROJECTS[5].category}</p>
              <h4 className="text-2xl font-bold">{PROJECTS[5].title}</h4>
            </div>
            <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
              <ArrowRight size={20} />
            </div>
          </div>
        </motion.a>

        {/* Project 6 - Wide Bento */}
        <motion.a 
          href={PROJECTS[3].link}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-1 group relative rounded-[2.5rem] overflow-hidden glass border border-white/5"
        >
          <img 
            src={PROJECTS[3].image} 
            alt={PROJECTS[3].title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em] mb-1">{PROJECTS[3].category}</p>
              <h4 className="text-2xl font-bold">{PROJECTS[3].title}</h4>
            </div>
            <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
              <ArrowRight size={20} />
            </div>
          </div>
        </motion.a>
      </div>
    </div>
  </section>
);

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? EXPERIENCES : EXPERIENCES.slice(0, 3);

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <Reveal direction="left" className="lg:col-span-4">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4">Career</h2>
              <h3 className="text-4xl font-display font-bold mb-8">Professional Journey</h3>
              <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                Over 7 years of evolving through roles that demanded creative excellence and strategic thinking.
              </p>
              <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <h4 className="font-bold mb-2">Education</h4>
                <p className="text-sm text-zinc-300">B.Tech in CSE</p>
                <p className="text-xs text-zinc-500">Dr. A.P.J. Abdul Kalam Technical University · 2016</p>
              </div>
            </div>
          </Reveal>
          
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {visibleExperiences.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-12 border-l border-white/10"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-zinc-950" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h4 className="text-2xl font-bold">{exp.role}</h4>
                      <p className="text-indigo-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="px-4 py-1 rounded-full glass text-xs font-bold text-zinc-400">{exp.period}</span>
                  </div>
                  <p className="text-zinc-400 mb-6 text-lg">{exp.description}</p>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {exp.impact.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
                        <ChevronRight size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {EXPERIENCES.length > 3 && (
              <div className="mt-12 flex justify-center lg:justify-start">
                <button 
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-sm flex items-center gap-2 group"
                >
                  {showAll ? "View Less" : "View More Experience"}
                  <ChevronRight size={16} className={`transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const AIWorkflow = () => (
  <section id="ai-workflow" className="section-padding bg-indigo-600/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    <div className="max-w-7xl mx-auto relative z-10">
      <Reveal direction="fade">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4">Modern Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">AI-Augmented Design</h3>
          <p className="text-zinc-400 text-lg">
            I don't fear AI; I master it. Here is how I integrate artificial intelligence 
            to deliver superior design value at scale.
          </p>
        </div>
      </Reveal>

      <div className="relative">
        {/* Pipeline Line - Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -translate-y-1/2 z-0" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            {
              title: "Rapid Ideation",
              desc: "Using Midjourney and DALL-E to generate mood boards and conceptual visual directions in minutes.",
              icon: <Sparkles className="text-indigo-400" />,
              step: "01"
            },
            {
              title: "UX Research",
              desc: "Leveraging LLMs to synthesize user feedback and generate personas based on real-world data patterns.",
              icon: <Search className="text-purple-400" />,
              step: "02"
            },
            {
              title: "Content Strategy",
              desc: "Crafting compelling microcopy and UX writing that resonates with target audiences using AI assistance.",
              icon: <Code className="text-pink-400" />,
              step: "03"
            },
            {
              title: "Asset Generation",
              desc: "Creating high-fidelity icons, textures, and backgrounds using AI-powered generative tools.",
              icon: <Cpu className="text-emerald-400" />,
              step: "04"
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group"
            >
              <div className="p-8 rounded-3xl glass border border-white/5 hover:bg-white/10 transition-all h-full flex flex-col items-center text-center">
                {/* Step Indicator */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-[10px] font-black tracking-widest text-white shadow-lg shadow-indigo-600/20 z-20">
                  STEP {item.step}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                
                <h4 className="text-xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
              
              {/* Connector Arrow - Desktop */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-indigo-500/30">
                  <ChevronRight size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [state, handleSubmit] = useForm('mdabyygp');

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[3rem] glass border border-white/10 p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <Reveal direction="left">
              <div>
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
                  Let's build the <span className="text-gradient">future</span> together.
                </h2>
                <p className="text-zinc-400 text-xl mb-12 max-w-md">
                  Whether you have a project in mind or just want to say hi, I'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <a href="mailto:juhiafreen45@gmail.com" className="flex items-center gap-4 text-2xl font-medium hover:text-indigo-400 transition-colors">
                    <Mail className="text-indigo-500" /> juhiafreen45@gmail.com
                  </a>
                  <div className="flex gap-6 pt-8">
                    <a href="https://www.linkedin.com/in/juhiafreen/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/Juhi-Afreen" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Github size={20} />
                    </a>
                    <a href="https://www.instagram.com/sassy_artworks" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</label>
                  <input 
                    name="name"
                    id="name"
                    type="text" 
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" 
                    placeholder="Your Name" 
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</label>
                  <input 
                    name="email"
                    id="email"
                    type="email" 
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" 
                    placeholder="your@email.com" 
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                <textarea 
                  name="message"
                  id="message"
                  required
                  rows={5} 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" 
                  placeholder="How can I help you?" 
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              
              <button 
                type="submit"
                className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all disabled:opacity-50"
                disabled={state.submitting || state.succeeded}
              >
                {state.submitting ? "Sending..." : (state.succeeded ? "Message Sent!" : "Send Message")}
              </button>

              {state.errors && !state.succeeded && (
                <p className="text-red-500 text-sm flex items-center gap-2">
                  <X size={16} /> Something went wrong. Please try again.
                </p>
              )}
            </form>
            </Reveal>
          </div>
        </div>
        
        <Reveal direction="fade" delay={0.3}>
          <footer className="mt-24 flex justify-center text-zinc-600 text-sm border-t border-white/5 pt-12">
          <p>© {new Date().getFullYear()} Juhi Afreen. All rights reserved.</p>
        </footer>
        </Reveal>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <AIWorkflow />
        <Contact />
      </main>
    </div>
  );
}
