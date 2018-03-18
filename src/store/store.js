import Vue from 'vue';
import Vuex from 'vuex';

import { ABILITIES_BASE, DICE_DEFAULT, SKILLS_BASE } from '@/utils/constants';
import Character from '@/classes/Character';
import Roll from '@/classes/Roll';
import Line from '@/classes/Line';

Vue.use(Vuex);

const save = (character) => {
  localStorage.setItem('character', JSON.stringify(character));
};

const load = () => {
  const data = JSON.parse(localStorage.getItem('character'));
  let character;
  if (data) {
    character = new Character(
      data.name,
      data.class,
      data.level,
      data.abilities,
      data.skills,
      data.rolls);
    character.initiativeBonus = data.initiativeBonus;
    character.attackHitBonus = data.attackHitBonus;
    character.spellHitBonus = data.spellHitBonus;
  } else {
    character = new Character('Conan', 'Barbarian', 1, ABILITIES_BASE, SKILLS_BASE, []);

    // Try to parse and load legacy data
    const rollData = JSON.parse(localStorage.getItem('rolls'));
    if (rollData) {
      rollData.forEach((roll) => {
        const modifier = roll.dices.map(dice => dice.modifier).reduce((acc, curr) => acc + curr);
        const dices = DICE_DEFAULT.map(dice => Object.assign({}, dice));
        roll.dices.forEach((dice) => {
          dices.find(d => d.kind === dice.value).count += dice.count;
        });
        character.rolls.push(new Roll(roll.name, dices, modifier));
        save(character);
        localStorage.removeItem('rolls');
      });
    }
  }

  return character;
};

const state = {
  drawer: { show: false },
  auth: { show: false, step: 0 },
  character: load(),
  line: new Line(),
  notification: { show: false, text: null },
  isEditable: true,
};


/* eslint no-shadow: [2, { "allow": ["state"] }] */
const mutations = {
  updateLine(state, payload) {
    state.line = payload.line;
  },
  disconnectLine(state) {
    state.line.disconnect();
    state.auth.step = 1;
    localStorage.removeItem('auth');
  },
  changeName(state, payload) {
    state.character.name = payload.name;
    save(state.character);
  },
  changeClass(state, payload) {
    state.character.class = payload.class;
    save(state.character);
  },
  incrementLevel(state) {
    state.character.level += 1;
    save(state.character);
  },
  decrementLevel(state) {
    state.character.level -= 1;
    save(state.character);
  },
  incrementAbility(state, payload) {
    const ability = state.character.abilities.find(a => a.name === payload.name);
    ability.value += 1;
    save(state.character);
  },
  decrementAbility(state, payload) {
    const ability = state.character.abilities.find(a => a.name === payload.name);
    ability.value -= 1;
    save(state.character);
  },
  toggleSkill(state, payload) {
    const skill = state.character.skills.find(s => s.name === payload.name);
    skill.proficient = !skill.proficient;
    save(state.character);
  },
  addRoll(state, payload) {
    state.character.rolls.push(payload.roll);
    save(state.character);
  },
  removeRoll(state, payload) {
    const index = state.character.rolls.findIndex(roll => roll.name === payload.roll.name);
    if (index > -1) {
      state.character.rolls.splice(index, 1);
      save(state.character);
    }
  },
  incrementInitiative(state) {
    state.character.initiativeBonus += 1;
    save(state.character);
  },
  decrementInitiative(state) {
    state.character.initiativeBonus -= 1;
    save(state.character);
  },
  incrementAttackHit(state) {
    state.character.attackHitBonus += 1;
    save(state.character);
  },
  decrementAttackHit(state) {
    state.character.attackHitBonus -= 1;
    save(state.character);
  },
  incrementSpellHit(state) {
    state.character.spellHitBonus += 1;
    save(state.character);
  },
  decrementSpellHit(state) {
    state.character.spellHitBonus -= 1;
    save(state.character);
  },
  showNotification(state, payload) {
    state.notification.text = payload.text;
    state.notification.show = true;
  },
  hideNotification(state) {
    state.notification.show = false;
    state.notification.text = null;
  },
  toggleDrawer(state) {
    state.drawer.show = !state.drawer.show;
  },
  showAuth(state) {
    state.auth.show = true;
  },
  hideAuth(state) {
    state.auth.show = false;
  },
  updateAuthStep(state, payload) {
    state.auth.step = payload.step;
  },
  toggleEditMode(state) {
    state.isEditable = !state.isEditable;
  },
};

export default new Vuex.Store({ state, mutations });
