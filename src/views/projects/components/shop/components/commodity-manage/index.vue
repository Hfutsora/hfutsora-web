<template>
  <div class="app-container">
    <el-card shadow="never" ref="card-form">
      <el-form class="form" label-position="left" label-width="120px" label-suffix="：" size="medium">
        <div class="header">
          基本信息
        </div>
        <div class="form-body">
          <el-form-item label="商品名" :error="$err($v.form.name)">
            <el-input v-model="$v.form.name.$model" placeholder="请输入商品名称" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="商品图" :error="$err($v.form.previewFileList)">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              list-type="picture-card"
              :limit="6"
              :on-change="onPreviewChange"
              :file-list="form.previewFileList"
              :auto-upload="false"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :on-remove="handlePreviewRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <div class="outer-tips">建议尺寸：800*800像素，最多上传6张</div>

          <el-form-item label="商品地域" :error="$err($v.form.region)">
            <el-cascader
              ref="cascader"
              filterable
              clearable
              v-model="$v.form.region.$model"
              :options="proviceList"
              @change="getProviceInfo"
              style="width: 200px;"
              placeholder="请选择商品地域"
              :props="props"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="七天无理由退货" label-width="140px" :error="$err($v.form.canRefundWithinSeven)">
            <el-radio-group v-model="$v.form.canRefundWithinSeven.$model">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <!-- 规格组合表单部分 -->
        <div class="header">
          价格库存
        </div>
        <div class="form-body">
          <composition-map-form ref="composition-view" :standards="form.standards" :compositions="form.compositions" @composition-value-change="compositionValueChange"></composition-map-form>

          <el-form-item label="划线价">
            <div class="flex-start">
              <el-input-number :controls="false" :precision="2" v-model="form.linePrice" style="margin-right: 2em; width: 200px;"></el-input-number>元
            </div>
          </el-form-item>
          <div class="outer-tips">划线价在商品详情中以划线形式显示</div>

          <el-form-item label="库存扣减方式" :error="$err($v.form.stockSubtractWay)">
            <el-select v-model="$v.form.stockSubtractWay.$model" style="width: 200px;" placeholder="请选择库存扣减方式">
              <el-option label="拍下减库存" value="拍下减库存">拍下减库存</el-option>
              <el-option label="付款减库存" value="付款减库存">付款减库存</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品编码">
            <div class="flex-start">
              <el-input style="width: 200px;" v-model="form.code"></el-input>
            </div>
          </el-form-item>
        </div>

        <div class="header">
          物流管理
        </div>
        <div class="form-body" v-if="!isTraining">
          <el-form-item label="配送方式" :error="$err($v.form.logisticsWay)">
            <el-radio-group v-model="$v.form.logisticsWay.$model">
              <el-radio label="普通配送" value="普通配送"></el-radio>
              <el-radio label="卖家自送" value="卖家自送"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="form.logisticsWay && form.logisticsWay === '普通配送'" label="快递运费">
            <div class="flex-start">
              <el-input-number :precision="2" :controls="false" v-model="form.logisticsFee" style="margin-right: 2em; width: 200px;"></el-input-number>元
            </div>
          </el-form-item>
        </div>
        <div v-else class="form-body">
          <el-form-item label="配送方式" style="color: #646262; font-size: 14px;">
            <el-radio-group v-model="disableRadio">
              <el-radio disabled label="普通配送" value="普通配送"></el-radio>
              <el-radio label="卖家自送" value="卖家自送"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="header">
          提成管理
        </div>
        <div class="form-body">
          <el-form-item label="参与方式" :error="$err($v.form.partnerKey)">
            <div><el-checkbox v-model="form.hasPartnerComission">参与合伙人分享</el-checkbox></div>
            <el-radio-group v-if="form.hasPartnerComission" v-model="$v.form.partnerKey.$model">
              <div class="flex-start flex-vertical-center margin-top-14">
                <el-radio label="商品价格百分比">商品价格百分比</el-radio>
                <template v-if="form.partnerKey==='商品价格百分比'">
                  <el-input-number :min="0" :max="100" style="width: 200px;" :controls="false" v-model="$v.form.partnerValue.percent.$model"></el-input-number>
                  <span style="margin-left: 12px;">%</span>
                </template>
              </div>
              <div class="flex-start flex-vertical-center margin-top-14">
                <el-radio label="固定金额">固定金额</el-radio>
                <template v-if="form.partnerKey==='固定金额'">
                  <el-input style="width: 200px;"  v-model="$v.form.partnerValue.amount.$model"></el-input>
                  <span style="margin-left: 12px;">元</span>
                </template>
              </div>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="header">
          其他信息
        </div>
        <div class="form-body">
          <el-form-item label="上架时间" :error="$err($v.form.deliveryWay)">
            <el-radio-group v-model="$v.form.deliveryWay.$model">
              <div class="flex-start flex-vertical-center min-height-32">
                <el-radio label="立即上架售卖">立即上架售卖</el-radio>
              </div>
              <div class="flex-start flex-vertical-center margin-top-14">
                <el-radio label="自定义上架时间">自定义上架时间</el-radio>
                <el-date-picker
                  v-if="form.deliveryWay === '自定义上架时间'"
                  v-model="form.deliveryTime"
                  type="datetime"
                  :picker-options="pickerBeginDateAfter"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="flex-start flex-vertical-center margin-top-14">
                <el-radio label="暂不售卖，放入仓库">暂不售卖，放入仓库</el-radio>
              </div>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="预售" :error="$err($v.form.deliveryAfterDay)">
            <el-checkbox v-model="form.needDelivery">暂无现货，下单后一段时间发货</el-checkbox>
            <template v-if="form.needDelivery">
              <div class="flex-start flex-vertical-center margin-top-14">
                <span style="color: #606266; margin-right: 14px;">发货时间</span>
                <el-date-picker
                  v-model="$v.form.deliveryAfterDay.$model"
                  type="datetime"
                  :picker-options="pickerBeginDateAfter"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
        </div>

        <div class="header">
          商品详情
        </div>
        <div class="form-body">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            multiple
            :auto-upload="false"
            :on-change="onDetailChange"
            :file-list="form.detailFileList"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-remove="handleDetailRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>

        <template v-if="isTraining">
          <div class="header margin-top-14">
            机构信息
          </div>
          <div class="form-body">
            <el-form-item label="机构名称" :error="$err($v.form.training.organization)">
              <el-input  v-model="$v.form.training.organization.$model" style="width: 200px;" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="课程名称" :error="$err($v.form.training.course)">
              <el-input v-model="$v.form.training.course.$model" style="width: 200px;" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="上课地址" :error="$err($v.form.training.address)">
              <el-input v-model="$v.form.training.address.$model" style="width: 200px;" placeholder="请输入上课地址"></el-input>
            </el-form-item>
          </div>
        </template>

      </el-form>
    </el-card>
    <div class="save-area" ref="save-area">
      <template v-if="saveInvalid">
        <el-button disabled size="medium" type="primary" @click="handleCommoditySave">{{ type === 'append' ? '添加' : '保存'}}</el-button>
      </template>
      <template v-else>
        <el-button size="medium" type="primary" @click="handleCommoditySave">{{ type === 'append' ? '添加' : '保存'}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import _find from 'lodash/find';

// import OSS from 'ali-oss';
import elementResizeDetectorMaker from 'element-resize-detector';
// import uuidv1 from 'uuid/v1';

// import MainHeader from '@/components/MainHeader';
// import PageContent from '@/components/PageContent';

import CompositionMapForm from './components/compositionMapForm';
import { proviceList } from '@/utils/provinceCityList.js';

// import { getAliToken } from '@/api/resource';
// import { getFirstClassificationList, getClassificationDetail } from '@/api/classification';
// import { getCommodityDetail } from '@/api/commodity';

export default {
  name: 'CommodityEditView',
  props: {
    type: {
      type: String,
      default: 'append',
    },
  },
  components: {
    CompositionMapForm,
  },
  validations: {
    form: {
      name: { required },
      region: { required },
      canRefundWithinSeven: { required },
      stockSubtractWay: { required },
      logisticsWay: {
        required(value) {
          return this.isTraining || value;
        },
      },
      partnerKey: {
        key_required() {
          return !this.form.hasPartnerComission || (this.form.partnerKey === '商品价格百分比' && this.form.partnerValue.percent) || (this.form.partnerKey === '固定金额' && this.form.partnerValue.amount);
        },
      },
      partnerValue: {
        percent: {
          required(percent) {
            return percent || this.partnerKey !== '商品价格百分比';
          },
        },
        amount: {
          required(amount) {
            return amount || this.partnerKey !== '固定金额';
          },
        },
      },
      deliveryWay: {
        deliveryWay(value) {
          return value;
        },
        deliveryTime() {
          return this.form.deliveryTime || this.form.deliveryWay !== '自定义上架时间';
        },
      },
      deliveryAfterDay: {
        deliveryAfterDayValidate(value) {
          return !this.form.needDelivery || value;
        },
      },
      previewFileList: {
        arrayRequired(value) {
          return value.length;
        },
      },
      training: {
        organization: {
          required(value) {
            return !this.isTraining || value;
          },
        },
        course: {
          required(value) {
            return !this.isTraining || value;
          },
        },
        address: {
          required(value) {
            return !this.isTraining || value;
          },
        },
      },
    },
  },
  errors: {
    required: '该项不能为空',
    key_required: '请设置合伙人提成',
    arrayRequired: '该项不能为空',
    deliveryWay: '请选择上架时间',
    deliveryTime: '自定义上架时间不能为空',
    deliveryAfterDayValidate: '预售时间不能为空',
  },
  data() {
    return {
      snapshot: null,
      compositionSnapshot: null,
      compositions: null,
      loading: false,
      saveInvalid: true,
      // classificationProps: {
      //   lazy: true,
      //   lazyLoad() {

      //   },
      // },
      pickerBeginDateAfter: {
        disabledDate: time => time.getTime() < Date.now(),
      },
      disableRadio: '卖家自送',
      classificationOptions: [],
      isTraining: false,
      form: {
        isTrainMission: false,
        name: '',
        code: '',
        linePrice: '',
        classification: [],
        region: '',
        city: {
          city: {},
          province: {},
        },
        canRefundWithinSeven: '',
        stockSubtractWay: '',
        logisticsWay: '',
        logisticsFee: '',
        hasPartnerComission: '',
        partnerKey: '',
        partnerValue: {
          percent: '',
          amount: '',
        },
        deliveryWay: '',
        deliveryTime: '',
        needDelivery: false,
        deliveryAfterDay: '',
        previewFileList: [],
        previewFilePath: [],
        detailFileList: [],
        detailFilePath: [],
        training: {
          organization: '',
          course: '',
          address: '',
        },
      },
      proviceList,
      props: {
        value: 'REGIONCODE',
        label: 'REGIONNAME',
      },
    };
  },
  watch: {
    loading(value) {
      this.$emit('change-child-loading', value);
    },
  },
  async created() {
    // await this.initClassificaitonOptions();

    // if (this.type === 'edit') {
    //   await this.initDetail();
    // }

    // this.snapshot = new Snapshot(this.form);
    // this.snapshot.takeSnapshot();

    this.$nextTick(() => {
      const erd = elementResizeDetectorMaker();

      erd.listenTo(this.$refs['card-form'].$el, ($el) => {
        this.$nextTick(() => {
          this.$refs['save-area'].style.width = `${$el.clientWidth}px`;
        });
      });
    });
  },
  methods: {
    async initDetail() {
      // pass
    },
    async initClassificaitonOptions() {
      // pass
    },
    // classficationChange(value) {
    //   const classification = _find(this.classificationOptions, o => o.id === value[0]);

    //   if (classification && classification.system) {
    //     this.isTraining = true;
    //   } else {
    //     this.isTraining = false;
    //   }
    // },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isJPG && isLt2M;
    },
    handleExceed() {
      this.$message.warning('最多上传6张图片');
    },
    handlePreviewRemove(file, fileList) {
      this.form.previewFileList = fileList;
    },
    handleDetailRemove(file, fileList) {
      this.form.detailFileList = fileList;
    },
    onPreviewChange(file, fileList) {
      const isFine = this.beforeUpload(file.raw);
      this.form.previewFileList = fileList;
      if (!isFine) {
        this.form.previewFileList.pop();
      }
    },
    onDetailChange(file, fileList) {
      const isFine = this.beforeUpload(file.raw);
      this.form.detailFileList = fileList;
      if (!isFine) {
        this.form.detailFileList.pop();
      }
    },
    getProviceInfo(value) {
      const provinceInstance = _find(proviceList, { REGIONCODE: value[0] });
      const province = {
        code: provinceInstance.REGIONCODE,
        name: provinceInstance.REGIONNAME,
      };

      const cityInstance = _find(provinceInstance.children, {
        REGIONCODE: value[1],
      });

      const city = {
        code: '',
        name: '',
      };

      if (cityInstance) {
        city.code = cityInstance.REGIONCODE;
        city.name = cityInstance.REGIONNAME;
      }

      const result = {
        province,
        city,
      };

      this.form.city = result;
      this.form.region = value;
    },
    // async ossRequest(file, token) {
    //   const client = new OSS(token);
    //   const path = await this.multipartUpload(client, file);

    //   return path;
    // },
    async multipartUpload() {
      //
    },
    async httpRequest() {
      //
    },
    async handleCommoditySave() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        this.$message({
          message: '请完善表单',
          type: 'warning',
        });

        return;
      }
      const res = this.$refs['composition-view'].emitStandardsAndCompositions();
      if (res.invalid) {
        this.$message({
          message: '请完善价格库存表',
          type: 'warning',
        });
      }

      // // 批量上传预览图片
      // this.form.previewFilePath = await Promise.all(this.form.previewFileList.map(async (preview) => {
      //   if (preview.id) {
      //     return preview;
      //   }
      //   const path = await this.httpRequest(preview.raw);
      //   return path;
      // }));

      // // 批量上传详情图片
      // this.form.detailFilePath = await Promise.all(this.form.detailFileList.map(async (preview) => {
      //   if (preview.id) {
      //     return preview;
      //   }
      //   const path = await this.httpRequest(preview.raw);
      //   return path;
      // }));

      // this.$emit('handle-form', parameters, this.type);
    },
    compositionValueChange() {
      // if (this.compositionSnapshot
      // && this.compositionSnapshot !== JSON.stringify(this.$refs['composition-view'].emitStandardsAndCompositions().compositions)) {
      //   this.saveInvalid = false;
      // }
      this.saveInvalid = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-start {
  display: flex;
  justify-content: flex-start;
}

.header {
  padding: 1em 1.5em;
  font-weight: 700;
  font-size: 15px;
  background: #f8f8f8;
  .header-info {
    width: 108px;
    text-align: end;
  }
}
.form-body {
  padding-left: 2em;
  margin: 32px 0 36px;
}
.margin-top-14 {
  margin-top: 14px;
  min-height: 32px;
  font-size: 14px;
}
.min-height-32 {
  min-height: 32px;
}
.table-inner-small-input {
  max-width: 100px;
}
.table-header {
  padding: 12px;
  border-bottom: 1px solid rgb(230, 233, 236);
}
.table-row {
  padding: 12px;
  border-bottom: 1px solid rgb(228, 230, 233);
}
.tips {
  font-size: 14px;
  color: #646262;
}
.outer-tips {
  @extend .tips;
  margin: 0 120px 24px;
}
.save-area {
  position: fixed;
  z-index: 999;
  bottom: 0;
  width: 100%;
  padding: 12px 0;
  background: white;
  text-align: center;
  box-shadow: 0 -3px 5px #eee;
}
</style>
