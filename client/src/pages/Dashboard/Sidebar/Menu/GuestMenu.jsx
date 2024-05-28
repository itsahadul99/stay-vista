import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import HostRequestModal from '../../../../components/HostRequestModal/HostRequestModal'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useState } from 'react'

const GuestMenu = () => {
  const {user} = useAuth()
  const [role] = useRole()
  const [isHostModal, setIsHostModal] = useState(false)
  const axiosSecure = useAxiosSecure()
  const closeModal = () => {
    setIsHostModal(false)
  }
  const handleHostModal = async () => {
    try {
      const userInfo = {
        email: user?.email,
        role: 'guest',
        status: 'Requested'
      }
      const { data } = await axiosSecure.put(`${import.meta.env.VITE_API_URL}/user`, userInfo)
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation')
      } else {
        toast.error('Please, wait for admin approval👊👊')
      }
    } catch (error) {
      toast.error(error?.message)
    } finally {
      closeModal()
    }
  }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

      { role === 'guest' && <div onClick={() => setIsHostModal(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />
        <span className='mx-4 font-medium'>Become A Host</span>
      </div>}
      <HostRequestModal isOpen={isHostModal} closeModal={closeModal} handleHostModal={handleHostModal} />
    </>
  )
}

export default GuestMenu