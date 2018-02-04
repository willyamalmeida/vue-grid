import VueGrid from './components/VueGrid.vue';
import store from './store/index';

module.exports = {
  install: function(Vue, options) {
    Vue.config.productionTip = false;
    Vue.use(store);
    Vue.component('ue-grid', VueGrid);
  }
};
