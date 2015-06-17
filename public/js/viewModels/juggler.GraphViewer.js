//Only visualization for extrnal graph from Json
(function (app, $) {
  ko.components.register('juggler-viewer', {
    viewModel: function (params) {
      function coloringToObject(array) {
        if(!(array && array.length > 0)){
          return null;
        }
        
        var result = [];
        for (var index = 0; index < array.length; index++) {
          var element = array[index];
          result[element[0]] = element[1];
        }
        return result;
      }


      this.beforeJson = ko.observable('{"Vertices":[1,2,5,6,7,8,3,9,10,11,12,4,13,14,15,16],"Edges":[[1,2],[1,3],[1,4],[2,5],[2,7],[5,6],[7,8],[3,9],[3,11],[9,10],[11,12],[4,13],[4,15],[13,14],[15,16]]}');
      this.afterJson = ko.observable('{"Vertices":[1,12,15,16,13,14,7,10,11,8,9,2,5,6,3,4],"Edges":[[1,12],[1,7],[1,2],[12,15],[12,13],[15,16],[13,14],[7,10],[7,8],[10,11],[8,9],[2,5],[2,3],[5,6],[3,4]]}');

      this.afterLabelsJson = ko.observable('{"Coloring":[[1,1],[2,2],[3,2],[4,2],[5,3],[6,3],[7,3],[8,3],[9,4],[10,4],[11,4],[12,4],[13,5],[14,5],[15,5],[16,5]]}');

      this.beforeLabelsJson = ko.observable('{"Coloring":[[1,1],[2,2],[3,2],[4,2],[5,3],[6,3],[7,3],[8,3],[9,4],[10,4],[11,4],[12,4],[13,5],[14,5],[15,5],[16,5]]}');

      this.before = {};
      this.after = {};

      this.orgraph = ko.observable(false);

      this.before.nodes = ko.observable([]);
      this.before.edges = ko.observable([]);
      this.before.labels = ko.observable([]);
      this.before.colors = ko.observable([]);
      this.after.nodes = ko.observable([]);
      this.after.edges = ko.observable([]);
      this.after.labels = ko.observable([]);
      this.after.colors = ko.observable([]);

      this.oldMark = ko.computed(function () {
        var mark = 0;

        for (var index = 0; index < this.before.edges().length; index++) {
          var edge = this.before.edges()[index];
          mark += Math.abs(edge[0] - edge[1]);
        }
        console.info('Old mark', mark);
        return mark;
      }, this);

      this.mark = ko.computed(function () {
        var mark = 0;
        for (var index = 0; index < this.after.edges().length; index++) {
          var edge = this.after.edges()[index];
          mark += Math.abs(edge[0] - edge[1]);
        }
        console.info('Mark', mark);
        return mark;
      }, this);

      this.apply = _.bind(function () {
        var before = JSON.parse(this.beforeJson()||'{}');
        var after = JSON.parse(this.afterJson()||'{}');
        
        // var afterColoring = JSON.parse(this.afterColoringJson());
        // var beforeColoring = JSON.parse(this.beforeColoringJson());
        
        var afterColors = coloringToObject(JSON.parse(this.afterLabelsJson()||'{}').Coloring);
        var beforeColors = coloringToObject(JSON.parse(this.beforeLabelsJson()||'{}').Coloring);

        this.before.nodes(before.Vertices);
        this.before.edges(before.Edges);
        this.before.colors(beforeColors);
        this.after.nodes(after.Vertices);
        this.after.edges(after.Edges);
        this.after.colors(afterColors);

      }, this);


    },
    template: {
      fromUrl: 'viewer.html',
      maxCacheAge: 60000
    }
  });

})(window.juggler = window.juggler || {}, jQuery);
