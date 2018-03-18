<template>
  <v-flex class="property white elevation-1 pa-3">
    <v-btn v-if="isEditable" color="deep-purple" class="property-edit my-0 mx-0" absolute right flat icon @click="edit = !edit">
      <v-icon color="deep-purple">{{ edit ? 'check' : 'edit' }}</v-icon>
    </v-btn>
    <div class="display-1 text-xs-center">
      {{ name }}, Lv. {{ level }} {{ klass }}
    </div>
    <v-layout align-center class="mt-3 mx-3" v-if="edit">
      <v-flex xs4>
        <v-text-field label="Name" :value="name" @input="updateName"></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-layout align-center justify-center>
          Level
          <v-btn
            small icon
            @click.native="decrementLevel"
            :disabled="level < 2"
          >
            <v-icon color="secondary">remove_circle</v-icon>
          </v-btn>
          <div class="subheading my-2">
            {{ level }}
          </div>
          <v-btn
            small icon
            @click.native="incrementLevel"
            :disabled="level > 19"
          >
            <v-icon color="secondary">add_circle</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="classes"
          :value="klass"
          @input="updateClass"
          label="Class"
          single-line
        ></v-select>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Basics',
  computed: {
    ...mapState({
      name: state => state.character.name,
      level: state => state.character.level,
      klass: state => state.character.class,
      isEditable: state => state.isEditable,
    }),
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
  position: relative;
}

.property-edit {
  top: 20px;
}
</style>
