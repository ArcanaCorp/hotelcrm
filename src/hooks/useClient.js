import { getClientsAll } from "@/services/clients.service";
import { useState } from "react"

export const useClient = () => {

    const [ clients, setClients ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    const getClients = async (hotelId) => {
        if (!hotelId) return;
        try {
            setLoading(true);
            const data = await getClientsAll(hotelId);
            setClients(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const addClient = (newClient) => setClients(prev => [...prev, newClient]);

    const updateClient = (updatedClient) => setClients(prev => prev.map(client => client.id === updatedClient.id ? { ...client, ...updatedClient } : client ) );

    const removeClient = (clientId) => setClients(prev =>prev.filter(client => client.id !== clientId));

    return {
        clients,
        loading,
        getClients,
        addClient,
        updateClient,
        removeClient
    }

}