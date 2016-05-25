 var _title_re = /#(.*)/

 class MarkdownParser {
  constructor() {

  }

  getTitle(content) {
  	let result = _title_re.exec(content);
  	if(result != null) {
  		return result[1].trim();
  	}
  }

}