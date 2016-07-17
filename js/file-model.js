class FileModel {
  constructor(name, id, children=[]) {
    this.name = name;
    this.id = id;
    this.children = children;
    this.content = null;
    this.session = null;
    this.isSaved = false;
  }

  getName() {
  	return this.name;
  }

  getPath() {
  	return this.id;
  }

  isSaved() {
  	return this.isSaved;
  }
}