import React, { Component } from "react";
import './App.css';
import socketIOClient from "socket.io-client";


class App extends Component {
	constructor() {
		super();
		this.state = {
			notifications: [],
			unReadNotifications: 0,
			drawerOpen: false
		};
	}

	componentDidMount = () => {
		const socket = socketIOClient(process.env.REACT_APP_BACKEND_API_URL);
		socket.on('connection', ()=>{
			
		})
		socket.on('add_notification', (notification)=>{
			let {notifications, unReadNotifications} = this.state;
			notification.unRead = true;
			this.setState({
				notifications: [notification, ...notifications],
				unReadNotifications: unReadNotifications + 1
			})
		})
	}

	render() {
		return (
			<div className='app'>
			</div>
		)
	}
}
export default App;