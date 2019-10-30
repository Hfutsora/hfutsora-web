<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="16">
      <el-row type="flex" justify="space-between">
        <el-col :span="1">
          <div class="dividing-line"></div>
        </el-col>
        <el-col :span="23">
          <div class="title">
            {{title}}
          </div>
          <div class="sub-title">
            {{subTitle}}
          </div>
          <div>{{text}}</div>
          <br>
          <div class="more" @click="routerToCare">
            查看详情 >
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <div v-viewer>
        <el-image :src="pic" alt="img" class="pic" fit="cover"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import cover from '@/assets/intro-cover/three.png';

export default {
  name: 'ThreeJs',
  data() {
    return {
      title: 'ThreeJs',
      subTitle: 'Company  Profile',
      // eslint-disable-next-line no-multi-str
      text: `
      `,
      tail: '',
      pic: cover,
    };
  },
  methods: {
    routerToCare() {
      this.$router.push('project/three-js');
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 16px;
  color: rgb(85, 85, 85);
}
.sub-title {
  margin: 10px 0 35px;
  font-size: 14px;
  color: rgb(153, 153, 153);
}
.dividing-line {
  height: 80%;
  margin: 20% 0;
  width: 1px;
  background: rgb(201, 201, 201);
}
.pic {
  width: 361px;
  height: 241px;
  border-radius: 10px;
  box-shadow: 0 0 4px 4px #eeeeee;
}
.more {
  cursor: pointer;
  text-align: center;
  border: 1px solid rgb(221, 221, 221);
  width: 118px;
  padding: 10px 10px;
  margin-top: 2em;
  font-size: 12px;
  color: rgb(85, 85, 85);
  text-transform: uppercase;
  line-height: 0.5;
}
</style>
