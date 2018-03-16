<template>
  <div>
    <v-layout class="my-4" justify-center>
      <v-flex xs12 sm8 md6>
        <name-level-class></name-level-class>
      </v-flex>
    </v-layout>

    <abilities></abilities>

    <v-layout align-center justify-center wrap class="my-4">
      <v-flex xs12 sm8 md6>
        <proficiency></proficiency>
      </v-flex>
    </v-layout>

    <v-layout wrap class="my-4">
      <v-flex xs12 sm3>
        <hit-dice></hit-dice>
      </v-flex>
      <v-flex xs12 sm3>
        <initiative></initiative>
      </v-flex>
      <v-flex xs12 sm3>
        <spell-hit></spell-hit>
      </v-flex>
      <v-flex xs12 sm3>
        <attack-hit></attack-hit>
      </v-flex>
    </v-layout>

    <v-layout wrap class="my-4">
      <v-flex xs12 md4>
        <skills></skills>
      </v-flex>
      <v-flex xs12 md4>
        <rolls></rolls>
      </v-flex>
      <v-flex xs12 md4>
        <saving-throws></saving-throws>
      </v-flex>
    </v-layout>

    <notification></notification>
  </div>
</template>

<script>
import NameLevelClass from './NameLevelClass';
import Abilities from './Abilities';
import Initiative from './Initiative';
import SpellHit from './SpellHit';
import HitDice from './HitDice';
import Proficiency from './Proficiency';
import AttackHit from './AttackHit';
import SavingThrows from './SavingThrows';
import Skills from './Skills';
import Rolls from './Rolls';
import Notification from './Notification';

export default {
  name: 'Home',
  components: {
    NameLevelClass,
    Abilities,
    Initiative,
    SpellHit,
    HitDice,
    Proficiency,
    AttackHit,
    SavingThrows,
    Skills,
    Rolls,
    Notification,
  },
};
</script>
