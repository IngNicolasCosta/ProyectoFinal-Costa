// --- 1. SELECTORES ---
const contenedorProds = document.querySelector("#contenedor-productos");
const listaCarritoUI = document.querySelector("#carrito-items");
const modal = document.querySelector("#modal-carrito");
const contenedorFiltros = document.querySelector("#filtros");

// --- 2. INICIO Y GENERACIÓN DE FILTROS ---
const iniciarApp = async () => {
    const productos = await obtenerProductos(); 
    const todasLasCategorias = productos.map(p => p.categoria); 

    const categoriasUnicas = ["todos", ...new Set(todasLasCategorias)]; 

    contenedorFiltros.innerHTML = ""; 
    categoriasUnicas.forEach(cat => {
        const boton = document.createElement("button");
        boton.className = "btn-filtro";
        boton.innerText = cat.toUpperCase();
        boton.setAttribute("data-categoria", cat.toLowerCase());
        if (cat === "todos") {
            boton.classList.add("active");
        }
        boton.addEventListener("click", (e) => {
            document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const seleccion = e.target.getAttribute("data-categoria");
            const filtrados = (seleccion === "todos") 
                ? productos 
                : productos.filter(p => p.categoria.toLowerCase() === seleccion);
            renderizarCards(filtrados);
        });
        contenedorFiltros.appendChild(boton);
    });
    renderizarCards(productos);
};

// --- 3. RENDERIZADO DE CARDS ---
const renderizarCards = (lista) => {
    contenedorProds.innerHTML = "";
    lista.forEach(prod => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}">
            <div class="info-prod">
                <h3>${prod.nombre}</h3>
                <div class="controles-card">
                    <p class="precio">$${prod.precio}</p>
                    <select id="select-${prod.id}" class="select-cantidad">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button class="btn-agregar" id="btn-${prod.id}">Agregar</button>
            </div>
        `;
        contenedorProds.appendChild(card);

        document.getElementById(`btn-${prod.id}`).addEventListener("click", () => {
            const cantidad = parseInt(document.getElementById(`select-${prod.id}`).value);
            agregarAlPresupuesto(prod.id, lista, cantidad);
        });
    });
};

// --- 4. RENDERIZADO DEL CARRITO ---
const renderizarCarrito = () => {
    listaCarritoUI.innerHTML = "";
    carrito.forEach(p => {
        const item = document.createElement("div");
        item.className = "item-presupuesto";
        item.innerHTML = `
            <div class="info-item">
                <p><strong>${p.nombre}</strong></p>
                <div class="controles-cantidad">
                    <button onclick="cambiarCantidad(${p.id}, -1)">-</button>
                    <span>${p.cantidad}</span>
                    <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
                </div>
            </div>
            <p>$${(p.precio * p.cantidad).toFixed(2)}</p>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
        `;
        listaCarritoUI.appendChild(item);
    });

    const { subtotal, iva, total } = calcularTotal();
    document.querySelector("#subtotal").innerText = subtotal.toFixed(2);
    document.querySelector("#iva-total").innerText = iva.toFixed(2);
    document.querySelector("#precio-total").innerText = total.toFixed(2);
};

// --- 5. EVENTOS GLOBALES ---
document.querySelector("#btn-carrito").addEventListener("click", () => {
    modal.classList.toggle("modal-hidden");
    renderizarCarrito();
});

document.querySelector("#vaciar-carrito").addEventListener("click", vaciarPresupuesto);

document.querySelector("#finalizar-compra").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire("Presupuesto vacío", "Agregá materiales primero", "warning");
        return;
    }
    Swal.fire({
        title: '¿Confirmar pedido?',
        text: `Total: $${document.querySelector("#precio-total").innerText}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('¡Éxito!', 'Presupuesto enviado.', 'success');
            vaciarPresupuesto();
            modal.classList.add("modal-hidden");
        }
    });
});

iniciarApp();
actualizarContador();