import React from 'react'
import axios from 'axios'

class Logout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			token: ""
		}
	}

	componentDidMount = () => {
		const authToken = localStorage.getItem('authToken')
		axios.delete(`http://localhost:3001/users/logout`, {headers: {'x-auth' : authToken}})
			.then(response => {
				this.props.handleAuth(false)
				localStorage.removeItem('authToken')
				this.props.history.push('/users/login')
			})
			.catch(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
			</div>
		)
	}
}

export default Logout