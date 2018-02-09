# vue-grid

A vue-grid component that shows a table grid.

[![Build Status](https://travis-ci.org/willyamalmeida/vue-grid.svg?branch=master)](https://travis-ci.org/willyamalmeida/vue-grid)

[![codecov](https://codecov.io/gh/willyamalmeida/vue-grid/branch/master/graph/badge.svg)](https://codecov.io/gh/willyamalmeida/vue-grid)

[![Maintainability](https://api.codeclimate.com/v1/badges/8b7ae9e3cf0820a1ef3e/maintainability)](https://codeclimate.com/github/willyamalmeida/vue-grid/maintainability)

## Installation

```html
npm install --save-dev wa-vue-grid
```

### Browser

Include the script file.

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/wa-vue-grid/dist/vue-grid.min.js"></script>
<script type="text/javascript">
  Vue.use(VueGrid);
</script>
```

### Module

```html
import VueGrid from 'wa-vue-grid';
```

## Usage

```html
<vue-grid :config="myConfig"></vue-grid>

{
  myConfig: {
    search: "http://mydomain:port/api",  //=> format json
    pagination: {
        enabled: true,
        maxPage: 10,
        rangePage: 8,
        pageStart: "_page", //ex: "http://mydomain:port/api?_page=1&_limit=10"
        pageEnd: "_limit"
    },
    filter: true,
    sortProperty: "col1",
    columns: [
      { name: "col1", display: "Column 1", sort: true },
      { name: "col2", display: "Column 2" }
    ],
    rows: []
  }
}
```
