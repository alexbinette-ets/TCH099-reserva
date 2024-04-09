const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

//?ligne qui donne erreur const fetch = require('node-fetch');


//GET infos date du jour
router.get('/date', (req, res) => {
  const dateActuelle = new Date();
  //Les mois commencent à 0
  const numMois = dateActuelle.getMonth() + 1;
  const annee = dateActuelle.getFullYear();
  const jour = dateActuelle.getDate();

  //mois en string
  const options = { month: 'long' };
  const nomMois = dateActuelle.toLocaleDateString('fr-FR', options);
  const infosDateActuelleJSON =
  {
    jour,
    numMois,
    annee,
    nomMois
  }
  res.json(infosDateActuelleJSON);
});


//GET calendrier
router.get('/calendrier', async (req, res) => {
  try {
    //changer url ici
    const response = await fetch('http://localhost:5000/api/employe/date');
    const data = await response.json();
    const { numMois, annee, nomMois } = data;

    //calcul nb jours
    let nbJours;
    if (numMois === 2) {
      nbJours = (annee % 4 === 0 && (annee % 100 !== 0 || annee % 400 === 0)) ? 29 : 28;
    } else if (['1', '3', '5', '7', '8', '10', '12'].includes(numMois)) {
      nbJours = 31;
    } else {
      nbJours = 30;
    }
    const infosDateCalendrierJSON = {
      numMois,
      annee,
      nomMois,
      nbJours
    }
    res.json(infosDateCalendrierJSON);
  }
  catch (erreur) {
    console.error(erreur);
    res.status(500).json({ mssg: "Erreur récupération données" });
  }
});


//GET liste reservation de la journee
router.get('/dayreservations/:annee/:numMois/:jour', async (req, res) => {
  const annee = parseInt(req.params.annee);
  const numMois = parseInt(req.params.numMois);
  const jour = parseInt(req.params.jour);




  const dateString = `${annee.toString()}-${numMois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`;
  const date = new Date(dateString);
  console.log(date);

  //si je le met plus loin ca veut pas
  const reservationsDuJour = [];
  try {
    const collectionDisponibilite = req.app.locals.db.collection("Disponibilite");
    const collectionReservation = req.app.locals.db.collection("Reservation");
    const collectionTable = req.app.locals.db.collection("Table");
    const collectionSection = req.app.locals.db.collection("Section");
    const collectionClient = req.app.locals.db.collection("Client");
    const collectionServeur = req.app.locals.db.collection("Serveur");


    const disponibilites = await collectionDisponibilite.find({
      timestamp_debut: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    }).toArray();
    console.log("Disponibilités trouvées :", disponibilites);

    if (disponibilites.length === 0) {
      return res.status(404).json({ message: "Aucune disponibilité trouvée pour la date spécifiée" });
    }

    let reservationDetails = {};
    let tableDetails = {};
    let sectionDetails = {};
    let clientDetails = {};
    let serveursDetails = {};

    for (const disponibilite of disponibilites) {
      const { _id, timestamp_debut, timestamp_fin } = disponibilite;
      console.log("ID DISPONIBILITÉ TROUVÉE : " + disponibilite._id);

      const reservation = await collectionReservation.findOne({
        dispo_id: disponibilite._id
      });

      if (reservation) {
        console.log("Reservation trouvée pour cette disponibilite")
        reservationDetails = {
          numero_res: reservation.numero_res,
          nb_sieges: reservation.nb_sieges,
          specification: reservation.specification

        };
      } else {
        console.log("Aucune réservation trouvée pour cette disponibilité");
        continue;
      }
      const { numero_res, nb_sieges, specification } = reservationDetails;


      let tableCorrespondante = null;
      const tables = await collectionTable.find({}).toArray();
      for (const table of tables) {
        const dispoIdFields = Object.keys(table).filter(field => field.startsWith('dispo') && field.endsWith('_id'));
        console.log(dispoIdFields);

        for (const numDispoId of dispoIdFields) {
          const valeurDispoId = table[numDispoId];
          const disponibiliteIdString = disponibilite._id.toString();
          const valeurDispoIdString = valeurDispoId.toString();
          if (valeurDispoIdString === disponibiliteIdString) {
            tableCorrespondante = table;
            break;
          }
        }
      }

      const table = tableCorrespondante;
      console.log("table correspondante: " + tableCorrespondante);

      if (table) {
        tableDetails = {
          numero_table: table.numero_table
        };
      }
      else {
        console.log("ERREUR : Aucune table trouvée pour cette disponibilité");
        continue;
      }
      const { numero_table } = tableDetails;


      const section = await collectionSection.findOne({ _id: table.section_id });
      if (section) {
        const serveursIds = [];
        for (let i = 1; section[`serveur${i}_id`]; i++) {
          serveursIds.push(section[`serveur${i}_id`]);
        }
        sectionDetails = {
          nom: section.nom,
          type: section.type,
          serveursIds: serveursIds
        };
      }
      else {
        console.log("ERREUR : Aucune section trouvée pour cette disponibilité");
        continue;
      }
      const { nom: nom_section, type: type_section } = sectionDetails;

      //Récupération des infos du serveurs pour afficher + highlight, manque gestion cas erreurs NULL
      const serveurs = await collectionServeur.find({}).toArray();

      //Infos sur les serveurs, code optimisable avec les cas d'Erreurs précis + mettre les autres infos section dans ce bloc
      //on veut match reservation server_id avec _id de server
      for (const serveur of serveurs) {
        if (serveur._id.equals(reservation.serveur_id)) {
          serveursDetails = {
            prenom_serveur: serveur.prenom_serveur,
            serveur_id: serveur._id
          };
          break;
        }
        else {  
          console.log("Ce serveur n'est pas dans la réservation : " + serveur);
          continue;
        }
      }
      if (!serveursDetails) {
        console.log("ERREUR : Aucune serveur trouvé pour cette reservation");        
      }

      const client = await collectionClient.findOne({ _id: reservation.client_id });
      if (client) {
        clientDetails = {
          prenom_client: client.prenom_client,
          nom_client: client.nom_client,
          telephone: client.telephone
        };
      }
      else {
        console.log("ERREUR : Aucune client trouvée pour cette disponibilité");
        continue;
      }
      const { prenom_client, nom_client, telephone } = clientDetails;



      reservationsDuJour.push({
        date: new Date(timestamp_debut).toLocaleDateString(),
        heure_debut: new Date(timestamp_debut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        heure_fin: new Date(timestamp_fin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        numero_res,
        numero_table,
        nb_sieges,
        specification,
        nom_section,
        type_section,
        serveursDetails,
        prenom_client,
        nom_client,
        telephone,
      });
    }

  }

  catch (error) {
    console.error("Erreur lors de la requete!:", error);
    res.status(500).json({ error: "Erreur lors de la requete!" })
  };
  res.json(reservationsDuJour);
});

//GET nom serveur pour affichage calendrier
router.get('/nomEmploye/:id', async (req, res) => {

  const collectionServeur = req.app.locals.db.collection("Serveur");
  const serveur_id = req.params.id;
  try {
    const serveur = await collectionServeur.findOne({_id: new ObjectId(serveur_id)});
    if (serveur) {
      res.json(serveur.prenom_serveur);
    } else {
      res.status(404).json({ message: "Serveur non trouvé" });
    }
  }
  catch (error) {
    console.error("Erreur lors de la requete!:", error);
    res.status(500).json({ error: "Erreur lors de la requete!" })
  }
});


//GET test
router.get('/test', (req, res) => {
  res.json({ mssg: 'Route de test fonctionnelleAYAY !' });
});

router.post('/auth', async (req,res) =>{
try {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(`Username:${username}`);  
  console.log(`Password:${password}`);  

  const user = await req.app.locals.db.collection("Serveur").findOne({
  prenom_serveur : username,
  password: password
  });
  console.log(user); 
  if (user) {

      // Return an "OK" response
      res.status(200).send(user);
  }
  else {
      // Return an error response
      res.status(401).send('username ou mot de passe erroné');
    }
  }
catch(err) {
    // Handle any errors that occurred
    console.error(err);
    res.status(500).send('Erreur serveur interne');

  }

}) 

module.exports = router
