
var description = {
  "file": "restaurant.csv",
  "separator": ",",
  "primaryKey": "business_id",
  "columns": [
    {
      "column": "name",
      "type": "string"
    },
    {
      "column": "state",
      "type": "string"
    },
    {
      "column": "city",
      "type": "string"
    },
    {
      "column": "stars",
      "type": "number",
      "numberFormat": ".1f"
    },
    {
      "column": "service_stars",
      "type": "number",
      "numberFormat": ".1f"
    },
    {
      "column": "food_stars",
      "type": "number",
      "numberFormat": ".1f"
    },
    {
      "column": "environment_stars",
      "type": "number",
      "numberFormat": ".1f"
    },
    {
      "column": "price_stars",
      "type": "number",
      "numberFormat": ".1f"
    }
  ],
  "layout": {
    "1": [
      {
        "column": "name",
        "width": 200
      },
      {
        "column": "state",
        "width": 100
      },
      {
        "column": "city",
        "width": 100
      },
      {
        "type": "stacked",
        "label": "all-stars",
        "children": [
          {
            "column": "stars",
            "width": 100,
            "color": "rgb(31, 119, 180)"
          },
          {
            "column": "service_stars",
            "width": 100,
            "color": "rgb(255, 127, 14)"
          },
          {
            "column": "food_stars",
            "width": 100,
            "color": "rgb(44, 160, 44)"
          },
          {
            "column": "environment_stars",
            "width": 100,
            "color": "rgb(214, 39, 40)"
          },
          {
            "column": "price_stars",
            "width": 100,
            "color": "rgb(148, 103, 189)"
          }
        ]
      }
    ]
  }
};

var lineUpDemoConfig = {
        htmlLayout: {
            autoRotateLabels: true
        },
        renderingOptions: {
            stacked: true,
            histograms: true,
            animated: true
        },
        svgLayout: {
            freezeCols: 0
        }
};

var lineup = null;
var datasets = [];

d3.select(window).on('resize', function() {
    if (lineup) {
        lineup.update()
    }
});

function init_summarize() {
    // body...
    $('#lugui-wrapper').empty();
    $('#pool').empty();
    lineup = null;
}

function update_summarize() {
    init_summarize();
    if (select_results == null || select_results.length == 0) {
        return;
    }
    var format_data = new Array();
    for (var i = 0; i < select_results.length; i++) {
        format_data.push({  business_id: select_results[i].business_id,
                            name: select_results[i].name,
                            state: select_results[i].state,
                            city: select_results[i].city,
                            stars: select_results[i].stars,
                            environment_stars: select_results[i].review.environment,
                            food_stars: select_results[i].review.food,
                            service_stars: select_results[i].review.service,
                            price_stars: select_results[i].review.price
                        });
    }

    if (format_data.length == 0) {
        return;
    }
    initLineup('yelp', description, format_data);
}

/**
 *
 * @param name - name of the dataset
 * @param desc - description of the dataset
 * @param _data - the loaded data
 */
function initLineup(name, desc, _data) {
    fixMissing(desc.columns, _data);
    provider = LineUpJS.createLocalStorage(_data, LineUpJS.deriveColors(desc.columns));
    lineUpDemoConfig.name = name;
    if (lineup) {
        lineup.changeDataStorage(provider, desc);
    } else {
        lineup = LineUpJS.create(provider, d3.select('#lugui-wrapper'), lineUpDemoConfig);
        lineup.addPool(d3.select('#pool').node(), {
            hideUsed: false
        }).update();
        lineup.restore(desc); //TODO: why?
    }
    provider.deriveDefault();
    lineup.update();

    // sort by stacked columns
    var cols = provider.getRankings();
    cols.forEach(function(rankCol) {
        rankCol.children.forEach(function(col) {
            if (col.desc.type === "stack")
                col.sortByMe();
        });
    });
}

function fixMissing(columns, data) {
    columns.forEach(function(col) {
        if (col.type === 'number' && !col.domain) {
            var old = col.domain || [NaN, NaN];
            var minmax = d3.extent(data, function(row) {
                return row[col.column].length === 0 ? undefined : +(row[col.column])
            });
            col.domain = [
                isNaN(old[0]) ? minmax[0] : old[0],
                isNaN(old[1]) ? minmax[1] : old[1]
            ];
        } else if (col.type === 'categorical' && !col.categories) {
            var sset = d3.set(data.map(function(row) {
                return row[col];
            }));
            col.categories = sset.values().sort();
        }
    });
}
