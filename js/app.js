import { explorerNav, aboutNav, artNav, main } from './elements.js'
import { Circle } from './classes.js'
import { mouse, canvasWidth, canvasHeight } from './variables.js'
import { element, fetchData, unpack, clearNodes, animate } from './functions.js'

window.addEventListener("load", event => {
  
  fetchData("./db/database.json").then(data => {
    let div = element("div")
    div.classList.add("root-branch-box")

    main.appendChild(div)

    unpack(data, div)
  })
})

window.addEventListener("mousemove", event => {
  mouse.x = event.x
  mouse.y = event.y
})

explorerNav.addEventListener("click", event => {
  
  clearNodes(main)

  fetchData("./db/database.json").then(data => {

    let div = element("div")
    div.classList.add("root-branch-box")
    main.appendChild(div)

    unpack(data, div)
  })
})

aboutNav.addEventListener("click", event => {
  
  clearNodes(main)

  let div = element("div")
  let h1 = element("h1")
  h1.innerText = "profile"
  let img = element("img")
  img.setAttribute("src", "https://onedrive.live.com/embed?resid=CCBE0FF733163886%21287710&authkey=%21AKcLbBJEDiIIO0c&width=354&height=472")

  main.appendChild(div)
  main.appendChild(h1)
  div.appendChild(img)
})

artNav.addEventListener("click", event => {

  clearNodes(main)

  // canvas1
  let canvas1 = element("canvas")
  canvas1.classList.add("canvas1")

  main.appendChild(canvas1)

  canvas1.width = canvasWidth
  canvas1.height = canvasHeight

  let c1 = canvas1.getContext("2d")

  let circles = []
  let quantity = 300

  for (let i = 0; i < quantity; i++) {
    let radius = Math.floor(Math.random() * 40 + 10)
    let x = Math.floor(Math.random()*(canvasWidth - 2*radius)) + radius
    let y = Math.floor(Math.random()*(canvasHeight - 2*radius)) + radius
    let dx = (Math.random() - 0.5)*5
    let dy = (Math.random() - 0.5)*5
    let red = Math.floor(Math.random()*256)
    let green = Math.floor(Math.random()*256)
    let blue = Math.floor(Math.random()*256)
    let alpha = Math.random()
    
    circles.push(new Circle(radius,x, y, dx, dy, red, green, blue, alpha))
  }

  animate(c1, canvasWidth, canvasHeight, () => {
    for (let i = 0; i < circles.length; i++) circles[i].update(c1, canvasWidth, canvasHeight, mouse.x, mouse.y)
  })

  // canvas2

  let canvas2 = element("canvas")
  canvas2.classList.add("canvas2")
  
  main.appendChild(canvas2)

  canvas2.width = canvasWidth
  canvas2.height = canvasHeight
  
  let c2 = canvas2.getContext("2d")
})