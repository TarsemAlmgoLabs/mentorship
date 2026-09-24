'use client'
import { createContext, useState } from "react";
import axios from 'axios'

const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
    const [mentors, setMentors] = useState([])
    const [Loading, setLoading] = useState(false);
    const [bookedSessions, setBookedSessions] = useState([])
    const [pastSessions, setPastSessions] = useState([]);

    const registerMentor = async (payload) => {
        try {
            setLoading(true);

            const response = await axios.post(
            "/api/mentors",
            payload,
            {
                withCredentials: true,
            }
            );

            console.log("Mentor registered:", response.data);

            return response.data;

        } catch (error) {
            console.error(
            "Mentor registration failed:",
            error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    const fetchAllUpcomingSessions = async()=>{
        try{
            setLoading(true);
    
            const response = await axios.get("/api/allUpcomingUserSessions", {
                withCredentials: true,
            });
    
            console.log(response.data.sessions);
            const bookedSessionsMap = response.data.sessions.map((session) => ({
                initials: session.initials,
                name: session.name,
                role: session.role,
                company: session.company,
                topic: session.topic,
                date: session.date,
                time: session.time,
                duration: session.duration,
                status: session.status,
            }));
            setLoading(true);
    
            setBookedSessions(bookedSessions=> bookedSessionsMap)
        }catch(error){
            console.error(
            "Failed to fetch past sessions:",
            error.response?.data || error.message
            );
        }
    }

    const fetchPastSessions = async () => {
        try {
            const response = await axios.get(
            "/api/allPastSessionsUser",
            {
                withCredentials: true,
            }
            );

            const mappedSessions = response.data.sessions.map((session) => ({
            initials: session.initials,
            name: session.name,
            role: session.role,
            company: session.company,
            topic: session.topic,
            date: session.date,
            time: session.time,
            duration: session.duration,
            }));

            setPastSessions(mappedSessions);

        } catch (error) {
            console.error(
            "Failed to fetch past sessions:",
            error.response?.data || error.message
            );
        }
        };

    return (
        <MentorContext.Provider value={{ registerMentor,fetchAllUpcomingSessions, fetchPastSessions}}>
        {children}
        </MentorContext.Provider>
    );
};

export default MentorContext;