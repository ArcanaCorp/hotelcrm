'use client';

import { useHotel } from "@/context/HotelContext";
import { roomFeatures } from "@/db/features";
import { IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export default function FeaturesSelector({ value = [], onChange }) {

    const { features } = useHotel();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFeature, setSelectedFeature] = useState('');

    const categories = useMemo(() => {
        return features.map(item => item.category);
    }, [features]);

    const filteredFeatures = useMemo(() => {

        if (!selectedCategory) return [];

        const categoryData = features.find(
            item => item.category === selectedCategory
        );

        return categoryData?.items || [];

    }, [selectedCategory, features]);

    const handleAddFeature = (featureId) => {
        if (!featureId) return;

        const feature = filteredFeatures.find(
            item => item.id === featureId
        );

        if (!feature) return;

        const exists = value.some(
            item => item.id === feature.id
        );

        if (exists) return;

        onChange([...value, feature]);

        setSelectedFeature('');
    }

    const handleRemoveFeature = (featureId) => {
        const updated = value.filter(
            item => item.id !== featureId
        );

        onChange(updated);
    }

    return (

        <div className="w-full flex flex-col gap-md">
            {value.length > 0 && (
                <div className="w-full flex flex-wrap gap-sm">
                    {value.map(feature => (
                        <div key={feature.id} className="flex items-center gap-sm px-md py-sm rounded-full bg-black text-white">
                            <span className="text-sm">{feature.name}</span>
                            <button type="button" onClick={() => handleRemoveFeature(feature.id)} className="center">
                                <IconX size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="w-full flex gap-md">
                <select className="input rounded-md" value={selectedCategory} 
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedFeature('');
                    }}
                >
                    <option value="">Selecciona categoría</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select className="input rounded-md" disabled={!selectedCategory} value={selectedFeature}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedFeature(value);
                        handleAddFeature(value);
                    }}
                >
                    <option value="">Selecciona característica</option>
                    {filteredFeatures.map(feature => (
                        <option key={feature.id} value={feature.id}>{feature.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}