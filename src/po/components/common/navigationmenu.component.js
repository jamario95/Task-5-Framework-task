class NavigationMenu {
  get name() {
    // return $('.name')
  }

  item(itemName) {
    const icons = {
      search: 'div.YSM5S',
    };
    return $(icons[itemName.toLowerCase()]);
  }

  get searchTab() {
    return $('div.YSM5S input');
  }
}

module.exports = NavigationMenu;
