const DICE_COUNT_DEFAULT = 1;
const DICE_VALUE_DEFAULT = 'd20';
const DICE_MODIFIER_DEFAULT = 0;

export default class Dice {
  constructor(count, value, modifier) {
    if (!arguments.length) {
      this.count = DICE_COUNT_DEFAULT;
      this.value = DICE_VALUE_DEFAULT;
      this.modifier = DICE_MODIFIER_DEFAULT;
    } else {
      this.count = count;
      this.value = value;
      this.modifier = modifier;
    }
  }

  toString() {
    if (this.modifier > 0) {
      return `${this.count}${this.value} + ${this.modifier}`;
    } else if (this.modifier < 0) {
      return `${this.count}${this.value} - ${Math.abs(this.modifier)}`;
    }

    return `${this.count}${this.value}`;
  }
}
