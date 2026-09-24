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


    const fetchAllUpcomingSessionsMentors = async()=>{
          try {
            setLoading(true);

            const response = await axios.get("/api/mentors", {
                withCredentials: true,
            });

            console.log("Mentor sessions:", response.data.sessions);
            const mappedSessions = (response.data.sessions || []).map(
                (session) => ({
                    id: session.id,
                    candidateId: session.candidateId,
                    initials: session.candidateInitials,
                    name: session.candidateName,
                    role: session.candidateRole,
                    topic: session.topic,
                    date: session.date,
                    time: session.time,
                    duration: session.duration,
                    sessionLink: session.sessionLink,
                    status: session.status,
                    mentorId: session.mentorId,
                })
                );

            setBookedSessions(mappedSessions || []);

            return response.data;
        } catch (error) {
            console.error(
            "Failed to fetch mentors:",
            error.response?.data || error.message
            );

            throw error;
        } finally {
            setLoading(false);
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
        <MentorContext.Provider value={{ registerMentor, bookedSessions,fetchAllUpcomingSessionsMentors, fetchPastSessions}}>
        {children}
        </MentorContext.Provider>
    );
};

export default MentorContext;