import React from 'react'
import Form from './form'
import axios from 'axios'
class Edit extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			note: {}
		}
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/notes/${id}`)
			.then(response => {
				this.setState(() => ({
					note: response.data
				}))
			})
	}

	handleSubmit = (formdata) => {
		axios.put(`http://localhost:3001/notes/${this.state.note._id}`, formdata)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.errors)
				}else {
					this.props.history.push(`/notes`)
				}
			})
	}

	render(){
		return(
			<div>
				<h3>Edit Note {this.state.note.title}</h3>
				<Form handleSubmit = {this.handleSubmit} note={this.state.note} />
			</div>
		)
	}
}

export default Edit