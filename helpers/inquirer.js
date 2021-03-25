const inquirer = require("inquirer");
require("colors");

const menuOpts = [{
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [{
            value: "1",
            name: `${"1.".green} Crear tarea`,
        },
        {
            value: "2",
            name: `${"2.".green} Listar tareas`,
        },
        {
            value: "3",
            name: `${"3.".green} Listar tareas completadas`,
        },
        {
            value: "4",
            name: `${"4.".green} Listar tareas pendientes`,
        },
        {
            value: "5",
            name: `${"5.".green} Completar tarea(s)`,
        },
        {
            value: "6",
            name: `${"6.".green} Borrar tarea`,
        },
        {
            value: "0",
            name: `${"0.".green} Salir`,
        },
    ],
}, ];

const inputEnter = [{
    type: "input",
    name: "enter",
    message: `Pulse ${"ENTER".green} para continuar`,
}, ];

const inquirerMenu = async() => {
    console.clear();
    console.log("=====================================".green);
    console.log("      Selecccione una opción".white);
    console.log("=====================================\n".green);

    const { opcion } = await inquirer.prompt(menuOpts);
    return opcion;
};

const pausa = async() => {
    console.log("\n");
    return await inquirer.prompt(inputEnter);
};

const leerInput = async(message) => {
    const question = [{
        type: "input",
        name: "desc",
        message,
        validate(value) {
            if (value.length === 0) {
                return "Por favor ingrese un valor";
            }
            return true;
        },
    }, ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const confirmar = async(message) => {
    const question = [{
        type: "confirm",
        name: "ok",
        message,
    }, ];
    const { ok } = await inquirer.prompt(question);
    return ok;
};

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tar, idx) => {
        return {
            value: tar.id,
            name: `${(++idx + ".").green} ${tar.desc}`,
        };
    });
    choices.unshift({
        value: "0",
        name: `${"0.".green} Cancelar`,
    });

    const tereasOpc = [{
        type: "list",
        name: "tareaID",
        message: "Seleccione la tarea a borrar",
        choices,
    }, ];
    const { tareaID } = await inquirer.prompt(tereasOpc);
    return tareaID;
};

const listadoTareasCompletar = async(tareas = []) => {
    const choices = tareas.map((tar, idx) => {
        return {
            value: tar.id,
            name: `${(++idx + ".").green} ${tar.desc}`,
            checked: tar.completadoEn,
        };
    });
    const tereasOpc = [{
        type: "checkbox",
        name: "ids",
        message: "Seleccione la(s) tarea(s) a completar",
        choices,
    }, ];
    const { ids } = await inquirer.prompt(tereasOpc);
    return ids;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    confirmar,
    listadoTareasBorrar,
    listadoTareasCompletar,
};