import { useState, useRef, useEffect, useId } from "react";
import PropTypes from "prop-types";
import "../Collapse/Collapse.scss";
import arrow from "../../Assets/arrow/down.png";

const Collapse = ({ collapseTitle, collapseDescription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  // Identifiants uniques et stables, nécessaires pour relier le bouton au
  // panneau qu'il contrôle (aria-controls / aria-labelledby).
  const contentId = useId();
  const buttonId = useId();

  const toggleCollapse = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : "0px";
  }, [isOpen]);

  return (
    <div className="collapse-container">
      {/*
        <button> à la place du <div onClick> précédent.
        Un div cliquable n'est pas atteignable au clavier, ne réagit ni à
        Entrée ni à Espace, et n'est annoncé ni comme un bouton ni avec son
        état ouvert/fermé. aria-expanded communique cet état, aria-controls
        indique quel élément le bouton pilote.
      */}
      <button
        type="button"
        id={buttonId}
        className="collapse-title-container"
        onClick={toggleCollapse}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="collapse-title">
          {collapseTitle}
          <img
            src={arrow}
            alt=""
            aria-hidden="true"
            className={`arrow-icon ${isOpen ? "arrow-up" : "arrow-down"}`}
          />
        </span>
      </button>

      <div
        id={contentId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        // Le contenu replié reste dans le DOM pour que l'animation de hauteur
        // fonctionne. aria-hidden le retire malgré tout de l'arbre
        // d'accessibilité : sans cela, un lecteur d'écran lit du texte que
        // l'utilisateur voyant ne voit pas.
        // `hidden` serait plus strict mais supprimerait l'animation ; le
        // contenu n'étant que du texte, il n'y a pas d'élément focalisable
        // à neutraliser ici.
        aria-hidden={!isOpen}
        className={`collapse-description ${isOpen ? "open" : ""}`}
      >
        {collapseDescription}
      </div>
    </div>
  );
};

Collapse.propTypes = {
  collapseTitle: PropTypes.string.isRequired,
  collapseDescription: PropTypes.node.isRequired,
};

export default Collapse;
