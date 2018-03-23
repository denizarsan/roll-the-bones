<template>
  <v-dialog persistent scrollable :max-width="600" :value="true">
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-btn icon @click="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-layout>
            <v-text-field label="Name" v-model="currentRoll.name"></v-text-field>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 class="subheading">Dices</v-flex>
            <v-flex xs6 v-for="dice in currentRoll.dices" :key="dice.kind">
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
                v-model="currentRoll.modifier"
                :min="-20"
                :max="20"
                :step="1"
              ></v-slider>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 class="subheading">Result</v-flex>
            <v-layout justify-center align-center class="label-like">
              <span v-if="currentRoll.isRollable">{{ currentRoll.toString() }}</span>
              <span v-else>Add at least one dice to see the resulting roll</span>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" :disabled="!currentRoll.isComplete" @click="$emit('add', currentRoll)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import Roll from '@/classes/Roll';

  export default {
    name: 'RollDialog',
    components: {},
    props: {
      title: {
        type: String,
        required: true,
      },
      roll: {
        type: Object,
        required: false,
        default() {
          return new Roll();
        },
      },
    },
    data() {
      return {
        currentRoll: new Roll(this.roll.name, this.roll.dices, this.roll.modifier),
      };
    },
    methods: {},
  };
</script>
