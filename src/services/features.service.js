import { db } from "@/lib/supabase/hotel";

export const getFeaturesAll = async () => {

    try {

        const { data, error } = await db
            .from('room_features')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });

        if (error) {
            throw error;
        }

        const grouped = data.reduce((acc, feature) => {

            const category = feature.category;

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(feature);

            return acc;

        }, {});

        return Object.entries(grouped).map(([category, items]) => ({
            category,
            items
        }));

    } catch (error) {
        console.error(error);
        return [];
    }
}