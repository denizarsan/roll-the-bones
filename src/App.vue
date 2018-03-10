<template>
  <v-app>
    <v-content>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Roll the Bones</v-toolbar-title>
          <v-spacer></v-spacer>
          <auth @line-connected="update" @line-disconnected="update" @line-ready="update"/>
      </v-toolbar>
      <home :line="line"/>
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
  data() {
    return {
      line: null,
    };
  },
  methods: {
    update(line) {
      this.line = line;
    },
  },
};
</script>
