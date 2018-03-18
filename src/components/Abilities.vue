<template>
  <v-layout justify-space-between wrap>
    <v-flex v-for="ability in abilities" :key="ability.name" xs6 sm4 md2>
      <div class="ability white elevation-1 pa-3">
        <v-layout align-center column>
          <v-btn v-if="isEditable" color="deep-purple" class="ability-edit my-0 mx-0" absolute right small flat icon @click="inEditMode[ability.name] = !inEditMode[ability.name]">
            <v-icon small color="deep-purple">{{ inEditMode[ability.name] ? 'check' : 'edit' }}</v-icon>
          </v-btn>
          <div class="ability-name title my-2">
            {{ ability.name }}
          </div>
          <v-layout>
            <transition name="appear">
              <v-btn
                class="ml-0"
                small icon
                v-if="inEditMode[ability.name]"
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
                v-if="inEditMode[ability.name]"
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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Abilities',
  computed: {
    ...mapState({
      abilities: state => state.character.abilities,
      isEditable: state => state.isEditable,
    }),
  },
  data() {
    const keyTuples = this.$store.state.character.abilities.map(ability => [ability.name, false]);
    return {
      inEditMode: Object.assign(...keyTuples.map(tuple => ({ [tuple[0]]: tuple[1] }))),
    };
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
