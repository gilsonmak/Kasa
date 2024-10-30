import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../Collapse/Collapse.scss";
import arrow from "../../Assets/arrow/down.png";

// Composant Collapse qui prend deux props : collapseTitle et collapseDescription
const Collapse = ({ collapseTitle, collapseDescription }) => {
  // État pour gérer l'ouverture/fermeture du collapse
  const [isOpen, setIsOpen] = useState(false);
  
  // Référence pour accéder directement à l'élément DOM du contenu
  const contentRef = useRef(null);

  // Fonction pour basculer l'état d'ouverture du collapse
  const toggleCollapse = () => {
    setIsOpen(prevState => !prevState);
  };

  // Effet pour ajuster la hauteur du contenu en fonction de l'état d'ouverture
  useEffect(() => {
    const content = contentRef.current;
    if (isOpen) {
      // Si ouvert, définir la hauteur maximale à la hauteur du contenu
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      // Si fermé, réduire la hauteur à 0
      content.style.maxHeight = "0px";
    }
  }, [isOpen]); // L'effet se déclenche chaque fois que isOpen change

  return (
    <div className="collapse-container">
      {/* Conteneur du titre, cliquable pour ouvrir/fermer le collapse */}
      <div className="collapse-title-container" onClick={toggleCollapse}>
        <div className="collapse-title">
          {collapseTitle}
          {/* Icône de flèche qui tourne en fonction de l'état d'ouverture */}
          <img
            src={arrow}
            alt="flêche"
            className={`arrow-icon ${isOpen ? "arrow-up" : "arrow-down"}`}
          />
        </div>
      </div>
      {/* Conteneur du contenu du collapse, avec animation de hauteur */}
      <div
        ref={contentRef}
        className={`collapse-description ${isOpen ? "open" : ""}`}
      >
        {collapseDescription}
      </div>
    </div>
  );
};

// Validation des types de props
Collapse.propTypes = {
  collapseTitle: PropTypes.string.isRequired, // Le titre doit être une chaîne de caractères
  collapseDescription: PropTypes.node.isRequired, // La description peut être n'importe quel nœud React
};

export default Collapse;