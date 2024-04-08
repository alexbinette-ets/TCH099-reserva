import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import * as CONFIG from './utils/config.js'

const Calendrier = ({ username, onLogout }) => {
  //La vraie situation sera un fetch des données de l'authentification (serveur id), et apres avec cette données on active une fonction highlight!
  const id_serveur_temporaire = "65f9dbc05b4102100d0fcdbe";
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState(null);
  const [reservationsTerrasse, setReservationsTerrasse] = useState(null);
  const [reservationsSalleManger, setReservationsSalleManger] = useState(null);

  const handleLogout = () => {
    onLogout();
  };

  const onChange = date => {
    setDate(date);
  }

  useEffect(() => {
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      console.log("Year: ", year);
      console.log("Month: ", month);
      console.log("Day: ", day);

      const url = `${CONFIG.API_URL}/dayreservations/${year}/${month}/${day}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            setReservations(data);
            const reservationsTER = data.filter(reservation => reservation.type_section === "terrasse");
            const reservationsSM = data.filter(reservation => reservation.type_section === "salle à manger");
            setReservationsTerrasse(reservationsTER);
            setReservationsSalleManger(reservationsSM);
          } else {
            console.log("Aucune données reçues");
          }
        });
    }
  }, [date]);



  return (
    <div className='Calendrier'>
      <button className='CalendrierButton' onClick={handleLogout}>Deconnection</button>
      <Calendar onChange={onChange} value={date} />
      <div className='CalendrierVide'></div>
      {reservations && reservations.length > 0 ? (
        <div className='parentTableaux'>
          {reservationsSalleManger && reservationsSalleManger.length > 0 ? (
            <table className='CalendrierTable'>
              <caption>Salle à manger</caption>
              <thead className='CalendrierHead'>
                <tr>
                  <th>Num Reservation</th>
                  <th>Debut</th>
                  <th>Fin</th>
                  <th>Num Table</th>
                  <th>Nb Sieges</th>
                  <th>Specification</th>
                  <th>Nom Section</th>
                  <th>Nom Serveur</th>
                  <th>Prenom Client</th>
                  <th>Nom Client</th>
                  <th>Telephone Client</th>
                </tr>
              </thead>
              <tbody className='CalendrierBody'>
                {reservationsSalleManger.map((resSM) => (
                  <tr key={resSM.numero_res}>
                    <td className='CalendrierTD'>{resSM.numero_res}</td>
                    <td className='CalendrierTD'>{resSM.heure_debut}</td>
                    <td className='CalendrierTD'>{resSM.heure_fin}</td>
                    <td className='CalendrierTD'>{resSM.numero_table}</td>
                    <td className='CalendrierTD'>{resSM.nb_sieges}</td>
                    <td className='CalendrierTD'>{resSM.specification}</td>
                    <td className='CalendrierTD'>{resSM.nom_section}</td>
                    <td className='CalendrierTD'>
                      <div>
                        <p>{resSM.serveursDetails.prenom_serveur}</p>
                      </div>
                    </td>
                    <td className='CalendrierTD'>{resSM.prenom_client}</td>
                    <td className='CalendrierTD'>{resSM.nom_client}</td>
                    <td className='CalendrierTD'>{resSM.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) :
            <div className='CalendrierNull'> Aucune reservation pour la Salle à Manger</div>}
          {reservationsTerrasse && reservationsTerrasse.length > 0 ? (
            <table className='CalendrierTable'>
              <caption>Terrasse</caption>
              <thead className='CalendrierHead'>
                <tr>
                  <th>Num Reservation</th>
                  <th>Debut</th>
                  <th>Fin</th>
                  <th>Num Table</th>
                  <th>Nb Sieges</th>
                  <th>Specification</th>
                  <th>Nom Section</th>
                  <th>Nom Serveur</th>
                  <th>Prenom Client</th>
                  <th>Nom Client</th>
                  <th>Telephone Client</th>
                </tr>
              </thead>
              <tbody className='CalendrierBody'>
                {reservationsTerrasse.map((resTER) => (
                  <tr key={resTER.numero_res}>
                    <td className='CalendrierTD'>{resTER.numero_res}</td>
                    <td className='CalendrierTD'>{resTER.heure_debut}</td>
                    <td className='CalendrierTD'>{resTER.heure_fin}</td>
                    <td className='CalendrierTD'>{resTER.numero_table}</td>
                    <td className='CalendrierTD'>{resTER.nb_sieges}</td>
                    <td className='CalendrierTD'>{resTER.specification}</td>
                    <td className='CalendrierTD'>{resTER.nom_section}</td>
                    <td className='CalendrierTD'>
                      <p>{resTER.serveursDetails.prenom_serveur}</p>
                    </td>
                    <td className='CalendrierTD'>{resTER.prenom_client}</td>
                    <td className='CalendrierTD'>{resTER.nom_client}</td>
                    <td className='CalendrierTD'>{resTER.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) :
            <div className='CalendrierNull'> Aucune reservation pour la Terrasse</div>}
        </div>
      ) :
        <div className='CalendrierNull'> Aucune reservation pour cette date</div>}
    </div>
  );
}

export default Calendrier;
