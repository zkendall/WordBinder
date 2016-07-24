
/*
 * Handles file tree view.
 */
function FileTreeController() {
  this.fileTree_ = null;
};

FileTreeController.prototype.register = function(fileTree) {
  this.fileTree_ = fileTree;
  $(document).bind('docchange', fileTree.onDocChanged_.bind(fileTree));
}

FileTreeController.prototype.loadTree = function(data) {
    // Build tree
    $('#file-tree').tree({
      data: data,
      useContextMenu: false
    });

    // Register events
    $('#file-tree').bind(
    'tree.click',
    (event) => {
      var node = event.node;
      this.fileTree_.showDocument(node.id);
    });

}
