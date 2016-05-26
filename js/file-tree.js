/**
* Handles the project navigator file tree.
*/
function FileTree(fileSystemService, rootPath) {
  this.fileSystemService_ = fileSystemService;
  this.rootPath_ = rootPath;
}

FileTree.prototype.openProject = function() {
  this.fileSystemService_.chooseDirectoryAsModel(function(model) {
    console.log(model);
  });

  // Todo Send to controller to build tree ui.
}

