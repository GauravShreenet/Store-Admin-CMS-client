import React from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { CustomTable } from '../../component/custom-table/CustomTable'


const Category = () => {
  return <AdminLayout title="Category">
        {/* form here */}
        <div>
          <h4>Add new category</h4>
          <CustomTable />
        </div>
  </AdminLayout>
}

export default Category