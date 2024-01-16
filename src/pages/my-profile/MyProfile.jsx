import React from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { UpdatePassword } from '../../component/admin-profile/UpdatePassword'

const MyProfile = () => {
  return <AdminLayout title="MyProfile">
        <div>
          <h3>Update User Profile</h3>
        </div>
        <hr />
        <div>
          <h3>Update User Profile</h3>
          <UpdatePassword />
        </div>
        <hr />
  </AdminLayout>
}

export default MyProfile