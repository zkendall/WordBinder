function FileTreeController(fileTree) {
  this.fileTree = fileTree;

};

FileTreeController.prototype.loadTree = function(data) {
  $(function() {
    $('#fileTree').tree({
      data: data
    });
  });
}
