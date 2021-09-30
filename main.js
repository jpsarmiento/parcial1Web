const url = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';
let data
let carrito = new Map();
fetch(url).then(res =>res.json()).then(res=>{data = res})

const cancelarOrden = document.getElementById("cancelOrder");
cancelarOrden.addEventListener("click", function (event) {
  event.preventDefault();
  carrito = new Map();
  cargarOrden();
  actualizarItems(0);
});
const logoCarrito = document.getElementById("carrito");
logoCarrito.addEventListener("click", function (event) {
  event.preventDefault();
  cargarOrden();
});
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
  
  data.forEach(dato => {
    if(dato.name==item) {
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
          if(carrito.get(producto)==undefined) {
            carrito.set(producto,1)
          }
          else{
            carrito.set(producto, carrito.get(producto)+1)
          }
          let sum = 0;
          carrito.forEach((v) => {
            sum += v;
          });
          actualizarItems(sum)
        });  
      })      
    }
  })
}

function actualizarItems(n) {
  let texto = document.getElementById("items")
  texto.innerHTML = n + " items"
}

function cargarOrden(){
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = ""
  let menu = document.createElement("h1")
  menu.className = 'subtitulo'
  let hr = document.createElement("hr")
  let nodo = document.createTextNode("Order detail")
  menu.appendChild(nodo)
  contenido.appendChild(menu)
  contenido.appendChild(hr)
  let tabla = document.createElement("table")
  tabla.className = 'table table-striped'
  let thead = document.createElement("thead")
  let tbody = document.createElement("tbody")
  let columnas = document.createElement("tr")
  let it = document.createElement("th")
  it.innerText = 'Item'
  let qty = document.createElement("th")
  qty.innerText = 'Qty.'
  let desc = document.createElement("th")
  desc.innerText = 'Description'
  let unit = document.createElement("th")
  unit.innerText = 'Unit Price'
  let amount = document.createElement("th")
  amount.innerText = 'Amount'
  let modi = document.createElement("th")
  modi.innerText = 'Modify'
  columnas.appendChild(it)
  columnas.appendChild(qty)
  columnas.appendChild(desc)
  columnas.appendChild(unit)
  columnas.appendChild(amount)
  columnas.appendChild(modi)
  thead.appendChild(columnas)
  tabla.appendChild(thead)
  let x = 1
  let tot = 0
  
  carrito.forEach((values,keys) => {
    let tr = document.createElement('tr')
    it = document.createElement("th")
    it.innerText = x
    qty = document.createElement('td')
    qty.innerText = values
    desc = document.createElement('td')
    desc.innerText = keys.name
    unit = document.createElement('td')
    unit.innerText = keys.price
    amount = document.createElement('td')
    amount.innerText = (keys.price*values).toFixed(2)
    tot=tot+(keys.price*values)
    botones = document.createElement('td')
    let b1 = document.createElement('a')
    b1.className = 'btn btn-dark'
    b1.innerText = '+'
    let b2 = document.createElement('a')
    b2.className = 'btn btn-dark'
    b2.innerText = '-'
    
    b1.addEventListener("click", function (event) {
      event.preventDefault();
      carrito.set(keys, carrito.get(keys)+1)
      let sum = 0;
          carrito.forEach((v) => {
            sum += v;
          });
      actualizarItems(sum)
      cargarOrden()
    });
    b2.addEventListener("click", function (event) {
      event.preventDefault();
      if(carrito.get(keys)==1) {
        carrito.delete(keys)
      }
      else{
        carrito.set(keys, carrito.get(keys)-1)
      } 
      let sum = 0;
          carrito.forEach((v) => {
            sum += v;
          });
      actualizarItems(sum)
      cargarOrden()
    });
    
    botones.appendChild(b1)
    botones.appendChild(b2)
    tr.appendChild(it)
    tr.appendChild(qty)
    tr.appendChild(desc)
    tr.appendChild(unit)
    tr.appendChild(amount)
    tr.appendChild(botones)
    tbody.appendChild(tr)
  })
  tabla.appendChild(tbody)
  contenido.appendChild(tabla)
  let abajo = document.createElement('div')
  abajo.className='container'
  let fila = document.createElement('div')
  fila.className='row'
  let total = document.createElement('div')
  total.className='col totalCompra'
  total.innerText='Total: $'+tot.toFixed(2)
  let botts = document.createElement('div')
  botts.className='col'
  b1 = document.createElement('a')
  b1.className = 'btn btn-danger botonesCompra'
  b1.innerText = 'Cancel'
  b2 = document.createElement('a')
  b2.className = 'btn btn-light botonesCompra'
  b2.innerText = 'Confirm order'

  b1.dataset.toggle = 'modal'
  b1.dataset.target = '#mensajito'

  b2.addEventListener("click", function (event) {
    event.preventDefault();
    pedidoConsola();
    carrito = new Map();
    cargarOrden();
    actualizarItems(0);
  });
  botts.appendChild(b1)
  botts.appendChild(b2)
  fila.appendChild(total)
  fila.appendChild(botts)
  abajo.appendChild(fila)
  contenido.appendChild(abajo)
}

function pedidoConsola(){
  let obj = {item: 0, quantity: 0, description: "", unitPrice: 0}
  let x=1
  carrito.forEach((values,keys)=>{
    obj.item = x
    obj.quantity = values
    obj.description = keys.name
    obj.unitPrice = keys.price
    x++
    console.log(obj) 
  })
}