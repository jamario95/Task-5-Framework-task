class NavigationMenu {
get name(){
    // return $('.name')
}

  item(itemName) {
    const icons = {
      search: 'div.YSM5S',
    };
    return $(icons[itemName.toLowerCase()])
  }
}

module.exports = NavigationMenu;
