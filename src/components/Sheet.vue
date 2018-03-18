<template>
  <div>
    <v-layout class="my-4" justify-center>
      <v-flex xs12 sm8 md6>
        <basics></basics>
      </v-flex>
    </v-layout>

    <abilities></abilities>

    <v-layout align-center justify-center wrap class="my-4">
      <v-flex xs12 sm8 md6>
        <proficiency></proficiency>
      </v-flex>
    </v-layout>

    <roll-cards></roll-cards>
    <roll-lists></roll-lists>
  </div>
</template>

<script>
import Basics from './Basics';
import Abilities from './Abilities';
import Proficiency from './Proficiency';
import RollCards from './RollCards';
import RollLists from './RollLists';

export default {
  name: 'Sheet',
  components: {
    Basics,
    Abilities,
    Proficiency,
    RollCards,
    RollLists,
  },
};
</script>
