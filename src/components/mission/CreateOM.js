import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select } from '@mui/material';

function CreateOM() {
  const [traveler, setTraveler] = useState('');
  const [date, setDate] = useState('');  // General date for travel
  const [itinerary, setItinerary] = useState([{ origin: '', destination: '', date: '' }]);
  const [purpose, setPurpose] = useState('');
  const [hotelDetails, setHotelDetails] = useState({ hotelName: '', roomRate: '', confirmationNumber: '', date: '', otherDetails: '' });
  const [modeOfTravel, setModeOfTravel] = useState('');

  const [logisticalDetails, setLogisticalDetails] = useState({
    storageRequirements: '',
    specialEquipment: '',
    stakeholderCoordination: '',
    insurances: '',
    otherDetails: ''
  });

  const [travelerSignature, setTravelerSignature] = useState({  
    name: '',  
    signature: '',  
    date: ''  
  });  
  
  const [approverSignature, setApproverSignature] = useState({  
    name: '',  
    signature: '',  
    date: ''  
  });

  // State for individual itinerary inputs
  const [itineraryOrigin, setItineraryOrigin] = useState('');
  const [itineraryDestination, setItineraryDestination] = useState('');
  const [itineraryDate, setItineraryDate] = useState('');

  // Adding new itinerary row
  const addItineraryRow = () => {
    setItinerary([...itinerary, { origin: '', destination: '', date: '' }]);
  };

  const handleAddItinerary = () => {
    setItinerary([
      ...itinerary, 
      { origin: itineraryOrigin, destination: itineraryDestination, date: itineraryDate }
    ]);
    setItineraryOrigin(''); // Clear after adding
    setItineraryDestination('');
    setItineraryDate('');
  };

  const handleSubmit = () => {
    console.log({ traveler, date, itinerary, purpose, hotelDetails, modeOfTravel });
    // Handle form submission logic
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5">Création d'une nouvelle mission (TDR)</Typography>

      {/* Traveler Info */}
      <TextField
        label="Voyageur"
        variant="outlined"
        fullWidth
        value={traveler}
        onChange={(e) => setTraveler(e.target.value)}
        margin="normal"
      />

      {/* Date */}
      <TextField
        label="Date"
        variant="outlined"
        fullWidth
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Itinerary Section */}
      <Typography variant="h6" sx={{ marginTop: '20px' }}>Itinéraire Proposé</Typography>  
      <Box sx={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>  
        <TextField  
          label="Point de Départ"  
          variant="outlined"  
          value={itineraryOrigin}  
          onChange={(e) => setItineraryOrigin(e.target.value)}  
        />  
        <TextField  
          label="Destination"  
          variant="outlined"  
          value={itineraryDestination}  
          onChange={(e) => setItineraryDestination(e.target.value)}  
        />  
        <TextField  
          label="Date & Heure"  
          variant="outlined"  
          type="date"  
          value={itineraryDate}  
          onChange={(e) => setItineraryDate(e.target.value)}  
          InputLabelProps={{  
            shrink: true,  
          }}  
        />  
        <Button variant="contained" onClick={handleAddItinerary}>Ajouter à l'itinéraire</Button>  
      </Box>  

      {/* Itinerary Table */}
      <Box>  
        <Typography variant="h6" sx={{ marginTop: '20px' }}>Tableau d'Itinéraire</Typography>  
        <Box sx={{ marginTop: '10px' }}>  
          {itinerary.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date & Heure</th>
                  <th>Point de Départ</th>
                  <th>Destination</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.origin}</td>
                    <td>{row.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun itinéraire ajouté.</p>
          )}
        </Box>  
      </Box>

      <Button onClick={addItineraryRow} sx={{ marginBottom: '20px' }}>Ajouter un itinéraire</Button>

     {/* Purpose of Travel */}
     <TextField
        label="Objet de la mission"
        variant="outlined"
        fullWidth
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        margin="normal"
      />

              {/* Hotel Section */}  
        <Typography variant="h6" sx={{ marginTop: '20px' }}>  
          Détails de l'Hôtel  
        </Typography>  
        <TextField  
          label="Nom de l'Hôtel"  
          variant="outlined"  
          fullWidth  
          value={hotelDetails.hotelName}  
          onChange={(e) => setHotelDetails({ ...hotelDetails, hotelName: e.target.value })}  
          margin="normal"  
        />  
        <TextField  
          label="Tarif de la Chambre"  
          variant="outlined"  
          fullWidth  
          value={hotelDetails.roomRate}  
          onChange={(e) => setHotelDetails({ ...hotelDetails, roomRate: e.target.value })}  
          margin="normal"  
        />  
        <TextField  
          label="Numéro de Confirmation"  
          variant="outlined"  
          fullWidth  
          value={hotelDetails.confirmationNumber}  
          onChange={(e) => setHotelDetails({ ...hotelDetails, confirmationNumber: e.target.value })}  
          margin="normal"  
        />  
        <TextField  
          label="Date"  
          variant="outlined"  
          type="date"  
          fullWidth  
          value={hotelDetails.date}  
          onChange={(e) => setHotelDetails({ ...hotelDetails, date: e.target.value })}  
          margin="normal"  
          InputLabelProps={{  
            shrink: true,  
          }}  
        />  
        <TextField  
          label="Autres Détails"  
          variant="outlined"  
          fullWidth  
          multiline  
          rows={4}  
          value={hotelDetails.otherDetails}  
          onChange={(e) => setHotelDetails({ ...hotelDetails, otherDetails: e.target.value })}  
          margin="normal"  
        />

        {/* Autres Exigences Logistiques Section */}  
          <Typography variant="h6" sx={{ marginTop: '20px' }}>  
            Autres Exigences Logistiques  
          </Typography>  
          
          <TextField  
            label="Besoin en Stockage"  
            variant="outlined"  
            fullWidth  
            value={logisticalDetails.storageRequirements}  
            onChange={(e) => setLogisticalDetails({ ...logisticalDetails, storageRequirements: e.target.value })}  
            margin="normal"  
          />  

          <TextField  
            label="Matériel Spécial Requis"  
            variant="outlined"  
            fullWidth  
            value={logisticalDetails.specialEquipment}  
            onChange={(e) => setLogisticalDetails({ ...logisticalDetails, specialEquipment: e.target.value })}  
            margin="normal"  
          />  

          <TextField  
            label="Coordination avec les Parties Prenantes"  
            variant="outlined"  
            fullWidth  
            value={logisticalDetails.stakeholderCoordination}  
            onChange={(e) => setLogisticalDetails({ ...logisticalDetails, stakeholderCoordination: e.target.value })}  
            margin="normal"  
          />  

          <TextField  
            label="Assurances Nécessaires"  
            variant="outlined"  
            fullWidth  
            value={logisticalDetails.insurances}  
            onChange={(e) => setLogisticalDetails({ ...logisticalDetails, insurances: e.target.value })}  
            margin="normal"  
          />  

          <TextField  
            label="Autres Détails"  
            variant="outlined"  
            fullWidth  
            multiline  
            rows={4}  
            value={logisticalDetails.otherDetails}  
            onChange={(e) => setLogisticalDetails({ ...logisticalDetails, otherDetails: e.target.value })}  
            margin="normal"  
          />

      {/* Mode of Travel */}
      <Typography variant="h6" sx={{ marginTop: '20px' }}>Mode de Transport</Typography>
      <Select
        label="Mode de Transport"
        variant="outlined"
        fullWidth
        value={modeOfTravel}
        onChange={(e) => setModeOfTravel(e.target.value)}
        margin="normal"
      >
        <MenuItem value="air">Air</MenuItem>
        <MenuItem value="bush_taxi">Taxi-Brousse</MenuItem>
        <MenuItem value="rental_vehicle">Véhicule de Location</MenuItem>
        <MenuItem value="personal_vehicle">Véhicule Personnel</MenuItem>
        <MenuItem value="project_vehicle">Véhicule de Projet</MenuItem>
      </Select>


          {/* Signature Section */}  
<Typography variant="h6" sx={{ marginTop: '20px' }}>  
  Signature du Voyageur  
</Typography>  
<div style={{ display: 'flex', alignItems: 'center' }}>  
  <TextField  
    label="Nom du Voyageur"  
    variant="outlined"  
    fullWidth  
    value={travelerSignature.name}  
    onChange={(e) => setTravelerSignature({ ...travelerSignature, name: e.target.value })}  
    margin="normal"  
  />  
  <TextField  
    label="Signature"  
    variant="outlined"  
    fullWidth  
    value={travelerSignature.signature}  
    onChange={(e) => setTravelerSignature({ ...travelerSignature, signature: e.target.value })}  
    margin="normal"  
  />  
  <TextField  
    label="Date"  
    variant="outlined"  
    type="date"  
    fullWidth  
    value={travelerSignature.date}  
    onChange={(e) => setTravelerSignature({ ...travelerSignature, date: e.target.value })}  
    margin="normal"  
    InputLabelProps={{  
      shrink: true,  
    }}  
  />  
</div>  

<Typography variant="h6" sx={{ marginTop: '20px' }}>  
  Signature de la Personne Approuvant ce Voyage  
</Typography>  
<div style={{ display: 'flex', alignItems: 'center' }}>  
  <TextField  
    label="Nom de l'Approuveur"  
    variant="outlined"  
    fullWidth  
    value={approverSignature.name}  
    onChange={(e) => setApproverSignature({ ...approverSignature, name: e.target.value })}  
    margin="normal"  
  />  
  <TextField  
    label="Signature"  
    variant="outlined"  
    fullWidth  
    value={approverSignature.signature}  
    onChange={(e) => setApproverSignature({ ...approverSignature, signature: e.target.value })}  
    margin="normal"  
  />  
  <TextField  
    label="Date"  
    variant="outlined"  
    type="date"  
    fullWidth  
    value={approverSignature.date}  
    onChange={(e) => setApproverSignature({ ...approverSignature, date: e.target.value })}  
    margin="normal"  
    InputLabelProps={{  
      shrink: true,  
    }}  
  />  
</div>

      {/* Submit Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        sx={{ marginTop: '20px' }}
      >
        Soumettre pour validation
      </Button>
    </Box>
  );
}

export default CreateOM;
