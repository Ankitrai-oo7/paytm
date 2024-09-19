import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users(){
       // code will replace with backend call
        const [users,setUsers]= useState([]);
        const [filter ,setFilter] = useState()

        // we  can add debouncing here
        useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
                 .then(response=>{
                    setUsers(response.data.user);
                 })
        },[filter])

        return <div>
        <div className="font-bold mt-6 ml-2 text-lg">
        Users
        </div>
        <div className="my-2 mx-2 ">
        <input onChange={e=>{
          setFilter(e.target.value)
        }} type="text" placeholder="Search users" 
        className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
        <div>
         {users.map(user =><User user={user}/>)}
        </div>
        </div>
}

function User({user}){

     const navigate= useNavigate()
        return <div className="flex justify-between">
        <div className="flex">
        <div className="rounded-full flex justify-center h-10 w-10 bg-slate-300 mt-1">
          <div className="flex flex-col justify-center h-full text-xl">
               {user.firstName[0]}
        </div>
        </div>
        <div className="flex flex-col justify-center h-full ml-2">
             {user.firstName} {user.lastName}
        </div>
        </div>
        <div className="flex flex-col justify-center mt-1 mr-5">
        <Button onClick={e=>{
          navigate('/sendmoney?id='+ user._id + "&name=" + user.firstName)
        }} label={"Send Money"}/>
        </div>
        </div>
}