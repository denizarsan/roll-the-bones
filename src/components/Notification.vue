<template>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <v-btn color="secondary" flat @click="close()">Dismiss</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Notification',
  props: ['text'],
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    open() {
      this.snackbar = true;
    },
    close() {
      this.snackbar = false;
    },
  },
  watch: {
    text() {
      this.open();
    },
  },
};
</script>
