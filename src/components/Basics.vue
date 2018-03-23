<template>
  <v-flex class="property white elevation-1 px-3">
    <div v-if="!isEditable" class="display-1 text-xs-center">
      {{ character.name }}, Lv. {{ character.level }} {{ character.class }}
    </div>
    <v-layout v-else align-center>
      <v-flex xs4>
        <v-text-field
          label="Name"
          :value="character.name"
          @input="updateName"
        ></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-layout align-center justify-center>
          Level
          <v-btn
            small icon
            @click.native="decrementLevel"
            :disabled="character.level < 2"
          >
            <v-icon color="secondary">remove_circle</v-icon>
          </v-btn>
          <div class="subheading my-2">
            {{ character.level }}
          </div>
          <v-btn
            small icon
            @click.native="incrementLevel"
            :disabled="character.level > 19"
          >
            <v-icon color="secondary">add_circle</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="classes"
          :value="character.class"
          @input="updateClass"
          label="Class"
          single-line
        ></v-select>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Basics',
  computed: {
    ...mapGetters(['character', 'isEditable']),
  },
  data() {
    return {
      classes: [
        'Barbarian', 'Bard', 'Cleric',
        'Druid', 'Fighter', 'Monk',
        'Paladin', 'Ranger', 'Rogue',
        'Sorcerer', 'Warlock', 'Wizard',
      ],
      edit: false,
    };
  },
  methods: {
    ...mapMutations(['changeName', 'changeClass', 'incrementLevel', 'decrementLevel']),
    updateName(name) {
      this.changeName({ name });
    },
    updateClass(klass) {
      this.changeClass({ class: klass });
    },
  },
};
</script>

<style scoped>
.property {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
