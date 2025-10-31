import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from './Icon';

interface PasswordDisplayProps {
  password: string;
  onRefresh: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onRefresh }) => {
  const [copied, setCopied] = useState(false);

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
    }
  };

  return (
    <div className="relative bg-brand-primary p-4 rounded-lg flex items-center">
      <span 
        aria-live="polite"
        className="font-mono text-xl md:text-2xl text-brand-text flex-grow break-all pr-24"
      >
        {password || <span className="text-brand-subtle">Generating password...</span>}
      </span>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
        <button
          onClick={onRefresh}
          aria-label="Generate new password"
          className="text-brand-subtle hover:text-brand-accent transition-colors"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied password' : 'Copy password'}
          className="text-brand-subtle hover:text-brand-accent transition-colors"
        >
          {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordDisplay;
