import { GenerationMode, PasswordOptions } from '../types';
import { 
  LOWERCASE_CHARS, 
  UPPERCASE_CHARS, 
  NUMBER_CHARS, 
  COMMON_SYMBOLS, 
  EXTENDED_SYMBOLS, 
  EFF_WORDLIST 
} from '../constants';

function secureRandom(max: number): number {
  const randoms = new Uint32Array(1);
  crypto.getRandomValues(randoms);
  return randoms[0] % max;
}

function generateRandomPassword(options: PasswordOptions, similarChars: string, vowels: string): string {
  let charPool = '';
  if (options.includeLowercase) charPool += LOWERCASE_CHARS;
  if (options.includeUppercase) charPool += UPPERCASE_CHARS;
  if (options.includeNumbers) charPool += NUMBER_CHARS;
  if (options.includeCommonSymbols) charPool += COMMON_SYMBOLS;
  if (options.includeExtendedSymbols) charPool += EXTENDED_SYMBOLS;

  let excludeChars = options.customExclude;
  if (options.excludeSimilar) excludeChars += similarChars;
  if (options.excludeVowels) excludeChars += vowels;

  if (excludeChars) {
    const excludeSet = new Set(excludeChars.split(''));
    charPool = charPool.split('').filter(char => !excludeSet.has(char)).join('');
  }

  if (!charPool) {
    throw new Error("Cannot generate password. The character pool is empty. Please select at least one character set.");
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += charPool[secureRandom(charPool.length)];
  }

  return password;
}

function generatePassphrase(options: PasswordOptions): string {
    const words = [];
    for (let i = 0; i < options.passphraseWords; i++) {
        const randomIndex = secureRandom(EFF_WORDLIST.length);
        let word = EFF_WORDLIST[randomIndex];
        if (options.passphraseCapitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        words.push(word);
    }

    let passphrase = words.join(options.passphraseSeparator);

    if (options.passphraseIncludeNumber) {
        const num = secureRandom(10);
        const position = secureRandom(passphrase.length + 1);
        passphrase = passphrase.slice(0, position) + num + passphrase.slice(position);
    }
    
    return passphrase;
}

function generatePin(options: PasswordOptions): string {
  let pin = '';
  for (let i = 0; i < options.length; i++) {
    pin += NUMBER_CHARS[secureRandom(NUMBER_CHARS.length)];
  }
  return pin;
}


export const generatePassword = (mode: GenerationMode, options: PasswordOptions, similarChars: string, vowels: string): string => {
  switch (mode) {
    case 'random':
      return generateRandomPassword(options, similarChars, vowels);
    case 'passphrase':
      return generatePassphrase(options);
    case 'pin':
        return generatePin(options);
    default:
      throw new Error('Invalid generation mode selected.');
  }
};
