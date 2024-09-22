// src/MissionDashboard.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem } from '@mui/material';

const missions = [
  { date: '28/04/2024', destination: 'Ambondromamy', statut: 'En cours', tdrValide: true, omValide: false, cout: '$500' },
  { date: '09/05/2024', destination: 'Mahajanga', statut: 'Terminée', tdrValide: true, omValide: true, cout: '$300' },
];

function MissionDashboard() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); 

  const handleSearch = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredMissions = missions.filter(mission => {
    return (
      mission.destination.toLowerCase().includes(filter) &&
      (statusFilter === '' || mission.statut === statusFilter)
    );
  });

  return (
    <div>
      <h1>Tableau de bord des missions</h1>
      <TextField 
        label="Rechercher par destination"
        variant="outlined"
        onChange={handleSearch}
      />
      <Select 
        value={statusFilter}
        onChange={handleStatusChange}
        displayEmpty
        variant="outlined"
      >
        <MenuItem value="">Tous les statuts</MenuItem>
        <MenuItem value="En cours">En cours</MenuItem>
        <MenuItem value="Terminée">Terminée</MenuItem>
      </Select>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date de début</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>TDR Validé</TableCell>
              <TableCell>OM Validé</TableCell>
              <TableCell>Coût estimé</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMissions.map((mission, index) => (
              <TableRow key={index}>
                <TableCell>{mission.date}</TableCell>
                <TableCell>{mission.destination}</TableCell>
                <TableCell>{mission.statut}</TableCell>
                <TableCell>{mission.tdrValide ? 'Oui' : 'Non'}</TableCell>
                <TableCell>{mission.omValide ? 'Oui' : 'Non'}</TableCell>
                <TableCell>{mission.cout}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">Voir</Button>
                  <Button variant="contained" color="secondary">Modifier</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Créer une nouvelle mission
      </Button>
    </div>
  );
}

export default MissionDashboard;
