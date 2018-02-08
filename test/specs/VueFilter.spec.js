import Vue from "vue";
import { mount } from "vue-test-utils";
import VueFilter from "./../../src/components/VueFilter.vue";

describe("VueFilter", () => {
    it("has a methods hook", () => {
        expect(typeof VueFilter.methods).toBe("object");
    });

    it("name of component", () => {
        expect(VueFilter.name).toBe("vue-filter");
    });

    it("is a Vue component", () => {
        const wrapper = mount(VueFilter);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
