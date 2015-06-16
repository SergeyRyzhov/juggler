//Only visualization for extrnal graph from Json
(function (app, $) {
  ko.components.register('juggler-viewer', {
    viewModel: function (params) {
      function coloringToObject(array) {
        var result = [];
        for (var index = 0; index < array.length; index++) {
          var element = array[index];
          result[element[0]] = element[1];
        }
        return result;
      }


      this.beforeJson = ko.observable('{"Vertices":[1,5,7,8,6,2,3,4],"Edges":[[1,5],[1,2],[5,7],[5,6],[7,8],[2,3],[2,4]]}');
      this.afterJson = ko.observable('{"Vertices":[4,5,7,8,6,3,1,2],"Edges":[[4,5],[4,3],[5,7],[5,6],[7,8],[3,1],[3,2]]}');

      this.afterLabelsJson = ko.observable('{"Coloring":[[8,1],[7,2],[6,3],[5,4],[1,5],[2,6],[3,7],[4,8]]}');

      this.beforeLabelsJson = ko.observable('{"Coloring":[[8,1],[7,2],[6,3],[5,4],[1,5],[2,6],[3,7],[4,8]]}');

      this.before = {};
      this.after = {};

      this.orgraph = ko.observable(false);

      this.before.nodes = ko.observable();
      this.before.edges = ko.observable();
      this.before.labels = ko.observable();
      this.after.nodes = ko.observable();
      this.after.edges = ko.observable();
      this.after.labels = ko.observable();

      this.apply = _.bind(function () {
        var before = JSON.parse(this.beforeJson());
        var after = JSON.parse(this.afterJson());
        
        // var afterColoring = JSON.parse(this.afterColoringJson());
        // var beforeColoring = JSON.parse(this.beforeColoringJson());
        
        var afterLabels = coloringToObject(JSON.parse(this.afterLabelsJson()).Coloring);
        var beforeLabels = coloringToObject(JSON.parse(this.beforeLabelsJson()).Coloring);

        this.before.nodes(before.Vertices);
        this.before.edges(before.Edges);
        this.before.labels(beforeLabels);
        this.after.nodes(after.Vertices);
        this.after.edges(after.Edges);
        this.after.labels(afterLabels);

      }, this);


    },
    template: {
      fromUrl: 'viewer.html',
      maxCacheAge: 60000
    }
  });

})(window.juggler = window.juggler || {}, jQuery);
