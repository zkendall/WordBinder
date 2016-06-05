/**
* Handles the project navigator file tree state and model.
*/
class FileTree {
  constructor(fileSystemService, fileTreeController) {
    this.fileSystemService_ = fileSystemService;
    this.fileTreeController_ = fileTreeController;
    fileTreeController.register(this);
    this.currentModel_ = null;
  }

  openProject() {
    this.fileSystemService_.chooseDirectoryAsModel(function(model) {
      console.log(model);
      this.currentModel_ = model;
      this.fileTreeController_.loadTree(this.forView(this.currentModel_));
    }.bind(this));
  }

  forView(model) {
    // TODO: Sanitize model of things unneeded for view, such as text content.
    return model;
  }

  showDocument(id) {
    console.log(this.getElement_(id, this.currentModel_));
  }

  static getElement_(root, id) {
    for(var element of root) {
      if (element.id === id) {
        return element;
      } else if(element.children.length > 0) {
        var intermediary = this.getElement_(element.children, id);
        if(intermediary !== null) {
          return intermediary;
        }
      }
    }
    return null;
  }

}
