// window.addEventListener("load", function() {
//     var svgObject = document.getElementById('svg-object').contentDocument;
//     var svg = svgObject.getElementById('external-1');
//     console.log(svg);
//   });

var move = function() {
  var circle = document.getElementById("target");
  var text = document.getElementById("target_text").textContent;
  document.getElementById("target_text").textContent = Number(text) + 1;
  console.log(text);
};

var create_rect = function() {
  element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  svg.appendChild(element);
}

dragElement(document.getElementById("c1"));
dragElement(document.getElementById("c4"));

function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(element.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.setAttribute("cx", element.getAttribute("cx") - pos1);
    element.setAttribute("cy", element.getAttribute("cy") - pos2);

    rect = document.getElementById("rect");
    rect.setAttribute("width", rect.getAttribute("width") - pos1);
    rect.setAttribute("height", rect.getAttribute("height") - pos2);

    lt = document.getElementById("c2");
    lt.setAttribute("cx", lt.getAttribute("cx") - pos1);

    rb = document.getElementById("c3");
    rb.setAttribute("cy", rb.getAttribute("cy") - pos2);

    num = document.getElementById("text_label");
    num.setAttribute("x", num.getAttribute("x") - pos1 / 2);
    num.setAttribute("y", num.getAttribute("y") - pos2 / 2);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
