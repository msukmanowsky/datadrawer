<template>
<div id="app" class="container-fluid">
  <div class="row">
    <Settings :num-points="settings.numPoints" @update:num-points="onNumPointsUpdate" :y-min="settings.yMin" @update:y-min="onYMinUpdate" :y-max="settings.yMax" @update:y-max="onYMaxUpdate" />
    <main class="col-10">
      <div class="row">
        <div class="col">
          <BarChart :data.sync="data" :y-min="settings.yMin" :y-max="settings.yMax" />
        </div>
      </div>
      <div class="row">
        <div class="col" id="controls">
          <form>
            <div id="format_controls" class="btn-group" data-toggle="buttons" role="group" aria-label="Download Format">
              <label class="text-muted btn" disabled="true">Format</label>
              <label :class="{'btn': true, 'btn-outline-primary': true, 'active': settings.format == 'json'}">
          <input type="radio" name="format" autocomplete="off" value="json" v-model="settings.format" > JSON
        </label>
              <label :class="{'btn': true, 'btn-outline-primary': true, 'active': settings.format == 'csv'}">
          <input type="radio" name="format" autocomplete="off" value="csv" v-model="settings.format"> CSV
        </label>
            </div>
            <button id="copy_button" type="button" class="btn btn-outline-primary" title="Copied!" @click="onCopy">Copy</button>
            <button id="export_button" type="button" class="btn btn-outline-primary" @click="onExport">Export</button>
            <button id="reset_button" type="button" class="btn btn-link" @click="onReset">Reset</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <DataTable :data="data" />
        </div>
      </div>
    </main>
  </div>
  <a ref="exportAnchor" class="export-anchor" download="data_drawer" :href="exportData"></a>
</div>
</template>

<script>
import * as d3 from 'd3'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import BootstrapVue from 'bootstrap-vue'

import DataTable from './components/DataTable'
import BarChart from './components/BarChart'
import Settings from './components/Settings'
import Analytics from './plugins/Analytics'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(Analytics)
const numberFormatter = d3.format(',.2r')
Vue.filter('formatNumber', val => numberFormatter(val))

export default {
  name: 'app',
  data: () => {
    let data = {
      settings: {
        numPoints: 24,
        yMin: 0,
        yMax: 1,
        format: 'json'
      }
    }
    data.data = d3.range(0, data.settings.numPoints)
      .map(d => [d, data.settings.yMax])
    return data
  },
  components: {
    BarChart,
    DataTable,
    Settings
  },
  created: function () {
    this.$gtag('js', new Date())
    this.$gtag('config', 'UA-2433797-12')
  },
  watch: {
    'settings.numPoints': function (val) {
      if (val === this.data.length) {
        return
      }

      if (val > this.data.length) {
        const newData = d3.range(this.data.length, this.data.length + (val - this.data.length))
          .map(d => [d, this.settings.yMax])
        this.data = this.data.concat(newData)
      } else if (val < this.data.length) {
        this.data = this.data.slice(0, val)
      }
    }
  },
  computed: {
    csvFormat: function () {
      return d3.csvFormat(this.data)
    },
    jsonFormat: function () {
      return JSON.stringify(this.data)
    },
    formattedData: function () {
      switch (this.settings.format) {
        case 'json':
          return this.jsonFormat
        case 'csv':
          return this.csvFormat
        default:
          break
      }
    },
    exportPrefix: function () {
      switch (this.settings.format) {
        case 'json':
          return 'data:application/json;charset=utf-8,'
        case 'csv':
          return 'data:text/csv;charset=utf-8,'
        default:
          break
      }
    },
    exportData: function () {
      return encodeURI(this.exportPrefix + this.formattedData)
    }
  },
  methods: {
    onNumPointsUpdate: function (val) {
      this.$gtag('event', 'change_points', {
        'event_category': 'micro actions'
      })
      val = +val
      if (isNaN(val)) {
        return
      }
      if (val < 5 || val > 100) {
        return
      }
      this.settings.numPoints = val
    },
    onYMinUpdate: function (val) {
      val = +val
      if (isNaN(val)) {
        return
      }
      if (val >= this.settings.yMin) {
        return
      }

      this.settings.yMin = val
    },
    onYMaxUpdate: function (val) {
      val = +val
      if (isNaN(val)) {
        return
      }
      if (val <= this.settings.yMax) {
        return
      }

      this.settings.yMax = val
    },
    onCopy: function () {
      this.$gtag('event', 'data_copied', {
        'event_category': 'micro actions',
        'event_label': this.settings.format
      })
      this.$copyText(this.formattedData)
        .then(function (e) {
          alert('copied')
        })
        .catch(function (e) {
          alert('error')
        })
    },
    onExport: function () {
      this.$refs.exportAnchor.click()
      this.$gtag('event', 'data_exported', {
        'event_category': 'micro actions',
        'event_label': this.settings.format
      })
    },
    onReset: function () {
      var that = this
      this.data = d3.range(0, this.settings.numPoints)
        .map(function (d) {
          return [d, that.settings.yMax]
        })
    }
  }
}
</script>

<style lang="scss">
.export-anchor {
  display: none;
  visibility: hidden;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 1.5rem;

    #controls > form > button {
        margin-bottom: 0.5rem;
    }
    #controls > form > button:first-child {
        margin-left: 1rem;
    }

    #format_controls {
        label {
            box-shadow: none;
        }

        label.btn:nth-child(2) {
            border-top-left-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }
    }
}
</style>
