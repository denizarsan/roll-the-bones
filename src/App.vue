<template>
  <v-app>
    <drawer></drawer>
    <v-toolbar dark color="primary" dense fixed clipped-right app>
      <v-toolbar-title>Roll the Bones</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <auth></auth>
    <v-content>
      <v-container>
        <sheet></sheet>
      </v-container>
    </v-content>
    <notification></notification>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';

import Drawer from './components/Drawer';
import Auth from './components/Auth';
import Sheet from './components/Sheet';
import Notification from './components/Notification';

export default {
  name: 'App',
  components: {
    Drawer,
    Auth,
    Sheet,
    Notification,
  },
  methods: {
    ...mapMutations(['toggleDrawer']),
  },
};
</script>
