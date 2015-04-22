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
				var u = Number(this.firstVertex()),
					v = Number(this.secondVertex());

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
                                         āŠÕŨíŠÕþ1ýý0 0 ÖÉ  2Ā ũĒ0 3ŠÕþ4āŠŅŠÕþ  3ĸĸĪ2 / ï  4Â Â Ķ2 5 æĖû  5ļž: 4 6Ð9ŋģÐ6ęę 5 7 î   7ģ·8 6 89áōúĄáģĻ8·7 7 óŪĻ  9Ę ûš7 5 :ŠÕþ;āŠŋģŠÕþ:ž9 5 ģ  ;Ė Ė ―9 < ü  <Í Í ŋ; = æĖû  =Î Ã? < >     >Ï ĸÁ= ?Ā Ā ?Ã> = ģæ  Ā Ņ Ņ Ä> Á  ü  