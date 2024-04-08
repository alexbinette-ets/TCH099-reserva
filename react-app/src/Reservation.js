import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import * as CONFIG from "./utils/config.js"
import { Link } from 'react-router-dom';

const Reservation = () => {
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

            const url = `${CONFIG.API_URL}/reserver/${year}/${month}/${day}`;//*******************************************/

            fetch(url)
                .then(res => res.json())
                .then(data => setReservations(data))
        }
    }, [date]);

    return (
        <div className='Reservation'>
            <Calendar onChange={onChange} value={date} />
            {reservations && reservations.length > 0 ? (
                <table className='ReservationTable'>
                    <thead className='ReservationHead'>
                        <tr>
                            <th>Date</th>
                            <th>Debut</th>
                            <th>Fin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ReservationBody'>
                        {reservations.map((reservation) => (
                            <tr key={reservation.numero_res}>
                                <td className='ReservationTD'>{reservation.date}</td>
                                <td className='ReservationTD'>{reservation.heure_debut}</td>
                                <td className='ReservationTD'>{reservation.heure_fin}</td>
                                <td className='ReservationTD'><Link to ='/formulaire?date=${reservation.date}&'><button>Réserver</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) :
                <div className='CalendrierNull'> Aucune disponibilité pour cette date</div>}
        </div>
    );
}
export default Reservation;
