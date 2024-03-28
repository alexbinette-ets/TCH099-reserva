import React from 'react';

class PlanRestaurant extends React.Component {
  state = {
    sections: [],
    tables: [],
    serveurs: [], // Ajout du tableau des serveurs
  };
  componentDidMount() {
    this.fetchRestaurantData();
  }
  fetchRestaurantData = async () => {
    const serveurId = this.props.serveurId;
    try {
     
      const response = await fetch('/api/restaurant/plan');
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant data');
      }
      const data = await response.json();
      
    
      this.setState({
        sections: data.sections,
        tables: data.tables,
        serveurs: data.serveurs 
      });
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  render() {
    const { sections, tables, serveurs, serveurId } = this.state;

    // Affichage du plan du restaurant avec les sections et les tables
    return (
        <div className='plan-container'>
          <h2>Plan du restaurant</h2>
          <ul>
            {sections.map(section => (
              <li key={section._id}>
                <h3 className={section.serveurs.includes(serveurId) ? 'highlighted' : ''}>{section.nom}</h3>
                <ul>
                  {tables.filter(table => table.section_id === section._id).map(table => (
                    <li key={table._id} className={section.serveurs.includes(serveurId) ? 'highlighted' : ''}>{table.numero_table}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export default PlanRestaurant;
