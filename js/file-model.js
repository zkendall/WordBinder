class FileModel {
  constructor(name, id, children=[]) {
    this.name = name;
    this.id = id; // path
    this.isDirectory = false;
    this.children = children;
    this.textContent = null;
    this.session = null;
    this.isSaved = false;
  }

  getPath() {
  	return this.id;
  }

}