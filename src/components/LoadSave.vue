<template>
  <v-dialog v-model="show" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="secondary">
        <v-btn icon @click="hideLoadSave" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Import / Export</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-layout class="mb-3" column>
          <v-flex xs12 class="title mb-2">
            <v-icon left>file_download</v-icon>
            Import
          </v-flex>
          <v-flex xs12 class="mb-2">Paste your exported data in to the field below:</v-flex>
          <v-flex xs12>
            <v-text-field v-model="newCharacter"></v-text-field>
          </v-flex>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="load()">Load</v-btn>
          </v-layout>
        </v-layout>
        <v-layout class="mb-3" wrap  v-if="character">
          <v-flex xs12 class="title mb-2">
            <v-icon left>file_upload</v-icon>
            Export
          </v-flex>
          <v-flex xs12 class="mb-2">Copy the text below to export your data:</v-flex>
          <v-flex xs12>
            <pre class="code ma-2 pa-3 grey lighten-3">
              {{ this.encode(character) }}
            </pre>
          </v-flex>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="copy()">
              <v-icon left>content_copy</v-icon>
              Copy
            </v-btn>
          </v-layout>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Character from '@/classes/Character';

export default {
  name: 'LoadSave',
  computed: {
    ...mapState({
      show: state => state.loadSave.show,
    }),
  },
  data() {
    return {
      character: localStorage.getItem('character'),
      newCharacter: '',
    };
  },
  methods: {
    ...mapMutations(['showNotification', 'hideLoadSave', 'loadCharacter']),
    copy() {
      let encoded = this.encode(this.character);
      this.$copyText(encoded).then(() => {
        this.showNotification({ text: 'Copied character details to clipboard.' });
      }, () => {
        this.showNotification({ text: 'Failed to copy text to clipboard.' });
      });
    },
    load() {
      let data;
      let character;

      try {
        data = JSON.parse(this.decode(this.newCharacter));
      } catch (e) {
        this.showNotification({ text: 'Failed to import character. Data is corrupt.' });
        return;
      }

      try {
        character = new Character(
          data.name,
          data.class,
          data.level,
          data.abilities,
          data.skills,
          data.rolls);
        character.initiativeBonus = data.initiativeBonus;
        character.attackHitBonus = data.attackHitBonus;
        character.spellHitBonus = data.spellHitBonus;
      } catch (e) {
        this.showNotification({ text: 'Failed to import character. Data has missing values.' });
        return;
      }
      this.loadCharacter({ character });
      this.newCharacter = '';
      this.showNotification({ text: `Successfully loaded ${character.name} Lv.${character.level} ${character.class}` });
      this.hideLoadSave();
    },
    encode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)));
    },
    decode(str) {
      return decodeURIComponent(atob(str).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    },
  },
};
</script>

<style scoped>
.code {
  border-radius: 0.5em;
  border: 1px solid;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
