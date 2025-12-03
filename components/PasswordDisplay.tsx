import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, RefreshCw } from './Icon';

interface PasswordDisplayProps {
  password: string;
  onRefresh: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onRefresh }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      inputRef.current?.select();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="bg-brand-primary p-4 rounded-lg flex items-center justify-between group">
      <input 
        ref={inputRef}
        type="text" 
        value={password}
        readOnly
        placeholder="Generating..."
        onFocus={handleFocus}
        className="flex-grow bg-transparent font-mono text-xl md:text-2xl text-brand-text placeholder-brand-subtle/50 focus:outline-none min-w-0 mr-4 cursor-text text-ellipsis overflow-hidden"
        aria-label="Generated Password"
      />
      
      <div className="flex items-center space-x-3 shrink-0">
        <button
          onClick={onRefresh}
          aria-label="Generate new password"
          className="text-brand-subtle hover:text-brand-accent transition-colors focus:outline-none focus:text-brand-accent"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied password' : 'Copy password'}
          className="text-brand-subtle hover:text-brand-accent transition-colors focus:outline-none focus:text-brand-accent"
        >
          {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordDisplay;