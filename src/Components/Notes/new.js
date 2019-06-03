import React from 'react'
import Form from './form'
import axios from 'axios'

class NewNote extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			serverErrors: [] 
		}
	}

	handleSubmit = (formdata) => {
		axios.post(`http://localhost:3001/notes`, formdata)
			.then(response => {
				console.log(response.data)
				if(response.data.hasOwnProperty('errors')){
					this.setState(() => ({
						serverErrors: response.data.errors
					}))
				}else{

					this.props.history.push(`/notes`)
				}
			})
	}

	render(){
		return(
			<div>
				<h3>Add Note</h3>
				<Form handleSubmit={this.handleSubmit}/>
			</div>
		)
	}
}

export default NewNote;