/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Award,
  Video,
  Clock,
  Sparkles,
  Calendar,
  User,
  Check,
  X,
  Plus,
  ArrowRight,
  BookOpen,
  ChevronDown,
  LogOut,
  Play,
  Pause,
  ShieldCheck,
  Lock,
  Star,
  Menu,
  Phone,
  Mail,
  Book,
  FileText,
  Heart,
  HelpCircle,
  TrendingUp,
  CreditCard,
  Tv,
  Bell,
  Volume2,
  VolumeX,
  Compass,
  MessageSquare,
  Send,
  CheckCircle,
  Smartphone,
  Maximize,
  Minimize
} from 'lucide-react';
import { poojaAuth, poojaDb, UserState, BookingState, SubscriptionState } from './firebase';
import { PoojaService, PanditProfile } from './types';

// Import local image assets for correct Vite production compilation
import poojaCeremony from './assets/images/pooja_ceremony_1780236174515.png';
import grihaPravesh from './assets/images/griha_pravesh_1783009469186.jpg';
import ganeshPooja from './assets/images/ganesh_pooja_1783009414379.jpg';
import navratriPooja from './assets/images/navratri_pooja_1783009427938.jpg';
import mrityunjayaHavan from './assets/images/mrityunjaya_havan_1783009439983.jpg';
import birthdayPooja from './assets/images/birthday_pooja_1783009452699.jpg';
import panditKrishna from './assets/images/pandit_krishna_1782537511636.jpg';
import panditRamdev from './assets/images/pandit_ramdev_1782537527497.jpg';
import acharyaVivek from './assets/images/acharya_vivek_1782537541576.jpg';
import panditAnanth from './assets/images/pandit_g_ananth_1782537553673.jpg';

// Pooja Services Data
// Pooja Services Data
const POOJA_SERVICES: PoojaService[] = [
  {
    id: 'satya-katha',
    name: 'Satyanarayan Katha',
    hindiName: 'श्री सत्यनारायण कथा',
    duration: '90 Mins',
    price: 2100,
    description: 'Devoted ritual honoring Lord Vishnu for truth, family prosperity, peace, and removing cosmic hurdles.',
    included: {
      samagri: ['Janeu sacred thread', 'Pure gangajal', 'Kumkum & Roli', 'Ghee diya kit', 'Akshat & Panchamrit cup'],
      prasad: 'Suji Halwa (Sheera), Dry Fruits, Panchamrit direct from Panditji temple',
      certificate: true
    },
    category: 'Live Pooja',
    rating: 4.9,
    popular: true,
    image: poojaCeremony
  },
  {
    id: 'griha-pravesh',
    name: 'Griha Pravesh Pooja',
    hindiName: 'गृह प्रवेश पूजा',
    duration: '150 Mins',
    price: 5100,
    description: 'Vedic housewarming ceremony including Vastu Shanti, Lord Ganesha sthapana, and Navgrah Shanti Havan.',
    included: {
      samagri: ['Complete Vastu Havan wood pack', '9 Planet grains (Navgrah)', 'Brass kalash', 'Mango leaves bundle'],
      prasad: 'Dry fruits mix, organic cold-pressed honey, custom copper Sri Yantra card',
      certificate: true
    },
    category: 'Special Havans',
    rating: 5.0,
    popular: false,
    image: grihaPravesh
  },
  {
    id: 'ganesh-pooja',
    name: 'Ganesh Pooja & Havan',
    hindiName: 'श्री गणेश पूजन',
    duration: '60 Mins',
    price: 1500,
    description: 'Invocation of Lord Ganesha to remove obstacles (Vighnaharta), bless positive beginnings, intellect, and focus.',
    included: {
      samagri: ['Durva grass', 'Modak mold helper', 'Ganesh clay bappa', 'Sandalwood paste', 'Lotus seeds'],
      prasad: 'Premium Kesari Modak box, sacred raksha sutra thread',
      certificate: false
    },
    category: 'Live Pooja',
    rating: 4.8,
    popular: false,
    image: ganeshPooja
  },
  {
    id: 'navratri-pooja',
    name: 'Durga & Navratri Special Patth',
    hindiName: 'नवरात्रि दुर्गा पूजा',
    duration: '120 Mins',
    price: 3100,
    description: 'Powerful chanting of Durga Saptashati Shlokas to awaken feminine cosmic energy, strength, and defeat ill forces.',
    included: {
      samagri: ['Red chunri', 'Barley sowing soil kit', 'Shringar cosmetic offering pack', 'Maata photo card'],
      prasad: 'Coconut candy, dry fruits box, divine Mata Charnamrit',
      certificate: true
    },
    category: 'Festivals',
    rating: 4.9,
    popular: true,
    image: navratriPooja
  },
  {
    id: 'maha-mrityunjaya',
    name: 'Maha Mrityunjaya Havan',
    hindiName: 'महामृत्युंजय हवन',
    duration: '180 Mins',
    price: 7500,
    description: 'Ardent recitation of the life-restoring Shiva mantra for severe health recovery, longevity, and deep spiritual shield.',
    included: {
      samagri: ['Bael fruit & leaves', 'Herb mix (Javitri, Kapur)', 'Black sesame', 'Rudraksha Mala (108 beads)'],
      prasad: 'Certified 5-Mukhi Rudraksha bead, Mahadev Bhasma, Dry Prasadam pack',
      certificate: true
    },
    category: 'Special Havans',
    rating: 5.0,
    popular: false,
    image: mrityunjayaHavan
  },
  {
    id: 'birthday-pooja',
    name: 'Ayushya Birthday Pooja',
    hindiName: 'आयुष्य पूजा',
    duration: '45 Mins',
    price: 1100,
    description: 'Vedic birthday prayer for children & elders focusing on longevity, sharp intellect, physical vigor, and sound character.',
    included: {
      samagri: ['Akshat rice bundle', 'Turmeric root', 'Flower petals bucket list', 'Earthen Diya'],
      prasad: 'Mishri, Makhan, consecrated silver-plated thread bracelet',
      certificate: false
    },
    category: 'Live Pooja',
    rating: 4.7,
    popular: false,
    image: birthdayPooja
  }
];

// Verified Panditji Profiles
const PANDITS: PanditProfile[] = [
  {
    id: 'pnt-krishna',
    name: 'Pandit S. Krishna Shastri',
    languages: ['Hindi', 'Sanskrit', 'English'],
    experience: 22,
    rating: 4.9,
    specialization: ['Katha', 'Yajurveda Karma Kand', 'Navgrah Shanti'],
    quote: "A ritual is not merely chanting; it is tuning the strings of our consciousness with divine resonance.",
    mantra: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं...",
    avatarSeed: "krishna",
    image: panditKrishna
  },
  {
    id: 'pnt-mishra',
    name: 'Pandit Ramdev Mishra',
    languages: ['Hindi', 'Bengali', 'Sanskrit'],
    experience: 15,
    rating: 4.8,
    specialization: ['Griha Pravesh', 'Durga Saptashati', 'Havan Science'],
    quote: "We strive to deliver authentic Vedic parameters to your modern, global households with pure devotion.",
    mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्...",
    avatarSeed: "mishra",
    image: panditRamdev
  },
  {
    id: 'pnt-vivek',
    name: 'Acharya Vivek Joshi',
    languages: ['Marathi', 'Hindi', 'Sanskrit'],
    experience: 18,
    rating: 5.0,
    specialization: ['Maha Mrityunjaya', 'Upanishad Discourse', 'Vedic Astrology'],
    quote: "Sanskrit holds acoustic code keys that unlock cosmic pathways for sound mental physics.",
    mantra: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते...",
    avatarSeed: "vivek",
    image: acharyaVivek
  },
  {
    id: 'pnt-ananth',
    name: 'Pandit G. Ananthakrishnan',
    languages: ['Tamil', 'Telugu', 'Sanskrit', 'English'],
    experience: 26,
    rating: 4.9,
    specialization: ['South Smartha Rituals', 'Lalitha Sahasranamam', 'Marriage Chants'],
    quote: "Adapting high spiritual codes so children grow up aligned with Sanskriti and moral compasses.",
    mantra: "ॐ असतो मा सद्गमय तमसो मा ज्योतिर्गमय...",
    avatarSeed: "ananth",
    image: panditAnanth
  }
];

// Vedic Wisdom Daily Verses Data
const VEDIC_VERSES = [
  {
    shloka: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translit: "karmaṇy-evādhikāras te mā phaleṣu kadācana ।\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi ॥",
    source: "Bhagavad Gita 2.47",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of results, and never be attached to inaction.",
    significance: "Focus purely on your craft and execution. Release the anxious grip of outcomes to enter a state of peaceful flow.",
    advice: "Dear {name}, approach today with clean, unhurried precision. Dedicate your actions to a higher cause, and let go of any worry about things outside your control."
  },
  {
    shloka: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    translit: "yadā yadā hi dharmasya glānir bhavati bhārata ।\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ॥",
    source: "Bhagavad Gita 4.7",
    translation: "Whenever there is a decline in righteousness, O Bharata, and a rise of unrighteousness, then I manifest Myself on Earth.",
    significance: "The Supreme order always restores balance. Have faith that the challenges you face are temporary alignments.",
    advice: "Dear {name}, when chaos arises in your daily routine, return to your core principles. Truth and focus will always emerge triumphant over confusion."
  },
  {
    shloka: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    translit: "uddhared ātmanātmānaṁ nātmānam avasādayet ।\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ ॥",
    source: "Bhagavad Gita 6.5",
    translation: "Elevate yourself through your own mind, and do not degrade yourself. For the mind can be your greatest friend, and it can also be your worst enemy.",
    significance: "The mind holds the master keys to spiritual peace or psychological despair. Train it through standard mantra japa.",
    advice: "Dear {name}, you have immense inner strength. Rely on your internal wisdom today, replace negative thoughts with divine determination, and guide yourself closer to peace."
  },
  {
    shloka: "ईशावास्यमिदम् सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥",
    translit: "īśāvāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat ।\nten tyakten bhuñjīthā mā gṛdhaḥ kasya svid dhanam ॥",
    source: "Isha Upanishad - Verse 1",
    translation: "All this—whatever exists in this universe—is enveloped by the Divine. Enjoy it with a spirit of gratitude and detachment; do not covet other’s wealth.",
    significance: "Everything we hold is a transient gift. True enjoyment comes through appreciation and detachment.",
    advice: "Dear {name}, treat standard possessions as sacred loans. Enjoy your life's comforts with gratitude, share your bounty, and cherish the ultimate presence of divine harmony."
  },
  {
    shloka: "सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम्।\nदेवा भागं यथा पूर्वे सञ्जानाना उपासते॥",
    translit: "saṅgacchadhvaṁ saṁvadadhvaṁ saṁ vo manaṁsi jānatām ।\ndevā bhāgaṁ yathā pūrve sañjānānā upāsate ॥",
    source: "Rigveda 10.191.2",
    translation: "Walk together, speak together; let your minds think in harmony, just as the ancient gods shared their dedicated worship in unison.",
    significance: "True strength lies in unified communal consciousness, active listening, and sweet sacred alignment.",
    advice: "Dear {name}, use sweet speak today. Seek to understand before being understood, build bridges in your family relationships, and unite with your loved ones in spirit."
  },
  {
    shloka: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय। ॐ शान्तिः शान्तिः शान्तिः॥",
    translit: "asato mā sad-gamaya । tamaso mā jyotir-gamaya ।\nmṛtyor mā amṛtaṁ gamaya ॥ om śāntiḥ śāntiḥ śāntiḥ ॥",
    source: "Brihadaranyaka Upanishad",
    translation: "Lead me from untruth to truth, from darkness to light, and from death to immortality. Om Peace, Peace, Peace.",
    significance: "An eternal prayer of surrender to clarity, consciousness, and the inner sanctuary of the Divine.",
    advice: "Dear {name}, the transition from confusion to clarity is a step of devotion away. Dedicate a few moments to sit silently in meditation today to find your center."
  }
];

const getVedicCalendarDate = (date: Date) => {
  const hindiMonths = [
    'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 
    'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik', 
    'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
  ];
  const tithis = [
    'Pratipada (1st)', 'Dwitiya (2nd)', 'Tritiya (3rd)', 'Chaturthi (4th)', 
    'Panchami (5th)', 'Shashti (6th)', 'Saptami (7th)', 'Ashtami (8th)', 
    'Navami (9th)', 'Dashami (10th)', 'Ekadashi (11th)', 'Dwadashi (12th)', 
    'Trayodashi (13th)', 'Chaturdashi (14th)', 'Purnima (Full Moon)', 'Amavasya (New Moon)'
  ];
  
  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();
  
  const monthName = hindiMonths[(monthIdx + (day % 3)) % 12];
  const paksha = day % 2 === 0 ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiName = tithis[(day + monthIdx) % tithis.length];
  const shakaYear = year - 78;
  
  return `${tithiName}, ${paksha}, Masa ${monthName}, Vikram Samvat 2083 (Shaka ${shakaYear})`;
};

const getVedicVerseForUser = (name: string) => {
  const today = new Date();
  const hash = today.getDate() + today.getMonth() + name.length;
  const verse = VEDIC_VERSES[hash % VEDIC_VERSES.length];
  const customizedAdvice = verse.advice.replace("{name}", name);
  return { ...verse, customizedAdvice };
};

// FAQS
const FAQS = [
  {
    id: 'f1',
    question: "How does a Live Online Pooja work?",
    answer: "Once booked, Panditji connects with you over our secure embedded high-quality live video dashboard. We deliver the physical Pooja Samagri kits to your doorstep in advance! During the session, you keep your tablet/laptop on an altar, lit the diya, and Panditji guides you word-by-word with beautiful interactive Sanskrit chanting explanation."
  },
  {
    id: 'f2',
    question: "Do you ship physical Prasad globally?",
    answer: "Yes, we ship sacred, vacuum-sealed pure Temple Prasad, Panchamrit powder, and home-offered dry fruits across India within 3 days, and globally (USA, UK, Europe, UAE) in 5-7 business days."
  },
  {
    id: 'f3',
    question: "Are the Panditjis verified and qualified?",
    answer: "Absolutely. Every Panditji undergoes rigorous vetting. They hold traditional Sanskrit degrees (Shastri or Acharya titles) from prestigious Ved Pathshalas in Varanasi, Haridwar, or Kanchipuram and have over 10-25 years of visual ritual expertise."
  },
  {
    id: 'f4',
    question: "What is kids traditions subscription anyway?",
    answer: "It is a beautifully formatted traditional curriculum ('Gurukul') delivered online by certified young educators. Kids learn cultural stories (Ramayana, Mahabharat, Panchatantra), memorize essential Shlokas with visual meaning, engage in custom Indian arts & crafts worksheets, and play diagnostic epic quizzes."
  },
  {
    id: 'f5',
    question: "Can I cancel or reschedule my booked pooja?",
    answer: "Yes! You can reschedule your booking free of cost up to 12 hours before the scheduled time slot using your 'My Account' control portal."
  }
];

export default function App() {
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll state for #editorial-header
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NEW: Interactive Altar & AI Oracle states
  const [diyaLit, setDiyaLit] = useState(false);
  const [incenseLit, setIncenseLit] = useState(false);
  const [prasadOffered, setPrasadOffered] = useState(false);
  const [omPlaying, setOmPlaying] = useState(false);
  const [bellSwinging, setBellSwinging] = useState(false);
  const [shankhBlowing, setShankhBlowing] = useState(false);
  const [activePetals, setActivePetals] = useState<any[]>([]);
  const [activeOracleTab, setActiveOracleTab] = useState<'oracle' | 'japa' | 'panchang'>('oracle');
  
  // Divine Oracle state
  const [oracleQuery, setOracleQuery] = useState('');
  const [oracleResponse, setOracleResponse] = useState<any>(null);
  const [oracleLoading, setOracleLoading] = useState(false);
  const [oracleMethodUsed, setOracleMethodUsed] = useState<'ai' | 'offline' | null>(null);

  // Mantra Japa state
  const [japaMantra, setJapaMantra] = useState('om-namah-shivaya');
  const [japaCount, setJapaCount] = useState(0);
  const [totalJapaRounds, setTotalJapaRounds] = useState(0);
  const [japaStats, setJapaStats] = useState({ totalChants: 0, streak: 3 });

  // Sound Synth References
  const omChantGainNodeRef = useRef<GainNode | null>(null);
  const omChantOscillatorsRef = useRef<OscillatorNode[]>([]);
  const omChantCtxRef = useRef<AudioContext | null>(null);

  // Clean up OM drone on unmount
  useEffect(() => {
    return () => {
      if (omChantGainNodeRef.current) {
        try {
          omChantOscillatorsRef.current.forEach(osc => osc.stop());
          omChantCtxRef.current?.close();
        } catch (e) { }
      }
    };
  }, []);

  // Synthesize Bell Ring (crystalline decay acoustics)
  const triggerBellRing = () => {
    setBellSwinging(true);
    setTimeout(() => setBellSwinging(false), 1200);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const freqs = [587.33, 880, 1174.66, 1567.98, 2093];
      const gains = [0.4, 0.25, 0.15, 0.1, 0.05];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.3, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        oscGain.gain.setValueAtTime(gains[i], now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + (1.5 - i * 0.2));

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 2.2);
      });
    } catch (e) {
      console.log("AudioContext is blocked or not supported on this browser frame.");
    }
  };

  // Synthesize Shankh Blow (organic swell brassy low drone)
  const triggerShankhBlow = () => {
    setShankhBlowing(true);
    setTimeout(() => setShankhBlowing(false), 3000);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const masterGain = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(136.1, now);
      osc1.frequency.linearRampToValueAtTime(142.5, now + 1.2);
      osc1.frequency.linearRampToValueAtTime(136.1, now + 2.8);

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(272.2, now);
      osc2.frequency.linearRampToValueAtTime(285, now + 1.2);
      osc2.frequency.linearRampToValueAtTime(272.2, now + 2.8);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(650, now + 1.0);
      filter.frequency.exponentialRampToValueAtTime(140, now + 2.8);
      filter.Q.setValueAtTime(5, now);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.25, now + 1.0);
      masterGain.gain.exponentialRampToValueAtTime(0.01, now + 2.8);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.0);
      osc2.stop(now + 3.0);
    } catch (e) {
      console.log("AudioContext is blocked.");
    }
  };

  // Synthesize OM Meditative continuous Drone
  const toggleOmChant = () => {
    const isStarting = !omPlaying;
    setOmPlaying(isStarting);

    try {
      if (!isStarting) {
        if (omChantGainNodeRef.current) {
          const now = omChantGainNodeRef.current.context.currentTime;
          omChantGainNodeRef.current.gain.cancelScheduledValues(now);
          omChantGainNodeRef.current.gain.setValueAtTime(omChantGainNodeRef.current.gain.value, now);
          omChantGainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          const oscs = [...omChantOscillatorsRef.current];
          omChantOscillatorsRef.current = [];
          
          setTimeout(() => {
            oscs.forEach(osc => { try { osc.stop(); } catch(e){} });
            omChantCtxRef.current?.close();
            omChantCtxRef.current = null;
            omChantGainNodeRef.current = null;
          }, 1300);
        }
        return;
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      omChantCtxRef.current = ctx;
      const now = ctx.currentTime;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, now);
      filter.Q.setValueAtTime(4, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.22, now + 1.8);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      omChantGainNodeRef.current = masterGain;

      const frequencies = [136.1, 136.25, 272.2, 272.6, 68.05];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx < 2 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(filter);
        osc.start(now);
        omChantOscillatorsRef.current.push(osc);
      });
    } catch (e) {
      console.log("AudioContext blocked.");
    }
  };

  // Shower Flower Petals
  const triggerPetalShower = () => {
    const freshPetals = [];
    const colors = ['rose', 'marigold'];
    for (let i = 0; i < 24; i++) {
      freshPetals.push({
        id: Date.now() + i,
        x: Math.random() * 95,
        size: Math.random() * 14 + 10,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        drift: Math.random() * 15 - 7.5
      });
    }
    setActivePetals(freshPetals);
    setTimeout(() => {
      setActivePetals([]);
    }, 6000);
  };

  // Slide Bead function
  const handleChantBead = () => {
    setJapaCount(prev => {
      const nextVal = prev + 1;
      if (nextVal >= 108) {
        triggerBellRing();
        setTotalJapaRounds(r => r + 1);
        setJapaStats(s => ({
          totalChants: s.totalChants + 108,
          streak: s.streak + 1
        }));
        alert("🔱 Mala Completed! You have completed a sacred 108 chant round under guidance of PoojaGhar.");
        return 0;
      }
      return nextVal;
    });

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, now);
      oscGain.gain.setValueAtTime(0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) { }
  };

  // Couch local offline spiritual queries answers
  const LOCAL_WISDOM_ANSWERS: Record<string, { shloka: string, meaning: string, intro: string, guide: string }> = {
    peace: {
      intro: "Finding peace begins with self-regulation and detachment from outward disruptions. Lord Krishna outlines this in Chapter 2, Shloka 70.",
      shloka: "आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमाप्नोति न कामकामी॥",
      meaning: "Just as the ocean remains undisturbed by the continuous flow of rivers into it, a person who is unperturbed by the flow of desires achieves inner peace, not one who chases desires.",
      guide: "Practice 5 minutes of Shambhavi Mudra breathing at dawn. Focus with unswayed attention on your heart chakra."
    },
    mindfulness: {
      intro: "Vedic mindfulness details how to harness the wandering intellect. The Katha Upanishad compared the senses to wild horses.",
      shloka: "यच्छेद्वाङ्मनसी प्राज्ञस्तद्यच्छेज्ज्ञान आत्मनि।\nज्ञानमात्मनि महति नियच्छेत्तद्यच्छेच्छान्त आत्मनि॥",
      meaning: "The wise person should restrain speech and the mind, merging them into the intellect, and further merge the intellect into the peaceful supreme Self.",
      guide: "Observe thoughts as floating clouds without judging them. Chant the Gayatri Mantra in slow, rounded breath loops."
    },
    calm: {
      intro: "When anxiety attacks, center your breath. Prana is the link between divine intellect and bodily balance.",
      shloka: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥",
      meaning: "For those who have conquered the mind, it is their greatest ally. But for those who fail to do so, the mind remains their worst enemy.",
      guide: "Execute Nadi Shodhana Pranayama (Alternate Nostril Chanting) for 48 rounds. Maintain a relaxed, straight spine."
    },
    anxiety: {
      intro: "Anxiety stems from anticipating results (Karmaphala). Surrender your struggle to the Divine Flow.",
      shloka: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      meaning: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, nor be attached to inaction.",
      guide: "Offer a lit Diya of clarified butter on your home altar. Let go of outcomes, trust that cosmic order (Rta) is guiding you."
    },
    focus: {
      intro: "Concentration is refined when the ego takes a secondary seat to devotion. True intellect (Buddhi) becomes crystal clear.",
      shloka: " व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन।\nबहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्॥",
      meaning: "The intellect of those on this path is resolute, O child of the Kurus, and their focus is single-pointed. Multi-branched & endless is the mind of the irresolute.",
      guide: "Light a flame at eye level (Trataka meditation). Stare steadily at the core yellow flame of the Diya for 2 minutes."
    },
    dedication: {
      intro: "Like Arjuna's focus on the bird's eye, select your vision with purity of heart, without divided priorities.",
      shloka: "श्रद्धावॉल्लभते ज्ञानं तत्परः संयतेन्द्रियः।\nज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति॥",
      meaning: "The faithful seeker of pure heart, who has mastered the senses, gains transcendent wisdom. Having attained wisdom, they reach supreme peace instantly.",
      guide: "Dedicate your actions as a flower offering (Prasada). Start each workday by tapping your feet against Mother Earth with gratitude."
    },
    family: {
      intro: "Collective home peace (Grihastha) is built on mutual respect and harmonious acoustic speech.",
      shloka: "सह नाववतु सह नौ भुनक्तु सह वीर्यं करवावहै।\nतेजस्वि नावधीतमस्तु मा विद्विषावहै॥",
      meaning: "May the Divine protect us both together; may we be nourished together. May we work with great energy, may our study be radiant, may there be no discord between us.",
      guide: "Gather the household for Sandhya Aarti once a week. Sing the resonant chants together to neutralize electrostatic home friction."
    },
    general: {
      intro: "Every journey begins with a pure step. Align yourself with eternal dharma.",
      shloka: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
      meaning: "Abandon all variations of secondary duties, surrender to Me alone. I shall deliver you from all fear and adversity; do not grieve.",
      guide: "Keep your altar clean, light fresh incense of sandalwood, and dedicate your morning coordinates to pure service."
    }
  };

  // Handle oracle query submit
  const handleOracleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oracleQuery.trim()) return;

    setOracleLoading(true);
    setOracleResponse(null);
    setOracleMethodUsed(null);

    const textQuery = oracleQuery.toLowerCase();
    let detectedKeyword = 'general';
    const keywords = ['peace', 'mindfulness', 'calm', 'anxiety', 'focus', 'dedication', 'family'];
    for (const kw of keywords) {
      if (textQuery.includes(kw)) {
        detectedKeyword = kw;
        break;
      }
    }

    try {
      const response = await fetch("/api/gemini/spiritual-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: oracleQuery,
          context: `Devotee wants assistance/guidance regarding: ${detectedKeyword}`
        })
      });

      if (!response.ok) {
        throw new Error("API Offline or Key missing");
      }

      const data = await response.json();
      if (data && data.text) {
        setOracleResponse({
          intro: "Response from Shastri AI Guru Oracle:",
          shloka: "",
          meaning: data.text,
          guide: "Recommended: Light the Virtual Diya on your Altar & dedicate 5 minutes to meditation."
        });
        setOracleMethodUsed('ai');
      } else {
        throw new Error("Malformed response");
      }
    } catch (err) {
      const offlineSet = LOCAL_WISDOM_ANSWERS[detectedKeyword] || LOCAL_WISDOM_ANSWERS.general;
      await new Promise(resolve => setTimeout(resolve, 1200));
      setOracleResponse({
        intro: offlineSet.intro,
        shloka: offlineSet.shloka,
        meaning: offlineSet.meaning,
        guide: offlineSet.guide
      });
      setOracleMethodUsed('offline');
    } finally {
      setOracleLoading(false);
    }
  };

  // Get Astro indicators Panchan stats
  const getPanchangStats = () => {
    const today = new Date();
    const tithis = ["Shukla Ekadashi", "Purnima", "Krishna Dwitiya", "Amavasya", "Shukla Panchami", "Shukla Ashtami"];
    const nakshatras = ["Rohini", "Ashwini", "Pushya", "Shatabhisha", "Krittika", "Hasta"];
    const tithiIdx = today.getDate() % tithis.length;
    const nakshatraIdx = today.getDay() % nakshatras.length;

    return {
      tithi: tithis[tithiIdx],
      nakshatra: nakshatras[nakshatraIdx],
      rahuKaal: "04:30 PM - 06:00 PM (Inauspicious timeframe)",
      muhurta: "08:15 AM - 09:30 AM (Amrit Kaal, auspicious for Chants)",
      recommendation: tithiIdx === 0 
        ? "Lord Vishnu Puja (Satyanarayan Katha) is highly recommended for prosperity today." 
        : tithiIdx === 1 
        ? "Special Havans (Maha Mrityunjaya) are extremely active & beneficial today."
        : "Ganesh Pooja is perfect for resolving professional blocks today."
    };
  };

  // Authenticated User State
  const [user, setUser] = useState<UserState | null>(poojaAuth.getCurrentUser());
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'signin' | 'signup' }>({ open: false, mode: 'signin' });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);

  // Waitlist State and Real-Time Notifications
  const [waitlistModal, setWaitlistModal] = useState<{ open: boolean }>({ open: false });
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistInterest, setWaitlistInterest] = useState('gurukul');
  const [waitlistNotes, setWaitlistNotes] = useState('');
  const [waitlist, setWaitlist] = useState<any[]>(() => {
    try {
      const data = localStorage.getItem('poojaghar_waitlist');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [waitlistNotifications, setWaitlistNotifications] = useState<any[]>(() => {
    try {
      const data = localStorage.getItem('poojaghar_notifications');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Immersive Fullscreen State & Handlers
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestImmersiveFullscreen = () => {
    const docEl = document.documentElement as any;
    const requestMethod = docEl.requestFullscreen || 
                          docEl.mozRequestFullScreen || 
                          docEl.webkitRequestFullScreen || 
                          docEl.msRequestFullscreen;
    if (requestMethod) {
      requestMethod.call(docEl).catch((err: any) => {
        console.warn("Immersive fullscreen mode deferred or blocked: ", err);
      });
    }
  };

  const exitImmersiveFullscreen = () => {
    const doc = document as any;
    const exitMethod = doc.exitFullscreen || 
                       doc.mozCancelFullScreen || 
                       doc.webkitExitFullscreen || 
                       doc.msExitFullscreen;
    if (exitMethod) {
      exitMethod.call(doc).catch((err: any) => {
        console.warn("Exit fullscreen failed: ", err);
      });
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitImmersiveFullscreen();
    } else {
      requestImmersiveFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Enter fullscreen automatically on the first user interaction (touch/click)
    const handleFirstUserInteraction = () => {
      if (!document.fullscreenElement) {
        requestImmersiveFullscreen();
      }
      document.removeEventListener('click', handleFirstUserInteraction);
      document.removeEventListener('touchend', handleFirstUserInteraction);
    };

    document.addEventListener('click', handleFirstUserInteraction, { passive: true });
    document.addEventListener('touchend', handleFirstUserInteraction, { passive: true });

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('click', handleFirstUserInteraction);
      document.removeEventListener('touchend', handleFirstUserInteraction);
    };
  }, []);

  // General App views & loaders
  const [bookings, setBookings] = useState<BookingState[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionState[]>([]);
  const [dashboardTab, setDashboardTab] = useState<'bookings' | 'kids'>('bookings');

  // Kids Subscription Plan states
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [joiningSub, setJoiningSub] = useState<any | null>(null); // Active billing tier clicked

  // Booking states
  const [bookingService, setBookingService] = useState<PoojaService | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('08:00 AM');
  const [bookingPandit, setBookingPandit] = useState<string>(PANDITS[0].id);
  const [devoteeName, setDevoteeName] = useState('');
  const [devoteePhone, setDevoteePhone] = useState('');
  const [bookingStep, setBookingStep] = useState<'form' | 'payment'>('form');

  // Stripe Emulator states
  const [stripeCardNum, setStripeCardNum] = useState('');
  const [stripeExpiry, setStripeExpiry] = useState('');
  const [stripeCvc, setStripeCvc] = useState('');
  const [stripeZip, setStripeZip] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'none' | 'success' | 'failed'>('none');
  const [payerEmail, setPayerEmail] = useState('');

  // Live Pooja Upcoming Ticker Countdown
  const [upcomingCountdown, setUpcomingCountdown] = useState({ h: 3, m: 42, s: 19 });

  // Accordion active index
  const [openFaq, setOpenFaq] = useState<string | null>('f1');

  // Traditional Kids Quiz Widget (Interactive)
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Interactive Ritual Personalizer States
  const [personalizerRitual, setPersonalizerRitual] = useState('satya-katha');
  const [personalizerRegion, setPersonalizerRegion] = useState('North Indian Vedic');
  const [personalizerLanguage, setPersonalizerLanguage] = useState('Hindi');
  const [personalizerMode, setPersonalizerMode] = useState('ai'); // 'ai' or 'pandit'
  const [personalizerStepIdx, setPersonalizerStepIdx] = useState(0); // active step in pooja
  const [personalizerGenerated, setPersonalizerGenerated] = useState(false);
  const [personalizerCheckedSamagri, setPersonalizerCheckedSamagri] = useState<Record<string, boolean>>({});
  const [personalizerSyncSuccess, setPersonalizerSyncSuccess] = useState(false);
  const [personalizerAartiPlaying, setPersonalizerAartiPlaying] = useState(false);

  // Kids Story State
  const [kidsStoryIdx, setKidsStoryIdx] = useState(0);
  const [kidsStoryAudioPlaying, setKidsStoryAudioPlaying] = useState(false);

  // Pandit profiles enhancement states
  const [selectedPanditId, setSelectedPanditId] = useState<string>('pnt-krishna');
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(1); // Tomorrow by default
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00 AM');
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoMuted, setVideoMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  const initialReviews: Record<string, Array<{
    id: string;
    reviewer: string;
    rating: number;
    date: string;
    service: string;
    comment: string;
    verified: boolean;
  }>> = {
    'pnt-krishna': [
      { id: 'rev-k1', reviewer: 'Aniket Deshmukh', rating: 5, date: '10 Jun 2026', service: 'Satyanarayan Katha', comment: 'Pandit Krishna conducted our Katha with pristine Vedic precision. His English explanations for the kids were extremely beautiful and clear.', verified: true },
      { id: 'rev-k2', reviewer: 'Suresh Raman', rating: 5, date: '28 May 2026', service: 'Navgrah Shanti Havan', comment: 'Superb voice quality and authentic Vedic chanting. Fully satisfied with the experience!', verified: true },
      { id: 'rev-k3', reviewer: 'Pooja Hegde', rating: 4, date: '04 May 2026', service: 'Ayushya Birthday Pooja', comment: 'Very punctual and pure pronunciation of shlokas. Our grandparents were incredibly happy.', verified: true }
    ],
    'pnt-mishra': [
      { id: 'rev-m1', reviewer: 'Koyel Roy', rating: 5, date: '12 Jun 2026', service: 'Griha Pravesh & Vastu Pooja', comment: 'Very informative and authentic. Acharya Ramdev explained the exact energetic rules of our kitchen layout.', verified: true },
      { id: 'rev-m2', reviewer: 'Amit Pathak', rating: 4, date: '15 May 2026', service: 'Durga Saptashati', comment: 'Extremely detailed explanation of Devi Slokas. The absolute spiritual connection was established.', verified: true }
    ],
    'pnt-vivek': [
      { id: 'rev-v1', reviewer: 'Praveen Joshi', rating: 5, date: '14 Jun 2026', service: 'Maha Mrityunjaya', comment: 'Acharya Vivek has a divine voice. The rhythmic sound healing vibrations of the mantra made our environment so peaceful.', verified: true },
      { id: 'rev-v2', reviewer: 'Srinivas Murthy', rating: 5, date: '01 Jun 2026', service: 'Upanishad Discourse', comment: 'His philosophical clarity is on another level. Spoke directly into our modern doubts with simple, humble logic.', verified: true }
    ],
    'pnt-ananth': [
      { id: 'rev-a1', reviewer: 'Meenakshi Sundaram', rating: 5, date: '08 Jun 2026', service: 'South Smartha Rituals', comment: 'Pure Smartha style from Tamil Nadu. Highly satisfied with how beautifully he adapted our home rules in software.', verified: true },
      { id: 'rev-a2', reviewer: 'Raghunandan G.', rating: 5, date: '19 May 2026', service: 'Marriage Chants (Virtual)', comment: 'A pure blessing. Correctly guided us to light the fireplace and do dynamic circumambulation steps. Highly recommended.', verified: true }
    ]
  };

  const [panditReviews, setPanditReviews] = useState<Record<string, Array<{
    id: string;
    reviewer: string;
    rating: number;
    date: string;
    service: string;
    comment: string;
    verified: boolean;
  }>>>(initialReviews);

  // New review form states for the active Pandit
  const [newReviewName, setNewReviewName] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewService, setNewReviewService] = useState<string>('Satyanarayan Katha');
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState<boolean>(false);

  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const videoAudioCtxRef = useRef<AudioContext | null>(null);
  const videoOscillatorsRef = useRef<any[]>([]);
  const videoGainNodeRef = useRef<any>(null);

  // Sync real video playback state
  useEffect(() => {
    if (videoPlayerRef.current) {
      if (videoPlaying) {
        videoPlayerRef.current.play().catch((e) => {
          console.log("Auto-play was blocked or failed", e);
        });
      } else {
        videoPlayerRef.current.pause();
      }
    }
  }, [videoPlaying]);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  // Vedic Synthesizer sound generator while video is active and not muted
  useEffect(() => {
    if (videoPlaying && !videoMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        videoAudioCtxRef.current = ctx;
        const now = ctx.currentTime;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, now);

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.12, now + 1.0);

        filter.connect(masterGain);
        masterGain.connect(ctx.destination);
        videoGainNodeRef.current = masterGain;

        // Beautiful meditative sound backdrop (OM and Drone harmony)
        const baseFreq = 136.1; // Cosmic pranava OM frequency
        const frequencies = [baseFreq, baseFreq * 1.5, baseFreq * 2.0, baseFreq * 0.5];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 1 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, now);

          // Add subtle warmth via vibrato LFO
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.25, now);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(0.4, now);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start(now);
          videoOscillatorsRef.current.push(lfo);

          osc.connect(filter);
          osc.start(now);
          videoOscillatorsRef.current.push(osc);
        });

        // Soft, rhythmic, bell-like, high-pitched chants
        let noteTime = now + 1.2;
        const melodyNotes = [272.2, 326.6, 408.3, 544.4]; // Swara pentatonic intervals
        for (let i = 0; i < 30; i++) {
          const oscMelody = ctx.createOscillator();
          oscMelody.type = "sine";
          const melodyFreq = melodyNotes[i % melodyNotes.length];
          oscMelody.frequency.setValueAtTime(melodyFreq, noteTime);

          const melodyGain = ctx.createGain();
          melodyGain.gain.setValueAtTime(0, noteTime);
          melodyGain.gain.linearRampToValueAtTime(0.03, noteTime + 0.1);
          melodyGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.4);

          oscMelody.connect(melodyGain);
          melodyGain.connect(ctx.destination);

          oscMelody.start(noteTime);
          oscMelody.stop(noteTime + 1.5);

          videoOscillatorsRef.current.push(oscMelody);
          noteTime += 1.8;
        }

      } catch (e) {
        console.log("Vedic synthesis audio error", e);
      }
    } else {
      // Quiet shutdown of synthesizer nodes
      if (videoGainNodeRef.current && videoAudioCtxRef.current) {
        try {
          const now = videoAudioCtxRef.current.currentTime;
          videoGainNodeRef.current.gain.cancelScheduledValues(now);
          videoGainNodeRef.current.gain.linearRampToValueAtTime(0.001, now + 0.4);
        } catch (e) {}
      }
      setTimeout(() => {
        videoOscillatorsRef.current.forEach(o => { try { o.stop(); } catch(e) {} });
        videoOscillatorsRef.current = [];
        if (videoAudioCtxRef.current) {
          try { videoAudioCtxRef.current.close(); } catch(e) {}
          videoAudioCtxRef.current = null;
        }
      }, 500);
    }

    return () => {
      videoOscillatorsRef.current.forEach(o => { try { o.stop(); } catch(e) {} });
      if (videoAudioCtxRef.current) {
        try { videoAudioCtxRef.current.close(); } catch(e) {}
      }
    };
  }, [videoPlaying, videoMuted]);

  // Video progress controller simulated
  useEffect(() => {
    let interval: any;
    if (videoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setVideoPlaying(false);
            return 0;
          }
          return prev + 1; // Increments slowly and smoothly
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [videoPlaying]);

  // Derived calculations for active Pandit profile
  const activePandit = PANDITS.find(p => p.id === selectedPanditId) || PANDITS[0];
  const activeReviews = panditReviews[selectedPanditId] || [];
  const totalReviewsCount = activeReviews.length;
  const averageRatingCalculated = totalReviewsCount > 0
    ? (activeReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : activePandit.rating.toFixed(1);

  const videoIntros: Record<string, { focusTitle: string; caption: string }> = {
    'pnt-krishna': {
      focusTitle: "Vaidik Swara Chanting Practice",
      caption: "🎙️ 'Purusha Suktam represents alignment with cosmic dimensions. In this video, I demonstrate standard rhythmic intonation for kids.'"
    },
    'pnt-mishra': {
      focusTitle: "Navgrah Havan Introduction",
      caption: "🎙️ 'Pranams. Ramdev Mishra here. Havan science releases positive ions through herbal elements. Watch my setup guide.'"
    },
    'pnt-vivek': {
      focusTitle: "Maha Mrityunjaya Pronunciation",
      caption: "🎙️ 'Hari Om. Vivek Joshi here. Precise Sanskrit acoustic waves activate mental clarity. Let us practice sound healing.'"
    },
    'pnt-ananth': {
      focusTitle: "Smartha Chanting and Intonation",
      caption: "🎙️ 'Vanakkam. Complete Smartha style rituals hold pristine geometry. Listening to these mantras brings deep inner peace.'"
    }
  };
  const activeVideo = videoIntros[selectedPanditId] || videoIntros['pnt-krishna'];

  const calendarDays = [
    { label: 'Today', dayNum: '15', dateStr: 'Mon Jun', raw: '2026-06-15' },
    { label: 'Tomorrow', dayNum: '16', dateStr: 'Tue Jun', raw: '2026-06-16' },
    { label: 'Wed', dayNum: '17', dateStr: 'Wed Jun', raw: '2026-06-17' },
    { label: 'Thu', dayNum: '18', dateStr: 'Thu Jun', raw: '2026-06-18' },
    { label: 'Fri', dayNum: '19', dateStr: 'Fri Jun', raw: '2026-06-19' },
    { label: 'Sat', dayNum: '20', dateStr: 'Sat Jun', raw: '2026-06-20' },
    { label: 'Sun', dayNum: '21', dateStr: 'Sun Jun', raw: '2026-06-21' }
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    const newObj = {
      id: `new-rev-${Date.now()}`,
      reviewer: newReviewName,
      rating: newReviewRating,
      date: '15 Jun 2026',
      service: newReviewService,
      comment: newReviewComment,
      verified: true
    };

    setPanditReviews(prev => ({
      ...prev,
      [selectedPanditId]: [newObj, ...(prev[selectedPanditId] || [])]
    }));

    setNewReviewName('');
    setNewReviewComment('');
    setReviewSubmitSuccess(true);
    setTimeout(() => setReviewSubmitSuccess(false), 4000);
  };

  // Regional Variations Ritual Customizer Database
  const REGIONAL_RITUALS_DATA: Record<string, Record<string, {
    specialSamagri: string[];
    steps: { name: string; description: string; mantra: string; meaning: string }[];
    prasadam: string;
    atmosphereTip: string;
  }>> = {
    'satya-katha': {
      'North Indian Vedic': {
        specialSamagri: ['Red Altar Cloth (Aasan)', 'Wheat flour Panchamrit', 'Banana leaves for mandap', 'Mauli Raksha thread', 'Panchameva dry fruits mix'],
        steps: [
          { name: 'Shuddhikaran', description: 'Sprinkle standard Gangajal to purify the self and surrounding physical worship elements.', mantra: 'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा...', meaning: 'Whoever, pure or impure, remembers the lotus-eyed Lord, becomes purified inside and out.' },
          { name: 'Sankalpa', description: 'Take yellow mustard, white rice, and water in your palm. Dedicate this ritual for family health and peace.', mantra: 'मम आत्मनः श्रुति स्मृति पुराणोक्त फल प्राप्त्यर्थं...', meaning: 'I dedicate this action to attain auspicious abundance and remove negative cosmic blocks.' },
          { name: 'Sri Ganesh Pujan', description: 'Adorn Lord Ganesha representation with sandesh paste, durva grass, and red flowers.', mantra: 'ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ...', meaning: 'O elephant-faced Lord of infinite brilliance, remove all obstacles from my path always.' },
          { name: 'Bhagavan Satyanarayan Shodashopachar', description: 'Offer 16 physical steps of love (Pushpa, Chandan, Sugandhi, Naivedhyam) to Lord Vishnu.', mantra: 'ॐ नमो भगवते वासुदेवाय...', meaning: 'I bow with absolute devotion to the Supreme Cosmic Controller, Lord Satyanarayan.' }
        ],
        prasadam: 'Roasted wheat flour Sheera (Karah Prasad) sweetened with organic jaggery and chopped cardamom.',
        atmosphereTip: 'Light fresh sandalwood incense. Chant in a powerful, deep vocal tone.'
      },
      'Tamil Smartha': {
        specialSamagri: ['Turmeric powder Pillaiyar (Ganesha)', 'Fresh betel leaves with split supari', 'Raw rice grain base (Kolam)', 'Kuthuvilakku brass lamps'],
        steps: [
          { name: 'Achamanam', description: 'Sip holy water thrice from copper spoon (Uddharini) reciting name keys to align absolute physical consciousness.', mantra: 'ॐ अच्युताय नमः, ॐ अनन्ताय नमः, ॐ गोविन्दाय नमः...', meaning: 'I bow to the Immortal, the Infinite, and the Divine Protector of all realms.' },
          { name: 'Maha Sankalpam', description: 'Proclaim detailed geographical, planetary, and ancestral coordinates (Gotram & birth nakshatra) to locate your family in the cosmic field.', mantra: 'शालिवाहन शके बौद्धावतारे... अमुक नक्षत्रे अमुक गोत्रस्य...', meaning: 'In this vast cosmos, on this date, I (belonging to my sacred lineage) perform this ritual for global peace.' },
          { name: 'Vighneshwar Pooja', description: 'Consecrate Haridra Pillaiyar (organic turmeric paste Ganesha representation) with sweet broken jaggery.', mantra: 'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्...', meaning: 'Chant to the white-robed Ganesha, the color of the moon, for deep internal serenity.' },
          { name: 'Tamil Padhuka Archana', description: 'Recite Vishnu Sahasranamam, showering tulsi leaves at the lotus-feet of the dynamic copper idol.', mantra: 'ॐ श्री वल्लभाय नमः, ॐ श्रीधराय नमः...', meaning: 'I praise the beloved Lord Who holds the cosmic energy of wealth and support close to Him.' }
        ],
        prasadam: 'Rich Sweet Sakkarai Pongal made with native raw rice, clarified cow ghee, split cashews, and pure brown jaggery.',
        atmosphereTip: 'Chant in quiet, traditional Vedic accents. Complete the floor with hand-drawn white rice flour Kolam.'
      },
      'Bengali': {
        specialSamagri: ['Shankha (Conch shell)', 'Kusha grass mats', 'White mustard (Shorishe)', 'Mukut headgear', 'Ganga soil (Mati)'],
        steps: [
          { name: 'Shankhadhwani', description: 'Blow the heavy conch shell thrice to alert cosmic dimensions and dispel stagnant psychological blocks.', mantra: 'ॐ शंखं भजध्वं सर्वदेव-प्रियं...', meaning: 'Awaken the sacred conch shell, beloved by the deities, to signal the startup of divine energies.' },
          { name: 'Achman & Bhuta Shuddhi', description: 'Purify five physical life-elements inside your physical vessel to prepare your mind for direct divine reception.', mantra: 'ॐ भूतानि सर्वाणि अपसर्पन्तु...', meaning: 'May all stagnant internal vibrations dissolve, replaced by pure luminous light.' },
          { name: 'Hari Nam-Sankirtan', description: 'Sing beautiful, emotional praises of Lord Narayana with small cymbals (Kartal) to enter deep bhakti.', mantra: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे...', meaning: 'The divine song of love that clears the mind’s mirror and links us with bliss.' },
          { name: 'Satyanarayan Brata Katha', description: 'Listen with closed eyes to the moral stories of true devotion, focusing on honesty, keeping promises, and charity.', mantra: 'ॐ सत्यनारायणाय नमः...', meaning: 'Salutations to the Lord of eternal Truth, Who guides us across the ocean of worldly ocean.' }
        ],
        prasadam: 'Sweet Shini sweet batter made with pure cow milk, bananas, flour, sugar, and tiny cardamom raisins.',
        atmosphereTip: 'Ulu-dhwani (traditional hand-mouth high vocal vibration) creates deep spiritual resonance.'
      },
      'Gujarati': {
        specialSamagri: ['Siddha Sopari', 'Naariyal Coconut with gold lace', 'Kanku (Red Kumkum)', 'Ghee Gilli Diya'],
        steps: [
          { name: 'Pavitrikaran', description: 'Wash hands, apply wet red sandal stamp behind ears and perform physical mental purification.', mantra: 'ॐ पुण्डरीकाक्षः पुनातु...', meaning: 'May the lotus-eyed Lord purify all directions.' },
          { name: 'Ganesh-Gauri Sthapana', description: 'Seat Lord Ganesha on a small mount of wheat grains, chanting security mantras.', mantra: 'ॐ गौरीपद्मा शचीमेधा सावित्री विजया जया...', meaning: 'Salutations to Gauri and local mother energies for surrounding health and positive flow.' },
          { name: 'Sri Satyanor Thal', description: 'Offer a delicious feast to Lord Vishnu, begging Him to visit your family home and accept the feast.', mantra: 'ॐ श्री सत्यदेव आरोग्य शाला भुंज्यताम्...', meaning: 'O Lord of Truth, please bless our dwelling and receive this devotion with happiness.' },
          { name: 'Aarti and Visarjan', description: 'Light the camphor plate, perform circular waves of fire, while clapping in group harmony.', mantra: 'जय लक्ष्मी रमणा, जय जय श्री लक्ष्मी रमणा...', meaning: 'All glory to the beloved Lord of Goddess Lakshmi, Who brings divine wealth and protection.' }
        ],
        prasadam: 'Flavorful Kansar (broken wheat sweet dessert) garnished with heavy sugar crystals and hot organic cow ghee.',
        atmosphereTip: 'Clap rhythmically in traditional beats, aligning your heartbeat with the lamp’s natural light.'
      },
      'Marathi': {
        specialSamagri: ['Vidya Tambula leaf setup', 'Haldi-Kunku plates', 'Brass Samai lamps', 'Gulal powder'],
        steps: [
          { name: 'Devata Avahana', description: 'Welcome Lord Satyanarayan with warm sanskar cords, requesting Him to sit comfortably on your home altar.', mantra: 'ॐ आगच्छ देव सर्वत्र दुःख-विनाशक...', meaning: 'Please reside here, O dispeller of sorrows, and bless this family with pure joy.' },
          { name: 'Shri Satyanarayan Shlokas', description: 'Chant standard Sanskrit shlokas highlighting truth, courage, and family solidarity.', mantra: 'ॐ सत्यदेव महाभाग सर्वकाम प्रदायक...', meaning: 'Salutations to Satya-Deva, Who listens to true prayers and fulfills our purest aspirations.' },
          { name: 'Vrat Katha Sravana', description: 'Read and understand the Marathi Pothi chapters of Satyadutt King and early merchants.', mantra: 'श्रीमत् सत्यनारायण कथा श्रवण प्रथम अध्याय...', meaning: 'Entering the sacred reading of Satyanarayan Katha, Chapter One, for wisdom.' }
        ],
        prasadam: 'Delicious Purand Poli made of cooked yellow gram, soft dry wheat skin, cardamoms, and organic brown sugar.',
        atmosphereTip: 'Sing aarti of "Sukhakarta Dukhaharta" with high energy and traditional brass bells.'
      }
    },
    'griha-pravesh': {
      'North Indian Vedic': {
        specialSamagri: ['Vastu Copper card', 'Wooden Shanti Havan kit', 'Nine planetary grains (Navgrah)', 'Cow dung cakes'],
        steps: [
          { name: 'Dwara Puja', description: 'Perform absolute worship at the new main door to establish security, energy flow, and beauty.', mantra: 'ॐ देहली देव्यै नमः...', meaning: 'I bow to the goddess of the threshold, welcoming auspicious energies and shutting out stress.' },
          { name: 'Gauri Ganesh Kalash Puja', description: 'Establish the sacred copper pitcher representing the cosmos, crowned with mango leaves and coconut.', mantra: 'ॐ वरुणाय नमः, कलशस्य मुखे विष्णुः...', meaning: 'In the mouth of the Pitcher resides Vishnu, in the neck, Shiva, and in the base, Brahma.' },
          { name: 'Vastu Purush Sthapana', description: 'Chant code keys to steady the layout grid of your building, bringing health, wealth, and peaceful sleep.', mantra: 'ॐ वास्तोष्पते प्रति जानीह्यस्मान्...', meaning: 'O Guardian Spirit of this building! Rejoice in us, grant our desires, and protect our assets.' },
          { name: 'Navgrah Havan', description: 'Offer organic wood, black sesame, and sweet herbs into holy fire to harmonize nine celestial influences.', mantra: 'ॐ आदित्याय सोमाय मङ्गलाय बुधाय च...', meaning: 'Salutations to the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.' }
        ],
        prasadam: 'Delectable Kheer cooked with sacred cow milk, basmati rice pearls, saffron (kesar), and rich pistachios.',
        atmosphereTip: 'Perform during auspicious morning timings. Keep all windows open to circulate the therapeutic havan smoke.'
      },
      'Tamil Smartha': {
        specialSamagri: ['Dharba Grass bundles', 'Navadhanyam (9 grains)', 'New clay pot for milk boiling', 'Gold coin for Kalasa'],
        steps: [
          { name: 'Gho Pooja', description: 'Perform sacred kamadhenu cow worship at the entrance of your home to usher in absolute, unconditional love.', mantra: 'ॐ सुरभ्यै नमः, गावो साक्षात् जगन्मातः...', meaning: 'I bow to the divine cow, the mother of the universe, who carries pure cosmic frequencies.' },
          { name: 'Milks Boiling (Paal Kaachuthal)', description: 'Boil fresh, rich milk in a new clay pot over the main stove, letting it overflow slightly to symbolize abundance.', mantra: 'ॐ अन्नपूर्णाय नमः...', meaning: 'Salutations to Goddess Annapurna, Who sustains us with physical and mental nourishment.' },
          { name: 'Sudarsana Homam', description: 'Perform holy fire with special herb sticks to clear any previous visual/energy logs of the land.', mantra: 'ॐ सुदर्शनाय विद्महे महाज्वालाय धीमहि...', meaning: 'May the sharp, cosmic wheel of Lord Vishnu cut through confusion and establish eternal grace.' }
        ],
        prasadam: 'Delightful Sweet Ven Pongal simmered with whole black peppers, cashews, ginger, and curry leaves.',
        atmosphereTip: 'Women should wear traditional Kanjeevaram silk. Adorn the house with direct fresh mango leaf string doors.'
      }
    }
  };

  const KIDS_STORIES_DATA = [
    {
      id: 'story-ganesha',
      title: "Ganesha & the Fruit of True Wisdom",
      subtitle: "Hover is disabled. Click the audio play button to experience the Gurukul!",
      character: "👦 Bappa Ganesha",
      moral: "Respect for family, quick wisdom, and loving parents is equivalent to knowing the whole universe.",
      story: "Once, Sage Narada gifted Lord Shiva and Parvati a divine golden mango of absolute knowledge. Both Ganesha and his brother Kartikeya wanted it! Lord Shiva said: 'Whoever circles the entire universe and returns first shall win this fruit.' Kartikeya immediately flew off on his super-fast peacock. Little Ganesha smiled. Knowing his body was round and his vehicle was a tiny mouse, he didn't run. Instead, he walked slowly three times around Lord Shiva and Parvati, and bowed. He said: 'My parents are my universe!' Amazed by his spiritual wisdom, Shiva awarded him the mango. Kartikeya returned to find Ganesha happily enjoying the reward.",
      audioText: "Mantra: 'Vakratunda Mahakaya...' Audio simulation playing correct Sanskrit pitch."
    },
    {
      id: 'story-hanuman',
      title: "Hanuman Lifts the Golden Mountain",
      subtitle: "A story of courage and boundless love",
      character: "🐒 Maruti Hanuman",
      moral: "Even when faced with impossible tasks, focus, courage, and pure devotion will show you the path.",
      story: "During the great epic of Ramayana, Lakshmana was deeply wounded. The only cure was the special Sanjeevani herb from the giant Himalayas. Hanuman flew with the speed of wind. But when he reached the snow peaks, he got totally confused! Every plant looked glowing and identical. Realizing the sun would soon rise and Lakshmana needed help instantly, Hanuman used his incredible strength to grow as big as a fortress. He scooped up the entire mountain in his palm and flew back across India. This teaches us that love can overcome any barrier.",
      audioText: "Mantra: 'Manojavam Marutatulyavegam...' Audio simulation playing correct Sanskrit pitch."
    },
    {
      id: 'story-prahlad',
      title: "Prahlad: The Shield of Luminous Truth",
      subtitle: "Standing up for good with unwavering faith",
      character: "✨ Devotee Prahlad",
      moral: "Truth, kindness, and devotion will always build a shield that protects you from the strongest anger.",
      story: "Young prince Prahlad was a gentle child who loved Lord Vishnu. But his father, the king Hiranyakashipu, wanted everyone to worship *him* as a god instead. When Prahlad refused, the king tried to punish him. Yet, every single time, Prahlad felt no fear. He sat calmly and repeated Vishnu's name. A beautiful shield of warm light always formed around him, turning hot fires into cool flower beds. Eventually, Lord Vishnu appeared as Narasimha, proving that truth and love are always protected by the great cosmic order.",
      audioText: "Mantra: 'Narasimha Kavachaya...' Audio simulation playing correct Sanskrit pitch."
    }
  ];

  const quizQuestions = [
    {
      q: "Which cosmic weapon is famously associated with Lord Shiva?",
      options: ["Sudarshan Chakra", "Trishul (Trident)", "Gandiva Bow", "Vajra"],
      correct: 1
    },
    {
      q: "Why do Hindus light Diya lamps on Diwali celebration?",
      options: ["For visual decorations", "To welcome Lord Rama back to Ayodhya", "To scare birds away", "Just as a standard family rule"],
      correct: 1
    },
    {
      q: "Which Veda is globally celebrated as the oldest book of spiritual hymnal chords?",
      options: ["Rigveda", "Samaveda", "Yajurveda", "Atharvaveda"],
      correct: 0
    }
  ];

  // Fetch bookings & subs for logged in user
  useEffect(() => {
    if (user) {
      poojaDb.getUserBookings(user.uid).then(res => setBookings(res));
      poojaDb.getUserSubscriptions(user.uid).then(res => setSubscriptions(res));
    } else {
      setBookings([]);
      setSubscriptions([]);
    }
  }, [user]);

  // Countdown clock tick
  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingCountdown(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 5, m: 59, s: 59 }; // wrap back
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Authentication
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoadingAuth(true);
    try {
      if (authModal.mode === 'signup') {
        if (!emailInput || !passwordInput || !nameInput || !phoneInput) {
          throw new Error('Please enter all required spiritual sign-up credentials.');
        }
        const newUser = await poojaAuth.signUp(emailInput, passwordInput, nameInput, phoneInput);
        setUser(newUser);
      } else {
        if (!emailInput || !passwordInput) {
          throw new Error('Email and password must be specified securely.');
        }
        const loggedUser = await poojaAuth.signIn(emailInput, passwordInput);
        setUser(loggedUser);
      }
      setAuthModal({ open: false, mode: 'signin' });
      setEmailInput('');
      setPasswordInput('');
      setNameInput('');
      setPhoneInput('');
    } catch (err: any) {
      setAuthError(err.message || 'Verification session rejected. Please review fields.');
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSignOut = () => {
    poojaAuth.signOut().then(() => {
      setUser(null);
    });
  };

  // Handle Waitlist registration
  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistName || !waitlistEmail || !waitlistPhone) {
      alert("Please enter your name, email, and contact phone number.");
      return;
    }

    const waitlistId = 'wait_' + Math.random().toString(36).substr(2, 9);
    const newEntry = {
      id: waitlistId,
      name: waitlistName,
      email: waitlistEmail,
      phone: waitlistPhone,
      interest: waitlistInterest,
      notes: waitlistNotes,
      createdAt: new Date().toISOString()
    };

    const updatedWaitlist = [newEntry, ...waitlist];
    setWaitlist(updatedWaitlist);
    localStorage.setItem('poojaghar_waitlist', JSON.stringify(updatedWaitlist));

    // Simulated Notification sent to owner
    const simulatedAlert = {
      id: Date.now(),
      title: "🔔 SMS Waitlist Notification",
      message: `PoojaGhar Alert: Devotee "${waitlistName}" (${waitlistPhone}) has successfully joined the waitlist for ${
        waitlistInterest === 'gurukul' 
          ? 'Traditional Gurukul Learning' 
          : waitlistInterest === 'pooja' 
          ? 'Live Pooja Booking' 
          : 'Personal Consultation'
      }.`,
      phone: waitlistPhone,
      name: waitlistName,
      interest: waitlistInterest,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedAlerts = [simulatedAlert, ...waitlistNotifications];
    setWaitlistNotifications(updatedAlerts);
    localStorage.setItem('poojaghar_notifications', JSON.stringify(updatedAlerts));

    // Auto-login waitlisted user so they see their priority ticket instantly
    const waitlistUser = {
      uid: waitlistId,
      name: waitlistName,
      email: waitlistEmail,
      phone: waitlistPhone,
      role: 'user' as const,
      isWaitlisted: true,
      interest: waitlistInterest,
      createdAt: newEntry.createdAt
    };
    setUser(waitlistUser);
    localStorage.setItem('poojaghar_user', JSON.stringify(waitlistUser));

    // Close waitlist modal & reset inputs
    setWaitlistModal({ open: false });
    setWaitlistName('');
    setWaitlistEmail('');
    setWaitlistPhone('');
    setWaitlistNotes('');
  };

  // Trigger Booking wizard
  const initiateBooking = (service: PoojaService) => {
    setBookingService(service);
    setBookingStep('form');
    setPaymentStatus('none');
    setStripeCardNum('');
    setStripeExpiry('');
    setStripeCvc('');
    setStripeZip('');
    if (user) {
      setDevoteeName(user.name);
      setDevoteePhone(user.phone);
    } else {
      setDevoteeName('');
      setDevoteePhone('');
    }
  };

  // Submit Booking Form, proceed to Stripe payment
  const handleBookingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName || !devoteePhone || !bookingDate || !bookingTime) {
      alert("Please fill in the devotee details & slot parameters completely.");
      return;
    }
    setBookingStep('payment');
  };

  // Emulated payment execution
  const processSecurePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripeCardNum || !stripeExpiry || !stripeCvc) {
      alert("Please enter card details to continue PCI-compliant check.");
      return;
    }

    setPaymentLoading(true);
    // Simulate credit card gateway validation delays
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple validation test (simulating a fail block for expired cards or generic errors)
    if (stripeCardNum.replace(/\s/g, '').length < 16) {
      setPaymentStatus('failed');
      setPaymentLoading(false);
      return;
    }

    try {
      if (bookingService) {
        const pandit = PANDITS.find(p => p.id === bookingPandit) || PANDITS[0];
        const newB = await poojaDb.createBooking({
          name: devoteeName,
          phone: devoteePhone,
          email: user?.email || payerEmail || 'guest@poojaghar.com',
          serviceId: bookingService.id,
          panditId: bookingPandit,
          date: bookingDate,
          time: bookingTime
        }, bookingService, pandit);

        if (user) {
          setBookings(prev => [newB, ...prev]);
        }
      } else if (joiningSub) {
        const subPrice = billingCycle === 'monthly' ? joiningSub.priceMonthly : joiningSub.priceYearly;
        const newS = await poojaDb.createSubscription(
          user?.uid || 'guest_user',
          joiningSub.id,
          joiningSub.name,
          subPrice,
          billingCycle,
          devoteeName || user?.name || 'Child Classmate',
          8
        );
        if (user) {
          setSubscriptions(prev => [newS, ...prev]);
        }
      }
      setPaymentStatus('success');
    } catch (err) {
      setPaymentStatus('failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  // Subscription Pricing Tier specs
  const SUBSCRIPTION_PLANS = [
    {
      id: 'sub-shishya',
      name: '🌸 Bal Shishya',
      subName: 'Sacred Toddler Primer',
      priceMonthly: 199,
      priceYearly: 1990,
      ageGroup: '4 - 7 yrs',
      description: 'Laying beautiful foundations with interactive mythological animations, basic shlokas, and fun games.',
      learnItems: [
        '4 live story audio-classes per month',
        'Printable worksheet PDFs & color tasks',
        'Core Gayatri & Ganesh Sloka vocal pitch',
        'Basic moral values from Panchatantra'
      ],
      features: {
        storyClasses: '4 Classes / Mo',
        worksheets: 'Weekly PDF Packs',
        craftsQuiz: 'Simple Mini Quizzes',
        oneOnOne: 'No',
        certificate: 'Quarterly Electronic Badge'
      },
      themeColor: 'from-[#FFB6C1]/20 to-transparent',
      accentColor: '#FFB6C1'
    },
    {
      id: 'sub-dharma',
      name: '🌟 Dharma Seekh',
      subName: 'Core Cultural Explorer',
      priceMonthly: 399,
      priceYearly: 3990,
      ageGroup: '8 - 11 yrs',
      description: 'Deeper structural lookup of Hindu epics, calendar astronomy, festival architecture, and creative craft building.',
      learnItems: [
        '8 immersive video masterclasses / month',
        'DIY festival crafts kits (delivered digitally)',
        'Bhagavad Gita core shlokas (Chapter 12)',
        'Vedic mathematics foundational tricks'
      ],
      features: {
        storyClasses: '8 Classes / Mo',
        worksheets: 'Comprehensive PDF & Craft Worksheets',
        craftsQuiz: 'Weekly Gamified Dashboards',
        oneOnOne: 'Group Q&A Sessions',
        certificate: 'Full Course Completion Diploma'
      },
      isPopular: true,
      themeColor: 'from-[#FF6B00]/10 via-[#D4A017]/10 to-transparent',
      accentColor: '#FF6B00'
    },
    {
      id: 'sub-sanskriti',
      name: '🕉️ Sanskriti Pro',
      subName: 'Spiritual Guru Track',
      priceMonthly: 699,
      priceYearly: 6990,
      ageGroup: '12 - 14 yrs',
      description: 'Advanced cultural discourse, conversational Sanskrit basics, guided daily meditation mantras, and direct mentors.',
      learnItems: [
        'Unlimited access to all live sessions',
        '1-on-1 private audio clearing session',
        'Upanishad tales and character assessments',
        'Vedic science models and debate meets'
      ],
      features: {
        storyClasses: 'Unlimited VIP Pass',
        worksheets: 'Physical workbook kit shipped option',
        craftsQuiz: 'Premium Quiz Tournaments',
        oneOnOne: 'Monthly 1-on-1 Pandit Review',
        certificate: 'Traditional Gurukul Honor Certificate'
      },
      themeColor: 'from-[#8B0000]/15 to-transparent',
      accentColor: '#8B0000'
    }
  ];

  // Kids Quiz handle
  const handleQuizAnswerSelect = (qIdx: number, optIdx: number) => {
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizScore(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1e140f] flex flex-col font-sans select-none relative pb-10">
      {/* Decorative floating dots/sakura pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FF6B00_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Persistent Firebase status indicators for quick visual inspection */}
      <div className="bg-[#8B0000] text-[#FFF8F0] py-2 px-4 shadow-sm z-50 text-xs flex justify-between items-center border-b border-[#D4A017]/40 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#FF6B00] rounded-full animate-pulse border border-[#D4A017]"></span>
          <span>Spiritual Server: <strong className="font-semibold text-white">READY</strong> (Local Sync Active)</span>
        </div>
        <div className="hidden md:flex items-center gap-4 font-mono">
          <span>Current UTC Epoch: 2026-05-31</span>
          <span className="bg-[#FF6B00]/20 px-2 py-0.5 rounded border border-[#FF6B00]/30 glow-text-gold text-yellow-300">PCI Compliant Payment Check Enabled</span>
        </div>
      </div>

      {/* Sticky Editorial Header */}
      <header 
        id="editorial-header" 
        className={`sticky top-0 z-40 backdrop-blur-md border-b-2 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#FFF8F0]/95 shadow-md border-[#D4A017]/40 py-1' 
            : 'bg-[#FFF8F0]/85 border-[#D4A017]/20 py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand with Lotus Emblem Layout */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-13 h-13 bg-gradient-to-br from-[#8B0000] to-[#FF6B00] rounded-full p-1 shadow-md flex items-center justify-center border-2 border-[#D4A017] transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
              <svg viewBox="0 0 100 100" className="w-10 h-10 text-white fill-current">
                {/* Outer spiritual mandala ring */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="opacity-50" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" strokeDasharray="1 2" />
                
                {/* Sanskrit/Chakra rays */}
                <path d="M50 4 L50 12 M50 88 L50 96 M4 50 L12 50 M88 50 L96 50 M18 18 L25 25 M75 75 L82 82 M18 82 L25 75 M75 18 L82 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />

                {/* Lotus petals left & right representing peace & symmetry */}
                <path d="M50 80 Q15 65 30 40 Q40 55 50 80 Z" fill="currentColor" className="opacity-40" />
                <path d="M50 80 Q85 65 70 40 Q60 55 50 80 Z" fill="currentColor" className="opacity-40" />
                <path d="M50 80 Q25 75 35 55 Q45 65 50 80 Z" fill="currentColor" className="opacity-60" />
                <path d="M50 80 Q75 75 65 55 Q55 65 50 80 Z" fill="currentColor" className="opacity-60" />

                {/* Central Diya oil lamp base */}
                <path d="M22 64 C35 84 65 84 78 64 C68 68 32 68 22 64 Z" fill="currentColor" />
                
                {/* Sacred burning flame (Jyot) with rich contrast colors */}
                <path d="M50 20 C56 38 66 48 50 66 C34 48 44 38 50 20 Z" fill="currentColor" className="text-yellow-300" />
                <path d="M50 30 C53 42 58 48 50 58 C42 48 47 42 50 30 Z" fill="currentColor" className="text-amber-500" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-yatra text-2.5xl font-extrabold tracking-wider text-[#8B0000] leading-none drop-shadow-sm">PoojaGhar</span>
              <span className="font-sanskrit text-[10px] text-[#FF6B00] uppercase tracking-widest font-black mt-1">देवो रक्षति रक्षितः</span>
            </div>
          </a>

          {/* Desktop Navigation Link Cluster with proper font styling and links */}
          <nav className="hidden md:flex items-center space-x-8 font-sans text-xs uppercase tracking-widest font-semibold text-[#3D2B1F]/85 ml-14 lg:ml-20 xl:ml-28">
            <a href="#hero" className="hover:text-[#FF6B00] transition-colors relative group py-1">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
            <a href="#services" className="hover:text-[#FF6B00] transition-colors relative group py-1">
              <span>Book Pooja</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
            <a href="#kids-gurukul" className="hover:text-[#FF6B00] transition-colors relative group py-1">
              <span>Gurukul</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
            <a href="#pandits" className="hover:text-[#FF6B00] transition-colors relative group py-1">
              <span>Panditjis</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
            <a href="#faqs" className="hover:text-[#FF6B00] transition-colors relative group py-1">
              <span>FAQ</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Right actions: Signup/My Account portal trigger */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <a href="#profile-portal" className="flex items-center gap-2.5 py-2 px-4 bg-[#8B0000]/10 hover:bg-[#8B0000]/20 rounded-full border border-[#D4A017]/40 text-[#8B0000] font-sans font-semibold text-xs uppercase tracking-wider transition-all">
                  <User className="w-3.5 h-3.5" />
                  <span>My Ticket ({user.name.split(' ')[0]})</span>
                </a>
                <button onClick={handleSignOut} title="Sign Out Securely" className="p-2 text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setWaitlistModal({ open: true })} className="px-6 py-2.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-full text-xs font-semibold uppercase tracking-widest border border-[#D4A017] shadow hover:shadow-md transition-all font-sans">
                Join Waitlist
              </button>
            )}
          </div>

          {/* Mobile responsive toggle */}
          <button onClick={() => setMobileMenuOpen(prev => !prev)} className="md:hidden p-2 text-[#8B0000]" aria-label="Toggle Menu">
            <Menu className="w-6 h-6" />
          </button>

        </div>

        {/* Mobile slide-down navigation bar */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-[#D4A017]/20 bg-[#FFF8F0] px-4 py-4 shadow-lg flex flex-col gap-3 font-sans font-semibold uppercase tracking-widest text-xs">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 hover:bg-[#8B0000]/10 rounded transition-all">Home</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 hover:bg-[#8B0000]/10 rounded transition-all">Book Pooja</a>
            <a href="#kids-gurukul" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 hover:bg-[#8B0000]/10 rounded transition-all">Gurukul</a>
            <a href="#pandits" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 hover:bg-[#8B0000]/10 rounded transition-all">Panditjis</a>
            <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 hover:bg-[#8B0000]/10 rounded transition-all">FAQ</a>
            <div className="h-[1px] bg-[#D4A017]/20 my-2"></div>
            {user ? (
              <div className="flex flex-col gap-2">
                <a href="#profile-portal" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2.5 px-3 bg-[#8B0000]/10 text-[#8B0000] rounded transition-all">
                  <User className="w-4 h-4" />
                  <span>My Ticket ({user.name})</span>
                </a>
                <button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="flex items-center gap-2 py-2.5 px-3 text-red-700 bg-red-50 rounded text-left transition-all">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={() => { setWaitlistModal({ open: true }); setMobileMenuOpen(false); }} className="w-full py-3 bg-[#8B0000] text-white text-center rounded text-xs font-semibold uppercase tracking-widest">
                Join Waitlist
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-4 border-[#D4A017] bg-[#FFF8F0] py-20 px-4">
        
        {/* Animated Flower Petal and Star Dust Canvas Fall layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-5 h-5 bg-[#FFB6C1]/40 rounded-full animate-petal-float"
              style={{
                left: `${10 + i * 11}%`,
                animationDelay: `${i * 1.5}s`,
                top: `${10 + (i % 3) * 20}%`
              }}
            ></div>
          ))}
        </div>

        {/* Mandala Watermark Background */}
        <div className="absolute opacity-[0.06] -right-40 -top-40 pointer-events-none rotate-45 select-none z-0">
          <svg width="600" height="600" viewBox="0 0 100 100" className="animate-spin-slow">
            <path d="M50 0 L55 20 L70 10 L65 30 L85 25 L75 45 L95 45 L80 55 L95 65 L75 65 L85 85 L65 75 L70 95 L55 80 L50 100 L45 80 L30 95 L35 75 L15 85 L25 65 L5 65 L20 55 L5 45 L25 45 L15 25 L35 30 L30 10 L45 20 Z" fill="#8B0000" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#8B0000" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-4 py-1.5 bg-[#FF6B00]/10 rounded-full border border-dashed border-[#FF6B00] text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Vedic Devotion For Global Households</span>
            </div>

            <h2 className="font-sanskrit text-2xl md:text-3.5xl text-[#FF6B00] font-medium tracking-wide leading-tight italic">
              "घर में पूजा, दिल में आस्था"
            </h2>

            <h1 className="font-yatra text-4xl sm:text-5.5xl lg:text-7xl font-bold uppercase tracking-tight text-[#8B0000] leading-[1.05] drop-shadow-sm">
              Sacred Rituals, <br />
              <span className="text-[#D4A017] font-semibold">Digital Sanctuary.</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-[#3D2B1F]/90 leading-relaxed max-w-2xl bg-[#FFF8F0]/30 backdrop-blur-small rounded-lg py-2">
              Experience authentic, personalized Live Video Poojas conducted by certified Shastri Pandits from Varanasi, Haridwar & Kanchipuram. Empower your kids with gorgeous epic traditions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-full text-sm font-bold uppercase tracking-widest text-center shadow-lg hover:shadow-xl border-b-4 border-[#3D2B1F]/30 hover:border-[#8B0000]/40 transition-all flex items-center justify-center gap-2 group">
                <span>Book a Live Pooja</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#kids-gurukul" className="w-full sm:w-auto px-8 py-4 bg-white text-[#8B0000] hover:bg-[#FFF8F0] rounded-full text-sm font-bold uppercase tracking-widest text-center shadow border border-[#D4A017] transition-all flex items-center justify-center gap-2">
                <span>Explore Kids Plan</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#D4A017]/30 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-3xl font-extrabold text-[#8B0000] tracking-tight">500+</div>
                <div className="text-xs uppercase tracking-wider text-[#3D2B1F]/70 font-semibold">Verified Pandits</div>
              </div>
              <div className="border-x border-[#D4A017]/20 px-4">
                <div className="text-3xl font-extrabold text-[#FF6B00] tracking-tight">10k+</div>
                <div className="text-xs uppercase tracking-wider text-[#3D2B1F]/70 font-semibold">Families Served</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#D4A017] tracking-tight">50+</div>
                <div className="text-xs uppercase tracking-wider text-[#3D2B1F]/70 font-semibold">Vedic Rituals</div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Visual Diya Sculpture with CSS Custom Fire Flame */}
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-[#8B0000]/10 to-[#FF6B00]/10 rounded-full p-4 border border-[#D4A017]/40 flex flex-col justify-center items-center shadow-inner">
              
              {/* Outer decorative gold orbit ring */}
              <div className="absolute inset-2 border border-[#D4A017]/20 rounded-full animate-spin-slow"></div>

              {/* Glowing decorative mandala core background map */}
              <div className="w-56 h-56 bg-white/75 backdrop-blur-md rounded-full border border-[#D4A017]/30 shadow-xl flex flex-col items-center justify-center relative p-2">
                
                {/* Embedded dynamic real-time live alert badging */}
                <div className="absolute top-4 bg-red-650 animate-pulse text-white font-bold text-[10px] tracking-widest uppercase py-1 px-3.5 rounded-full flex items-center gap-1.5 shadow border border-[#8B0000]">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span>LIVE aarti in</span>
                </div>

                {/* Ticking Clock alert */}
                <div className="text-center mt-6">
                  <div className="font-mono text-3.5xl font-black text-[#8B0000] tracking-wider leading-none">
                    {String(upcomingCountdown.h).padStart(2, '0')}:{String(upcomingCountdown.m).padStart(2, '0')}:{String(upcomingCountdown.s).padStart(2, '0')}
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B00] mt-1.5">Daily Sandhya Aarti</p>
                </div>

                <div className="h-[1px] w-24 bg-[#D4A017]/40 my-3"></div>

                <p className="text-xs font-semibold text-[#1e140f] text-center italic max-w-sm px-4">
                  "Sudarshana chant of safety, ongoing direct from temple altar."
                </p>

                <div className="mt-2.5">
                  <button onClick={() => alert("Joining temple feed... Direct live audio stotra activated.")} className="px-5 py-1.5 bg-[#FF6B00]/10 hover:bg-[#FF6B00] hover:text-white border border-[#FF6B00] text-[#FF6B00] rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Aarti Room</span>
                  </button>
                </div>

              </div>

              {/* Visual Diya burner sculpture positioned below the circle */}
              <div className="absolute -bottom-6 w-40 h-16 bg-gradient-to-t from-[#3D2B1F] via-[#8B0000] to-[#E97451] rounded-b-full rounded-t-lg shadow-lg flex justify-center border-b border-[#D4A017]/70">
                {/* Diya Flame Assembly */}
                <div className="absolute -top-12 w-8 h-12 bg-gradient-to-t from-[#8B0000] via-[#FF6B00] to-yellow-300 rounded-full animate-diya-flicker"></div>
                <div className="absolute -top-6 w-4 h-6 bg-yellow-100 rounded-full animate-ping opacity-25"></div>
              </div>

            </div>

            <div className="text-center mt-12">
              <span className="text-xs font-bold text-[#8B0000] uppercase tracking-widest">Divine Sanctuary Standard Pro</span>
              <p className="text-[11px] text-[#3D2B1F]/60 mt-1 max-w-xs">Strictly compliant Vedic practices. Audio calibrated using authentic shastra pitches.</p>
            </div>

          </div>

        </div>

      </section>

      {/* 2. The Growing Disconnect Section (PPT Page 2) */}
      <section className="bg-gradient-to-b from-white to-[#FFFBF7] py-24 px-4 border-b border-[#D4A017]/15">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest bg-orange-500/10 px-3.5 py-1 rounded-full border border-orange-500/20">The Cultural Disconnect</span>
            <h2 className="font-yatra text-4xl sm:text-5xl text-[#8B0000] leading-tight mt-3">Why Our Sacred Traditions are Fading</h2>
            <p className="text-sm font-sans text-gray-700 mt-2 max-w-xl mx-auto">
              Modern global lifestyles, distances, and lack of verified guidance have created severe gaps in preserving our spiritual roots.
            </p>
            <div className="w-16 h-1 bg-[#D4A017] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="p-6 bg-white rounded-2xl border border-[#D4A017]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B00]/5 rounded-bl-full pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] font-black text-xs border border-[#FF6B00]/25 mb-4 group-hover:scale-110 transition-transform">1</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Cultural Erosion</h4>
              <p className="text-xs text-[#3D2B1F]/85 leading-relaxed">Young Indians face increasing separation from daily shlokas and rich rituals due to busy urban careers.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D4A017]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A017]/5 rounded-bl-full pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017] font-black text-xs border border-[#D4A017]/25 mb-4 group-hover:scale-110 transition-transform">2</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Knowledge Gap</h4>
              <p className="text-xs text-[#3D2B1F]/85 leading-relaxed">Families struggle remembering correct steps, proper pronunciations, and puja rules, causing hesitation.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D4A017]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B0000]/5 rounded-bl-full pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] font-black text-xs border border-[#8B0000]/25 mb-4 group-hover:scale-110 transition-transform">3</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Regional Complexity</h4>
              <p className="text-xs text-[#3D2B1F]/85 leading-relaxed">Pooja rules vary immensely by region (Tamil, Bengali, Gujarati). Aligning with specific roots is hard.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D4A017]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-[#FF6B00] font-black text-xs border border-orange-500/25 mb-4 group-hover:scale-110 transition-transform">4</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Priest Shortages</h4>
              <p className="text-xs text-[#3D2B1F]/85 leading-relaxed">Finding verified, highly knowledgeable Panditjis during auspicious festival dates is nearly impossible in cities.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#D4A017]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A017]/5 rounded-bl-full pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017] font-black text-xs border border-[#D4A017]/25 mb-4 group-hover:scale-110 transition-transform">5</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">NRI Struggles</h4>
              <p className="text-xs text-[#3D2B1F]/85 leading-relaxed">Devotees living abroad struggle with language blocks, missing samagri, and extreme cultural isolation.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Seamless Experience: How It Works Process (PPT Page 7) */}
      <section className="bg-white border-b border-[#D4A017]/20 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h3 className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest mb-1.5">Authenticity Meets Convenience</h3>
            <h2 className="font-yatra text-4xl text-[#8B0000]">The Seamless Spiritual Journey</h2>
            <p className="text-sm font-sans mt-2 text-[#3D2B1F]/80">Designed specifically to bridge the offline and online worlds with pure shastra parameters.</p>
            <div className="w-24 h-1 bg-[#D4A017] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {/* Visual connector lines for desktop */}
            <div className="hidden lg:block absolute top-1/3 left-12 right-12 h-0.5 bg-gradient-to-r from-[#FF6B00]/40 via-[#D4A017]/40 to-[#8B0000]/40 -z-0"></div>

            <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#D4A017]/10 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-sm shadow-md mb-4 border border-white">01</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Select Your Ritual</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Choose your desired festival or ritual from our extensive divine catalog.</p>
            </div>

            <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#D4A017]/10 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A017] text-white flex items-center justify-center font-bold text-sm shadow-md mb-4 border border-white">02</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Personalize Details</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Specify your exact region, language, and preferred date of ceremony.</p>
            </div>

            <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#D4A017]/10 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#8B0000] text-white flex items-center justify-center font-bold text-sm shadow-md mb-4 border border-white">03</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Choose Guidance</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Opt for automated AI-only guidance or book a live video call with a certified priest.</p>
            </div>

            <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#D4A017]/10 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-sm shadow-md mb-4 border border-white">04</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Instant Prep</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Receive instant custom access to active steps, samagri lists, and mantra audio tracks.</p>
            </div>

            <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#D4A017]/10 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#8B0000] text-white flex items-center justify-center font-bold text-sm shadow-md mb-4 border border-white">05</div>
              <h4 className="font-bold text-base text-[#8B0000] mb-2">Live Session</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Sit with family, perform real chants, boil milk, and listen with interactive on-screen mantras.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Interactive Regional Variation Hub & Samagri Generator (Pitch PPT Page 4) */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#FFF8F0] via-[#FCF5ED] to-[#FFFBF7] border-b border-[#D4A017]/25 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest block mb-1">Interactive Sandbox Altar</span>
            <h2 className="font-yatra text-4xl sm:text-5.5xl text-[#8B0000] leading-none">AI Ritual & Samagri Customizer</h2>
            <p className="text-base text-gray-700 mt-3 font-sans max-w-xl mx-auto">
              Configure any ritual according to your family's specific regional, linguistic, and cultural parameters to preview your personalized holy catalog instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Horizontal Control Bar / Setup Form */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#D4A017]/30 shadow-md space-y-5">
              <h3 className="font-bold text-lg text-[#8B0000] border-b border-orange-500/10 pb-2.5 flex items-center gap-1.5">
                <span>🏮</span> 
                <span>Configure Altar Parameters</span>
              </h3>

              {/* Step 1: Select Ritual */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-500 block">1. Select Desired Ceremony</label>
                <select 
                  value={personalizerRitual} 
                  onChange={(e) => {
                    setPersonalizerRitual(e.target.value);
                    // Reset steps
                    setPersonalizerStepIdx(0);
                    setPersonalizerCheckedSamagri({});
                    // Default safe region is North Indian unless specified
                    if (e.target.value === 'griha-pravesh' && !['North Indian Vedic', 'Tamil Smartha'].includes(personalizerRegion)) {
                      setPersonalizerRegion('North Indian Vedic');
                    }
                  }}
                  className="w-full p-2.5 bg-[#FFF8F0] border border-[#D4A017]/35 rounded-xl font-medium text-xs text-gray-850"
                >
                  <option value="satya-katha">Satyanarayan Katha (सत्यनारायण पूजा)</option>
                  <option value="griha-pravesh">Griha Pravesh & Vastu Pooja (गृह प्रवेश)</option>
                </select>
              </div>

              {/* Step 2: Select Region-based Variation */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-500 block">2. Select Regional Tradition</label>
                <select 
                  value={personalizerRegion} 
                  onChange={(e) => {
                    setPersonalizerRegion(e.target.value);
                    setPersonalizerStepIdx(0);
                    setPersonalizerCheckedSamagri({});
                  }}
                  className="w-full p-2.5 bg-[#FFF8F0] border border-[#D4A017]/35 rounded-xl font-medium text-xs text-gray-850"
                >
                  <option value="North Indian Vedic">North Indian Vedic Sampradaya</option>
                  <option value="Tamil Smartha">Tamil Smartha / Southern Vedic</option>
                  {personalizerRitual === 'satya-katha' && <option value="Bengali">Bengali Purohit Shastro Variant</option>}
                  {personalizerRitual === 'satya-katha' && <option value="Gujarati">Gujarati Samay Puram</option>}
                  {personalizerRitual === 'satya-katha' && <option value="Marathi">Marathi Pothi Tradition</option>}
                </select>
              </div>

              {/* Step 3: Select Guidance Mode */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-500 block">3. Select Language Preferred</label>
                <select 
                  value={personalizerLanguage} 
                  onChange={(e) => setPersonalizerLanguage(e.target.value)}
                  className="w-full p-2.5 bg-[#FFF8F0] border border-[#D4A017]/35 rounded-xl font-medium text-xs text-gray-850"
                >
                  <option value="Hindi">Sanskrit with Hindi explanations</option>
                  <option value="Sanskrit">Pure Shastra Chanting Only</option>
                  <option value="English">English translations for Gen-Z & NRI</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ व्याख्या)</option>
                  <option value="Tamil">Tamil (தமிழ் விளக்கம்)</option>
                  <option value="Marathi">Marathi (मराठी निरूपण)</option>
                </select>
              </div>

              {/* Step 4: Choose Mode */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-500 block">4. Guidance Mode Choice</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setPersonalizerMode('ai')} 
                    className={`py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all text-center ${personalizerMode === 'ai' ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow' : 'bg-[#FFF8F0] border-[#D4A017]/25 text-gray-600'}`}
                  >
                    🚀 AI Ritual Assistant
                  </button>
                  <button 
                    onClick={() => setPersonalizerMode('pandit')} 
                    className={`py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all text-center ${personalizerMode === 'pandit' ? 'bg-[#8B0000] text-white border-[#8B0000] shadow' : 'bg-[#FFF8F0] border-[#D4A017]/25 text-gray-600'}`}
                  >
                    📹 Live Video Pandit
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  setPersonalizerStepIdx(0);
                  setPersonalizerGenerated(true);
                  setPersonalizerSyncSuccess(false);
                }} 
                className="w-full py-4.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-2xl text-xs font-bold uppercase tracking-widest border border-[#D4A017] transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span>Personalize Altar Layout</span>
              </button>

              <div className="text-[10px] text-gray-400 text-center uppercase tracking-wider">
                🛡️ Verified by Kashi Vedic Research Institute
              </div>
            </div>

            {/* Detailed Interactive Ritual Playground Display */}
            <div className="lg:col-span-8">
              {personalizerGenerated ? (
                (() => {
                  const activeConfig = REGIONAL_RITUALS_DATA[personalizerRitual]?.[personalizerRegion] || REGIONAL_RITUALS_DATA['satya-katha']['North Indian Vedic'];
                  const activeStepObj = activeConfig.steps[personalizerStepIdx] || activeConfig.steps[0];
                  const totalSteps = activeConfig.steps.length;

                  // percentage checklist gathered
                  const checkedCount = Object.values(personalizerCheckedSamagri).filter(Boolean).length;
                  const totalItemsCount = activeConfig.specialSamagri.length;
                  const itemProgressPercent = Math.round((checkedCount / totalItemsCount) * 100);

                  return (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* Configuration Active Toast Bar */}
                      <div className="bg-gradient-to-r from-[#8B0000] to-[#E97451] p-4 rounded-2.5xl text-white shadow border border-[#D4A017]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-black text-yellow-300 block">Personal Altar Blueprint</span>
                          <span className="font-bold text-sm block">
                            {personalizerRitual === 'satya-katha' ? 'Satyanarayan Katha' : 'Griha Pravesh'} • {personalizerRegion} • {personalizerLanguage}
                          </span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg py-1 px-3 text-[10px] uppercase font-bold tracking-widest border border-white/20">
                          {personalizerMode === 'ai' ? '📱 AI-Assisted (WhatsApp Sync ready)' : '🎥 Live Booking Option Ready'}
                        </div>
                      </div>

                      {/* Main Playground Content Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        
                        {/* 4a. Personalized Samagri Intelligent List */}
                        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-[#D4A017]/25 shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center border-b border-orange-500/15 pb-2">
                              <h4 className="font-bold text-xs uppercase text-[#8B0000] tracking-wide flex items-center gap-1.5">
                                <span>🌿</span> Intelligently Sourced Samagri List
                              </h4>
                              <span className="text-[10px] font-bold text-[#FF6B00] bg-orange-100 px-2 py-0.5 rounded-full">
                                {checkedCount}/{totalItemsCount}
                              </span>
                            </div>

                            <p className="text-[11px] text-gray-500 italic mt-2">
                              Verify your family altar setup. Double-click items to assemble:
                            </p>

                            <div className="space-y-2 mt-4">
                              {activeConfig.specialSamagri.map((item, idx) => {
                                const isChecked = !!personalizerCheckedSamagri[item];
                                return (
                                  <button 
                                    key={idx}
                                    onClick={() => setPersonalizerCheckedSamagri(prev => ({ ...prev, [item]: !isChecked }))}
                                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-all border ${isChecked ? 'bg-green-500/[0.04] border-green-500/30 text-green-780' : 'bg-transparent border-gray-100 text-stone-700 hover:bg-stone-50'}`}
                                  >
                                    <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center text-[10px] shrink-0 ${isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}>✓</div>
                                    <span className={isChecked ? 'line-through opacity-70' : ''}>{item}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-100 mt-6 space-y-2">
                            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest">Altar Setup Preparation</span>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all duration-300" style={{ width: `${itemProgressPercent}%` }}></div>
                            </div>
                            <span className="text-[9px] text-gray-400 block text-right font-semibold">{itemProgressPercent}% Complete</span>
                          </div>
                        </div>

                        {/* 4b. Step-by-Step Interactive Guide Engine with audio simulation */}
                        <div className="md:col-span-7 bg-[#FFFBF7] p-6 rounded-3xl border border-[#D4A017]/25 shadow-sm flex flex-col justify-between">
                          
                          <div>
                            <div className="flex justify-between items-center border-b border-orange-500/10 pb-3">
                              <span className="text-[10px] uppercase tracking-widest font-black text-[#FF6B00]">Step {personalizerStepIdx + 1} of {totalSteps}</span>
                              <div className="flex gap-1">
                                <button 
                                  disabled={personalizerStepIdx === 0} 
                                  onClick={() => setPersonalizerStepIdx(prev => prev - 1)}
                                  className="w-7 h-7 rounded-lg bg-white border border-[#D4A017]/25 flex items-center justify-center text-xs font-bold disabled:opacity-40 transition-opacity"
                                >
                                  ←
                                </button>
                                <button 
                                  disabled={personalizerStepIdx === totalSteps - 1} 
                                  onClick={() => setPersonalizerStepIdx(prev => prev + 1)}
                                  className="w-7 h-7 rounded-lg bg-white border border-[#D4A017]/20 flex items-center justify-center text-xs font-bold disabled:opacity-40 transition-opacity"
                                >
                                  →
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 space-y-4">
                              <span className="inline-block bg-[#8B0000]/10 border border-[#8B0000]/10 text-[#8B0000] font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                                Active Action: {activeStepObj.name}
                              </span>
                              
                              <p className="text-sm font-medium text-stone-800 leading-relaxed">
                                {activeStepObj.description}
                              </p>

                              {/* Mantra box display */}
                              <div className="bg-amber-100/30 p-4 border border-[#D4A017]/15 rounded-2xl space-y-2 text-center">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block">- Recite Aloud Sanskrit Code -</span>
                                <p className="font-serif text-lg text-[#8B0000] font-bold tracking-wide">{activeStepObj.mantra}</p>
                                <p className="text-[10px] italic text-stone-500 font-serif border-t border-dashed border-[#D4A017]/10 pt-2 leading-relaxed">
                                  <strong>Meaning:</strong> {activeStepObj.meaning}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* 4c. Pronunciation Playback Simulation */}
                          <div className="mt-6 pt-4 border-t border-gray-100 bg-white/70 p-4 rounded-2xl border border-[#D4A017]/10 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] uppercase tracking-widest text-[#FF6B00] font-black flex items-center gap-1">
                                <Volume2 className="w-3.5 h-3.5" /> Vocal Pronunciation Guide
                              </span>
                              <span className="text-[9px] text-gray-400 font-bold uppercase">Sanskrit Swara Calibrated</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setPersonalizerAartiPlaying(!personalizerAartiPlaying)} 
                                className={`w-10 h-10 rounded-full flex items-center justify-center shadow transition-all ${personalizerAartiPlaying ? 'bg-red-600 text-white animate-pulse' : 'bg-[#FF6B00] text-white hover:bg-[#8B0000]'}`}
                              >
                                {personalizerAartiPlaying ? <X className="w-4 h-4 fill-white" /> : <Play className="w-4.5 h-4.5 fill-white ml-0.5" />}
                              </button>

                              <div className="flex-grow space-y-1">
                                <div className="text-xs font-bold text-stone-850">
                                  {personalizerAartiPlaying ? 'Playing Live Vedic Chanting Stotra...' : 'Learn exact sanskrit syllables & breathing patterns'}
                                </div>
                                <div className="flex items-center gap-1 h-3.5">
                                  {personalizerAartiPlaying ? (
                                    <>
                                      <span className="text-[9px] font-mono text-stone-500">0:14 / 1:20</span>
                                      <div className="flex gap-0.5 items-end h-full mt-1 ml-1">
                                        <div className="w-0.5 h-1.5 bg-[#FF6B00] animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-0.5 h-3.5 bg-[#FF6B00] animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                        <div className="w-0.5 h-2.5 bg-[#FF6B00] animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                                        <div className="w-0.5 h-0.5 bg-[#FF6B00] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-0.5 h-3 bg-[#FF6B00] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                      </div>
                                    </>
                                  ) : (
                                    <span className="text-[9px] font-mono text-gray-400">Accurately guides pronunciation using acoustic formulas</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Prasadam & Final details note */}
                      <div className="bg-amber-100/10 border border-[#D4A017]/30 p-5 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                        <div>
                          <span className="text-[10px] text-[#8B0000] uppercase font-bold tracking-widest block mb-1">🍛 Shastra Prasadam Recipe</span>
                          <span className="text-stone-700 leading-relaxed block">{activeConfig.prasadam}</span>
                        </div>
                        <div className="border-t md:border-t-0 md:border-x border-[#D4A017]/20 pt-3 md:pt-0 md:px-4">
                          <span className="text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest block mb-1">🕯️ Vedic Atmosphere Tip</span>
                          <span className="text-stone-700 leading-relaxed block">{activeConfig.atmosphereTip}</span>
                        </div>
                        <div className="pt-3 md:pt-0">
                          <span className="text-[10px] text-[#8B0000] uppercase font-bold tracking-widest block mb-1">📱 Sync To WhatsApp & Mobile</span>
                          
                          {personalizerSyncSuccess ? (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-780 p-2 rounded-xl text-[10px] font-bold">
                              ✓ Successfully Synced! The PDF, steps, and reminders guide are live on +91 98******10.
                            </div>
                          ) : (
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                setPersonalizerSyncSuccess(true);
                              }}
                              className="flex gap-2"
                            >
                              <input 
                                required 
                                type="tel" 
                                placeholder="Enter WhatsApp No." 
                                className="p-1 px-2 text-[10px] bg-white border border-[#D4A017]/35 rounded-lg flex-grow font-semibold"
                              />
                              <button type="submit" className="px-3 bg-[#FF6B00] hover:bg-[#8B0000] text-white font-bold rounded-lg uppercase tracking-wider text-[9px]">
                                Sync Guide
                              </button>
                            </form>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })()
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-[#D4A017]/30 shadow-md text-center space-y-4 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] text-2xl animate-pulse">🏮</div>
                  <h3 className="font-yatra text-2xl text-[#8B0000]">Personalized Vedic Workspace</h3>
                  <p className="text-sm text-[#3D2B1F]/80 max-w-sm mx-auto">
                    Configure your desired ritual on the left sidebar to generate a complete visual map of appropriate samagri, customized local pronunciations, and shastra guides.
                  </p>
                  <button 
                    onClick={() => setPersonalizerGenerated(true)} 
                    className="mt-2 text-xs font-bold uppercase tracking-widest bg-[#FF6B00] text-white py-2.5 px-6 rounded-xl hover:bg-[#8B0000] transition-colors"
                  >
                    Quick Load Sample (Satyanarayan Katha)
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* 1. Live Pooja Services Grid */}
      <section id="services" className="py-24 px-4 bg-[#FFF8F0] border-b border-[#D4A017]/10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest block mb-1">Live Pooja & Vedic Ceremonies</span>
              <h2 className="font-yatra text-3xl sm:text-4.5xl text-[#8B0000] leading-none">Schedule a Devout Ritual</h2>
              <p className="text-sm block text-[#3D2B1F]/70 mt-2 font-sans">Every booking includes complete Vedic guidance, a custom home samagri kit, the physical prasad distribution, and access certificates.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <div className="text-xs font-bold text-[#8B0000] bg-white/70 py-1.5 px-3 rounded-md shadow border border-[#D4A017]/30">
                ⭐ Rated 4.9/5 by 2,500+ Devotees
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POOJA_SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-md border border-[#D4A017]/20 flex flex-col justify-between hover:shadow-[0_0_22px_rgba(255,107,0,0.18)] hover:-translate-y-2 hover:border-[#FF6B00]/55 transition-all duration-300 group relative overflow-hidden">
                
                {service.image && (
                  <div className="w-full h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    
                    {service.popular && (
                      <div className="absolute top-4 right-4 bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-yellow-500 shadow-lg">
                        Bestseller
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Samagri Quick Preview Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-48 bg-[#FFFDFB] border-t-2 border-[#D4A017]/30 p-5 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 shadow-xl font-sans">
                  <div>
                    <div className="flex items-center gap-1.5 border-b border-[#D4A017]/20 pb-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                      <span className="font-bold text-[11px] text-[#8B0000] uppercase tracking-wider">Consciously Sourced Samagri ({service.included.samagri.length})</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {service.included.samagri.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                          <span className="leading-tight font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-dashed border-[#D4A017]/20">
                      <span className="font-bold text-[#8B0000] text-[10px] uppercase tracking-wider block mb-1">🍛 Consecrated Prasad Pack:</span>
                      <p className="text-xs text-stone-500 italic leading-relaxed">"{service.included.prasad}"</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-150 flex items-center justify-between text-[10px] font-bold text-gray-500">
                    <span className="flex items-center gap-1 text-green-700">
                      📜 {service.included.certificate ? "Digital Certificate Included" : "Traditional Direct Guidance"}
                    </span>
                    <span className="text-[#FF6B00] uppercase tracking-widest text-[9px] animate-pulse">Slide Out to Book →</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="text-[#FF6B00] font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-[#FF6B00]" />
                      <span>{service.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1e140f] group-hover:text-[#8B0000] transition-colors">{service.name}</h3>
                    <p className="text-[#FF6B00] font-bold text-sm tracking-wide mt-0.5">{service.hindiName}</p>
                    
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mt-3 border-y border-gray-100 py-2">
                      <span className="flex items-center gap-1 text-[#D4A017]"><Clock className="w-3.5 h-3.5" /> {service.duration}</span>
                      <span className="flex items-center gap-1">⭐ {service.rating} / 5</span>
                    </div>

                    <p className="text-sm text-[#3D2B1F]/80 mt-4 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-5 space-y-2 bg-[#FFF8F0] p-4 rounded-xl border border-dashed border-[#D4A017]/30 text-xs">
                      <div className="font-bold text-[#8B0000] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Home Samagri Included</span>
                      </div>
                      <ul className="grid grid-cols-2 gap-1 text-[10px] text-gray-600">
                        {service.included.samagri.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#FF6B00] shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-gray-200 text-[10px]">
                        <span className="font-semibold block text-gray-700">🍛 Prasad Pack:</span>
                        <span className="text-gray-500">{service.included.prasad}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Vedic Dakshina</span>
                      <span className="text-[#8B0000] text-2.5xl font-black italic">₹{service.price.toLocaleString('en-IN')}<span className="text-xs uppercase font-normal tracking-wide text-gray-500 ml-1">Cashless</span></span>
                    </div>
                    <button onClick={() => initiateBooking(service)} className="px-5 py-2.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-xl text-xs font-bold uppercase tracking-widest shadow border border-[#D4A017] transition-all">
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Featured Pandit Carousel & Interactive Profiles Workspace */}
      <section id="pandits" className="py-24 px-4 bg-gradient-to-b from-[#FFFDFB] via-white to-[#FFFBF7] border-b border-[#D4A017]/15">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest bg-[#FF6B00]/10 px-4 py-1.5 rounded-full border border-[#FF6B00]/25 inline-block">Aura of Spiritual Wisdom</span>
            <h2 className="font-yatra text-4xl sm:text-5xl text-[#8B0000] mt-4 leading-tight">Our Verified Shastri Panditjis</h2>
            <p className="text-sm font-sans text-gray-500 max-w-xl mx-auto mt-3 leading-relaxed">
              All Shastri Panditjis hold authentic Acharya degrees directly from sacred institutions (Varanasi, Haridwar & South Temples) and pass rigorous background tests.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8B0000] to-[#FF6B00] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Panoramic Selector Slider */}
          <div className="mb-12">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 text-center">👇 Tap a Shastri to select their Profile, Availability Calendar, and User Reviews</p>
            <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x">
              {PANDITS.map((p) => {
                const isSelected = selectedPanditId === p.id;
                return (
                  <div 
                    key={p.id} 
                    onClick={() => {
                      setSelectedPanditId(p.id);
                      setVideoPlaying(false);
                      setVideoProgress(0);
                    }}
                    className={`min-w-[280px] md:min-w-[340px] flex-none snap-start bg-[#FFF8F0]/40 rounded-2.5xl p-6 border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between hover:shadow-lg ${
                      isSelected 
                        ? 'border-[#FF6B00] bg-[#FFFBF7] shadow-md -translate-y-1 scale-[1.01]' 
                        : 'border-[#D4A017]/25 hover:border-[#D4A017]/60'
                    }`}
                  >
                    {/* Active Selected Stamp */}
                    {isSelected && (
                      <span className="absolute top-4 right-4 bg-[#FF6B00] text-[#FFF8F0] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-yellow-300 shadow">
                        Active Selected
                      </span>
                    )}

                    <div>
                      {/* Styled Avatar Placeholder representation */}
                      <div className="flex items-center gap-4 mb-4 font-sans">
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 shadow-md relative shrink-0 bg-stone-100 ${isSelected ? 'border-[#FF6B00]' : 'border-[#D4A017]'}`}>
                          {p.image ? (
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-[#FF6B00] to-[#8B0000] text-white flex items-center justify-center font-bold text-xl">
                              {p.name.split(' ').map(n=>n?.[0]).join('')}
                            </div>
                          )}
                          <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#FF6B00] rounded-full border border-white text-[10px] flex items-center justify-center text-white z-10" title="Verified Acharya">✓</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-[#1e140f] leading-none">{p.name}</h4>
                          <p className="text-xs text-[#FF6B00] uppercase tracking-widest font-black mt-1">Shastri Title • {p.experience} yrs Exp</p>
                        </div>
                      </div>

                      <p className="text-xs text-[#8B0000] italic mb-3 font-semibold font-mono tracking-wider flex items-center gap-1.5">
                        <span className="text-sm">🕉️</span> Chant: {p.mantra}
                      </p>

                      <p className="text-sm text-[#3D2B1F]/80 mb-4 bg-white/75 p-3 rounded-xl border border-dashed border-[#D4A017]/20 leading-relaxed italic">
                        "{p.quote}"
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.specialization.map((spec, sIdx) => (
                          <span key={sIdx} className="text-[10px] font-bold uppercase tracking-wider bg-white/90 px-2.5 py-1 rounded text-stone-600 border border-[#D4A017]/20">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                        <span className="text-gray-500 font-medium">Languages: <strong className="text-stone-750">{p.languages.join(', ')}</strong></span>
                        <span className="flex items-center gap-0.5 text-[#FF6B00] font-black">★ {p.rating}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Detailed Workshop Hub */}
          <div className="bg-[#FFFBF7] rounded-3xl border-2 border-[#D4A017]/35 shadow-xl p-6 md:p-10 relative overflow-hidden transition-all">
            
            {/* Visual background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/3 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B0000]/3 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              
              {/* Left Details Panel + Custom Video Intro Player (45% space) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#FF6B00] font-bold uppercase tracking-widest mb-1.5">
                    <Video className="w-4 h-4 text-[#FF6B00]" />
                    <span>Interactive Shastri Spotlight</span>
                  </div>
                  <h3 className="text-3xl font-yatra text-[#8B0000]">{activePandit.name}</h3>
                  <p className="text-xs text-gray-505 leading-relaxed mt-1 font-sans">
                    Watch the video session below, then select an open time slot from the scheduling dashboard to guarantee direct shastra guidance.
                  </p>
                </div>

                {/* Highly Crafted Video Player Block */}
                <div className="bg-stone-950 rounded-2.5xl aspect-video relative overflow-hidden shadow-2xl border border-[#D4A017]/40 flex flex-col justify-between group/video">
                  
                  {/* Real Looping Video of Sacred Jyot/Flame background */}
                  <div className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center">
                    <video
                      ref={videoPlayerRef}
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      poster={activePandit.image}
                      loop
                      playsInline
                      muted={videoMuted}
                      className="w-full h-full object-cover opacity-55 filter brightness-95 transition-transform duration-700"
                    />
                    
                    {/* Floating Overlay of the Panditji's portrait in a small elegant circular frame */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full pl-2 pr-4 py-1 border border-white/20 shadow-xl">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4A017] shrink-0">
                        <img 
                          src={activePandit.image} 
                          alt={activePandit.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-yellow-100 uppercase tracking-widest leading-none block">
                        {activePandit.name.split(' ').slice(1).join(' ')}
                      </span>
                    </div>

                    {/* Ring aura simulation */}
                    <div className={`absolute w-32 h-32 rounded-full border border-[#D4A017]/25 animate-ping opacity-20 pointer-events-none ${videoPlaying ? 'block' : 'hidden'}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
                  </div>

                  {/* Top Bar Video Overlays */}
                  <div className="relative z-10 p-3.5 flex items-center justify-between text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-yellow-405/20 backdrop-blur-md border border-yellow-400/40 text-yellow-300 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse inline-block"></span>
                      Audio-Visual Profile
                    </span>
                    <span className="text-[10px] font-mono opacity-80 bg-black/45 px-2 py-0.5 rounded-md">
                      432 Hz Swara Calibrated
                    </span>
                  </div>

                  {/* Center Play overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
                    {!videoPlaying ? (
                      <button 
                        onClick={() => {
                          setVideoPlaying(true);
                          setVideoProgress(1);
                        }} 
                        className="w-16 h-16 bg-gradient-to-tr from-[#FF6B00] to-[#8B0000] rounded-full flex items-center justify-center shadow-lg border-2 border-[#D4A017] text-white hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Play className="w-6 h-6 fill-current text-[#FFF8F0] ml-1" />
                      </button>
                    ) : (
                      /* Waveform simulated equalizers */
                      <div className="flex items-center gap-1.5 h-12">
                        {[0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 2].map((h, idx) => (
                          <span 
                            key={idx} 
                            style={{ 
                              height: `${h * 6}px`, 
                              animationDelay: `${idx * 0.08}s` 
                            }} 
                            className="w-1 bg-[#FF6B00] rounded-full animate-pulse transition-all duration-300 shrink-0"
                          ></span>
                        ))}
                      </div>
                    )}
                    <span className="text-[11px] font-serif text-[#FFF8F0]/80 mt-2 font-medium bg-black/30 px-3 py-1 rounded-full tracking-wide">
                      {activeVideo.focusTitle}
                    </span>
                  </div>

                  {/* Subtitle Glass Overlay Container */}
                  <div className="relative z-10 px-4 pb-2.5">
                    <div className="min-h-12 bg-black/65 backdrop-blur-md border border-[#D4A017]/20 rounded-xl p-2.5 flex items-center justify-center text-center">
                      <p className="text-xs font-sans text-stone-200 tracking-normal leading-relaxed">
                        {videoPlaying 
                          ? activeVideo.caption 
                          : "⏸️ Click the play button above to listen to Shastriji’s voice introduction & Sanskrit pronunciation track."}
                      </p>
                    </div>
                  </div>

                  {/* Controller Tray bottom */}
                  <div className="relative z-10 p-3 bg-black/75 border-t border-white/10 flex items-center justify-between text-white">
                    <button 
                      type="button"
                      onClick={() => setVideoPlaying(!videoPlaying)} 
                      className="text-[#FF6B00] hover:text-white transition-colors"
                      title={videoPlaying ? "Pause" : "Play"}
                    >
                      {videoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    {/* Timeline Slider */}
                    <div className="flex-grow mx-4 relative group">
                      <div className="h-1.5 bg-white/20 rounded-full w-full overflow-hidden">
                        <div 
                          style={{ width: `${videoProgress}%` }} 
                          className="h-full bg-[#FF6B00] transition-all duration-300"
                        ></div>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={videoProgress} 
                        onChange={(e) => setVideoProgress(parseInt(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        disabled={!videoPlaying}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono">
                        0:{videoPlaying ? String(Math.floor(videoProgress * 0.6)).padStart(2, '0') : '00'} / 1:00
                      </span>
                      <button 
                        type="button"
                        onClick={() => setVideoMuted(!videoMuted)} 
                        className="text-stone-300 hover:text-white transition-colors"
                        title={videoMuted ? "Unmute" : "Mute"}
                      >
                        {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Credentials Certifications Block */}
                <div className="bg-white p-4.5 rounded-2xl border border-[#D4A017]/25 shadow-sm space-y-3">
                  <span className="text-[10px] font-black uppercase text-[#8B0000] tracking-widest block font-sans">Shastri Certifications & Lineage</span>
                  <div className="grid grid-cols-2 gap-3 text-xs leading-tight text-stone-600 font-sans">
                    <div className="flex items-start gap-1.5">
                      <span className="text-green-600 font-bold shrink-0">✔</span>
                      <span>Akhil Bhartiya Purohit Sabha Certified</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-green-600 font-bold shrink-0">✔</span>
                      <span>Varanasi Sampurnanand Acharya Degree</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-green-600 font-bold shrink-0">✔</span>
                      <span>100% Rigid Shastra Ritual Alignment</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-green-600 font-bold shrink-0">✔</span>
                      <span>Safe Multi-Device Live Stream Rig</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Panel: Calendar Scheduling & Devotee Reviews (7% space) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                
                {/* 1. Real-Time Scheduler Area */}
                <div className="bg-white p-5 rounded-2.5xl border border-[#D4A017]/25 shadow-sm space-y-4">
                  
                  <div className="flex items-center justify-between font-sans">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#FF6B00]" />
                      <h4 className="font-bold text-[#8B0000] text-sm uppercase tracking-wide">1. Real-Time Availability Scheduler</h4>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-full">
                      Varanasi Timezone
                    </span>
                  </div>

                  {/* Horizontal Day Selector */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase text-gray-500 font-bold block font-sans">Select Custom Ritual Date:</span>
                    <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                      {calendarDays.map((cd, index) => {
                        const isDaySelected = selectedDateIndex === index;
                        return (
                          <button 
                            key={index} 
                            type="button"
                            onClick={() => setSelectedDateIndex(index)}
                            className={`flex flex-col items-center p-2.5 min-w-[70px] rounded-xl border transition-all shrink-0 ${
                              isDaySelected 
                                ? 'bg-[#8B0000] border-[#8B0000] text-[#FFF8F0] shadow-md scale-105'
                                : 'bg-[#FFF8F0]/30 border-[#D4A017]/15 text-stone-700 hover:bg-[#FFF8F0]/70'
                            }`}
                          >
                            <span className="text-[9px] uppercase tracking-wider font-bold opacity-75">{cd.label}</span>
                            <span className="text-base font-bold font-serif leading-none mt-1">{cd.dayNum}</span>
                            <span className="text-[9px] font-sans tracking-tight opacity-75 mt-0.5">{cd.dateStr.split(' ')[1]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hours slots grid grouped by periods */}
                  <div className="space-y-3 pt-1">
                    <span className="text-[10px] uppercase text-gray-500 font-bold block font-sans">Select Consecrated Time Slot:</span>
                    
                    <div className="space-y-2 text-xs font-sans">
                      {/* Morning slots */}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold text-gray-400 min-w-[65px]">Morning:</span>
                        <div className="flex flex-wrap gap-2">
                          {["07:30 AM", "09:00 AM", "10:30 AM"].map((slot) => {
                            const isSlotSelected = selectedTimeSlot === slot;
                            return (
                              <button 
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                                  isSlotSelected 
                                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]' 
                                    : 'bg-white border-[#D4A017]/20 hover:border-[#FF6B00]/40 text-stone-700'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Afternoon slots */}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold text-gray-400 min-w-[65px]">Afternoon:</span>
                        <div className="flex flex-wrap gap-2">
                          {["01:00 PM", "02:30 PM", "04:00 PM"].map((slot) => {
                            const isSlotSelected = selectedTimeSlot === slot;
                            return (
                              <button 
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                                  isSlotSelected 
                                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]' 
                                    : 'bg-white border-[#D4A017]/20 hover:border-[#FF6B00]/40 text-stone-700'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Evening slots */}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold text-gray-400 min-w-[65px]">Evening:</span>
                        <div className="flex flex-wrap gap-2">
                          {["05:30 PM", "07:00 PM", "08:30 PM"].map((slot) => {
                            const isSlotSelected = selectedTimeSlot === slot;
                            return (
                              <button 
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                                  isSlotSelected 
                                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]' 
                                    : 'bg-white border-[#D4A017]/20 hover:border-[#FF6B00]/40 text-stone-700'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Interactive Dynamic Booking Bridge wrapper */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="w-full sm:w-1/2">
                      <label className="text-[9px] uppercase font-bold text-gray-400 block mb-1 font-sans">Pick Ceremony:</label>
                      <select 
                        value={newReviewService}
                        onChange={(e) => setNewReviewService(e.target.value)}
                        className="w-full text-xs font-bold bg-[#FFF8F0]/40 border border-[#D4A017]/30 rounded-lg p-2.5 outline-none text-[#1e140f] font-sans"
                      >
                        {POOJA_SERVICES.map((s) => (
                          <option key={s.id} value={s.name}>{s.name} (₹{s.price})</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        const targetService = POOJA_SERVICES.find(s => s.name === newReviewService) || POOJA_SERVICES[0];
                        setBookingPandit(selectedPanditId);
                        const selDay = calendarDays[selectedDateIndex];
                        if (selDay) {
                          setBookingDate(selDay.raw);
                        }
                        setBookingTime(selectedTimeSlot);
                        initiateBooking(targetService);
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg border border-[#D4A017] transition-all flex items-center justify-center gap-2 mt-4 sm:mt-0 font-sans"
                    >
                      <Calendar className="w-4 h-4 text-yellow-300 fill-current" />
                      <span>Reserve Slot with {activePandit.name.split(' ').pop()}</span>
                    </button>
                  </div>

                </div>

                {/* 2. Customer Reviews & Ratings Suite */}
                <div className="bg-white p-5 rounded-2.5xl border border-[#D4A017]/25 shadow-sm space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
                      <h4 className="font-bold text-[#8B0000] text-sm uppercase tracking-wide">2. Devotee Reviews & Ratings Hub</h4>
                    </div>
                    <div className="flex items-center gap-1 font-sans">
                      <span className="text-xs font-black text-[#8B0000]">★ {averageRatingCalculated}</span>
                      <span className="text-[10px] text-gray-400">({totalReviewsCount} reviews)</span>
                    </div>
                  </div>

                  {/* Real-time Category rating progress lines */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] font-sans text-stone-600">
                    <div>
                      <div className="flex justify-between font-bold mb-0.5">
                        <span>Sanskrit Pronunciation</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B00] w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold mb-0.5">
                        <span>Ritual Precision</span>
                        <span>98%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B00] w-[98%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold mb-0.5">
                        <span>Punctuality & Decorum</span>
                        <span>99%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B00] w-[99%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable list of reviews */}
                  <div className="space-y-3 max-h-[175px] overflow-y-auto pr-1 scrollbar-thin">
                    {activeReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-[#FFFBF7]/80 rounded-xl border border-[#D4A017]/10 text-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 font-sans">
                          <div className="flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/20 flex items-center justify-center font-bold text-[10px] text-[#8B0000]">
                              {rev.reviewer[0]}
                            </span>
                            <div>
                              <span className="font-bold text-stone-800 leading-none block">{rev.reviewer}</span>
                              <span className="text-[9px] text-[#FF6B00] font-semibold">Verified Family devotee • {rev.service}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-yellow-500 font-bold block">{"★".repeat(rev.rating)}</span>
                            <span className="text-[8px] text-gray-400">{rev.date}</span>
                          </div>
                        </div>
                        <p className="text-stone-600 font-sans leading-relaxed text-[11px] italic mt-1.5">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                    {activeReviews.length === 0 && (
                      <p className="text-center text-xs text-stone-400 py-6 font-sans">No devotee feedback yet. Be the first to express gratitude!</p>
                    )}
                  </div>

                  {/* Elegant Mini Add Review Form */}
                  <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-gray-150 space-y-3 font-sans">
                    
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold uppercase tracking-wider text-gray-500">Provide Devotional Feedback:</span>
                      
                      {/* Clickable star selection */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starNum) => (
                          <button 
                            type="button" 
                            key={starNum}
                            onClick={() => setNewReviewRating(starNum)}
                            className="text-stone-300 hover:scale-120 transition-transform"
                          >
                            <Star 
                              className={`w-4 h-4 ${
                                starNum <= newReviewRating 
                                  ? 'text-amber-500 fill-current' 
                                  : 'text-stone-300 bg-transparent'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs leading-none">
                      <input 
                        type="text" 
                        required
                        placeholder="Devotee Full Name" 
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="p-2.5 bg-[#FFF8F0]/30 border border-[#D4A017]/20 rounded-lg outline-none text-[#1e140f] focus:border-[#FF6B00]"
                      />
                      <select 
                        value={newReviewService}
                        onChange={(e) => setNewReviewService(e.target.value)}
                        className="p-2.5 bg-[#FFF8F0]/30 border border-[#D4A017]/20 rounded-lg text-[#1e140f] outline-none"
                      >
                        {POOJA_SERVICES.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <textarea 
                        required
                        placeholder="Write your spiritual experience with Shastriji..."
                        rows={2}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF8F0]/30 border border-[#D4A017]/20 rounded-lg outline-none text-[#1e140f] focus:border-[#FF6B00] resize-none"
                      ></textarea>
                      <button 
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 w-7 h-7 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-lg flex items-center justify-center transition-colors"
                        title="Submit Feedback"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {reviewSubmitSuccess && (
                      <div className="p-2 bg-green-50 text-green-750 text-[10px] font-bold rounded-lg border border-green-200 flex items-center gap-1.5 animate-fade-in">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Pranams! Your feedback has been accepted and added to Shastri's dynamic profile.</span>
                      </div>
                    )}

                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Traditions Gurukul subscription table */}
      <section id="kids-gurukul" className="py-24 px-4 bg-[#FFF8F0] border-b border-[#D4A017]/10 relative">
        
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest">Empowering Tomorrow's Roots</span>
            <h2 className="font-yatra text-3xl sm:text-5xl text-[#8B0000] leading-none mt-1">Hindu Traditions Gurukul Subscription</h2>
            <p className="text-base text-[#3D2B1F]/80 mt-3 font-sans max-w-xl mx-auto">
              Deliver divine core values to young minds. Interactive story modules, shloka memorizer maps, and live worksheets.
            </p>
            
            {/* Billing toggle */}
            <div className="inline-flex items-center bg-white/80 p-1 rounded-full border border-[#D4A017]/30 shadow-sm mt-8">
              <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${billingCycle === 'monthly' ? 'bg-[#8B0000] text-white shadow' : 'text-gray-650 hover:text-[#8B0000]'}`}>
                Billing Monthly
              </button>
              <button onClick={() => setBillingCycle('yearly')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${billingCycle === 'yearly' ? 'bg-[#8B0000] text-white shadow' : 'text-gray-650 hover:text-[#8B0000]'}`}>
                Billing Yearly (Get 2 Months Free)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div key={plan.id} className={`bg-gradient-to-b ${plan.themeColor} bg-white rounded-3xl p-8 border-2 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between`} style={{ borderColor: plan.isPopular ? '#FF6B00' : 'rgba(212, 160, 23, 0.2)' }}>
                
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full border border-[#D4A017] shadow flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Highly Popular Choice</span>
                  </div>
                )}

                <div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2.5xl font-extrabold text-[#8B0000] tracking-tight">{plan.name}</h3>
                      <p className="text-xs uppercase text-gray-500 tracking-wider font-semibold mt-0.5">{plan.subName}</p>
                    </div>
                    <span className="text-xs font-bold uppercase text-[#FF6B00] bg-white px-3 py-1 rounded-full border border-[#FF6B00]/45 shadow-sm">
                      🧒 Age: {plan.ageGroup}
                    </span>
                  </div>

                  <p className="text-sm text-[#3D2B1F]/80 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Interactive Billing Rate</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-[#1e140f] italic">
                        ₹{(billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-500">
                        / {billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-6 border-t border-gray-100">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#8B0000] block mb-2">Curriculum Pillars:</span>
                    <ul className="space-y-2.5 text-xs text-gray-700">
                      {plan.learnItems.map((item, id) => (
                        <li key={id} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Video Stories:</span>
                      <strong className="text-gray-800 font-semibold">{plan.features.storyClasses}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Home craft files:</span>
                      <strong className="text-gray-800 font-semibold">{plan.features.craftsQuiz}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Live review:</span>
                      <strong className="text-gray-800 font-semibold">{plan.features.oneOnOne}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sanskrit diploma:</span>
                      <strong className="text-gray-800 font-semibold">{plan.features.certificate}</strong>
                    </div>
                  </div>

                </div>

                <div className="mt-8">
                  <button onClick={() => {
                    setWaitlistInterest('gurukul');
                    setWaitlistModal({ open: true });
                  }} className="w-full py-4.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-2xl text-xs font-bold uppercase tracking-widest border border-[#D4A017] transition-all shadow-md flex items-center justify-center gap-2">
                    <span>Join Gurukul Waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-gray-500 mt-2.5">🛡️ Free priority waitlist registration - zero payment required.</p>
                </div>

              </div>
            ))}
          </div>

          {/* Kids Learning Mode: Gurukul Story Playground (PPT Page 4 & Page 9) */}
          <div className="mt-20 bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E0] rounded-3xl p-8 border border-[#D4A017]/30 shadow-md relative overflow-hidden">
            
            {/* Visual cartoon accents */}
            <div className="absolute right-4 top-4 text-3xl opacity-20 select-none pointer-events-none">✨ 🪵 🏹</div>
            <div className="absolute left-4 bottom-4 text-3xl opacity-20 select-none pointer-events-none">🪁 🔔 🐄</div>

            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF6B00] bg-white px-3 py-1 rounded-full border border-orange-500/20 shadow-sm inline-block">Sanskriti Play Mode</span>
              <h3 className="font-yatra text-3xl text-[#8B0000] mt-2">Bal Gurukul Interactive Stories</h3>
              <p className="text-xs text-stone-600 mt-1">Engaging, simplified narratives from Ramayana, Mahabharat, and Puranas configured directly for children's intellect.</p>
            </div>

            {/* Stories Tab selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {KIDS_STORIES_DATA.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => {
                    setKidsStoryIdx(idx);
                    setKidsStoryAudioPlaying(false);
                  }}
                  className={`py-2.5 px-4.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${kidsStoryIdx === idx ? 'bg-[#8B0000] text-white border-[#8B0000] shadow' : 'bg-white hover:bg-[#FFF8F0] text-gray-700 border-gray-200'}`}
                >
                  {story.character}
                </button>
              ))}
            </div>

            {/* Active Story Card Grid */}
            {(() => {
              const activeStory = KIDS_STORIES_DATA[kidsStoryIdx];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Story Text Box (Parchment Styled) */}
                  <div className="lg:col-span-7 bg-[#FFFBF4] rounded-2xl p-6 md:p-8 border border-[#D4A017]/20 shadow-sm space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#FF6B00] tracking-wider block">Ancient Legend Lesson</span>
                          <h4 className="font-yatra text-2xl text-[#8B0000] font-bold">{activeStory.title}</h4>
                        </div>
                        <span className="text-xs bg-[#8B0000]/10 text-[#8B0000] font-extrabold px-3 py-1 rounded-full">
                          {activeStory.character}
                        </span>
                      </div>

                      <p className="text-sm text-stone-750 leading-relaxed font-sans font-medium text-justify">
                        {activeStory.story}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D4A017]/15 mt-4 bg-orange-500/[0.04] p-3 rounded-xl border border-[#D4A017]/10">
                      <span className="text-[10px] text-[#8B0000] uppercase font-black block tracking-widest mb-1">❤️ Moral Wisdom for Life</span>
                      <p className="text-xs text-[#3D2B1F] font-bold">"{activeStory.moral}"</p>
                    </div>
                  </div>

                  {/* Audio Playing & Visual Assistant Panel */}
                  <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#D4A017]/20 shadow-sm flex flex-col justify-between items-stretch text-center">
                    
                    <div className="space-y-4">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block tracking-widest">Story Host & Guru Audio</span>
                      
                      <div className="w-28 h-28 mx-auto bg-gradient-to-br from-amber-500/10 to-[#FF6B00]/10 rounded-full border border-[#D4A017]/30 flex items-center justify-center text-4xl shadow-inner relative group">
                        <span className="group-hover:scale-110 transition-transform block">🧑‍🏫</span>
                        {kidsStoryAudioPlaying && (
                          <div className="absolute inset-0 rounded-full border-2 border-[#FF6B00] animate-ping opacity-20"></div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-stone-850">Certified Guru Vocal Narrator</h5>
                        <p className="text-xs text-stone-500">Correct shloka pronunciation, dramatic tones, and sound cues to spark young imaginations.</p>
                      </div>

                      {/* Display active narration details */}
                      <div className="bg-[#FFF8F0] p-4 rounded-xl border border-[#D4A017]/15 text-left space-y-1.5">
                        <span className="text-[9px] font-bold text-[#FF6B00] uppercase block">Narration Feed:</span>
                        <p className="text-xs font-semibold text-stone-700 leading-normal">
                          {kidsStoryAudioPlaying 
                            ? `Guru is speaking: "Hear how ${activeStory.character} teaches us this timeless value of truth..."`
                            : "Click Play below to start the Bal Gurukul audio storytelling experience."
                          }
                        </p>
                        
                        {kidsStoryAudioPlaying && (
                          <div className="flex gap-1 items-end h-4 pt-1 justify-center">
                            <div className="w-0.5 bg-[#FF6B00] animate-bounce h-full" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-0.5 bg-[#FF6B00] animate-bounce h-3" style={{ animationDelay: '0.4s' }}></div>
                            <div className="w-0.5 bg-[#FF6B00] animate-bounce h-2" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-0.5 bg-[#FF6B00] animate-bounce h-4" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-0.5 bg-[#FF6B00] animate-bounce h-1" style={{ animationDelay: '0.3s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                      <button 
                        onClick={() => setKidsStoryAudioPlaying(!kidsStoryAudioPlaying)}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border shadow flex items-center justify-center gap-1.5 ${kidsStoryAudioPlaying ? 'bg-red-650 hover:bg-black text-white border-red-700' : 'bg-[#FF6B00] hover:bg-[#8B0000] text-white border-[#FF6B00]'}`}
                      >
                        {kidsStoryAudioPlaying ? (
                          <>
                            <span>⏹️ Pause Story Host</span>
                          </>
                        ) : (
                          <>
                            <span>▶️ Play Interactive Story</span>
                          </>
                        )}
                      </button>
                      
                      <span className="text-[9px] uppercase font-bold text-[#8B0000] tracking-widest block">
                        🔔 Sanskrit memorization: Includes {activeStory.audioText.split(':')[1]?.trim() || 'vocal guides'}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })()}

          </div>

          {/* Interactive Kids Traditions Quiz preview (Engaging parent tool) */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-[#D4A017]/30 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-widest bg-[#FFC0CB]/10 px-3 py-1 rounded border border-[#FF6B00]/20">Try A Gurukul Quiz!</span>
                <h3 className="font-yatra text-2.5xl text-[#8B0000]">What Do Your Kids Know?</h3>
                <p className="text-sm text-[#3D2B1F]/90 leading-relaxed">
                  Help them answer these three basic questions about our sacred heritage stories. Sanskriti Pro subscribers get 45+ games weekly!
                </p>
                <div className="h-[2px] w-16 bg-[#D4A017]/40"></div>
                <div className="hidden lg:block pt-2">
                  <span className="text-2xl opacity-60">🪁 🔔 🕉️ 🎨</span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FFF8F0] p-6 rounded-2xl border border-[#D4A017]/20 relative overflow-hidden">
                {!quizSubmitted ? (
                  <div className="space-y-6">
                    {quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-2">
                        <span className="text-xs font-bold text-[#8B0000]">Question {qIdx + 1} of {quizQuestions.length}</span>
                        <p className="text-sm font-bold text-[#1e140f]">{q.q}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedQuizAnswers[qIdx] === optIdx;
                            return (
                              <button key={optIdx} onClick={() => handleQuizAnswerSelect(qIdx, optIdx)} className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${isSelected ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-sm' : 'bg-white hover:bg-white border-gray-200 text-gray-700'}`}>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">Complete all questions to preview the diploma scorecard!</span>
                      <button onClick={submitQuiz} className="px-5 py-2.5 bg-[#8B0000] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#FF6B00] transition-colors shadow">
                        Submit Scorecard
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <span className="text-4xl">🏆</span>
                    <h4 className="font-yatra text-2xl text-[#8B0000]">Cultural Score: {quizScore} / {quizQuestions.length}</h4>
                    <p className="text-xs max-w-md mx-auto text-gray-600">
                      {quizScore === 3
                        ? "Spectacular! Your child possesses high foundational awareness of our divine traditions! Sanskriti Pro would keep them on high Vedic academic tracks."
                        : "Wonderful try! These stories of courage, truth, and focus are waiting to be explored inside Ganesha story paths. Dharma Seekh will open these chapters next."}
                    </p>
                    <div className="flex justify-center gap-3 pt-4">
                      <button onClick={resetQuiz} className="px-4 py-2 bg-white text-gray-650 rounded border border-gray-300 text-xs font-semibold hover:bg-gray-50 transition-all flex items-center gap-1">
                        <span className="font-bold">↩</span> Try Again
                      </button>
                      <a href="#kids-gurukul" className="px-4 py-2 bg-[#FF6B00] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-[#8B0000] transition-all">
                        Enroll and Unlock All Quizzes
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* "Why Teach Hindu Traditions?" Section */}
      <section className="bg-white border-b border-[#D4A017]/20 py-24 px-4 overflow-hidden relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-0 left-0 p-4 border border-[#FF6B00] rounded-full animate-ping opacity-10"></div>
            {/* Visual illustration containing Vedic graphic representation */}
            <div className="bg-[#FFF8F0] p-8 rounded-3xl border-2 border-[#D4A017]/40 shadow-inner relative flex flex-col justify-center items-center">
              
              <div className="text-center space-y-6">
                <span className="font-serif text-[#8B0000] text-6xl block">ॐ</span>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">Connecting Modern Hearts</span>
                <blockquote className="text-base text-[#3D2B1F] font-semibold italic max-w-md leading-relaxed">
                  "Sanskrit is the acoustic blueprint of character. Visual storytelling is the spark of creative concentration. We do not teach rules, we invite children to explore values."
                </blockquote>
                <div className="h-[1px] w-20 bg-[#D4A017] mx-auto"></div>
                <div>
                  <div className="text-sm font-bold text-[#8B0000]">Dharma Seekh Curriculum Board</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Acharyas of Varanasi</div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[#FF6B00] text-sm font-bold uppercase tracking-widest">Emotional Pillar for Parents</span>
            <h2 className="font-yatra text-3xl sm:text-5xl text-[#8B0000] leading-none">Why Introduce Kids to Hindu Heritage?</h2>
            
            <p className="text-sm text-[#3D2B1F]/90 leading-relaxed font-sans mt-4">
              Our children are growing up in incredibly fast-paced, high-tech, sensory environments. Teaching the core morals from our sacred heritage does not make them rigid; it grants them an unbreakable emotional root system, character resilience, and natural inner focus.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#FF6B00]/10 border border-[#FF6B00]/40 text-[#FF6B00] rounded-lg flex items-center justify-center shrink-0">
                  <Book className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#8B0000]">Emotional Focus (Moral Shlokas)</h4>
                  <p className="text-xs text-[#3D2B1F]/80">Daily Gayatri recitation scientifically fosters sound breathing intervals and centers active mental states during stressful lessons.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#D4A017]/10 border border-[#D4A017]/40 text-[#D4A017] rounded-lg flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#8B0000]">Decision Ethics (The Ramayana Tales)</h4>
                  <p className="text-xs text-[#3D2B1F]/80">Exploring critical actions taken by characters creates dynamic ethical models of integrity, courage, and family bond in their minds.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#8B0000]/10 border border-[#8B0000]/40 text-[#8B0000] rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#8B0000]">Cultural Identity & Confidence</h4>
                  <p className="text-xs text-[#3D2B1F]/80">We translate terms from pure Sanskrit roots so kids can display their traditions securely, proudly, and explain festival rituals to peers.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Devotees and Parents Testimonial Carousel */}
      <section className="py-20 px-4 bg-[#FFF8F0] border-b border-[#D4A017]/25">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest">Devotee Reverence Notes</span>
            <h2 className="font-yatra text-3xl sm:text-4.5xl text-[#8B0000]">Voices of Bliss</h2>
            <p className="text-sm font-sans text-gray-500 mt-2 max-w-md mx-auto">Read beautiful testimony notes from satisfied parent members and global temple devotees.</p>
            <div className="w-24 h-1 bg-[#D4A017] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-2xl border border-[#D4A017]/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex text-[#FF6B00]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />)}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "Booking our Griha Pravesh Pooja through PoojaGhar was absolutely sublime. The Samagri kit got delivered to California on time, packed in sterile boxes. Panditji guided us for 2 hours with immense warmth. It felt like walking through a Ganges temple!"
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold text-xs">SM</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Srimathy Mukundan</h4>
                  <span className="text-[10px] text-gray-400 block">Devotee • Mountain View, USA</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D4A017]/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex text-[#FF6B00]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />)}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "My children, aged 5 and 9, are enrolled in the Dharma Seekh tier. Weekly shloka stories of Lord Hanuman and Ganesha are beautifully narrated. The festival worksheets are clean & safe. Highly recommend to parents who want to anchor their roots."
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-xs">RK</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Ravi K. Sharma</h4>
                  <span className="text-[10px] text-gray-400 block">Parent Subscriber • Bangalore, IN</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D4A017]/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex text-[#FF6B00]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />)}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "Ayushya Birthday pooja for my mother was arranged instantly. The high quality sound of mantra stotras streamed beautifully via video. Pandit S. Krishna blessed her so kindly with divine verses. This platform is a boon for isolated elder families."
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs">AN</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Aditya N.</h4>
                  <span className="text-[10px] text-gray-400 block">Devotee • London, UK</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Unique Value Proposition & Social Impact (PPT Pages 8 & 10) */}
      <section className="bg-gradient-to-br from-white via-[#FFFBF7] to-[#FFF8F0] py-24 px-4 border-b border-[#D4A017]/20 relative overflow-hidden">
        
        {/* Background visual halo aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/3 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Left Box: Value Proposition (PPT Page 8) */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D4A017]/30 shadow-md flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold text-[#FF6B00] tracking-widest bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3.5 py-1 rounded-full inline-block">Unique Parameters</span>
                <h3 className="font-yatra text-3xl text-[#8B0000]">Why PoojaGhar Stands Out</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  Unlike scattered directory services or generic e-commerce sites, PoojaGhar is built on rigid shastra guidelines, state-of-the-art software, and localized heritage models.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 bg-[#FFF8F0]/80 rounded-2xl border border-[#D4A017]/15">
                  <span className="text-xl mb-1.5 block">🕉️</span>
                  <h4 className="font-bold text-xs text-[#8B0000] uppercase tracking-wide mb-1">Cultural Authenticity</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">No shortcuts. Ritual step alignments and custom mantra pronunciation verified by Varanasi scholars.</p>
                </div>

                <div className="p-4 bg-[#FFF8F0]/80 rounded-2xl border border-[#D4A017]/15">
                  <span className="text-xl mb-1.5 block">⚡</span>
                  <h4 className="font-bold text-xs text-[#8B0000] uppercase tracking-wide mb-1">Hybrid AI + Human</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Seamlessly switch between helpful Ganesha AI guides and live face-to-face premium Panditji bookings.</p>
                </div>

                <div className="p-4 bg-[#FFF8F0]/80 rounded-2xl border border-[#D4A017]/15">
                  <span className="text-xl mb-1.5 block">🌏</span>
                  <h4 className="font-bold text-xs text-[#8B0000] uppercase tracking-wide mb-1">Pan-Indian Variety</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Specific setup variations (Tamil, Bengali, Gujarati, North Indian) to preserve your exact family roots.</p>
                </div>

                <div className="p-4 bg-[#FFF8F0]/80 rounded-2xl border border-[#D4A017]/15">
                  <span className="text-xl mb-1.5 block">📦</span>
                  <h4 className="font-bold text-xs text-[#8B0000] uppercase tracking-wide mb-1">All-In-One Box</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Pure sterile samagri kits packed nicely and shipped worldwide, taking the stress out of festival prep.</p>
                </div>

              </div>

              <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-4 rounded-r-xl">
                <span className="text-[10px] font-black text-[#8B0000] uppercase tracking-widest block">The Ideal Global Sanctuary</span>
                <p className="text-xs text-[#3D2B1F] italic leading-relaxed mt-1">
                  "Designed for modern busy households, bridging miles with pure devotional energy and zero hassle."
                </p>
              </div>

            </div>

            {/* Right Box: Social Impact & Vision for Future (PPT Page 10) */}
            <div className="bg-[#FFF8F0]/50 p-8 sm:p-10 rounded-3xl border border-[#D4A017]/20 shadow-sm flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold text-[#8B0000] tracking-widest bg-[#8B0000]/10 border border-[#8B0000]/25 px-3.5 py-1 rounded-full inline-block">Divine Mission</span>
                <h3 className="font-yatra text-3xl text-[#8B0000]">Our Sacred Impact & Vision</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  PoojaGhar is more than just a website; it is an active spiritual movement dedicated to preserving cultural heritage and empowering priests.
                </p>
              </div>

              <div className="space-y-4 font-sans">
                
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#8B0000]/10 flex items-center justify-center shrink-0 text-[#8B0000] border border-[#8B0000]/20 font-bold text-xs">01</div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1e140f]">Protecting Heritage for Gen-Next</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">Passing down stories, proper chanting rhythms, and clear values to young kids in a safe, play-based digital form.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#8B0000]/10 flex items-center justify-center shrink-0 text-[#8B0000] border border-[#8B0000]/20 font-bold text-xs">02</div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1e140f]">Empowering Local Pandit Ecosystems</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">Providing highly stable, direct e-income to verified local dynamic priests throughout Varanasi, Kashi, Haridwar, and South temples.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#8B0000]/10 flex items-center justify-center shrink-0 text-[#8B0000] border border-[#8B0000]/20 font-bold text-xs">03</div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1e140f]">Curing Cultural Isolation for NRIs</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">Connecting families living abroad back to true local environments, Ganga waters, and spiritual celebrations instantly.</p>
                  </div>
                </div>

              </div>

              <div className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] p-6 rounded-2xl text-white text-center shadow-lg border border-yellow-400/20 w-full">
                <span className="text-[10px] uppercase tracking-widest font-black text-yellow-300 block mb-1">Our Slogan Statement</span>
                <p className="font-serif text-base sm:text-lg font-semibold leading-relaxed">
                  "To bring Indian traditions to every home with the power of AI and real human connection."
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section id="faqs" className="py-20 px-4 bg-white border-b border-[#D4A017]/10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] text-sm uppercase font-bold tracking-widest block">Clear Spiritual Wisdom</span>
            <h2 className="font-yatra text-3xl sm:text-4.5xl text-[#8B0000]">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500 mt-2">Answers to all your query paths regarding live video logistics, prasad shipping, and gurukul fees.</p>
            <div className="w-24 h-1 bg-[#D4A017] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="bg-[#FFF8F0] border border-[#D4A017]/20 rounded-2.5xl overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFaq(isOpen ? null : faq.id)} className="w-full text-left p-6 flex justify-between items-center bg-white border-b border-[#D4A017]/10 focus:outline-none select-none">
                    <span className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#FF6B00] shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#8B0000] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-6 text-sm text-[#3D2B1F]/90 leading-relaxed bg-[#FFF8F0]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Embedded User Dashboard Portal Panel (Active State My Account) */}
      <section id="profile-portal" className="py-24 px-4 bg-[#FFF8F0] border-b border-[#D4A017]/35 relative">
        <div className="max-w-6xl mx-auto relative z-10">

          {!user ? (
            <div className="text-center max-w-xl mx-auto space-y-6">
              <span className="text-4xl text-[#FF6B00] animate-bounce inline-block">📋</span>
              <h3 className="font-yatra text-3xl text-[#8B0000]">Secure Your Altar Priority</h3>
              <p className="text-sm text-[#3D2B1F]/80 font-sans leading-relaxed">
                Join our exclusive priority waitlist to secure early access to certified Panditjis and Gurukul learning modules. We admit devotees on a rolling basis to preserve high-fidelity stream resolution.
              </p>
              <div className="flex justify-center pt-4">
                <button onClick={() => setWaitlistModal({ open: true })} className="px-8 py-3.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-full text-xs font-bold uppercase tracking-widest border border-[#D4A017] shadow-lg hover:shadow-xl transition-all font-sans">
                  Join Priority Waitlist Now
                </button>
              </div>
            </div>
          ) : (user as any).isWaitlisted ? (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#D4A017]/30 shadow-xl overflow-hidden relative">
              {/* Ticket Top Saffron Header Bar */}
              <div className="bg-gradient-to-r from-[#8B0000] via-[#FF6B00] to-[#8B0000] p-6 text-white text-center relative">
                <span className="text-3xl font-serif block text-yellow-300">ॐ</span>
                <h3 className="font-yatra text-2.5xl mt-1">Waitlist Priority Ticket</h3>
                <p className="text-[10px] uppercase text-[#FFF8F0]/85 tracking-[0.2em] mt-1 font-sans">
                  PoojaGhar Parivaar • Secured Early Access Pass
                </p>
                {/* Decorative punched holes for tickets style */}
                <div className="absolute left-0 bottom-0 top-0 w-4 flex flex-col justify-around pointer-events-none opacity-45">
                  <div className="w-2.5 h-2.5 bg-[#FFF8F0] rounded-full -ml-1.5"></div>
                  <div className="w-2.5 h-2.5 bg-[#FFF8F0] rounded-full -ml-1.5"></div>
                  <div className="w-2.5 h-2.5 bg-[#FFF8F0] rounded-full -ml-1.5"></div>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-4 flex flex-col justify-around pointer-events-none opacity-45">
                  <div className="w-2.5 h-2.5 bg-[#FFF8F0] rounded-full -mr-1.5"></div>
                  <div className="w-2.5 h-2.5 bg-[#FFF8F0] rounded-full -mr-1.5"></div>
                  <div className="w-2.5 h-2.5 bg-[#FFF8F0] rounded-full -mr-1.5"></div>
                </div>
              </div>

              {/* Ticket details */}
              <div className="p-8 md:p-10 space-y-8 font-sans">
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-bold text-[#1e140f] tracking-tight">Radhe Radhe, {user.name}!</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    We have successfully registered your interest. Your dynamic position has been reserved and synchronized on our server.
                  </p>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#FFF8F0] rounded-2xl border border-[#D4A017]/25 relative">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Priority Spot</span>
                    <span className="text-xl font-black text-[#8B0000]">#142</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Queue Position</span>
                    <span className="text-sm font-bold text-green-600 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
                      Next Batch
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Service Type</span>
                    <span className="text-sm font-bold text-[#FF6B00] capitalize">
                      {(user as any).interest === 'gurukul' ? 'Gurukul' : (user as any).interest === 'pooja' ? 'Live Pooja' : 'Consultation'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Ticket ID</span>
                    <span className="text-xs font-mono font-bold text-stone-600 uppercase mt-0.5 block truncate">
                      {user.uid.slice(0, 10).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Additional notes or details */}
                <div className="p-4 bg-amber-50 border border-amber-200/50 rounded-xl flex items-start gap-3 text-xs text-[#8B0000] leading-relaxed">
                  <span className="text-lg">📢</span>
                  <div>
                    <strong className="font-semibold block text-[#8B0000] mb-0.5">Owner Notification Transmitted</strong>
                    Your waitlist details have been transmitted. The owner received a notification simulator alert on their phone number. We will contact you soon.
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                  <button onClick={handleSignOut} className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                    Sign Out Securely
                  </button>
                  <button onClick={() => {
                    setWaitlistName(user.name);
                    setWaitlistEmail(user.email);
                    setWaitlistPhone(user.phone);
                    setWaitlistInterest((user as any).interest || 'gurukul');
                    setWaitlistModal({ open: true });
                  }} className="w-full sm:w-auto px-6 py-2.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-full text-xs font-bold uppercase tracking-widest border border-[#D4A017] shadow transition-all">
                    Update Ticket Preferences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              
              {/* Account Overview Header Row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-8 bg-white rounded-3xl border border-[#D4A017]/20 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-[#FF6B00] to-[#8B0000] rounded-full text-white font-bold text-2xl flex items-center justify-center border-2 border-[#D4A017]">
                    {user.name.split(' ').map(n=>n?.[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2.5xl font-extrabold text-[#1e140f] tracking-tight">{user.name}</h3>
                    <p className="text-xs text-gray-400">Sacred Email: {user.email} • Phone: {user.phone}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setDashboardTab('bookings')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${dashboardTab === 'bookings' ? 'bg-[#8B0000] text-white border-[#8B0000]' : 'bg-white text-gray-650 border-gray-300'}`}>
                    Live Bookings ({bookings.length})
                  </button>
                  <button onClick={() => setDashboardTab('kids')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${dashboardTab === 'kids' ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 'bg-white text-gray-650 border-gray-300'}`}>
                    Kids Tiers ({subscriptions.length})
                  </button>
                  <button onClick={handleSignOut} title="Logout" className="p-2.5 bg-red-50 text-red-750 hover:bg-red-100 rounded-full transition-colors">
                    <LogOut className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Daily Personalized Vedic Wisdom Card */}
              {(() => {
                const dailyVerse = getVedicVerseForUser(user.name);
                const panchangDate = getVedicCalendarDate(new Date());
                
                return (
                  <div className="bg-gradient-to-br from-[#FFFBF7] via-[#FFF9F2] to-white p-8 rounded-3xl border border-[#D4A017]/30 shadow-md relative overflow-hidden">
                    
                    {/* Visual background accents */}
                    <div className="absolute right-0 top-0 w-48 h-48 bg-radial-gradient from-[#FF6B00]/5 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none"></div>
                    <div className="absolute left-4 top-4 text-xs font-serif text-[#FF6B00]/25 select-none pointer-events-none">ॐ ध्येयः सदा सवितृमण्डलमध्यवर्ती</div>

                    <div className="relative z-10 space-y-6">
                      
                      {/* Top Header Label */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4A017]/10 pb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl animate-pulse">🌸</span>
                          <div>
                            <span className="text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest block">Daily Personalized Shubh Ashirwad</span>
                            <h4 className="font-yatra text-lg text-[#8B0000]">Vedas & Upanishads Daily Wisdom</h4>
                          </div>
                        </div>
                        <div className="bg-[#8B0000]/5 border border-[#8B0000]/15 rounded-xl px-4 py-2 text-right">
                          <span className="text-[9px] text-[#8B0000] uppercase font-bold tracking-wider block">Sacred Panchang</span>
                          <span className="text-xs font-semibold text-stone-700">{panchangDate}</span>
                        </div>
                      </div>

                      {/* The Sanskrit Verse Display */}
                      <div className="text-center py-6 px-4 bg-amber-50/40 rounded-2xl border border-dashed border-[#D4A017]/30">
                        <p className="font-serif text-xl sm:text-2xl text-[#8B0000] leading-relaxed whitespace-pre-line font-medium italic select-none">
                          "{dailyVerse.shloka}"
                        </p>
                        <p className="text-xs font-mono text-gray-550 mt-3 italic tracking-wider">
                          — {dailyVerse.translit}
                        </p>
                        <div className="inline-block mt-4 bg-orange-500/10 text-[#FF6B00] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-orange-500/25">
                          {dailyVerse.source}
                        </div>
                      </div>

                      {/* Translation and Personalized Blessing */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                          <span className="text-xs text-[#8B0000] uppercase font-bold tracking-widest block">Sacred Translation</span>
                          <p className="text-sm text-gray-700 leading-relaxed font-sans font-medium">
                            {dailyVerse.translation}
                          </p>
                          <p className="text-xs text-stone-550 leading-relaxed italic border-l-2 border-[#D4A017]/40 pl-3">
                            <strong>Significance:</strong> {dailyVerse.significance}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500/[0.04] to-yellow-500/[0.04] p-5 rounded-2.5xl border border-[#D4A017]/15 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-xs text-[#FF6B00] uppercase font-bold tracking-widest block flex items-center gap-1.5">
                              <span>✨</span> Personal Vedic Guidance
                            </span>
                            <p className="text-sm text-stone-850 leading-relaxed font-medium">
                              {dailyVerse.customizedAdvice}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-[#8B0000] uppercase tracking-wider bg-white/60 py-1.5 px-3 rounded-xl border border-[#D4A017]/10 w-fit">
                            <span>🕉️ Aura: Positive & Blessed</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

              {/* Sub-tab view: Booking sessions logs */}
              {dashboardTab === 'bookings' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-yatra text-2xl text-[#8B0000]">My Live Video Rituals</h4>
                    <span className="text-xs text-gray-500 font-mono">Records match live timezone</span>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border border-[#D4A017]/20 shadow-sm space-y-4">
                      <span className="text-4xl">🕉️</span>
                      <p className="text-sm font-semibold text-gray-600">No active book lists found. Tap 'Book Now' above to schedule.</p>
                      <a href="#services" className="inline-block px-5 py-2.5 bg-[#8B0000] hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all mt-2">
                        Browse Services
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bookings.map((b) => (
                        <div key={b.id} className="bg-white p-6 rounded-3xl border border-[#D4A017]/15 shadow-sm relative overflow-hidden flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-[10px] text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded font-bold uppercase tracking-widest border border-[#FF6B00]/25">
                                  🔴 UPCOMING LIVE
                                </span>
                                <h5 className="font-bold text-xl text-gray-800 mt-2">{b.serviceName}</h5>
                              </div>
                              <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                                Paid ₹{b.amount}
                              </span>
                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                              Assigned Acharya: <strong className="text-gray-700">{b.panditName}</strong>
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-4 bg-[#FFF8F0] p-3.5 rounded-2xl border border-dashed border-[#D4A017]/25 text-xs">
                              <div>
                                <span className="text-gray-400 block text-[9px] uppercase font-bold">Ritual Date:</span>
                                <strong className="text-gray-700">{b.date}</strong>
                              </div>
                              <div>
                                <span className="text-gray-400 block text-[9px] uppercase font-bold">Time Slot:</span>
                                <strong className="text-gray-700">{b.time}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-gray-400">ID: {b.id}</span>
                            <div className="flex gap-2">
                              <button onClick={() => alert(`Connecting securely with Google Cloud WebRTC... Opening direct video terminal chamber ${b.id}`)} className="px-4 py-2 bg-[#8B0000] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#FF6B00] transition-all flex items-center gap-1.5 shadow">
                                <Video className="w-4 h-4" />
                                <span>Join Room</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-yatra text-2xl text-[#8B0000]">My Kids Subscriptions</h4>
                    <span className="text-xs text-[#FF6B00] bg-[#FFB6C1]/10 px-3 py-1 rounded border border-[#FF6B00]/25 font-bold">Kids Gurukul Port</span>
                  </div>

                  {subscriptions.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border border-[#D4A017]/20 shadow-sm space-y-4">
                      <span className="text-4xl">🌸</span>
                      <p className="text-sm font-semibold text-gray-650">No active Sanskriti childrens subscriptions found.</p>
                      <a href="#kids-gurukul" className="inline-block px-5 py-2.5 bg-[#8B0000] hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all mt-2">
                        Enroll a Child
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {subscriptions.map((s) => (
                        <div key={s.id} className="bg-white p-6 rounded-3xl border border-[#D4A017]/15 shadow-sm relative overflow-hidden flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-[10px] text-green-700 bg-green-50 px-2.5 py-1 rounded font-bold uppercase tracking-wide border border-green-250">
                                  ACTIVE MEMBERSHIP
                                </span>
                                <h5 className="font-bold text-xl text-gray-800 mt-2">{s.planName}</h5>
                              </div>
                              <span className="text-xs font-bold text-gray-500">
                                ₹{s.amount} / {s.billingCycle}
                              </span>
                            </div>

                            <p className="text-xs text-gray-550 mt-1">
                              Classmate: <strong className="text-gray-700">{s.childName || 'Sanskriti Student'}</strong> (Daily Stories active)
                            </p>

                            <div className="mt-4 p-4 bg-[#FFF8F0] rounded-2xl border border-dashed border-[#D4A017]/20 space-y-2 text-xs">
                              <span className="font-semibold text-gray-750 uppercase tracking-widest text-[9px] block mb-1">Today's Class Material Ready:</span>
                              <div className="flex items-center gap-2 text-gray-600 text-[11px]">
                                <Play className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                <span>Animated Ep: "How Ganesha Got His Trunk" (14 mins vid)</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-650 text-[11px] pt-1">
                                <FileText className="w-3.5 h-3.5 text-[#FFB6C1] shrink-0" />
                                <span className="underline cursor-pointer">Download: Diwali Custom Clay Craft Worksheet.pdf</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-gray-400">ID: {s.id}</span>
                            <div className="flex gap-2">
                              <button onClick={() => alert("Loading active Gurukul video classroom module lobby...")} className="px-4 py-2 bg-[#8B0000] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#FF6B00] transition-all flex items-center gap-1.5 shadow">
                                <Tv className="w-4 h-4" />
                                <span>Enter Classroom</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* Booking Modal & Stripe Gateway Portal Emulator */}
      {(bookingService || joiningSub) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border-2 border-[#D4A017] shadow-2xl max-w-lg w-full overflow-hidden transition-all max-h-[90vh] flex flex-col relative font-sans">
            
            {/* Modal Exit Button */}
            <button onClick={() => { setBookingService(null); setJoiningSub(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors z-30">
              <X className="w-5 h-5" />
            </button>

            {/* Header branding */}
            <div className="bg-gradient-to-r from-[#8B0000] via-[#FF6B00] to-[#8B0000] p-6 text-white border-b-2 border-[#D4A017]/30 text-center relative">
              <span className="text-3xl font-serif block mb-1">ॐ</span>
              <h3 className="font-yatra text-2xl tracking-normal">
                {bookingService ? "Book Live Video Pooja" : "Enroll Sanskriti Classmate"}
              </h3>
              <p className="text-[10px] tracking-widest uppercase text-[#FFF8F0]/85 font-semibold mt-1">
                {bookingService ? `Ritual Dakshina: ₹${bookingService.price}` : `Plan: ${joiningSub.name} - ₹${billingCycle === 'monthly' ? joiningSub.priceMonthly : joiningSub.priceYearly}`}
              </p>
            </div>

            {/* Stage: Fill Details Form Parameters */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {bookingStep === 'form' && (
                <form onSubmit={handleBookingFormSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]/80 mb-1">
                      Devotee / Parent Name <span className="text-red-650">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      placeholder="e.g. Sanskar Mishra"
                      className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]/80 mb-1">
                      Contact Phone Number <span className="text-red-650">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                    <span className="text-[9px] text-gray-400">Used strictly to text ritual alerts and live links.</span>
                  </div>

                  {bookingService && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]/80 mb-1">
                          Choose Date <span className="text-red-650">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]/80 mb-1">
                          Pick Time Slot <span className="text-red-650">*</span>
                        </label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full text-sm p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                        >
                          <option value="06:00 AM">06:00 AM (Auspicious Brahma Muhurta)</option>
                          <option value="08:00 AM">08:00 AM (Recommended Morning)</option>
                          <option value="11:00 AM">11:00 AM (Mid-day Sandhya)</option>
                          <option value="04:00 PM">04:00 PM (Pradosha Muhurta)</option>
                          <option value="07:00 PM">07:00 PM (Aarti hour)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {bookingService && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]/80 mb-1">
                        Select Shastri Panditji <span className="text-red-650">*</span>
                      </label>
                      <select
                        value={bookingPandit}
                        onChange={(e) => setBookingPandit(e.target.value)}
                        className="w-full text-sm p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                      >
                        {PANDITS.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.languages.join('/')}) - {p.experience}yrs Exp</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {!user && (
                    <div className="pt-2 bg-yellow-50 p-3 rounded-2xl border border-dashed border-yellow-400 text-xs text-amber-900 space-y-1">
                      <p className="font-semibold">⚠️ Guest checkout warning:</p>
                      <p>You aren't logged in. Log in or supply email below to receive confirmation receipt.</p>
                      <input
                        type="email"
                        value={payerEmail}
                        onChange={(e) => setPayerEmail(e.target.value)}
                        placeholder="e.g. yourname@example.com"
                        className="w-full p-2 bg-white text-xs text-gray-700 bg-white border border-[#D4A017]/30 rounded-lg mt-1"
                      />
                    </div>
                  )}

                  <div className="pt-4">
                    <button type="submit" className="w-full py-3.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow border border-[#D4A017] flex items-center justify-center gap-2">
                      <span>Proceed to Secure Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

              {/* Stage: Payment Gateway Stripe Simulation */}
              {bookingStep === 'payment' && (
                <div className="space-y-6">
                  
                  {/* Total Breakup review */}
                  <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#D4A017]/30 space-y-2 text-xs">
                    <span className="font-bold uppercase tracking-widest text-[#8B0000] text-[9px] block">Receipt Breakdown</span>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Selected Offering:</span>
                      <strong className="text-gray-700 font-semibold">{bookingService ? bookingService.name : `${joiningSub.name} (${billingCycle})`}</strong>
                    </div>
                    {bookingService && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Selected Priest:</span>
                        <strong className="text-gray-700 font-semibold">{PANDITS.find(p=>p.id===bookingPandit)?.name}</strong>
                      </div>
                    )}
                    <div className="h-[1px] bg-gray-200 my-2"></div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-800">Total Charged Mandate:</span>
                      <strong className="text-[#8B0000] font-black italic">₹{(bookingService ? bookingService.price : (billingCycle === 'monthly' ? joiningSub.priceMonthly : joiningSub.priceYearly)).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  {paymentStatus === 'none' && (
                    <form onSubmit={processSecurePayment} className="space-y-4">
                      
                      <div className="p-3.5 bg-green-50 rounded-xl border border-green-200 text-xs text-green-800 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                        <span>PCI-DSS Secured Vault Encryption Active</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]/80 mb-1">
                          Payment Mode
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button type="button" className="p-2.5 rounded-lg border-2 border-[#FF6B00] bg-[#FF6B00]/5 text-xs text-[#8B0000] font-bold tracking-wider flex items-center justify-center gap-1.5 focus:outline-none">
                            <CreditCard className="w-4 h-4 text-[#FF6B00]" />
                            <span>Credit / Debit Card</span>
                          </button>
                          <button type="button" onClick={() => alert("UPI QR integration loaded. Simply use dynamic payment checks above.")} className="p-2.5 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-500 flex items-center justify-center gap-1.5 focus:outline-none">
                            💳 Net Banking / UPI
                          </button>
                        </div>
                      </div>

                      {/* Card fields */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Secure Card Number (PCI Encrypted)</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={stripeCardNum}
                            onChange={(e) => {
                              // Auto add spacing for realistic UI
                              const val = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                              setStripeCardNum(val);
                            }}
                            placeholder="4242 4242 4242 4242 (Demo standard)"
                            className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-xl font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={stripeExpiry}
                              onChange={(e) => {
                                let val = e.target.value;
                                if (val.length === 2 && !val.includes('/')) {
                                  val += '/';
                                }
                                setStripeExpiry(val);
                              }}
                              placeholder="MM/YY"
                              className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-xl font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">CVC Code Link</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              value={stripeCvc}
                              onChange={(e) => setStripeCvc(e.target.value)}
                              placeholder="•••"
                              className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-xl font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Postal Zip Code</label>
                          <input
                            type="text"
                            required
                            value={stripeZip}
                            onChange={(e) => setStripeZip(e.target.value)}
                            placeholder="e.g. 560001 or 94043"
                            className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-xl font-mono"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button type="submit" disabled={paymentLoading} className={`w-full py-4 bg-[#FF6B00] text-white hover:bg-[#8B0000] disabled:bg-gray-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow border border-[#D4A017] flex items-center justify-center gap-2`}>
                          {paymentLoading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              <span>Authorizing Transactions via Gateways...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              <span>Authorize Secure Dakshina</span>
                            </>
                          )}
                        </button>
                        <div className="text-center text-[9px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                          <span>Secure SSL 128-bit verified transaction.</span>
                        </div>
                      </div>

                    </form>
                  )}

                  {/* Success Screen handler */}
                  {paymentStatus === 'success' && (
                    <div className="text-center py-6 space-y-4">
                      <span className="text-5xl block animate-bounce">🌸</span>
                      <h4 className="font-yatra text-2.5xl text-[#8B0000] uppercase">Divine Order Authorized</h4>
                      <p className="text-xs text-green-700 bg-green-50 p-3 rounded-xl border border-green-200 max-w-sm mx-auto">
                        Devout Transaction of ₹{(bookingService ? bookingService.price : (billingCycle === 'monthly' ? joiningSub.priceMonthly : joiningSub.priceYearly)).toLocaleString('en-IN')} approved successfully!
                      </p>
                      
                      <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                        {bookingService
                          ? `Your customized sat-sang room ID has been registered. Panditji will be online on ${bookingDate} at ${bookingTime}. Your physical Samagri ships tomorrow morning.`
                          : "Welcome to the PoojaGhar Parivaar! Your digital craft files, worksheets, and Ramayana video playlist portal have been prepared and unlocked under 'My Account'!"}
                      </p>

                      <div className="pt-6 border-t border-gray-100 flex gap-2">
                        <button onClick={() => { setBookingService(null); setJoiningSub(null); }} className="w-full py-3 bg-gray-100 text-[#3D2B1F] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all text-center">
                          Close Portal window
                        </button>
                        <a href="#profile-portal" onClick={() => { setBookingService(null); setJoiningSub(null); }} className="w-full py-3 bg-[#8B0000] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#FF6B00] transition-all text-center flex items-center justify-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>View My Account</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Failure Screen handler */}
                  {paymentStatus === 'failed' && (
                    <div className="text-center py-6 space-y-4">
                      <span className="text-5xl block">⚠️</span>
                      <h4 className="font-yatra text-2.5xl text-red-700">Authentication Failure</h4>
                      <p className="text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-250 max-w-sm mx-auto font-mono">
                        Error Code: GATEWAY_TRANS_REJECTED (Card verification failed - length should be 16 digits).
                      </p>
                      
                      <p className="text-xs text-gray-550 max-w-md mx-auto leading-relaxed">
                        Please review your card parameters (or use standard "4242" digits demo numbers with valid formats) and re-authenticate.
                      </p>

                      <div className="pt-6 border-t border-gray-100 flex gap-2">
                        <button onClick={() => setPaymentStatus('none')} className="w-full py-3 bg-[#8B0000] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#FF6B00] transition-all text-center">
                          ↩ Try Code Check again
                        </button>
                        <button onClick={() => { setBookingService(null); setJoiningSub(null); }} className="w-full py-3 bg-gray-100 text-gray-650 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-all text-center">
                          Cancel Checked Out
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Simple disclaimer */}
            <div className="bg-[#FFF8F0] p-3 text-center text-[9px] text-gray-400 border-t border-[#D4A017]/15">
              Securely monitored by PoojaGhar, Inc. Standard SSL & PCI tokens apply.
            </div>

          </div>
        </div>
      )}

      {/* Embedded Credentials Sign In / Sign Up Modal */}
      {authModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border-2 border-[#D4A017] shadow-2xl max-w-md w-full overflow-hidden relative">
            
            <button onClick={() => setAuthModal(prev => ({ ...prev, open: false }))} className="absolute top-4 right-4 text-gray-400 hover:text-red-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors z-20">
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-r from-[#8B0000] via-[#FF6B00] to-[#8B0000] p-6 text-white text-center">
              <span className="text-2xl font-serif">ॐ</span>
              <h3 className="font-yatra text-xl mt-1">
                {authModal.mode === 'signup' ? "Create Spiritual Credentials" : "Enter Altar Gates"}
              </h3>
              <p className="text-[10px] uppercase text-[#FFF8F0]/75 tracking-wider mt-1">
                Secure Cloud auth sync for Devotees
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
              {authError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-xs text-red-705 rounded text-center font-semibold">
                  {authError}
                </div>
              )}

              {authModal.mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Sanskar Mishra"
                      className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Secure Email Address</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. dev@example.com"
                  className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Vardit Password</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>

              <button type="submit" disabled={loadingAuth} className="w-full py-3.5 bg-[#8B0000] text-white hover:bg-[#FF6B00] disabled:bg-gray-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                {loadingAuth ? "Synchronizing Credentials..." : (authModal.mode === 'signup' ? "Register Credentials" : "Enter Altar")}
              </button>

              <div className="text-center pt-2">
                <button type="button" onClick={() => setAuthModal(prev => ({ ...prev, mode: prev.mode === 'signup' ? 'signin' : 'signup' }))} className="text-xs text-[#FF6B00] hover:underline font-semibold">
                  {authModal.mode === 'signup' ? "Possess credentials already? Sign In" : "New devotee? Create credentials here"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Dynamic Waitlist Registration Modal */}
      {waitlistModal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border-2 border-[#D4A017] shadow-2xl max-w-lg w-full overflow-hidden relative">
            
            <button onClick={() => setWaitlistModal({ open: false })} className="absolute top-4 right-4 text-gray-400 hover:text-red-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors z-20">
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-r from-[#8B0000] via-[#FF6B00] to-[#8B0000] p-6 text-white text-center">
              <span className="text-2xl font-serif text-yellow-300">ॐ</span>
              <h3 className="font-yatra text-2xl mt-1">Join the Priority Waitlist</h3>
              <p className="text-[10px] uppercase text-[#FFF8F0]/75 tracking-widest mt-1 font-sans">
                Secure Early Altar Access & Subscriptions
              </p>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="p-8 space-y-5 font-sans">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  placeholder="e.g. Sanskar Mishra"
                  className="w-full text-sm p-3 bg-gray-50 border border-gray-200 focus:border-[#FF6B00] focus:bg-white focus:outline-none rounded-xl transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="e.g. dev@example.com"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 focus:border-[#FF6B00] focus:bg-white focus:outline-none rounded-xl transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={waitlistPhone}
                    onChange={(e) => setWaitlistPhone(e.target.value)}
                    placeholder="e.g. +91 94557 66000"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 focus:border-[#FF6B00] focus:bg-white focus:outline-none rounded-xl transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Spiritual Interest Category</label>
                <select
                  value={waitlistInterest}
                  onChange={(e) => setWaitlistInterest(e.target.value)}
                  className="w-full text-sm p-3 bg-gray-50 border border-gray-200 focus:border-[#FF6B00] focus:bg-white focus:outline-none rounded-xl transition-all font-sans"
                >
                  <option value="gurukul">Traditional Gurukul Subscription Learning</option>
                  <option value="pooja">Sacred Live-Video Pooja Booking</option>
                  <option value="consultation">Personal Kundali / Astro Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Additional Prayer Requests / Notes</label>
                <textarea
                  value={waitlistNotes}
                  onChange={(e) => setWaitlistNotes(e.target.value)}
                  placeholder="Optional: Enter customized family intentions, child age, or pooja preferences..."
                  rows={2}
                  className="w-full text-sm p-3 bg-gray-50 border border-gray-200 focus:border-[#FF6B00] focus:bg-white focus:outline-none rounded-xl transition-all"
                ></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-[#8B0000] text-white hover:bg-[#FF6B00] rounded-xl text-xs font-bold uppercase tracking-widest border border-[#D4A017] transition-all shadow hover:shadow-md">
                Register & Secure Priority Position
              </button>

              <p className="text-[10px] text-center text-gray-400">
                🔒 We respect your privacy. Standard SMS alerts will be transmitted to coordinate invitations.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Smartphone SMS Notification Center for Owner (to preview incoming SMS alerts) */}
      {(user?.email === 'sanskarmishrasm@gmail.com' || 
        window.location.search.includes('admin') || 
        window.location.hash.includes('admin') || 
        window.location.search.includes('sms')) && (
        <div className="fixed bottom-6 right-6 z-40 font-sans">
          <div className="relative">
            {/* Main Toggle Button */}
            <button 
              onClick={() => {
                const elem = document.getElementById('sms-panel');
                if (elem) elem.classList.toggle('hidden');
              }}
              className="flex items-center gap-2 px-4 py-3 bg-[#FF6B00] text-white rounded-full shadow-2xl hover:bg-[#8B0000] transition-all border border-yellow-300/40 relative"
            >
              <Smartphone className="w-4 h-4 animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-wider">SMS Hub</span>
              {waitlistNotifications.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8B0000] text-white text-[10px] w-5.5 h-5.5 flex items-center justify-center font-bold rounded-full border-2 border-white animate-pulse">
                  {waitlistNotifications.length}
                </span>
              )}
            </button>

            {/* SMS Notification List Dropdown / Panel */}
            <div 
              id="sms-panel" 
              className="hidden absolute bottom-14 right-0 w-80 bg-stone-900 text-stone-100 rounded-3xl p-5 border border-[#D4A017]/40 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                <div className="flex items-center gap-1.5 text-[#FF6B00]">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-stone-300">Owner's Phone Simulator</span>
                </div>
                <span className="text-[9px] text-stone-500 font-mono">SMS Inboxes (+91 9455766000)</span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
                {waitlistNotifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-stone-500 italic">
                    No notifications received yet.<br />Submit the waitlist form above to see live SMS alerts arrive in real-time!
                  </div>
                ) : (
                  waitlistNotifications.map((noti: any) => (
                    <div key={noti.id} className="p-3 rounded-2xl border border-stone-800 text-xs space-y-1 bg-stone-800/80 animate-fade-in text-stone-300">
                      <div className="flex justify-between text-[10px] text-yellow-500 font-bold uppercase tracking-wider">
                        <span>💬 New SMS Received</span>
                        <span className="text-stone-500 font-mono font-normal">{noti.time}</span>
                      </div>
                      <p className="font-sans leading-relaxed break-words">{noti.message}</p>
                      <div className="text-[10px] text-stone-400 pt-1 font-mono">
                        Target Number: <strong>+91 94557 66000</strong>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {waitlistNotifications.length > 0 && (
                <button 
                  onClick={() => {
                    setWaitlistNotifications([]);
                    localStorage.removeItem('poojaghar_notifications');
                  }}
                  className="w-full text-center py-1.5 bg-stone-800 hover:bg-red-950 hover:text-red-300 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-stone-400"
                >
                  Clear SMS Log
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-[#8B0000] text-white border-t-4 border-[#D4A017] pt-16 pb-12 px-4 shadow-xl select-none min-h-[40vh] relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-serif text-[#D4A017]">ॐ</span>
              <span className="font-yatra text-2.5xl tracking-normal text-white">PoojaGhar</span>
            </div>
            <p className="text-xs text-[#FFF8F0]/80 leading-relaxed max-w-sm">
              An elegant spiritual sanctuary ecosystem conducting authorized Hindu video rituals and introducing custom epic scriptures to kids worldwide.
            </p>
            <div className="flex items-center gap-3 text-[#D4A017] text-xs font-semibold">
              <Phone className="w-4 h-4" /> <a href="tel:9455766000" className="hover:underline">9455766000</a>
            </div>
            <div className="flex items-center gap-3 text-[#D4A017] text-xs font-semibold">
              <Mail className="w-4 h-4" /> <a href="mailto:sanskarmishrasm@gmail.com" className="hover:underline">sanskarmishrasm@gmail.com</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4A017] font-bold">Vedic Rituals</h4>
            <ul className="space-y-2 text-xs text-[#FFF8F0]/75">
              <li><a href="#services" className="hover:text-white transition-colors">Sri Satyanarayan Chants</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Vastu Shanti Griha Pravesh</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Shanta Durga Saptashati</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Vighnaharta Ganesh Shanti</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4A017] font-bold">Kids Gurukul</h4>
            <ul className="space-y-2 text-xs text-[#FFF8F0]/75">
              <li><a href="#kids-gurukul" className="hover:text-white transition-colors">Bal Shishya Curriculum</a></li>
              <li><a href="#kids-gurukul" className="hover:text-white transition-colors">Dharma Seekh Craft Sets</a></li>
              <li><a href="#kids-gurukul" className="hover:text-white transition-colors">Sanskriti Pro Sanskrit Academy</a></li>
              <li><a href="#kids-gurukul" className="hover:text-white transition-colors">Epic Characters Quiz Hub</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4A017] font-bold">Social Roots</h4>
            <div className="flex gap-4.5 text-xs text-[#FFF8F0]/75">
              <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            </div>
            <p className="text-[10px] text-[#FFF8F0]/45 pt-4">© 2026 PoojaGhar Inc. Designed dynamically with Editorial Theme controls.</p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-[#D4A017]/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-[#FFF8F0]/50">
          <span>Devout Engineering for Contemporary Homes</span>
          <span className="italic font-serif normal-case text-xs text-[#D4A017] mt-2 sm:mt-0">Made with devotion 🙏</span>
        </div>
      </footer>

    </div>
  );
}
