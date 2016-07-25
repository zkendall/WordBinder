/*
 * Builds style based on 
 */
class DynamicMode {

  constructor(indexService) {
    this.indexService_ = indexService;
  }

  function defineMode() {
    CodeMirror.defineSimpleMode("dynamic-mode", buildMode_()); 
  }

  function buildMode_() {
    return {
      start: [
      // Mocked behavior.
        {regex: /\b(bob|mary|keq'sai)\b/i, token: "keyword-1"},
        {regex: /oregon|seattle/i, token: "keyword-2"}
      ]
    }
  }

}
