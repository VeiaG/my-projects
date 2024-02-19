import React  from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./project-list.scss";
import Error from "../error/error";
const NoDataMsg = ()=>{
    return <Error msg="" title="Нічого не знайдено :("/>
}
const ProjectList = ({data}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const filters = searchParams.getAll('filter') || [];

    const tags = data?.reduce((acc,cur)=>{
        return acc.concat(cur.tags);
    },[]).filter((item,index,array)=>array.indexOf(item)===index);

    const addFilter = (tag)=>{
        searchParams.append('filter',tag);
        navigate(`?${searchParams.toString()}`);
    }
    const removeFilter = (tag)=>{  
        const newFilters = filters.filter(item=>item!==tag);
        searchParams.delete('filter');
        newFilters.forEach(item=>searchParams.append('filter',item));
        navigate(`?${searchParams.toString()}`);
    }
    const removeAllFilters = ()=>{
        searchParams.delete('filter');
        navigate(`?${searchParams.toString()}`);
    }

    const mappedData = data?.filter(item=>filters.length===0 || filters.every(tag=>item.tags.includes(tag)))?.map((item,index)=>{
        return(
            <div key={index} className='list__item' onClick={()=>navigate(`projects/${item.name.toLowerCase().replace(' ','-')}`)}>
               <div className="list__item-image">
                 <img src={item.image} alt={item.name}/>
               </div>
                <div className="list__item-text">
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <div className="list__item-tags">
                        {item?.tags?.map((tag,index)=>{
                            return <span key={index}>{tag}</span>
                        })}
                    </div>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>

            </div>
        )
    });

    return <div className="projects-list">
        <div className="tags">
        <div className="tags__wrapper">
            Фільтри: 
            {
                filters.length>0 && <span className="cancel" onClick={removeAllFilters}><i className="fa-solid fa-trash"></i></span>
            }
            {
                filters?.map((tag,index)=>{
                    return <span className="active" key={index}
                        onClick={()=>removeFilter(tag)}>{tag}<i className="fa-solid fa-xmark"></i></span>
                })
            }
            {
                tags?.filter((value)=>{return !filters.includes(value)})?.map((tag,index)=>{
                    return <span key={index}
                        onClick={()=> addFilter(tag)}>{tag}</span>
                })
            }
        </div>
    </div>
    <div className='list'>
         {(mappedData?.length ===0 ? (<NoDataMsg/>) : (
            <div className="list__wrapper">
                {mappedData}
            </div>
         ) )|| (<Error msg="Будь-ласка, перезавантажте сторінку" title="Виникла помилка!"/>)}
        
    </div>
    </div>
}
export default ProjectList;