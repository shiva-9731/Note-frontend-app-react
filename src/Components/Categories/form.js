import React from 'react'

class CategoryForm extends React.Component {
	constructor(props){
		super()
		this.state = {
			name: ''
		}
	}

	nameHandle = (e) => {
		e.persist()
		this.setState(() => ({
			[e.target.name]: e.target.value			
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const formData = {
			name: this.state.name
		}
		this.props.handleSubmit(formData)
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState(() => ({
			name: nextProps.category.name
		}))
	}

	render(){
		return(
			<div><br/>
				<form onSubmit = {this.handleSubmit} >
					<label>
						Name : 
						<input type="text" name="name" onChange={this.nameHandle} value={this.state.name}/>
					</label>
					<br/><br/>
					<input type="submit" value=" Create Category " />
				</form>
			</div>
		)
	}
}

export default CategoryForm