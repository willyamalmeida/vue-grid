<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="(col, colIndex) in config.collumns" :key="colIndex">{{col.name}}</th>
                </tr>
            </thead>
        </table>    
    </div>
</template>

<script>
export default {
  props: ["config"]
};
</script>
