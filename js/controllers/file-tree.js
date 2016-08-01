
/*
 * Handles file tree view.
 */
function FileTreeController() {
  this.manuscriptTree_ = null;
};

FileTreeController.prototype.register = function(fileTree) {
  this.manuscriptTree_ = fileTree;
  $(document).bind('docchange', fileTree.onDocChanged_.bind(fileTree));
}

FileTreeController.prototype.loadManuscriptTree = function(data) {
    // Build tree
    $('#manuscript-tree').tree({
      data: data,
      useContextMenu: false
    });

    // Register events
    $('#manuscript-tree').bind(
    'tree.click',
    (event) => {
      var node = event.node;
      this.manuscriptTree_.showDocument(node.id);
    });

}
