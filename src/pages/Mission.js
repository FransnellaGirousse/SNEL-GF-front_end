// src/Mission.js
import React, { useState } from 'react';
import MissionDashboard from '../components/mission/MissionDashboard'; // Tableau de bord des missions
import CreateTDR from '../components/mission/CreateTDR'; // Formulaire de création du TDR
import CreateOM from '../components/mission/CreateOM'; // Formulaire de création d'OM
import { Button, Box } from '@mui/material';

function Mission() {
  // State to control which view to display (dashboard, TDR creation, OM creation)
  const [view, setView] = useState('dashboard');

  // Function to render the selected view
  const renderView = () => {
    switch(view) {
      case 'dashboard':
        return <MissionDashboard />;
      case 'createTDR':
        return <CreateTDR />;
      case 'createOM':
        return <CreateOM />;
      default:
        return <MissionDashboard />;
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Navigation Buttons */}
      <Button variant="contained" onClick={() => setView('dashboard')} style={{ margin: '10px' }}>
        Tableau de bord des missions
      </Button>
      <Button variant="contained" onClick={() => setView('createTDR')} style={{ margin: '10px' }}>
        Créer une nouvelle mission (TDR)
      </Button>
      <Button variant="contained" onClick={() => setView('createOM')} style={{ margin: '10px' }}>
        Créer un Ordre de Mission (OM)
      </Button>

      {/* Render the selected view */}
      {renderView()}
    </Box>
  );
}

export default Mission;
