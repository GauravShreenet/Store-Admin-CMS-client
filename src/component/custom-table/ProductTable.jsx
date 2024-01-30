import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../pages/product/productAction';

export const ProductTable = () => {

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productInfo)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Thumbnail</th>
          <th>Status</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Sales Price</th>
          <th>Sales Starts</th>
          <th>Sales Ends</th>
          <th>Created Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          productList.map(({ _id, name, status, thumbnail, slug, price, qty, salesPrice, salesStartDate, salesEndDate, createdAt }, i) => (
            <tr key={_id}>
              <td>{i + 1}</td>
              <td><img width="100px" src={thumbnail}/></td>
              <td
                className={status === "active" ? "text-success" : "text-danger"}
              >{status}</td>
              <td>{name}</td>
              <td>{slug}</td>
              <td>{qty}</td>
              <td>{price}</td>
              <td>{salesPrice}</td>
              <td>{salesStartDate?.slice(0, 10)}</td>
              <td>{salesEndDate?.slice(0, 10)}</td>
              <td>{createdAt?.slice(0, 10)}</td>
              <td>
                <Link to={`/update-product/${_id}`}>
                  <Button variant='warning'>Edit</Button>
                </Link>
              </td>
            </tr>
          ))
        }

      </tbody>
    </Table>
  );
}
