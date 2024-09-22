// src/CreateTDR.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function CreateTDR() {
  const [objectives, setObjectives] = useState('');
  const [activities, setActivities] = useState('');
  const [resources, setResources] = useState('');

  const handleSubmit = () => {
    // Logique de soumission ou validation
    console.log({ objectives, activities, resources });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <h2>Création d'une nouvelle mission (TDR)</h2>
      <TextField
        label="Objectifs de la mission"
        variant="outlined"
        fullWidth
        value={objectives}
        onChange={(e) => setObjectives(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Activités prévues"
        variant="outlined"
        fullWidth
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Ressources nécessaires"
        variant="outlined"
        fullWidth
        value={resources}
        onChange={(e) => setResources(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        Soumettre pour validation
      </Button>
    </Box>
  );
}

export default CreateTDR;
