;(function(w) {
  'use strict';
  var periods = 24,
      xDomain = d3.range(0, periods),
      yDomain = [0, 1],
      series = xDomain.map(function(d) { return [d, yDomain[1]]; }),
      numExports = 0;

  function BarChart() {
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = null,
        height = 300,
        onUpdateValue = function() {},
        attrX = function(d) { return d[0]; },
        attrY = function(d) { return d[1]; },
        _g = null,
        _axisG = null,
        _barG = null;

    var x = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]),
        axisBottom = d3.axisBottom(x);

    // Initialize chart
    function chart(selection) {
      selection.each(function (data) {
        x.domain(data.map(attrX));
        y.domain(yDomain);

        var svg = d3.select(this)
          .append('svg')
          .attr('width', '100%')
          .attr('height', height);
        width = svg.node().getBoundingClientRect().width;
        x.rangeRound([0, width - margin.left - margin.right])

        _g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        _barG = _g.append('g')
          .classed('bars', true);

        _g.append('g')
          .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
          .classed('axis axis-bottom', true);

        _g.append('g')
          .classed('axis axis-top', true)
          .append('line')
          .attr('x1', 0)
          .attr('y1', function() { return y(yDomain[1]); })
          .attr('x2', width - margin.left - margin.right)
          .attr('y2', function() { return y(yDomain[1]); });
        chart.update(data);
      });
    }

    chart.onUpdateValue = function(v) {
      if (!arguments.length) return onUpdateValue;
      onUpdateValue = v;
      return chart;
    };

    chart.height = function(v) {
      if (!arguments.length) return height;
      height = v;
      return chart;
    };

    chart.margin = function(v) {
      if (!arguments.length) return margin;
      margin = v;
      return chart;
    };

    chart.x = function() {
      return x;
    };

    chart.y = function() {
      return y;
    };

    chart.attrX = function(v) {
      if (!arguments.length) return attrX;
      attrX = v;
      return chart;
    };

    chart.attrY = function(v) {
      if (!arguments.length) return attrY;
      attrY = v;
      return chart;
    };

    chart.width = function(v) {
      if (!arguments.length) return width;
      width = v;
      return chart;
    };

    chart.update = function(data) {
      function onMouseOverOrMove(d, i, nodes) {
        var mouse = d3.mouse(this),
            newY = y.invert(mouse[1]);

        onUpdateValue(i, attrX(d), attrY(d), newY);
      }

      x.domain(data.map(attrX));
      y.domain(yDomain);
      axisBottom.tickValues(x.domain().filter(function (d, i) {
        if (data.length >= 50) {
          return !(i % 5);
        }
        return true;
      }));
      _g.select('.axis-bottom').call(axisBottom);


      // Draw the visible bars
      var update = _barG.selectAll('rect.bar').data(data),
          enter = update.enter(),
          exit = update.exit();
      enter.append('rect')
          .classed('bar', true)
        .merge(update)
          .attr('width', x.bandwidth())
          .attr('x', function(d) { return x(attrX(d)); })
          .attr('y', function(d) { return y(attrY(d)); })
          .attr('height', function(d) { return height - margin.top - margin.bottom - y(attrY(d)); });
      exit.remove();

      // Draw the invisible bars that will respond to user interaction
      var update = _barG.selectAll('rect.bar-invisible').data(data),
          enter = update.enter(),
          exit = update.exit();
      exit.remove();
      enter.append('rect')
        .merge(update)
        .classed('bar-invisible', true)
        .attr('width', x.bandwidth())
        .attr('x', function(d) { return x(attrX(d)); })
        .attr('y', function(d) { return y(1); })
        .attr('height', function(d) { return height - margin.top - margin.bottom - y(1); })
        .on('mouseover', onMouseOverOrMove);
    };

    return chart;
  }

  function updateTable() {
    var tbody = d3.select('#data_table').select('tbody');
    var rows = tbody.selectAll('tr').data(series);
    rows = rows.enter()
      .append('tr')
      .merge(rows);
    var cells = rows.selectAll('td').data(function(row) { return row; });
    cells.enter()
      .append('td')
      .merge(cells)
      .text(function(d) { return d; });
    rows.exit().remove();
  }


  // Draw the base chart
  var barChart = BarChart()
    .onUpdateValue(function(i, oldX, oldY, newY) {
      series[i] = [oldX, newY];
      barChart.update(series);
      updateTable();
    });
  d3.select('#chart')
    .datum(series)
    .call(barChart);

  // Draw the table
  updateTable();

  // Wire up UI event listeners
  d3.select('#num_points')
    .attr('value', periods)
    .on('input', function() {
      var newPeriods = +this.value;
      gtag('event', 'change_points', {
        'event_category': 'micro actions'
      });

      if (newPeriods > 100) {
        newPeriods = this.value = 100;
      }

      periods = newPeriods;
      if (series.length > periods) {
        // Truncate and go
        var numToDelete = series.length - periods;
        series.splice(series.length - numToDelete, numToDelete);
        barChart.update(series);
      } else if (series.length < periods) {
        // Add new elements
        xDomain = d3.range(0, periods);
        var numNew = periods - series.length,
            newData = d3.range(series.length, series.length + numNew)
              .map(function(d) { return [d, yDomain[1]]; })
        series = series.concat(newData);
        barChart.update(series);
      }
      console.log(series);
    });
  d3.select('#y_min')
    .attr('value', yDomain[0])
    .on('change keypress paste input', function() {
      var yMin = +this.value,
          yMax = +d3.select('#y_max').node().value;

      if (yMin >= yMax) {
        d3.select(this)
          .classed('is-invalid', true);
        return;
      }

      d3.select(this)
        .classed('is-invalid', false);
      d3.select('#y_max')
        .classed('is-invalid', false);

      yDomain[0] = yMin;
      barChart.update(series);
    });
  d3.select('#y_max')
    .attr('value', yDomain[1])
    .on('change keypress paste input', function() {
      var yMax = +this.value,
          yMin = +d3.select('#y_min').node().value;

      if (yMin >= yMax) {
        d3.select(this)
          .classed('is-invalid', true);
        return;
      }

      d3.select(this)
        .classed('is-invalid', false);
        d3.select('#y_min')
          .classed('is-invalid', false);

      yDomain[1] = yMax;
      barChart.update(series);
    })

  function getSelectedFormat() {
    return d3.select('#format_controls input[type="radio"]:checked').node().id;
  }

  $('#copy_button')
    .tooltip({
      trigger: 'click',
      placement: 'top'
    });
  var copyClipboard = new Clipboard('#copy_button', {
    text: function(trigger) {
      var format = getSelectedFormat();
      if (format == 'format_json') {
        return JSON.stringify(series);
      } else {
        return d3.csvFormat(series);
      }
    }
  });
  copyClipboard.on('success', function(e) {
    // Show and then hide the Copied! tooltip
    $('#copy_button').tooltip('hide')
      .tooltip('show');
    setTimeout(function() {
      $('#copy_button').tooltip('hide');
    }, 1000);
    gtag('event', 'data_copied', {
      'event_category': 'micro actions',
      'event_label': getSelectedFormat()
    });
  });

  d3.select('#export_button').on('click', function() {
    var format = getSelectedFormat(),
        content = '',
        extension = '';
    if (format == 'format_json') {
      content = 'data:application/json;charset=utf-8,' + JSON.stringify(series);
      extension = '.json';
    } else {
      content = 'data:text/csv;charset=utf-8,' + d3.csvFormat(series);
      extension = '.csv';
    }
    var a = d3.select('body').append('a')
      .style('display', 'none')
      .attr('href', encodeURI(content))
      .attr('download', 'data_drawer_' + numExports + extension);

    a.node().click();
    a.remove();
    gtag('event', 'data_exported', {
      'event_category': 'micro actions',
      'event_label': format
    });
    numExports++;
  });

  d3.select('#reset_button').on('click', function() {
    series = xDomain.map(function(d) { return [d, yDomain[1]] });
    barChart.update(series);
  });
})(this);
