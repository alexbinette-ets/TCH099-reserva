#!/bin/bash
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Client --file /tmp/fichiers_db/Client.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Commentaire --file /tmp/fichiers_db/Commentaire.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Disponibilite --file /tmp/fichiers_db/Disponibilite.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Menu --file /tmp/fichiers_db/Menu.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Reservation --file /tmp/fichiers_db/Reservation.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Section --file /tmp/fichiers_db/Section.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Serveur --file /tmp/fichiers_db/Serveur.json --jsonArray
mongoimport --username admin --password VFanRE64K6MY8UH1isou --authenticationDatabase admin --db ReservationRestaurant --collection Table --file /tmp/fichiers_db/Table.json --jsonArray
