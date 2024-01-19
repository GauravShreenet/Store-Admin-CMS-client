import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const CustomTable = () => {

  const { catList } = useSelector((state) => state.catInfo)

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Created Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          catList.map(({ _id, title, status, slug, createdAt }, i) => (
            <tr key={_id}>
              <td>{i + 1}</td>
              <td
                className={status === "active" ? "text-success" : "text-danger"}
              >{status}</td>
              <td>{title}</td>
              <td>{slug}</td>
              <td>{createdAt?.slice(0, 10)}</td>
              <td>
                <Link to={`/update-category/${_id}`}>
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
