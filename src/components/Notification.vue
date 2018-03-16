<template>
  <v-snackbar v-model="notification.show">
    {{ notification.text }}
    <v-btn color="secondary" flat @click.native="hideNotification">Dismiss</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapState({
      notification: state => state.notification,
    }),
  },
  methods: {
    ...mapMutations(['hideNotification']),
  },
};
</script>
