const TopBar = () => {
    return ( 
<div className="TopBar">
<a href="http://localhost:3000/">
  <h1 className="TopBarTitle">Reserva</h1>
</a>
            <div className="TopBarLinks">
                <a href="http://localhost:3000/menu">Menu</a>
                <a href="http://localhost:3000/reservation">Reserver</a>
            </div>
        </div>
     );
}
 
export default TopBar;