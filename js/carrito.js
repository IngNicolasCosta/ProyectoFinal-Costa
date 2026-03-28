let carrito = JSON.parse(localStorage.getItem("carrito_corralon")) || [];

const agregarAlPresupuesto = (id, productos, cantidad) => {
    const item = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad += cantidad;  
    } else {
        carrito.push({ ...item, cantidad: cantidad }); 
    }

    guardarYRefrescar();
    
    Toastify({
        text: `${item.nombre} agregado (x${cantidad})`,
        duration: 2000,
        style: { background: "linear-gradient(to right, #2c3e50, #e67e22)" }
    }).showToast();
};

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter(p => p.id !== id); 
    guardarYRefrescar();
};

const cambiarCantidad = (id, valor) => {
    const producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += valor;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarYRefrescar();
        }
    }
};

const calcularTotal = () => {
    const subtotal = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0); 
    const iva = subtotal * 0.21; 
    const total = subtotal + iva;
    return { subtotal, iva, total };
};

const guardarYRefrescar = () => {
    localStorage.setItem("carrito_corralon", JSON.stringify(carrito)); 
    actualizarContador();
    renderizarCarrito();
};

const actualizarContador = () => {
    const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    const contador = document.querySelector("#contador-carrito");
    if(contador) contador.innerText = totalUnidades;
};

const limpiarDatosCarrito = () => {
    carrito = [];
    localStorage.removeItem("carrito_corralon"); 
    guardarYRefrescar(); 
};

const vaciarPresupuesto = () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "Presupuesto vacío",
            text: "No hay productos para eliminar del detalle.",
            icon: "info",
            confirmButtonColor: "#2c3e50"
        });
        return; 
    }
    Swal.fire({
        title: '¿Estás seguro de vaciar el presupuesto?',
        text: "Esta acción borrará todos los materiales seleccionados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c0392b',
        cancelButtonColor: '#2c3e50',
        confirmButtonText: 'Sí, vaciar todo',
        cancelButtonText: 'No, mantener'
    }).then((result) => {
        if (result.isConfirmed) {
            limpiarDatosCarrito();
            
            Swal.fire(
                '¡Borrado!',
                'Tu detalle de presupuesto ahora está vacío.',
                'success'
            );
        }
    });
};