<template>
  <v-flex class="white elevation-1 pa-3">
    <v-layout align-center justify-center>
      <v-flex class="title upper" xs10 sm5>
        Proficiency Bonus
      </v-flex>
      <v-flex class="title plain" xs2 sm1>
        {{ character.proficiencyBonus | signed }}
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';
import { signed } from '@/utils/utils';

export default {
  name: 'Proficiency',
  computed: {
    ...mapGetters(['character']),
  },
  filters: {
    signed,
  },
};
</script>

<style scoped>
.upper {
  text-transform: uppercase;
}
.plain {
  font-weight: 300;
}
</style>
