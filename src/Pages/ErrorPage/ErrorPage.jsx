import React from 'react'
import "./ErrorPage.scss"
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
   <div className='error'>
    <h1 className='error-404'>404</h1>
    <p className='error-message'>Oups! La page que vous demandez n'existe pas.</p>
    <Link to="/" className='link'>Retourner sur la page d'acceuil</Link>
   </div>
  )
}

export default ErrorPage