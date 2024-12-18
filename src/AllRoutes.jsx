
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import FetchData from "./components/FetchData";

const AllRoutes=()=>{
    return(
       <div>
        <Routes>
      <Route path="/" element={ <Signup/>}/>
      <Route path="/products" element={   <FetchData/>}/>
    </Routes>
       </div>
    )
}

export default AllRoutes;