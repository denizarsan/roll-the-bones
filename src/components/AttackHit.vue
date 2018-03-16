<template>
  <v-flex class="white elevation-1 pa-3">
    <v-layout align-center column>
      <div class="title my-2">
        Attack Hit
      </div>
      <v-layout align-center>
        <v-btn small icon v-if="edit" @click="decrementAttackHit">
          <v-icon color="secondary">remove_circle</v-icon>
        </v-btn>
        <div class="subheading my-2">
          {{ bonus | signed }}
        </div>
        <v-btn small icon v-if="edit" @click="incrementAttackHit">
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
  name: 'AttackHit',
  computed: {
    ...mapState({
      line: state => state.line,
      bonus: state => state.character.attackHitBonus,
      roll: state => state.character.attackHitRoll,
    }),
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    ...mapMutations(['showNotification', 'incrementAttackHit', 'decrementAttackHit']),
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
