import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";

const AddRoom = () => {
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    })
    // handle date range
    const handleDateRang = ranges => {
        setDates(ranges.selection)
    }
    return (
        <div>
            <AddRoomForm handleDateRang={handleDateRang} dates={dates} />
        </div>
    )
}

export default AddRoom