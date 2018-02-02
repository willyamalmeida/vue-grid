import VueGrid from "./VueGrid.vue";

module.exports = {
  install: function(Vue, options) {
    Vue.component("vue-grid", VueGrid);
  }
};
