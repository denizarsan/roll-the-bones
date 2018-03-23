<template>
  <v-flex xs12 sm3 class="white elevation-1 pa-3">
    <v-layout align-center column>
      <div class="title my-2">
        {{ title }}
      </div>
      <v-layout align-center>
        <transition name="appear">
          <v-btn small icon v-if="editable" @click="$emit('decrement')" :disabled="isDecrementDisabled">
            <v-icon color="secondary">remove_circle</v-icon>
          </v-btn>
        </transition>
        <div class="subheading my-2">
          {{ value }}
        </div>
        <transition name="appear">
          <v-btn small icon v-if="editable" @click="$emit('increment')" :disabled="isIncrementDisabled">
            <v-icon color="secondary">add_circle</v-icon>
          </v-btn>
        </transition>
      </v-layout>
      <v-layout justify-center>
        <v-btn color="primary" @click="$emit('copy')" small flat icon>
          <v-icon small>content_copy</v-icon>
        </v-btn>
        <v-btn color="secondary" v-if="sendable" @click="$emit('send')" small flat icon>
          <v-icon small>send</v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
  </v-flex>
</template>

<script>
  export default {
    name: 'RollCard',
    components: {},
    props: {
      title: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: false,
        default: null,
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
      isDecrementDisabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      isIncrementDisabled: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {};
    },
    computed: {},
    methods: {},
  };
</script>
