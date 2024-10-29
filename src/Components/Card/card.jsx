import React from 'react'
import "./card.scss"
import { Link } from 'react-router-dom'
import Housing from '../../Data/logements.json';

const Card = () => {
  return (
    <div className='cards'>
        {Housing.map((data)=>(
            <div key={data.id}>
                <Link to={`/housing/${data.id}`}>
                    <div className="housing">
                        <img src={data.cover} alt={data.title} />
                        <h2>{data.title}</h2>
                    </div>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Card