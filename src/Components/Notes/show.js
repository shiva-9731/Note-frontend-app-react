import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Show extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			note: {}
		}
	}

	componentDidMount = () => {
		const id = this.props.match.params.id;
		axios.get(`http://localhost:3001/notes/${id}`)
			.then(response => {
				this.setState(() => ({
					note: response.data
				}))
			})
			.catch(error => {
				console.log(error)
			})
	}

	handleRemove = () => {
		const id = this.props.match.params.id;
		const confirmRemove = window.confirm('Are you sure?')
		if(confirmRemove){
			axios.delete(`http://localhost:3001/notes/${id}`)
				.then(response => {
					this.props.history.push('/notes')
				})
		}
	}
	render() {
		console.log(this.state.note.tags)
		return(
			<div>
				<h2>Title : {this.state.note.title}</h2>
				<span>Category : {this.state.note.category && this.state.note.category.name}</span><br/><br/>
				<button onClick={this.handleRemove}>Delete</button><Link to={`/notes/edit/${this.props.match.params.id}`}>edit</Link>
				<hr></hr>
				<p>Body : {this.state.note.body}</p>
				<hr></hr>
				<h4>List of Tags</h4>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
							{this.state.note.tags && this.state.note.tags.map(note => {
								return 	<tr key={note._id}><td>{note && note._id}</td><td>{note && note.name}</td></tr>
							})}
					</tbody>
				</table>
				<hr></hr>

				<Link to="/notes">Back</Link>
			</div>
		)
	}
}

export default Show;