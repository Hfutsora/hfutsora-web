<template>
  <div class="input__container">
    <div v-viewer>
      <div class="image-container">
        <transition name="preview-fade">
          <div v-if="url || file" class="container-inner">
            <el-image
              v-if="url"
              class="image"
              ref="image"
              fit="fill"
              :src="url">
            </el-image>
            <div v-if="!url" class="flex-verticle-center"><i class="el-icon-document" style="margin-right: 4px;"></i>{{file.name}}</div>
          </div>
        </transition>
        <div v-if="removeStatus" @click="handleRemove">
          <i class="el-icon-close image-mask-button"></i>
        </div>
      </div>
    </div>
    <slot name="input-field">
      <input-field
        ref="input-field"
        v-model="message"
        :focusState.sync="focusState"
        @newOwnMessage="onNewOwnMessage" />
    </slot>
    <div class="features__container">
      <div class="input-images-upload">
        <el-upload
          action="/"
          :limit="1"
          ref="upload-button"
          :on-change="onChange"
          :file-list="fileList"
          :show-file-list="false"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :on-remove="handleRemove">
          <font-awesome-icon icon="paperclip" style="cursor: pointer; font-size: 24px; margin: 0 8px;"/>
        </el-upload>
      </div>
      <!-- <div class="input-images-upload input-emoji-picker__icon">
        <div
          style="font-size: 18px; margin-right: 6px;"
          id="emoji"
          @click="toggleEmojiPickerVisible">
          <label for="emoji">
            <font-awesome-icon icon="smile" style="cursor: pointer;"/>
          </label>
        </div>
      </div> -->
      <!-- <div
        :class="{ visible: !toggleEmojiPicker }"
        class="input-emoji-picker__container">
        <picker
          :show-preview="false"
          :show-skin-tones="false"
          :show-categories="false"
          :show-search="false"
          native
          @select="emojiPicked" />
      </div> -->
      <slot name="features" />
    </div>

    <slot name="input-button">
      <input-button @newOwnMessage="onNewOwnMessage" />
    </slot>
  </div>
</template>

<script>
// import { Picker } from 'emoji-mart-vue';
import InputField from './InputField.vue';
import InputButton from './InputButton.vue';

export default {
  name: 'InputContainer',
  components: {
    InputField,
    InputButton,
    // Picker,
  },
  props: {
    toggleEmojiPicker: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      message: '',
      url: '',
      file: '',
      fileList: [],
      URL,
      focusState: false,
      removeStatus: true,
      imageTypeList: ['image/jpeg', 'image/png', 'image/jpg'],
    };
  },
  methods: {
    onNewOwnMessage() {
      if ((!this.message || this.message === '') && !this.fileList.length) {
        return;
      }
      this.$emit('newOwnMessage', this.message, this.file);

      this.message = '';

      this.url = '';
      this.file = '';
      this.fileList.pop();
    },
    toggleEmojiPickerVisible() {
      this.$emit('toggleEmojiPicker');
    },
    emojiPicked(emoji) {
      this.message += emoji.native;
      this.toggleEmojiPickerVisible();
    },
    onChange(file, fileList) {
      const isFine = this.beforeUpload(file.raw);
      this.fileList = fileList;
      this.file = file.raw;

      if (this.imageTypeList.indexOf(file.raw.type) >= 0) {
        this.url = URL.createObjectURL(file.raw);
      }

      if (!isFine) {
        this.fileList.pop();
      }

      this.focusState = true;
      this.removeStatus = true;
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }

      return isLt2M;
    },
    handleRemove() {
      this.removeStatus = false;
      this.fileList.pop();
      this.file = '';
      this.url = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.visible {
  display: none;
}
.image {
  margin-right: 5px;
  width: 120px;
  cursor: pointer;
  height: 120px;
  border: 5px solid white;
  border-radius: 15px;
}
.image-container {
  &:hover .image-mask-button {
    opacity: 0.4;
  }
  .image-mask-button:hover {
    opacity: 0.8;
  }

  .container-inner {
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.image-mask-button {
  color: white;
  border-radius: 14px;
  background: black;
  position: absolute;
  padding: 2px;
  font-size: 20px;
  left: 105px;
  top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all .5s;
  cursor: pointer;

  .el-icon-close {
    color: white;
    font-weight: 1000;
    background: white;
  }
}

.preview-fade-enter-active {
  transition: all .3s ease;
}
.preview-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.preview-fade-enter, .preview-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
