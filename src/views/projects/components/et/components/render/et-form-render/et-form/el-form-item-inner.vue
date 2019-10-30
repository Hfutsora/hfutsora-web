<template>
  <div>
    <div v-if="addAble">
      <el-form
        :label-position="inner ? 'top' : 'left'"
        class="et-form"
        :class="[{'et-form-item-border--inner' : appendIndex < appendLength}]"
        v-for="appendIndex in appendLength"
        :key="data.value + appendIndex"
      >
        <div v-if="appendLength > 1" class="delete-button">
          <span @click="formSplice(appendIndex)">
            <i class="el-icon-circle-close"></i>删除
          </span>
        </div>
        <div class="et-form-item-container">
          <el-form-item
            v-for="(item, formItemIndex) in data.contents"
            :key="item.label"
            :class="[inner ? 'et-form-item--inner': formItemIndex < data.contents.length - 1 ? 'et-form-item--outer et-form-item-border--outer': 'et-form-item--outer',
            blockList.indexOf(item.type) < 0 ? 'et-form-item-inline' : 'et-form-item-block']"
            label-width="120px"
          >
            <div slot="label" class="et-form-item--label" v-if="item.label">{{item.label}}</div>
            <div class="form-content">
              <et-form-item-middleware
                :transAnswer="answer[appendIndex - 1] ? answer[appendIndex - 1][formItemIndex] : {content: ''}"
                :formIndex="formIndex"
                :appendIndex="appendIndex"
                :formItemIndex="formItemIndex"
                :type="item.type"
                :item="item"
                @value-change="appendValueChange"
              ></et-form-item-middleware>
            </div>
          </el-form-item>
        </div>
        <div class="append-button" v-if="appendIndex === appendLength" @click="formAppend">
          <i class="el-icon-circle-plus-outline"></i>
          <div>增加</div>
        </div>
      </el-form>
    </div>
    <el-form v-else :label-position="inner ? 'top' : 'left'" class="et-form">
      <el-form-item
        v-for="(item, formItemIndex) in data.contents"
        :key="item.value ? item.value : item.label"
        :class="[inner ? 'et-form-item--inner': formItemIndex < data.contents.length - 1 ? 'et-form-item--outer et-form-item-border--outer': 'et-form-item--outer',
        blockList.indexOf(item.type) < 0 ? 'et-form-item-inline' : 'et-form-item-block']"
        label-width="120px"
      >
        <div slot="label" class="et-form-item--label" v-if="item.label">{{item.label}}</div>
        <div class="form-content">
          <et-form-item-middleware
            :transAnswer="answer[formItemIndex]"
            :formIndex="formIndex"
            :formItemIndex="formItemIndex"
            :type="item.type"
            :item="item"
            @value-change="valueChange"
          ></et-form-item-middleware>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EtFormItemMiddleware from './et-form-item-middleware';

export default {
  name: 'EtFormItemRender',
  components: {
    EtFormItemMiddleware,
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
    formOuterIndex: {
      type: Number,
    },
    transAnswer: {
      default: () => [],
    },
  },
  computed: {
    answer() {
      return this.transAnswer;
    },
    formItemData() {
      return this.answer || [];
    },
    appendLength() {
      return this.answer.length || 1;
    },
  },
  data() {
    return {
      blockList: [
        'textarea',
        'table',
        'form',
        'read-only',
        'file',
        'form-with-radio',
        'image-upload',
      ],
    };
  },
  methods: {
    formAppend() {
      const formItemObject = this.formItemData;
      formItemObject.push([]);
      this.formItemChange(formItemObject);
    },
    formSplice(index) {
      const formItemObject = this.formItemData;
      formItemObject.splice(index - 1, 1);
      this.formItemChange(formItemObject);
    },
    valueChange(value, type, formItemIndex) {
      const formItemObject = this.formItemData;
      formItemObject[formItemIndex] = value;

      this.formItemChange(formItemObject);
    },
    appendValueChange(value, type, formItemIndex, formOuterIndex, appendIndex) {
      const formItemObject = this.formItemData;
      if (formItemObject[appendIndex - 1]) {
        formItemObject[appendIndex - 1][formItemIndex] = value;
      } else {
        formItemObject[appendIndex - 1] = [];
        formItemObject[appendIndex - 1][formItemIndex] = value;
      }

      this.formItemChange(formItemObject);
    },
    formItemChange(formItemObject) {
      this.$emit(
        'form-item-change',
        JSON.parse(JSON.stringify(formItemObject)),
        this.formOuterIndex,
      );
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
  padding-bottom: 9px;
  margin-bottom: 10px;
  border-bottom: 1px dashed rgb(226, 226, 226);
}
.et-form-item--label {
  font-size: 14px;
  color: rgb(153, 153, 153);
}
.et-form-item--outer {
  padding: 10px 100px 25px 0;
  border: 1px dashed red;
}
.et-form-item-border--outer {
  border-bottom: 1px dashed rgb(226, 226, 226);
}
.item-inline-form {
  display: flex;
  justify-content: space-between;
}
.et-form-item-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.et-form-item-inline {
  margin-right: 19px;
  flex-basis: 214px;
}
// .et-form-item-inline:nth-child(3n) {
//   margin-right: 0;
// }
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
  transition: all 0.5s;
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
  right: -110px;
  display: flex;
  align-items: center;
}
</style>
