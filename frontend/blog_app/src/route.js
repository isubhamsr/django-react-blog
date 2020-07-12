import React from 'react'
import { Route } from 'react-router-dom'
import ArticleListView from './containers/ArticleListView'
import ArticleDetails from './containers/ArticleDetailsView'
import CustomForm from './components/CreateUpdateForm'
import Signup from './components/Signup'
import Signin from './components/Signin'

export default function BaseRoute() {
    return (
        <div>
            <Route exact path="/" component={ArticleListView} />
            <Route path="/post/:articleId" component={ArticleDetails} />
            <Route path="/create" component={CustomForm} />
            <Route path="/post/update/:articleId" component={CustomForm} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
        </div>
    )
}
