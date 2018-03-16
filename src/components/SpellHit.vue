<template>
  <v-flex class="white elevation-1 pa-3">
    <v-layout align-center column>
      <div class="title my-2">
        Spell Hit
      </div>

      <v-layout align-center>
        <v-btn small icon v-if="edit" @click="decrementSpellHit" :disabled="bonus < 1">
          <v-icon color="secondary">remove_circle</v-icon>
        </v-btn>
        <div class="subheading my-2">
          {{ spellHit | signed }}
          <span v-if="bonus > 0">(+{{ bonus }})</span>
        </div>
        <v-btn small icon v-if="edit" @click="incrementSpellHit">
          <v-icon color="secondary">add_circle</v-icon>
        </v-btn>
      </v-layout>

      <v-layout justify-center>
        <v-btn color="deep-purple" @click="edit = !edit" small flat icon>
          <v-icon small>{{ edit ? 'check' : 'edit' }}</v-icon>
        </v-btn>
        <v-btn color="primary" @click="copy()" small flat icon>
          <v-icon small>content_copy</v-icon>
        </v-btn>
        <v-btn color="secondary" v-if="line.isReady" @click="send()" small flat icon>
          <v-icon small>send</v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { signed } from '@/utils/utils';

export default {
  name: 'SpellHit',
  computed: {
    ...mapState({
      line: state => state.line,
      bonus: state => state.character.spellHitBonus,
      spellHit: state => state.character.spellHit,
      roll: state => state.character.spellHitRoll,
    }),
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    ...mapMutations(['showNotification', 'incrementSpellHit', 'decrementSpellHit']),
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
    signed,
  },
};
</script>
