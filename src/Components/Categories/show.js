import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class ShowCategory extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			category: {},
			notes: []
		}
	}

	removeCategory = () => {
		const id = this.props.match.params.id
		axios.delete(`http://localhost:3001/categories/${id}`)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.errors)
				}
				else{
					this.props.history.push(`/categories`)
				}
			})
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/categories/${id}`)
			.then(response => {
				this.setState(() => ({
					category: response.data.category,
					notes: response.data.notes
				}))
			})
			.catch(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
				<h2>
					Category : {this.state.category.name}
				</h2>
				<hr></hr>
					<button onClick={this.removeCategory}>Delete</button><Link to={`/categories/edit/${this.props.match.params.id}`}>Edit</Link>
				<hr></hr>
				<h4>List of Notes</h4>
				<table className="table" border="1%">
					<thead>
						<tr>
							<th>Name</th>
							<th>Body</th>
						</tr>
					</thead>
					<tbody>
						{this.state.notes.map((note) => {
							return <tr key={note._id }>
								<td>
									{note.title}
								</td>
								<td>{note.body}</td>
							</tr>
						})}
					</tbody>
				</table>
				<hr></hr>
			</div>
		)
	}
}

export default ShowCategory
