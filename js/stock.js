// --- 1. FUNCIÓN ASÍNCRONA ---
// Use async/await para obtener los productos del JSON 
const obtenerProductos = async () => {
    try {
        const response = await fetch("./data/productos.json"); 
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error("Error al cargar productos", error); 
    }
};