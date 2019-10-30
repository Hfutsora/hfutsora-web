<template>
  <div id="elder-list">
    <div class="content">
      <el-row
        style="margin-bottom: 10px">
        <el-col :span="24">
          <el-form
            :model="filterForm"
            inline>
            <el-form-item
              label="老人姓名"
              prop="name">
              <el-input
                v-model="filterForm.name"
                placeholder="请输入老人姓名"></el-input>
            </el-form-item>
            <el-form-item
              label="居住状态"
              prop="liveStatus">
              <el-select
                v-model="filterForm.liveStatus"
                placeholder="请选择居住状态">
                <el-option
                  v-for="item in liveStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="年龄区间"
              prop="ageRange">
              <el-input-number
                v-model="filterForm.ageRange.min"
                :min="0"
                placeholder="最小值"></el-input-number>
              -
              <el-input-number
                v-model="filterForm.ageRange.max"
                :min="0"
                placeholder="最大值"></el-input-number>
            </el-form-item>
            <el-form-item
              label="老人性别"
              prop="gender">
              <el-select
                v-model="filterForm.gender"
                placeholder="请选择老人性别">
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary">查询</el-button>
              <el-button @click="resetHandler">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form inline>
            <el-form-item>
              <el-button
                type="primary"
                @click="appendElderHandler"><i class="el-icon-plus"></i>添加老人</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <data-tables-server
        :data="data"
        :total="total"
        :loading="loading"
        :table-props="tableProps"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        :pagination-props="{background: true, pageSizes: pageSizes}"
        @query-change="loadData"
      >
        <el-table-column
          v-for="title in titles"
          :prop="title.prop"
          :label="title.label"
          :key="title.label">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteElderRow(scope)">删除</el-button>
          </template>
        </el-table-column>
      </data-tables-server>
    </div>

    <elder-append-dialog :dialogVisible.sync="dialogVisible" :type="editType" :editRow="editRow"></elder-append-dialog>
  </div>
</template>

<script>
import {
  titles,
  liveStatusOptions,
  genderOptions,
} from './common.js';

import ElderAppendDialog from './components/appendDialog';

export default {
  name: 'CareListView',
  components: {
    ElderAppendDialog,
  },
  data() {
    return {
      filterForm: {
        name: '',
        liveStatus: '全部',
        ageRange: {
          min: 0,
          max: 0,
        },
        gender: '全部',
      },
      data: [],
      titles,
      liveStatusOptions,
      genderOptions,
      loading: false,
      total: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      currentPage: 1,
      tableProps: {
        headerRowStyle: {
          backgroundColor: '#fafafa',
        },
        headerCellStyle: {
          backgroundColor: '#fafafa',
        },
      },
      dialogVisible: false,
      editType: 'append',
      editRow: {

      },
    };
  },
  async created() {
    //
  },
  methods: {
    async init() {
      this.data = [{
        sid: 2015,
        name: 'hfutsora',
        gender: '男',
        birthday: '1996-11-10',
        age: 22,
        livingState: '独居',
        address: '合肥',
      }];
    },
    async loadData(event) {
      if (event.type && (event.type === 'page' || event.type === 'size')) {
        this.pageSize = event.pageSize;
        this.handleSearch();

        return;
      }
      if (event.type && event.type === 'init') {
        this.init();
      }
    },
    async handleSearch() {
      //
    },
    async resetHandler() {
      // this.filterForm = {
      //   name: '',
      //   liveStatus: '全部',
      //   ageRange: {
      //     min: 0,
      //     max: 0,
      //   },
      //   gender: '全部',
      // };
      // await this.initElderList({
      //   qs: {
      //     count: 20,
      //   },
      // });
    },
    appendElderHandler() {
      this.dialogVisible = true;
      // this.$message({
      //   type: 'success',
      //   message: '添加老人成功',
      // });
    },
    async  deleteElderRow(scope) {
      console.log(scope);
      try {
        await this.$confirm(`确认删除 ${scope.row.name}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });

        this.data.splice(scope.$index, 1);
        this.$message('删除成功');
      } catch (err) {
        console.error(err);
      }
    },
  },

};
</script>

<style scoped>
#elder-list {
  background: #f0f2f5;
}

.el-select,
.el-input,
.el-input-number {
  width: 200px;
}

.content {
  background: #fff;
  padding: 32px;
}
</style>
