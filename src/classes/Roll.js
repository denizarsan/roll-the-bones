import { signedSpaced } from '@/utils/utils';
import {
  ROLL_NAME_DEFAULT,
  ROLL_DICES_DEFAULT,
  ROLL_MODIFIER_DEFAULT,
  ROLL_STRING_BASE,
} from '@/utils/constants';

export default class Roll {
  constructor(name, dices, modifier) {
    if (!arguments.length) {
      this.name = ROLL_NAME_DEFAULT;
      this.dices = ROLL_DICES_DEFAULT.map(dice => Object.assign({}, dice));
      this.modifier = ROLL_MODIFIER_DEFAULT;
    } else {
      this.name = name;
      this.dices = dices.map(dice => Object.assign({}, dice));
      this.modifier = modifier;
    }
  }

  get modifierToString() {
    return signedSpaced(this.modifier);
  }

  get isComplete() {
    return !!this.name && this.dices.some(dice => dice.count > 0);
  }

  get isRollable() {
    return this.dices.some(dice => dice.count > 0);
  }

  roll() {
    if (this.isRollable) {
      let total = 0;
      let result = this.dices
        .map((dice) => {
          const rolls = [];
          for (let i = 0; i < dice.count; i += 1) {
            const value = Math.floor(Math.random() * parseInt(dice.kind.slice(1), 10)) + 1;
            total += value;
            rolls.push([dice.kind, value]);
          }
          return rolls;
        })
        .filter(l => l.length > 0)
        .map(l => `${l.length}${l[0][0]} (${l.map(a => a[1]).join(', ')})`)
        .join(' + ');

      total += this.modifier;
      result = `${result} ${this.modifierToString}`;

      return { result, total };
    }

    return 0;
  }

  toString() {
    const dicesStr = this.dices.filter(dice => dice.count > 0)
                          .map(dice => `${dice.count}${dice.kind}`)
                          .join(' + ');

    return this.isRollable ? `${ROLL_STRING_BASE} ${dicesStr} ${this.modifierToString}` : null;
  }
}
