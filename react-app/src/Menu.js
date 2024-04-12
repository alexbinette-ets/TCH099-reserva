import React from 'react';

const Menu = () => {
    const data = []//FETCH ITEMS DU MENU
    return ( 
        //html du menu ici vvv
        <div className="Menu">
            <h1>MENU</h1>
            <ul>
                {data.map((item, index)=>(
                    <li key= {index}> {item} </li>
                ))}
            </ul>
            <button>Retour</button>
        </div>
     );
}
 
export default Menu;