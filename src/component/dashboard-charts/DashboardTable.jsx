import React from 'react'
import { Table } from 'react-bootstrap'

export const DashboardTable = () => {
  return (
    <div>
      <Table hover className='bg-dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Item Name</th>
          <th>Product ID</th>
          <th>Added Date</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Some Image</td>
          <td>Adidas</td>
          <td>1eaada236Aad</td>
          <td>2024-01-21</td>
          <td>140</td>
          <td>$220</td>
          <td>In Stock</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Some Image</td>
          <td>Nike</td>
          <td>2qweqwe57</td>
          <td>2024-01-21</td>
          <td>240</td>
          <td>$250</td>
          <td>Out Stock</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Some Image</td>
          <td>Puma</td>
          <td>12qbqkwjbeqk3</td>
          <td>2024-01-21</td>
          <td>80</td>
          <td>$220</td>
          <td>Low Stock</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
