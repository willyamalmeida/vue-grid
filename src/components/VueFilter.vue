<template>
        <form class="navbar-form navbar-left">
            <div class="form-group">
                <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Search"
                    maxlength="100"
                    :value="value"
                    @input="updateValue($event.target.value)" />
            </div>
        </form>
</template>

<script>
export default {
    name: "vue-filter",
    props: ["value"],

    methods: {
        updateValue(value) {
            this.$emit("input", value);
        }
    }
}
</script>


