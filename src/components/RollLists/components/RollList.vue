<template>
  <v-flex xs12 md4>
    <v-list two-line subheader class="elevation-1 pb-0">
      <v-layout>
        <v-subheader>
          {{ title }}
        </v-subheader>
      </v-layout>
      <template v-for="value in list">
        <v-list-tile avatar :key="value.name" class="list-item">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ value.name }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ value.toString() }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <template v-if="editable">
            <slot name="editSection" :value="value"/>
          </template>
          <template v-else>
            <v-list-tile-action>
              <v-btn color="primary" flat icon @click="$emit('copy', value)">
                <v-icon color="primary">content_copy</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if="sendable">
              <v-btn color="secondary" flat icon @click="$emit('send', value)">
                <v-icon color="secondary">send</v-icon>
              </v-btn>
            </v-list-tile-action>
          </template>
        </v-list-tile>
      </template>
      <slot/>
    </v-list>
  </v-flex>
</template>

<script>
  export default {
    name: 'RollList',
    components: {},
    props: {
      title: {
        type: String,
        required: true,
      },
      list: {
        type: Array,
        required: true,
        validator: list =>
          list.every(value =>
            typeof value.name === 'string' &&
            typeof value.toString === 'function',
          ),
      },
      editable: {
        type: Boolean,
        required: false,
        default: false,
      },
      sendable: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {},
    methods: {},
  };
</script>

<style scoped>
.list-item + .list-item {
  border-top: 1px solid rgba(0,0,0,.12);
}
</style>
