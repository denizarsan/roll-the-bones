<template>
  <v-app>
    <drawer></drawer>
    <v-toolbar dark color="primary" dense fixed clipped-right app>
      <v-toolbar-title>Roll the Bones</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleEditMode">
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
import { mapGetters, mapMutations } from 'vuex';

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
    ...mapGetters(['isEditable']),
  },
  methods: {
    ...mapMutations(['toggleDrawer', 'toggleEditMode', 'showNotification']),
  },
};
</script>

<style>
.appear-enter-active {
  animation: appear .5s;
}
.appear-leave-active {
  animation: appear .5s reverse;
}

@keyframes appear {
  0%    { transform: scale(0); }
  100%  { transform: scale(1); }
}
</style>
