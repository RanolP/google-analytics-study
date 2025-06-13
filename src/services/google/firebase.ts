import { initializeApp } from 'firebase/app';
import {
  getAnalytics,
  logEvent,
  setUserId,
  setUserProperties,
} from 'firebase/analytics';
import { Environment, Google } from '@/shared/constants';

const app = initializeApp(Google.Firebase.Config);
const analytics = getAnalytics(app);

export const Firebase = {
  logEvent(name: string, params?: Record<string, unknown>) {
    if (Environment.isDevelopment) {
      console.debug(`[firebase/event] ${name}`, params);
    }
    logEvent(analytics, name, params);
  },
  setUserId(id: string) {
    setUserId(analytics, id);
  },
  eraseUserId() {
    setUserId(analytics, null);
  },
  setUserProperty(key: string, value: unknown) {
    setUserProperties(analytics, { [key]: value });
  },
  eraseUserProperty(key: string) {
    setUserProperties(analytics, { [key]: null });
  },
  setUserProperties(properties: Record<string, unknown>) {
    setUserProperties(analytics, properties);
  },
};
