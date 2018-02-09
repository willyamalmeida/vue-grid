import { mount } from "vue-test-utils";
import VueFilter from "./../../src/components/VueFilter.vue";

const createVueFiler = function(propValue){
    return mount(VueFilter, {
        propsData: {
            value: propValue
        }
    });
}

describe("VueFilter", () => {
    it("test has a methods hook", () => {
        expect(typeof VueFilter.methods).toBe("object");
    });

    it("test name of component", () => {
        expect(VueFilter.name).toBe("vue-filter");
    });

    it("test is a Vue component", () => {
        const vueFilter = mount(VueFilter);
        expect(vueFilter.isVueInstance()).toBeTruthy();
    });

    it("test props value", () => {
        const wrapper = createVueFiler("my filter");
        let value = wrapper.props().value;

        expect(value).toBe("my filter");
    });


    it("test update input value", () => {
        const expected = "new filter";
        const propValue = "my filter";
        const wrapper = createVueFiler(propValue);

        let input = wrapper.find("input");

        expect(input.element.value).toBe(propValue);

        input.element.value = expected;
        input.trigger("input");

        let emitted = wrapper.emitted("input");

        expect(emitted).toBeTruthy();
        expect(emitted.length).toBe(1);

        //emitted[0] = ["value"]
        //emitted[0][0] = "value"
        let value = emitted[0][0];

        expect(value).toBe(expected);
    });

    it("test VueFilter html structure", () => {
        const wrapper = createVueFiler("my filter");

        expect(wrapper.element).toMatchSnapshot();
    });
});
