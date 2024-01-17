import React from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { CustomTable } from '../../component/custom-table/CustomTable'


const Category = () => {
  return <AdminLayout title="Category">
        {/* form here */}
        <div>
          form here
          <CustomTable />
        </div>
  </AdminLayout>
}

export default Category