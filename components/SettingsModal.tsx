import React, { useState, useEffect } from 'react';
import { Settings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (newSettings: Settings) => void;
}

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string }> = ({ label, checked, onChange, name }) => (
    <label htmlFor={name} className="flex items-center space-x-3 cursor-pointer select-none">
        <div className="relative">
            <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} className="sr-only" />
            <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${checked ? 'bg-brand-accent' : 'bg-brand-primary'}`}></div>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'transform translate-x-5' : ''}`}></div>
        </div>
        <span className={`transition-colors ${checked ? 'text-brand-text' : 'text-brand-subtle'}`}>{label}</span>
    </label>
);

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState<Settings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setLocalSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setLocalSettings(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    }
  };
  
  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div 
        className="bg-brand-secondary rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-brand-primary/50 sticky top-0 bg-brand-secondary z-10">
          <h2 id="settings-title" className="text-2xl font-bold text-brand-text">Default Settings</h2>
          <p className="text-brand-subtle">These settings will be used when you first load the app.</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Random Password */}
          <section>
            <h3 className="text-lg font-semibold text-brand-accent mb-4">Random Password Defaults</h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-brand-text">Default Length: {localSettings.defaultRandomLength}</span>
                <input type="range" name="defaultRandomLength" min="4" max="128" value={localSettings.defaultRandomLength} onChange={handleChange} className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer accent-brand-accent" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox name="defaultIncludeLowercase" label="Include Lowercase (a-z)" checked={localSettings.defaultIncludeLowercase} onChange={handleChange} />
                <Checkbox name="defaultIncludeUppercase" label="Include Uppercase (A-Z)" checked={localSettings.defaultIncludeUppercase} onChange={handleChange} />
                <Checkbox name="defaultIncludeNumbers" label="Include Numbers (0-9)" checked={localSettings.defaultIncludeNumbers} onChange={handleChange} />
                <Checkbox name="defaultIncludeCommonSymbols" label="Include Symbols (!@#$%)" checked={localSettings.defaultIncludeCommonSymbols} onChange={handleChange} />
                <Checkbox name="defaultIncludeExtendedSymbols" label="Include Extended Symbols (~|/)" checked={localSettings.defaultIncludeExtendedSymbols} onChange={handleChange} />
                <Checkbox name="defaultExcludeSimilar" label="Exclude Similar (l, 1, O, 0)" checked={localSettings.defaultExcludeSimilar} onChange={handleChange} />
                 <Checkbox name="defaultExcludeVowels" label="Exclude Vowels (a, e, i, o, u)" checked={localSettings.defaultExcludeVowels} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* Passphrase */}
          <section>
            <h3 className="text-lg font-semibold text-brand-accent mb-4">Passphrase Defaults</h3>
             <div className="space-y-4">
                <label className="block">
                    <span className="text-brand-text">Default Word Count: {localSettings.defaultPassphraseWords}</span>
                    <input type="range" name="defaultPassphraseWords" min="3" max="10" value={localSettings.defaultPassphraseWords} onChange={handleChange} className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer accent-brand-accent" />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Checkbox name="defaultPassphraseCapitalize" label="Capitalize Words" checked={localSettings.defaultPassphraseCapitalize} onChange={handleChange} />
                    <Checkbox name="defaultPassphraseIncludeNumber" label="Include a Number" checked={localSettings.defaultPassphraseIncludeNumber} onChange={handleChange} />
                </div>
            </div>
          </section>

           {/* PIN */}
           <section>
            <h3 className="text-lg font-semibold text-brand-accent mb-4">PIN Defaults</h3>
             <div className="space-y-4">
                <label className="block">
                    <span className="text-brand-text">Default PIN Length: {localSettings.defaultPinLength}</span>
                    <input type="range" name="defaultPinLength" min="4" max="16" value={localSettings.defaultPinLength} onChange={handleChange} className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer accent-brand-accent" />
                </label>
            </div>
          </section>

          {/* Advanced */}
          <section>
            <h3 className="text-lg font-semibold text-brand-accent mb-4">Advanced Configuration</h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-brand-text font-semibold mb-1 block">Similar Characters to Exclude</span>
                <textarea name="similarChars" value={localSettings.similarChars} onChange={handleChange} rows={2} className="w-full bg-brand-primary p-2 rounded-md border border-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:outline-none font-mono"></textarea>
              </label>
               <label className="block">
                <span className="text-brand-text font-semibold mb-1 block">Vowels to Exclude</span>
                <textarea name="vowels" value={localSettings.vowels} onChange={handleChange} rows={2} className="w-full bg-brand-primary p-2 rounded-md border border-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:outline-none font-mono"></textarea>
              </label>
            </div>
          </section>

        </div>
        <div className="p-6 flex justify-end items-center gap-4 border-t border-brand-primary/50 sticky bottom-0 bg-brand-secondary z-10">
          <button onClick={onClose} className="px-6 py-2 font-semibold rounded-lg bg-brand-primary hover:bg-opacity-80 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 font-semibold rounded-lg bg-brand-accent text-brand-primary hover:bg-opacity-80 transition-colors">Save & Close</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;