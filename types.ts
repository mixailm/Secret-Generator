export type GenerationMode = 'random' | 'passphrase' | 'pin';

export interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeCommonSymbols: boolean;
  includeExtendedSymbols: boolean;
  excludeSimilar: boolean;
  excludeVowels: boolean;
  customExclude: string;
  passphraseWords: number;
  passphraseSeparator: string;
  passphraseCapitalize: boolean;
  passphraseIncludeNumber: boolean;
}

export interface Settings {
  defaultRandomLength: number;
  defaultPinLength: number;
  defaultIncludeLowercase: boolean;
  defaultIncludeUppercase: boolean;
  defaultIncludeNumbers: boolean;
  defaultIncludeCommonSymbols: boolean;
  defaultIncludeExtendedSymbols: boolean;
  defaultExcludeSimilar: boolean;
  defaultExcludeVowels: boolean;
  defaultPassphraseWords: number;
  defaultPassphraseSeparator: string;
  defaultPassphraseCapitalize: boolean;
  defaultPassphraseIncludeNumber: boolean;
  similarChars: string;
  vowels: string;
}


// FIX: Add missing AnalysisResult type used in geminiService.ts.
export interface AnalysisResult {
  strength: string;
  suggestions: string[];
}
