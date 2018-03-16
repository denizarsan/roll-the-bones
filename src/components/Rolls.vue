<template>
  <v-list two-line subheader class="elevation-1 pb-0">
    <v-layout>
      <v-subheader>Rolls</v-subheader>
      <v-spacer></v-spacer>
      <v-btn color="secondary" flat icon @click="edit = !edit" v-if="rolls.length">
        <v-icon color="secondary">{{ edit ? 'lock_open' : 'lock' }}</v-icon>
      </v-btn>
    </v-layout>
    <template v-for="roll in rolls">
      <v-list-tile avatar>
        <v-list-tile-action v-if="edit">
          <v-btn color="error" flat icon @click="remove(roll)">
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
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import NewRoll from './NewRoll';

export default {
  name: 'Rolls',
  components: { NewRoll },
  computed: {
    ...mapState({
      line: state => state.line,
      rolls: state => state.character.rolls,
    }),
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    ...mapMutations(['showNotification', 'removeRoll']),
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
    remove(roll) {
      this.removeRoll({ roll });
      if (this.rolls.length < 1) {
        this.edit = false;
      }
    },
  },
};
</script>
