(function(app, $) {
  app.graph = app.graph || {};
  app.graph.draw = function(container) {
    var nodes = [{
      id: 1,
      label: '1'
    }, {
      id: 2,
      label: '2'
    }, {
      id: 3,
      label: '3'
    }, {
      id: 4,
      label: '4'
    }, {
      id: 5,
      label: '5'
    }];

    // create an array with edges
    var edges = [{
      from: 1,
      to: 2
    }, {
      from: 1,
      to: 3
    }, {
      from: 2,
      to: 4
    }, {
      from: 2,
      to: 5
    }];

    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      width: '512px',
      height: '512px'
    };
    var network = new vis.Network(container, data, options);
  };
})(window.juggler = window.juggler || {}, jQuery);
