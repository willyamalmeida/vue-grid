<template>
  <div class="container">
      <h4>My grid example</h4>
      <vue-grid :config="myConfig"></vue-grid>
      <p>
          ...
      </p>
  </div>
</template>

<script>
import VueGrid from "./components/VueGrid.vue";

export default {
    name: "app",
    components: {
        VueGrid
    },
    data() {
        return {
            myConfig: {
                search: "http://localhost:3000/rows",
                pagination: true,
                filter: true,
                // sortProperty: "col1",
                columns: [
                    { name: "col1", display: "column1", sort: true },
                    { name: "col2", display: "column2", sort: true }
                ],
                rows: []
                // rows: [
                //     { col1: 'xxx xxxx', col2: 'xxx@dddd.ddd' },
                //     { col1: 'yyy yyyy', col2: 'yyy@yyy.yyy' }
                // ]
            }
        };
    }
};
</script>
