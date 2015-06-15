//RS tree builder
(function (app, $) {
  ko.components.register('juggler-rstrees', {
    viewModel: function (params) {

      var amountNodes = ko.observable(5);
      var nodeSize = ko.observable(3);
      var intersectionSize = ko.observable(1);

      var warning = ko.observable('');

      var built = ko.observable(false);

      var treeNodes = ko.observableArray([]);
      var treeEdges = ko.observableArray([]);

      var shortTreeNodes = ko.observableArray([]);
      var shortTreeEdges = ko.observableArray([]);


      var fullTreeCode = ko.observableArray([]);
      var shortTreeCode = ko.observableArray([]);


      var edgesText = ko.computed(function () {
        return _.map(treeEdges(), function (edge) {
          return '{' + edge[0] + ',' + edge[1] + '}';
        })
      });


      function buildRSTree(r, s, k) {

        function sortNumber(a, b) {
          return a - b;
        }

        s = s || 1;
        r = r || 3;
        k = k || 5;

        var nodes = [];
        var edges = [];

        var fullCode = [];
        var shortCode = [];
        var shortTreeNodes = [];
        var shortTreeEdges = [];

        var counter = 0;
        // var pNode = [];
        for (var part = 0; part < k; part++) {
          var node = [];
          var snode = [];
          var startFrom = 0;

          if (fullCode.length > 0) {
            var prevNodeIndex = app.random(fullCode.length);
            // if(!_.contains(shortTreeNodes, prevNodeIndex))
            // shortTreeNodes.push(prevNodeIndex);
            shortTreeEdges.push([prevNodeIndex, part]);

            var pNode = _.clone(fullCode[prevNodeIndex]);

            for (var sIndex = 0; sIndex < s; sIndex++) {
              var prevIndex = app.random(pNode.length);

              snode.push(pNode[prevIndex]);
              node.push(pNode[prevIndex]);

              if (prevIndex > -1) {
                pNode.splice(prevIndex, 1);
              }
            }
            startFrom = s;
          }

          for (var rIndex = startFrom; rIndex < r; rIndex++) {
            node.push(counter++);
          }

          node.sort(sortNumber);
          snode.sort(sortNumber);

          fullCode.push(node);
          shortCode.push(snode);
          // pNode = _.clone(node);

        }
        shortTreeNodes = _.range(k);
        nodes = _.range(counter);


        for (var nodeIndex = 0; nodeIndex < fullCode.length; nodeIndex++) {
          var codeNode = fullCode[nodeIndex];

          for (var i = 0; i < codeNode.length; i++) {
            for (var j = i + 1; j < codeNode.length; j++) {
              edges.push([codeNode[i], codeNode[j]]);
            }
          }

        }
        edges = _.uniq(edges);
        //edges.push([0, 1]);

        return {
          nodes: nodes,
          edges: edges,

          shortTreeNodes: shortTreeNodes,
          shortTreeEdges: shortTreeEdges,

          fullCode: fullCode,
          shortCode: shortCode
        };
      }

      function buildAction() {
        if (nodeSize() <= 0 || intersectionSize() >= nodeSize() || intersectionSize() <= 0) {
          warning('Некорректные параметры');
          built(false);
          return;
        } else {
          warning('');
        }

        var res = buildRSTree(nodeSize(), intersectionSize(), amountNodes());

        console.dir(res);

        var fCode = '';
        for (var i = 0; i < res.fullCode.length; i++) {
          fCode += _s.humanize(res.fullCode[i]) + '| ';
        }
        fullTreeCode(fCode);

        var sCode = '';
        for (var i = 1; i < res.shortCode.length; i++) {
          sCode += _s.humanize(res.shortCode[i]) + '| ';
        }
        shortTreeCode(sCode);

        treeNodes(res.nodes);
        treeEdges(res.edges);

        shortTreeNodes(res.shortTreeNodes);
        shortTreeEdges(res.shortTreeEdges);

        built(true);
      }

      return {
        amountNodes: amountNodes,
        nodeSize: nodeSize,
        intersectionSize: intersectionSize,

        warning: warning,

        build: buildAction,
        reset: function (params) {
        },

        nodes: treeNodes,
        edges: treeEdges,

        shortTreeNodes: shortTreeNodes,
        shortTreeEdges: shortTreeEdges,

        fullCode: fullTreeCode,
        shortCode: shortTreeCode,

        built: built,

        edgesText: edgesText
      };
    },
    template: {
      fromUrl: 'rstrees.html',
      maxCacheAge: 60000
    }
  });
})(window.juggler = window.juggler || {}, jQuery);
