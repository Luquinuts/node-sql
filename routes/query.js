var express = require('express');
var router = express.Router();
var SQL = require('../database/connection.js');

const MariaDB = new SQL;

router.get('/a', function(req, res, next) {
    MariaDB.setQuery('SELECT * FROM Clientes WHERE Peso > 90 AND Altura> 1.90 ')
    MariaDB.executeQuery((err, result)=> {
        res.
        render('querys/clientList', 
        {data: result, filteredBy: 'Peso 90 y Altura 1.90'});
    })
});

router.get('/b', function(req, res, next) {
    MariaDB.setQuery("SELECT * FROM Clientes WHERE CodPostal <> 7600 AND Email LIKE '%gmail%'")
    MariaDB.executeQuery((err, result)=> {
        res.
        render('querys/clientList', 
        {data: result, filteredBy: 'No MDP y Gmail'});
    })
});

router.get('/c', function(req, res, next) {
    MariaDB.setQuery('SELECT AVG(`Altura`) as "Promedio" FROM `Clientes`')
    MariaDB.executeQuery((err, result)=> {
        console.log(result)
        res.
        render('querys/clientProm', 
        {data: result[0], filteredBy: 'Promedio Altura'});
    })
});

router.get('/d', function(req, res, next) {
    MariaDB.setQuery('SELECT AVG(`Peso`) as "Promedio" FROM `Clientes`')
    MariaDB.executeQuery((err, result)=> {
        res.
        render('querys/clientProm', 
        {data: result[0], filteredBy: 'Promedio Peso'});
    })
});

router.get('/e', function(req, res, next) {
    MariaDB.setQuery('SELECT TIMESTAMPDIFF(YEAR, MAX(`FechaNacimento`), NOW()) as Promedio FROM `Clientes`')
    MariaDB.executeQuery((err, result)=> {
        res.
        render('querys/clientProm', 
        {data: result[0], filteredBy: 'Cliente mas Joven (años)'});
    })
});

router.get('/f', function(req, res, next) {
    MariaDB.setQuery('UPDATE Clientes SET FechaNacimiento=1972-04-04 WHERE IdClientes = 35')
    MariaDB.executeQuery((err, result)=> {
        res.redirect('/client/read');
    })
});

router.get('/g', function(req, res, next) {
    MariaDB.setQuery('UPDATE Clientes SET Movil02=223445545 WHERE IdClientes = 1')
    MariaDB.executeQuery((err, result)=> {
        res.redirect('/client/read');
    })
});

router.get('/h', function(req, res, next) {
    MariaDB.setQuery('UPDATE Clientes SET Altura=1.80 WHERE IdClientes = 3')
    MariaDB.executeQuery((err, result)=> {
        res.redirect('/client/read');
    })
});


module.exports = router;