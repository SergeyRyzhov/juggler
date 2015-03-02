(function(app, $) {
  ko.components.register('juggler-orgraph', {
    viewModel: function(params) {
      this.vertex = ko.observable();
      this.codeArray = ko.observableArray([1, 4, 5, 5]);

      this.code = ko.computed(function() {
        return JSON.stringify(this.codeArray());
      }, this);

      this.prufer = ko.computed(function() {
        return ParsePrufer(this.codeArray());
      }, this);

      this.nodes = ko.computed(function() {
        return this.prufer().nodes;
      }, this);

      this.edges = ko.computed(function() {
        return this.prufer().edges;
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
        } else {
          this.vertex(0);
        }
      }, this);

      this.reset = _.bind(function() {
        this.codeArray([]);
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
        //this.codeArray(_.shuffle(_.range(1, n - 1)));
      }, this);
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
