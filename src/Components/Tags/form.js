import React from 'react'

class TagFrom extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: ""
		}
	}

	nameHandle = (e) => {
		console.log(e.target.name)
		e.persist()
		this.setState(() => ({
			[e.target.name]: e.target.value
		}))
	}

	submitHandle = (e) => {
		e.preventDefault()
		const formData = {
			name: this.state.name
		}
		this.props.submitHandle(formData)
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState(() => ({
			name: nextProps.tag.name
		}))
	}

	render(){
		return(
			<div>
				<form id="submit" onSubmit={this.submitHandle}>
					<label>Name :  
						<input type="text" name="name" onChange={this.nameHandle} value={this.state.name} />
					</label>
					<br/><br/>
					<input type="submit" name="submit" value="Submit" />
				</form>
			</div>
		)
	}
}

export default TagFrom;