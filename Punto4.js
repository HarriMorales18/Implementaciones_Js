const readline = require("readline");

const IVA = 0.19;

function registrarVentas() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta, respuesta => resolve(respuesta)));
  }

  (async function() {
    const productos = [];
    while (true) {
      const precioStr = await preguntar("Ingrese el precio del producto: ");
      const precio = Number(precioStr);
      if (isNaN(precio) || precio <= 0) {
        console.log("Precio inválido. Ingrese un valor positivo.");
        continue;
      }
      const cantidadStr = await preguntar("Ingrese la cantidad de unidades: ");
      const cantidad = Number(cantidadStr);
      if (isNaN(cantidad) || cantidad <= 0) {
        console.log("Cantidad inválida. Ingrese un valor positivo.");
        continue;
      }
      const total = precio * cantidad;
      productos.push({ precio, cantidad, total });
      const continuar = await preguntar("¿Desea ingresar otro producto? (s/n): ");
      if (continuar.toLowerCase() !== "s") break;
    }

    const subtotal = productos.reduce((acc, p) => acc + p.total, 0);
    const valorIVA = subtotal * IVA;
    const totalPagar = subtotal + valorIVA;

    console.log("\n=== RESULTADOS ===");
    console.log("Subtotal:", subtotal.toFixed(2));
    console.log("IVA (19%):", valorIVA.toFixed(2));
    console.log("Total a pagar:", totalPagar.toFixed(2));

    rl.close();
  })();
}

registrarVentas();
