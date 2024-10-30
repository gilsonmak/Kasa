import React from 'react'
import Banner from "../../Components/Banner/banner";
import aboutData from '../../Data/about.json';
import Collapse from '../../Components/Collapse/Collapse'
import "../AboutPage/AboutPage.scss"

const AboutPage = () => {
  const renderCollapseItems = () => 
    aboutData.map(({ title, description }, index) => (
      <Collapse
        key={`about-item-${index}`}
        collapseTitle={<h2 className='title-about'>{title}</h2>}
        collapseDescription={description}
      />
    ));

  return (
    <main className="about-page">
      <Banner page='about' />
      <section className="collapse-section">
        {renderCollapseItems()}
      </section>
    </main>
  )
}

export default AboutPage