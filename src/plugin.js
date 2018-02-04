import VueGrid from "./components/VueGrid.vue";

module.exports = {
    install: function(Vue, options) {
        Vue.filter("capitalize", function(value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        });

        Vue.component("vue-grid", VueGrid);
    }
};
