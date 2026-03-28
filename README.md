# 🏗️ Corralón "El Ingeniero" - Simulador de Presupuestos

Este proyecto es un simulador de compras interactivo diseñado para facilitar la cotización de materiales de construcción. Desarrollado como proyecto final para el curso de JavaScript, aplica conceptos avanzados de manipulación del DOM, eventos y manejo de datos asincrónicos.

## 🚀 Funcionalidades Principales

* **Catálogo Dinámico:** Carga de productos desde un archivo `.json` utilizando `Fetch` y Promesas.
* **Filtrado Inteligente:** Los botones de categorías se generan automáticamente según los datos disponibles en el stock.
* **Gestión de Presupuesto:**
    * Agregar/Eliminar productos.
    * Control de cantidades (+/-) con actualización de subtotales en tiempo real.
    * Cálculo automático de IVA y Total.
* **Persistencia:** El carrito se guarda en el `LocalStorage`, permitiendo al usuario retomar su presupuesto en cualquier momento.
* **Interfaz Responsiva:** Diseño de dos columnas adaptado para dispositivos móviles y escritorio.
* **Feedback de Usuario:** Implementación de `SweetAlert2` para confirmaciones de vaciado de carrito y finalización de compra.

## 🛠️ Tecnologías Utilizadas

* **HTML5** & **CSS3** (Flexbox, Grid, Media Queries).
* **JavaScript Vanilla** (ES6+).
* **SweetAlert2** (Librería para alertas).
* **Google Fonts** (Tipografía Roboto).

## 📂 Estructura del Proyecto

* `/index.html`: Estructura principal del simulador.
* `/css/styles.css`: Estilos, layout de dos columnas y responsive.
* `/js/main.js`: Lógica principal, inicio de app y filtrado.
* `/js/carrito.js`: Lógica del presupuesto y manipulación del array.
* `/data/productos.json`: Base de datos local de materiales.
* `/img/`: Directorio de recursos visuales.

## 👤 Autor

* **Nicolás Costa** - *Estudiante de Ingeniería en Informática*

---
*Este proyecto fue realizado con fines educativos para la cursada de JavaScript en CoderHouse.*