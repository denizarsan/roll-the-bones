import Ability from '@/classes/Ability';

const ABILITIES_BASE = [
  new Ability('STR', 8),
  new Ability('DEX', 8),
  new Ability('CON', 8),
  new Ability('INT', 8),
  new Ability('WIS', 8),
  new Ability('CHA', 8),
];

const AUTH_PERIOD = 60000;
const AUTH_DELAY = 1000;

const DICE_DEFAULT = [
  { kind: 'd4', count: 0 },
  { kind: 'd6', count: 0 },
  { kind: 'd8', count: 0 },
  { kind: 'd10', count: 0 },
  { kind: 'd12', count: 0 },
  { kind: 'd20', count: 0 },
];

const DICE_1D6 = [
  { kind: 'd4', count: 0 },
  { kind: 'd6', count: 1 },
  { kind: 'd8', count: 0 },
  { kind: 'd10', count: 0 },
  { kind: 'd12', count: 0 },
  { kind: 'd20', count: 0 },
];

const DICE_1D8 = [
  { kind: 'd4', count: 0 },
  { kind: 'd6', count: 0 },
  { kind: 'd8', count: 1 },
  { kind: 'd10', count: 0 },
  { kind: 'd12', count: 0 },
  { kind: 'd20', count: 0 },
];

const DICE_1D10 = [
  { kind: 'd4', count: 0 },
  { kind: 'd6', count: 0 },
  { kind: 'd8', count: 0 },
  { kind: 'd10', count: 1 },
  { kind: 'd12', count: 0 },
  { kind: 'd20', count: 0 },
];

const DICE_1D12 = [
  { kind: 'd4', count: 0 },
  { kind: 'd6', count: 0 },
  { kind: 'd8', count: 0 },
  { kind: 'd10', count: 0 },
  { kind: 'd12', count: 1 },
  { kind: 'd20', count: 0 },
];

const DICE_1D20 = [
  { kind: 'd4', count: 0 },
  { kind: 'd6', count: 0 },
  { kind: 'd8', count: 0 },
  { kind: 'd10', count: 0 },
  { kind: 'd12', count: 0 },
  { kind: 'd20', count: 1 },
];

const CLASS_CONSTANTS = {
  Barbarian: { hitDice: DICE_1D12, savingThrows: ['STR', 'CON'], spellCast: '' },
  Bard: { hitDice: DICE_1D8, savingThrows: ['CHA', 'DEX'], spellCast: 'CHA' },
  Cleric: { hitDice: DICE_1D8, savingThrows: ['WIS', 'CHA'], spellCast: 'WIS' },
  Druid: { hitDice: DICE_1D8, savingThrows: ['INT', 'WIS'], spellCast: 'WIS' },
  Fighter: { hitDice: DICE_1D10, savingThrows: ['STR', 'CON'], spellCast: 'INT' },
  Monk: { hitDice: DICE_1D8, savingThrows: ['STR', 'DEX'], spellCast: 'WIS' },
  Paladin: { hitDice: DICE_1D10, savingThrows: ['WIS', 'CHA'], spellCast: 'CHA' },
  Ranger: { hitDice: DICE_1D10, savingThrows: ['STR', 'DEX'], spellCast: 'WIS' },
  Rogue: { hitDice: DICE_1D8, savingThrows: ['DEX', 'INT'], spellCast: 'INT' },
  Sorcerer: { hitDice: DICE_1D6, savingThrows: ['CON', 'CHA'], spellCast: 'CHA' },
  Warlock: { hitDice: DICE_1D8, savingThrows: ['WIS', 'CHA'], spellCast: 'CHA' },
  Wizard: { hitDice: DICE_1D6, savingThrows: ['INT', 'WIS'], spellCast: 'INT' },
};

const ROLL_DICES_DEFAULT = DICE_DEFAULT;
const ROLL_MODIFIER_DEFAULT = 0;
const ROLL_NAME_DEFAULT = '';
const ROLL_STRING_BASE = '!roll';

const SKILLS_BASE = [
  { name: 'Acrobatics', ability: 'DEX', proficient: false },
  { name: 'Animal Handling', ability: 'WIS', proficient: false },
  { name: 'Arcana', ability: 'INT', proficient: false },
  { name: 'Athletics', ability: 'STR', proficient: false },
  { name: 'Deception', ability: 'CHA', proficient: false },
  { name: 'History', ability: 'INT', proficient: false },
  { name: 'Insight', ability: 'WIS', proficient: false },
  { name: 'Intimidation', ability: 'CHA', proficient: false },
  { name: 'Investigation', ability: 'INT', proficient: false },
  { name: 'Medicine', ability: 'WIS', proficient: false },
  { name: 'Nature', ability: 'INT', proficient: false },
  { name: 'Perception', ability: 'WIS', proficient: false },
  { name: 'Performance', ability: 'CHA', proficient: false },
  { name: 'Persuasion', ability: 'CHA', proficient: false },
  { name: 'Religion', ability: 'INT', proficient: false },
  { name: 'Sleight of Hand', ability: 'DEX', proficient: false },
  { name: 'Stealth', ability: 'DEX', proficient: false },
  { name: 'Survival', ability: 'WIS', proficient: false },
];

export {
  AUTH_DELAY,
  AUTH_PERIOD,
  ABILITIES_BASE,
  CLASS_CONSTANTS,
  DICE_DEFAULT,
  DICE_1D20,
  ROLL_DICES_DEFAULT,
  ROLL_MODIFIER_DEFAULT,
  ROLL_NAME_DEFAULT,
  ROLL_STRING_BASE,
  SKILLS_BASE,
};
