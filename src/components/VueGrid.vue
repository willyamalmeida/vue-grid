<template>
    <div>
        <!--/////////////////////////-->
        <!--Filter-->
        <div class="vue-filter" v-if="filter">
            <vue-filter v-model="filterValue" />
        </div>

        <!--/////////////////////////-->
        <!--Table-->
        <table class="vue-table table table-sm table-bordered table-hover">
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
        <div class="vue-pagination" v-if="pagination.enabled">
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
                    <li class="page-item"
                        :class="{ disabled: pagination.currentPage === 1 }"
                        @click="pagination.currentPage === 1 ? $event.preventDefault() : navigate($event, (pagination.currentPage - 1))">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>

                    <li class="page-item"
                        :class="{ active: pagination.currentPage === page }"
                        v-for="(page, pageIndex) in pages"
                        :key="pageIndex"
                        @click="page == '...' ? $event.preventDefault() : navigate($event, page)">

                        <span v-if="page == '...'" class="page-link" :class="{ disabled: page == '...' }">{{page}}</span>
                        <a v-if="page != '...'" class="page-link" href="#">{{page}}</a>
                    </li>

                    <li class="page-item"
                       :class="{ disabled: pagination.currentPage === totalPages }"
                       @click="pagination.currentPage === totalPages ? $event.preventDefault() : navigate($event, (pagination.currentPage + 1))">
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
import _ from "lodash";
import VueFilter from "./VueFilter";
import parserLink from "pagination-link-parser";

export default {
    props: ["config"],

    components: {
        VueFilter
    },

    data() {
        return {
            // value default
            loading: false,
            filter: false,
            filterValue: "",
            search: "",
            rows: [],
            total: 0,
            pagination: {
                enabled: false,
                currentPage: 1,
                perPage: 10,
                rangePage: 8,
                pageStart: null,
                pageEnd: null,
                search: {
                    page: null,
                    perPage: null
                }
            },
            sortProperty: null,
            sortOrders: []
        };
    },

    computed: {
        isRows() {
            return this.rows.length > 0;
        },

        isLoading() {
            return this.loading;
        },

        list() {
            let list = this.applyOrderBy(this.rows, this.sortProperty);
            list = this.applyFilter(list);

            return list;
        },

        totalPages() {
            let totalPages = Math.trunc(this.total / this.pagination.perPage);
            return totalPages;
        },

        pages() {
            let pages = this.generatePagesArray(this.pagination.currentPage, this.total, this.pagination.perPage, this.pagination.rangePage);
            return pages;
        }
    },

    methods: {
        loadRows() {
            if (this.search) {
                this.setLoading(true);

                let _self = this;
                let url = this.search;

                if (this.pagination.enabled) {
                    if (this.pagination.search) {
                        url += `?${this.pagination.search.page}=${this.pagination.currentPage}&`;
                        url += `${this.pagination.search.perPage}=${this.pagination.perPage}`;
                    } else {
                        throw("Invalid search pagination!");
                    }
                }

                Axios.get(url).then(res => {
                     if (_self.pagination.enabled) {
                         if (!res.headers["link"]){
                             throw("Not implementation response headers link for pagination!");
                         }

                         let total = _self.getTotalLink(res.headers["link"], _self.pagination.search);
                         _self.setTotal(total);
                     } else {
                       _self.setTotal(res.data.length);
                     }

                    _self.setRows(res.data);
                    _self.setLoading(false);
                });
            } else {
                console.log("Invalid search!");
            }
        },

        getTotalLink(link, searchPagination) {
            let data = parserLink(link, searchPagination.page, searchPagination.perPage);
            let total = data.last.page * data.last.perPage;

            return total;
        },

        applyOrderBy(rows, property) {
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
                let _filter = this.filterValue.toLowerCase();

                return _.filter(list, x => {
                    let contained = _.some(_columns, col => {
                        let value = x[col.name].toLowerCase();
                        let isInclude = value.includes(_filter);

                        return isInclude;
                    });

                    return contained;
                });
            }

            return list;
        },

        generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange)
        {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        },

        calculatePageNumber(i, currentPage, paginationRange, totalPages)
        {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            } else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            } else {
                return i;
            }
            } else {
                return i;
            }
        },

        navigate(e, page) {
            e.preventDefault();
            this.setCurrentPage(page);
            this.loadRows();
        },

        setCurrentPage(page) {
            this.$set(this.pagination, "currentPage", page);
        },

        setConfig(config) {
            this.$set(this, "search", config.search);
            this.$set(this, "filter", config.filter);
            this.$set(this, "sortProperty", config.sortProperty);

            if(config.pagination && config.pagination.enabled) {
                this.$set(this.pagination, "enabled", config.pagination.enabled);

                if (config.pagination.perPage) {
                    this.$set(this.pagination, "perPage", config.pagination.perPage);
                }

                if (config.pagination.rangePage) {
                    this.$set(this.pagination, "rangePage", config.pagination.rangePage);
                }

                if (config.pagination.search) {
                    if (config.pagination.search.page) {
                        this.$set(this.pagination.search, "page", config.pagination.search.page);
                    }

                    if (config.pagination.search.perPage) {
                        this.$set(this.pagination.search, "perPage", config.pagination.search.perPage);
                    }
                }
            }

            let columnsSort = _.filter(this.config.columns, x => { return x.sort; });
            let sortOrders = _.reduce(columnsSort, (result, col) => {
                result.push({ [col.name]: 0 });
                return result;
            }, []);

            this.$set(this, "sortOrders", sortOrders);
        },

        setTotal(total) {
            this.$set(this, "total", total);
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
