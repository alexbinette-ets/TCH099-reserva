import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import * as CONFIG from "./utils/config.js"
import { Link } from 'react-router-dom';

const Reservation = () => {
    const [date, setDate] = useState(new Date());
    const [reservations, setReservations] = useState(null);
    const [personnes, setPersonne] = useState('');
    const [section, setSection] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [allergies, setAllergies] = useState('');

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
        const url = `${CONFIG.API_URL_CLIENT}/reserver`;
        const requestData = {
            prenom: prenom,
            nom: nom,
            email: email,
            tel: tel,
            date: date.toISOString(),
            allergies: allergies,
            section: section,
            personnes: personnes,
            heure_debut: reservation.slice(0,8),
            heure_fin: reservation.slice(-8)
        };
        console.log(prenom);
        console.log(requestData);
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
                    <option value="" disabled>Pour 9+ personnes, appelez-nous! 😊</option>
                </select>
                <br />
                <label htmlFor="section">Section:</label>
                <br />
                <select id="sections" onChange={HandleSection}>
                    <option value="ter">Terrasse</option>
                    <option value="sm">Salle à Manger</option>
                </select>
        
                <br />
                <label htmlFor="nom">Nom: </label>
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                /> 
                <br />
                <label htmlFor="prenom">Prénom: </label>
                <input
                  type="text"
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                /> 
                <br />
                <label htmlFor="email">Courriel: </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /> 
                <br />
                <label htmlFor="tel">Téléphone: </label>
                <input
                  type="tel"
                  id="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                /> 
                <br />
                <label htmlFor="allergies">Si vous avez des allergies, merci de les indiquer ici: </label>
                <input
                  type="text"
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  rows={5}
                /> 
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
                                <td className='ReservationTD'>{reservation.slice(0,8)}</td>
                                <td className='ReservationTD'>{reservation.slice(-8)}</td>
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
