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
    search: 'http://mydomain:port/api'  //=> format json
    columns: [
      { name: 'col1', display: 'Column 1' },
      { name: 'col2' }
    ],
    rows: []
  }
}
```
