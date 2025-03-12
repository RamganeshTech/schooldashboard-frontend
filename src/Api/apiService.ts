import axios from 'axios';
import { useEffect } from 'react';

// Function to check authentication
const checkAuthentication = async () => {
    try {
        const response = await axios.get('/api/auth/check', { withCredentials: true });
        return response.data; // Contains authentication status
    } catch (error) {
        console.error('Authentication check failed:', error);
        return { authenticated: false }; // Return false if there’s an error
    }
};

// Example usage in a component
useEffect(() => {
    const checkAuth = async () => {
        const authStatus = await checkAuthentication();
        console.log('Is authenticated:', authStatus.authenticated);
        // You can now use authStatus.authenticated to control route access
    };

    checkAuth();
}, []);
