<template>
  <div>
    <v-list-tile ripple @click="open()">
      <v-list-tile-content>
        <v-list-tile-title class="primary--text">
          <v-icon medium color="primary">add</v-icon>
          New Roll
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <roll-dialog
      v-if="dialog"
      @close="close"
      @add="add"
      title="New Roll"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import RollDialog from './RollDialog';

export default {
  name: 'NewRoll',
  components: {
    RollDialog,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapMutations(['addRoll']),
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    add(roll) {
      this.addRoll({ roll });
      this.close();
    },
  },
};
</script>

<style scoped>
.label-like {
  color: rgba(0,0,0,.54);
  font-size: 16px
}
</style>
