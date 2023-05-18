import React, { useContext} from "react"
import axios from "axios"


 const AppContext =  React.createContext()

 const AppProvider = ({children}) => {

const [currentUser, setCurrentUser] = React.useState(null)


const login = async (nesto) => {
const res = await axios.post("http://localhost:5500/api/auth/login", nesto, {withCredentials:true})
setCurrentUser(res.data)


}
const logout = async (inputs) => {
    await axios.post("http://localhost:5500/api/auth/logout");
    setCurrentUser(null);
   
  };

    return(<AppContext.Provider value ={{

        currentUser, login, logout

    }}>{children}</AppContext.Provider>)
 }

 export const useGlobalContext = () => {
    return useContext(AppContext)
 }

 export {AppContext, AppProvider}

