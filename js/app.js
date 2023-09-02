let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
const mostrarProductos = (productos) => {
	const contenedorProductos = document.querySelector(".product-list");
	contenedorProductos.innerHTML = "";
	productos.forEach((producto) => {
		const li = document.createElement("li");
		li.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p class="product-description">${producto.descripcion}</p>
    <p class="product-price">$${producto.precio}</p>
    <button id="agregar-${producto.id}" class="add-to-cart">Agregar al carrito</button>
    `;
		contenedorProductos.appendChild(li);
		const boton = document.getElementById(`agregar-${producto.id}`);
		boton.addEventListener("click", () => {
			agregarAlCarrito(productos, producto.id);
		});
	});
};

// FUNCIÓN PARA AGREGAR EL PRODUCTO AL CARRITO
const agregarAlCarrito = (productos, id) => {
	if (!carrito.some((producto) => producto.id === id)) {
		const producto = productos.find((producto) => producto.id === id);
		carrito.push({ ...producto, cantidad: 1 });
		Swal.fire({
			icon: 'success',
			title: 'Producto añadido!',
			text: 'Producto añadido al carrito con exito!',
		})
	} else {
		const producto = carrito.find((producto) => producto.id === id);
		producto.cantidad++;
	}
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

//CONTENEDOR
const mostrarCarrito = () => {
	const contenedorCarrito = document.querySelector(".carrito");
	contenedorCarrito.innerHTML = "";
	if (carrito.length > 0) {
		const productsCart = document.createElement("ul");
		productsCart.classList.add("productsCart");
		contenedorCarrito.appendChild(productsCart);
		const contenedorTotal = document.createElement("p");
		actualizarTotal(contenedorTotal);
		contenedorCarrito.appendChild(contenedorTotal);

//RECORRO EL ARRAY Y POR CAADA UNO CREO UNA CARD
		carrito.forEach((producto) => {
			const li = document.createElement("li");
			li.innerHTML = `
			<img src="${producto.imagen}" alt="${producto.nombre}" />
			<div class="productContent">
				<h3>${producto.nombre}</h3>
				<p class="product-description">${producto.descripcion}</p>
				<p class="product-price">$${producto.precio}</p>
				<div class="counter">
				<button id="decrementar-${producto.id}" class="button">-</button>
				<span class="product-price">${producto.cantidad}u.</span>
				<button id="incrementar-${producto.id}" class="button">+</button>
				</div>
			</div>
			<button id="eliminar-${producto.id}" class="remove">Eliminar</button>
		`;
			productsCart.appendChild(li);
			const boton = document.getElementById(`eliminar-${producto.id}`);
			boton.addEventListener("click", () => {
				eliminarProducto(producto.id);
			});

			const decrementar = document.getElementById(`decrementar-${producto.id}`);
			decrementar.addEventListener("click", () => {
				decrementarProducto(producto.id);
			});

			const incrementar = document.getElementById(`incrementar-${producto.id}`);
			incrementar.addEventListener("click", () => {
				incrementarProducto(producto.id);
			});
		});
	} else {
		contenedorCarrito.innerHTML = '<p class="empty">No hay productos</p>';
	}
};

const decrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);
	if (producto.cantidad === 1) {
		eliminarProducto(producto.id);
	} else {
		producto.cantidad--;
		localStorage.setItem("carrito", JSON.stringify(carrito));
		mostrarCarrito();
	}
};

const incrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);
	producto.cantidad++;
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const eliminarProducto = (id) => {
	carrito = carrito.filter((producto) => producto.id !== id);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const actualizarTotal = (contenedor) => {
	const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
	contenedor.textContent = `Total: $${total}`;
};

//TRAEMOS LOS PRODUCTOS DEL JSON LOCAL
fetch("./js/mouse.json")
	.then((response) => response.json())
	.then((productos) => {
		mostrarProductos(productos);
		mostrarCarrito();
	});
