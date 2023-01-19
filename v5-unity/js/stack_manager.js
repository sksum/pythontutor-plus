import rough from '..//node_modules/roughjs/bin/rough.js'
export default class stack {
  constructor (init_list = [], seq = [], animated = true) {
    this.init_list = init_list;
    this.seq = seq;
    this.animated = animated;
    this.state_elements = []

    this.size = 0;
    this.top = undefined; // undefined if empty
    let svg = document.getElementById("canvas2")
    this.svg = svg
    let rc = rough.svg(svg)
    this.rc = rc;

    let base_x = 10;
    let base_y = 130;
    let base_w = 20;
    let base_h = 180;

    this.base_x = base_x
    this.base_y = base_y
    this.base_w = base_w
    this.base_h = base_h
    this.init_base();
    this.init_stack(init_list);
  }

  appendHtml(htmlString, div) {
    div.innerHTML += htmlString.trim();
    return div.lastChild;
  }
  
  trimText(text, threshold) {
    if (text.length <= threshold) return text;
    return text.substr(0, threshold).concat("...");
  }
  push (item) {
    let font_size = 20;
    let padding = 5;
    let h = this.base_h*0.5;
    let w = h - padding;
    let x = padding + (this.base_x + this.base_w) + this.state_elements.length * (w+padding);
    let y = this.base_y + this.base_h/2 - w/2;
    let y_font = this.base_y + this.base_h/2 + 5;
    let box = this.rc.rectangle(x, y, w, h, { roughness: 0.3, fill: '#ffffc6', fillStyle:"solid" });
    this.svg.appendChild(box); 
    item = this.trimText(item, 16)
    let text = this.appendHtml(`<text x="${x}" y="${y_font}" style="font-family:"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; font-size:${font_size}px"> ${item} </text>`, this.svg);

    //book keeping
    this.state_elements.push({"box": box, "text": text});
  }

  init_base () {
    let base = this.rc.rectangle(this.base_x, this.base_y, this.base_w, this.base_h, {
      fill: '#358ccb',
      fillStyle: "solid",
      roughness: 0.4,
      stroke: '#358ccb',
      hachureAngle: 60,
      hachureGap: 10,
      fillWeight: 5,
      strokeWidth: 5
    });
    this.svg.appendChild(base);

    let rod = this.rc.rectangle(this.base_x, this.base_y + this.base_h/2 - this.base_w/2, 2.5*this.base_h, this.base_w, {
      stroke: 'grey',
      fillWeight: 5,
      strokeWidth: 1
    });
    this.svg.appendChild(rod);
  }

  init_stack (seq) {
    for (let x of seq) {
      this.push(x);
    }
  }

  erase () {
    this.state_elements = []
    this.svg.innerHTML = "";
    this.init_base();
  }


}