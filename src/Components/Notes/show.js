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
		axios.get(`http://localhost:3001/notes/${id}`, {headers: {'x-auth' : localStorage.getItem('authToken')}})
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

	handleRemoveTag = (tagId) => {
		const noteId = this.state.note._id
		axios.delete(`http://localhost:3001/notes/remove?noteId=${noteId}&tagId=${tagId}`)
			.then(response => {
				console.log(response.data)
			})
			.catch(error => {
				console.log(error)
			})
	}
	render() {
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
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
							{this.state.note.tags && this.state.note.tags.map(tagItem => {
								return 	<tr key={tagItem._id}><td>{tagItem && tagItem.tag._id}</td><td>{tagItem.tag.name}</td><td><button onClick={ () => this.handleRemoveTag(tagItem._id)} className="btn btn-primary btn-sm">X</button></td></tr>
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