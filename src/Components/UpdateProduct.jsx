import { useState } from "react";

function UpdateProduct() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop Pro", price: 65000, category: "Electronics" },
    { id: 2, name: "Smartphone X", price: 28000, category: "Electronics" },
    { id: 3, name: "Wireless Headphones", price: 3500, category: "Accessories" },
    { id: 4, name: "Mechanical Keyboard", price: 4500, category: "Accessories" }
  ]);

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Load the selected product into the form
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
  };

  // Update the selected product
  const handleUpdate = (e) => {
    e.preventDefault();

    setProducts(
      products.map((product) =>
        product.id === editId
          ? {
              ...product,
              name: name,
              price: Number(price),
              category: category
            }
          : product
      )
    );

    setEditId(null);
    setName("");
    setPrice("");
    setCategory("");
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setCategory("");
  };

  return (
    <div className="app-container">
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">P</div>
          <span>Product<span className="purple-text">Hub</span></span>
        </div>

        <div className="topbar-status">
          <span className="online-dot"></span>
          Inventory Dashboard
        </div>
      </header>

      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">PRODUCT MANAGEMENT</p>
            <h1>Manage your <span>inventory.</span></h1>
            <p className="hero-description">
              Update product details and keep your inventory organized.
            </p>
          </div>

          <div className="hero-icon">✦</div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Products</p>
            <h2>{products.length.toString().padStart(2, "0")}</h2>
            <span>Products in inventory</span>
          </div>

          <div className="stat-card">
            <p>Total Inventory Value</p>
            <h2>
              ₹{products
                .reduce((total, product) => total + product.price, 0)
                .toLocaleString("en-IN")}
            </h2>
            <span>Combined product value</span>
          </div>

          <div className="stat-card">
            <p>Editing Status</p>
            <h2 className="status-text">
              {editId !== null ? "Editing" : "Ready"}
            </h2>
            <span>
              {editId !== null
                ? "Update your selected product"
                : "Select a product to edit"}
            </span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel products-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">YOUR INVENTORY</p>
                <h2>All Products</h2>
              </div>
              <span className="count-badge">{products.length} items</span>
            </div>

            <div className="product-list">
              {products.map((product) => (
                <article
                  className={`product-card ${
                    editId === product.id ? "selected" : ""
                  }`}
                  key={product.id}
                >
                  <div className="product-icon">
                    {product.category === "Electronics" ? "⌘" : "◈"}
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                  </div>

                  <button
                    className={`edit-button ${
                      editId === product.id ? "editing-button" : ""
                    }`}
                    onClick={() => handleEdit(product)}
                  >
                    {editId === product.id ? "Selected ✓" : "✎ Edit"}
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="panel form-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">EDIT DETAILS</p>
                <h2>{editId !== null ? "Update Product" : "Select Product"}</h2>
              </div>
              <div className="form-icon">✎</div>
            </div>

            {editId === null ? (
              <div className="empty-state">
                <div className="empty-icon">↗</div>
                <h3>Ready when you are</h3>
                <p>
                  Select a product from the inventory to edit its details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpdate}>
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label htmlFor="productPrice">Price (₹)</label>
                <input
                  id="productPrice"
                  type="number"
                  min="1"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <label htmlFor="productCategory">Category</label>
                <select
                  id="productCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Choose a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>

                <button className="save-button" type="submit">
                  Save Changes <span>→</span>
                </button>

                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel Editing
                </button>
              </form>
            )}

            <div className="form-note">
              <span>🔒</span>
              Changes are stored in React state for this session.
            </div>
          </div>
        </section>

        <footer>
          <span>ProductHub</span> · React Update Operation Practical
        </footer>
      </main>
    </div>
  );
}

export default UpdateProduct;