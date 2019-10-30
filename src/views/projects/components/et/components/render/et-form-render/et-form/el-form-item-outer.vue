<template>
  <el-form :label-position="inner ? 'top' : 'left'" class="et-form">
    <el-form-item
      v-for="(item, formOuterIndex) in data.content"
      :key="item.value ? item.value : item.label"
      class="et-form-item-block et-form-item--outer"
      :label-width="item.type === 'read-only' ? '100%' : '120px'">
      <div slot="label" class="et-form-item--label" v-if="item.label">{{item.label}}</div>

      <div v-if="item.type !== 'form'">
        <et-form-item-middleware outer :transAnswer="answer.content[formOuterIndex]" :formIndex="formIndex" :formOuterIndex="formOuterIndex" :type="item.type" :item="item"  @value-change="valueChange"></et-form-item-middleware>
      </div>
      <div v-else-if="item.type === 'form'">
        <el-form-item-inner :addAble="item.addAble" :transAnswer="answer.content[formOuterIndex]" @form-item-change="formItemChange" :formIndex="formIndex" :formOuterIndex="formOuterIndex" :data="item" inner></el-form-item-inner>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import EtFormItemMiddleware from './et-form-item-middleware';
import ElFormItemInner from './el-form-item-inner';

export default {
  name: 'EtFormItemRender',
  components: {
    EtFormItemMiddleware,
    ElFormItemInner,
  },
  props: {
    data: {
      type: Object,
    },
    addAble: {
      type: Boolean,
      default: false,
    },
    inner: {
      type: Boolean,
      default: false,
    },
    formIndex: {
      type: Number,
    },
    answer: {
      type: Object,
      default() {
        return {
          value: '',
          content: [],
        };
      },
    },
  },
  computed: {
    formData() {
      return this.answer.content;
    },
  },
  data() {
    return {
      blockList: ['textarea', 'table', 'form', 'read-only', 'file', 'form-with-radio', 'image-upload'],
    };
  },
  methods: {
    valueChange(value, type, formItemIndex, formOuterIndex) {
      const formObject = {
        id: this.data.id,
        content: this.formData,
      };
      formObject.content[formOuterIndex] = value;
      // this.$set(this.formData, formOuterIndex, value);
      this.emitForm(formObject);
    },
    formItemChange(formItemData, formOuterIndex) {
      const formObject = {
        id: this.data.id,
        content: this.formData,
      };
      formObject.content[formOuterIndex] = formItemData;
      this.emitForm(formObject);
    },
    emitForm(formObject) {
      this.$emit('form-item-change', JSON.parse(JSON.stringify(formObject)), this.formIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.et-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.et-form-item--inner {
  padding: 0 0px 25px 0;
}
.et-form-item-border--inner {
  border-bottom: 1px dashed rgb(226, 226, 226);
}
.et-form-item--label {
  font-size: 14px;
  color: rgb(153, 153, 153);
}
.et-form-item--outer {
  padding: 10px 100px 25px 0;
  width: 100%;
}
.et-form-item-border--outer {
  border-bottom: 1px dashed rgb(226, 226, 226);
}
.item-inline-form {
  display: flex;
  justify-content: flex-start;
  flex-basis: 100%;
}
.et-form-item-inline {
  margin-right: 3%;
  flex-basis: 30%;
}
.et-form-item-block {
  flex-basis: 800px;
}
.append-button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: rgb(58, 175, 159);
  cursor: pointer;
  transition: all .5s;
  div {
    display: flex;
    align-items: center;
  }
  &:hover {
    filter: brightness(1.2);
  }
  .el-icon-circle-plus-outline {
    margin-right: 5px;
  }
}
.delete-button {
  @extend .append-button;
  width: 100px;
  color: rgb(213, 99, 84);
  position: absolute;
  right: -100px;
  padding: 10px 0;
  display: flex;
  align-items: center;
}
</style>
