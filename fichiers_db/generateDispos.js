const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// Fonction pour générer un timestamp pour une date donnée
function getTimestampForDate(year, month, day, hour = 0, minute = 0, second = 0) {
  const date = new Date(year, month - 1, day, hour, minute, second);
  return date.toISOString(); // Convertir en format ISO string
}

// Générer des disponibilités pour chaque heure de 8h à 22h
function generateAvailability() {
  const availability = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Boucle pour chaque jour des 3 prochains mois
  for (let day = 1; day <= 3 * 30; day++) {
    const currentDate = new Date(currentYear, currentMonth - 1, day);

    // Vérifier si le jour est un jour de semaine (lundi = 1, ..., dimanche = 7)
    const dayOfWeek = currentDate.getDay();
    

      // Générer des disponibilités pour chaque heure de 8h à 22h
      for (let hour = 8; hour <= 22; hour++) {
        const startTimestamp = getTimestampForDate(currentYear, currentMonth, day, hour);
        const endTimestamp = getTimestampForDate(currentYear, currentMonth, day, hour + 1);
        // Générer 4 disponibilités pour chaque heure avec des IDs différents
        for (let i = 0; i < 4; i++) {
          availability.push({
            _id: { "$oid": (Math.random() * 100000000000000000).toString(16).padStart(24, '0') },
            timestamp_debut: { "$date": startTimestamp },
            timestamp_fin: { "$date": endTimestamp }
          });
        }
      }
    
  }

  return availability;
}

// Générer les disponibilités
const availabilityData = generateAvailability();

// Écrire les données dans un fichier JSON
fs.writeFileSync('availability.json', JSON.stringify(availabilityData, null, 2));

console.log('Fichier JSON des disponibilités généré avec succès !');
