const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        if (tareas.length === 0) return [];
        tareas.forEach((tar) => {
            this._listado[tar.id] = tar;
        });
    }

    get getListadoArr() {
        // Devolver objeto _listado como un array
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    listadoCompleto() {
        let obj;
        Object.keys(this._listado).forEach((key, idx) => {
            obj = this._listado[key];
            console.log(
                `${(++idx + ".").green} ${obj.desc} :: ${
          obj.completadoEn ? obj.completadoEn.green : "Pendiente".red
        }`
            );
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let obj, j = 0;
        if (completadas) {
            //Listar solo tareas completadas
            Object.keys(this._listado).forEach(key => {
                obj = this._listado[key];
                if (obj.completadoEn) {
                    console.log(
                        `${(++j + ".").green} ${obj.desc} :: ${obj.completadoEn.green}`
                    );
                }
            });
        } else {
            //Listar solo tareas pendientes
            Object.keys(this._listado).forEach(key => {
                obj = this._listado[key];
                if (!obj.completadoEn) {
                    console.log(
                        `${(++j + ".").green} ${obj.desc} :: ${"Pendiente".red}`
                    );
                }
            });
        }
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.getListadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;