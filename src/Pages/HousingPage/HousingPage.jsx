import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carrousel from "../../Components/Carrousel/index";
import Collapse from "../../Components/Collapse/Collapse";
import HousingData from "../../Data/logements.json";
import "./HousingPage.scss";
import Tag from "../../Components/Tag/index";
import Stars from "../../Components/Ratings/index";

const Housing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const data = HousingData.find(data => data.id === id);

    useEffect(() => {
        if (!data) {
            navigate("/*");
        }
    }, [data, navigate]);

    if (!data) {
        return <div>Loading...</div>; // Indicateur de chargement pendant la redirection
    }

    return (
        <main>
            <Carrousel pictures={data.pictures} />

            <div className="details">
                <div className="tag-title">
                    <div className="title">
                        <h1>{data.title}</h1>
                        <h2>{data.location}</h2>
                    </div>

                    <div className="tag-container">
                        {data.tags.map(tag => <Tag key={`${data.id}-${tag}`} tag={tag} />)}
                    </div>
                </div>

                <div className="stars-name">
                    <div className="host-name-picture">
                        <p className="host-name">{data.host.name}</p>
                        <img className="host-picture" src={data.host.picture} alt={data.host.name}/>
                    </div>

                    <div className="rating">
                        <Stars rating={data.rating} className="rating-star" />
                    </div>
                </div>
            </div>
                
                
            <div className="collapse-housing">
                <div className="description-housing">
                    <Collapse
                    collapseTitle={<h2 className="collapse-title">Description</h2>}
                    collapseDescription={<p className="collapse-description">{data.description}</p>} 
                    />
                </div>
                    
                <div className="equipments-housing">
                    <Collapse 
                    collapseTitle={<h2 className="collapse-title">Equipements</h2>}
                    collapseDescription={
                        <ul className="list-equipement">
                            {data.equipments.map((equipments, index) => (
                            <li key={`${index}-${equipments}`} className="equipements">{equipments}</li>
                        ))}
                        </ul>
                        }
                    />
                </div>
            </div>
            


        </main>
    );
}

export default Housing;