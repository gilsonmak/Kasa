import React from 'react'
import "./banner.scss"
import backgroundHome from '../../Assets/banner/BannerHome.png';
import backgroundAbout from '../../Assets/banner/BannerAbout.png'

const Banner = ({ page }) => {
  const bannerConfig = {
    home: {
      className: 'banner-home',
      imageSrc: backgroundHome,
      imageAlt: 'vue sur mer',
      title: 'Chez vous, partout et ailleurs',
    },
    about: {
      className: 'banner-about',
      imageSrc: backgroundAbout,
      imageAlt: 'vue sur montagne',
      title: null,
    },
  };

  const renderBannerImage = (config) => (
    <div className="banner-container">
      <img 
        src={config.imageSrc} 
        className='banner-image' 
        alt={config.imageAlt} 
        title={config.imageAlt} 
      />
    </div>
  );

  const renderBannerTitle = (config) => (
    config.title && page === 'home' && (
      <div className="banner-container">
        <h1 className="banner-title">{config.title}</h1>
      </div>
    )
  );

  const currentConfig = bannerConfig[page] || bannerConfig.home;

  return (
    <section className={currentConfig.className}>
      {renderBannerImage(currentConfig)}
      {renderBannerTitle(currentConfig)}
    </section>
  );
}

export default Banner