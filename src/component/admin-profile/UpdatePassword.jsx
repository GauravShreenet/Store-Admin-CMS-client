import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { CustomInput } from '../custom-input/CustomInput';
import { toast } from 'react-toastify';
import { updatePassword } from '../../helper/axiosHelper';

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
}

export const UpdatePassword = () => {

    const [form, setForm] = useState(initialState)

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        //apply strong password

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleOnPasswordUpdate = async(e) => {
        e.preventDefault();
        const {confirmPassword, ...rest } = form;
        if(confirmPassword !== rest.newPassword) {
            return toast.error("Password doesnt match")
        }

        //call api
        const pending = updatePassword(rest)
        toast.promise(pending , {
            pending: "Please wait..."
        })

        const { status, message } = await pending
        toast[status](message) && setForm(initialState);
        
    }

    const inputs = [
        {
          label: 'Current Password',
          name: 'oldPassword',
          required: true,
          type: "password",
          placeholder: 'XXXXXXXXXXX',
    
        },
        {
          label: 'New Password',
          name: 'newPassword',
          required: true,
          type: "password",
          placeholder: 'XXXXXXXXXXX',
    
        },
        {
          label: 'Confirm Password',
          name: 'confirmPassword',
          required: true,
          type: "password",
          placeholder: 'XXXXXXXXXXX',
    
        },
      ]
  return (
    <div><Form 
    onSubmit={handleOnPasswordUpdate} 
    className="m-auto border rounded shadow-lg p-4 mt-5" style={{ width: '600px' }}>
      {
        inputs.map((item, i) => (<CustomInput key={i} {...item} onChange={handleOnChange}/>))
      }
      <div className="d-grid">
        <Button type="submit" variant='danger'>Update password</Button>
      </div>
    </Form></div>
  )
}
