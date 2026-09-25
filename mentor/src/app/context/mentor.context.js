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

    const fetchPastEventsMentor = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/pastEventsMentos", {
                withCredentials: true,
            });

            console.log("Mentor past sessions:", response.data.sessions);

            const mappedSessions = (response.data.sessions || []).map(
            (session) => ({
                id: session.id,
                candidateId: session.candidateId,

                initials: session.candidateInitials,
                name: session.candidateName,
                role: session.candidateRole,

                topic: session.topic,
                date: session.date,
                duration: session.duration,

                earning: session.amount,
            })
            );
            setLoading(false);

            console.log("pasts", mappedSessions)

            setPastSessions(mappedSessions);

            return mappedSessions;
        } catch (error) {
            console.error(
            "Failed to fetch mentor past sessions:",
            error.response?.data || error.message
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchMentorSettings = async () => {

        try {
            setLoading(true);

            const response = await axios.get(
            "/api/settings",
            {
                withCredentials: true,
            }
            );

            console.log(
            "Current mentor settings:",
            response.data
            );
            setLoading(false);

            return response.data;

        } catch (error) {
            console.error(
            "Failed to fetch mentor settings:",
            error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };


    const updateMentorSettings = async (payload) => {
        try {
            setLoading(true);

            const response = await axios.put(
            "/api/settings",
            payload,
            {
                withCredentials: true,
            }
            );

            console.log(
            "Mentor settings updated:",
            response.data
            );
            setLoading(false);

            return response.data;
        } catch (error) {
            console.error(
            "Failed to update mentor settings:",
            error.response?.data || error.message
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <MentorContext.Provider value={{ Loading ,updateMentorSettings, fetchMentorSettings, pastSessions, registerMentor, fetchPastEventsMentor, bookedSessions,fetchAllUpcomingSessionsMentors}}>
        {children}
        </MentorContext.Provider>
    );
};

export default MentorContext;