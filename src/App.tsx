import {Route, Routes} from "react-router-dom";
import HomeController from "./view/home/controller.tsx";

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<HomeController/>}/>
        </Routes>
  )
}

export default App
