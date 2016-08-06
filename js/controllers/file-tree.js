
/*
 * Handles file tree view.
 */
function FileTreeController(htmlElement) {
  this.htmlElement_ = htmlElement;
  this.tree_ = null;
};

FileTreeController.prototype.register = function(fileTree) {
  this.tree_ = fileTree;
  $(document).bind('docchange', fileTree.onDocChanged_.bind(fileTree));
}

FileTreeController.prototype.loadManuscriptTree = function(data) {
    // Build tree
    this.htmlElement_.tree({
      data: data,
      useContextMenu: false
    });

    // Register events
    this.htmlElement_.bind(
    'tree.click',
    (event) => {
      var node = event.node;
      this.tree_.showDocument(node.id);
    });

}
