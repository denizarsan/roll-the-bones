<template>
  <div>
    <v-list-tile ripple @click="open()">
      <v-list-tile-content>
        <v-list-tile-title class="primary--text">
          <v-icon medium color="primary">add</v-icon>
          New Roll
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-dialog persistent scrollable :max-width="600" v-model="dialog">
      <v-card>
        <v-toolbar color="primary" dark flat>
          <v-btn icon @click="close()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>New Roll</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-layout>
              <v-text-field label="Name" v-model="roll.name"></v-text-field>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 class="subheading">Dices</v-flex>
              <v-flex xs6 v-for="dice in roll.dices" :key="dice.kind">
                <v-layout justify-center align-center>
                  <v-flex xs2>
                    <div class="label-like">{{ dice.kind }}</div>
                  </v-flex>
                  <v-flex xs4>
                    <v-layout align-center>
                      <v-btn small icon :disabled="dice.count < 1" @click="dice.count -= 1">
                        <v-icon color="secondary">remove_circle</v-icon>
                      </v-btn>
                      <div class="subheading">{{ dice.count }}</div>
                      <v-btn small icon :disabled="dice.count > 9" @click="dice.count += 1">
                        <v-icon color="secondary">add_circle</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 class="subheading">Modifier</v-flex>
              <v-flex xs12>
                <v-slider
                  color="secondary"
                  ticks
                  thumb-label
                  v-model="roll.modifier"
                  :min="-20"
                  :max="20"
                  :step="1"
                ></v-slider>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 class="subheading">Result</v-flex>
              <v-layout justify-center align-center class="label-like">
                <span v-if="roll.isRollable">{{ roll.toString() }}</span>
                <span v-else>Add at least one dice to see the resulting roll</span>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="close()">Cancel</v-btn>
          <v-btn color="primary" :disabled="!roll.isComplete" @click="add(roll)">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Roll from '@/classes/Roll';

export default {
  name: 'NewRoll',
  data() {
    return {
      roll: new Roll(),
      dialog: false,
    };
  },
  methods: {
    ...mapMutations(['addRoll']),
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.roll = new Roll();
    },
    add(roll) {
      this.addRoll({ roll });
      this.close();
    },
  },
};
</script>

<style scoped>
.label-like {
  color: rgba(0,0,0,.54);
  font-size: 16px
}
</style>
