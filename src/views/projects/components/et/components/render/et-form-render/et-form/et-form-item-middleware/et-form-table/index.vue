<template>
  <div>
    <template v-if="!(data.schema && data.schema.direction === 'column')">
      <el-table :data="tableData" border>
        <el-table-column
          align="center"
          header-align="center"
          v-for="(col, colIndex) in data.contents"
          :key="col.lel"
          :prop="col.label"
          :label="col.label">
          <template slot-scope="scope">
            <div class="col">
              <et-form-table-middleware :data="col" :value="tableData[scope.$index][colIndex]" :rowIndex="scope.$index" :type="col.type" :colIndex="colIndex" @value-change="valueChange"></et-form-table-middleware>
              <span v-if="colIndex + 1 === data.contents.length" class="delete-button" @click="tableDelete(scope)"><i class="el-icon-circle-close"></i>删除</span>
            </div>
          </template>
        </el-table-column>
        <div slot="append" v-if="data.addAble" class="append-button" @click="tableAppend">
          <i class="el-icon-circle-plus-outline"></i><div>增加</div>
        </div>
      </el-table>
    </template>
    <template v-else>
      <table cellspacing="0">
        <tr v-for="(col, colIndex) in data.contents" :key="data.value + colIndex">
          <th>{{col.label}}</th>
          <td>
            <et-form-table-middleware :data="col" :value="tableData[colIndex]"  :type="col.type" :colIndex="colIndex" @value-change="valueChange"></et-form-table-middleware>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import _isArray from 'lodash/isArray';

import EtFormTableMiddleware from './table-middleware';

export default {
  name: 'EtFormTable',
  components: {
    EtFormTableMiddleware,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    transAnswer: {
      type: Object,
      default() {
        return {
          value: '',
          content: [],
        };
      },
    },
  },
  created() {
    if (!(this.answer && this.answer.content)) {
      this.emitTableData();
    }
  },
  computed: {
    tableData() {
      if (!(this.data.schema && this.data.schema.direction === 'column')) {
        return _isArray(this.transAnswer.content) && this.transAnswer.content.length ? this.transAnswer.content : [[]];
      }
      return this.transAnswer.content.length ? this.transAnswer.content : [''];
    },
  },
  methods: {
    tableAppend() {
      this.tableData.push([]);
      this.emitTableData();
    },
    tableDelete({ $index }) {
      this.tableData.splice($index, 1);
      this.emitTableData();
    },
    valueChange(value, rowIndex, colIndex) {
      if (rowIndex === undefined) {
        this.$set(this.tableData, colIndex, value);
      } else {
        const rowData = this.tableData[rowIndex];
        rowData[colIndex] = value;
        this.$set(this.tableData, rowIndex, rowData);
      }

      this.emitTableData();
    },
    emitTableData() {
      this.$emit('value-change', { content: this.tableData });
    },
  },
};
</script>

<style lang="scss" scoped>
.append-button {
  display: flex;
  justify-content: center;
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
  .el-icon-circle-close, .el-icon-circle-plus-outline {
    margin-right: 5px;
  }
}
.col {
  display: flex;
}
.delete-button {
  @extend .append-button;
  width: 100px;
  color: rgb(213, 99, 84);
  position: absolute;
  right: -100px;
}

table {
  width: 100%;
  border-width: 1px;
  border-color: #EBEEF5;
  border-collapse: collapse;
  word-wrap: break-word;
  word-break: break-all;
}
table td {
  border-width: 1px;
  border-color: #EBEEF5;
  height: 40px;
  padding: 0 0.2em 0 0.5em;
  text-align: center;
  border: 1px solid #EBEEF5;
}
table th {
  color: #909399;
  border-width: 1px;
  border-color: #EBEEF5;
  font-weight: 500;
  padding: 0.5em 2em;
  border: 1px solid #EBEEF5;
}
</style>
