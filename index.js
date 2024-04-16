import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require("express");
const app = express();

// Configuración de CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Permite cualquier origen. En produccion colocar asi: res.header("Access-Control-Allow-Origin", "http://tu-dominio.com"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var admin = require('firebase-admin')
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://manual-do-tecnico-ce164-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.get('/cond/list', (req, res) => { listar(req, res,'/conducao') });
app.get('/cod/list', (req, res) => { listar(req, res,'/codigos') });
app.get('/esque/list', (req, res) => { listar(req, res,'/esquemas') });
app.get('/loja/list', (req, res) => { listar(req, res,'/loja') });
app.get('/aulas/list', (req, res) => { listar(req, res,'/aula') });

app.get('/softwares/list', (req, res) => {
 return res.send("Sofwares");
});

app.get('/suporte', (req, res) => {
 return res.send("Suporte");
});

app.get('/feedback', (req, res) => {
 return res.send("Feedback");
});

app.get('/consimei', (req, res) => {
 return res.send("Consultar Imei");
});

app.get('/ferramentas/list', (req, res) => {
 return res.send("Ferramentas FRP");
});

app.get('/', (req, res) => {
 return res.send("Principal");
});


function listar(req, res, Tabla){
  const ref = db.ref(Tabla);

  ref.once('value', (snapshot) => {
    console.log(snapshot.val());
    return res.send(snapshot.val());
  });
}

// Inicia el servidor

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

/*
// Crea un nuevo registro
function createRecord(req, res) {
  const newRecord = db.ref().child('records').push();
  newRecord.set({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    date: admin.database.ServerValue.TIMESTAMP,
  });
  res.send('Registro creado con éxito');
}

// Lee un registro existente
function readRecord(req, res) {
  const recordRef = db.ref(`records/${req.params.id}`);
  recordRef.once('value', (snapshot) => {
    const record = snapshot.val();
    res.send(record);
  });
}

// Actualiza un registro existente
function updateRecord(req, res) {
  const recordRef = db.ref(`records/${req.params.id}`);
  recordRef.update({
    title: req.body.title,
    body: req.body.body,
  });
  res.send('Registro actualizado con éxito');
}

// Elimina un registro existente
function deleteRecord(req, res) {
  const recordRef = db.ref(`records/${req.params.id}`);
  recordRef.remove();
  res.send('Registro eliminado con éxito');
}

// Configura las rutas
const app = express();
app.use(express.json());
app.post('/records', createRecord);
app.get('/records/:id', readRecord);
app.put('/records/:id', updateRecord);
app.delete('/records/:id', deleteRecord);

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

*/
