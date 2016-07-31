/*
 * Builds style based on 
 */
class DynamicMode {

  constructor(indexService) {
    this.indexService_ = indexService;
  }

  defineMode() {
    CodeMirror.defineSimpleMode("dynamic-mode", this.buildMode_()); 
  }

  buildMode_(keywords = []) {
    if (!keywords || keywords.length == 0) return {start:[]};
   
    return {
      start: [
        {regex: this.buildRegex_(keywords), token: "keyword-8"}
      ]
    }
  }

  buildRegex_(words) {
    return new RegExp("\\b(" + words.join("|") + ")\\b", "i")
  }

}
