<template>
  <v-layout wrap class="my-4">
    <RollList
      title="Skills"
      :list="skillRolls"
      :editable="isEditable"
      :sendable="line.isReady"
      @copy="copy"
      @send="send"
    >
      <v-checkbox
        slot="editSection"
        slot-scope="{ value }"
        v-model="skills.find(skill => skill.name === value.name).proficient"
        @click="onCheckboxClick(value)"/>
    </RollList>

    <RollList
      title="Rolls"
      :list="rolls"
      :editable="isEditable"
      :sendable="line.isReady"
      @copy="copy"
      @send="send"
    >
      <v-btn
        slot="editSection"
        slot-scope="{ value }"
        color="error"
        flat
        icon
        @click="onRemoveClick(value)">
        <v-icon color="error">remove_circle</v-icon>
      </v-btn>
      <new-roll slot="additionalValues"></new-roll>
    </RollList>

    <RollList
      title="Saving Throws"
      :list="savingThrows"
      :sendable="line.isReady"
      @copy="copy"
      @send="send"
    />
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NewRoll from './components/NewRoll';
import RollList from './components/RollList';

export default {
  name: 'RollLists',
  components: {
    NewRoll,
    RollList,
  },
  computed: {
    ...mapGetters([
      'line',
      'isEditable',
      'character',
    ]),
    skills() { return this.character.skills; },
    skillRolls() { return this.character.skillRolls; },
    rolls() { return this.character.rolls; },
    savingThrows() { return this.character.savingThrows; },
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
