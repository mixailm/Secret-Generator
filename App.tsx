import React, { useState, useEffect, useCallback } from 'react';
import { PasswordOptions, GenerationMode, Settings } from './types';
import { generatePassword } from './utils/passwordGenerator';
import { useSettings } from './hooks/useSettings';
import { getInitialOptions } from './utils/settingsHelper';
import PasswordDisplay from './components/PasswordDisplay';
import OptionsPanel from './components/OptionsPanel';
import SettingsModal from './components/SettingsModal';
import { Cog } from './components/Icon';

const App: React.FC = () => {
  const { settings, saveSettings } = useSettings();
  
  const [options, setOptions] = useState<PasswordOptions>(() => getInitialOptions(settings));
  const [mode, setMode] = useState<GenerationMode>('random');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setOptions(getInitialOptions(settings));
  }, [settings]);

  const handleGenerate = useCallback(() => {
    setError('');
    try {
      const newPassword = generatePassword(mode, options, settings.similarChars, settings.vowels);
      setPassword(newPassword);
    } catch (e: any) {
      setError(e.message);
      setPassword('');
    }
  }, [mode, options, settings]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleSetMode = (newMode: GenerationMode) => {
    setMode(newMode);
    if (newMode === 'pin') {
        setOptions(prev => ({ ...prev, length: settings.defaultPinLength }));
    } else if (newMode === 'random') {
        setOptions(prev => ({ ...prev, length: settings.defaultRandomLength }));
    }
  };

  const handleSaveSettings = (newSettings: Settings) => {
    saveSettings(newSettings);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-primary font-sans flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-2">Password Generator</h1>
        </header>
        
        <main className="bg-brand-secondary rounded-lg shadow-2xl p-6 md:p-8 space-y-6">
          <PasswordDisplay 
            password={password}
            onRefresh={handleGenerate}
          />
          
          {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md text-center">{error}</div>}
          
          <OptionsPanel 
            options={options} 
            setOptions={setOptions} 
            mode={mode} 
            setMode={handleSetMode}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </main>
        
        <footer className="text-center mt-8 text-brand-subtle text-sm">
          <p>&copy; {new Date().getFullYear()} SecureGen. All rights reserved.</p>
        </footer>
      </div>
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default App;