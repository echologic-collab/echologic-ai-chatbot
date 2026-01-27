import { createAuthClient } from '@neondatabase/neon-js/auth';

// Ensure the environment variable is set
const authUrl = import.meta.env.VITE_NEON_AUTH_URL;

if (!authUrl) {
    console.warn("Missing VITE_NEON_AUTH_URL environment variable. Auth will not work correctly.");
}

export const authClient = createAuthClient(authUrl || "http://localhost:3000");
