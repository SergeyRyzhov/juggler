//Only visualization for extrnal graph from Json
(function(app, $) {
  ko.components.register('juggler-viewer', {
    viewModel: function(params) {
      this.beforeJson = ko.observable('{"Vertices":[1,2,3,4,5,6,7,8,9],"Edges":[[4,5],[4,6],[4,3],[3,2],[3,7],[2,1],[7,8],[8,9]]}');
      this.afterJson = ko.observable('{"Vertices":[1,2,3,4,5,6,7,8,9],"Edges":[[1,3],[1,2],[1,4],[4,5],[4,7],[5,6],[7,8],[8,9]]}');

      this.before = {};
      this.after = {};

      this.before.nodes = ko.observable();
      this.before.edges = ko.observable();
      this.after.nodes = ko.observable();
      this.after.edges = ko.observable();

      this.apply = _.bind(function() {
        var before = JSON.parse(this.beforeJson());
        var after = JSON.parse(this.afterJson());

        this.before.nodes(before.Vertices);
        this.before.edges(before.Edges);
        this.after.nodes(after.Vertices);
        this.after.edges(after.Edges);

      }, this);


    },
    template: {
      fromUrl: 'viewer.html',
      maxCacheAge: 60000
    }
  });

})(window.juggler = window.juggler || {}, jQuery);
