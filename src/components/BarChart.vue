<template>
<svg ref="svg" :width="width" :height="height">
    <g :transform="mainGTransform">
      <g class="bars">
        <rect v-for="r in rects"
              class="bar"
              :width="r.width"
              :height="r.height"
              :x="r.x"
              :y="r.y"></rect>
        <rect v-for="r in invisibleRects"
              class="bar-invisible"
              :data-datum-index="r.index"
              :width="r.width"
              :height="r.height"
              :x="r.x"
              :y="r.y"
              @mouseover="updateDatum"
              @mousemove="updateDatum"></rect>
      </g>
      <g class="axis axis-top"></g>
      <g class="axis axis-bottom"></g>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import * as _ from 'lodash'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    yMin: {
      type: Number,
      required: true
    },
    yMax: {
      type: Number,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    margin: {
      type: Object,
      default: function () {
        return {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30
        }
      }
    }
  },
  data: function () {
    return {
      actualWidth: 0,
      actualHeight: 0
    }
  },
  computed: {
    mainGTransform: function () {
      return 'translate(' + this.margin.left + ', ' + this.margin.top + ')'
    },
    x: function () {
      return d3.scaleBand()
        .rangeRound([0, this.actualWidth - this.margin.left - this.margin.right])
        .domain(this.data.map(function (d) {
          return d[0]
        }))
        .padding(0.1)
    },
    yDomain: function () {
      return [this.yMin, this.yMax]
    },
    y: function () {
      return d3.scaleLinear()
        .rangeRound([this.actualHeight - this.margin.top - this.margin.bottom, 0])
        .domain(this.yDomain)
    },
    invisibleRects: function () {
      if (this.actualWidth === 0) {
        return []
      }

      var that = this
      return this.data.map(function (d, i) {
        const [x] = d
        return {
          index: i,
          width: that.x.bandwidth(),
          height: that.actualHeight - that.margin.top - that.margin.bottom - that.y(that.yDomain[1]),
          x: that.x(x),
          y: that.y(that.yDomain[1])
        }
      })
    },
    rects: function () {
      if (this.actualWidth === 0) {
        return []
      }

      const that = this
      return this.data.map(function (d, i) {
        const [x, y] = d
        return {
          index: i,
          width: that.x.bandwidth(),
          height: that.actualHeight - that.margin.top - that.margin.bottom - that.y(y),
          rawX: x,
          rawY: y,
          x: that.x(x),
          y: that.y(y)
        }
      })
    }
  },
  methods: {
    updateDatum: function (event) {
      const node = event.target
      const svg = this.$refs.svg
      const datumIndex = +node.getAttribute('data-datum-index')
      const datum = this.data[datumIndex]
      // let mouseX = null
      let mouseY = null

      if (svg.createSVGPoint) {
        let point = svg.createSVGPoint()
        point.x = event.clientX
        point.y = event.clientY
        point = point.matrixTransform(node.getScreenCTM().inverse())
        // mouseX = point.x
        mouseY = point.y
      } else {
        const rect = node.getBoundingClientRect()
        // mouseX = event.clientX - rect.left - node.clientLeft
        mouseY = event.clientY - rect.top - node.clientTop
      }

      const newY = this.y.invert(mouseY)
      let newData = _.cloneDeep(this.data)
      newData[datumIndex] = [datum[0], newY]
      this.$emit('update:data', newData)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      var boundingRect = this.$refs.svg.getBoundingClientRect()
      this.actualWidth = boundingRect.width
      this.actualHeight = boundingRect.height
    })
  }
}
</script>

<style lang="scss" scoped>
.bar {
  fill: steelblue;
  stroke: none;
  shape-rendering: crispEdges;
}
.bar-invisible {
  fill: #fff;
  opacity: 0;
}
</style>
