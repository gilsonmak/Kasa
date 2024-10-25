import React from 'react'
import "./error.scss"
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <main className='error-main'>
      <p className="error-404">404</p>
      <p className="error-message">Oups! La page que vous cherchez n'existe pas.</p>
      <Link className='link' to="/">Retourner sur la page d'accueil</Link>
    </main>
  )
}

export default Error