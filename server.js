const express = require('express');
const app = express();

const MD5 = require('crypto-js/md5.js');

const port = process.env.PORT || 8383;
const {dbFirebase} = require('./firebase.js');
const {dbMysql} = require('./mysql.js');
const bodyParser = require('body-parser');

app.use(express.json());

let jsonParser = bodyParser.json();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/*  API ACCESSO TENDA   */

app.get('/accessoTenda', async (req, res) => {
    const utentiRef = dbFirebase.collection("utenti").doc("utente");
    const doc = await utentiRef.get();
    res.status(200).send(doc.data())
});
app.post('/aggiungiTenda', async (req, res) =>{
    const {username, pw} = req.body;
    const utentiRef = dbFirebase.collection("utenti").doc("utente");
    const res2 = await utentiRef.set({
        [username]: MD5(pw)
    }, {merge:true})
})

// /*  API GENERALI    */

// app.get("/accesso/:criterio/:valore", (req, res)=>{
//     dbMysql.connect();
//     const stringa = "SELECT credenziali_utente.pw, credenziali_utente.IdVolontarioPk  FROM credenziali_utente WHERE "+ req.params.criterio + "='"+req.params.valore+"'";
//     dbMysql.query(stringa, (err,result)=>{

//         if (err) {console.log(err)}
//         res.send(result);
//     });
//     dbMysql.end();
// })

// app.get("/stampaVolontario/:criterio/:valore", async(req, res)=>{
//     dbMysql.connect();
//     const stringa = "SELECT * FROM anagrafica_volontari WHERE "+ req.params.criterio + "='"+req.params.valore+"'";
//     dbMysql.query(stringa, (err,result)=>{

//         if (err) {console.log(err)}
//         else res.send(result);
//     });
//     dbMysql.end();
// })

// app.get("/stampaVolontari", (req, res)=>{
//     dbMysql.connect();
//     const stringa = "SELECT * FROM anagrafica_volontari";
//     dbMysql.query(stringa, (err,result)=>{
//         if (err) {console.log(err)}
//         res.send(result);
//     });
//     dbMysql.end();
// })

// app.delete("/eliminaVolontario/:criterio/:valore", (req, res)=>{
//     dbMysql.connect();
//     const stringa = "DELETE FROM anagrafica_volontari WHERE "+ req.params.criterio + "='"+req.params.valore+"'";
//     dbMysql.query(stringa, (err,result)=>{

//         if (err) {console.log(err)}
//         res.send(result);
//     });
//     dbMysql.end();
// })

// app.get('/credentials/:username/:password', (req, res) => {
//     dbMysql.connect();
//     const stringa = "select * from credenziali_utente where username = '" + req.params.username+"' and pw = '" + req.params.password+"'";
//     dbMysql.query(stringa, (err, result) => {
//         if (err) throw err
//         else res.send(result);
//     })
// //     dbMysql.end();
// // })

// /* API SCHEDATURA BENI */

// app.get('/letturaBene/:id', (req, res) => {
//     dbMysql.connect();
//     const stringa = "select * from beni_culturali where IdSchedaPk = '" + req.params.id+"'";
//     dbMysql.query(stringa, (err, result) => {
//         if (err) throw err
//         else res.send(result);
//     })
//     dbMysql.end();
// });

// app.post('/inserimentoBene/', jsonParser, (req, res) => {
//     dbMysql.connect();
//     const stringa = "insert into beni_culturali(data, luogo, nomeCaposquadra, nomeSchedatore, tipoOpera, descrizione, materiale, altezza, larghezza, profondità, note) VALUES('"+req.body.data+"','"+req.body.luogo+"','"+req.body.nomeResp+"','"+req.body.nomeSchedatore+"','"+req.body.tipoOpera+"','"+req.body.descrizione+"','"+req.body.materiale+"','"+req.body.altezza+"','"+req.body.larghezza+"','"+req.body.profondità+"','"+req.body.note+"')";
//     dbMysql.query(stringa, (err, result) => {
//         if (err) throw err
//         else res.send(result);
//     })
//     dbMysql.end();
// })


app.listen(port, ()=>{
    console.log('listening on port 8383');
})