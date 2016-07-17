class FileModel {
  constructor(name, id, children=[], content=null, session=null ) {
    this.name = name;
    this.id = id;
    this.children = children;
    this.content = content;
    this.session = session;
  }
}