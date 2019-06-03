import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom' 

class TagList extends React.Component {
	constructor(){
		super()
		this.state = {
			tags: []
		}
	}

	componentDidMount = () => {
		axios.get(`http://localhost:3001/tags`)
			.then(response => {
				this.setState(() => ({
					tags: response.data
				}))
			})
			.catch(error => {
				console.log(error)
			})
	}

	render(){
		return(
			<div>
				<h3>Listing Tags: {this.state.tags.length}</h3>
				<hr></hr>
				<ul>
					{this.state.tags.map(tag => {
						return <li key={tag._id}><Link to={`/tags/${tag._id}`}>{tag.name}</Link></li>
					})}
				</ul>
				<hr></hr>
					<Link to="/tags/new">Add Tag</Link>
				<hr></hr>

			</div>
		)
	}
}

export default TagList