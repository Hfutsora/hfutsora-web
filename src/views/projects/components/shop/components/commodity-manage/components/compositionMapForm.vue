<template>
  <el-form class="form" size="medium" label-width="120px" label-suffix="：">
    <div class="form-body">
      <el-form-item label="商品规格">
        <div class="edit-standard-area">
          <div :class="[{'standard-composition-area' : standardIndex < standards.length - 1}]" v-for="(standard, standardIndex) in standards" :key="'title' + standardIndex">
            <div class="standard-header-area flex-between flex-verticle-center">
              <div>
                <span class="margin-top-14">规格名：</span>
                <el-input placeholder="请输入规格名" style="width: 200px;" @blur.native.capture="standardTitleChange($event, standardIndex)" v-model="standard['name']"></el-input>
              </div>
              <i class="el-icon-error heaeder-delete-button" @click="deleteStandard(standardIndex)"></i>
            </div>
            <div class="standard-value-area">
              <div class="margin-top-14 padding-left-16" style="min-width: 72px;">规格值：</div>
              <div class="standard-value-area flex-wrap">
                <div class="value-input-area flex-col" v-for="(standardValue, valueIndex) in standard['values']" :key="standard['name'] + valueIndex">
                  <el-input
                    style="width: 200px;"
                    class="margin-top-14"
                    placeholder="请输入规格值"
                    @blur.native.capture="standardValueChange($event, standardIndex, valueIndex)"
                    v-model="standard['values'][valueIndex]"
                  ></el-input>
                  <div>
                    <i class="el-icon-error value-delete-button" @click="deleteValue(standardIndex, valueIndex)"></i>
                  </div>
                </div>
                <div class="standard-value-append" style="margin-top: 14px;">
                  <span @click="appendStandardValue(standardIndex)">添加规格值</span>
                </div>
              </div>
            </div>
          </div>

          <div class="standard-header-area margin-top-14">
            <el-button @click="appendStandardComposition">添加规则项目</el-button>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="价格库存">
        <div class="composition-table">
          <el-row class="table-header flex-between">
            <el-col v-for="standard in standardsTableTile" :key="standard.name + '-title-read-only'">
              {{standard.name}}
            </el-col>
            <el-col>价格(元)</el-col>
            <el-col :offset="1">库存</el-col>
          </el-row>

          <el-row class="table-row flex-between" v-for="(composition, index) in compositionTable" :key="'row-composition' + index">
            <el-col v-for="(value, colIndex) in composition" :key="value + '-' + index + '-' + colIndex + '-value-read-only'">{{value}}</el-col>

            <el-col>
              <el-input-number :precision="2" :controls="false" :value="compositionValues[compositionSpecialName(standards, composition)] ? compositionValues[compositionSpecialName(standards, composition)]['price'] : ''" @input="valueChange($event, compositionSpecialName(standards, composition), 'price')" class="table-inner-small-input"></el-input-number>
            </el-col>

            <el-col :offset="1">
              <el-input-number :precision="0" :controls="false" :value="compositionValues[compositionSpecialName(standards, composition)] ? compositionValues[compositionSpecialName(standards, composition)]['quantity'] : ''" @input="valueChange($event, compositionSpecialName(standards, composition), 'quantity')" class="table-inner-small-input"></el-input-number>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import _keysIn from 'lodash/keysIn';
import _mapValues from 'lodash/mapValues';

export default {
  name: 'CompositionMapForm',
  data() {
    return {
      defaultStandards: [],
      standards: [{
        name: '',
        values: [''],
      }],
      compositionTable: [],
      compositionValues: {},
    };
  },
  computed: {
    standardsTableTile() {
      return this.defaultStandards.filter(standard => standard.name && standard.values[0]);
    },
    compositions() {
      const compositions = {};
      this.compositionTable.forEach((composition) => {
        const specialName = this.compositionSpecialName(this.standards, composition);

        compositions[specialName] = {
          quantity: this.compositionValues[specialName] ? this.compositionValues[specialName].quantity : '',
          price: this.compositionValues[specialName] ? this.compositionValues[specialName].price * 100 : '',
        };
      });

      return compositions;
    },
  },
  watch: {
    compositions: {
      handler() {
        this.$emit('composition-value-change');
      },
      deep: true,
    },
  },
  async created() {
    this.defaultStandards = JSON.parse(JSON.stringify(this.standards));
    await this.setCompositionTable();
  },
  methods: {
    initComposition(standards, compositions) {
      this.standards = JSON.parse(JSON.stringify(standards));
      this.defaultStandards = JSON.parse(JSON.stringify(standards));

      this.setCompositionTable();
      this.compositionValues = _mapValues(compositions, composition => ({
        quantity: composition.quantity,
        price: composition.price / 100,
      }));
    },
    /**
     * @params type is in [price, quantity]
     */
    valueChange(value, specialName, type) {
      if (!this.compositionValues[specialName]) {
        this.$set(this.compositionValues, specialName, {
          price: '',
          quantity: '',
        });
      }

      if (type === 'price' || type === 'quantity') {
        value = Number(value);
      }
      this.$set(this.compositionValues[specialName], type, value);
    },
    standardTitleChange($event, standardIndex) {
      const fIndex = this.defaultStandards.map(standard => standard.name).indexOf($event.srcElement.value);
      if (fIndex >= 0 && fIndex !== standardIndex) {
        this.$message.error('已经添加了相同的规格值');
        this.standards = JSON.parse(JSON.stringify(this.defaultStandards));
        return;
      }

      this.defaultStandards = JSON.parse(JSON.stringify(this.standards));
      this.setCompositionTable();
    },
    standardValueChange($event, standardIndex, valueIndex) {
      if ($event.srcElement.value) {
        const fIndex = this.defaultStandards[standardIndex].values.indexOf($event.srcElement.value);
        if (fIndex >= 0 && fIndex !== valueIndex) {
          this.$message.error('已经添加了相同的规格值');
          this.standards = JSON.parse(JSON.stringify(this.defaultStandards));
          return;
        }
        this.defaultStandards = JSON.parse(JSON.stringify(this.standards));
        this.setCompositionTable();
      } else {
        this.standards = JSON.parse(JSON.stringify(this.defaultStandards));
      }
    },
    compositionSpecialName(standards, composition) {
      const keyValues = standards.map((standard, index) => ([
        standard.name, composition[index],
      ]));

      // 按照key排序
      keyValues.sort((attr1, attr2) => {
        const key1 = attr1[0];
        const key2 = attr2[0];

        if (key1 < key2) {
          return 1;
        }

        if (key1 === key2) {
          return 0;
        }

        return -1;
      });

      return JSON.stringify(keyValues);
    },
    setCompositionTable() {
      this.compositionTable = [];
      this.setDeepCompositionTable(0, []);
    },
    setDeepCompositionTable(deep, array) {
      if (deep >= this.standards.length) {
        this.compositionTable.push(array);
        return;
      }
      this.standards[deep].values = this.standards[deep].values.filter(value => value);
      this.defaultStandards = JSON.parse(JSON.stringify(this.standards));

      if (!this.defaultStandards[deep].values.length || !this.defaultStandards[deep].name) {
        this.setDeepCompositionTable(deep + 1, [...array]);
      } else {
        this.defaultStandards[deep].values.forEach((value) => {
          this.setDeepCompositionTable(deep + 1, [...array, value]);
        });
      }
    },
    appendStandardComposition() {
      this.standards.push({
        name: '',
        values: [''],
      });
      this.defaultStandards = JSON.parse(JSON.stringify(this.standards));
      this.compositionValues = {};
    },
    appendStandardValue(standardIndex) {
      this.standards[standardIndex].values.push('');
    },
    deleteStandard(standardIndex) {
      this.standards.splice(standardIndex, 1);
      this.defaultStandards = JSON.parse(JSON.stringify(this.standards));
      this.setCompositionTable();
    },
    deleteValue(standardIndex, valueIndex) {
      this.standards[standardIndex].values.splice(valueIndex, 1);
      this.defaultStandards = JSON.parse(JSON.stringify(this.standards));
      this.setCompositionTable();
    },
    emitStandardsAndCompositions() {
      return {
        standards: this.standards,
        compositions: this.compositions,
        invalid: !_keysIn(this.compositions).every(standard => JSON.parse(standard).length && JSON.parse(standard)[0].every(value => value)),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  min-width: 780px;
  .form-body {
    margin-bottom: 50px;
  }
  .tips {
    color: rgba(73, 71, 71, 0.6);
    font-size: 12px;
    padding: .7em 0 0 0;
  }
  .standard-composition-area {
    border-bottom: 1px dashed rgb(223, 226, 226);
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
  .standard-header-area {
    background: rgb(244, 244, 245);
    padding: 8px 16px;
    &:hover .heaeder-delete-button {
      transition: all .2s;
      opacity: .7;
    }
    .heaeder-delete-button {
      font-size: 24px;
      opacity: 0;
      cursor: pointer;
    }
  }
  .value-input-area {
    &:hover .value-delete-button {
      opacity: .5;
    }
    .value-delete-button:hover  {
      opacity: .8;
    }
  }
  .value-delete-button {
    font-size: 24px;
    position: absolute;
    margin-top: -40px;
    margin-left: 188px;
    opacity: 0;
    cursor: pointer;
  }
  .standard-value-area {
    display: flex;
    justify-content: flex-start;
    .flex-col {
      flex-basis: 200px;
      margin-right: 10px;
    }
    .standard-value-append {
      color: #66b1ff;
      margin-top: 16px;
      span {
        cursor: pointer;
      }
    }
  }
  .edit-standard-area {
    border: 1px solid #e7e7e5;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .composition-table {
    border: 1px solid #e7e7e5;
    .table-header {
      padding: 8px 12px;
      background: rgb(244, 244, 245);
    }
    .table-row {
      padding: 8px 12px;
      border-top: 1px solid #f1f1f1;
      &:hover {
        background: rgb(224, 225, 228);
      }
    }
  }
}
.margin-top-14 {
  margin-top: 14px;
}
.padding-left-16 {
  padding-left: 16px;
}
</style>
