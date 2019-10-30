<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row class="form-header">
        <el-col :span="4">导出对象</el-col>
        <el-col :span="4" style="margin-left: 24px;">导出条目</el-col>
      </el-row>

      <div class="check-form" v-for="item in exportMap" :key="item.title">
        <el-row>
          <el-col :md="4" :sm="6" class="check-title">
            <el-checkbox :disabled="item.title === '商品信息'" :indeterminate="form.checkMap[item.title].isIndeterminate" @change="handleCheckAllChange($event, item.title)" style="margin: 0 24px 0 0;" v-model="form.checkMap[item.title].title" :label="item.title"></el-checkbox>
          </el-col>
          <el-col :md="4" :sm="6" v-for="child in item.children" :key="child" class="check-children">
            <el-checkbox-group v-model="form.checkMap[item.title].children" @change="handleCheckedValuesChange($event, item.title)">
              <el-checkbox :disabled="item.title === '商品信息'" style="margin: 14px 24px 0 0;" :label="child"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </div>

      <div class="flex-end" style="margin-top: 54px;">
        <el-button type="primary" @click="exportExcel" size="medium">导出</el-button>
        <el-button size="medium" @click="reset">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import _find from 'lodash/find';


import { exportMap, exportZhMap } from './export-common';

// import { getCommodityExport } from '@/api/data-centre';

export default {
  name: 'StatisticalStatementExportView',
  data() {
    return {
      exportMap,
      exportZhMap,
      form: {
        checkMap: {
          商品信息: {
            title: true,
            isIndeterminate: false,
            children: ['商品名称', '商品数量', '商品应收金额', '商品实付金额'],
          },
          订单信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          时间信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          收货地址: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          收货人信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          买家信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          退款信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
        },
        defaultCheckMap: {
          商品信息: {
            title: true,
            isIndeterminate: false,
            children: ['商品名称', '商品数量', '商品应收金额', '商品实付金额'],
          },
          订单信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          时间信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          收货地址: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          收货人信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          买家信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
          退款信息: {
            title: false,
            isIndeterminate: false,
            children: [],
          },
        },
      },
      loading: false,
    };
  },
  methods: {
    async exportExcel() {
      // const parameters = {
      //   body: {
      //     commodityTarget: this.form.checkMap['商品信息'].children.map(item => this.exportZhMap[item]),
      //     orderTarget: this.form.checkMap['订单信息'].children.map(item => this.exportZhMap[item]),
      //     timeTarget: this.form.checkMap['时间信息'].children.map(item => this.exportZhMap[item]),
      //     addressTarget: this.form.checkMap['收货地址'].children.map(item => this.exportZhMap[item]),
      //     receiverTarget: this.form.checkMap['收货人信息'].children.map(item => this.exportZhMap[item]),
      //     buyerTarget: this.form.checkMap['买家信息'].children.map(item => this.exportZhMap[item]),
      //     refundTarget: this.form.checkMap['退款信息'].children.map(item => this.exportZhMap[item]),
      //   },
      // };

      // await getCommodityExport(parameters);

      this.$message.success('导出申请成功');
    },
    handleCheckAllChange(value, title) {
      this.form.checkMap[title].children = value ? _find(this.exportMap, o => o.title === title).children : [];
      this.form.checkMap[title].isIndeterminate = false;
    },
    handleCheckedValuesChange(values, title) {
      const checkedCount = values.length;
      const childrenLength = _find(this.exportMap, o => o.title === title).children.length;
      this.form.checkMap[title].title = checkedCount === childrenLength;
      this.form.checkMap[title].isIndeterminate = checkedCount > 0 && checkedCount < childrenLength;
    },
    reset() {
      this.form.checkMap = JSON.parse(JSON.stringify(this.form.defaultCheckMap));
    },
  },
};
</script>

<style lang="scss" scoped>
.form-header {
  padding: 16px 16px;
  font-size: 14px;
  background: rgb(231, 234, 235);
  border: 1px solid rgb(218, 218, 218);
  border-bottom: none;
  color: #5a5959;
  font-weight: 700;
  font-size: 15px;
}
.check-form {
  border: 1px solid rgb(218, 218, 218);
  border-bottom: none;

  &:nth-last-child(2) {
    border-bottom: 1px solid rgb(218, 218, 218);
  }
  .check-title {
    padding: 14px 12px;
    margin-right: 24px;
    border-right: 1px solid rgb(238, 237, 237);
    background: rgb(250, 250, 250);
  }
  .check-body {
    padding: 14px 12px;

  }
}
</style>
