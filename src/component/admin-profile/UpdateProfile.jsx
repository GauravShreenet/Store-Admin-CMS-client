import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap';
import { CustomInput } from '../custom-input/CustomInput';
import { getUserProfile } from '../../pages/profile/userAction';
import { updateProfile } from '../../helper/axiosHelper';
import { toast } from 'react-toastify';

export const UpdateProfile = () => {

    const dispatch = useDispatch();

    const { admin } = useSelector(state => state.adminInfo);

    const [form, setForm] = useState({});

    useEffect(()=>{
        setForm(admin)
    }, [admin])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
        console.log(form)
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        const {email, ...rest} = form;
        const pending = updateProfile(rest);
        toast.promise(pending, {
            pending: "Please Wait..."
        })

        const { status, message } = await pending
        toast[status](message)

    }

    const inputs = [
        {
            label: 'First Name',
            name: 'fName',
            required: true,
            placeholder: 'John',
            type: "text",
            value: form.fName,
        },
        {
            label: 'Last Name',
            name: 'lName',
            required: true,
            placeholder: 'Wick',
            type: "text",
            value: form.lName,
        },
        {
            label: 'Email',
            name: 'email',
            required: true,
            disabled: true,
            placeholder: 'John@email.com',
            type: "text",
            value: form.email,
        },
        {
            label: 'Phone',
            name: 'phone',
            placeholder: '040989087',
            type: "text",
            value: form.phone,
        },
        {
            label: 'Address',
            name: 'address',
            placeholder: '1 george st, Sydney',
            type: "text",
            value: form.address,
        },
    ]

  return (
    <div>
        <Form
        onSubmit={handleOnSubmit}
        className='m-auto border rounded shadow-lg p-4 my-4' style={{width: '600px'}}>
            {
                inputs.map((item, i) => (<CustomInput key={i} {...item} onChange={handleOnChange}/>))
            }
            <div className="d-grid">
                <Button type="submit" variant="danger">
                    Update Profile
                </Button>
            </div>
        </Form>
    </div>
  )
}
