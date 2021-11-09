const functions = require('firebase-functions');
const admin = require("firebase-admin")
const cors = require('cors')({origin: true});
admin.initializeApp(); // needed to initialize the admin sdk
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// })
const webScrapping = require("./fetchVocabs.js");//inside it uses a callback to wait for node-fetch to load since it doesnt support commonjs require

exports.getVocab = functions.runWith({ timeoutSeconds: 30, memory: "1GB" })
    .https.onRequest( (req, res) => {
        cors(req, res, () => {
            var fetchedVocabs = null;
            console.log( req.query);
            webScrapping(req.query.vocabs).then(function(vocabs){
     
    
       
                
                res.send(JSON.stringify(vocabs,null,' ')+"this is with COR AND more headers");
                
            });
        })
       

        // TODO persist the promotions

        // the JSON array is the body of the https response
    });
 