import Dice from './Dice';

const ROLL_NAME_DEFAULT = '';
const ROLL_STRING_BASE = '!roll';

export default class Roll {
  constructor(name, dices) {
    if (!arguments.length) {
      this.name = ROLL_NAME_DEFAULT;
      this.dices = [new Dice()];
    } else {
      this.name = name;
      this.dices = dices.slice();
    }
    this.canBeSent = true;
  }

  addDice(dice) {
    this.dices.push(dice);
  }

  removeDice(dice) {
    this.dices.splice(this.dices.indexOf(dice), 1);
  }

  canerproof() {
    this.canBeSent = false;
    setTimeout(() => { this.canBeSent = true; }, 5000);
  }

  toString() {
    return `${ROLL_STRING_BASE} ${this.dices.map(dice => dice.toString()).join(' + ')}`;
  }
}
