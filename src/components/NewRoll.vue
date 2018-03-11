<template>
  <div>
    <v-list two-line class="py-0">
      <v-list-tile ripple @click="open()">
        <v-list-tile-content>
          <v-list-tile-title class="primary--text">
            <v-icon medium color="primary">add</v-icon>
            New roll
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">
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
            <v-layout>
              <div class="subheading">Dices</div>
              <v-spacer></v-spacer>
              <v-btn small icon @click="addDice()">
                <v-icon small color="primary">add_circle</v-icon>
              </v-btn>
            </v-layout>
            <template v-for="(dice, index) in roll.dices">
              <v-subheader>
                Dice #{{ index + 1 }}
                <v-btn small icon @click="removeDice(dice)">
                  <v-icon small color="primary">remove_circle</v-icon>
                </v-btn>
              </v-subheader>
              <v-container class="py-0">
                <v-layout class="counter input-group" wrap row>
                  <v-flex xs12>
                    <label>Count</label>
                  </v-flex>
                  <v-layout>
                    <v-btn small class="counter-btn ml-0" icon :disabled="dice.count < 2" @click="dice.count -= 1">
                      <v-icon color="secondary">remove_circle</v-icon>
                    </v-btn>
                    <div class="counter-text subheading">{{ dice.count }}</div>
                    <v-btn small class="counter-btn mr-0" icon :disabled="dice.count > 9" @click="dice.count += 1">
                      <v-icon color="secondary">add_circle</v-icon>
                    </v-btn>
                  </v-layout>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <v-radio-group v-model="dice.value" label="Kind" row>
                      <v-radio
                        color="secondary"
                        v-for="d in ['d4', 'd6', 'd8', 'd10', 'd12', 'd20']"
                        :key="d"
                        :label="d"
                        :value="d"
                        :column="false">
                      </v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs10>
                    <v-slider
                      label="Modifier"
                      color="secondary"
                      v-model="dice.modifier"
                      :min="-20"
                      :max="20"
                      :step="1"
                      ticks
                      thumb-label>
                    </v-slider>
                  </v-flex>
                  <v-flex xs2 class="modifier-value">
                    <div class="subheading">{{ dice.modifier }}</div>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-divider v-if="index + 1 < roll.dices.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="close()">Cancel</v-btn>
          <v-btn color="primary" @click="add(roll)">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Roll from '../classes/Roll';
import Dice from '../classes/Dice';

export default {
  name: 'NewRoll',
  data() {
    return {
      roll: new Roll(),
      dialog: false,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.roll = new Roll();
    },
    removeDice(dice) {
      this.roll.removeDice(dice);
    },
    addDice() {
      this.roll.addDice(new Dice());
    },
    add(roll) {
      this.$emit('roll-add', roll);
      this.close();
    },
  },
};
</script>

<style scoped>
.counter-text {
  display: flex;
  align-items: center;
}

.modifier-value {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0,0,0,.54);
}
</style>
