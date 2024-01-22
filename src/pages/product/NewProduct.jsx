import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { Button, Form } from 'react-bootstrap'
import { CustomInput } from '../../component/custom-input/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCats } from '../category/categoryAction'
import { postNewProduct } from './productAction'
import { Link } from 'react-router-dom'

const NewProduct = () => {

    const dispatch = useDispatch();
    const [form, setForm] = useState({})


    const { catList } = useSelector((state) => state.catInfo);

    useEffect(()=> {
        dispatch(getAllCats());
    }, [dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(postNewProduct(form))
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const input = [
        {
            label: 'Product Name',
            name: 'name',
            required: true,
            placeholder: 'Nike AirMax',
        },
        {
            label: 'SKU',
            name: 'sku',
            required: true,
            placeholder: 'N-AM20',
        },
        {
            label: 'Quantity',
            name: 'qty',
            required: true,
            type: "number",
            placeholder: '120',
        },
        {
            label: 'Price',
            name: 'price',
            required: true,
            type: "number",
            placeholder: '220',
        },
        {
            label: 'Sales Price',
            name: 'salesPrice',
            default: "0",
            type: "number",
            placeholder: '120',
        },
        {
            label: 'Sales Start Date',
            name: 'salesStartDate',
            type: "date",
            placeholder: '2024-01-12',
        },
        {
            label: 'Sales End Date',
            name: 'salesEndDate',
            type: "date",
            placeholder: '2024-01-12',
        },
        {
            label: 'Description',
            name: 'description',
            required: true,
            as: "textArea",
            rows: "5",
            placeholder: "Enter the description"
            
        },
    ]
  return (
    <AdminLayout>
        <Link to="/product"><Button variant='secondary'>&lt; Back </Button></Link>
        <div className="text-center">
            Add New Product
        </div>
        <hr />
        <Form 
        onSubmit={handleOnSubmit} 
        className="m-auto border rounded shadow-lg p-4 my-5" style={{width: '600px'}}>
            <h3>New Product</h3>
            {/* make category available to select */}

            <Form.Group className='mb-3'>
                <Form.Label>Select Category</Form.Label>
                <Form.Select name="parentCatId" onChange={handleOnChange}>
                    <option value="">-- Select --</option>
                    {
                        catList.map((item, i)=> (<option key={item._id} value={item._id}>{item.title}</option>
                        ))
                    }
                    
                </Form.Select>
            </Form.Group>

            {
                input.map((item, i)=>(<CustomInput key={i} {...item} 
                    onChange={handleOnChange}
                    />))
            }

            <div className="d-grid">
                <Button type="submit">
                    Add Product
                    </Button>
            </div>
        </Form>
    </AdminLayout>
  )
}

export default NewProduct