//const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



// exports.redirFun = functions.https.onRequest((request, response)=>{
//     response.redirect('https:www.pepcoding.com');
// })

// exports.syHello = functions.https.onCall((data, context)=>{
//   return  'hello user' ;
// })



const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

//var serviceAccount = require("./permissions.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://fir-api-9a206.firebaseio.com"
// });

var firebaseConfig = {
  apiKey: "AIzaSyBYW-lIUCPsZM4iEp00Qvntx3Npx0DXVIo",
  authDomain: "pep-resume-builder-api-7717c.firebaseapp.com",
  databaseURL: "https://pep-resume-builder-api-7717c.firebaseio.com",
  projectId: "pep-resume-builder-api-7717c",
  storageBucket: "pep-resume-builder-api-7717c.appspot.com",
  messiagingSenderId: "864552475907",
  appId: "1:864552475907:web:b24f60006862ac43289d36",
  measurementId: "G-VDHJJE262G"
};

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

exports.sayWorld = functions.https.onRequest((request, response) => {
  response.send('hello dgt reter');
});


// exports.syHello = functions.https.onCall((data, context)=>{
//   return  'hello user' ;
// })

app.get('/hello',(req, res) => {
  res.send("hello1")
});

app.post('/api/data/get', (req, res) => {
  (async () => {
      try {
          await db.collection('resumes').doc('/' + req.body.id + '/').create({item: req.body.item});
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
    })();
});


// create
app.post('/api/document', (req, res) => {
    (async () => {
        try {
            await db.collection('resumes').doc('/' + req.body.id + '/').create({item: req.body.item});
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// read item
app.get('/api/document/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('resumes').doc(req.params.id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// read all
app.get('/api/documents', (req, res) => {
    (async () => {
        try {
            let query = db.collection('resumes');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        item: doc.data().item
                    };
                    response.push(selectedItem);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// update
app.put('/api/document/:id', (req, res) => {
(async () => {
    try {
        const document = db.collection('resumes').doc(req.params.id);
        await document.update({
            item: req.body.item
        });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

// delete
app.delete('/api/document/:id', (req, res) => {
(async () => {
    try {
        const document = db.collection('document').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

exports.app = functions.https.onRequest(app);