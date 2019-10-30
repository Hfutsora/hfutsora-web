<template>
  <div>
    <navbar class="navbar"></navbar>

    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';

export default {
  name: 'LayoutView',
  components: {
    Navbar,
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 9999;
}
</style>
