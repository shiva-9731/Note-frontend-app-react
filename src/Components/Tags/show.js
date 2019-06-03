import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Show extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			tag: {}
		}
	}

	handleRemove = () => {
		axios.delete(`http://localhost:3001/tags/${this.state.tag._id}`)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.errors)
				}
				else{
					this.props.history.push(`/tags`)
				}
			})
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/tags/${id}`)
			.then(response => {
				this.setState(() => ({
					tag: response.data
				}))
			})
			.catch(error => {
				// console.log(error)
			})
	}

	render(){
		return(
			<div>
				<br/>
				<h2>Tag : {this.state.tag.name && this.state.tag.name[0].toUpperCase() + this.state.tag.name.slice(1)}</h2>
				<hr></hr>
					<button onClick={this.handleRemove}>Delete</button><Link to={`/tags/edit/${this.props.match.params.id}`} >Edit</Link> 
				<hr></hr>
				<h4>List of Notes</h4>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
							{this.state.tag.notes && this.state.tag.notes.map(note => {
								return 	<tr key={note._id}><td>{note.note && note.note._id}</td><td>{note.note && note.note.title}</td></tr>
							})}
					</tbody>
				</table>
				<hr></hr>
			</div>
		)
	}
}

export default Show