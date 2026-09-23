'use client'
import { createContext, useState } from "react";
import axios from 'axios'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [mentors, setMentors] = useState([])
    const fetchAllMentos = async()=>{
        const response = await axios.get(
        `/api/allMentors`,
        {
            withCredentials: true,
        }
        );
        setMentors(mentors=> response.data.mentors);
        console.log(response.data);
    }
    return (
        <UserContext.Provider value={{ fetchAllMentos, mentors }}>
        {children}
        </UserContext.Provider>
    );
};

export default UserContext;