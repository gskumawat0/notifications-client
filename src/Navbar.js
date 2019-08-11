import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, makeStyles} from '@material-ui/core/';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        marginRight: theme.spacing(5),
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

const Navbar = (props)=>{
    let {toggleDrawer, unViewedNotifications} = props;
    const classes = useStyles();
    return (
        <div className={classes.grow}>
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    8th Sense
                </Typography>
            
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton onClick={()=> toggleDrawer()} color="inherit">
                        <Badge badgeContent={unViewedNotifications} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </div>
                </Toolbar>
        </AppBar>
    </div>
    )
}

export default Navbar;


