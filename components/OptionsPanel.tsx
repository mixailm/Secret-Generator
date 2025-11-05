import React from 'react';
import { PasswordOptions, GenerationMode } from '../types';
import { Cog } from './Icon';

interface OptionsPanelProps {
  options: PasswordOptions;
  setOptions: React.Dispatch<React.SetStateAction<PasswordOptions>>;
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
  onOpenSettings: () => void;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-base font-semibold rounded-lg transition-colors flex-1 text-center ${
      active ? 'bg-brand-accent text-brand-primary' : 'bg-brand-secondary hover:bg-brand-accent/20 text-brand-text'
    }`}
  >
    {children}
  </button>
);

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string }> = ({ label, checked, onChange, name }) => (
    <label htmlFor={name} className="flex items-center space-x-3 cursor-pointer select-none">
        <div className="relative">
            <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} className="sr-only" />
            <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${checked ? 'bg-brand-accent' : 'bg-brand-primary'}`}></div>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'transform translate-x-5' : ''}`}></div>
        </div>
        <span className="text-brand-text">{label}</span>
    </label>
);


const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, setOptions, mode, setMode, onOpenSettings }) => {

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setOptions(prev => ({ ...prev, [name]: checked }));
    } else {
        setOptions(prev => ({ ...prev, [name]: name.includes('length') || name.includes('Words') ? Number(value) : value }));
    }
  };

  const handleLengthPreset = (len: number) => {
    setOptions(prev => ({ ...prev, length: len }));
  };

  const renderRandomOptions = () => {
    // Generate unique, sorted length presets including the current length
    const lengthPresets = [...new Set([options.length, 24, 32, 64])].sort((a, b) => a - b);
    
    return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="length" className="font-semibold">Length</label>
          <span className="text-brand-accent font-mono text-lg">{options.length}</span>
        </div>
        <input
          type="range"
          id="length"
          name="length"
          min="4"
          max="128"
          value={options.length}
          onChange={handleOptionChange}
          className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer accent-brand-accent"
        />
        <div className="flex justify-between mt-3 gap-2">
            {lengthPresets.map(len => (
                <button key={len} onClick={() => handleLengthPreset(len)} className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${options.length === len ? 'bg-brand-accent text-brand-primary' : 'bg-brand-primary hover:bg-brand-primary/50'}`}>
                    {len}
                </button>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <Checkbox name="includeLowercase" label="Lowercase (a-z)" checked={options.includeLowercase} onChange={handleOptionChange} />
        <Checkbox name="includeUppercase" label="Uppercase (A-Z)" checked={options.includeUppercase} onChange={handleOptionChange} />
        <Checkbox name="includeNumbers" label="Numbers (0-9)" checked={options.includeNumbers} onChange={handleOptionChange} />
        <Checkbox name="includeCommonSymbols" label="Symbols (!@#$%)" checked={options.includeCommonSymbols} onChange={handleOptionChange} />
        <Checkbox name="includeExtendedSymbols" label="Extended Symbols (~|/)" checked={options.includeExtendedSymbols} onChange={handleOptionChange} />
      </div>
      <hr className="border-brand-primary/50" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <Checkbox name="excludeSimilar" label="Exclude Similar (l, 1, O, 0)" checked={options.excludeSimilar} onChange={handleOptionChange} />
        <Checkbox name="excludeVowels" label="Exclude Vowels (a, e, i, o, u)" checked={options.excludeVowels} onChange={handleOptionChange} />
      </div>
       <div>
          <label htmlFor="customExclude" className="block text-sm font-semibold mb-2">Custom Exclude</label>
          <input
            type="text"
            id="customExclude"
            name="customExclude"
            value={options.customExclude}
            onChange={handleOptionChange}
            placeholder="e.g., abc123"
            className="w-full bg-brand-primary p-2 rounded-md border border-brand-secondary focus:ring-2 focus:ring-brand-accent focus:outline-none"
          />
        </div>
        <hr className="border-brand-primary/50" />
        <div className="text-left">
            <button 
            onClick={onOpenSettings} 
            aria-label="Open advanced settings"
            className="inline-flex items-center gap-2 text-brand-subtle hover:text-brand-accent transition-colors text-base"
            >
            <Cog className="w-6 h-6" />
            <span>Advanced Settings</span>
            </button>
        </div>
    </div>
  );
  }
  
  const renderPassphraseOptions = () => (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="passphraseWords" className="font-semibold">Number of Words</label>
          <span className="text-brand-accent font-mono text-lg">{options.passphraseWords}</span>
        </div>
        <input
          type="range"
          id="passphraseWords"
          name="passphraseWords"
          min="3"
          max="10"
          value={options.passphraseWords}
          onChange={handleOptionChange}
          className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer accent-brand-accent"
        />
      </div>
      <div>
        <label htmlFor="passphraseSeparator" className="block text-sm font-semibold mb-2">Separator</label>
        <select
          id="passphraseSeparator"
          name="passphraseSeparator"
          value={options.passphraseSeparator}
          onChange={handleOptionChange}
          className="w-full bg-brand-primary p-2 rounded-md border border-brand-secondary focus:ring-2 focus:ring-brand-accent focus:outline-none"
        >
          <option value="-">- (hyphen)</option>
          <option value=" "> (space)</option>
          <option value="_">_ (underscore)</option>
          <option value=".">. (period)</option>
          <option value=",">, (comma)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <Checkbox name="passphraseCapitalize" label="Capitalize Words" checked={options.passphraseCapitalize} onChange={handleOptionChange} />
        <Checkbox name="passphraseIncludeNumber" label="Include a Number" checked={options.passphraseIncludeNumber} onChange={handleOptionChange} />
      </div>
    </div>
  );

  const renderPinOptions = () => (
     <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="length" className="font-semibold">PIN Length</label>
          <span className="text-brand-accent font-mono text-lg">{options.length}</span>
        </div>
        <input
          type="range"
          id="length"
          name="length"
          min="4"
          max="16"
          value={options.length}
          onChange={handleOptionChange}
          className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer accent-brand-accent"
        />
      </div>
      <p className="text-sm text-brand-subtle text-center">PINs are generated using numbers (0-9) only.</p>
    </div>
  );

  return (
    <div className="bg-brand-secondary/50 p-6 rounded-lg">
      <div className="flex justify-center items-center gap-4 mb-6 border-b border-brand-primary/50 pb-4">
        <TabButton active={mode === 'random'} onClick={() => setMode('random')}>Random</TabButton>
        <TabButton active={mode === 'passphrase'} onClick={() => setMode('passphrase')}>Passphrase</TabButton>
        <TabButton active={mode === 'pin'} onClick={() => setMode('pin')}>PIN</TabButton>
      </div>
      <div className="min-h-[440px]">
        {mode === 'random' && renderRandomOptions()}
        {mode === 'passphrase' && renderPassphraseOptions()}
        {mode === 'pin' && renderPinOptions()}
      </div>
    </div>
  );
};

export default OptionsPanel;