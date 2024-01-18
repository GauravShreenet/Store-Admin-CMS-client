import React, { useRef } from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { CustomTable } from '../../component/custom-table/CustomTable'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { postNewCat } from './categoryAction'


const Category = () => {

  const titleRef = useRef("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      const title = titleRef.current.value;
      if(!title) {
        return toast.error("Missing title");
      }

      dispatch(postNewCat({ title }));
    }
  }

  return (
    <AdminLayout title="Category">
      {/* form here */}
      <div>
        <h4>Add new category</h4>
        <Form onSubmit={handleOnSubmit}>
          <Row className='m-4 g-2'>
            <Col md={8}>
              <Form.Control
                ref={titleRef}
                required={true}
                placeholder='Add new category' />
            </Col>
            <Col md={4} className="d-grid">
              <Button type='submit'>Add New Category</Button>
            </Col>
          </Row>
        </Form>
        <CustomTable />
      </div>
    </AdminLayout>
  )
}

export default Category