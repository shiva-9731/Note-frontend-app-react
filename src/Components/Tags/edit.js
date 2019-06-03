import React from 'react'
import axios from 'axios'
import Form from './form'
class EditTag extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			tag: {}
		}
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/tags/${id}`)
			.then(response => {
				this.setState(() => ({
					tag: response.data
				}))
			})
	}

	handleSubmit = (formdata) => {
		const id = this.props.match.params.id
		axios.put(`http://localhost:3001/tags/${id}`, formdata)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){

				}
				else{
					this.props.history.push(`/tags/${id}`)
				}
			})
	}


	render(){
		return(
			<div>
				<p>Edit Tag : {this.state.tag.name}</p>
				<Form handleSubmit={this.handleSubmit} tag={this.state.tag} />
			</div>
		)
	}
}

export default EditTag