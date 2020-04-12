window.addEventListener("load", () => {
    let image = document.querySelector("#imrect");
    image.addEventListener("click", createBox);
});


let labelClick = (e, elem) => {
  elem.textContent = Number(elem.textContent) + 1;
}


let createBox = e => {
  let image = document.querySelector("#image");
  if (e.target == document.querySelector("#imrect")) {
    let image_coords = image.getBoundingClientRect();

    let x = e.clientX - image_coords.left;
    let y = e.clientY - image_coords.top;
    let w = 50;
    let label_rad = 10;

    let box = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    box.setAttribute("class", "box");

    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", w);
    rect.setAttribute("height", w);
    rect.setAttribute("style", "fill: blue; stroke: pink; stroke-width: 3; fill-opacity: 0.1; stroke-opacity: 0.9");

    let corner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    corner.setAttribute("r", "4");
    corner.setAttribute("style", "fill: white; stroke: pink; stroke-width: 3;");

    let lt = corner.cloneNode(true);
    lt.setAttribute("class", "lt");
    lt.setAttribute("cx", x);
    lt.setAttribute("cy", y);

    let rt = corner.cloneNode(true);
    rt.setAttribute("class", "rt");
    rt.setAttribute("cx", x + w);
    rt.setAttribute("cy", y);

    let lb = corner.cloneNode(true);
    lb.setAttribute("class", "lb");
    lb.setAttribute("cx", x);
    lb.setAttribute("cy", y + w);

    let rb = corner.cloneNode(true);
    rb.setAttribute("class", "rb");
    rb.setAttribute("cx", x + w);
    rb.setAttribute("cy", y + w);

    let num_label = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    num_label.setAttribute("class", "num_label");
    num_label.setAttribute("x", x + w / 2 - label_rad);
    num_label.setAttribute("y", y + w / 2 - label_rad);
    num_label.setAttribute("width", label_rad * 2);
    num_label.setAttribute("height", label_rad * 2);

    let label_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    label_circle.setAttribute("class", "label_circle");
    label_circle.setAttribute("cx", "50%");
    label_circle.setAttribute("cy", "50%");
    label_circle.setAttribute("r", label_rad);
    label_circle.setAttribute("fill", "red");

    let label_text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label_text.setAttribute("class", "label_text");
    label_text.setAttribute("x", "50%");
    label_text.setAttribute("y", "50%");
    label_text.setAttribute("alignment-baseline", "middle");
    label_text.setAttribute("text-anchor", "middle");
    label_text.setAttribute("style", "pointer-events: none;");
    label_text.textContent = 'x';

    box.appendChild(rect);
    box.appendChild(lt);
    box.appendChild(rt);
    box.appendChild(lb);
    box.appendChild(rb);
    box.appendChild(rb);
    num_label.appendChild(label_circle);
    num_label.appendChild(label_text);
    box.appendChild(num_label);
    image.appendChild(box);

    dragBox(box);
  }
}


let dragBox = box => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  let dragMouseDown = e => {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = boxDrag;
  }

  let boxDrag = e => {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    rect = box.querySelector(".rect");
    rect.setAttribute("x", rect.getAttribute("x") - pos1);
    rect.setAttribute("y", rect.getAttribute("y") - pos2);

    label = box.querySelector(".num_label");
    label.setAttribute("x", label.getAttribute("x") - pos1);
    label.setAttribute("y", label.getAttribute("y") - pos2);

    let nodes = ["lt", "rt", "lb", "rb"];
    for (let node of nodes) {
      let elem = box.querySelector("." + node);
      elem.setAttribute("cx", elem.getAttribute("cx") - pos1);
      elem.setAttribute("cy", elem.getAttribute("cy") - pos2);
    }
  }

  let closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  box.onmousedown = dragMouseDown;
}
