window.addEventListener("load", () => {
    let image = document.querySelector("#image");
    image.addEventListener("click", createPolygon);
});


let createPolygon = e => {
  let image = document.querySelector("#image");
  if (e.target == document.querySelector("#imrect")) {
    let image_coords = image.getBoundingClientRect();

    let x = e.clientX - image_coords.left;
    let y = e.clientY - image_coords.top;

    let box = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    box.setAttribute("class", "box");

    let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("class", "poly");
    poly.setAttribute("points", x + "," + y);
    poly.setAttribute("style", "fill: blue; stroke: pink; stroke-width: 3; fill-opacity: 0.1; stroke-opacity: 0.9")

    let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("class", "point point--first");
    point.setAttribute("cx", x);
    point.setAttribute("cy", y);
    point.setAttribute("r", "5");
    point.setAttribute("style", "fill: pink; stroke: none;");

    box.appendChild(poly);
    box.appendChild(point);
    image.appendChild(box);

    let imrect = document.querySelector("#imrect");
    image.removeEventListener("click", createPolygon);
    image.addEventListener("click", createPoint);
    point.addEventListener("click", endCreatePolygon);
  }
}


let createPoint = e => {
  let image = document.querySelector("#image");
  let image_coords = image.getBoundingClientRect();

  let x = e.clientX - image_coords.left;
  let y = e.clientY - image_coords.top;

  let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  point.setAttribute("class", "point");
  point.setAttribute("cx", x);
  point.setAttribute("cy", y);
  point.setAttribute("r", "3");
  point.setAttribute("style", "fill: white; stroke: pink; stroke-width: 2;");

  let boxes = image.querySelectorAll(".box");
  let box = boxes[boxes.length - 1];
  let poly = box.querySelector(".poly")

  poly.setAttribute("points", poly.getAttribute("points") + " " + x + "," + y);
  box.appendChild(point);
}


let endCreatePolygon = e => {
  let imrect = document.querySelector("#imrect");
  let image = document.querySelector("#image");
  let boxes = image.querySelectorAll(".box");
  let box = boxes[boxes.length - 1];
  let poly = box.querySelector(".poly")
  let point = box.querySelector(".point--first")

  point.setAttribute("r", "3");
  point.setAttribute("style", "fill: white; stroke: pink; stroke-width: 2;");

  image.removeEventListener("click", createPoint);
  point.removeEventListener("click", endCreatePolygon);
  image.addEventListener("click", createPolygon);
}
