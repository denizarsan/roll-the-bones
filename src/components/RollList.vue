<template>
  <v-list two-line subheader class="pb-0">
    <v-subheader>Rolls</v-subheader>
    <template v-for="(roll, index) in rolls">
      <v-list-tile avatar ripple :key="index">
        <v-list-tile-content>
          <v-list-tile-title>{{roll.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{ roll.toString() }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="canDelete">
          <v-btn icon ripple @click="remove(roll)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-btn icon ripple @click="copy(roll)">
            <v-icon color="primary">content_copy</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action v-if="canSend">
          <v-btn icon ripple @click="send(roll)">
            <v-icon color="secondary">send</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'RollList',
  props: ['rolls', 'canSend', 'canDelete'],
  methods: {
    remove(roll) {
      this.$emit('roll-remove', roll);
    },
    copy(roll) {
      this.$emit('roll-copy', roll);
    },
    send(roll) {
      this.$emit('roll-send', roll);
    },
  },
};
</script>
