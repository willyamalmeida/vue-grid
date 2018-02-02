<template>
    <div>
        <table class="table table-bordered table-sm table-hover">
            <thead>
                <tr>
                    <th scope="col" v-for="(col, colIndex) in config.collumns" :key="colIndex">{{col.name}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                    <!-- <td v-for="(colRow, colRowIndex) in row"></td> -->
                </tr>
            </tbody>
        </table>    
    </div>
</template>

<script>
export default {
  props: ["config"],
  
  data() {
      return {
          items: {}
      }
  },
  
  created() {
    if (!this.config) {
      this.config = {};
    }
  }
};
</script>
