<template>
    <div>
        <!--/////////////////////////-->
        <!--Filter-->
        <div class="vue-filter">
            <form class="navbar-form navbar-left">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Search"
                        maxlength="100"
                        v-model="filterValue"
                        v-if="filter" />
                </div>
            </form>
        </div>

        <!--/////////////////////////-->
        <!--Table-->
        <table class="vue-table table table-bordered table-sm table-hover">
            <thead class="thead-light">
                <tr>
                    <th
                        scope="col"
                        v-for="(col, colIndex) in config.columns"
                        :key="colIndex" >

                        <label
                            style="cursor: pointer;"
                            v-if="col.sort"
                            :class="{ active: sortProperty === col.name }"
                            @click="sortBy(col.name)">

                            {{ col.display | capitalize }}

                            <span
                                class="arrow"
                                :class="getOrder(col.name)">
                            </span>
                        </label>

                        <label v-else>
                            {{ col.display | capitalize }}
                        </label>

                    </th>
                </tr>
            </thead>
            <tbody  v-if="isRows">
                <tr v-for="(row, rowIndex) in list" :key="rowIndex">
                    <td v-for="(colRow, colRowIndex) in config.columns" :key="colRowIndex">
                        {{row[colRow.name]}}
                    </td>
                </tr>
            </tbody>
        </table>

        <!--/////////////////////////-->
        <!--Pagination-->
        <div class="vue-pagination" v-if="pagination">
            <!--Load-->
            <span
                class="glyphicon glyphicon-refresh"
                aria-hidden="true"
                :class="{
                    'glyphicon-refresh-animate': isLoading,
                    cursor: !isLoading
                }"
                :disabled="!isLoading"
                @click="loadRows()"></span>

            <!--Total-->
            <!-- <span class="badge badge-dark" style="float: left;">{{total}}</span> -->

            <!--Pagination-->
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item active disabled"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import { orderBy, isEmpty } from "lodash";

export default {
    props: ["config"],

    data() {
        return {
            // value default
            loading: false,
            pagination: false,
            filter: false,
            filterValue: "",
            search: "",
            rows: [],
            currentPage: 1,
            page: 10,
            sortProperty: null,
            sortOrders: []
        };
    },

    computed: {
        total() {
            return this.rows.length;
        },

        isRows() {
            return this.rows.length > 0;
        },

        isLoading() {
            return this.loading;
        },

        list() {
            let newList = this.orderBy(this.rows, this.sortProperty);
            newList = this.applyFilter(newList);
            return newList;
        }
    },

    methods: {
        loadRows() {
            if (this.search) {
                let _self = this;
                let url = this.search;

                this.setLoading(true);

                Axios.get(url).then(res => {
                    _self.setRows(res.data);
                    _self.setLoading(false);
                });
            } else {
                console.log("Invalid search!");
            }
        },

        orderBy(rows, property) {
            let newList = rows;

            if (!_.isEmpty(property)) {
                let _property = property;
                let sortOrder = _.find(this.sortOrders, function(o) {
                    return o.hasOwnProperty(_property);
                });

                let value = sortOrder[property];
                let orders = value === -1 ? "desc" : "asc";

                newList = _.orderBy(newList, property, orders);
            }

            return newList;
        },

        sortBy(property) {
            if (!_.isEmpty(property)) {
                let _property = property;
                let sortOrder = _.find(this.sortOrders, function(o) {
                    return o.hasOwnProperty(_property);
                });

                let value = sortOrder[property];
                let orders = "asc";
                let newValue = 1;

                switch (value) {
                    case 1: {
                        orders = "desc";
                        newValue = -1;
                        break;
                    }
                    default: {
                        orders = "asc";
                        newValue = 1;
                        break;
                    }
                }

                sortOrder[property] = newValue;
                this.setSortProperty(property);
            }
        },

        getOrder(property) {
            if (this.sortOrders.length === 0) {
                return "";
            }

            let _property = property;
            let sortOrder = _.find(this.sortOrders, function(o) {
                return o.hasOwnProperty(_property);
            });

            return sortOrder[property] === -1 ? "asc" : "desc";
        },

        applyFilter(list) {
            if (!_.isEmpty(this.filterValue)) {
                let _columns = this.config.columns;
                let _filter = this.filterValue;

                return _.filter(list, x => {
                    let values = _.find(_columns, function(col) {
                        return x[col.name].indexOf(_filter) >= 0;
                    });

                    return values != null;
                });
            }

            return list;
        },

        setConfig(config) {
            this.$set(this, "search", config.search);
            this.$set(this, "pagination", config.pagination);
            this.$set(this, "filter", config.filter);
            this.$set(this, "page", config.page);
            this.$set(this, "sortProperty", config.sortProperty);

            let sortOrders = [];
            _.forEach(this.config.columns, function(col) {
                if (col.sort) {
                    let strOrder = `{"${col.name}": 0}`;
                    let objOrder = JSON.parse(strOrder);

                    sortOrders.push(objOrder);
                }
            });

            this.$set(this, "sortOrders", sortOrders);
        },

        setRows(rows) {
            this.$set(this, "rows", rows);
        },

        setSortProperty(property) {
            this.$set(this, "sortProperty", property);
        },

        setLoading(loading) {
            this.$set(this, "loading", loading);
        }
    },

    mounted() {
        if (!this.config) {
            throw Error("Required config!");
        }

        this.setConfig(this.config);

        if (this.config.rows && this.config.rows.length > 0) {
            this.setRows(this.config.rows);
        } else {
            this.loadRows();
        }
    },

    filters: {
        capitalize: function(value) {
            if (!value) {
                return "";
            }

            value = value.toString();
            return (
                value
                    .toString()
                    .charAt(0)
                    .toUpperCase() + value.slice(1)
            );
        }
    }
};
</script>

<style src="./../assets/sass/app.scss" lang="sass"></style>
<style>
.vue-table label {
    display: inherit;
}

.vue-table th > label.active {
    color: #0b0c21;
}

.vue-table th > label.active > span .arrow {
    opacity: 1;
}

.vue-table .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.vue-table .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
}

.vue-table .arrow.desc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
}

.vue-filter {
    background-color: #e9ecef;
    margin-bottom: -15px;
    padding: 5px;
}

.vue-pagination {
    background-color: #e9ecef;
    margin-top: -16px;
}

.vue-pagination .glyphicon.glyphicon-refresh.cursor {
    cursor: pointer;
}

.vue-pagination .glyphicon.glyphicon-refresh {
    float: left;
    padding: 5px;
}

.vue-pagination .glyphicon-refresh-animate {
    -webkit-animation: spin 1000ms infinite linear;
    animation: spin 1000ms infinite linear;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
</style>
