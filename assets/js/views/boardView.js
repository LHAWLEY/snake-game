class BoardView {
  constructor(el, model){
    this.el = el;
    this.model = model;
  }

  template() {
    var html = '';
    var tiles = this.model.getTiles();
    for (var i = 0; i < tiles.length; i++) {
      var value = tiles[i];
      if(value === 0) {
        html += "<div class='tile'></div>";
      } else if(value === 1) {
        html += "<div class='tile snake'></div>";
      } else {
        html += "<div class='tile apple'></div>";
      }
    }

    return html;
  }

  render() {
    this.el.innerHTML = this.template();
  }
}