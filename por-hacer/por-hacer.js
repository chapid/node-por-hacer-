const fs = require('fs');

let listadoPorHacer = [];
const guardarDB = () => {
        let data = JSON.stringify(listadoPorHacer);
        fs.writeFile(`./db/data.json`, data, (err) => {
            if (err) throw new Error('No se pudo grabar', err)
            else
                console.log('data insertada');
        });
    }
    /**
     * cargar en el JSON
     */
const cargarDB = () => {
        try {
            listadoPorHacer = require('../db/data.json');
        } catch (error) {
            listadoPorHacer = [];
        }
    }
    /**
     * crear
     */
const crear = (descripcion) => {
        cargarDB();
        let porHacer = {
            descripcion,
            completado: false
        };
        listadoPorHacer.push(porHacer);
        guardarDB();
        return porHacer;
    }
    /**
     * actualizar
     */
const actualizar = (descripcion, completado = true) => {
        cargarDB();
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        if (index >= 0) {
            listadoPorHacer[index].completado = completado;
            guardarDB();
            return true;
        } else {
            return false;
        }
    }
    /**
     * Listar
     */
const getListado = () => {
        cargarDB();
        return listadoPorHacer;
    }
    /**
     * Borrar
     */
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}