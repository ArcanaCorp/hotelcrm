'use client';
import { useHotel } from "@/context/HotelContext";
import { deleteClient } from "@/services/clients.service";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";

export default function RowClients ({ row, onEdit }) {

    const { profile, removeClient } = useHotel();

    const handleDelete = () => {
        toast.warning('Eliminar al cliente', {
            description: `¿Deseas eliminar a ${row.name}?`,
            action: {
                label: 'Eliminar',
                onClick: async () => {
                    const loadingToast = toast.loading('Eliminando cliente...');
                    try {
                        await deleteClient({hotelId: profile?.hotels.id, clientId: row.id});
                        removeClient(row.id)
                        toast.dismiss(loadingToast);
                        toast.success('Cliente eliminado', {description: `${row.name} fue eliminada correctamente.`});
                    } catch (error) {
                        console.error(error);
                        toast.dismiss(loadingToast);
                        toast.error('Error', {description: 'No se pudo eliminar al cliente.'});
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
        <div className="w-full grid grid-5 h" style={{"--h": "60px"}}>
            <div className="w-full h-full flex items-center text-sm px-md">
                <div className="flex items-center gap-sm">
                    <div className="w h rounded-full" style={{"--w": "40px", "--h": "40px"}}>
                        <img src={`https://ui-avatars.com/api/?name=${row.name}`} className="w-full h-full" />
                    </div>
                    <p className="block text-sm font-medium">{row.name}</p>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-center text-sm px-md">
                <span>{row.dni || row.passport}</span>
            </div>
            <div className="w-full h-full flex items-center justify-center text-sm px-md">
                <span>{row.phone || 'Sin información'}</span>
            </div>
            <div className="w-full h-full flex items-center justify-center text-sm px-md">
                <span>{row.email || 'Sin información'}</span>
            </div>
            <div className="w-full h-full flex items-center justify-center text-sm px-md">
                <div className="flex gap-sm">
                    <button className="w h center bg-surface rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={() => onEdit(row)}><IconPencil/></button>
                    <button className="w h center bg-surface rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={handleDelete}><IconTrash/></button>
                </div>
            </div>
        </div>
    )
}