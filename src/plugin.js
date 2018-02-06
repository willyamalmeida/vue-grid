import VueGrid from "./components/VueGrid.vue";

module.exports = {
    install: function(Vue, options) {
        Vue.component("vue-grid", VueGrid);
    }
};
