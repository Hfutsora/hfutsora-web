<template>
  <div
    class="input__button"
    @click="send">
    发送
  </div>
</template>

<script>

export default {
  name: 'InputButton',
  methods: {
    send(event) {
      this.$emit('newOwnMessage', event);
    },
  },
};
</script>

<style>

</style>
