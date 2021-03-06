window.addEventListener("load", () => {
    let imrect = document.querySelector("#imrect");
    imrect.addEventListener("click", createBox);
    imrect.ontouchmove = e => {e.preventDefault();}
});


let createBox = e => {
  let image = document.querySelector("#image");
  if (e.target == document.querySelector("#imrect")) {
    let image_coords = image.getBoundingClientRect();

    let x = e.clientX - image_coords.left;
    let y = e.clientY - image_coords.top;
    let size = 40;
    let label_rad = 10;

    let box = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    box.setAttribute("class", "box");

    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", size);
    rect.setAttribute("height", size);
    rect.setAttribute("style", "fill: blue; stroke: pink; stroke-width: 2; fill-opacity: 0.1; stroke-opacity: 0.9");

    let corner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    corner.setAttribute("r", "3");
    corner.setAttribute("style", "fill: white; stroke: pink; stroke-width: 2;");

    let lt = corner.cloneNode(true);
    lt.setAttribute("class", "lt");
    lt.setAttribute("cx", x);
    lt.setAttribute("cy", y);

    let rt = corner.cloneNode(true);
    rt.setAttribute("class", "rt");
    rt.setAttribute("cx", x + size);
    rt.setAttribute("cy", y);

    let lb = corner.cloneNode(true);
    lb.setAttribute("class", "lb");
    lb.setAttribute("cx", x);
    lb.setAttribute("cy", y + size);

    let rb = corner.cloneNode(true);
    rb.setAttribute("class", "rb");
    rb.setAttribute("cx", x + size);
    rb.setAttribute("cy", y + size);

    let num_label = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    num_label.setAttribute("class", "num_label");
    num_label.setAttribute("x", x + size / 2 - label_rad);
    num_label.setAttribute("y", y + size / 2 - label_rad);
    num_label.setAttribute("width", label_rad * 2);
    num_label.setAttribute("height", label_rad * 2);

    let label_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    label_circle.setAttribute("class", "label_circle");
    label_circle.setAttribute("cx", "50%");
    label_circle.setAttribute("cy", "50%");
    label_circle.setAttribute("r", label_rad);
    label_circle.setAttribute("fill", "blue");
    label_circle.setAttribute("opacity", "0");

    let label_text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label_text.setAttribute("class", "label_text");
    label_text.setAttribute("x", "50%");
    label_text.setAttribute("y", "50%");
    label_text.setAttribute("alignment-baseline", "middle");
    label_text.setAttribute("text-anchor", "middle");
    label_text.setAttribute("style", "pointer-events: none;");
    label_text.textContent = "1";
    label_text.style.fill = "00f";

    let label_close = document.createElementNS("http://www.w3.org/2000/svg", "path");
    label_close.setAttribute("class", "label_close");
    label_close.setAttribute("x", "0");
    label_close.setAttribute("y", "0");
    label_close.setAttribute("d", "M 5,5 L 15,15 M 15,5 L 5,15 Z");
    label_close.setAttribute("stroke", "white");
    label_close.setAttribute("stroke-width", "2");
    label_close.setAttribute("opacity", "0");

    box.appendChild(rect);
    box.appendChild(lt);
    box.appendChild(rt);
    box.appendChild(lb);
    box.appendChild(rb);
    box.appendChild(rb);
    num_label.appendChild(label_circle);
    num_label.appendChild(label_text);
    num_label.appendChild(label_close);
    box.appendChild(num_label);
    image.appendChild(box);

    box.addEventListener("mouseover", () => showRemoveButton(box));
    box.addEventListener("mouseout", () => hideRemoveButton(box));
    label_circle.addEventListener("click", () => removeBox(box));
    label_close.addEventListener("click", () => removeBox(box));
    dragBox(box);
    dragNode(lt);
    dragNode(rt);
    dragNode(lb);
    dragNode(rb);
  }
}


let dragBox = box => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  let dragMouseDown = e => {
    if (e.target == box.querySelector(".rect")) {
      e = e || window.event;
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onpointerup = closeDragElement;
      document.onpointermove = boxDrag;
    }
  }

  let boxDrag = e => {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let image = document.querySelector("#image");
    let image_coords = image.getBoundingClientRect();
    let rect = box.querySelector(".rect");
    let lt = box.querySelector(".lt");
    let rt = box.querySelector(".rt");
    let lb = box.querySelector(".lb");
    let rb = box.querySelector(".rb");
    let label = box.querySelector(".num_label");
    let nodes = ["lt", "rt", "lb", "rb"];


    if (Number(lt.getAttribute("cx")) - pos1 >= 0 && pos1 > 0 ||
        Number(lt.getAttribute("cx")) - pos1 <= Number(image.getAttribute("width")) - Number(rect.getAttribute("width")) && pos1 < 0) {
      rect.setAttribute("x", Number(rect.getAttribute("x")) - pos1);
      label.setAttribute("x", Number(label.getAttribute("x")) - pos1);
      for (let node of nodes) {
        let elem = box.querySelector("." + node);
        elem.setAttribute("cx", Number(elem.getAttribute("cx")) - pos1);
      }
    }

    if (Number(lt.getAttribute("cy")) - pos2 >= 0 && pos2 > 0 ||
        Number(lt.getAttribute("cy")) - pos2 <= Number(image.getAttribute("height")) - Number(rect.getAttribute("height")) && pos2 < 0) {
        rect.setAttribute("y", Number(rect.getAttribute("y")) - pos2);
        label.setAttribute("y", Number(label.getAttribute("y")) - pos2);
        for (let node of nodes) {
          let elem = box.querySelector("." + node);
          elem.setAttribute("cy", Number(elem.getAttribute("cy")) - pos2);
        }
      }
  }

  let closeDragElement = () => {
    document.onpointerup = null;
    document.onpointermove = null;
  }

  box.onpointerdown = dragMouseDown;
}



let dragNode = node => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  let dragMouseDown = e => {
    if (e.target == node) {
      e = e || window.event;
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onpointerup = closeDragElement;
      document.onpointermove = nodeDrag;
    }
  }

  let nodeDrag = e => {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let box = node.parentNode;
    let image = box.parentNode;
    let rect = box.querySelector(".rect");
    let lt = box.querySelector(".lt");
    let rt = box.querySelector(".rt");
    let lb = box.querySelector(".lb");
    let rb = box.querySelector(".rb");
    let label = box.querySelector(".num_label");
    let nodeClass = node.getAttribute("class");

    if ((nodeClass == 'lt' || nodeClass == 'rt') &&
        (Number(lt.getAttribute("cy")) - pos2 >= 0 && pos2 > 0 ||
         Number(rect.getAttribute("height")) + pos2 >= 20 && pos2 < 0)) {
      lt.setAttribute("cy", Number(lt.getAttribute("cy")) - pos2);
      rt.setAttribute("cy", Number(rt.getAttribute("cy")) - pos2);
      rect.setAttribute("y", Number(rect.getAttribute("y")) - pos2);
      rect.setAttribute("height", Number(rect.getAttribute("height")) + pos2);
      label.setAttribute("y", Number(label.getAttribute("y")) - pos2 / 2);
    }

    if ((nodeClass == 'rt' || nodeClass == 'rb') &&
        (Number(lt.getAttribute("cx")) - pos1 <= Number(image.getAttribute("width")) - Number(rect.getAttribute("width")) && pos1 < 0 ||
         Number(rect.getAttribute("width")) - pos1 >= 20 && pos1 > 0 )) {
      rb.setAttribute("cx", Number(rb.getAttribute("cx")) - pos1);
      rt.setAttribute("cx", Number(rt.getAttribute("cx")) - pos1);
      rect.setAttribute("width", Number(rect.getAttribute("width")) - pos1);
      label.setAttribute("x", Number(label.getAttribute("x")) - pos1 / 2);
    }

    if ((nodeClass == 'lb' || nodeClass == 'rb') &&
        (Number(lt.getAttribute("cy")) - pos2 <= Number(image.getAttribute("height")) - Number(rect.getAttribute("height")) && pos2 < 0 ||
         Number(rect.getAttribute("height")) - pos2 >= 20 && pos2 > 0 )) {
      lb.setAttribute("cy", Number(lb.getAttribute("cy")) - pos2);
      rb.setAttribute("cy", Number(rb.getAttribute("cy")) - pos2);
      rect.setAttribute("height", Number(rect.getAttribute("height")) - pos2);
      label.setAttribute("y", Number(label.getAttribute("y")) - pos2 / 2);
    }

    if ((nodeClass == 'lt' || nodeClass == 'lb') &&
        (Number(lt.getAttribute("cx")) - pos1 >= 0 && pos1 > 0 ||
         Number(rect.getAttribute("width")) + pos1 >= 20 && pos1 < 0)) {
      lt.setAttribute("cx", Number(lt.getAttribute("cx")) - pos1);
      lb.setAttribute("cx", Number(lb.getAttribute("cx")) - pos1);
      rect.setAttribute("x", Number(rect.getAttribute("x")) - pos1);
      rect.setAttribute("width", Number(rect.getAttribute("width")) + pos1);
      label.setAttribute("x", Number(label.getAttribute("x")) - pos1 / 2);
    }
  }

  let closeDragElement = () => {
    document.onpointerup = null;
    document.onpointermove = null;
  }

  node.onpointerdown = dragMouseDown;
}

let showRemoveButton = box => {
  box.parentNode.appendChild(box);
  circle = box.querySelector(".label_circle");
  close = box.querySelector(".label_close");
  text = box.querySelector(".label_text");

  circle.style.opacity = 1;
  close.style.opacity = 1;
  text.style.opacity = 0;
}

let hideRemoveButton = box => {
  circle = box.querySelector(".label_circle");
  close = box.querySelector(".label_close");
  text = box.querySelector(".label_text");

  circle.style.opacity = 0;
  close.style.opacity = 0;
  text.style.opacity = 1;
}

let removeBox = box => {
  box.parentNode.removeChild(box);
}
