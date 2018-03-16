import { CLASS_CONSTANTS, DICE_1D20 } from '@/utils/constants';
import Ability from '@/classes/Ability';
import Roll from '@/classes/Roll';

export default class Character {
  constructor(name, klass, level, abilities, skills, rolls) {
    this.name = name;
    this.class = klass;
    this.level = level;
    this.abilities = abilities.map(ability => new Ability(ability.name, ability.value));
    this.skills = skills.map(skill => Object.assign({}, skill));
    this.rolls = rolls.map(roll => new Roll(roll.name, roll.dices, roll.modifier));
    this.initiativeBonus = 0;
    this.attackHitBonus = 0;
    this.spellHitBonus = 0;
  }

  get proficiencyBonus() {
    return Math.floor((this.level + 7) / 4);
  }

  get initiative() {
    return this.abilities.find(ability => ability.name === 'DEX').modifier + this.initiativeBonus;
  }

  get hitDice() {
    return CLASS_CONSTANTS[this.class].hitDice;
  }

  get spellcastingModifier() {
    const spellcastAbilityName = CLASS_CONSTANTS[this.class].spellCast;
    const spellcastAbility = this.abilities.find(ability => ability.name === spellcastAbilityName);
    return (spellcastAbilityName && spellcastAbility.modifier) || 0;
  }

  get spellHit() {
    return this.spellcastingModifier + this.proficiencyBonus + this.spellHitBonus;
  }

  get initiativeRoll() {
    return new Roll('Initiative', DICE_1D20, this.initiative);
  }

  get hitDiceRoll() {
    const modifier = this.abilities.find(ability => ability.name === 'CON').modifier;
    return new Roll('Hit Dice + CON', this.hitDice, modifier);
  }

  get spellHitRoll() {
    return new Roll('Spell Hit', DICE_1D20, this.spellcastingModifier + this.proficiencyBonus + this.spellHitBonus);
  }

  get attackHitRoll() {
    return new Roll('Attack Hit', DICE_1D20, this.attackHitBonus);
  }

  get skillRolls() {
    return this.skills.map((skill) => {
      let modifier = this.abilities.find(ability => ability.name === skill.ability).modifier;
      if (skill.proficient) {
        modifier += this.proficiencyBonus;
      }
      return new Roll(`${skill.name}`, DICE_1D20, modifier);
    });
  }

  get savingThrows() {
    return this.abilities.map((ability) => {
      let modifier = ability.modifier;
      if (CLASS_CONSTANTS[this.class].savingThrows.includes(ability.name)) {
        modifier += this.proficiencyBonus;
      }
      return new Roll(`${ability.name} (Saving Throw)`, DICE_1D20, modifier);
    });
  }

  toString() {
    const abilitiesStr = this.abilities.map(ability => `${ability.name} ${ability.value} (${ability.modifier})`).join(', ');
    const throwsStr = this.savingThrows.map(savingThrow => `${savingThrow.name} ${savingThrow.toString()}`).join('\n  ');
    const skillsStr = this.skillRolls.map(skillRoll => `${skillRoll.name} ${skillRoll.toString()}`).join('\n  ');
    return `${this.name}, Lv.${this.level} ${this.class}
Abilities:
  ${abilitiesStr}
Initiative:
  ${this.initiative}
  ${this.initiativeRoll.name} ${this.initiativeRoll}
Proficiency Bonus:
  ${this.proficiencyBonus}
Attack Hit Roll:
  ${this.attackHitRoll.name} ${this.attackHitRoll.toString()}
Spell Hit Roll:
  ${this.spellHitRoll.name} ${this.spellHitRoll.toString()}
Regen Roll:
  ${this.hitDiceRoll.name} ${this.hitDiceRoll.toString()}
Saving Throws:
  ${throwsStr}
Skills:
  ${this.skills.map(skill => `${skill.name} (${skill.ability})`).join('\n  ')}
Skill Rolls:
  ${skillsStr}`;
  }
}
