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
      <v-list-tile-action
        slot="editSection"
        slot-scope="{ value }"
      >
        <v-checkbox
          v-model="skills.find(skill => skill.name === value.name).proficient"
          @click="onCheckboxClick(value)"/>
      </v-list-tile-action>
    </RollList>

    <RollList
      title="Rolls"
      :list="rolls"
      :editable="isEditable"
      :sendable="line.isReady"
      @copy="copy"
      @send="send"
    >
      <template
        slot="editSection"
        slot-scope="{ value }"
      >
        <v-list-tile-action>
          <v-btn color="primary" flat icon @click="openRollDialog(value)">
            <v-icon color="primary">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-btn color="error" flat icon @click="onRemoveClick(value)">
            <v-icon color="error">remove_circle</v-icon>
          </v-btn>
        </v-list-tile-action>
      </template>
      <new-roll slot="additionalValues"></new-roll>
    </RollList>

    <RollList
      title="Saving Throws"
      :list="savingThrows"
      :sendable="line.isReady"
      @copy="copy"
      @send="send"
    />

    <roll-dialog
      v-if="dialog"
      @close="dialog = false"
      @add="onEdit"
      :roll="currentRoll"
      title="Edit Roll"
    />
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NewRoll from './components/NewRoll';
import RollList from './components/RollList';
import RollDialog from './components/RollDialog';

export default {
  name: 'RollLists',
  components: {
    NewRoll,
    RollList,
    RollDialog,
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
      dialog: false,
      currentRoll: null,
    };
  },
  methods: {
    ...mapMutations(['updateRoll', 'showNotification', 'toggleSkill', 'removeRoll']),
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
    openRollDialog(currentRoll) {
      this.currentRoll = currentRoll;
      this.dialog = true;
    },
    onEdit(roll) {
      this.updateRoll({ oldRoll: this.currentRoll, newRoll: roll });
      this.dialog = false;
    },
  },
};
</script>
