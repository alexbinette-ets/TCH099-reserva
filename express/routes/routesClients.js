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
              //console.log("disponibilite : " + disponibilite)
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


router.post('/reserver', async (req, res) =>{

  function generateNumeroRes() {
      const timestamp = new Date().getTime();
      const randomNumber = Math.floor(Math.random() * 1000000);
      return parseInt(`${timestamp-randomNumber}`.slice(-7));
  }

  function generate_prenom_serveur() {
    const names = ["Marco", "Elena", "Antonio", "Lucas", "Sophie", "Giovanni", "Luigi", "Maria", "Pietro"];
    return names[Math.floor(Math.random() * names.length)];
}

  try{
    const {prenom,nom,email,tel,date,heure_debut,heure_fin,section,personnes,allergies} = req.body; 
    const collectionSections = req.app.locals.db.collection("Sections");
    console.log("prénom : " + prenom);

    console.log("nom : " + nom);
    console.log("email : " + email);
    console.log("tel : " + tel);
    console.log("date : " + date);
    console.log("heure_debut : " + heure_debut);
    console.log("heure_fin : " + heure_fin);
    console.log("section : " + section);


    personnes_propre = parseInt(personnes);/////
    if(section == "ter"){section_propre = "terrasse";};
    if(section == "sm"){section_propre = "salle à manger";};
    const nouvDate = new Date(`${date}T${heure_debut}`);
    timestamp = nouvDate.toISOString();
    //timestamp = date.slice(0,11) + String(parseInt(heure_debut.slice(0,2))+12)+ heure_debut.slice(2,5) + ":00.000Z";
    console.log("timestamp: " + timestamp);
  
    console.log("personnes_propre: " + personnes_propre);
    console.log("section_propre: " + section_propre);
    
    timestamp_propre = new Date(timestamp);
    console.log("timestamp_propre: " + timestamp_propre);

    prenom_serv = generate_prenom_serveur();
    id_reserv = generateNumeroRes();
    
    await collectionSections.updateOne(
      {
        "type": section_propre,
      },
      {
        $set: {
          //"tables.$[table].Disponibilites.$[disponibilite].Reservation": {
          "tables.$[table].Disponibilites.$[disponibilite].Reservation": {
            "numero_res": id_reserv,
            "nb_sieges": personnes_propre,
            "specification": allergies,
            "prenom_serveur" : prenom_serv,
            "Client": {
              "nom_client": nom,
              "prenom_client": prenom,
              "telephone": tel,
              "email": email
            }
          }
        }
      },
      {
        arrayFilters: [
          {"table.nb_pers_min": {$lte: personnes_propre}, "table.nb_pers_max": {$gte: personnes_propre}},
          {"disponibilite.timestamp_debut": {$eq: timestamp_propre}}
      ],
        upsert: true,
        multi: false
      }).then((result)=> {
          console.log(result);
          res.status(200).send({"id_reserv":id_reserv});
        }).catch((err)=>{
          console.error("Erreur: "+ err);
          res.status(500).send('Erreur DB');

      })
      

} catch(err){
  console.error(err);
  res.status(500).send('Erreur serveur interne');
}
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
