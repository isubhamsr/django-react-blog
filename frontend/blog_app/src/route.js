import React from 'react'
import { Route } from 'react-router-dom'
import ArticleListView from './containers/ArticleListView'
import ArticleDetails from './containers/ArticleDetailsView'
import CustomForm from './components/CreateUpdateForm'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Search from './components/Search'
import About from './containers/About'
import Contact from './containers/Contact'


export default function BaseRoute() {
    return (
        <div>
            <Route exact path="/" component={ArticleListView} />
            <Route path="/post/:slug/" component={ArticleDetails} />
            <Route path="/create/" component={CustomForm} />
            <Route path="/post/update/:articleId/" component={CustomForm} />
            <Route path="/signup/" component={Signup} />
            <Route path="/signin/" component={Signin} />
            <Route path="/search/:query/" component={Search} />
            <Route path="/about/" component={About} />
            <Route path="/contact/" component={Contact} />
        </div>
    )
}
