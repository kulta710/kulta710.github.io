const explorerNav = document.querySelector(".repository-explorer")
const aboutNav = document.querySelector(".about-me")
const main = document.querySelector("main")

async function fetchData () {
  const response = await fetch("./database.json")
  const data = await response.json()

  return data
}

function unpack (_object, parentElement) {  
  
  if (_object.type === "branch") {
    let h3 = document.createElement("h3")
    h3.classList.add("branch-title")
    h3.innerText = _object.title
    let div = document.createElement("div")
    div.classList.add("branch-box")
    
    parentElement.appendChild(h3)
    parentElement.appendChild(div)

    if (_object.items.length !== 0) {
      _object.items.forEach(item => {
        if (item.type === "branch") unpack(item, div)
        if (item.type === "item") {
          let a = document.createElement("a")
          a.setAttribute("href", item.url)
          a.setAttribute("target", "_blank")
          a.innerText = item.title

          div.appendChild(a)
        }
      })
    }
  }
}

explorerNav.addEventListener("click", (event) => {
  
  while (main.hasChildNodes()) {
    main.removeChild(main.lastChild)
  }

  fetchData().then((data) => {

    let div = document.createElement("div")
    div.classList.add("root-branch-box")
    main.appendChild(div)

    unpack(data, div)
  })
})

aboutNav.addEventListener("click", (event) => {
  
  while (main.hasChildNodes()) {
    main.removeChild(main.lastChild)
  }

  let div = document.createElement("div")
  let h1 = document.createElement("h1")
  h1.innerText = "profile"
  let img = document.createElement("img")
  img.setAttribute("src", "https://onedrive.live.com/embed?resid=CCBE0FF733163886%21287710&authkey=%21AKcLbBJEDiIIO0c&width=354&height=472")

  main.appendChild(div)
  main.appendChild(h1)
  div.appendChild(img)
})