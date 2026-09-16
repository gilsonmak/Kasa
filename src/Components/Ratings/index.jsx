import React from "react";
import PropTypes from "prop-types";
import starGrey from "../../Assets/ratings/starGrey.png";
import starRed from "../../Assets/ratings/starRed.png";
import "./ratings.scss";

const MAX_RATING = 5;

/**
 * Affiche une note sous forme d'étoiles.
 *
 * Deux corrections d'accessibilité par rapport à la version précédente :
 *
 * 1. Les cinq images portaient chacune alt="rating". Un lecteur d'écran
 *    annonçait donc « rating rating rating rating rating », ce qui ne
 *    transmet pas la note. Les images sont maintenant décoratives (alt vide)
 *    et l'information est portée une seule fois par le conteneur.
 *
 * 2. Le composant renvoyait un tableau nu. Il renvoie désormais un élément
 *    qui peut porter le rôle et le libellé accessible.
 */
export default function Stars({ rating }) {
  const value = Math.max(0, Math.min(MAX_RATING, Number(rating) || 0));

  return (
    <div
      className="ratings"
      role="img"
      aria-label={`Note : ${value} sur ${MAX_RATING}`}
    >
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <img
          key={index}
          src={index < value ? starRed : starGrey}
          alt=""
          aria-hidden="true"
          className="rating-star"
        />
      ))}
    </div>
  );
}

Stars.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
