import React from 'react'
import { Route } from 'react-router-dom'
import ArticleListView from './containers/ArticleListView'
import ArticleDetails from './containers/ArticleDetailsView'
import CustomForm from './components/CreateUpdateForm'

export default function BaseRoute() {
    return (
        <div>
            <Route exact path="/" component={ArticleListView} />
            <Route path="/post/:articleId" component={ArticleDetails} />
            <Route path="/create" component={CustomForm} />
            <Route path="/post/update/:articleId" component={CustomForm} />
        </div>
    )
}
