const prompt = require('prompt-sync')({sigint:true});

const productos = [];

function agregarProducto() {
  const codigo = prompt("Código del producto: ").trim();
  if (!codigo) { console.log("Código inválido."); return; }
  if (productos.some(p => p.codigo === codigo)) { console.log("El código ya existe."); return; }
  const nombre = prompt("Nombre del producto: ").trim();
  if (!nombre) { console.log("Nombre inválido."); return; }
  const precioStr = prompt("Precio: ").trim();
  const precio = Number(precioStr);
  if (isNaN(precio) || precio <= 0) { console.log("Precio inválido."); return; }
  const stockStr = prompt("Stock (unidades): ").trim();
  const stock = Number(stockStr);
  if (!Number.isInteger(stock) || stock < 0) { console.log("Stock inválido."); return; }
  const estado = stock > 0 ? "Disponible" : "Agotado";
  productos.push({ codigo, nombre, precio, stock, estado });
  console.log("Producto agregado correctamente.");
}

function actualizarStock() {
  const codigo = prompt("Código del producto a actualizar: ").trim();
  const idx = productos.findIndex(p => p.codigo === codigo);
  if (idx === -1) { console.log("Producto no encontrado."); return; }
  const stockStr = prompt("Nuevo stock (unidades): ").trim();
  const stock = Number(stockStr);
  if (!Number.isInteger(stock) || stock < 0) { console.log("Stock inválido."); return; }
  productos[idx].stock = stock;
  productos[idx].estado = stock > 0 ? "Disponible" : "Agotado";
  console.log("Stock actualizado.");
}

function listarProductos() {
  if (productos.length === 0) { console.log("No hay productos registrados."); return; }
  const copia = [...productos].sort((a,b) => a.nombre.localeCompare(b.nombre,'es'));
  console.log("\nListado de productos:");
  copia.forEach(p => {
    console.log(`Código: ${p.codigo} | Nombre: ${p.nombre} | Precio: ${p.precio.toFixed(2)} | Stock: ${p.stock} | Estado: ${p.estado}`);
  });
}

function menu() {
  let continuar = true;
  while (continuar) {
    console.log("\n--- Gestión de Inventario ---");
    console.log("1) Agregar producto");
    console.log("2) Actualizar stock");
    console.log("3) Listar productos");
    console.log("4) Salir");
    const op = prompt("Seleccione una opción: ").trim();
    switch(op) {
      case "1": agregarProducto(); break;
      case "2": actualizarStock(); break;
      case "3": listarProductos(); break;
      case "4": continuar = false; break;
      default: console.log("Opción inválida."); break;
    }
  }
  console.log("Saliendo...");
}

menu();