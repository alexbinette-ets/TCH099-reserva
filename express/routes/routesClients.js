const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');









//----------------------------------------------------------------
//
//ROUTE GET COMMENTAIRES DES CLIENTS
router.get('/commentaires', async (req, res) => {

  let commentaires;
  try {
    const collectionCommentaire = req.app.locals.db.collection("Commentaire");

    commentaires = await collectionCommentaire.find({}).toArray();

    if (commentaires.length === 0) {
      return res.status(404).json({ message: "Aucune commentaire trouvé" });
    }
    else {
      console.log("Commentaires trouvés dans BD");
    }


  }
  catch (error) {
    console.error("Erreur lors de la requete!:", error);
    res.status(500).json({ error: "Erreur lors de la requete!" })
  };
  res.json(commentaires);
}
);
//----------------------------------------------------------------
//






//----------------------------------------------------------------
//
//POST COMMENTAIRES
router.post('/postCommentaire', async (req, res) => {

  try {
    const collectionCommentaire = req.app.locals.db.collection("Commentaire");
    const { cote, commentaire, prenom_client, nom_client } = req.body; 
    const nouvelID = new ObjectId();

const nouveauCommentaire = {
  _id: nouvelID,
  cote,
  commentaire,
  prenom_client,
  nom_client
};
    const result = await collectionCommentaire.insertOne(nouveauCommentaire);
    console.log("Commentaire insere avec dans base donnees :", result.insertedId);
    res.status(201).json({ message: "Commentaire Ajouté", commentaire: nouveauCommentaire });
  } catch (error) {
    console.error("Une erreur est survenue lors de l'insertion du commentaire :", error);
    res.status(500).json({ error: "Erreur lors de l'insertion du commentaire" });
  }
});
//----------------------------------------------------------------
//



//----------------------------------------------------------------
//
//GET DISPOS 2.0
router.get('/dayGetDispos2/:annee/:numMois/:jour/:section/:nbPers', async (req, res) => {
  const annee = parseInt(req.params.annee);
  const numMois = parseInt(req.params.numMois);
  const jour = parseInt(req.params.jour);
  const section = (req.params.section);
  const nbPersonnes = parseInt(req.params.nbPers);
  //faire un parse du bon string de la section ou id? mettre SM ou TER ! DONALD
  const dateString = `${annee.toString()}-${numMois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`;
  const date = new Date(dateString);
  //voir si rentre dans route ici.. 
  console.log(date);
  const gte = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const lt = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  //Tableau final qu'on va afficher
  let disposVidesDuJour = [];
  let disposToPushFinal = [];
  try {


    const collectionSections = req.app.locals.db.collection("Sections");
    const sections = await collectionSections.find({}).toArray();

    sections.forEach(section => {

      section.tables.forEach(table => {


        table.Disponibilites.forEach(disponibilite => {


          if (disponibilite.timestamp_debut >= gte && disponibilite.timestamp_debut < lt) {
            if (Object.keys(disponibilite.Reservation).length === 0) {
              console.log("disponibilite : " + disponibilite)
              disposToPushFinal.push(disponibilite)
            }
          }
        })
      })
    })
    for (const disponibilite of disposToPushFinal) {
      const timestamp_debut = disponibilite.timestamp_debut;
      const timestamp_fin = disponibilite.timestamp_fin;

      const date_timestamp_debut = new Date(timestamp_debut);
      const date_timestamp_fin = new Date(timestamp_fin)

      const heure_debut = date_timestamp_debut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const heure_fin = date_timestamp_fin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


      const plage_horaire = `${heure_debut}-${heure_fin}`;

      if (!disposVidesDuJour.includes(plage_horaire)) {
        disposVidesDuJour.push(plage_horaire);
      }
    }
    res.json(disposVidesDuJour);
  }
  catch (error) {
    console.error("Erreur lors de la requete!:", error);
    res.status(500).json({ error: "Erreur lors de la requete!" })
  };
}
);
//----------------------------------------------------------------
//






//----------------------------------------------------------------
//
//OLD (POUR MONTRER DIFFICULES) GET DISPO COTE CLIENT
router.get('/dayGetDispos/:annee/:numMois/:jour/:section/:nbPers', async (req, res) => {
  const annee = parseInt(req.params.annee);
  const numMois = parseInt(req.params.numMois);
  const jour = parseInt(req.params.jour);
  const section = (req.params.section);
  const nbPersonnes = parseInt(req.params.nbPers);
  //faire un parse du bon string de la section ou id? mettre SM ou TER ! DONALD
  const dateString = `${annee.toString()}-${numMois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`;
  const date = new Date(dateString);
  //voir si rentre dans route ici.. 
  console.log(date);

  //GET les dispos du jour pas de réservation, bonne section et bon nb personnes

  //Tableau final qu'on va afficher
  let disposVidesDuJour = [];
  let disposToPushFinal = [];
  try {
    const collectionDisponibilite = req.app.locals.db.collection("Disponibilite");
    const collectionReservation = req.app.locals.db.collection("Reservation");
    const collectionSection = req.app.locals.db.collection("Section");

    //GET tt les dispos de la date en parametres
    const disponibilites = await collectionDisponibilite.find({
      timestamp_debut: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    }).toArray();
    console.log("Disponibilités trouvées :");

    if (disponibilites.length === 0) {
      return res.status(404).json({ message: "Aucune disponibilité trouvée pour la date spécifiée" });
    }
    else {
      console.log("Disponibilités trouvées dans BD");
    }

    //On commence a filtrer les dispos de la journée


    const reservations = await collectionReservation.find({}).toArray(
    );

    //GET les dispos qui n'ont pas de id reservation associé
    const disponibilitesNonReservees = disponibilites.filter(dispo => {
      return !reservations.some(reservation => reservation.dispo_id.toString() === dispo._id.toString());
    });
    console.log("disponibiliteNONRESERVEES" + JSON.stringify(disponibilitesNonReservees));

    if (section === "sm") {
      const sections = await collectionSection.find({ type: "salle à manger" }).toArray();
      for (const section of sections) {
        const tables = section.tables;
        if (!tables) continue;
        for (const table of tables) {
          const dispoIdFields = Object.keys(table).filter(field => field.startsWith('dispo') && field.endsWith('_id'));
          for (const numDispoId of dispoIdFields) {
            const disponibilite = disponibilitesNonReservees.find(dispo => dispo._id.toString() === table[numDispoId].toString()
              && nbPersonnes >= table.nb_pers_min &&
              nbPersonnes <= table.nb_pers_max);
            if (disponibilite) {
              disposToPushFinal.push(disponibilite);
            }
          }
        }
      }
    }


    else if (section === "ter") {
      const sections = await collectionSection.find({ type: "terrasse" }).toArray();
      for (const section of sections) {
        const tables = section.tables;
        if (!tables) continue;
        for (const table of tables) {
          const dispoIdFields = Object.keys(table).filter(field => field.startsWith('dispo') && field.endsWith('_id'));
          for (const numDispoId of dispoIdFields) {
            const disponibilite = disponibilitesNonReservees.find(dispo => dispo._id.toString() === table[numDispoId].toString()
              && nbPersonnes >= table.nb_pers_min &&
              nbPersonnes <= table.nb_pers_max);
            if (disponibilite) {
              disposToPushFinal.push(disponibilite);
            }
          }
        }
      }
    }
    else {
      console.log("Parametre de section invalide")
    }

    console.log("Dispo finals" + JSON.stringify(disposToPushFinal));

    //Transformer les dispos trouvées en heures
    for (const disponibilite of disposToPushFinal) {
      const timestamp_debut = disponibilite.timestamp_debut;
      const timestamp_fin = disponibilite.timestamp_fin;

      const date_timestamp_debut = new Date(timestamp_debut);
      const date_timestamp_fin = new Date(timestamp_fin)

      const heure_debut = date_timestamp_debut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const heure_fin = date_timestamp_fin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const heures = [heure_debut, heure_fin];

      if (!disposVidesDuJour.includes(heures)) {
        disposVidesDuJour.push(heures);
      }
    }


  }
  catch (error) {
    console.error("Erreur lors de la requete!:", error);
    res.status(500).json({ error: "Erreur lors de la requete!" })
  };
  res.json(disposVidesDuJour);
}
);



module.exports = router