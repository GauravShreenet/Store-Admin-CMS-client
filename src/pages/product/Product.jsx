import React from 'react'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { AdminLayout } from '../../component/layout/AdminLayout'
import { ProductTable } from '../../component/custom-table/ProductTable'

const Product = () => {
  return <AdminLayout title="Product">
    <div className="text-end my-2">
      <Link to="/add-product">
        <Button> + Add Product List</Button>
      </Link> 
    </div>
    <div>
      <ProductTable />
    </div>
  </AdminLayout>
}

export default Product