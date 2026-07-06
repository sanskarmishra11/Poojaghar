/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PoojaService {
  id: string;
  name: string;
  hindiName?: string;
  duration: string;
  price: number;
  description: string;
  included: {
    samagri: string[];
    prasad: string;
    certificate: boolean;
  };
  category: 'Live Pooja' | 'Festivals' | 'Special Havans';
  rating: number;
  popular?: boolean;
  image?: string;
}

export interface PanditProfile {
  id: string;
  name: string;
  languages: string[];
  experience: number;
  rating: number;
  specialization: string[];
  quote: string;
  mantra: string;
  avatarSeed: string; // for custom avatar rendering
  image?: string;
  videoUrl?: string;
  videoDuration?: string;
  videoTitle?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  subName: string;
  priceMonthly: number;
  priceYearly: number;
  ageGroup: string;
  description: string;
  learnItems: string[];
  features: {
    storyClasses: string;
    worksheets: string;
    craftsQuiz: string;
    oneOnOne: string;
    certificate: string;
  };
  isPopular?: boolean;
  themeColor: string; // Tailwind tint
  accentColor: string; // Border color accent
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Parent' | 'Devotee' | 'Dispatched Family';
  location: string;
  text: string;
  rating: number;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BookingFormInput {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  panditId: string;
  date: string;
  time: string;
  notes?: string;
}
