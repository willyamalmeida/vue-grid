<template>
    <div>
        <table class="table table-bordered table-sm table-hover">
            <thead>
                <tr>
                    <th scope="col" v-for="(col, colIndex) in config.columns" :key="colIndex">
                        {{col.display}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="(colRow, index) in config.columns" :key="index">
                        {{row[colRow.name]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    props: ["config"],

    computed: {
        ...mapState("vuegrid", {
            rows: state => state.rows
        }),

        ...mapGetters("vuegrid", {
            isRows: "isRows"
        })
    },

    methods: {
        ...mapActions("vuegrid", {
            setList: "setList",
            getList: "getList",
            setConfig: "setConfig"
        })
    },

    mounted() {
        if (!this.config) {
            throw Error("Required config!");
        }

        this.setConfig(this.config);

        if (this.config.rows && this.config.rows.length > 0) {
            this.setList(this.config.rows);
        } else {
            this.getList();
        }
    }
};
</script>
