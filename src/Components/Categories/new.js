import React from 'react'
import Form from './form'
import axios from 'axios'
class NewCategory extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}

	handleSubmit = (formData) => {
		axios.post(`http://localhost:3001/categories`, formData)
			.then(response => {
				if(response.data.hasOwnProperty('errors')){
					console.log(response.data.hasOwnProperty('errors'))
				}
				else{
					this.props.history.push(`/categories/${response.data._id}`)
				}
			})
	}

	render(){
		return(
			<div>
				<h3>
					New Category
					<Form handleSubmit={this.handleSubmit}/>
				</h3>
			</div>
		)
	}
}

export default NewCategory