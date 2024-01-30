import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { Button, Form } from 'react-bootstrap'
import { CustomInput } from '../custom-input/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAProduct, updateAProduct } from '../../pages/product/productAction'
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
        dispatch(getAllCats());
    _id !== form._id && dispatch(getAProduct(_id));

    setForm(selectedProduct);
  }, [dispatch, selectedProduct, _id]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { createdAt, sku, slug, updatedAt, __v, ...rest } = form;
        const formDt = new FormData()

        for (let key in rest) {
            formDt.append(key, rest[key]);
        }

        if (imgs.length) {
            [...imgs].forEach((item) => {
                formDt.append("newImages", item)
            })
        }

        imgToDelete.length && formDt.append("imgToDelete", imgToDelete);

        dispatch(updateAProduct(_id, formDt))
    }

    console.log(form)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleOnImgAttached = (e) => {
        const { files } = e.target;
        setImgs(files)
    }


    const handleOnDeleteImg = (e) => {
        const { checked, value } = e.target;
    
        if (checked) {
          //add to state
          setImgToDelete([...imgToDelete, value]);
        } else {
          setImgToDelete(imgToDelete.filter((url) => url != value));
        }
        setImgToDelete;
      };

    const handleOnDelete = async () => {
        if (window.confirm("Are you sure you want to delete the category?")) {
            // const isDelete = await dispatch(deleteCat(_id))
            // isDelete && navigate("/category");
        }
    }

    

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
            label: 'Slug',
            name: 'slug',
            required: true,
            disabled: true,
            placeholder: 'Nike-AirMax',
            value: form.slug,
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
            value: form.salesEndDate?.slice(0, 10) || "",
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
            <Link to="/product">
                {" "}
                <Button variant="secondary"> &lt; Back </Button>{" "}
            </Link>
            <div>
                <Form
                    onSubmit={handleOnSubmit}
                    className="m-auto border rounded shadow-lg p-4 my-5">
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
                            form?.images?.map((url) => (
                                <div key={url}>
                                    <div>
                                        <input
                                            type="radio"
                                            name="thumbnail"
                                            id={url}
                                            checked={url === form.thumbnail}
                                            onChange={handleOnChange}
                                            value={url}
                                        />{" "}
                                        <label htmlFor={url}>Make Thumbnail</label>
                                    </div>
                                    <img
                                        className="img-thumbnail"
                                        width={"150px"}
                                        src={url}
                                    />
                                    <div>
                                        <input
                                            type="checkbox"
                                            id={url + 1}
                                            onChange={handleOnDeleteImg}
                                            value={url}
                                        />{" "}
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
