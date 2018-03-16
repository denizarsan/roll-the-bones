<template>
  <v-list two-line subheader class="elevation-1 pb-0">
    <v-layout>
      <v-subheader>Skills</v-subheader>
      <v-spacer></v-spacer>
      <v-btn color="secondary" flat icon @click="edit = !edit" >
        <v-icon color="secondary">{{ edit ? 'lock_open' : 'lock' }}</v-icon>
      </v-btn>
    </v-layout>
    <template v-for="roll in rolls">
      <v-list-tile avatar>
        <v-list-tile-action v-if="edit">
          <v-checkbox v-model="skills.find(skill => skill.name === roll.name).proficient" @click="update(roll)"></v-checkbox>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Skills',
  computed: {
    ...mapState({
      line: state => state.line,
      skills: state => state.character.skills,
      rolls: state => state.character.skillRolls,
    }),
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    ...mapMutations(['showNotification', 'toggleSkill']),
    send(skill) {
      this.line.sendRoll(skill);
    },
    copy(skill) {
      this.$copyText(skill.toString()).then((e) => {
        this.showNotification({ text: `Copied "${e.text}" to clipboard.` });
      }, () => {
        this.showNotification({ text: 'Failed to copy text to clipboard.' });
      });
    },
    update(skill) {
      this.toggleSkill({ name: skill.name });
    },
  },
};
</script>
