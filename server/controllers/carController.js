const mysql = require('mysql2/promise');

const BDO = require('../config/configdb');
const datacns = require('../config/datamysql');


exports.getCars = async (req, res) => {
    sql = "obtenerVehiculos();";
    try {
        let result = await BDO.query(sql)
        if (result[0].length > 0) {
            return res.status(200).json(
                {
                    status : true,
                    message : 'autos obtenidos',
                    data : result[0]
                }
            );
        } else {
            return res.status(404).json(
                {
                    status : false,
                    message : 'error al obtener datos',
                    error : {}
                }
            );      
        } 
    }catch (err) {
        console.log(err);
        res.status(404).json(
            {
                status : false,
                message : 'Error',
                error : {err}
            }
        );
    }
}

exports.getBy = async (req, res) => {
    let id = req.id
    let filter = req.filter

    sql = "obtenerVehiculosBy(?,?);";
    try {
        let result = await BDO.query(sql, filter, id)
        if (result[0].length > 0) {
            return res.status(200).json(
                {
                    status : true,
                    message : 'autos obtenidos',
                    data : result[0]
                }
            );
        } else {
            return res.status(404).json(
                {
                    status : false,
                    message : 'error al obtener datos',
                    error : {}
                }
            );      
        } 
    }catch (err) {
        console.log(err);
        res.status(404).json(
            {
                status : false,
                message : 'Error',
                error : {err}
            }
        );
    }
}

exports.newCar = async (req, res) => {
    const { placa, marca, modelo, capacidad, ubicacion, depreciacion, carga } = req.body;
    sql = "crearVehiculo(?,?,?,?,?,?,?);";
    try {
        let result = await BDO.query(sql,[placa, marca, modelo, capacidad, ubicacion, depreciacion, carga])
        if (result[0].length > 0) {
            return res.status(200).json(
                {
                    status : true,
                    message : 'auto creado',
                    data : result[0]
                }
            );
        } else {
            return res.status(404).json(
                {
                    status : false,
                    message : 'error al obtener datos',
                    error : {}
                }
            );      
        } 
    }catch (err) {
        console.log(err);
        res.status(404).json(
            {
                status : false,
                message : 'Error',
                error : {err}
            }
        );
    }
}

exports.setCar = async (req, res) => {
    const { placa, marca, modelo, capacidad, ubicacion, depreciacion, carga } = req.body;
    sql = "editarVehiculo(?,?,?,?,?,?,?);";
    try {
        let result = await BDO.query(sql,[placa, marca, modelo, capacidad, ubicacion, depreciacion, carga])
        if (result[0].length > 0) {
            return res.status(200).json(
                {
                    status : true,
                    message : 'autos obtenidos',
                    data : result[0]
                }
            );
        } else {
            return res.status(404).json(
                {
                    status : false,
                    message : 'error al obtener datos',
                    error : {}
                }
            );      
        } 
    }catch (err) {
        console.log(err);
        res.status(404).json(
            {
                status : false,
                message : 'Error',
                error : {err}
            }
        );
    }

}

exports.deleteCar = async (req, res) => {
    let id = req.id

    sql = "elilminarVehiculo(?);";
    try {
        let result = await BDO.query(sql, id)
        if (result[0].length > 0) {
            return res.status(200).json(
                {
                    status : true,
                    message : 'autos obtenidos',
                    data : result[0]
                }
            );
        } else {
            return res.status(404).json(
                {
                    status : false,
                    message : 'error al obtener datos',
                    error : {}
                }
            );      
        } 
    }catch (err) {
        console.log(err);
        res.status(404).json(
            {
                status : false,
                message : 'Error',
                error : {err}
            }
        );
    }
}

