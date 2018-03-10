<template>
  <div>
    <roll-list
      :rolls="rolls"
      :can-send="line && line.isReady"
      :can-delete="canDelete"
      @roll-remove="removeRoll"
      @roll-copy="copyRoll"
      @roll-send="sendRoll"/>
    <new-roll @roll-add="addRoll"/>
    <notification :text="notification"/>

    <v-btn color="secondary" @click="canDelete = !canDelete" fixed fab bottom right>
      <v-icon>{{ canDelete ? 'lock_open' : 'lock' }}</v-icon>
    </v-btn>
  </div>
</template>

<script>

// Components
import NewRoll from './NewRoll';
import Notification from './Notification';
import RollList from './RollList';

// Classes
import Roll from '../classes/Roll';
import Dice from '../classes/Dice';


export default {
  name: 'Home',
  props: ['line'],
  components: { NewRoll, Notification, RollList },
  data() {
    return {
      rolls: [],
      notification: '',
      canDelete: false,
    };
  },
  created() {
    const rolls = JSON.parse(localStorage.getItem('rolls'));
    if (rolls) {
      rolls.forEach((roll) => {
        const dices = [];
        roll.dices.forEach((dice) => {
          dices.push(new Dice(dice.count, dice.value, dice.modifier));
        });
        this.rolls.push(new Roll(roll.name, dices));
      });
    }
  },
  methods: {
    addRoll(roll) {
      this.rolls.push(roll);
      localStorage.setItem('rolls', JSON.stringify(this.rolls));
    },
    sendRoll(roll) {
      this.line.send(`${roll.toString()} :robot: ${this.line.user.username} | ${roll.name}`);
    },
    copyRoll(roll) {
      this.$copyText(roll.toString()).then((e) => {
        this.notification = `Copied "${e.text}" to clipboard.`;
      }, () => {
        this.notification = 'Failed to copy text to clipboard.';
      });
    },
    removeRoll(roll) {
      this.rolls.splice(this.rolls.indexOf(roll), 1);
      localStorage.setItem('rolls', JSON.stringify(this.rolls));
    },
  },
};
</script>
