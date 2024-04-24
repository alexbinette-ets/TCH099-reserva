import React from 'react';

const Menu = () => {
    const data = []//FETCH ITEMS DU MENU
    return (<body>
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Plat</th>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Allergènes</th>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Épicé</th>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Prix</th>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Image</th>
        </tr>
        </thead>
        <tbody id="menu-body">
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Pizza Margherita</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Lait</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">15</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/pizzaMargherita" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Pizza hawaienne</td>
            <td style="border: 1px solid black; padding: 10px;">Aucun</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">18</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/pizzaHawaienne" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Pâtes Carbonara</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Œuf, Lait, Porc</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">12</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/patesCarbonara" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Risotto aux champignons</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">14</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/risottoChampignons" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Bruschetta tomate et mozzarella</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Lait</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">8</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="bruschettaTomateMozza" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Salade Caprese</td>
            <td style="border: 1px solid black; padding: 10px;">Lait</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">10</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/saladeCapresse" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Osso Buco</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Céleri</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">18</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/ossoBuco" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>


        <tr>
            <td style="border: 1px solid black; padding: 10px;">Gnocchi à la sauce tomate</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">11</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/gnocchiSauceTomate" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Pizza Quattro Stagioni</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Lait, Œuf, Porc</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">17</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/pizzaQuattroStagioni" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Lasagnes Bolognaises</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Lait</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">13</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/lasagneBolo" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Carpaccio de bœuf</td>
            <td style="border: 1px solid black; padding: 10px;">Aucun</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">16</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/carpaccioBoeuf" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Minestrone</td>
            <td style="border: 1px solid black; padding: 10px;">Aucun</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">6</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/minestrone" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Carpaccio de saumon</td>
            <td style="border: 1px solid black; padding: 10px;">Aucun</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">14</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/carpaccioSaumon" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Pizza Quattro Formaggi</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Lait</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">18</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/pizzaQuattroStagioni" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Orecchiette alla pugliese</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">12</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/orecchietteAllaPulgliese" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        <tr>
            <td style="border: 1px solid black; padding: 10px;">Cannelloni au ricotta et épinards</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Lait</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">14</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/cannelloniRicottaEpinards" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>

        <tr>
            <td style="border: 1px solid black; padding: 10px;">Pizza Frutti di Mare</td>
            <td style="border: 1px solid black; padding: 10px;">Gluten, Fruits de mer</td>
            <td style="border: 1px solid black; padding: 10px;">Non</td>
            <td style="border: 1px solid black; padding: 10px;">20</td>
            <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/pizzaFrutiMare" alt="Image du plat"
                                                                     style="max-width: 100px; max-height: 100px;"></td>
        </tr>
        </tbody>
        <h2>Desserts</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>

            </thead>
            <tbody>
            <tr>
                <td style="border: 1px solid black; padding: 10px;">Panna cotta</td>
                <td style="border: 1px solid black; padding: 10px;">Lait</td>
                <td style="border: 1px solid black; padding: 10px;">Non</td>
                <td style="border: 1px solid black; padding: 10px;">8</td>
                <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/pannaCotta"
                                                                         alt="Image du plat"
                                                                         style="max-width: 100px; max-height: 100px;"/>
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 10px;">Cannoli Siciliani</td>
                <td style="border: 1px solid black; padding: 10px;">Gluten, Lait</td>
                <td style="border: 1px solid black; padding: 10px;">Non</td>
                <td style="border: 1px solid black; padding: 10px;">9</td>
                <td style="border: 1px solid black; padding: 10px;"><img src="cannoliSiciliani" alt="Image du plat"
                                                                         style="max-width: 100px; max-height: 100px;"/>
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 10px;">Tiramisu</td>
                <td style="border: 1px solid black; padding: 10px;">Gluten, Œuf, Lait</td>
                <td style="border: 1px solid black; padding: 10px;">Non</td>
                <td style="border: 1px solid black; padding: 10px;">7</td>
                <td style="border: 1px solid black; padding: 10px;"><img src="./photosMenu/tiramisu" alt="Image du plat"
                                                                         style="max-width: 100px; max-height: 100px;"/>
                </td>
            </tr>
            </tbody>
        </table>

    </html>
    );
    }

    export default Menu;