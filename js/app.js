import { explorerNav, aboutNav, artNav, main } from './elements.js'
import { Circle } from './classes.js'
import { mouse, canvasWidth, canvasHeight } from './variables.js'
import { element, fetchData, unpack, clearNodes, animate } from './functions.js'

// window가 load되면 main에 github repository tree를 띄워주는 eventListener
window.addEventListener("load", event => {
  
  fetchData("./db/database.json").then(data => {
    let div = element("div")
    div.classList.add("root-branch-box")

    main.appendChild(div)

    unpack(data, div)
  })
})

// mouse pointer가 움직일 때마다 브라우저 화면 기준으로 x, y 좌표를 mouse object에 저장해주는 eventListener
window.addEventListener("mousemove", event => {
  mouse.x = event.x
  mouse.y = event.y
})

// Nav에서 Repository Explorer를 눌렀을 때 main에 repository tree를 띄워주는 eventListener
explorerNav.addEventListener("click", event => {
  
  clearNodes(main)

  fetchData("./db/database.json").then(data => {

    let div = element("div")
    div.classList.add("root-branch-box")
    main.appendChild(div)

    unpack(data, div)
  })
})

// Nav에서 About Me를 눌렀을 때 main에 about me에 대한 내용을 띄워주는 eventListener
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

// Nav에서 Canvas Art를 눌렀을 때 main에 canvas art에 대한 내용을 띄워주는 eventListener
artNav.addEventListener("click", event => {

  clearNodes(main)

  let artContainer = element("div")
  artContainer.classList.add("art-container")

  main.appendChild(artContainer);

  // canvas1
  let canvas1 = element("canvas")
  canvas1.classList.add("canvas1")

  artContainer.appendChild(canvas1)

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
    // canvas1.getBoundingClientRect()는 현재 element의 window에서의 위치에 대한 정보를 제공하는 obejct를 return한다.
    // Circle class에서 draw() method와 update() method에서 이 obeject의 x, y properties를 사용하고 있다.
    for (let i = 0; i < circles.length; i++) circles[i].update(canvas1.getBoundingClientRect(), c1, canvasWidth, canvasHeight, mouse.x, mouse.y)
  })

  // canvas2

  let canvas2 = element("canvas")
  canvas2.classList.add("canvas2")
  
  artContainer.appendChild(canvas2)

  canvas2.width = canvasWidth
  canvas2.height = canvasHeight
  
  let c2 = canvas2.getContext("2d")
})