import React, { Component } from "react";
import './App.css';
import socketIOClient from "socket.io-client";
import Navbar from './Navbar';
import NotificationDrawer from "./Notifications";

class App extends Component {
	constructor() {
		super();
		this.state = {
			notifications: [],
			unViewedNotifications: 0,
			drawerOpen: false
		};
	}

	componentDidMount = () => {
		this.socket = socketIOClient(process.env.REACT_APP_BACKEND_API_URL);
		this.socket.on('connection', (socket)=>{
			console.log(socket);
		})
		this.socket.on('add_notification', this.addNotification)
		this.socket.on('get_notifications', this.getNotifications)
	}

	getNotifications = (notifications)=>{
		// debugger
		this.setState({
			notifications,
			unViewedNotifications: notifications.length
		})
	}

	addNotification = (notification)=>{
		let {notifications, unViewedNotifications} = this.state;
		this.setState({
			notifications: [notification, ...notifications],
			unViewedNotifications: unViewedNotifications + 1
		})
	}

	toggleDrawer = ()=>{
		this.setState({
			drawerOpen: !this.state.drawerOpen
		})
	}

	markRead = (idx)=>{
		let {notifications, unViewedNotifications} = this.state;
		//already viewed
		if(notifications[idx].viewed){
			return true;
		}

		let {notification, viewed, _id, date} = notifications[idx];
		if(date !== _id){
			// if not temp notification
			//change notification from unViewed to viewed
			this.socket.emit('view_notification', _id); 
		}
		notifications = [...notifications.slice(0, idx), {notification, viewed: !viewed}, ...notifications.slice(idx + 1)]
		this.setState({
			unViewedNotifications: unViewedNotifications - 1,
			notifications 
		})
	}

	render() {
		let {unViewedNotifications, notifications, drawerOpen} = this.state;
		return (
			<div className='app'>
				<Navbar  
					toggleDrawer={this.toggleDrawer}
					unViewedNotifications={unViewedNotifications}
					/>
				<NotificationDrawer 
					toggleDrawer={this.toggleDrawer}
					notifications={notifications}
					drawerOpen={drawerOpen}
					markRead={this.markRead}
					/>
			</div>
		)
	}
}
export default App;