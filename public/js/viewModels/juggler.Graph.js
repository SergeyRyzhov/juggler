///Model for graph visualization via vis.js

(function (app, $) {
  ko.components.register('juggler-graph', {
    viewModel: function (params) {
      params = params || {
        nodes: [1, 2, 3, 4, 5],
        edges: [
          [1, 2],
          [3, 4],
          [5, 2],
          [3, 5],
          [1, 4],
          [1, 3],
          [2, 3],
          [1, 5]
        ]
      };

      var nodes = params.nodes,
        edges = params.edges,
        orgraph = params.orgraph,
        labels = params.labels,
        colors = params.colors;

      this.nodes = ko.observable(nodes);
      this.edges = ko.observable(edges);
      this.orgraph = ko.observable(orgraph);
      this.labels = ko.observable(labels);
      this.colors = ko.observable(colors);
      this.network = ko.observable();
    },
    template: {
      fromUrl: 'graph.html',
      maxCacheAge: 60000
    }
  });


  function graphBinding(element, valueAccessor, allBindings, viewModel,
    bindingContext) {

    var params = ko.utils.unwrapObservable(valueAccessor());

    function nodesToObjects(nodes, labels, colors) {
      nodes = ko.utils.unwrapObservable(nodes);
      return _.map(nodes, function (node) {

        var nodeObj = {
          id: node,
          font: '18px verdana blue'
        };

        nodeObj.label = labels && labels[node] ? (node + '(' + labels[node] + ')') : node;
        var color;
        colors && colors[node] && (color = Math.floor((colors[node] / _.max(colors)) * 255));
        colors && colors[node] && (nodeObj.color = 'rgba(' + color + ',' + color + ',' + 0 + ', 0.7)');
        return nodeObj;
      });
    }

    function edgesToObjects(edges, orgraph) {
      edges = ko.utils.unwrapObservable(edges);
      return _.map(edges, function (edge) {
        var edgeObj = {
          from: edge[0],
          to: edge[1]
        };

        if (orgraph) {
          edgeObj.arrows = 'to';
        }

        return edgeObj;
      });
    }

    var data = {};
    data = {
      nodes: nodesToObjects(params.nodes, ko.utils.unwrapObservable(params.labels), ko.utils.unwrapObservable(params.colors)),
      edges: edgesToObjects(params.edges, params.orgraph)
    };

    var options = {
      width: element.clientWidth + 'px',
      height: element.clientHeight + 'px',
      manipulation: false,
      interaction: {
        keyboard: false,
        navigationButtons: true
      },
      edges: {
        //physics: false
      }
    };

    var poptions = {
      physics: {
        enabled: false,
        /* barnesHut: {
           gravitationalConstant: -2000,
           centralGravity: 0.3,
           springLength: 95,
           springConstant: 0.04,
           damping: 0.09,
           avoidOverlap: 0
         },
         forceAtlas2Based: {
           gravitationalConstant: -50,
           centralGravity: 0.01,
           springConstant: 0.08,
           springLength: 100,
           damping: 0.4,
           avoidOverlap: 0
         },
         repulsion: {
           centralGravity: 0.2,
           springLength: 200,
           springConstant: 0.05,
           nodeDistance: 100,
           damping: 0.09
         },
         hierarchicalRepulsion: {
           centralGravity: 0.0,
           springLength: 100,
           springConstant: 0.01,
           nodeDistance: 120,
           damping: 0.09
         },
         maxVelocity: 50,
         minVelocity: 0.1,
         solver: 'barnesHut',
         stabilization: {
           enabled: true,
           iterations: 1000,
           updateInterval: 100,
           onlyDynamicEdges: false,
           fit: true
         },*/
        timestep: 0.5,
        adaptiveTimestep: true
      }
    };

    if (params.network()) {
      params.network().destroy();
    }
    
    var network = new vis.Network(element, data, options);
    setTimeout(function () {
      network.setOptions(poptions);
      return false;
    }, 1000);
    
    params.network(network);
  }

  ko.bindingHandlers.graph = {
    // init: graphBinding,
    update: graphBinding
  };

})(window.juggler = window.juggler || {}, jQuery);
