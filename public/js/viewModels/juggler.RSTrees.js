//RS tree builder
(function (app, $) {
  ko.components.register('juggler-rstrees', {
    viewModel: function (params) {

      var amountNodes = ko.observable(5);
      var nodeSize = ko.observable(4);
      var intersectionSize = ko.observable(2);     
      
      var built = ko.observable(false);

      var treeNodes = ko.observableArray([]);
      var treeEdges = ko.observableArray([]);


      var fullTreeCode = ko.observableArray([]);
      var shortTreeCode = ko.observableArray([]);

      function buildRSTree(r, s, k) {
        s = s || 2;
        r = r || 4;
        k = k || 5;

        var nodes = [];
        var edges = [];

        var fullCode = [];
        var shortCode = [];

        var counter = 0;
        var pNode = [];
        for (var part = 0; part < k; part++) {
          var node = [];
          var snode = [];
          var startFrom = 0;

          if (pNode.length > 0) {
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

          fullCode.push(node);
          shortCode.push(snode);

          pNode = _.clone(node);

        }

        nodes.push(1);
        nodes.push(2);

        edges.push([1, 2]);

        return {
          nodes: nodes,
          edges: edges,

          fullCode: fullCode,
          shortCode: shortCode
        };
      }

      function buildAction() {
        var res = buildRSTree(nodeSize(), intersectionSize(), amountNodes());

        console.dir(res);

        //var fCode = _.flatten(res.fullCode);
        //var sCode = _.flatten(res.shortCode);

        //console.dir(fCode);
        //console.dir(sCode);

        var fCode = '';
        for (var i = 0; i < res.fullCode.length; i++) {
          fCode += _s.humanize(res.fullCode[i]) + '|';
        }
        fullTreeCode(fCode);

        var sCode = '';
        for (var i = 1; i < res.shortCode.length; i++) {
          sCode += _s.humanize(res.shortCode[i]) + '|';
        }
        shortTreeCode(sCode);
        
        //shortTreeCode(_s.humanize(sCode));

        treeNodes(res.nodes);
        treeEdges(res.edges);
        
        built(true);
      }

      return {
        amountNodes: amountNodes,
        nodeSize: nodeSize,
        intersectionSize: intersectionSize,

        warning: '',

        build: buildAction,
        reset: function (params) {


        },
        nodes: treeNodes,
        edges: treeEdges,

        fullCode: fullTreeCode,
        shortCode: shortTreeCode,
        
        built:built,

        edgesText: '',
        nodesText: ''
      };
    },
    template: {
      fromUrl: 'rstrees.html',
      maxCacheAge: 60000
    }
  });
})(window.juggler = window.juggler || {}, jQuery);
