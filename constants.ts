import { Settings } from './types';

export const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
export const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const NUMBER_CHARS = '0123456789';
export const COMMON_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,./?';
export const EXTENDED_SYMBOLS = '~`"\'<>\\';
export const SIMILAR_CHARS = 'l1IO0o|bB86S5Z2G';
export const VOWELS = 'aeiouAEIOU';

export const DEFAULT_SETTINGS: Settings = {
  defaultRandomLength: 24,
  defaultPinLength: 4,
  defaultIncludeLowercase: true,
  defaultIncludeUppercase: true,
  defaultIncludeNumbers: true,
  defaultIncludeCommonSymbols: true,
  defaultIncludeExtendedSymbols: true,
  defaultExcludeSimilar: true,
  defaultExcludeVowels: false,
  defaultPassphraseWords: 4,
  defaultPassphraseSeparator: '-',
  defaultPassphraseCapitalize: true,
  defaultPassphraseIncludeNumber: true,
  similarChars: SIMILAR_CHARS,
  vowels: VOWELS,
};


// A small subset of the EFF long wordlist for demonstration
export const EFF_WORDLIST = [
  'abacus', 'abdomen', 'abdominal', 'abide', 'abiding', 'ability', 'ablaze',
  'able', 'abnormal', 'abrasion', 'abrasive', 'abreast', 'abridge', 'abroad',
  'abruptly', 'absence', 'absentee', 'absently', 'absinthe', 'absolute',
  'absolve', 'absorb', 'abstain', 'abstract', 'absurd', 'accent', 'acclaim',
  'acclimate', 'accompany', 'account', 'accuracy', 'accurate', 'accustom',
  'acetone', 'achiness', 'aching', 'acid', 'acorn', 'acquaint', 'acquire',
  'acre', 'acrid', 'acrobat', 'acronym', 'acting', 'action', 'activate',
  'activator', 'active', 'activism', 'activist', 'activity', 'actor',
  'actress', 'acts', 'acutely', 'acuteness', 'aeration', 'aerobics', 'aerosol',
  'aerospace', 'afar', 'affair', 'affected', 'affecting', 'affection', 'affidavit',
  'affiliate', 'affirm', 'affix', 'afflict', 'affluent', 'afford', 'affront',
  'afloat', 'aflutter', 'afoot', 'afraid', 'afresh', 'afterglow', 'afterlife',
  'aftermath', 'aftermost', 'afternoon', 'aftershave', 'aftershock', 'aftertaste',
  'afterward', 'again', 'against', 'age', 'agency', 'agenda', 'agent',
  'aggregate', 'aggressive', 'aggressor', 'aggrieve', 'aghast', 'agile',
  'agility', 'aging', 'agnostic', 'agonize', 'agonizing', 'agony', 'agreeable',
  'agreeably', 'agreed', 'agreeing', 'agreement', 'aground', 'ahead', 'ahoy',
  'aide', 'aiding', 'ailment', 'aim', 'aimless', 'airplane', 'airport',
  'airship', 'airspace', 'airtight', 'airway', 'aisle', 'ajar', 'alabaster',
  'alarm', 'alarming', 'alarmist', 'albacore', 'album', 'alcohol', 'alcove',
  'alert', 'alertness', 'alfalfa', 'algebra', 'algorithm', 'alias', 'alibi'
];
