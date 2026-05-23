import { cssStatus, statusBooking } from "@/helpers/statusText";
import moment from "moment";

export default function RowBooking ({ row, onSelected }) {
    return (
        <div className="w-full grid grid-6 h pointer" style={{"--h": "60px"}} onClick={() => onSelected(row)}>
            <div className="w-full h-full center">
                <span className="text-xs">{row?.code}</span>
            </div>
            <div className="w-full h-full center">
                <span className="text-xs">{row?.clients?.name}</span>
            </div>
            <div className="w-full h-full center">
                <span className="text-xs">{row?.rooms?.name}</span>
            </div>
            <div className="w-full h-full center">
                <span className="text-xs">{`${moment(row?.check_in).format('LL')} - ${moment(row?.check_out).format('LL')}`}</span>
            </div>
            <div className="w-full h-full center">
                <span className={`text-xs`}>S/. {(row?.total).toFixed(2)}</span>
            </div>
            <div className="w-full h-full center">
                <span className={`flex text-xs px-sm py-md rounded-full ${cssStatus[row?.status]}`}>{statusBooking[row?.status]}</span>
            </div>
        </div>
    )
}