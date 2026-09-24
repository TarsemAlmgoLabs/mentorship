'use client'
import { createContext, useState } from "react";
import axios from 'axios'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [mentors, setMentors] = useState([])
    const [Loading, setLoading] = useState(false);
    const [bookedSessions, setBookedSessions] = useState([])
    const [pastSessions, setPastSessions] = useState([]);

    const fetchAllMentos = async()=>{
        setLoading(true);
        const response = await axios.get(
        `/api/allMentors`,
        {
            withCredentials: true,
        }
        );
        setMentors(mentors=> response.data.mentors);
        setLoading(false);
        console.log(response.data);
    }

    const bookMentor = async (data) => {
        setLoading(true);

        try {
            const payload = {
            candidateId: '6a3b62c917b1afdc92752da1',
            mentorId: data.mentorId,

            mentor: {
                name: data.mentor.name,
                role: data.mentor.role,
                company: data.mentor.company,
                initials: data.mentor.initials,
            },

            topic: data.topic,

            sessionDate: data.sessionDate,
            sessionTime: data.sessionTime,

            duration: data.duration,

            amount: data.amount,
            };

            console.log(payload)

            const response = await axios.post(
            "/api/appointments",
            payload,
            {
                withCredentials: true,
            }
            );

            console.log("Appointment created:", response.data);

            // success ke baad redirect
            if (response.data?.success) {
            window.location.href = "/dashboard";
            }
            setLoading(false);

            return response.data;

        } catch (error) {
            setLoading(false);

            console.log(error);

            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

                alert(errorMessage);

                console.error("Appointment creation failed:", errorMessage);

                throw error;
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
        <UserContext.Provider value={{ fetchAllMentos, pastSessions,fetchPastSessions, mentors ,bookedSessions, bookMentor, Loading, fetchAllUpcomingSessions}}>
        {children}
        </UserContext.Provider>
    );
};

export default UserContext;