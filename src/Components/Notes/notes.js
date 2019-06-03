import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class NotesList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			notes: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3001/notes')
			.then(response => {
				this.setState(() => ({
					notes: response.data
				}))
			})
			.catch(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
				<h3>Listing Notes : {this.state.notes.length}</h3>
				<hr></hr>
				<ul>
					{
						this.state.notes.map((note) =>
						{
							return <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link></li>
						})
					}
				</ul>
				<hr></hr>
				<Link to="/notes/new">Add Note</Link>
				<hr></hr>
			</div>
		)
	}
}

export default NotesList;