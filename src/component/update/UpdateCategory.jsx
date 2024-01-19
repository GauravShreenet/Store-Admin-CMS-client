import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { Button, Form } from 'react-bootstrap'
import { CustomInput } from '../custom-input/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCat, getACat, updateACat } from '../../pages/category/categoryAction'

export const UpdateCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id } = useParams();
    const [form, setForm] = useState({});

    const { selectedCat } = useSelector(state => state.catInfo);

    useEffect(()=>{
        if(_id !== form._id) {
           dispatch(getACat(_id))
           setForm(selectedCat) 
        }
    }, [_id, dispatch, selectedCat])

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to update this category?")) {
            const {_v, createdAt, updatedAt, slug, ...rest} = form
            dispatch(updateACat({...rest}))
        }        
    }

    


    const inputs = [
        {
            label: "Title",
            name: "title",
            placeholder: "Category Name",
            type: "text",
            required: true,
            value: form.title,
        },
        {
            label: "Slug",
            name: "slug",
            placeholder: "Category-Slug",
            type: "text",
            required: true,
            disabled: true,
            value: form.slug,
        },
    ]

  return (
    <AdminLayout title = "Update Category">
        <div>
            <Form 
            onSubmit={handleOnSubmit}
            className='my-2'
            >
                <h4>Update The Category</h4>
                <Form.Group className='mb-3'>
                    <Form.Select name='status' 
                     onChange={handleOnChange}
                    >
                        <option value="">--Select One--</option>
                        <option value="active" 
                        selected={form.status === 'active'}
                        >
                            Active{" "}</option>
                        <option value="inactive" 
                        selected={form.status === 'inactive'}
                        >
                            Inactive{" "}</option>
                    </Form.Select>
                </Form.Group>
                <hr />
                {
                    inputs.map((item, i)=> (<CustomInput key={i} {...item} onChange={handleOnChange} />))
                }
                
                <div className="d-grid mt-2">
                    <Button variant='warning' type='submit'>
                        {" "}
                        Update Category
                    </Button>
                </div>
            </Form>

            <div className="d-grid mb-2">
                <Button variant='danger'>
                    Delete Category
                </Button>
            </div>
        </div>
    </AdminLayout>
    
  )
}
