import { getSession, Session } from 'next-auth/react';

export const setSessionMessage = async (message: string) => {
    const session = await getSession();
    if (session) {
        session.message = message
    }
    // Attach the message to the session (if needed)
    // Note: Modify the session in your database or store as appropriate
};

export const getSessionMessage = async () => {
    const session = await getSession();
    return session?.message || '';
};

export const clearSessionMessage = async () => {
    const session = await getSession();
    if (session) {
        delete session.message; // Clear the message
        // Persist the session again if needed
    }
    // Clear the message in your session handling (e.g., update in DB or store)
};