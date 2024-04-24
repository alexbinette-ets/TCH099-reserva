import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import * as CONFIG from "./utils/config.js"
import { Link } from 'react-router-dom';

const Reservation = () => {
    const [date, setDate] = useState(new Date());
    const [reservations, setReservations] = useState(null);
    const [personnes, setPersonne] = useState(1);
    const [section, setSection] = useState('ter');

    const onChange = date => {
        setDate(date);
    }

    const HandlePersonne = (event) => {
        setPersonne(event.target.value);
    };

    const HandleSection = (event) => {
        setSection(event.target.value);
    };


    useEffect(() => {
        if (date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            console.log("Year: ", year);
            console.log("Month: ", month);
            console.log("Day: ", day);

            const url = `${CONFIG.API_URL_CLIENT}/dayGetDispos2/${year}/${month}/${day}/${section}/${personnes}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log("Reservations:", data);
                    setReservations(data);
                })

                
        }
    }, [date, section, personnes]);


    const handleReservation = (reservation) => {
        const url = `${CONFIG.API_URL}/makeReservation`;
        const requestData = {
            numero_res: reservation.numero_res,
            date: reservation.date,
            heure_debut: reservation.heure_debut,
            heure_fin: reservation.heure_fin,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div className='Reservation'>
            <div className='ReservationParametre'>
                <label htmlFor="nbPersonnes">Nombre de Personnes:</label>
                <br />
                <select id="nbPersonnes" onChange={HandlePersonne}>
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5">5 personnes</option>
                    <option value="6">6 personnes</option>
                    <option value="7">7 personnes</option>
                    <option value="8">8 personnes</option>
                </select>
                <br />
                <label htmlFor="section">Section:</label>
                <br />
                <select id="sections" onChange={HandleSection}>
                    <option value="ter">térrasse</option>
                    <option value="sm">Salle à Manger</option>
                </select>
            </div>
            <Calendar onChange={onChange} value={date} />
            <div></div>
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
                                <td className='ReservationTD'>{date.toLocaleDateString()}</td>
                                <td className='ReservationTD'>{reservation}</td>
                                <td className='ReservationTD'>{reservation.heure_fin}</td>
                                <td className='ReservationTD'><button onClick={() => handleReservation(reservation)}>Réserver</button></td>
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