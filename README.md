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
<vue-grid :config="myConfg"></vue-grid>

{
  myConfig: {
    collumns: [
      { name: 'Col1' },
      { name: 'Col2' }
    ]
  }
}
```
