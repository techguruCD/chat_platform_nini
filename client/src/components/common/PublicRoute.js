import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PublicRoute = ({ component: Component, auth, ...rest }) => {
    return <>
        {
            true ? <Component {...rest} /> : <Redirect to="/login" />
        }
    </>
}

export default PublicRoute