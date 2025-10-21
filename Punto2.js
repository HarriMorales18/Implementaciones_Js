const libros = [];

function agregarLibro(titulo, autor, año, isbn) {
    if (!titulo || !autor || isNaN(Number(año)) || !isbn) {
        console.log("Datos inválidos. Intente nuevamente.");
        return;
    }
    libros.push({ titulo, autor, año: Number(año), isbn });
    console.log(`Libro agregado: ${titulo}`);
}

function listarLibros() {
    if (libros.length === 0) {
        console.log("No hay libros registrados.");
        return;
    }
    console.log("\nListado de Libros:");
    libros.forEach((libro, i) => {
        console.log(`${i + 1}. ${libro.titulo} - ${libro.autor} (${libro.año}) | ISBN: ${libro.isbn}`);
    });
}

function buscarLibrosPorTituloOAutor(criterio) {
    if (!criterio) {
        console.log("Debe ingresar un criterio de búsqueda.");
        return;
    }
    const q = criterio.toLowerCase();
    const resultados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(q) ||
        libro.autor.toLowerCase().includes(q)
    );
    if (resultados.length === 0) {
        console.log(`No se encontraron libros con el criterio: "${criterio}"`);
    } else {
        console.log(`\nResultados de búsqueda para "${criterio}":`);
        resultados.forEach(l =>
            console.log(`${l.titulo} - ${l.autor} (${l.año}) | ISBN: ${l.isbn}`)
        );
    }
}

agregarLibro("Cien años de soledad", "Gabriel García Márquez", 1967, "1234567890");
agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes", 1605, "0987654321");
agregarLibro("Introducción a la programación", "Ana Pérez", 2020, "1122334455");
agregarLibro("El principito", "Antoine de Saint-Exupéry", 1943, "6677889900");
agregarLibro("Crónica de una muerte anunciada", "Gabriel García Márquez", 1981, "2233445566");

listarLibros();
buscarLibrosPorTituloOAutor("Gabriel");
buscarLibrosPorTituloOAutor("programación");
buscarLibrosPorTituloOAutor("fantasía");