import React from 'react'
import axios from 'axios'
import Form from './form'

class NewTag extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			errors: []
		}
	}

	submitHandle = (formData) => {
		axios.post(`http://localhost:3001/tags`, formData)
			.then(response => { 
				console.log(response)
				if(response.data.hasOwnProperty('errors')){
					this.setState(() => ({
						errors: response.data.errors
					}))
				}else{
					this.props.history.push(`/tags/${response.data._id}`)
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
				<h3>New Tag</h3>
				<Form submitHandle={this.submitHandle}/>
			</div>
		)
	}
}

export default NewTag