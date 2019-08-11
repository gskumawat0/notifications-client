import React from 'react';
import moment from 'moment'
import {Drawer, List, ListItem, ListItemText, Divider} from '@material-ui/core';
// import './App.css';




const NotificationDrawer = (props)=>{
    let {drawerOpen, toggleDrawer, notifications, markRead} = props;
    return (
        <Drawer className='drawer' anchor="right" open={drawerOpen}  onClose={toggleDrawer}>

            <Divider />
            <List className='drawer-list'>
                {notifications.map((notification, idx)=>
                    <ListItem key={idx} button onClick={()=>markRead(idx)} className={notification.viewed ? 'viewed': 'unViewed'}>

                        <ListItemText primary={notification.notification} secondary={moment(notification.date).fromNow()} />
                    </ListItem>
                )}
            </List>
        </Drawer>
    )
}

export default NotificationDrawer;

