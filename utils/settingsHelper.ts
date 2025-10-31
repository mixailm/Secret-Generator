import { PasswordOptions, Settings } from '../types';

export const getInitialOptions = (settings: Settings): PasswordOptions => ({
  length: settings.defaultRandomLength,
  includeLowercase: settings.defaultIncludeLowercase,
  includeUppercase: settings.defaultIncludeUppercase,
  includeNumbers: settings.defaultIncludeNumbers,
  includeCommonSymbols: settings.defaultIncludeCommonSymbols,
  includeExtendedSymbols: settings.defaultIncludeExtendedSymbols,
  excludeSimilar: settings.defaultExcludeSimilar,
  excludeVowels: settings.defaultExcludeVowels,
  customExclude: '',
  passphraseWords: settings.defaultPassphraseWords,
  passphraseSeparator: settings.defaultPassphraseSeparator,
  passphraseCapitalize: settings.defaultPassphraseCapitalize,
  passphraseIncludeNumber: settings.defaultPassphraseIncludeNumber,
});
