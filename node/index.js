const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb"
};
const mysql = require("mysql");

app.use(bodyParser.json());

const connection = mysql.createConnection(config);

const sql = `INSERT into people(name) values ('Vinicius')`;
connection.query(sql);

app.get("/", (req, res) => {
    const sql = 'select name from people';
    connection.query(sql, (err, result) => {
        if (err) res.send(err);
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${result.map(people => `<li>${people.name}</li>`)}
            </ul>
        `);
    });
    
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
});

process.on('SIGINT', () => {
    connection.end();
});

process.on('SIGTERM', () => {
    connection.end();
});