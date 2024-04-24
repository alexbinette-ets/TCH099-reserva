const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const fs = require('fs');

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



router.delete('/deletejourneepassee/:date', async (req, res) => {
  const date = new Date(req.params.date);
  try {

    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "La date fournie est invalide." });
  }
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      

      const collectionSections = req.app.locals.db.collection("Sections");
      const result = await collectionSections.updateMany(
          {
              "tables.Disponibilites.timestamp_debut": {
                  $gte: startOfDay,
                  $lte: endOfDay
              }
          },
          {
              $pull: {
                  "tables.$[].Disponibilites": {
                      timestamp_debut: { $gte: startOfDay, $lte: endOfDay }
                  }
              }
          }
      );

      console.log(`${result.modifiedCount} disponibilités supprimées pour le ${date}.`);
      res.status(200).send(`${result.modifiedCount} disponibilités supprimées pour le ${date}.`);
  } catch (error) {
      console.error('Erreur lors de la suppression des disponibilités :', error);
      res.status(500).send('Une erreur est survenue lors de la suppression des disponibilités.');
  }
});







//ADD DES DISPOS POUR UNE JOURNÉE 
router.post('/disponibilites/:date', async (req, res) => {
  try {
      const dateParam = req.params.date;
      const date = new Date(dateParam);

      if (isNaN(date.getTime())) {
          return res.status(400).json({ message: "La date fournie est invalide." });
      }

      const db = req.app.locals.db;
      const sectionsCollection = db.collection('Sections');
      const sections = await sectionsCollection.find({}).toArray();

      sections.forEach(section => {
          section.tables.forEach(table => {
              for (let heure = 18; heure < 22; heure++) {
                  const timestampDebut = new Date(date.getFullYear(), date.getMonth(), date.getDate(), heure);
                  const timestampFin = new Date(timestampDebut.getTime() + (60 * 60 * 1000)); // Ajoute une heure

                  table.Disponibilites.push({
                      timestamp_debut: timestampDebut,
                      timestamp_fin: timestampFin,
                      Reservation: {} 
                  });
              }
          });
      });

      await Promise.all(sections.map(section =>
          sectionsCollection.updateOne(
              { _id: section._id },
              { $set: { tables: section.tables } }
          )
      ));

      res.status(201).json({ message: "Disponibilités ajoutées avec succès pour la date " + date.toDateString() });
  } catch (error) {
      console.error("Erreur lors de l'ajout des disponibilités :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router