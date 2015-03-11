(function(app, $) {
  ko.components.register('juggler-orgraph', {
    viewModel: function(params) {
      this.vertex = ko.observable();
      this.codeArray = ko.observableArray();

      this.graph = ko.observable({});
      this.warning = ko.observable();
      this.code = ko.observable();

      this.codeArray.subscribe(_.bind(function(newValue) {
        this.code = JSON.stringify(this.codeArray());

        var vertices = this.nodes(),
          edges = this.edges();

        var maxV = _.max(vertices),
          minV = _.min(vertices);

        if (minV != 1 || maxV != vertices.length) {
          this.warning('Invalid code');
        } else {
          this.warning('');
        }

      }, this));

      this.prufer = ko.computed(function() {
        return ParsePrufer(this.codeArray());
      }, this);

      this.nodes = ko.computed(function() {
        return this.graph().nodes;
      }, this);

      this.edges = ko.computed(function() {
        return this.graph().edges;
      }, this);

      this.onEnter = _.bind(function(d, e) {
        // e.keyCode === 13 && this.add();
        return true;
      }, this);

      this.add = _.bind(function() {
        var v = parseInt(this.vertex());
        if (v > 0) {
          this.vertex(undefined);
          this.codeArray.push(v);
          this.graph(ParsePrufer(this.codeArray()));
        } else {
          this.vertex(0);
        }
      }, this);

      this.reset = _.bind(function() {
        this.codeArray([]);
        this.graph(ParsePrufer([]));
      }, this);

      this.generate = _.bind(function() {
        var n = parseInt(this.vertex());
        if (n > 20) {
          n = 20;
        }
        this.codeArray([]);
        for (var i = 0; i < n - 2; i++) {
          this.codeArray.push(_.random(1, n));
        }
        this.graph(ParsePrufer(this.codeArray()));
      }, this);

      this.renumber = _.bind(function() {
        var vertices = this.nodes(),
          edges = this.edges();

        var minDegree = _.find(vertices, function(vertex) {
          return _.every(edges, function(edge) {
            return edge[1] != vertex;
          });
        });

        console.log(minDegree);

        var maxV = _.max(vertices),
          minV = _.min(vertices);

        console.log(maxV);
        console.log(minV);

      }, this);


      this.codeArray([1, 4, 5, 5]);
      this.graph(ParsePrufer(this.codeArray()));
    },
    template: {
      fromUrl: 'orgraph.html',
      maxCacheAge: 60000
    }
  });

  function ParsePrufer(code) {
    var arr = code.slice(),
      edges = [],
      n = arr.length + 2,
      B = _.range(1, n + 1),
      nodes = _.range(1, n + 1);

    for (var i = 0; i < arr.length; i++) {
      var minimum = _.min(_.filter(B, function(b) {
        return !_.contains(arr, b);
      }));

      edges.push([arr[i], minimum]);
      arr.shift();
      i--;

      var index = B.indexOf(minimum);
      if (index > -1) {
        B.splice(index, 1);
      }
    }
    edges.push([_.first(B), _.last(B)]);
    return {
      nodes: nodes,
      edges: edges
    };
  }

})(window.juggler = window.juggler || {}, jQuery);
