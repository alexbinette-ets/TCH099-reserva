import Calendar from 'react-calendar';
import { useEffect, useState } from "react";

const Calendrier = () => {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState(null);

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

      const url = `http://localhost:5000/api/employe/dayreservations/${year}/${month}/${day}`;

      fetch(url)
        .then(res => res.json())
        .then(data => setReservations(data))
    }
  }, [date]);

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      {reservations && reservations.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Num de reservation</th>
              <th>Debut</th>
              <th>Fin</th>
              <th>Num de table</th>
              <th>Nb de Sieges</th>
              <th>Specifications</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.numero_res}>
                <td>{reservation.numero_res}</td>
                <td>{reservation.heure_debut}</td>
                <td>{reservation.heure_fin}</td>
                <td>{reservation.numero_table}</td>
                <td>{reservation.nb_sieges}</td>
                <td>{reservation.specification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) :
        <div> Aucune reservation pour cette date</div>}
    </div>
  );
}

export default Calendrier;
