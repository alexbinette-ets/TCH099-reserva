const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

//ROUTE GET TOUTE LA BD
router.get('/wholebd', async (req, res) => {
  const db = req.app.locals.db;
  const collections = await db.listCollections().toArray();
  let reponseJSON = [];

  for (let collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`Documents de la collection '${collectionName}':`);

      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();
      reponseJSON.push(documents);
      //console.log(documents);
      //console.log("\n");
  }
  res.json(reponseJSON);
});



module.exports = router