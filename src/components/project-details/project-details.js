import React from "react";
import "./project-details.scss";
import { useNavigate, useParams, } from "react-router-dom";
import { useEffect, useState } from "react";
import FullscreenImage from "../fullscreen-image/fullscreen-image";
import Error from "../error/error";
const ProjectDetails = ({data}) => {
  const [item,setItem]=useState(undefined);
  const [isLoading,setIsLoading]=useState(true);
  const { id } = useParams();
  
  useEffect(() => {
      setItem(data?.find((item) => {
          return item.name.toLowerCase().replace(' ','-') === id;
      }));
      setIsLoading(false);
  }, [data,id]);

  const navigate = useNavigate();
  const images = item?.images?.map((image, index) => {
    return (
      <FullscreenImage key={index}><img
          key={index}
          src={image}
          alt={item?.name}
          className="details__image"
        /></FullscreenImage>
      
    );
  })
  return data ? (<div className="details">
  <div className="details__wrapper">
    <div className="details__back" onClick={() => window.history.back()}>
      <i className="fas fa-arrow-left"></i>
      <span>Назад</span>
    </div> 
    <div className="details__container">
      <img src={item?.image} alt={item?.name} />
      <div className="details__text">
        <h1>{item?.name}</h1>
        <p>{item?.fullDescription}</p>
        <div className="details__tags">
          {
            item?.tags?.map((tag, index) => {
              return <span key={index} onClick={()=>navigate(`/?filter=${tag}`)}>{tag}</span>;
            })
          }
        </div>
       <div className="details__links">
        {item?.sourceURL ? (<a href={item.sourceURL}><i className="fa-brands fa-github"></i></a>) : null}
        {item?.figmaURL ? (<a href={item.figmaURL}><i className="fa-brands fa-figma"></i></a>) : null}
       </div>
        <a href={item?.url} className="btn">Переглянути</a>
      </div>
    </div>
    {item?.images.length >0 ? (<>
      <h2>Галерея</h2>
      <div className="details__gallery">
          {images}
      </div>
    </>) :null}
  </div>
</div>): isLoading ? <Error msg="Проєкт не знайдено" title="Помилка!"/> : '';
}
export default ProjectDetails;