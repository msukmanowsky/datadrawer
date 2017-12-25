<template>
  <aside class="col-2" id="settings">
    <header>
      <h1>Data Drawer</h1>
      <small>A prototyping tool to create timeseries-like data. Start by dragging your mouse over the bars.</small>
    </header>

    <h2>Settings</h2>
    <form>
      <div class="form-group">
        <label for="num_points">Data Points</label>
        <input id="num_points"
               type="number"
               min="5"
               max="100"
               aria-describedby="num_points_help"
               class="form-control"
               :value="numPoints"
               @input="$emit('update:num-points', $event.target.value)" />
        <small id="num_points_help"
               class="form-text text-muted">Between 5 and 100</small>
      </div>
      <div class="form-row">
        <div class="form-group col-6">
          <label for="y_min">Y min</label>
          <input id="y_min"
                 type="number"
                 class="form-control"
                 :value="yMin"
                 @input="$emit('update:y-min', $event.target.value)" />
        </div>
        <div class="form-group col-6">
          <label for="y_max">Y max</label>
          <input id="y_max"
                 type="number"
                 class="form-control"
                 :value="yMax"
                 @input="$emit('update:y-max', $event.target.value)" />
        </div>
        <div class="invalid-feedback">
          Minimum must be &lt; maximum
        </div>
      </div>
    </form>

    <p id="credit">
      <small>
                Made by <a href="https://twitter.com/msukmanowsky" target="_blank">&#64;msukmanowsky</a>.
                Comments and pull requests welcome.
            </small>
    </p>

    <a class="github-button"
       href="https://github.com/msukmanowsky/datadrawer"
       data-icon="octicon-star"
       data-show-count="true"
       aria-label="Star msukmanowsky/datadrawer on GitHub">Star</a>
    <a class="github-button"
       href="https://github.com/msukmanowsky/datadrawer/fork"
       data-icon="octicon-repo-forked"
       data-show-count="true"
       aria-label="Fork msukmanowsky/datadrawer on GitHub">Fork</a>
  </aside>
</template>

<script>
export default {
  props: {
    numPoints: { type: Number, required: true },
    yMin: { type: Number, required: true },
    yMax: { type: Number, required: true }
  }
}
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 2rem;
}
h1 {
  font-size: 1.777rem;
}
h2 {
  font-size: 1.333rem;
}
</style>
