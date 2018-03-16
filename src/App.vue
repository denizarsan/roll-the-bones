<template>
  <v-app>
    <v-content>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Roll the Bones</v-toolbar-title>
        <v-spacer></v-spacer>
        <auth></auth>
      </v-toolbar>
      <v-container>
        <home></home>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Auth from './components/Auth';

export default {
  name: 'App',
  components: {
    Home,
    Auth,
  },
};
</script>
