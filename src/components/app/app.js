import React,{useState , useEffect} from 'react';
import './app.scss';
import NavBar from '../nav-bar/nav-bar';
import ProjectList from '../project-list/project-list';
import ProjectDetails from '../project-details/project-details';
import { HashRouter, Routes,Route } from "react-router-dom";
import Error from '../error/error';
const App=()=> {
  const [data, setData] = useState(undefined);

  useEffect(() => {
        fetch("./data/data.json")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((err) => console.log(err));

    }, []);
  return (
    <div className="app">
     
        <HashRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<ProjectList data={data}/>} errorElement={<Error msg="Будь-ласка , перезавантажте сторінку" title="Помилка!"/>}/>
            <Route path="/projects/:id" element={<ProjectDetails data={data}/>}  errorElement={<Error msg="Будь-ласка , перезавантажте сторінку" title="Помилка!"/>}/>
            <Route path="*" element={<Error msg="Сторінку не знайдено" title="Помилка!"/>}/>
         </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
