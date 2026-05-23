import { statusBooking } from "@/helpers/statusText";
import moment from "moment";

export default function RowBooking ({ row, onSelected, source='bookings' }) {
    return (
        <div className="w-full grid grid-6 h pointer" style={{"--h": "60px"}} onClick={() => onSelected(row)}>
            <div className="w-full h-full center">
                <span className="text-xs">{row?.code}</span>
            </div>
            <div className="w-full h-full center">
                <div className="flex gap-sm">
                    <p>
                        <span className="block text-sm font-medium">{row?.clients?.name}</span>
                        <span className="block text-xs">{row?.clients?.phone}</span>
                    </p>
                </div>
            </div>
            <div className="w-full h-full center">
                <span className="text-xs">{row?.rooms?.name}</span>
            </div>
            <div className="w-full h-full center">
                <span className="text-xs">{source === 'bookings' ? `s/. ${(row?.total).toFixed(2)}` : `${moment(row?.check_in).format('LL')} - ${moment(row?.check_out).format('LL')}`}</span>
            </div>
            <div className="w-full h-full center">
                <span className={`text-xs`}>{source === 'bookings' ? `${moment(row?.check_in).format('LL')}` : `${(row?.total).toFixed(2)}`}</span>
            </div>
            <div className="w-full h-full center">
                <span className={`text-xs`}>{source === 'bookings' ? `${moment(row?.check_out).format('LL')}` : `${statusBooking[row?.status]}`}</span>
            </div>
        </div>
    )
}