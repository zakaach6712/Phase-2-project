function CompareModal({ products, selectedProducts, onClose }) {
  const compared = products.filter((p) => selectedProducts.includes(p.id));

  const highlight = (value, others) =>
    others.every((v) => v === value) ? "text-gray-700" : "text-red-500 font-bold";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Product Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compared.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className={highlight(product.price, compared.map(p => p.price))}>
                Price: ${product.price}
              </p>
              <p className={highlight(product.category, compared.map(p => p.category))}>
                Category: {product.category}
              </p>
              {/* Add more fields if needed */}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompareModal;
