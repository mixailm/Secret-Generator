import { useState, useEffect } from 'react';
import { Settings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

const SETTINGS_KEY = 'secretGeneratorSettings';

export const useSettings = (): { settings: Settings; saveSettings: (newSettings: Settings) => void } => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const savedSettingsJson = localStorage.getItem(SETTINGS_KEY);
      if (savedSettingsJson) {
        const savedSettings = JSON.parse(savedSettingsJson);
        // Merge with defaults to ensure all keys are present after updates
        setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage', error);
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  const saveSettings = (newSettings: Settings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save settings to localStorage', error);
    }
  };

  return { settings, saveSettings };
};
