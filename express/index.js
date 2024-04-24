const express = require("express");
const routesEmploye = require(__dirname + '/routes/routesEmploye.js');
const routesClients = require(__dirname + '/routes/routesClients.js');
const routesAdmin = require(__dirname + '/routes/routesAdmin.js');

const app = express();
const cors = require('cors');
const CONFIG = require("./utils/config.js");

app.use(cors({
  origin: '*'
}));

const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(CONFIG.DB_URL,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("ReservationRestaurantTest").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.locals.db = client.db("ReservationRestaurantTest");
    app.listen(5000, function () {
      console.log("Express écoute sur le port 5000!");
     });
      } 
     catch (err) {
      console.log("MongoDB connection unsuccessful, retry after 2 seconds.", err);
      setTimeout(connectWithRetry, 2000);
  }
}

/*code que jai enleve
finally {
    // Ensures that the client will close when you finish/error
    await client.close();*/

//on run la connection DB
run().catch(console.dir);
//middleware quon va utiliser plus tard pour authentification
app.use(express.json());
app.use((req,res,next) => {
  console.log(req.path,req.method)
  next()
  })

  //Insertion des scripts dans index.js
  /*const updateProcess = spawn('node', ['updateScript.js']);

  updateProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  updateProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  updateProcess.on('close', (code) => {
    console.log(`Le processus de mise à jour s'est terminé avec le code ${code}`);
  });
*/



//on attend que express ferme pour fermer la connection à DB
process.on('SIGINT', async () => {
  try {
    // Fermez la connexion MongoDB lorsque l'application se termine
    await client.close();
    console.log('Connexion à MongoDB fermée.');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la fermeture de la connexion à MongoDB:', error);
    process.exit(1);
  }});


//routes
app.use('/api/employe', routesEmploye);
app.use('/api/client', routesClients);
app.use('/api/admin', routesAdmin);


app.get('/', function(req, res) {
  res.send('hello world');
});

module.exports = { app, client };
