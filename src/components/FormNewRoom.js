'use client';
import { IconPhoto, IconPlus, IconX } from "@tabler/icons-react";
import FeaturesSelector from "./FeaturesSelector";
import { useEffect, useState } from "react";
import { useHotel } from "@/context/HotelContext";
import { toast } from "sonner";
import { createRoom } from "@/services/rooms.service";

export default function FormNewRoom ({ onClose }) {

    const { profile, addRoom } = useHotel();

    const [ form, setForm ] = useState({
        name: '',
        description: '',
        price: '',
        capacity: '',
        features: [],
        floor: 0,
        images: []
    })
    const [ floor, setFloor ] = useState(0);
    const [ previews, setPreviews ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const handleFloor = () => setFloor(floor + 1)

    const MAX_FILES = 5;

    const handleImagesChange = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        /*
        =========================
        LIMIT FILES
        =========================
        */

        const totalFiles = form.images.length + files.length;

        if (totalFiles > MAX_FILES) {

            return toast.warning('Límite alcanzado', {
                description: `Solo puedes subir máximo ${MAX_FILES} imágenes.`
            });

        }

        /*
        =========================
        VALID TYPES
        =========================
        */

        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/webp'
        ];

        const invalid = files.some(
            file => !allowedTypes.includes(file.type)
        );

        if (invalid) {

            return toast.warning('Alerta', {
                description: 'Solo se permiten imágenes PNG, JPG o WEBP.'
            });

        }

        /*
        =========================
        SAVE IMAGES
        =========================
        */

        setForm(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));

        /*
        =========================
        PREVIEWS
        =========================
        */

        const previewUrls = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setPreviews(prev => [
            ...prev,
            ...previewUrls
        ]);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.floor || !form.capacity) return toast.warning('Alerta', { description: 'Completa los campos obligatorios.' })
            try {
                setLoading(true);
                const data = await createRoom({hotelId: profile?.hotels.id, form})
                addRoom(data)
                toast.success('Se creó la habitación')
                onClose();
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
    }

    useEffect(() => {
        if (profile) {
            setFloor(profile.hotels.total_floors)
        }
    }, [profile])

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h3>Nueva habitación</h3>
                <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">Número de Piso</label>
                    <div className="w-full flex gap-xs">
                        <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={handleFloor}><IconPlus/></button>
                        {Array.from({length: floor}).map((_, i) => (
                            <button key={i} className={`w h center  rounded-full ${form.floor === i + 1 ? 'bg-primary text-white' : 'bg-surface'}`} style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={() => setForm(prev => ({...prev, floor: i+1}))}>{i+1}</button>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-xs font-medium mb-md" htmlFor="name">Nombre de habitación</label>
                    <input type="text" name="name" id="name" className="input rounded-md" placeholder="Nombre de habitación" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label className="block text-xs font-medium mb-md" htmlFor="description">Descripción de habitación</label>
                    <textarea name="description" id="description" className="textarea rounded-md" placeholder="Descripción de la habitación" onChange={handleChange} />
                </div>
                <div className="w-full flex gap-md">
                    <div className="w-full">
                        <label className="block text-xs font-medium mb-md" htmlFor="price">Precio por noche</label>
                        <input type="text" name="price" id="price" className="input rounded-md" placeholder="Precio por noche" onChange={handleChange} />
                    </div>
                    <div className="w-full">
                        <label className="block text-xs font-medium mb-md" htmlFor="capacity">Capacidad de habitación</label>
                        <input type="number" name="capacity" id="capacity" className="input rounded-md" placeholder="Capacidad de habitación" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">Características de habitación</label>
                    <FeaturesSelector value={form.features} onChange={(features) => setForm(prev => ({...prev, features}))} />
                </div>
                <div className="w-full">
                    <label className="block text-xs font-medium mb-md">Imágenes de la habitación</label>
                    <div className="w-full flex gap-md flex-wrap">
                        <label className="w h center bg-surface rounded-md pointer"htmlFor="imagesRoom" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}><IconPhoto/></label>
                        {previews.map((image, index) => (
                            <div key={index} className="w h relative rounded-md overflow-hidden border-surface" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                                <img src={image.url} alt="preview" className="w-full h-full" style={{objectFit: 'cover'}}/>
                                <button type="button" className="absolute top-0 right-0 w h center bg-black text-white" style={{"--w": "30px", "--mnw": "30px","--h": "30px"}}
                                    onClick={() => {
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
                                    }}
                                >
                                    <IconX size={16}/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <input type="file" id="imagesRoom" name="imagesRoom" accept=".png,.jpg,.jpeg,.webp" multiple hidden onChange={handleImagesChange} />
                </div>
                <div className="w-full">
                    <button className="btn btn-primary btn-md btn-block" disabled={loading} onClick={handleSubmit}>{loading ? 'Creando...' : 'Crear habitación'}</button>
                </div>
            </div>
        </>
    )
}