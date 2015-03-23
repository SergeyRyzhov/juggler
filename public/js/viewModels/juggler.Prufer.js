(function(app, $) {
  ko.components.register('juggler-prufer', {
    viewModel: function(params) {
      this.vertex = ko.observable();
      this.codeArray = ko.observableArray([1, 4, 5, 5]);


      this.graph = ko.observable({});
      this.warning = ko.observable();
      this.code = ko.observable();

      this.codeArray.subscribe(_.bind(function(newValue) {
        this.code(JSON.stringify(newValue));

        var vertices = this.nodes(),
          edges = this.edges();

        var maxV = _.max(newValue);

        if (maxV > newValue.length + 2) {
          this.warning('Invalid code');
        } else {
          this.warning('');
        }

      }, this));

      this.nodes = ko.computed(function() {
        return this.graph().nodes;
      }, this);



      this.edges = ko.computed(function() {
        return this.graph().edges;
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
        // var str = this.vertex();
        // var re = /(\d).?(\d)/i;
        // var found = str.match(re)
        // console.log(found);


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
        this.graph(ParsePrufer(this.codeArray()));
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
        this.graph(ParsePrufer(this.codeArray()));
      }, this);


      this.codeArray([1, 4, 5, 5]);
      this.graph(ParsePrufer(this.codeArray()));
    },
    template: {
      fromUrl: 'prufer.html',
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
