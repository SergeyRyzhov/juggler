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
				edges = params.edges,
				orgraph = params.orgraph;

			this.nodes = ko.observable(nodes);
			this.edges = ko.observable(edges);
			this.orgraph = ko.observable(orgraph);
		},
		template: {
			fromUrl: 'graph.html',
			maxCacheAge: 60000
		}
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

		function graphToDot(nodes, edges) {
			edges = ko.utils.unwrapObservable(edges);
			// var digraph = 'digraph {';

			var digraph = 'digraph {' + _.reduce(edges, function(memo, edge) {
				return memo + edge[0].toString() + '->' + edge[1].toString() + ';';
			}, '') + '}';

			// digraph += '}';
			return digraph;
			//  digraph {
			// 	A - > A;
			// 	B - > B - > C;
			// 	B - > D;
			// 	D - > {
			// 		B;
			// 		C
			// 	}
			// 	D - > E;
			// 	F - > F;
			//  }
		}

		var data = {};
		if (params.orgraph) {
			data = {
				dot: graphToDot(params.nodes, params.edges)
			};
		} else {
			data = {
				nodes: nodesToObjects(params.nodes),
				edges: edgesToObjects(params.edges)
			};
		}

		var options = {
			width: element.offsetWidth + 'px',
			height: element.offsetHeight + 'px',
			navigation: true,
			keyboard: true
		};

		var network = new vis.Network(element, data, options);
	}

	ko.bindingHandlers.graph = {
		init: graphBinding,
		update: graphBinding
	};
})(window.juggler = window.juggler || {}, jQuery);
