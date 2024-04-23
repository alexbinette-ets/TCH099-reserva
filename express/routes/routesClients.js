const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');



//GET DISPO COTE CLIENT
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
      const sections = await collectionSection.find({ type : "salle à manger" }).toArray();
      for (const section of sections) {
        const tables = section.tables;
        if (!tables) continue;
            for (const table of tables) {
              const dispoIdFields = Object.keys(table).filter(field => field.startsWith('dispo') && field.endsWith('_id'));
              for (const numDispoId of dispoIdFields) 
          {
            const disponibilite = disponibilitesNonReservees.find(dispo => dispo._id.toString() === table[numDispoId].toString() 
            && nbPersonnes >= table.nb_pers_min &&
            nbPersonnes <= table.nb_pers_max);
            if (disponibilite) {
              disposToPushFinal.push(disponibilite);
          }
          }
      }}}


      else if (section === "ter") 
      {
        const sections = await collectionSection.find({ type : "terrasse" }).toArray();
        for (const section of sections) {
          const tables = section.tables;
          if (!tables) continue;
              for (const table of tables) {
                const dispoIdFields = Object.keys(table).filter(field => field.startsWith('dispo') && field.endsWith('_id'));
                for (const numDispoId of dispoIdFields) 
                {
              const disponibilite = disponibilitesNonReservees.find(dispo => dispo._id.toString() === table[numDispoId].toString() 
            && nbPersonnes >= table.nb_pers_min &&
            nbPersonnes <= table.nb_pers_max);
            if (disponibilite) {
              disposToPushFinal.push(disponibilite);
          }
            }
        }}}
      else {
        console.log("Parametre de section invalide")
      }

      console.log("Dispo finals" + JSON.stringify(disposToPushFinal));

      //Transformer les dispos trouvées en heures
      for (const disponibilite of disposToPushFinal) {
        const timestamp = disponibilite.timestamp_debut; 
        const date = new Date(timestamp);
        const heure = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
        
        if (!disposVidesDuJour.includes(heure)) {
            disposVidesDuJour.push(heure);
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


//ROUTE GET COMMENTAIRES DES CLIENTS







module.exports = router