<template>
  <v-snackbar v-model="notification.show">
    {{ notification.text }}
    <v-btn color="secondary" flat @click.native="hideNotification">Dismiss</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapGetters(['notification']),
  },
  methods: {
    ...mapMutations(['hideNotification']),
  },
};
</script>
