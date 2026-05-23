import { useHotel } from "@/context/HotelContext";
import { cssStatusRoom, statusRoom } from "@/helpers/statusText";
import { deleteRoom } from "@/services/rooms.service";
import { IconDoor, IconPencil, IconTrash, IconUser } from "@tabler/icons-react";
import { toast } from "sonner";

export default function CardRoom ({ room, onEdit }) {

    const { profile, removeRoom } = useHotel();

    const image = room.room_images.find((rimage) => rimage.is_cover === true);

    const handleDelete = () => {
        if (room.status === 'occupied') return toast.warning('Habitación ocupada', { description: `La habitación "${room.name}" actualmente está ocupada y no puede eliminarse.`});
        toast.warning('Eliminar habitación', {
            description: `¿Deseas eliminar la habitación "${room.name}"?`,
            action: {
                label: 'Eliminar',
                onClick: async () => {
                    const loadingToast = toast.loading('Eliminando habitación...');
                    try {
                        await deleteRoom({hotelId: profile?.hotels.id, roomId: room.id});
                        removeRoom(room.id)
                        toast.dismiss(loadingToast);
                        toast.success('Habitación eliminada', {description: `${room.name} fue eliminada correctamente.`});
                    } catch (error) {
                        console.error(error);
                        toast.dismiss(loadingToast);
                        toast.error('Error', {description: 'No se pudo eliminar la habitación.'});
                    }
                }
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => {}
            }
        });
    };

    return (
        <div className="w-full bg-white border-surface rounded-md overflow-hidden">
            <div className="relative w-full h bg-surface" style={{"--h": "180px"}}>
                <span className={`absolute block rounded-full text-sm px-sm ${cssStatusRoom[room.status]}`} style={{"top": "10px", "right": "10px"}}>{statusRoom[room.status]}</span>
                {room.room_images.length > 0 ? (
                    <img src={`${image.url}`} width={100} height={100} />
                ) : (
                    <img src={`https://img.freepik.com/fotos-premium/habitaciones-hotel-modernas-elegantes_1417-8488.jpg`} width={100} height={100} />
                )}
            </div>
            <div className="w-full flex flex-col gap-md p-md">
                <div className="w-full flex items-center justify-between">
                    <h4 className="text-2xl font-bold">{room.name}</h4>
                </div>
                <p className="text-nowrap font-medium">S/ {(room.price).toFixed(2)} / por noche</p>
                <div className="w-full flex items-center gap-md">
                    <p className="flex items-center text-sm gap-sm"><IconUser size={18}/> {room.capacity} personas</p>
                    <p className="flex items-center text-sm gap-sm"><IconDoor size={18}/> {room.floor} piso</p>
                </div>
                <div className="w-full flex gap-md items-center">
                    <button className="w-full h flex items-center justify-center gap-md text-sm rounded-md bg-surface" style={{"--h": "50px"}} onClick={() => onEdit(room)}><IconPencil/> Editar</button>
                    <button className="w h center rounded-md bg-danger text-white" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}} onClick={handleDelete}><IconTrash/></button>
                </div>
            </div>
        </div>
    )
}