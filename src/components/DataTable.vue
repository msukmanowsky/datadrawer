<template>
<table class="table table-sm table-hover">
  <thead>
    <tr>
      <th width="10%">X</th>
      <th>Y</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="datum in data">
      <td>{{ datum[0] }}</td>
      <td>{{ datum[1] | formatNumber }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
