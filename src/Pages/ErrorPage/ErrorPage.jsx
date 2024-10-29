import React from 'react'
import "./ErrorPage.scss"
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error-main'>
      <h1 className="error-404">404</h1>
      <p className="error-message">Oups! La page que vous cherchez n'existe pas.</p>
      <Link className='link' to="/">Retourner sur la page d'accueil</Link>
    </div>
  )
}

export default ErrorPage