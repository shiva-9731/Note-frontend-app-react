import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class User extends React.Component {
	constructor(){
		super()
		this.state = {
			users: []
		}
	}

	componentDidMount = () => {
		axios.get(`http://localhost:3001/users`)
			.then(response => {
				this.setState(() => ({
					users: response.data
				}))
			})
			.catch(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
				<h3>Listing users {this.state.users.length}</h3>
				<hr></hr>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>DOB</th>
								<th>Age</th>
								<th>Gender</th>
							</tr>
						</thead>
						<tbody>
							{this.state.users.map(user => {
								return <tr key={user._id}>
									<td><Link to={`/users/${user._id}`} >{user.name}</Link></td>
									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td>{user.dob}</td>
									<td>{user.age}</td>
									<td>{user.gender}</td>
								</tr>
							})}
						</tbody>
					</table>
				<hr></hr>	
					<Link to={`/users/new`}>Add User</Link>
				<hr></hr>
			</div>
		)
	}
}

export default User