import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class UserShow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
	}

	removeUser = () => {
		axios.delete(`http://localhost:3001/users/${this.state.user._id}`)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.errors)
				}
				else{
					this.props.history.push(`/users`)
				}
			})
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/users/${id}`)
			.then(response => {
				this.setState(() => ({
					user: response.data
				}))
			})
			.then(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
				<h3>User : {this.state.user.name} {"-".repeat(5)}<button onClick={this.removeUser}>Delete</button>{"-".repeat(5)}<Link to={`/users/edit/${this.state.user._id}`} >Edit</Link></h3>
				<hr></hr>
				<label>
					Email: {this.state.user.email}
				</label><br/><br/>
				<label>
					Gender : {this.state.user.gender}
				</label><br/><br/>
				<label>
					DOB : {this.state.user.dob}
				</label><br/><br/>
				<label>
					Age : {this.state.user.age}
				</label><br/><br/>
				<label>
					Phone : {this.state.user.phone}
				</label>
				<hr></hr>
			</div>
		)
	}
}

export default UserShow