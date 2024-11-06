import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProduct } from '../redux/productSlice';

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Danh Sách Hàng Hóa</h2>
      <div className="text-end mb-3">
        <Link to="/add">
          <button className="btn btn-primary">Thêm Hàng Hóa</button>
        </Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm hàng hóa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredProducts.length > 0 ? (
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Tên Hàng Hóa</th>
              <th>Giá</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price} VND</td>
                <td>
                  <Link to={`/edit/${product.id}`}>
                    <button className="btn btn-warning btn-sm me-2">Chỉnh Sửa</button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Không có hàng hóa nào!</p>
      )}
    </div>
  );
};

export default ProductListPage;