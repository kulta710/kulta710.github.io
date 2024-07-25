function element (type) {
  
  return document.createElement(type)
}

async function fetchData (url) {
  const response = await fetch(url)
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
          if (item.check) a.innerText += "✅"

          div.appendChild(a)
        }
      })
    }
  }
}

function clearNodes (parentNode) {
  while (parentNode.hasChildNodes()) parentNode.removeChild(parentNode.lastChild)
}

function animate (context, canvasWidth, canvasHeight, callback) {
  window.requestAnimationFrame(() => animate(context, canvasWidth, canvasHeight, callback))

  context.clearRect(0, 0, canvasWidth, canvasHeight)

  callback()
}

export { element, fetchData, unpack, clearNodes, animate }