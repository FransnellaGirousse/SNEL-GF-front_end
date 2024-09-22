// src/RapportDeMission.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

function RapportDeMission() {
  // State pour chaque section du rapport
  const [objectifs, setObjectifs] = useState('');
  const [activites, setActivites] = useState('');
  const [pointsForts, setPointsForts] = useState('');
  const [pointsAmeliorer, setPointsAmeliorer] = useState('');
  const [recommandations, setRecommandations] = useState('');
  const [prochainesEtapes, setProchainesEtapes] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour soumettre chaque section individuellement
  const handleSubmitSection = (section) => {
    alert(`La section ${section} a été soumise pour validation.`);
    // Ici, vous pouvez envoyer les données au backend pour validation de la section individuelle
  };

  // Fonction pour soumettre toutes les sections ensemble
  const handleSubmitAll = () => {
    // Vérifier que toutes les sections sont remplies
    if (
      objectifs.trim() === '' ||
      activites.trim() === '' ||
      pointsForts.trim() === '' ||
      pointsAmeliorer.trim() === '' ||
      recommandations.trim() === '' ||
      prochainesEtapes.trim() === ''
    ) {
      setErrorMessage('Toutes les sections doivent être remplies avant de soumettre le rapport complet.');
      return;
    }

    setErrorMessage('');
    alert('Le rapport de mission complet a été soumis pour validation.');
    // Envoyer les données au backend pour validation complète du rapport
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Rapport de Mission</Typography>
      
      {/* Section Objectifs */}
      <Box mb={3}>
        <Typography variant="h6">I. Objectifs de la mission</Typography>
        <TextField
          fullWidth
          label="Objectifs"
          multiline
          rows={4}
          value={objectifs}
          onChange={(e) => setObjectifs(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSubmitSection('Objectifs')}>
          Soumettre Objectifs
        </Button>
      </Box>

      {/* Section Déroulement des Activités */}
      <Box mb={3}>
        <Typography variant="h6">II. Déroulement des Activités</Typography>
        <TextField
          fullWidth
          label="Déroulement des Activités"
          multiline
          rows={4}
          value={activites}
          onChange={(e) => setActivites(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSubmitSection('Activités')}>
          Soumettre Activités
        </Button>
      </Box>

      {/* Section Résultats */}
      <Box mb={3}>
        <Typography variant="h6">III. Résultats</Typography>
        <Typography>Points forts</Typography>
        <TextField
          fullWidth
          label="Points forts"
          multiline
          rows={2}
          value={pointsForts}
          onChange={(e) => setPointsForts(e.target.value)}
        />
        <Typography>Points à améliorer</Typography>
        <TextField
          fullWidth
          label="Points à améliorer"
          multiline
          rows={2}
          value={pointsAmeliorer}
          onChange={(e) => setPointsAmeliorer(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSubmitSection('Résultats')}>
          Soumettre Résultats
        </Button>
      </Box>

      {/* Section Recommandations */}
      <Box mb={3}>
        <Typography variant="h6">IV. Recommandations</Typography>
        <TextField
          fullWidth
          label="Recommandations"
          multiline
          rows={4}
          value={recommandations}
          onChange={(e) => setRecommandations(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSubmitSection('Recommandations')}>
          Soumettre Recommandations
        </Button>
      </Box>

      {/* Section Prochaines Étapes */}
      <Box mb={3}>
        <Typography variant="h6">V. Prochaines Étapes</Typography>
        <TextField
          fullWidth
          label="Prochaines Étapes"
          multiline
          rows={4}
          value={prochainesEtapes}
          onChange={(e) => setProchainesEtapes(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSubmitSection('Prochaines Étapes')}>
          Soumettre Prochaines Étapes
        </Button>
      </Box>

      {/* Message d'erreur */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Soumettre tout */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 3 }}
      >
        Soumettre tout le rapport
      </Button>
    </Box>
  );
}

export default RapportDeMission;
