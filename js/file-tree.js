/**
* Handles the project navigator file tree.
*/
function FileTree(fileSystemService) {
  this.fileSystemService_ = fileSystemService;
  this.currentModel_ = null;
}

FileTree.prototype.openProject = function() {
  this.fileSystemService_.chooseDirectoryAsModel(function(model) {
    console.log(model);
    this.currentModel_ = model;
  }.bind(this));

  // Todo Send to controller to build tree ui.
}

