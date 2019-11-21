<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="520px"
    :modal="false"
    :before-close="handleClose"
    @closed="closed"
    @close="close">
    <div slot="title" class="header">
      {{type==='edit' ? '修改老人信息' : '添加老人信息'}}
    </div>
    <div class="flex-center">
      <el-form size="medium" class="dialog-form" label-position="left" label-width="100px">
        <el-form-item label="姓名" :error="$err($v.form.name)">
          <el-input style="width: 100%;" placeholder="请输入姓名" v-model="$v.form.name.$model"></el-input>
        </el-form-item>

        <el-form-item label="出生年月" :error="$err($v.form.birthday)">
          <el-date-picker
            style="width: 100%;"
            v-model="$v.form.birthday.$model"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="handleClick">{{type==='edit' ? '修 改' : '确 定'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'CareListAppendDialog',
  props: {
    type: {
      type: String,
      required: true,
    },
    editRow: {
      type: Object,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      birthday: {
        required,
      },
    },
  },
  errors: {
    required: '该项不能为空',
  },
  data() {
    return {
      form: {
        name: '',
        birthday: '',
      },
      loading: false,
    };
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false);
    },
    closed() {
      this.$v.form.$reset();
    },
    async handleClose() {
      try {
        await this.$confirm('确认关闭？');
        this.close();
      } catch (err) {
        console.error(err);
      }
    },
    async handleClick() {
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        this.$emit('append-elder', JSON.parse(JSON.stringify(this.form)));
        this.form.name = '';
        this.form.birthday = '';
        this.$v.$reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-form {
  width: 100%;
  padding: 0 50px;
  z-index: 999;
}
</style>
