import React from 'react'
import axios from 'axios'
import {Button } from 'react-bootstrap';

class UserLogin extends React.Component {
	constructor(){
		super()
		this.state = {
			email: "",
			password: "",
			token: "",
			errors: ""
		}
	}

	handleChange = (e) => {
		e.persist()
		this.setState(() => ({
			[e.target.name]: e.target.value
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post(`http://localhost:3001/users/login`, formData)
			.then(response => {
				if(response.data["x-auth"]){
					localStorage.setItem('authToken', response.data['x-auth'])
					this.props.handleAuth(true)
					this.props.history.push('/notes')
				}else{
					console.log(response)
					this.setState(() => ({
						errors: response.data
					}))		
				}
			})
	}

	render(){
		return(
			<div>
				<hr></hr>
				<form onSubmit={this.handleSubmit} >
					<div className="row">
						<div className="col-md-3"></div>						
						<div className="col-md-1">
							<label>Email </label>
						</div>
						<div className="col-md-3">
							<input type="text" name="email" placeholder="Enter Email" onChange={this.handleChange} className="form-control input-md" value={this.state.email}/> 
						</div>
						<div className="col-md-3">
							{this.state.errors}
						</div>
					</div>
					<br/>
					<div className="row">						
						<div className="col-md-3"></div>
						<div className="col-md-1">
							<label>Password </label>
						</div>
						<div className="col-md-3">
							<input type="text" name="password" placeholder="Enter Password" onChange={this.handleChange} className="form-control input-md" value={this.state.password}/>
						</div>
					</div>
					<br/>
					<div className="row">
						<div className="col-md-5"></div>
						<div className="col-md-3">
							<input type="submit" value="Login" className="btn btn-primary btn-sm" />
						</div>
					</div>
				</form>

				<label>
					
					Token : {this.state.token}
				</label>
				<hr></hr>
			</div>
		)
	}
}

export default UserLogin