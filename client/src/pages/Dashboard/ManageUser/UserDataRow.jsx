import PropTypes from 'prop-types'
import { useState } from 'react';
import UpdateUserModal from '../../../components/UpdateUserModal/UpdateUserModal';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()
  const {user: loggedInUser} = useAuth()
  const { mutateAsync } = useMutation({
    mutationFn: async (updateInfo) => {
      const { data } = await axiosSecure.patch(`/user/update/${user?.email}`, updateInfo)
      return data
    },
    onSuccess: () => {
      refetch()
      toast.success('Successfully update user role')
      setIsOpen(false)
    }
  })
  // modal handler 
  const modalHandler = async (selected) => {
    const user = {
      role: selected,
      status: 'Verified'
    }
    try {
      await mutateAsync(user)
    } catch (error) {
      toast.error(error?.message);
    }
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
              } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button disabled={(loggedInUser?.email === user?.email)}title={loggedInUser?.email === user?.email && "You can not change your own role"} onClick={() => setIsOpen(true)} className=' disabled:cursor-not-allowed relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} modalHandler={modalHandler} user={user} />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow