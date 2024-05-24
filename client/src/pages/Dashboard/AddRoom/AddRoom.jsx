import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const AddRoom = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    // handle date range
    const handleDateRang = ranges => {
        setDates(ranges.selection)
    }
    // use mutation for post data on server
    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post('/room', roomData)
            return data
        },
        onSuccess: () => {
            navigate('/dashboard/my-listings')
            toast.success("Room added successfully")
            setLoading(false)
        }
    })
    // handle add room form submit
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate;
        const from = dates.startDate;
        const price = form.price.value;
        const guest = form.total_guest.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const bedrooms = form.bathrooms.value;
        const image = form.image.files[0];
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }
        try {
            const img_url = await imageUpload(image)
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                guest,
                bathrooms,
                description,
                bedrooms,
                price,
                host,
                image: img_url
            }
            // Post the room data on server
            await mutateAsync(roomData)
        } catch (error) {
            toast.error(error?.message)
            setLoading(false)
        }
    }
    const handleImageChange = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }
    return (
        <div>
            <Helmet>
                <title>Add Rooms</title>
            </Helmet>
            <AddRoomForm
                handleDateRang={handleDateRang}
                dates={dates}
                handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
                imagePreview={imagePreview}
                imageText={imageText}
                loading={loading}
            />
        </div>
    )
}

export default AddRoom