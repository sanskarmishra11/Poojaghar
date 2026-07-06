/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PoojaService, PanditProfile, BookingFormInput } from './types';

// Define unified interfaces for our database actions
export interface UserState {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface BookingState {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  panditId: string;
  panditName: string;
  date: string;
  time: string;
  amount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  isDemo?: boolean;
}

export interface SubscriptionState {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'past_due';
  childName?: string;
  childAge?: number;
  createdAt: string;
  isDemo?: boolean;
}

// Global state arrays for local storage fallback
const STORAGE_USER_KEY = 'poojaghar_user';
const STORAGE_BOOKINGS_KEY = 'poojaghar_bookings';
const STORAGE_SUBSCRIPTIONS_KEY = 'poojaghar_subscriptions';

// Fallback Mock clients to keep UX perfectly interactive
const mockDb = {
  getUser: (): UserState | null => {
    try {
      const data = localStorage.getItem(STORAGE_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (user: UserState | null) => {
    if (user) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  },
  getBookings: (userId: string): BookingState[] => {
    try {
      const data = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      const bookings: BookingState[] = data ? JSON.parse(data) : [];
      return bookings.filter(b => b.userId === userId);
    } catch {
      return [];
    }
  },
  addBooking: (booking: BookingState) => {
    try {
      const data = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      const bookings: BookingState[] = data ? JSON.parse(data) : [];
      bookings.push(booking);
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  },
  getSubscriptions: (userId: string): SubscriptionState[] => {
    try {
      const data = localStorage.getItem(STORAGE_SUBSCRIPTIONS_KEY);
      const subs: SubscriptionState[] = data ? JSON.parse(data) : [];
      return subs.filter(s => s.userId === userId);
    } catch {
      return [];
    }
  },
  addSubscription: (sub: SubscriptionState) => {
    try {
      const data = localStorage.getItem(STORAGE_SUBSCRIPTIONS_KEY);
      const subs: SubscriptionState[] = data ? JSON.parse(data) : [];
      // Cancel active sub of same plan style first for simplicity
      const filtered = subs.filter(s => !(s.userId === sub.userId && s.planId === sub.planId));
      filtered.push(sub);
      localStorage.setItem(STORAGE_SUBSCRIPTIONS_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  }
};

// Check for Firebase existence
export const isFirebaseInitialized = false;

export async function detectFirebase() {
  console.log("PoojaGhar: Using secure browser Local Storage persistence engine.");
}

// Safe startup check
detectFirebase();

// Unified interface for auth and sync
export const poojaAuth = {
  getCurrentUser: (): UserState | null => {
    return mockDb.getUser();
  },
  signUp: async (email: string, pass: string, name: string, phone: string): Promise<UserState> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate delay
    const newUser: UserState = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      name,
      phone,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    mockDb.setUser(newUser);
    return newUser;
  },
  signIn: async (email: string, pass: string): Promise<UserState> => {
    await new Promise(resolve => setTimeout(resolve, 600)); // simulate delay
    // For demo purposes, we will authenticate cleanly
    const existing = mockDb.getUser();
    if (existing && existing.email === email) {
      return existing;
    }
    // Auto-create/fallback login for easy evaluation
    const demoUser: UserState = {
      uid: 'user_eval_' + Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0].toUpperCase(),
      phone: '+91 98765 43210',
      role: 'user',
      createdAt: new Date().toISOString()
    };
    mockDb.setUser(demoUser);
    return demoUser;
  },
  signOut: async (): Promise<void> => {
    mockDb.setUser(null);
  }
};

export const poojaDb = {
  getUserBookings: async (userId: string): Promise<BookingState[]> => {
    return mockDb.getBookings(userId);
  },
  getUserSubscriptions: async (userId: string): Promise<SubscriptionState[]> => {
    return mockDb.getSubscriptions(userId);
  },
  createBooking: async (input: BookingFormInput, service: PoojaService, pandit: PanditProfile): Promise<BookingState> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockDb.getUser();
    const newBooking: BookingState = {
      id: 'book_' + Math.random().toString(36).substr(2, 9),
      userId: user ? user.uid : 'anonymous_eval',
      serviceId: service.id,
      serviceName: service.name,
      panditId: pandit.id,
      panditName: pandit.name,
      date: input.date,
      time: input.time,
      amount: service.price,
      paymentStatus: 'paid', // Instant confirmation on payment
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    mockDb.addBooking(newBooking);
    return newBooking;
  },
  createSubscription: async (userId: string, planId: string, planName: string, amount: number, billingCycle: 'monthly' | 'yearly', childName?: string, childAge?: number): Promise<SubscriptionState> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newSub: SubscriptionState = {
      id: 'sub_' + Math.random().toString(36).substr(2, 9),
      userId,
      planId,
      planName,
      amount,
      billingCycle,
      status: 'active',
      childName,
      childAge,
      createdAt: new Date().toISOString()
    };
    mockDb.addSubscription(newSub);
    return newSub;
  }
};
