<template>
  <v-app>
    <drawer></drawer>
    <v-toolbar dark color="primary" dense fixed clipped-right app>
      <v-toolbar-title>Roll the Bones</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleEdit">
        <v-icon>{{ isEditable ? 'lock_open' : 'lock' }}</v-icon>
      </v-btn>
      <v-btn icon @click="toggleDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <auth></auth>
    <load-save></load-save>
    <v-content>
      <v-container>
        <sheet></sheet>
      </v-container>
    </v-content>
    <notification></notification>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Sheet from './components/Sheet';
import Drawer from './components/Drawer';
import Auth from './components/Auth';
import LoadSave from './components/LoadSave';
import Notification from './components/Notification';

export default {
  name: 'App',
  components: {
    Sheet,
    Drawer,
    Auth,
    LoadSave,
    Notification,
  },
  computed: {
    ...mapState({
      isEditable: state => state.isEditable,
    }),
  },
  methods: {
    ...mapMutations(['toggleDrawer', 'toggleEditMode', 'showNotification']),
    toggleEdit() {
      this.toggleEditMode();
      if (!this.isEditable) {
        this.showNotification({ text: 'Character sheed updated' });
      }
    },
  },
};
</script>
