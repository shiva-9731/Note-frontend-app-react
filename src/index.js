import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"

//Note Routes
import NotesList from './Components/Notes/notes'
import NoteShow from './Components/Notes/show'
import NoteNew from './Components/Notes/new'
import NoteEdit from './Components/Notes/edit'

//Tag Routes
import TagsList from './Components/Tags/tags'
import TagShow from './Components/Tags/show'
import TagNew from './Components/Tags/new'
import TagEdit from './Components/Tags/edit'

//Category Routes
import Categories from './Components/Categories/categories'
import CategoryShow from './Components/Categories/show'
import CategoryNew from './Components/Categories/new'
import CategoryEdit from './Components/Categories/edit'

//User Routes
import UserList from './Components/Users/users'
import UserShow from './Components/Users/show'
import UserNew from './Components/Users/new'
import UserEdit from './Components/Users/edit'

//Login and Logout Routes
import UserLogin from './Components/Users/login'
import UserLogout from './Components/Users/logout'


class App extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			isAuthenticated: false
		}
	}

	handleAuth = (value) => {
		this.setState(() => ({
			isAuthenticated: value
		}))
	}

	render() {
		return(
			<Router>
				<div>
					<div className="container">
						<div className="container-fluid">
						<div className="navbar navbar-expand-sm bg-light navbar-light">
							<ul className="nav nav-pills">
								{
									this.state.isAuthenticated && 
									<div>
										<li className="nav-item btn "><Link to={`/notes`} >Notes</Link></li>  
										<li className="nav-item btn "><Link to={`/tags`} >Tags</Link></li>   
										<li className="nav-item btn "><Link to={`/Categories`} >Category</Link></li>  
										<li className="nav-item btn "><Link to={`/users`}>Users</Link></li>
										<li className="nav-item btn "><Link to={`/users/logout`}>Logout</Link></li>
									</div>
								}
								{
									!this.state.isAuthenticated &&
									<div>
										<li className="nav-item btn "><Link to={`/`}>Account</Link></li>  
										<li className="nav-item btn "><Link to={`/users/login`} >Login</Link></li>  
									</div>
								}
							</ul>
						</div>
						</div>

					<Switch>
						<Route path="/notes" component={NotesList} exact />
						<Route path="/notes/new" component={NoteNew} exact />
						<Route path="/notes/edit/:id" component={NoteEdit} exact/>
						<Route path="/notes/:id" component={NoteShow} exact />
	
						<Route path="/tags" component={TagsList} exact/>
						<Route path="/tags/new" component={TagNew} exact/>
						<Route path="/tags/edit/:id" component={TagEdit} exact />
						<Route path="/tags/:id" component={TagShow} exact />
	
						<Route path="/categories" component={Categories} exact/>
						<Route path="/categories/new" component={CategoryNew}  exact />
						<Route path="/categories/edit/:id" component={CategoryEdit} exact />
						<Route path="/categories/:id" component={CategoryShow} exact />	
	
						<Route path="/users" component={UserList} exact />
						<Route path="/users/new" component={UserNew} exact />
						<Route path="/users/edit/:id" component={UserEdit} exact />
						
						<Route path="/users/login" render={(props) => {
							return <UserLogin {...props} handleAuth={this.handleAuth} />
						}} exact/>
						
						<Route path="/users/logout" render={(props) => {
							return <UserLogout {...props} handleAuth={this.handleAuth} />
						}} exact/>

						<Route path="/users/:id" component={UserShow} exact />

					</Switch>
					</div>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'))