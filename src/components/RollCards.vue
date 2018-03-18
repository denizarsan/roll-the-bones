<template>
  <v-layout wrap class="my-4">
    <v-flex xs12 sm3 class="white elevation-1 pa-3">
      <v-layout align-center column>
        <div class="title my-2">
          Hit Dice
        </div>
        <div class="subheading my-2">
          {{ hitDice.find(dice => dice.count > 0).kind }} {{ hitDiceRoll.modifier | signedSpaced }}
        </div>
        <v-layout justify-center>
          <v-btn color="primary" @click="copy(hitDiceRoll)" small flat icon>
            <v-icon small>content_copy</v-icon>
          </v-btn>
          <v-btn color="secondary" v-if="line.isReady" @click="send(hitDiceRoll)" small flat icon>
            <v-icon small>send</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm3 class="white elevation-1 pa-3">
      <v-layout align-center column>
        <div class="title my-2">
          Initiative
        </div>
        <v-layout align-center>
          <v-btn small icon v-if="edit.initiative" @click="decrementInitiative" :disabled="initiativeBonus < 1">
            <v-icon color="secondary">remove_circle</v-icon>
          </v-btn>
          <div class="subheading my-2">
            {{ initiative | signed }}
            <span v-if="initiativeBonus > 0">(+{{ initiativeBonus }})</span>
          </div>
          <v-btn small icon v-if="edit.initiative" @click="incrementInitiative">
            <v-icon color="secondary">add_circle</v-icon>
          </v-btn>
        </v-layout>
        <v-layout justify-center>
          <v-btn v-if="isEditable" color="deep-purple" @click="edit.initiative = !edit.initiative" small flat icon>
            <v-icon small>{{ edit.initiative ? 'check' : 'edit' }}</v-icon>
          </v-btn>
          <v-btn color="primary" @click="copy(initiativeRoll)" small flat icon>
            <v-icon small>content_copy</v-icon>
          </v-btn>
          <v-btn color="secondary" v-if="line.isReady" @click="send(initiativeRoll)" small flat icon>
            <v-icon small>send</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm3 class="white elevation-1 pa-3">
      <v-layout align-center column>
        <div class="title my-2">
          Spell Hit
        </div>
        <v-layout align-center>
          <v-btn small icon v-if="edit.spellHit" @click="decrementSpellHit" :disabled="spellHitBonus < 1">
            <v-icon color="secondary">remove_circle</v-icon>
          </v-btn>
          <div class="subheading my-2">
            {{ spellHit | signed }}
            <span v-if="spellHitBonus > 0">(+{{ spellHitBonus }})</span>
          </div>
          <v-btn small icon v-if="edit.spellHit" @click="incrementSpellHit">
            <v-icon color="secondary">add_circle</v-icon>
          </v-btn>
        </v-layout>
        <v-layout justify-center>
          <v-btn v-if="isEditable" color="deep-purple" @click="edit.spellHit = !edit.spellHit" small flat icon>
            <v-icon small>{{ edit.spellHit ? 'check' : 'edit' }}</v-icon>
          </v-btn>
          <v-btn color="primary" @click="copy(spellHitRoll)" small flat icon>
            <v-icon small>content_copy</v-icon>
          </v-btn>
          <v-btn color="secondary" v-if="line.isReady" @click="send(spellHitRoll)" small flat icon>
            <v-icon small>send</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm3 class="white elevation-1 pa-3">
      <v-layout align-center column>
        <div class="title my-2">
          Attack Hit
        </div>
        <v-layout align-center>
          <v-btn small icon v-if="edit.attackHit" @click="decrementAttackHit">
            <v-icon color="secondary">remove_circle</v-icon>
          </v-btn>
          <div class="subheading my-2">
            {{ attackHitBonus | signed }}
          </div>
          <v-btn small icon v-if="edit.attackHit" @click="incrementAttackHit">
            <v-icon color="secondary">add_circle</v-icon>
          </v-btn>
        </v-layout>
        <v-layout justify-center>
          <v-btn v-if="isEditable" color="deep-purple" @click="edit.attackHit = !edit.attackHit" small flat icon>
            <v-icon small>{{ edit.attackHit ? 'check' : 'edit' }}</v-icon>
          </v-btn>
          <v-btn color="primary" @click="copy(attackHitRoll)" small flat icon>
            <v-icon small>content_copy</v-icon>
          </v-btn>
          <v-btn color="secondary" v-if="line.isReady" @click="send(attackHitRoll)" small flat icon>
            <v-icon small>send</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { signed, signedSpaced } from '@/utils/utils';

export default {
  name: 'RollCards',
  computed: {
    ...mapState({
      line: state => state.line,
      isEditable: state => state.isEditable,
      hitDice: state => state.character.hitDice,
      hitDiceRoll: state => state.character.hitDiceRoll,
      initiative: state => state.character.initiative,
      initiativeRoll: state => state.character.initiativeRoll,
      initiativeBonus: state => state.character.initiativeBonus,
      spellHit: state => state.character.spellHit,
      spellHitRoll: state => state.character.spellHitRoll,
      spellHitBonus: state => state.character.spellHitBonus,
      attackHitBonus: state => state.character.attackHitBonus,
      attackHitRoll: state => state.character.attackHitRoll,
    }),
  },
  data() {
    return {
      edit: {
        initiative: false,
        spellHit: false,
        attackHit: false,
      },
    };
  },
  methods: {
    ...mapMutations([
      'showNotification',
      'incrementInitiative',
      'decrementInitiative',
      'incrementSpellHit',
      'decrementSpellHit',
      'incrementAttackHit',
      'decrementAttackHit',
    ]),
    send(roll) {
      this.line.sendRoll(roll);
    },
    copy(roll) {
      this.$copyText(roll.toString()).then((e) => {
        this.showNotification({ text: `Copied "${e.text}" to clipboard.` });
      }, () => {
        this.showNotification({ text: 'Failed to copy text to clipboard.' });
      });
    },
  },
  filters: { signed, signedSpaced },
};
</script>
