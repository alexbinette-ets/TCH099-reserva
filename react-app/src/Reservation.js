import { useState, useEffect } from 'react';

const Reservation = () => {
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        fetch("")
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
                <th>Debut</th>
                <th>Fin</th>
                <th>Sieges</th>
            </tr>

            {data.map((reservation) => (
                <tr key={reservation._id}>
                    <td>{reservation.timestamp_debut}</td>
                    <td>{reservation.timestamp_fin}</td>
                    <td>{reservation.nb_sieges}</td>
                </tr>
            ))}
        </table>
    )
}