import React from 'react'
import Banner from "../../Components/Banner/banner";
import Data from '../../Data/about.json';
import Collapse from '../../Components/Collapse/Collapse'
import "../AboutPage/AboutPage.scss"

const AboutPage = () => {
  return (
    <main>
      <Banner page = 'about' />
      <section className="collapse">
        {Data.map(({title, description}, index)=>(
          <Collapse key={`${title}-${index}`}
          collapseTitle={<h2 className='title-about'>{title}</h2>}
          collapseDescription={description}
          />
        ))}
      </section>
    </main>
  )
}

export default AboutPage