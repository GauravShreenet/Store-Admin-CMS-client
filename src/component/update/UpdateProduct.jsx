import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { Button, Form } from 'react-bootstrap'
import { CustomInput } from '../custom-input/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAProduct } from '../../pages/product/productAction'
import { getAllCats } from '../../pages/category/categoryAction'


export const UpdateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id } = useParams();
    const [form, setForm] = useState({});
    const [imgs, setImgs] = useState([])
    const [imgToDelete, setImgToDelete] = useState([])

    const { selectedProduct } = useSelector(state => state.productInfo);

    const { catList } = useSelector((state) => state.catInfo);

    useEffect(() => {
        dispatch(getAllCats())
        if (_id !== form._id) {
            dispatch(getAProduct(_id))
            setForm(selectedProduct)
        }
    }, [_id, dispatch, selectedProduct])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { createdAt, sku, slug, updateAt, __v, ...rest} = form;
        const formDt = new FormData()

        for(let key in rest){
            formDt.append(key, rest[key]);
        }

        if (imgs.length) {
            [...imgs].forEach((item) => {
                formDt.append("newImages", item)
            })
        }

        imgToDelete.length && formDt.append("imgToDelete", imgToDelete);
        
        dispatch(postNewProduct(formDt))
    }

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    

    const handleOnImgDelete = (e) => {
        const {checked, value} = e.target

        if(checked){
            setImgToDelete([...imgToDelete, value])
        }else{
            setImgToDelete(imgToDelete.filter((url)=>url != value))
        }
        setImgToDelete;
    }

    const handleOnDelete = async () => {
        if (window.confirm("Are you sure you want to delete the category?")) {
            // const isDelete = await dispatch(deleteCat(_id))
            // isDelete && navigate("/category");
        }
    }

    const handleOnImgAttached = (e) => {
        const { files } = e.target;
        setImgs(files)
    }

    console.log(form);

    const inputs = [
        {
            label: 'Product Name',
            name: 'name',
            required: true,
            placeholder: 'Nike AirMax',
            value: form.name,
        },
        {
            label: 'SKU',
            name: 'sku',
            required: true,
            disabled: true,
            placeholder: 'N-AM20',
            value: form.sku,
        },
        {
            label: 'Quantity',
            name: 'qty',
            required: true,
            type: "number",
            placeholder: '120',
            value: form.qty,
        },
        {
            label: 'Price',
            name: 'price',
            required: true,
            type: "number",
            placeholder: '220',
            value: form.price,
        },
        {
            label: 'Sales Price',
            name: 'salesPrice',
            default: "0",
            type: "number",
            placeholder: '120',
            value: form.salesPrice,
        },
        {
            label: 'Sales Start Date',
            name: 'salesStartDate',
            type: "date",
            placeholder: '2024-01-12',
            value: form.salesStartDate?.slice(0, 10) || "",
        },
        {
            label: 'Sales End Date',
            name: 'salesEndDate',
            type: "date",
            placeholder: '2024-01-12',
            value: form.salesStartDate?.slice(0, 10) || "",
        },
        {
            label: 'Description',
            name: 'description',
            required: true,
            as: "textarea",
            rows: "7",
            placeholder: "Enter the description",
            value: form.description,
        },
    ]

    return (
        <AdminLayout title="Update Category">
            <div>
                <Form
                    onSubmit={handleOnSubmit}
                    className="m-auto border rounded shadow-lg p-4 my-5" style={{ width: '600px' }}>
                    <h3>New Product</h3>
                    {/* make category available to select */}

                    <Form.Group className='mb-3'>
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select value={form.parentCatId} name="parentCatId" onChange={handleOnChange}>
                            <option value="">-- Select --</option>
                            {
                                catList.map((item, i) => (<option key={item._id} value={item._id}>{item.title}</option>
                                ))
                            }

                        </Form.Select>
                    </Form.Group>

                    {
                        inputs.map((item, i) => (<CustomInput key={i} {...item}
                            onChange={handleOnChange}
                        />))
                    }

                    <div className="d-flex gap-3 m-4">
                        {
                            form?.images?.map((url)=>(
                            <div key={url}>
                                <div>
                                    <input checked={url === form.thumbnail} type="radio" name='thumbnail' id={url} onChange={handleOnChange}
                                    value={url}/> {" "}
                                    <label htmlFor={url}>Make Thumbnail</label>
                                </div>
                                <img width={"100px"} className='img-thumbnail' src={import.meta.env.VITE_SERVER_ROOT + url} />
                                <div>
                                    <input type="checkbox" id={url + 1} 
                                    onChange={handleOnImgDelete}
                                    value={url}/> {" "}
                                    <label htmlFor={url + 1}>Delete </label>
                                </div>
                            </div>
                            ))
                        }
                    </div>

                    <Form.Group className='mb-3'>
                        <Form.Control type='file' name='img' multiple
                            onChange={handleOnImgAttached} />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant='warning' type='submit'>
                            {" "}
                            Update Product
                        </Button>
                    </div>
                </Form>

                <div className="d-grid mb-2">
                    <Button
                        onClick={handleOnDelete}
                        variant='danger'>
                        Delete Product
                    </Button>
                </div>
            </div>
        </AdminLayout>

    )
}
