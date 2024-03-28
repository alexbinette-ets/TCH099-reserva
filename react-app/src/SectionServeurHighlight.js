import React from 'react';
import PlanRestaurant from './PlanRestaurant'; // Importer le composant du plan du restaurant

class SectionServeurHighlight extends React.Component {
  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const serveurId = urlParams.get('serveurId');
    return (
      <div>
        <PlanRestaurant serveurId= {serveurId}/> 
      </div>
    );
  }
}

export default SectionServeurHighlight;
