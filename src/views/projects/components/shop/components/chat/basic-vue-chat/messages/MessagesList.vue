<template>
  <transition-group
    name="messages-list"
    tag="div">
    <div
      v-for="(message, index) in feed"
      :key="index"
      class="messages-list-item">
      <message-own
        v-if="String(message.id) === String(authorId)"
        :date="message.date"
        :image-url="transImageUrl(message)"
        :contents="message.contents" />
      <message-foreign
        v-else
        :author="message.author"
        :date="message.date"
        :image-url="transImageUrl(message)"
        :contents="message.contents" />
    </div>
  </transition-group>
</template>

<script>
import MessageOwn from './MessageOwn.vue';
import MessageForeign from './MessageForeign.vue';

export default {
  name: 'MessagesList',
  components: {
    MessageOwn,
    MessageForeign,
  },
  props: {
    feed: {
      type: Array,
      default: () => [],
      required: false,
    },
    authorId: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  computed: {

  },
  data() {
    return {
      URL,
    };
  },
  methods: {
    transImageUrl(message) {
      console.log(message);
      if (message.local) {
        return URL.createObjectURL(message.file);
      }
      return ((message.file && message.file.url)) ? message.file.url : '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
