import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';

const Reservation = () => {
    const [date, setDate] = useState(new Date());

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
        }
    }, [date]);

    return (
        <div className="Reservation">
            <Calendar onChange={onChange} value={date} />
        </div>
    );
}
export default Reservation;