
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import {
  Avatar,
  // Divider,
  IconButton,
  Typography,
  CssBaseline,
  Toolbar,
  AppBar,
  Box
  // Button
} from '@mui/material'
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import Tooltip from '@mui/material/Tooltip'

// import { Contact } from '../Contacts/Contact'
// import { ContactDetails } from '../Contacts/ContactDetails'
import { Sidebar } from '../../sidebar/Sidebar'

const drawerWidth = 240

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const useStyles = makeStyles({
  btnIcon: {
    color: 'gray'
  },
  logout: {
    margin: '6px 26px 0px 26px',
    fill: '#1976d2 !important',
    cursor: 'pointer'
  }

})

export const Home = (props) => {
  const [open, setOpen] = useState(false)
  // const [activeScreenHeader, SetActiveScreenHeader] = useState('Bottle CRM')
  const classes = useStyles()
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      navigate('/login')
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <StyledAppBar
        position='fixed'
        open={open}
        style={{ backgroundColor: 'white', height: '60px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        sx={{ boxShadow: 1 }}
      >
        <div>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ fontWeight: 'bold', color: 'black' }}>
              Bottle-CRM
            </Typography>
          </Toolbar>
        </div>
        <div style={{
          marginRight: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        >
          {/* <div style={{ marginRight: "5px" }}>
            <Button
              size="small"
              startIcon={
                <SettingsOutlinedIcon
                  className={classes.btnIcon}
                  color="primary"
                  style={{ height: "35px", width: "25px", color: "gray" }}
                />
              }
            />
          </div> */}
          <div>
            <Avatar
              src='/broken-image.jpg'
              style={{
                height: '25px',
                width: '25px'
              }}
            />
          </div>
          <div>
            <Tooltip title='logout'>
              <LogoutIcon
                className={classes.logout}
                onClick={logout}
              />
            </Tooltip>
          </div>
        </div>
      </StyledAppBar>
      <Sidebar
        handleDrawerClose={() => handleDrawerClose}
        open={open}
      />
    </Box>

  )
}
