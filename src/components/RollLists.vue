<template>
  <v-layout wrap class="my-4">
    <v-flex xs12 md4>
      <v-list two-line subheader class="elevation-1 pb-0">
        <v-layout>
          <v-subheader>Skills</v-subheader>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat icon @click="edit.skills = !edit.skills" >
            <v-icon color="secondary">{{ edit.skills ? 'lock_open' : 'lock' }}</v-icon>
          </v-btn>
        </v-layout>
        <template v-for="roll in skillRolls">
          <v-list-tile avatar>
            <v-list-tile-action v-if="edit.skills">
              <v-checkbox v-model="skills.find(skill => skill.name === roll.name).proficient" @click="onCheckboxClick(roll)"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ roll.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ roll.toString() }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn color="primary" flat icon @click="copy(roll)">
                <v-icon color="primary">content_copy</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if="line.isReady">
              <v-btn color="secondary" flat icon @click="send(roll)">
                <v-icon color="secondary">send</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </v-flex>
    <v-flex xs12 md4>
      <v-list two-line subheader class="elevation-1 pb-0">
          <v-layout>
            <v-subheader>Rolls</v-subheader>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat icon @click="edit.rolls = !edit.rolls" v-if="rolls.length">
              <v-icon color="secondary">{{ edit.rolls ? 'lock_open' : 'lock' }}</v-icon>
            </v-btn>
          </v-layout>
          <template v-for="roll in rolls">
            <v-list-tile avatar>
              <v-list-tile-action v-if="edit.rolls">
                <v-btn color="error" flat icon @click="onRemoveClick(roll)">
                  <v-icon color="error">remove_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ roll.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ roll.toString() }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="primary" flat icon @click="copy(roll)">
                  <v-icon color="primary">content_copy</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action v-if="line.isReady">
                <v-btn color="secondary" flat icon @click="send(roll)">
                  <v-icon color="secondary">send</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
          <new-roll></new-roll>
        </v-list>
    </v-flex>
    <v-flex xs12 md4>
      <v-list two-line subheader class="elevation-1 pb-0">
          <v-subheader>Saving Throws</v-subheader>
          <template v-for="roll in savingThrows">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ roll.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ roll.toString() }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="primary" flat icon @click="copy(roll)">
                  <v-icon color="primary">content_copy</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action v-if="line.isReady">
                <v-btn color="secondary" flat icon @click="send(roll)">
                  <v-icon color="secondary">send</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import NewRoll from './NewRoll';

export default {
  name: 'RollLists',
  components: { NewRoll },
  computed: {
    ...mapState({
      line: state => state.line,
      skills: state => state.character.skills,
      skillRolls: state => state.character.skillRolls,
      rolls: state => state.character.rolls,
      savingThrows: state => state.character.savingThrows,
    }),
  },
  data() {
    return {
      edit: {
        skills: false,
        rolls: false,
      },
    };
  },
  methods: {
    ...mapMutations(['showNotification', 'toggleSkill', 'removeRoll']),
    send(roll) {
      this.line.sendRoll(roll);
    },
    copy(roll) {
      this.$copyText(roll.toString()).then((e) => {
        this.showNotification({ text: `Copied "${e.text}" to clipboard.` });
      }, () => {
        this.showNotification({ text: 'Failed to copy text to clipboard.' });
      });
    },
    onCheckboxClick(skill) {
      this.toggleSkill({ name: skill.name });
    },
    onRemoveClick(roll) {
      this.removeRoll({ roll });
      if (this.rolls.length < 1) {
        this.edit = false;
      }
    },
  },
};
</script>
