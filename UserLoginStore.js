import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { compareSync } from 'bcryptjs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { userLoginContextObj } from './userLoginContext'

function UserLoginStore({children}) {
  const [data,setData]=useState({});
  const getData=async()=>
  {
    let res=await axios.get(`http://localhost:5000/Recipes`);
    let userData=res.data;
    setData(userData);
  }
  useEffect(()=>{
    getData();
  }, []);
    let [currentUser,setCurrentUser]=useState({})
     let [error,setError] = useState('')
    let navigate = useNavigate()
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    async function onUserLogin(userCredObj){
        console.log(userCredObj)
        //make api call to verify cred
        let res = await axios.get(`http://localhost:5000/users?username=${userCredObj.username}`);
        console.log(res)
        let usersList=res.data
        console.log(usersList)
        //if user not existed
        if (usersList.length===0){
          setError("Invalid username")
        }
        //if username is matched, then compare password
        else{
          let result=compareSync(userCredObj.password,usersList[0].password)
          //if passwords not matched
          if(result===false){
            setError("Invalid password")
          }
          else{
            setCurrentUser(usersList[0])
            setUserLoginStatus(true)
            navigate('/Search',{state:usersList[0]})
          }
        }
      }

  return (
    <userLoginContextObj.Provider value={[currentUser,setCurrentUser,userLoginStatus,setUserLoginStatus]}>{children}
    </userLoginContextObj.Provider>
  )
}

export default UserLoginStore