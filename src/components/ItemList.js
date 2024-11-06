import React from "react";

const ItemList = ({ products, currentPage }) => {
  const startIndex = (currentPage - 1) * 10;
  const currentProducts = products.slice(startIndex, startIndex + 10);

  if (currentProducts.length === 0) {
    return <p>Không tìm thấy hàng hóa nào!</p>;
  }

  return (
    <ul>
      {currentProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ItemList;