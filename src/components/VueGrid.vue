<template>
    <div>
        <table class="table table-bordered table-sm table-hover">
            <thead>
                <tr>
                    <th scope="col" v-for="(col, colIndex) in config.columns" :key="colIndex">
                        {{ col.display | capitalize }}
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
import Axios from "axios";

export default {
    props: ["config"],

    data() {
        return {
            rows: []
        };
    },

    methods: {
        isRows() {
            return this.rows.length > 0;
        },

        getList() {
            let _self = this;

            return new Promise((resolve, reject) => {
                if (this.config.search) {
                    Axios.get(this.config.search).then(res => {
                        _self.setRows(res.data);
                        resolve();
                    });
                } else {
                    console.log("Invalid search!");
                    resolve();
                }
            });
        },

        setRows(rows) {
            this.$set(this, 'rows', rows);
        }
    },

    mounted() {
        if (!this.config) {
            throw Error("Required config!");
        }

        if (this.config.rows && this.config.rows.length > 0) {
            this.setRows(this.config.rows);
        } else {
            this.getList();
        }
    }
};
</script>
