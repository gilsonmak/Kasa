import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../Collapse/Collapse.scss";
import arrow from "../../Assets/arrow/down.png";


const Collapse = ({ collapseTitle, collapseDescription }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const contentRef = useRef(null);

  // Fonction pour inverser l'état d'ouverture du collapse
  const toggleCollapse = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    const content = contentRef.current;
    if (isOpen) {
      // Si le collapse est ouvert, on définit la hauteur maximale comme étant la hauteur du contenu
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      content.style.maxHeight = "0px";
    }
  }, [isOpen]); //useEffect sera déclenché à chaque fois que isOpen change

  return (
    <div className="collapse-container">
      {/* Conteneur du titre qui, lorsqu'il est cliqué, déclenche le basculement de l'état */}
      <div className="collapse-title-container" onClick={toggleCollapse}>
        <div className="collapse-title">
          {collapseTitle}
          {/* Image de la flèche qui change d'orientation en fonction de l'état isOpen */}
          <img
            src={arrow}
            alt="flêche"
            className={`arrow-icon ${isOpen ? "arrow-up" : "arrow-down"}`}
          />
        </div>
      </div>
      {/* Conteneur de la description du collapse, avec une référence pour ajuster la hauteur */}
      <div
        ref={contentRef}
        className={`collapse-description ${isOpen ? "open" : ""}`}
      >
        {collapseDescription}
      </div>
    </div>
  );
};

// Définition des prop types pour assurer que les bonnes propriétés sont passées au composant
Collapse.propTypes = {
  collapseTitle: PropTypes.string.isRequired,
  collapseDescription: PropTypes.node.isRequired, // Description du collapse, peut être n'importe quel noeud React
};

export default Collapse;