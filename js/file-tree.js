/**
* Handles the project navigator file tree.
*/
class FileTree {
  constructor(fileSystemService, fileTreeController) {
    this.fileSystemService_ = fileSystemService;
    this.fileTreeController_ = fileTreeController;
    this.currentModel_ = null;
  }

  openProject() {
    this.fileSystemService_.chooseDirectoryAsModel(function(model) {
      console.log(model);
      this.currentModel_ = model;
      this.fileTreeController_.loadTree(this.currentModel_);
    }.bind(this));
  }

}
