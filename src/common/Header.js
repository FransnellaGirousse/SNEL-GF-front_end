import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next'; // Importer useTranslation

function Header() {
  const { t, i18n } = useTranslation(); // Initialiser useTranslation pour traduire
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuOpen = (event) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLangMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a1a' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('welcome')}
        </Typography>

        {/* Menu Avatar */}
        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
          <Avatar alt="Alpha Beta" src="https://mui.com/static/images/avatar/1.jpg" />
        </IconButton>

        {/* Menu déroulant pour le profil utilisateur */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              transform: 'translateY(45px)',
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>{t('profile')}</MenuItem>
          <MenuItem onClick={handleMenuClose}>{t('logout')}</MenuItem>
        </Menu>

        {/* Sélecteur de langue */}
        <IconButton onClick={handleLangMenuOpen} sx={{ ml: 2, color: 'white' }}>
          🌐
        </IconButton>

        {/* Menu déroulant pour la sélection de la langue */}
        <Menu
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleLangMenuClose}
          PaperProps={{
            style: {
              transform: 'translateY(45px)',
            },
          }}
        >
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
