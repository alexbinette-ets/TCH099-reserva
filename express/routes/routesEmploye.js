const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

//?ligne qui donne erreur const fetch = require('node-fetch');


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
    const collectionSection = req.app.locals.db.collection("Section");
    const collectionClient = req.app.locals.db.collection("Client");
    const collectionServeur = req.app.locals.db.collection("Serveur");


    const disponibilites = await collectionDisponibilite.find({
      timestamp_debut: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    }).toArray();
    //console.log("Disponibilités trouvées :", disponibilites);

    if (disponibilites.length === 0) {
      return res.status(404).json({ message: "Aucune disponibilité trouvée pour la date spécifiée" });
    }

    let reservationDetails = {};
    let sectionDetails = {};
    let clientDetails = {};
    let serveursDetails = {};

    for (const disponibilite of disponibilites) {
      const { _id, timestamp_debut, timestamp_fin } = disponibilite;
      //console.log("ID DISPONIBILITÉ TROUVÉE : " + disponibilite._id);

      const reservation = await collectionReservation.findOne({
        dispo_id: disponibilite._id
      });

      if (reservation) {
        //console.log("Reservation trouvée pour cette disponibilite")
        reservationDetails = {
          numero_res: reservation.numero_res,
          nb_sieges: reservation.nb_sieges,
          specification: reservation.specification

        };
      } else {
        //console.log("Aucune réservation trouvée pour cette disponibilité");
        continue;
      }
      const { numero_res, nb_sieges, specification } = reservationDetails;

//===============================================
//===============================================
//===============================================
//===============================================
let tableCorrespondante = null;

const sections = await collectionSection.find({}).toArray();
for (const section of sections) {
  const tables = section.tables;
  if (!tables) continue;
      for (const table of tables) {
        const dispoIdFields = Object.keys(table).filter(field => field.startsWith('dispo') && field.endsWith('_id'));
        //console.log(dispoIdFields);
        for (const numDispoId of dispoIdFields) {
          const valeurDispoId = table[numDispoId];
          const disponibiliteIdString = disponibilite._id.toString();
          const valeurDispoIdString = valeurDispoId.toString();
          if (valeurDispoIdString === disponibiliteIdString) {
            tableCorrespondante = table;
            if (section) {
              sectionDetails = {
                nom: section.nom,
                type: section.type,
              };
            }
            else {
              //console.log("ERREUR : Aucune section trouvée pour cette disponibilité");
              continue;
            }
            break;
          }
        }
      }
    }
      const { nom: nom_section, type: type_section } = sectionDetails;
      const table = tableCorrespondante;
      //console.log("table correspondante: " + tableCorrespondante);

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
//===============================================
//===============================================
//===============================================
//===============================================

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
          //console.log("Ce serveur n'est pas dans la réservation : " + serveur);
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
