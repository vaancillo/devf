// let header = document.createElement("header")
// header.id = "mainheader"
// header.classList.add ("main-header")

// let root = document.getElementById ("root")
// root.appendChild(header)

function createElement(elem, attr = {}) {
    let element = document.createElement (elem)
    element.id = attr.id
    element.classList.add = attr.className     
}

const Header = createElement("header", { id: "mainheader2", className: "mainheader2" } )