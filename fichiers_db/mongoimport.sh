#!/bin/bash
mongoimport --db admin --collection Client --file /tmp/fichiers_db/Client.json --jsonArray
mongoimport --db admin --collection Commentaire --file /tmp/fichiers_db/Commentaire.json --jsonArray
mongoimport --db admin --collection Disponibilite --file /tmp/fichiers_db/Disponibilite.json --jsonArray
mongoimport --db admin --collection Menu --file /tmp/fichiers_db/Menu.json --jsonArray
mongoimport --db admin --collection Reservation --file /tmp/fichiers_db/Reservation.json --jsonArray
mongoimport --db admin --collection Section --file /tmp/fichiers_db/Section.json --jsonArray
mongoimport --db admin --collection Serveur --file /tmp/fichiers_db/Serveur.json --jsonArray
mongoimport --db admin --collection Table --file /tmp/fichiers_db/Table.json --jsonArray
