/*

Consider using bimap library: https://github.com/alethes/bimap
*/
class IndexService {
  constructor(parser) {
    this.parser = parser;
    this.keywords_ = [];
  }

  index(root) {
    var collector = [];
    var getTitleRecursive = function(model, collector) {
      console.log(model.id);
      if(model.isDirectory) {
        // Recurse childen
        _.each(model.children, getTitleRecursive);
      } else {
        // Index
        var title = this.parser.getTitle(model.textContent);
        this.keywords_.push(title);
        console.log("Pushed " + model.id)
      }
    }.bind(this);

    getTitleRecursive(root, collector);
  }

  getKeywords() {
    return this.keywords_;
  }

}