import React from 'react'
import axios from 'axios'

class UserEdit extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: "",
			age: "",
			email: "",
			phone: "",
			gender: "",
			dob: ""
		}
	}

	handleChange = (e) => {
		e.persist()
		this.setState(() => ({
			[e.target.name]: e.target.value			
		}))
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/users/${id}`)
			.then(response => {
				this.setState(() => ({
					name: response.data.name,
					email: response.data.email,
					phone: response.data.phone,
					gender: response.data.gender,
					dob: response.data.dob,
					age: response.data.age
				}))
			})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const formData = {
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone,
			gender: this.state.gender,
			dob: this.state.dob,
			age: this.state.age
		}

		axios.put(`http://localhost:3001/users/${this.props.match.params.id}`, formData)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.errors)
				}
				else {
					this.props.history.push(`/users/${response.data._id}`)
				}
			})
	}

	render(){
		return(
			<div>
				<h3>Edit User</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name : <input type="text" name="name" onChange={this.handleChange} value = {this.state.name} />
					</label><br/><br/>
					<label>
						Email : <input type="text" name="email" onChange={this.handleChange} value = {this.state.email} />
					</label><br/><br/>
					<label>
						Phone : <input type="text" name="phone" value = {this.state.phone} onChange={this.handleChange} />
					</label><br/><br/>
					<label>
						Gender : <input type="text" name="gender" value = {this.state.gender} onChange={this.handleChange} />
					</label><br/><br/>
					<label>
						DOB : <input type="text" name="dob" value = {this.state.dob} onChange={this.handleChange} />
					</label><br/><br/>
					<label>
						Age : <input type="text" name="age" value = {this.state.age} onChange={this.handleChange} />
					</label><br/><br/>	
					<input type="submit" value="Create User" />
				</form>
			</div>
		)
	}
}

export default UserEdit