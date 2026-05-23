'use client';

import { useEffect, useMemo, useState } from "react";
import { IconPhoto, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { toast } from "sonner";

import FeaturesSelector from "./FeaturesSelector";
import { updateRoomService } from "@/services/rooms.service";
import { useHotel } from "@/context/HotelContext";

export default function FormEditRoom ({ room, onClose }) {

    const { updateRoom, profile } = useHotel();
    const [ form, setForm ] = useState({
        name: '',
        description: '',
        price: '',
        capacity: '',
        features: [],
        floor: 1,
        images: []
    });

    const [existingImages, setExistingImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [floor, setFloor] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!room) return;

        setForm({
            name: room.name || '',
            description: room.description || '',
            price: room.price || '',
            capacity: room.capacity || '',
            floor: room.floor || 1,
            features: room.room_feature_assignments?.map( item => item.room_features ) || [],
            images: []
        });

        setExistingImages(room.room_images || []);

        setFloor(room.floor || 1);

    }, [room]);

    const handleFloor = () => setFloor(prev => prev + 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const MAX_FILES = 5;

    const totalImages = useMemo(() => {
        return existingImages.length + previews.length;
    }, [existingImages, previews]);

    const handleImagesChange = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        if ((totalImages + files.length) > MAX_FILES) return toast.warning('Límite alcanzado', {description: `Solo puedes subir máximo ${MAX_FILES} imágenes.`});

        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/webp'
        ];

        const invalid = files.some(file => !allowedTypes.includes(file.type));

        if (invalid) return toast.warning('Archivo inválido', {description: 'Solo se permiten imágenes PNG, JPG y WEBP.'});

        setForm(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));

        const newPreviews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setPreviews(prev => [
            ...prev,
            ...newPreviews
        ]);

    };


    const handleRemoveExistingImage = (imageId) => setExistingImages(prev => prev.filter(image => image.id !== imageId) );

    const handleRemovePreview = (index) => {

        const updatedPreviews = previews.filter(
            (_, i) => i !== index
        );

        const updatedImages = form.images.filter(
            (_, i) => i !== index
        );

        setPreviews(updatedPreviews);

        setForm(prev => ({
            ...prev,
            images: updatedImages
        }));

    };


    const handleSubmit = async () => {

        try {
            setLoading(true);
            const update = await updateRoomService({hotelId: profile?.hotels.id, roomId: room.id, form: form})
            updateRoom(update)
            toast.success('Habitación actualizada');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Error', {description: error.message});
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h3>Editar habitación {form.name}s</h3>
                <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
            </div>

            <div className="w-full flex flex-col gap-md">
                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">Número de Piso</label>
                    <div className="w-full flex gap-xs">
                        <button className="w h center bg-surface rounded-full" style={{ "--w": "40px", "--mnw": "40px", "--h": "40px" }} onClick={handleFloor}><IconPlus/></button>
                        {Array.from({ length: floor }).map((_, i) => (
                            <button
                                key={i}
                                className={`w h center rounded-full ${
                                    form.floor === i + 1
                                        ? 'bg-primary text-white'
                                        : 'bg-surface'
                                }`}
                                style={{
                                    "--w": "40px",
                                    "--mnw": "40px",
                                    "--h": "40px"
                                }}
                                onClick={() =>
                                    setForm(prev => ({
                                        ...prev,
                                        floor: i + 1
                                    }))
                                }
                            >
                                {i + 1}
                            </button>

                        ))}

                    </div>
                </div>

                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">
                        Nombre de habitación
                    </label>

                    <input
                        type="text"
                        name="name"
                        className="input rounded-md"
                        value={form.name}
                        placeholder="Nombre de habitación"
                        onChange={handleChange}
                    />
                </div>

                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">
                        Descripción
                    </label>

                    <textarea
                        name="description"
                        className="textarea rounded-md"
                        value={form.description}
                        placeholder="Descripción"
                        onChange={handleChange}
                    />
                </div>

                <div className="w-full flex gap-md">

                    <div className="w-full">
                        <label className="block text-xs font-medium mb-md">
                            Precio
                        </label>

                        <input
                            type="number"
                            name="price"
                            className="input rounded-md"
                            value={form.price}
                            placeholder="Precio"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-xs font-medium mb-md">
                            Capacidad
                        </label>

                        <input
                            type="number"
                            name="capacity"
                            className="input rounded-md"
                            value={form.capacity}
                            placeholder="Capacidad"
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">
                        Características
                    </label>

                    <FeaturesSelector
                        value={form.features}
                        onChange={(features) =>
                            setForm(prev => ({
                                ...prev,
                                features
                            }))
                        }
                    />
                </div>

                <div className="w-full">

                    <label className="block text-xs font-medium mb-md">
                        Imágenes
                    </label>

                    <div className="w-full flex gap-md flex-wrap">

                        {totalImages < MAX_FILES && (
                            <label
                                htmlFor="imagesRoom"
                                className="w h center bg-surface rounded-md pointer"
                                style={{
                                    "--w": "120px",
                                    "--mnw": "120px",
                                    "--h": "120px"
                                }}
                            >
                                <IconPhoto/>
                            </label>
                        )}

                        {existingImages.map((image) => (

                            <div
                                key={image.id}
                                className="w h relative rounded-md overflow-hidden border-surface"
                                style={{
                                    "--w": "120px",
                                    "--mnw": "120px",
                                    "--h": "120px"
                                }}
                            >

                                <img
                                    src={image.url}
                                    alt="room"
                                    className="w-full h-full"
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                />

                                <button
                                    type="button"
                                    className="absolute top-0 right-0 w h center bg-black text-white"
                                    style={{
                                        "--w": "30px",
                                        "--mnw": "30px",
                                        "--h": "30px"
                                    }}
                                    onClick={() =>
                                        handleRemoveExistingImage(image.id)
                                    }
                                >
                                    <IconTrash size={16}/>
                                </button>
                            </div>
                        ))}
                        {previews.map((image, index) => (
                            <div key={index} className="w h relative rounded-md overflow-hidden border-surface" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                                <img src={image.url} alt="preview" className="w-full h-full" style={{objectFit: 'cover'}}/>
                                <button type="button" className="absolute top-0 right-0 w h center bg-black text-white" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={() => handleRemovePreview(index)}><IconX size={16}/></button>
                            </div>
                        ))}
                    </div>
                    <input type="file" id="imagesRoom" accept=".png,.jpg,.jpeg,.webp" multiple hidden onChange={handleImagesChange}/>
                </div>
                <div className="w-full">
                    <button className="btn btn-primary btn-md btn-block" disabled={loading} onClick={handleSubmit}>{loading ? 'Actualizando...' : 'Actualizar habitación'}</button>
                </div>

            </div>
        </>
    );

}