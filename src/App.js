import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/login/Login'
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import Dashboard from './common/Dashboard';
import { CssBaseline, Box } from '@mui/material';
import Mission from './pages/Mission';
import RapportDeMission from './components/mission/RapportDeMission';
import Approval from './pages/Approval';




function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification
    // Fonction de connexion
const handleLogin = (username, password) => {
  const defaultUsername = 'user@example.com';
  const defaultPassword = '12345678';

// Vérification de l'authentification
if (username === defaultUsername && password === defaultPassword) {
    setIsAuthenticated(true);
    alert('Connexion réussie !');
  } else {
    alert('Identifiant ou mot de passe incorrect.');
  }
};

if (!isAuthenticated) {
  return <Login onLogin={handleLogin} />;
}

  return (
    <>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1 }}>
            <Header />
            
            {/* Définition des routes */}
            <Routes>
              <Route path="/" element={<Dashboard />} />   {/* Page par défaut */}
              <Route path="/dashboard" element={<Dashboard />} /> {/* Route alternative pour le Dashboard */}
              <Route path="/mission" element={<Mission />} />  {/* Page de retrait */}
              <Route path="/rapport-mission" element={<RapportDeMission />} />  {/* Page de retrait */}
              <Route path="/login" element={<Login />} />  {/* Page de login */}
              <Route path="/Approval" element={<Approval />} />  {/* Page de login */}



            </Routes>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;
