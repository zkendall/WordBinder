/**
* Handles the project navigator file tree state and model.
*/
class FileTree {
  constructor(fileSystemService, fileTreeController, editor) {
    this.fileSystemService_ = fileSystemService;
    this.fileTreeController_ = fileTreeController;
    this.editor_ = editor;
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
    var element = FileTree.getElement_(this.currentModel_, id);
    var session = this.getSession_(element);
    this.editor_.setSession(session);
    $.event.trigger('switchfile', element);
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

  getSession_(element) {
    if (element.session) {
      return element.session;
    }
    else {
      element.session = this.editor_.newSession(element.textContent);
      return element.session;
    }
  }

  onDocChanged_(e, session) {
    var tab = this.currentModel_;
    if(tab.isDirectory) {
      tab.changed();
    }
  };

}
