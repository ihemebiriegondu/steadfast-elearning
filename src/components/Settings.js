import React from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import "../css/settings.css"
import { BiPlus } from 'react-icons/bi'

const Settings = () => {

    const { user } = useUserAuth();

    const changeProfilePhoto = () => {
        
    }

    return (
        <div className='settings'>
            <div>
                <div className='top-setting d-flex justify-content-center align-items-center py-4 px-4'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='img-div mb-2'>
                            <img src={user.photoURL} alt=''></img>
                        </div>
                        <div className='user-info-div'>
                            <h5 className='text-center pb-0 mb-0'>{user.displayName}</h5>
                            <p className='text-center'>{user.email}</p>
                        </div>
                        <div className='btn-div'>
                            <button>Change photo <BiPlus className='mb-1' onClick={changeProfilePhoto()} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings