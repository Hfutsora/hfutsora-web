<template>
  <div>
    <div class="flex-center chart-list">
      <basic-vue-chat/>
    </div>
  </div>
</template>

<script>
import BasicVueChat from './basic-vue-chat/BasicVueChat';

export default {
  name: 'ChatLayoutView',
  components: {
    BasicVueChat,
  },
  data() {
    return {
      form: {
        status: '等待中',
        name: '',
        date: [],
        classification: '',
        sales: [],
      },
      tableProps: {
        headerRowStyle: {
          backgroundColor: '#fafafa',
        },
        headerCellStyle: {
          backgroundColor: '#fafafa',
        },
      },
      loading: false,
      total: 0,
    };
  },
  methods: {
    async init() {
      // init
    },
    handleClick(status) {
      this.form.status = status;
    },
    routerToService(item) {
      this.$router.push({
        name: 'ServicerChat',
        params: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-list {
  // margin: 48px 0;
}
.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
  min-width: 600px;
  padding: 4px 12px;
  &:hover {
    background: rgba(240, 240, 240, 0.5);
  }

  img {
    border-radius: 32px;
    // flex-basis: 64px;
    width: 64px;
    height: 64px;
    margin-right: 50px;
  }
  .username {
    width: 120px;
    text-overflow: ellipsis;
    margin-right: 50px;
  }
  .content {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: start;
    margin-right: 50px;
  }
  .badge {
    width: 24px;
    height: 24px;
    border-radius: 24px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f56c6c;
    color: white;
    margin-right: 24px;
  }
}
</style>
