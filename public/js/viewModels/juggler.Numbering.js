(function(app, $) {
  function Node(_index, _parent) {
    var parent = _parent;
    var index = _index;

    return {
      index: index,
      parent: parent,
      child: [],
      parents: [],
      weight: 0,
      deep: 0,
      level: 0
    };
  }

  function Three() {
    this.tNodes = ko.observableArray([]);
    this.size = ko.observable(1);

    this.tNodes.push(new Node(0, -1));

    this.nodes = ko.computed(function() {

      return _.range(1, this.size() + 1);
    }, this);

    this.edges = ko.computed(function() {
      var s = this.size();
      var result = [];
      for (var i = 0; i < this.tNodes().length; i++) {
        var node = this.tNodes()[i];

        for (var j = 0; j < node.child.length; j++) {
          result.push([i + 1, node.child[j] + 1]);
        }
      }
      // console.log(this.tNodes());
      return result;
    }, this);

    this.setRoot = _.bind(function(v) {
      function AddParent(v, nodes, size, parents, mask) {
        if (mask.length == nodes().length) {
          return;
        }
        var node = nodes()[v];

        for (var i = 0; i < node.child.length; i++) {
          if (!_.contains(mask, node.child[i])) {
            mask.push(node.child[i]);
            parents.push(_.indexOf(mask, v));
            AddParent(node.child[i], nodes, size, parents, mask);
          }
        }
        if (node.parent >= 0)
          if (!_.contains(mask, node.parent)) {
            mask.push(node.parent);
            parents.push(_.indexOf(mask, v));
            AddParent(node.parent, nodes, size, parents, mask);
          }
      }

      var parents = [-1];
      var mask = [v];

      var cNodes = ko.observableArray(this.tNodes());
      var n = this.size();

      AddParent(v, this.tNodes, this.size, parents, mask);

      // console.log('Parents: ', parents);
      // console.log('Mask: ', mask);

      this.tNodes([]);
      this.size(1);

      this.tNodes.push(new Node(0, -1));
      for (var i = 1; i < parents.length; i++) {
        this.addNode(parents[i])
      }

      console.log('Nodes:', this.tNodes());
    }, this);

    this.addNode = _.bind(function(parent) {
      if (parent < this.size()) {
        this.tNodes()[parent].child.push(this.size());
        var node = new Node(this.size(), parent);
        node.deep = 1;
        node.weight = 1;
        node.level = 1;
        var newlevel = this.tNodes()[parent].child.length == 1;
        var p = parent;
        while (p != -1) {
          this.tNodes()[p].weight++;
          if (newlevel) {
            this.tNodes()[p].deep++;
          }
          node.parents.push(p);
          p = this.tNodes()[p].parent;
        }

        node.level = node.parents.length + 1;
        this.tNodes.push(node);
        this.size(this.size() + 1);
      }
    }, this);

    this.makeFlat = _.bind(function() {
      var start = 0;
      var nodes = this.tNodes();

      var last = _.last(_.sortBy(nodes, function(n) {
        return n.level;
      }));

      console.log('Way form ' + start + ' to ' + last.index);

      var longChain = _.clone(last.parents);
      longChain.reverse();
      longChain.push(last.index);

      console.log('Chain ', longChain);


    }, this);

    this.reset = _.bind(function(parent) {

      this.tNodes([]);
      this.size(1);

      this.tNodes.push(new Node(0, -1));
    }, this);
  }

  ko.components.register('juggler-numbering', {
    viewModel: function(params) {
      this.parent = ko.observable();
      this.root = ko.observable();
      this.selectedVertex = ko.observable(1);

      this.graph = new Three();
      this.warning = ko.observable();

      this.nodes = ko.computed(function() {
        function compareNumbers(a, b) {
          return a - b;
        }
        return this.graph.nodes().sort(compareNumbers);
      }, this);

      this.edges = ko.computed(function() {
        return this.graph.edges();
      }, this);

      this.edgesText = ko.computed(function() {
        return _.map(this.edges(), function(edge) {
          return '{' + edge[0] + ',' + edge[1] + '}';
        })
      }, this);

      this.add = _.bind(function() {
        this.graph.addNode(Number(this.parent()) - 1);
      }, this);

      this.reset = _.bind(function() {
        this.graph.reset();
      }, this);

      this.setRoot = _.bind(function() {
        this.graph.setRoot(Number(this.root()) - 1);

      }, this);

      this.renumber = _.bind(function() {
        this.graph.makeFlat();
      }, this);
    },
    template: {
      fromUrl: 'numbering.html',
      maxCacheAge: 60000
    }
  });

})(window.juggler = window.juggler || {}, jQuery);
