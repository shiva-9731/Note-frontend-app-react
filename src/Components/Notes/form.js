import React from 'react'
import axios from 'axios'

class Form extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			title: '',
			body: '',
			category: '',
			categories: [],
			tags: [],
			selectedTags: []
		}
	}

	handleChange = (e) => {
		e.persist()
		this.setState(() => ({
			[e.target.name]: e.target.value			
		}))
	}

	handleTagSelection = (tag) => {
		this.setState(prevState => ({
			selectedTags: [...prevState.selectedTags, tag]
		}))
	}

	submitHandle = (e) => {
		e.preventDefault();
		const formData = {
			title: this.state.title,
			body: this.state.body,
			category: this.state.category,
			tags: this.state.selectedTags.map(tag => {
				return {tag: tag._id}
			})
		}
		this.props.handleSubmit(formData);
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState(() => ({
			title: nextProps.note.title,
			body: nextProps.note.body,
			category: nextProps.note.category._id,
			selectedTags: nextProps.note.tags
		}))
	}

	componentDidMount = () => {
		axios.get(`http://localhost:3001/categories`)
			.then((response) => {
				this.setState(() => ({
					categories: response.data
				}))
			})

		axios.get(`http://localhost:3001/tags`)
			.then((response) => {
				this.setState(() => ({
					tags: response.data
				}))
			})
	}

	render(){		


		return(
			<div>
				<h3>Form Goes here</h3>
				<form onSubmit={this.submitHandle}>
					<label>
						Category : <select name="category" value={this.state.category} onChange={this.handleChange}>
							<option value="">Select</option>
							{
								this.state.categories.map((category) => {
									return <option key={category._id} value={category._id}>{category.name}</option>
								})
							}
						</select>
					</label>
					<br/><br/>
					<label> 
						Title : <input name="title" type="text" onChange = {this.handleChange} value={this.state.title} />
					</label>
					<br/><br/>
					<label> 
						Body : <textarea name="body" onChange = {this.handleChange} value={this.state.body}></textarea>
					</label>

					<br/><br/>
						Tags : 	{
									this.state.tags.map(tag =>{
										return <label key={tag._id}>
											<input type="checkbox" value={tag.id} 
											onClick={() => {
												this.handleTagSelection(tag)
											}} /> {tag.name}</label>
									})
								}

					<br/><br/>

					<input type="submit" />
				</form>
			</div>
		)
	}
}

export default Form;


























