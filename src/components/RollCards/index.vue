<template>
  <v-layout wrap class="my-4">
    <RollCard
      title="Hit Dice"
      :value="hitDiceValueString"
      :sendable="line.isReady"
      @copy="copy(hitDiceRoll)"
      @send="send(hitDiceRoll)"
    >
    </RollCard>

    <RollCard
      title="Initiative"
      :value="initiative | signed"
      :editable="isEditable"
      :sendable="line.isReady"
      @decrement="decrementInitiative"
      :isDecrementDisabled="initiativeBonus < 1"
      @increment="incrementInitiative"
      @copy="copy(initiativeRoll)"
      @send="send(initiativeRoll)"
    />

    <RollCard
      title="Spell Hit"
      :value="spellHit | signed"
      :editable="isEditable"
      :sendable="line.isReady"
      @decrement="decrementSpellHit"
      :isDecrementDisabled="spellHitBonus < 1"
      @increment="incrementSpellHit"
      @copy="copy(spellHitRoll)"
      @send="send(spellHitRoll)"
    />

    <RollCard
      title="Attack Hit"
      :value="attackHitBonus | signed "
      :editable="isEditable"
      :sendable="line.isReady"
      @decrement="decrementAttackHit"
      @increment="incrementAttackHit"
      @copy="copy(attackHitRoll)"
      @send="send(attackHitRoll)"
    />
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { signed, signedSpaced } from '@/utils/utils';
import RollCard from './compoenents/Card';

export default {
  name: 'RollCards',
  components: {
    RollCard,
  },
  computed: {
    ...mapGetters([
      'line',
      'isEditable',
      'character',
    ]),
    hitDice() { return this.character.hitDice; },
    hitDiceRoll() { return this.character.hitDiceRoll; },
    initiative() { return this.character.initiative; },
    initiativeRoll() { return this.character.initiativeRoll; },
    initiativeBonus() { return this.character.initiativeBonus; },
    spellHit() { return this.character.spellHit; },
    spellHitRoll() { return this.character.spellHitRoll; },
    spellHitBonus() { return this.character.spellHitBonus; },
    attackHitBonus() { return this.character.attackHitBonus; },
    attackHitRoll() { return this.character.attackHitRoll; },
    hitDiceValueString() {
      const kind = this.hitDice.find(dice => dice.count > 0).kind;
      const modifier = this.hitDiceRoll.modifier;
      return `${kind} ${signedSpaced(modifier)}`;
    },
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
