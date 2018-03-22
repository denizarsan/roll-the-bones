<template>
  <v-layout justify-space-between wrap>
    <v-flex v-for="ability in character.abilities" :key="ability.name" xs6 sm4 md2>
      <div class="ability white elevation-1 pa-3">
        <v-layout align-center column>
          <div class="ability-name title my-2">
            {{ ability.name }}
          </div>
          <v-layout>
            <transition name="appear">
              <v-btn
                class="ml-0"
                small icon
                v-if="isEditable"
                @click="decrement(ability)"
                :disabled="ability.value < 1"
              >
                <v-icon color="secondary">remove_circle</v-icon>
              </v-btn>
            </transition>
            <div class="ability-value subheading my-2">
              {{ ability.value }}
            </div>
            <transition name="appear">
              <v-btn
                class="mr-0"
                small icon
                v-if="isEditable"
                @click="increment(ability)"
                :disabled="ability.value > 19"
              >
                <v-icon color="secondary">add_circle</v-icon>
              </v-btn>
            </transition>
          </v-layout>
          <div class="ability-modifier">
            ({{ ability.modifierToString }})
          </div>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters,
 mapMutations } from 'vuex';

export default {
  name: 'Abilities',
  computed: {
    ...mapGetters(['character', 'isEditable']),
  },
  methods: {
    ...mapMutations(['incrementAbility', 'decrementAbility']),
    increment(ability) {
      this.incrementAbility({ name: ability.name });
    },
    decrement(ability) {
      this.decrementAbility({ name: ability.name });
    },
  },
};
</script>

<style scoped>
.ability {
  position: relative;
}

.ability-edit {
  top: 20px;
}

.appear-enter-active {
  animation: appear .5s;
}
.appear-leave-active {
  animation: appear .5s reverse;
}

@keyframes appear {
  0%    { transform: scale(0); }
  100%  { transform: scale(1); }
}
</style>
