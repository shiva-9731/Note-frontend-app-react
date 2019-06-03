import React from 'react'
import Form from './form'
import axios from 'axios'
class EditCategory extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			category: {},
			notes: []
		}
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		axios.get(`http://localhost:3001/categories/${id}`)
			.then(response => {
				// console.log(response)
				this.setState(() => ({
					category: response.data.category,
					notes: response.data.notes					
				}))
			})
	}

	handleSubmit = (formData) => {
		axios.put(`http://localhost:3001/categories/${this.state.category._id}`, formData)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.errors)
				}else {
					this.props.history.push(`/categories/${this.state.category._id}`)
				}
			})
	}

	render(){
		return(
			<div>
				<h2>Edit Categrory {this.state.category.name}</h2>
				<Form handleSubmit={this.handleSubmit} category={this.state.category}/>
			</div>
		)
	}
}

export default EditCategory