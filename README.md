# vue-grid

A vue-grid component that shows a table grid.

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
        pageStart: "_page", //ex: "http://localhost:3000/rows?_page=1&_limit=10"
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
