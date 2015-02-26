// (function(app, $) {
//   app.graph = app.graph || {};
//   app.graph.draw = function(container, nodes, edges) {
//     function nodesToObjects(nodes) {
//       return _.map(nodes, function(node) {
//         return {
//           id: node
//         };
//       });
//     }
//
//     function edgesToObjects(edges) {
//       return _.map(edges, function(edge) {
//         return {
//           from: edge[0],
//           to: edge[1]
//         };
//       });
//     }
//
//     var data = {
//       nodes: nodesToObjects(nodes),
//       edges: edgesToObjects(edges)
//     };
//
//     var options = {
//       width: '512px',
//       height: '512px'
//     };
//
//     var network = new vis.Network(container, data, options);
//   };
// })(window.juggler = window.juggler || {}, jQuery);

(function(app, $) {
  ko.components.register('juggler-graph', {
    viewModel: function(params) {
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
        edges = params.edges;

      this.nodes = ko.observable(nodes);
      this.edges = ko.observable(edges);
    },
    template: '<div data-bind="graph: { nodes:nodes(), edges:edges()}" style="min-height:512px;"></div>'
  });

  function graphBinding(element, valueAccessor, allBindings, viewModel,
    bindingContext) {

    var params = ko.utils.unwrapObservable(valueAccessor());

    function nodesToObjects(nodes) {
      nodes = ko.utils.unwrapObservable(nodes);
      return _.map(nodes, function(node) {
        return {
          id: node
        };
      });
    }

    function edgesToObjects(edges) {
      edges = ko.utils.unwrapObservable(edges);
      return _.map(edges, function(edge) {
        return {
          from: edge[0],
          to: edge[1]
        };
      });
    }

    var data = {
      nodes: nodesToObjects(params.nodes),
      edges: edgesToObjects(params.edges)
    };

    var options = {
      width: element.offsetWidth + 'px',
      height: element.offsetHeight + 'px'
    };

    var network = new vis.Network(element, data, options);
  }

  ko.bindingHandlers.graph = {
    init: graphBinding,
    update: graphBinding
  };
})(window.juggler = window.juggler || {}, jQuery);
