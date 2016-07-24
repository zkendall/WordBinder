/**
 * @constructor
 */
function MenuController(tabs, fileTree) {
  this.tabs_ = tabs;
  this.fileTree_ = fileTree;
  this.dragItem_ = null;
  $('#file-menu-save-all').click(this.saveAll_.bind(this));
  $('#file-menu-open-project').click(this.openProject_.bind(this));
}

MenuController.prototype.onNewTab = function(e, tab) {
  // TODO: Handle new file in file-tree
};

MenuController.prototype.onTabRenamed = function(e, tab) {
  // TODO: Handle by file-tree instead.
  $('#tab' + tab.getId() + ' .filename').text(tab.getName());
};

MenuController.prototype.onTabChange = function(e, tab) {
  // TODO: Apply to file-tree node instead.
  $('#tab' + tab.getId()).addClass('unsaved');
};

MenuController.prototype.onTabClosed = function(e, tab) {
  // No longer needed, since we don't close files.
  $('#tab' + tab.getId()).remove();
};

MenuController.prototype.onTabSave = function(e, tab) {
  // TODO: Apply to file-tree instead.
  $('#tab' + tab.getId()).removeClass('unsaved');
};

MenuController.prototype.onSwitchTab = function(e, tab) {
  // No longer needed. Should be handled by file-tree instead.
  $('#tabs-list li.active').removeClass('active');
  $('#tab' + tab.getId()).addClass('active');
};

MenuController.prototype.openProject_ = function() {
  this.fileTree_.openProject();
  return false;
};

MenuController.prototype.saveAll_ = function() {
  //this.tabs_.save();
  //return false;
};
