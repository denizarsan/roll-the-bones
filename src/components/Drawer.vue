<template>
  <v-navigation-drawer v-model="drawer.show" fixed clipped right app>
    <v-toolbar flat class="transparent" v-if="line.isConnected">
      <v-list two-line class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon v-if="line.isConnected">person</v-icon>
            <v-progress-circular v-if="line.isConnecting" indeterminate color="secondary"></v-progress-circular>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ line.user.username }} #{{ line.user.discriminator }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ line.server.name }} | {{ line.channel.name }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list>
      <v-divider v-if="line.isConnecting || line.isConnected"></v-divider>
      <v-list-tile ripple @click="showAuth()" v-if="!line.isConnected">
        <v-list-tile-action>
          <v-icon>mdi-login-variant</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Connect
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile ripple @click="disconnectLine" v-if="line.isConnected">
        <v-list-tile-action>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Disconnect
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile ripple @click="showLoadSave">
        <v-list-tile-action>
          <v-icon>import_export</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Import / Export
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Drawer',
  computed: {
    ...mapGetters(['drawer', 'line']),
  },
  methods: {
    ...mapMutations(['showAuth', 'showLoadSave', 'disconnectLine', 'toggleEditMode']),
  },
};
</script>
