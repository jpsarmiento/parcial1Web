const url = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';
let data
let carrito = []

fetch(url).then(res =>res.json()).then(res=>{
    data = res
})

const menuBurgers = document.getElementById("burgers");
menuBurgers.addEventListener("click", function (event) {
  event.preventDefault();
  cargarMenu("Burguers");
});

const menuTacos = document.getElementById("tacos");
menuTacos.addEventListener("click", function (event) {
  event.preventDefault();
  cargarMenu("Tacos");
});

const menuSalads = document.getElementById("salads");
menuSalads.addEventListener("click", function (event) {
  event.preventDefault();
  cargarMenu("Salads");
});

const menuDesserts = document.getElementById("desserts");
menuDesserts.addEventListener("click", function (event) {
  event.preventDefault();
  cargarMenu("Desserts");
});

const menuDrinks = document.getElementById("drinks");
menuDrinks.addEventListener("click", function (event) {
  event.preventDefault();
  cargarMenu("Drinks and Sides");
});

function actualizarItems(n) {
  let texto = document.getElementById("carrito")
  texto.innerHTML = n + " items"
}

function cargarMenu(item) {
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = ""
  let menu = document.createElement("h1")
  menu.className = 'subtitulo'
  let hr = document.createElement("hr")
  let nodo = document.createTextNode(item)
  menu.appendChild(nodo)
  contenido.appendChild(menu)
  contenido.appendChild(hr)
  let carddeck = document.createElement("div")
  carddeck.className='card-deck'
  contenido.appendChild(carddeck)
  data.forEach(dato => {
    if(dato.name==item) {
      let nodo = document.createTextNode(dato.name)
      let productos = dato.products
      productos.forEach(producto => {
        let card = document.createElement("div")
        card.className = 'card'
        card.style = 'width: 18rem'
        let img = document.createElement("img")
        img.className = 'card-img-top'
        let body = document.createElement("div")
        body.className = 'card-body'
        let titulo = document.createElement("h5")
        titulo.className = 'card-title'
        let texto = document.createElement("p")
        texto.className = 'card-text'
        let precio = document.createElement("h5")
        precio.className = 'card-title'
        let boton = document.createElement("a")
        boton.className = 'btn btn-dark'
        img.src=producto.image
        nodo = document.createTextNode(producto.name)
        titulo.appendChild(nodo)
        nodo = document.createTextNode(producto.description)
        texto.appendChild(nodo)
        nodo = document.createTextNode(producto.price)
        precio.appendChild(nodo)
        nodo = document.createTextNode("Add to cart")
        boton.appendChild(nodo)
        body.appendChild(titulo)
        body.appendChild(texto)
        body.appendChild(precio)
        body.appendChild(boton)
        card.appendChild(img)
        card.appendChild(body)
        contenido.appendChild(card)

        boton.addEventListener("click", function (event) {
          event.preventDefault();
          carrito.push(producto)
          actualizarItems(carrito.length)
        });
        
      })      
    }
  })
}

