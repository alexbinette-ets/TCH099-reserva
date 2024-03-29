import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';

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
    <div className='Calendrier'>
      <Calendar onChange={onChange} value={date} />
      {reservations && reservations.length > 0 ? (
        <table className='CalendrierTable'>
          <thead className='CalendrierHead'>
            <tr>
              <th>Num de reservation</th>
              <th>Debut</th>
              <th>Fin</th>
              <th>Num de table</th>
              <th>Nb de Sieges</th>
              <th>Specifications</th>
            </tr>
          </thead>
          <tbody className='CalendrierBody'>
            {reservations.map((reservation) => (
              <tr key={reservation.numero_res}>
                <td className='CalendrierTD'>{reservation.numero_res}</td>
                <td className='CalendrierTD'>{reservation.heure_debut}</td>
                <td className='CalendrierTD'>{reservation.heure_fin}</td>
                <td className='CalendrierTD'>{reservation.numero_table}</td>
                <td className='CalendrierTD'>{reservation.nb_sieges}</td>
                <td className='CalendrierTD'>{reservation.specification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) :
        <div className='CalendrierNull'> Aucune reservation pour cette date</div>}
    </div>
  );
}

export default Calendrier;
