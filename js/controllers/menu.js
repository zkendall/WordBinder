/**
 * @constructor
 */
function MenuController(tabs, fileTree) {
  this.tabs_ = tabs;
  this.fileTree_ = fileTree;
  this.dragItem_ = null;
  $('#file-menu-new').click(this.newTab_.bind(this));
  $('#file-menu-open').click(this.open_.bind(this));
  $('#file-menu-save').click(this.save_.bind(this));
  $('#file-menu-saveas').click(this.saveas_.bind(this));
  $('#file-menu-open-project').click(this.openProject_.bind(this));
  $(document).bind('newtab', this.onNewTab.bind(this));
  $(document).bind('switchtab', this.onSwitchTab.bind(this));
  $(document).bind('tabchange', this.onTabChange.bind(this));
  $(document).bind('tabclosed', this.onTabClosed.bind(this));
  $(document).bind('tabrenamed', this.onTabRenamed.bind(this));
  $(document).bind('tabsave', this.onTabSave.bind(this));
}

MenuController.prototype.onNewTab = function(e, tab) {
  var id = tab.getId();
  var name = tab.getName();
  var listItem = $('<li id="tab' + id + '" draggable="true">' +
                   '<div class="filename">' + name + '</div>' +
                   '<div class="close"></div></li>');
  listItem.bind('dragstart', this.onDragStart_.bind(this, listItem));
  listItem.bind('dragover', this.onDragOver_.bind(this, listItem));
  listItem.bind('dragend', this.onDragEnd_.bind(this, listItem));
  listItem.bind('drop', this.onDrop_.bind(this, listItem));
  listItem.appendTo($('#tabs-list'));
  listItem.click(this.tabButtonClicked_.bind(this, id));
  listItem.find('.close').click(this.closeTabClicked_.bind(this, id));
};

// TODO: What do these 'drag' do?
MenuController.prototype.onDragStart_ = function(listItem, e) {
  this.dragItem_ = listItem;
};

MenuController.prototype.onDragEnd_ = function(listItem, e) {
  this.dragItem_ = null;
  e.preventDefault();
  e.stopPropagation();
};

MenuController.prototype.onDrop_ = function(listItem, e) {
  e.stopPropagation();
};

MenuController.prototype.onDragOver_ = function(overItem, e) {
  e.preventDefault();
  if (!this.dragItem_ || overItem.attr('id') === this.dragItem_.attr('id'))
    return;

  if (this.dragItem_.index() < overItem.index()) {
    overItem.after(this.dragItem_);
  } else {
    overItem.before(this.dragItem_);
  }
  this.tabs_.reorder(this.dragItem_.index(), overItem.index());
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

MenuController.prototype.newTab_ = function() {
  this.tabs_.newTab();
  return false;
};

MenuController.prototype.open_ = function() {
  this.tabs_.openFiles();
  return false;
};

MenuController.prototype.openProject_ = function() {
  this.fileTree_.openProject();
  return false;
};

MenuController.prototype.save_ = function() {
  this.tabs_.save();
  return false;
};

MenuController.prototype.saveas_ = function() {
  this.tabs_.saveAs();
  return false;
};

MenuController.prototype.tabButtonClicked_ = function(id) {
  this.tabs_.showTab(id);
  return false;
};

MenuController.prototype.closeTabClicked_ = function(id) {
  this.tabs_.close(id);
};
