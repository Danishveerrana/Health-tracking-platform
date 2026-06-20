// useHealthNotifications.js
// Drop into src/, then in App.jsx: import { useHealthNotifications } from './useHealthNotifications';
// Call useHealthNotifications() once inside your top-level App component.

import { useEffect, useRef } from 'react';

// 4 slots, each with several message variants so it doesn't feel repetitive.
// A variant is picked based on the day-of-year, so it rotates daily but stays
// consistent if the notification fires more than once on the same day.
const SLOTS = [
  {
    hour: 9,
    minute: 0,
    title: '☀️ Morning check-in',
    variants: [
      "Good morning! Log how you're starting the day.",
      "Rise and shine — tick off your morning habits.",
      "New day, clean slate. Mark today's habits.",
    ],
  },
  {
    hour: 15,
    minute: 0,
    title: '🌤️ Afternoon nudge',
    variants: [
      "Midday check — how's the day going so far?",
      "Quick pause: update your habit tracker.",
      "Afternoon slump? Log your progress and keep going.",
    ],
  },
  {
    hour: 18,
    minute: 0,
    title: '🌇 Evening reminder',
    variants: [
      "Evening's here — mark off what you've completed today.",
      "Almost done with the day. Update your tracker.",
      "Don't forget to log today's habits before dinner.",
    ],
  },
  {
    hour: 22,
    minute: 0,
    title: '🌙 Night wrap-up',
    variants: [
      "Last call — finalize today's habit log before bed.",
      "Wrap up the day: mark anything left undone.",
      "End the day right — confirm your habit entries.",
    ],
  },
];

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

function pickVariant(variants, date) {
  return variants[dayOfYear(date) % variants.length];
}

function msUntilNext(hour, minute) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

function fireNotification(slot) {
  if (Notification.permission !== 'granted') return;
  const body = pickVariant(slot.variants, new Date());
  new Notification(slot.title, {
    body,
    icon: '/favicon.svg',
    tag: `habit-${slot.hour}${slot.minute}`, // prevents duplicate stacking
  });
}

export function useHealthNotifications() {
  const timeouts = useRef([]);

  useEffect(() => {
    if (!('Notification' in window)) return;

    // Ask for permission automatically, but only once ever
    // (first time the app is opened, or first time after this update).
    const askedKey = 'ht_notif_asked';
    if (Notification.permission === 'default' && !localStorage.getItem(askedKey)) {
      Notification.requestPermission().finally(() => {
        try { localStorage.setItem(askedKey, '1'); } catch {}
      });
    }

    function scheduleAll() {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = SLOTS.map((slot) => {
        const delay = msUntilNext(slot.hour, slot.minute);
        return setTimeout(() => {
          fireNotification(slot);
          scheduleAll(); // re-schedule for the next day right after firing
        }, delay);
      });
    }

    scheduleAll();

    return () => timeouts.current.forEach(clearTimeout);
  }, []);
}

// Optional: call this from a settings toggle/button to request permission
// explicitly (browsers require a user gesture for the prompt to show).
export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.requestPermission();
}
