import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Category extends React.Component {
	constructor(){
		super()
		this.state = {
			categories: []
		}
	}

	componentDidMount = () => {
		axios.get(`http://localhost:3001/categories`)
			.then(response => {
				this.setState(() => ({
					categories: response.data
				}))
			})
			.catch(error => {
				console.log(error)
			})
	}


	render(){
		return(
			<div>
				<h3>
					Listing Categories {this.state.categories.length}
				</h3>
				<hr></hr>
				<ul>
					{
						this.state.categories.map((category) => {
							return <li key={category._id}><Link to={`/categories/${category._id}`}>{category.name}</Link></li>
						})
					}
				</ul>
				<hr></hr>
				<Link to ={"/categories/new"}>Add Category</Link>
				<hr></hr>
			</div>
		)
	}
}

export default Category