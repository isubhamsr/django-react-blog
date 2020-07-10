import React from 'react'
import { Route } from 'react-router-dom'
import ArticleListView from './containers/ArticleListView'
import ArticleDetails from './containers/ArticleDetailsView'

export default function BaseRoute() {
    return (
        <div>
            <Route exact path="/" component={ArticleListView} />
            <Route path="/:articleId" component={ArticleDetails} />
        </div>
    )
}
