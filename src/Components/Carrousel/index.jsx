import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./carrousel.scss";
import nextArrow from "../../Assets/arrow/next.png";
import previousArrow from "../../Assets/arrow/previous.png";

function Carrousel({ pictures }) {
    const [currentPicture, setCurrentPicture] = useState(0);

    // useCallback stabilise l'identité de la fonction entre deux rendus.
    // Sans cela, elle serait recréée à chaque rendu et le useEffect qui en
    // dépend se réexécuterait à chaque fois.
    const changePicture = useCallback(
        (direction) => {
            if (pictures.length <= 1) return;
            setCurrentPicture((prev) =>
                direction === "next"
                    ? (prev + 1) % pictures.length
                    : (prev - 1 + pictures.length) % pictures.length
            );
        },
        [pictures.length]
    );

    // Si la liste d'images change (navigation d'un logement à un autre sans
    // démontage du composant), l'index courant peut pointer hors du tableau.
    useEffect(() => {
        setCurrentPicture(0);
    }, [pictures]);

    useEffect(() => {
        // Un carrousel à une seule image n'a pas de navigation : inutile
        // d'écouter le clavier globalement.
        if (pictures.length <= 1) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight") changePicture("next");
            else if (event.key === "ArrowLeft") changePicture("previous");
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
        // Tableau de dépendances explicite. Il était absent auparavant : le
        // nettoyage évitait l'accumulation d'écouteurs, mais l'écouteur était
        // retiré puis réinstallé à chaque rendu — un travail inutile, et
        // surtout un effet dont on ne savait plus dire quand il se déclenche.
    }, [changePicture, pictures.length]);

    if (!pictures || pictures.length === 0) return null;

    const hasNavigation = pictures.length > 1;

    return (
        <div className="carrousel">
            {hasNavigation && (
                // <button> et non <img onClick> : un bouton est atteignable au
                // clavier (Tab), déclenchable par Entrée et Espace, et annoncé
                // comme actionnable par un lecteur d'écran. Une image cliquable
                // n'offre aucune de ces trois choses.
                <button
                    type="button"
                    className="previous-arrow arrow-button"
                    onClick={() => changePicture("previous")}
                    aria-label="Image précédente"
                >
                    <img src={previousArrow} alt="" aria-hidden="true" />
                </button>
            )}

            <img
                className="picture"
                src={pictures[currentPicture]}
                alt={`Vue ${currentPicture + 1} sur ${pictures.length} du logement`}
                loading="lazy"
            />

            {hasNavigation && (
                <button
                    type="button"
                    className="next-arrow arrow-button"
                    onClick={() => changePicture("next")}
                    aria-label="Image suivante"
                >
                    <img src={nextArrow} alt="" aria-hidden="true" />
                </button>
            )}

            {hasNavigation && (
                // aria-live pour que le changement d'image soit annoncé :
                // sans cela, un utilisateur de lecteur d'écran clique sur
                // « suivante » sans aucun retour.
                <p className="numbers" aria-live="polite">
                    {currentPicture + 1} / {pictures.length}
                </p>
            )}
        </div>
    );
}

Carrousel.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carrousel;
