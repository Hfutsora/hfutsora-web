<template>
  <div class="picture-input-area" v-loading="loading">
    <picture-input
      ref="picture-input"
      :prefill="preImage"
      @change="onChange"
      :zIndex="1"
      @error="handleError"
      width="300"
      height="300"
      accept="image/*"
      size="2"
      :hideChangeButton="true"
      :alertOnError="false"
      :customStrings="{
        upload: '<p>Your device does not support file uploading.</p>',
        drag: '选择图片'
      }"
    ></picture-input>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input';
// import OSS from 'ali-oss';
import _isPlainObject from 'lodash/isPlainObject';
import defaultPrefill from '@/assets/questionnaire/default-prefill.png';

// import { getAliToken, postFile, transFileLink } from '@/api/resource';

export default {
  name: 'EtFormImageUpload',
  components: {
    PictureInput,
  },
  props: {
    transAnswer: {
      default() {
        return {
          value: '',
          id: '',
        };
      },
    },
  },
  created() {
    if (!(this.answer && this.answer.id)) {
      this.emitChange('');
    }
  },
  computed: {
    answer() {
      return _isPlainObject(this.transAnswer)
        ? this.transAnswer
        : {
          value: '',
          id: '',
        };
    },
  },
  watch: {
    answer: {
      deep: true,
      handler({ id }) {
        if (id) {
          this.initPreImage(id);
        }
      },
    },
  },
  data() {
    return {
      loading: false,
      image: '',
      preImage: defaultPrefill,
      path: '',
      uploadErrorMap: {
        fileSize: '图片大小不能超过2MB',
        fileType: '只能上传图片',
      },
    };
  },
  methods: {
    onChange(image) {
      if (image) {
        this.image = this.$refs['picture-input'].file;
        this.submit();
      }
    },
    async initPreImage() {
      // try {
      //   this.loading = true;

      //   const { data } = await transFileLink({
      //     path: {
      //       id,
      //     },
      //   });
      //   this.preImage = data.url;
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   this.loading = false;
      // }
    },
    handleError(error) {
      this.$message.error(this.uploadErrorMap[error.type]);
    },
    async ossRequest() {
      // const fileName = file.name;
      // const client = new OSS(token);
      // this.path = `${this.token.path[0].replace('*', '')}appendix/${fileName}`;
      // await client.put(this.path, new Blob([file], { type: 'text/plain' }));
    },
    async submit() {
      // try {
      //   this.loading = true;
      //   const token = await getAliToken();
      //   this.token = token.data;
      //   await this.ossRequest(this.image, {
      //     accessKeyId: token.data.accessKeyId,
      //     accessKeySecret: token.data.accessKeySecret,
      //     bucket: token.data.bucket,
      //     region: token.data.region,
      //     stsToken: token.data.securityToken,
      //   });
      //   const { data } = await postFile({
      //     body: {
      //       type: 'appendix',
      //       filePath: this.path,
      //     },
      //   });
      //   this.emitChange(data);
      // } catch (err) {
      //   console.error(err);
      //   this.$message({
      //     type: 'error',
      //     message: '图片上传失败，请重试',
      //   });

      //   this.image = null;
      //   this.$refs['picture-input'].file = null;
      // } finally {
      //   this.loading = false;
      // }
    },
    emitChange({ id }) {
      this.$emit('value-change', { id });
    },
  },
};
</script>

<style lang="scss" scoped>
.picture-input-area {
  display: flex;
  justify-content: flex-start;
  width: 250px;
}
</style>
