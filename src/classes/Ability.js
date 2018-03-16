import { signed } from '@/utils/utils';

export default class Ability {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  get modifier() {
    return Math.floor((this.value - 10) / 2);
  }

  get modifierToString() {
    return signed(this.modifier);
  }
}
