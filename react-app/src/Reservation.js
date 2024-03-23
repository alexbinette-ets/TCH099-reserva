import { useState, useEffect } from 'react';

const Reservation = () => {
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        fetch('/dayreservations/:annee/:numMois/:jour')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setReservations(data)
            });
    }, [])



    return (
        <table>
            <tr>
                <th>Num de reservation</th>
                <th>Debut</th>
                <th>Fin</th>
                <th>Num de table</th>
                <th>Nb de Sieges</th>
                <th>Specifications</th>
            </tr>

            {data.map((reservation) => (
                <tr key={reservation.num_reservation}>
                    <td>{reservation.num_reservation}</td>
                    <td>{reservation.heure_debut}</td>
                    <td>{reservation.heure_fin}</td>
                    <td>{reservation.numero_table}</td>
                    <td>{reservation.nb_sieges}</td>
                    <td>{reservation.specification}</td>
                </tr>
            ))}
        </table>
    )
}