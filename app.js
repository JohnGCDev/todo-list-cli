const { guardarDB, leerDB } = require("./helpers/gestorArchivo");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCompletar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");

const main = async() => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        // Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1": // Crear tarea
                const desc = await leerInput("Descripción:");
                tareas.crearTarea(desc);
                break;
            case "2": // Listar tareas
                tareas.listadoCompleto();
                break;
            case "3": // Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case "4": // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5": // Completar tarea(s)
                const ids = await listadoTareasCompletar(tareas.getListadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case "6": // Borrar tareas
                const id = await listadoTareasBorrar(tareas.getListadoArr);
                if (id !== "0") {
                    const borrarConfirmacion = await confirmar(
                        "¿Está seguro que desea borrar esta tarea?"
                    );
                    if (borrarConfirmacion) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
            default:
                break;
        }
        guardarDB(tareas.getListadoArr);
        await pausa();
    } while (opt !== "0");
};

main();