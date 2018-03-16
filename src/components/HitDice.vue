<template>
<v-flex class="white elevation-1 pa-3">
  <v-layout align-center column>
    <div class="title my-2">
      Hit Dice
    </div>
    <div class="subheading my-2">
      {{ hitDice.find(dice => dice.count > 0).kind }} {{ roll.modifier | signedSpaced }}
    </div>
    <v-layout justify-center>
      <v-btn color="primary" @click="copy()" small flat icon>
        <v-icon small>content_copy</v-icon>
      </v-btn>
      <v-btn color="secondary" v-if="line.isReady" @click="send()" small flat icon>
        <v-icon small>send</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
  </v-layout>
</v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { signedSpaced } from '@/utils/utils';

export default {
  name: 'HitDice',
  computed: {
    ...mapState({
      line: state => state.line,
      hitDice: state => state.character.hitDice,
      roll: state => state.character.hitDiceRoll,
    }),
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    ...mapMutations(['showNotification']),
    send() {
      this.line.sendRoll(this.roll);
    },
    copy() {
      this.$copyText(this.roll.toString()).then((e) => {
        this.showNotification({ text: `Copied "${e.text}" to clipboard.` });
      }, () => {
        this.showNotification({ text: 'Failed to copy text to clipboard.' });
      });
    },
  },
  filters: {
    signedSpaced,
  },
};
</script>
