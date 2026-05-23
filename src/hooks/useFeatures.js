import { getFeaturesAll } from "@/services/features.service";
import { useState } from "react"

export const useFeatures = () => {

    const [ features, setFeatures ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const getFeatures = async () => {
        try {
            setLoading(true);
            const data = await getFeaturesAll();
            setFeatures(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        features,
        loading,
        getFeatures
    }

}