<template>
  <v-list two-line subheader class="elevation-1 pb-0">
    <v-subheader>Saving Throws</v-subheader>
    <template v-for="roll in rolls">
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
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'SavingThrows',
  computed: {
    ...mapState({
      line: state => state.line,
      rolls: state => state.character.savingThrows,
    }),
  },
  methods: {
    ...mapMutations(['showNotification']),
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
  },
};
</script>

<style scoped>

</style>
