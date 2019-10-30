<template>
  <div>
    <div class="title flex-vertical-center">
      <span class="title-pre-line"></span><slot name="project-title"></slot>
    </div>

    <div class="project-content">
      <slot name="project-content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-family: 'Microsoft YaHei';
  line-height: 0;
  color: rgb(85, 85, 85);

  .title-pre-line {
    background-color: rgb(68, 192, 165);
    box-shadow: 0px 10px 10px 0px rgba(75, 58, 175, 0.3);
    width: 5px;
    float: left;
    height: 25px;
    margin-right: 31px;
  }
}
.project-content {
  margin: 24px 12px;
  font-size: 18px;
}
</style>
