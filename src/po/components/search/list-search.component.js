class ListSearch {
  get SearchResult() {
    return $('div:nth-child(1) > div > div.gsc-thumbnail-inside > div > a');
  }
}

module.exports = ListSearch;
