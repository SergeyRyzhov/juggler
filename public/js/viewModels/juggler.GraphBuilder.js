(function(app, $) {
	function Graph() {
		var nodes = ko.observableArray();
		var edges = ko.observableArray();

		function addEdge(u, v) {
			addVertex(u);
			addVertex(v);

			edges.push([u, v]);
		}

		function addVertex(v) {
			if (!_.contains(nodes(), v)) {
				nodes.push(v);
			}
		}

		function reset() {
			nodes([]);
			edges([]);
		}
		return {
			nodes: nodes,
			edges: edges,
			addEdge: addEdge,
			addVertex: addVertex,
			reset: reset
		}
	}

	ko.components.register('juggler-builder', {
		viewModel: function(params) {
			this.firstVertex = ko.observable();
			this.secondVertex = ko.observable();

			this.graph = new Graph();
			this.warning = ko.observable();

			this.nodes = ko.computed(function() {
				return this.graph.nodes();
			}, this);

			this.edges = ko.computed(function() {
				return this.graph.edges();
			}, this);

			this.edgesText = ko.computed(function() {
				return _.map(this.edges(), function(edge) {
					return '{' + edge[0] + ',' + edge[1] + '}';
				})
			}, this);

			this.onEnter = _.bind(function(d, e) {
				// e.keyCode === 13 && this.add();
				return true;
			}, this);

			this.add = _.bind(function() {
				var u = parseInt(this.firstVertex()),
					v = parseInt(this.secondVertex());

				if (v) {
					this.graph.addEdge(u, v);
				} else {
					this.graph.addVertex(u);
				}
			}, this);

			this.reset = _.bind(function() {
				this.graph.reset();
			}, this);

			this.generate = _.bind(function() {
				// var n = parseInt(this.vertex());
				// if (n > 20) {
				//   n = 20;
				// }
				// this.codeArray([]);
				// for (var i = 0; i < n - 2; i++) {
				//   this.codeArray.push(_.random(1, n));
				// }
				// //this.codeArray(_.shuffle(_.range(1, n - 1)));
				// this.graph(ParsePrufer(this.codeArray()));
			}, this);


			// this.codeArray([1, 4, 5, 5]);
			// this.graph(ParsePrufer(this.codeArray()));
		},
		template: {
			fromUrl: 'builder.html',
			maxCacheAge: 60000
		}
	});

})(window.juggler = window.juggler || {}, jQuery);
