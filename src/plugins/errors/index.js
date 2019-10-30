function install(Vue) {
  Vue.mixin({
    methods: {
      $err(validation) {
        if (!this.$options.errors) {
          return '';
        }
        return Object.keys(validation)
          .filter(key => !key.startsWith('$'))
          .reduce((prev, curr) => {
            if (!validation[curr] && validation.$dirty) {
              prev = this.$options.errors[curr];
            }
            return prev;
          }, '');
      },
    },
  });
}

export default {
  install,
};
