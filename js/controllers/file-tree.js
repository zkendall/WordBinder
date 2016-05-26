function FileTreeController(fileTree) {
  this.fileTree = fileTree;

};

DialogController.prototype.loadTree = function() {
    $('#fileTree').tree({
        data: data
    });
}
