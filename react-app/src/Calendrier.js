import Calendar from 'react-calendar';
import {useState} from "react"

const Calendrier = () => {
  const[date,setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Day:", day);
  }

  return(
    <div>
      <Calendar onChange={onChange} value={date}/>
    </div>
  )
}

export default Calendrier;