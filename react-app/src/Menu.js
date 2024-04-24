import React from 'react';

const Menu = () => {
    const data = []//FETCH ITEMS DU MENU
    return (<body>
    <table class="table-menu">
        <thead>
        <tr>
            <th>Plat</th>
            <th>Allergènes</th>
            <th>Épicé</th>
            <th>Prix</th>
            <th>Image</th>
        </tr>
        </thead>
        <tbody id="menu-body">
        <tr>
            <td>Pizza Margherita</td>
            <td>Gluten, Lait</td>
            <td>Non</td>
            <td>15</td>
            <td><img src="%PUBLIC_URL%/photosMenu/pizzaMargherita.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Pizza hawaienne</td>
            <td></td>
            <td>Non</td>
            <td>18</td>
            <td><img src="%PUBLIC_URL%/photosMenu/pizzaHawaienne.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Pâtes Carbonara</td>
            <td>Gluten, Œuf, Lait, Porc</td>
            <td>Non</td>
            <td>12</td>
            <td><img src="%PUBLIC_URL%/photosMenu/patesCarbonara.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Risotto aux champignons</td>
            <td>Gluten</td>
            <td>Non</td>
            <td>14</td>
            <td><img src="%PUBLIC_URL%/photosMenu/risottoChampignons.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Bruschetta tomate et mozzarella</td>
            <td>Gluten, Lait</td>
            <td>Non</td>
            <td>8</td>
            <td><img src="%PUBLIC_URL%/photosMenu/bruschettaTomateMozza.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Salade Caprese</td>
            <td>Lait</td>
            <td>Non</td>
            <td>10</td>
            <td><img src="%PUBLIC_URL%/photosMenu/saladeCapresse.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Osso Buco</td>
            <td>Gluten, Céleri</td>
            <td>Non</td>
            <td>18</td>
            <td><img src="%PUBLIC_URL%/photosMenu/ossoBuco.JPG" alt="Image du plat"/></td>
        </tr>


        <tr>
            <td>Gnocchi à la sauce tomate</td>
            <td>Gluten</td>
            <td>Non</td>
            <td>11</td>
            <td><img src="%PUBLIC_URL%/photosMenu/gnocchiSauceTomate.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Pizza Quattro Stagioni</td>
            <td>Gluten, Lait, Œuf, Porc</td>
            <td>Non</td>
            <td>17</td>
            <td><img src="%PUBLIC_URL%/photosMenu/pizzaQuattroStagioni.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Lasagnes Bolognaises</td>
            <td>Gluten, Lait</td>
            <td>Non</td>
            <td>13</td>
            <td><img src="%PUBLIC_URL%/photosMenu/lasagneBolo.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Carpaccio de bœuf</td>
            <td></td>
            <td>Non</td>
            <td>16</td>
            <td><img src="%PUBLIC_URL%/photosMenu/carpaccioBoeuf.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Minestrone</td>
            <td></td>
            <td>Non</td>
            <td>6</td>
            <td><img src="%PUBLIC_URL%/photosMenu/minestrone.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Carpaccio de saumon</td>
            <td></td>
            <td>Non</td>
            <td>14</td>
            <td><img src="%PUBLIC_URL%/photosMenu/carpaccioSaumon.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Pizza Quattro Formaggi</td>
            <td>Gluten, Lait</td>
            <td>Non</td>
            <td>18</td>
            <td><img src="%PUBLIC_URL%/photosMenu/pizzaQuattroStagioni.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Orecchiette alla pugliese</td>
            <td>Gluten</td>
            <td>Non</td>
            <td>12</td>
            <td><img src="%PUBLIC_URL%/photosMenu/orecchietteAllaPulgliese.JPG" alt="Image du plat"/></td>
        </tr>
        <tr>
            <td>Cannelloni au ricotta et épinards</td>
            <td>Gluten, Lait</td>
            <td>Non</td>
            <td>14</td>
            <td><img src="%PUBLIC_URL%/photosMenu/cannelloniRicottaEpinards.JPG" alt="Image du plat"/></td>
        </tr>

        <tr>
            <td>Pizza Frutti di Mare</td>
            <td>Gluten, Fruits de mer</td>
            <td>Non</td>
            <td>20</td>
            <td><img src="%PUBLIC_URL%/photosMenu/pizzaFrutiMare.JPG" alt="Image du plat"/></td>
        </tr>
        </tbody>
        </table>
        <h2>Desserts</h2>
        <table class="table-menu">
            <thead>

            </thead>
            <tbody>
            <tr>
                <td>Panna cotta</td>
                <td>Lait</td>
                <td>Non</td>
                <td>8</td>
                <td><img src="%PUBLIC_URL%/photosMenu/pannaCotta.JPG" alt="Image du plat"/>
                </td>
            </tr>
            <tr>
                <td>Cannoli Siciliani</td>
                <td>Gluten, Lait</td>
                <td>Non</td>
                <td>9</td>
                <td><img src="%PUBLIC_URL%/photosMenu/cannoliSiciliani.JPG" alt="Image du plat"/>
                </td>
            </tr>
            <tr>
                <td>Tiramisu</td>
                <td>Gluten, Œuf, Lait</td>
                <td>Non</td>
                <td>7</td>
                <td><img src="%PUBLIC_URL%/photosMenu/tiramisu.JPG" alt="Image du plat"/>
                </td>
            </tr>
            </tbody>
        </table>
        </body>
    )}

    export default Menu;
