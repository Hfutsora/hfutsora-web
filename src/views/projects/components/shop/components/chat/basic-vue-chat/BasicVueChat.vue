<template>
  <div
    class="basic-vue-chat chat-body">
    <section class="window">
      <header class="window__header__container">
        <slot name="header">
          {{ title }}
        </slot>
      </header>
      <section
        id="window__messages__container"
        class="window__messages__container">
        <slot>
          <messages-list
            :feed="feed"
            :author-id="authorId"
            class="messages-list" />
        </slot>
      </section>
      <div class="window__input__container">
        <slot name="input-container">
          <input-container
            :toggle-emoji-picker="toggleEmojiPicker"
            @newOwnMessage="onNewOwnMessage"
            @toggleEmojiPicker="toggleEmojiPickerDialog"
          />
        </slot>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment';
import { scrollToBottom } from '@/utils/scroll.js';
import MessagesList from './messages/MessagesList.vue';
import InputContainer from './input/InputContainer.vue';

import store from '@/store';

export default {
  name: 'BasicVueChat',
  components: {
    MessagesList,
    InputContainer,
  },
  props: {
    initialAuthorId: {
      type: Number,
      default: 13600000003,
      required: false,
    },
    attachMock: {
      type: Boolean,
      default: false,
      required: false,
    },
    initialFeed: {
      type: Array,
      default() {
        return [];
      },
      required: false,
    },
  },
  data() {
    return {
      title: '我的店铺',
      feed: [],
      authorId: 0,
      toggleStatus: false,
      toggleEmojiPicker: false,
    };
  },
  watch: {
    messageListLength(length) {
      if (length !== this.feed.length) {
        this.updateFeedList();
      }
    },
  },
  computed: {
    messageListLength() {
      return this.$store.getters.messageListLength;
    },
  },
  created() {
    store.dispatch('connect');

    this.updateFeedList();
    this.authorId = this.initialAuthorId;
  },
  methods: {
    updateFeedList() {
      const currentDay = moment().format('YYYY-MM-DD');
      this.feed = this.$store.getters.messageList.map(msg => ({
        id: msg.from,
        author: msg.fromNick,
        contents: msg.text,
        date: moment(msg.time).format('YYYY-MM-DD') === currentDay ? moment(msg.time).format('hh:mm:ss') : moment(msg.time).format('YYYY-MM-DD hh:mm:ss'),
        file: msg.file,
      }));

      scrollToBottom();
    },
    setEmojiPickerToggle(toggle) {
      this.toggleEmojiPicker = toggle;
    },
    pushToFeed(message) {
      this.feed.push(Object.assign(message, { local: true }));

      if (message.file) {
        this.nimFileSend(message);

        return;
      }

      if (message.contents) {
        this.$store.getters.nim.sendText({
          scene: 'p2p',
          to: '13600000001',
          isHistoryable: true,
          isRoamingable: true,
          isOfflinable: true,
          isSyncable: true,
          isUnreadable: true,
          text: message.contents,
          done: (msg) => {
            console.log('发送消息成功 new message', msg, message);
          },
        });
      }
    },
    nimFileSend(message) {
      const reader = new FileReader();
      reader.readAsDataURL(message.file);

      reader.onload = () => {
        console.log('message file', message.file, reader.result);

        store.getters.nim.sendFile({
          scene: 'p2p',
          to: '13600000001',
          type: 'image',
          dataURL: reader.result,
          text: message.contents,
          beginupload(upload) {
            console.log('upload', upload);
            // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
          },
          uploadprogress(obj) {
            console.log(`文件总大小: ${obj.total}bytes`);
            console.log(`已经上传的大小: ${obj.loaded}bytes`);
            console.log(`上传进度: ${obj.percentage}`);
            console.log(`上传进度文本: ${obj.percentageText}`);
          },
          uploaddone(error, file) {
            console.log(error);
            console.log(file);
            console.log(`上传${!error ? '成功' : '失败'}`);
          },
          beforesend(msg) {
            console.log(`正在发送p2p image消息, id=${msg.idClient}`);
          },
          done: (msg) => {
            console.log('发送文件成功 new file', msg);
          },
        });
      };
    },
    onNewOwnMessage(message, file) {
      const newOwnMessage = {
        id: this.authorId,
        contents: message,
        file,
        date: moment().format('hh:mm:ss'),
      };

      this.pushToFeed(newOwnMessage);

      scrollToBottom();

      // this.$emit('newOwnMessage', message);
    },
    toggleEmojiPickerDialog() {
      this.setEmojiPickerToggle(!this.toggleEmojiPicker);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/basic-chat/main.scss";
</style>
