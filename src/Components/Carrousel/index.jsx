import React, { useState, useEffect } from "react";
import "./carrousel.scss";
import nextArrow from "../../Assets/arrow/next.png";
import previousArrow from "../../Assets/arrow/previous.png";

function Carrousel({ pictures }) {
    // État pour suivre l'image actuelle affichée dans le carrousel
    const [currentPicture, setCurrentPicture] = useState(0);

    // Fonction pour changer l'image affichée
    function changePicture(direction) {
        if (direction === "next") {
            // Si la direction est "next", on passe à l'image suivante
            // Si on est à la dernière image, on retourne à la première (grâce au modulo)
            setCurrentPicture((prevPicture) => (prevPicture + 1) % pictures.length);
        } else if (direction === "previous") {
            // Si la direction est "previous", on passe à l'image précédente
            // Si on est à la première image, on retourne à la dernière
            setCurrentPicture((prevPicture) => 
                prevPicture === 0 ? pictures.length - 1 : prevPicture - 1
            );
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Si la touche droite est pressée, on passe à l'image suivante
            if (event.key === "ArrowRight") {
                changePicture("next");
            // Si la touche gauche est pressée, on passe à l'image précédente
            } else if (event.key === "ArrowLeft") {
                changePicture("previous");
            }
        };

        // Ajouter un écouteur d'événement pour les touches du clavier
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, ); 

    return (
        <div className="carrousel">
            {/* Afficher les flèches de navigation seulement si il y a plus d'une image */}
            {pictures.length > 1 && (
                <img
                    className="previous-arrow arrow-img"
                    src={previousArrow}
                    alt="Précédente"
                    onClick={() => changePicture("previous")}
                    aria-label="Image précédente"
                />
            )}

            {/* Afficher l'image actuelle */}
            <img
                className="picture"
                src={pictures[currentPicture]}
                alt={`Slide ${currentPicture + 1}`} // Décrit l'image actuelle
                loading="lazy" // Améliore la performance en chargeant l'image seulement quand nécessaire
            />

            {/* Afficher les flèches de navigation seulement si il y a plus d'une image */}
            {pictures.length > 1 && (
                <img
                    className="next-arrow arrow-img"
                    src={nextArrow}
                    alt="Suivante"
                    onClick={() => changePicture("next")}
                    aria-label="Image suivante" 
                />
            )}

            {/* Afficher le compteur seulement si il y a plus d'une image */}
            {pictures.length > 1 && (
                <p className="numbers">
                    {currentPicture + 1} / {pictures.length} {/* Affiche la position actuelle et le nombre total d'images */}
                </p>
            )}
        </div>
    );
}

export default Carrousel;