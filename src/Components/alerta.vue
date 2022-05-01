<template>
  <button @click="emitGlobalEvent()">I'm a button</button>
</template>

<script>
  import { EventBus } from '../main'

  export default {
    name: 'TestButton',
    methods: {
      emitGlobalEvent() {
        EventBus.$emit('i-clicked-button')
      },
    },
  }
</script>