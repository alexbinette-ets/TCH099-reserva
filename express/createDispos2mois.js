const { app, client } = require('./index.js');
const { ObjectId } = require('mongodb');  // Assurez-vous d'importer ObjectId



async function testGenerateDispos2mois() {
  try {
    const dispos = await generateDispos2mois();
    console.log("Disponibilités générées avec succès :", dispos);
  } catch (error) {
    console.error("Une erreur est survenue lors de la génération des disponibilités :", error);
  }
}


async function generateDispos2mois() {
  const dispos2mois = [];


  const dateActuelle = new Date();
  const numMois = dateActuelle.getMonth() + 1;
  const annee = dateActuelle.getFullYear();
  const jour = dateActuelle.getDate();
  const nombreTables = 10;
  


  let joursAGenerer = 0;
  
  const nbJoursMoisActuel = getNbJoursMois(numMois, annee);
  joursAGenerer += nbJoursMoisActuel - jour + 1;
  
  const moisSuivant = numMois === 12 ? 1 : numMois + 1;
  const anneeSuivante = numMois === 12 ? annee + 1 : annee;
  const nbJoursMoisSuivant = getNbJoursMois(moisSuivant, anneeSuivante);
  joursAGenerer += nbJoursMoisSuivant;
  
  
  for (let i = jour; i <= jour + joursAGenerer - 1; i++) {
    let mois, annee;
    
    // si prochaine annee
    if (i > nbJoursMoisActuel) {
      mois = moisSuivant;
      annee = anneeSuivante;
    } else {
      mois = numMois;
      annee = anneeSuivante;
    }
    
    
    const jourCourant = i <= nbJoursMoisActuel ? i : i - nbJoursMoisActuel;



    for (let numTable = 1; numTable <= nombreTables; numTable++) {
      for (let heure = 18; heure < 22; heure++) {
        const objectId = new ObjectId();

        const dateDebut = new Date(annee, mois - 1, jourCourant, heure);
        const dateFin = new Date(annee, mois - 1, jourCourant, heure + 1);

        //Conversion du timezone, ca fait bug 18-22 en un temps pas rapport
        const offset = dateDebut.getTimezoneOffset() * 60000;
        const localDateDebut = new Date(dateDebut.getTime() - offset);
        const localDateFin = new Date(dateFin.getTime() - offset);
        
        
        dispos2mois.push({
          _id: objectId,
          timestamp_debut: localDateDebut,
          timestamp_fin: localDateFin
        });
      }
  }}
  
  return dispos2mois;
  
}

function getNbJoursMois(numMois, annee) {
  let nbJours;

  //Les mois commencent à 0
  if (numMois > 12 || numMois < 0) {
    console.log("index de mois invalide")
    return null;
  }

//calcul nb jours
else {
  if (numMois === 2) {
    nbJours = (annee % 4 === 0 && (annee % 100 !== 0 || annee % 400 === 0)) ? 29 : 28;
  } else if ([1, 3, 5, 7, 8, 10, 12].includes(numMois)) {
    nbJours = 31;
  } else {
    nbJours = 30;
  }
}
  return nbJours;
}

async function insererDansDb(){
  try{
    //IMPORTANT DE AWAIT!!
    const documents = await generateDispos2mois(); 
    //console.log(documents); 
    const db = client.db('ReservationRestaurant');
    const collection = db.collection('Disponibilite'); 
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents insérés avec succès.`);
} catch (error) {
    console.error("Une erreur est survenue lors de l'insertion dans la base de données :", error);
    

}
}

insererDansDb();
//testGenerateDispos2mois();


