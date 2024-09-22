import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard, ExitToApp, AccountCircle, Assignment, AttachMoney,  Report } from '@mui/icons-material'; 
import { Link } from 'react-router-dom'; 
import ApprovalIcon from '@mui/icons-material/Approval';


const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#2c2c2c',
          color: '#fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
         {/* Lien vers le tableau de bord */}
         <ListItem button component={Link} to="/"> 
          <ListItemIcon><Dashboard sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Tableau de bord" />
        </ListItem>



         {/* Nouveau lien vers Mission */}
         <ListItem button component={Link} to="/mission">
          <ListItemIcon><Assignment sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Mission" />
        </ListItem>

         {/* Nouveau lien vers Dépense */}
         <ListItem button component={Link} to="/depense">
          <ListItemIcon><AttachMoney sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Dépense" />
        </ListItem>

        {/* Nouveau lien vers Approbation */}
        <ListItem button component={Link} to="/Approval">
          <ListItemIcon><ApprovalIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Approbation" />
        </ListItem>

         {/* Nouveau lien vers Rapport de mission */}
         <ListItem button component={Link} to="/rapport-mission">
          <ListItemIcon><Report sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Rapport de mission" />
        </ListItem>



        <Divider />
        <ListItem button>
          <ListItemIcon><AccountCircle sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Mon compte" />
        </ListItem>

        <ListItem button >
          <ListItemIcon><ExitToApp sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
