const estudiantes = [
    {
        cedula: "0951234567",
        apellidos: "García Pérez",
        nombres: "María José",
        programaAcademico: "Ingeniería en Sistemas",
        materias:["Algoritmo","Cálculo","Ingles"],
        promedioNota: 8.75
    },
    {
        cedula: "0987654321",
        apellidos: "Martínez López",
        nombres: "Carlos Andrés",
        programaAcademico: "Medicina",
        materias:["Química","Biología","Ingles"],
        promedioNota: 9.10
    },
    {
        cedula: "0912345678",
        apellidos: "Rodríguez Sánchez",
        nombres: "Ana Lucía",
        programaAcademico: "Derecho",
        materias:["Humanidades","Procesal","Ingles"],
        promedioNota: 8.95
    },
    {
        cedula: "0976543210",
        apellidos: "Torres Zambrano",
        nombres: "Diego Alejandro",
        programaAcademico: "Arquitectura",
        materias:["Diseño","Cálculo","Ingles"],
        promedioNota: 8.50
    },
    {
        cedula: "0998765432",
        apellidos: "Vera Castillo",
        nombres: "Sofía Valentina",
        programaAcademico: "Psicología",
        materias:["Psicología","Sociales","Humanidades"],
        promedioNota: 9.25
    }
];

const prompt = require('prompt-sync')({sigint: true});

function addStudent() {
    const cedula = prompt("Ingrese la cedula: ");
    if (estudiantes.find(s => s.cedula === cedula)) {
        console.log("Ya existe un estudiante con esa cedula.");
        return;
    }
    const apellidos = prompt("Ingrese los apellidos: ");
    const nombres = prompt("Ingrese los nombres: ");
    const programa = prompt("Ingrese el programa academico: ");
    const materias = prompt("Ingrese las materias separadas por coma: ").split(",").map(m => m.trim());
    const promedio = parseFloat(prompt("Ingrese el promedio de notas: "));
    estudiantes.push({cedula, apellidos, nombres, programaAcademico: programa, materias, promedioNota: promedio});
    console.log(`Estudiante ${cedula} agregado.`);
}

function listStudents() {
    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }
    const copia = [...estudiantes].sort((a,b)=>a.apellidos.localeCompare(b.apellidos,'es'));
    copia.forEach(s => {
        console.log(`${s.apellidos}, ${s.nombres} - Cédula: ${s.cedula} - Programa: ${s.programaAcademico}`);
    });
}

function findByCedula() {
    const ced = prompt("Ingrese la cedula a buscar: ");
    const r = estudiantes.find(s => s.cedula === ced);
    if (!r) {
        console.log("No se encontró estudiante con esa cédula.");
        return;
    }
    console.log(r);
}

function updateStudent() {
    const ced = prompt("Ingrese la cedula del estudiante a actualizar: ");
    const idx = estudiantes.findIndex(s => s.cedula === ced);
    if (idx === -1) {
        console.log("Estudiante no encontrado.");
        return;
    }
    const s = estudiantes[idx];
    const ap = prompt(`Apellidos [${s.apellidos}]: `) || s.apellidos;
    const nm = prompt(`Nombres [${s.nombres}]: `) || s.nombres;
    const prog = prompt(`Programa Academico [${s.programaAcademico}]: `) || s.programaAcademico;
    const mats = prompt(`Materias (coma) [${s.materias.join(",")}]: `);
    const prom = prompt(`Promedio [${s.promedioNota}]: `);
    s.apellidos = ap;
    s.nombres = nm;
    s.programaAcademico = prog;
    if (mats.trim() !== "") s.materias = mats.split(",").map(m => m.trim());
    if (prom.trim() !== "") s.promedioNota = parseFloat(prom);
    console.log(`Estudiante ${ced} actualizado.`);
}

function removeStudent() {
    const ced = prompt("Ingrese la cedula del estudiante a eliminar: ");
    const idx = estudiantes.findIndex(s => s.cedula === ced);
    if (idx === -1) {
        console.log("No se encontró estudiante con esa cédula.");
        return;
    }
    estudiantes.splice(idx,1);
    console.log(`Estudiante ${ced} eliminado.`);
}

function mainMenu() {
    let running = true;
    while(running) {
        console.log("\n--- Menú ---");
        console.log("1) Agregar estudiante");
        console.log("2) Listar estudiantes");
        console.log("3) Buscar por cédula");
        console.log("4) Actualizar estudiante");
        console.log("5) Eliminar estudiante");
        console.log("6) Salir");
        const opt = prompt("Seleccione una opción: ");
        switch(opt) {
            case "1": addStudent(); break;
            case "2": listStudents(); break;
            case "3": findByCedula(); break;
            case "4": updateStudent(); break;
            case "5": removeStudent(); break;
            case "6": running = false; break;
            default: console.log("Opción inválida"); break;
        }
    }
}

mainMenu();
