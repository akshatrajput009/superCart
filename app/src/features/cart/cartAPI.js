// A mock function to mimic making an async request for data
export function fetchCart(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://vast-erin-katydid-belt.cyclic.app/cart",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("response cart", response);
    if (response.ok) {
      alert("The product has been added to cart");
      resolve({ data });
    } else {
      alert("This product is already in your cart");
    }
  });
}

export function updateItem(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://vast-erin-katydid-belt.cyclic.app/cart/${product.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItems(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://vast-erin-katydid-belt.cyclic.app/cart?userId=${id}`
    );
    const data = await response.json();

    resolve({ data });
  });
}

export function deleteProduct(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://vast-erin-katydid-belt.cyclic.app/cart/${productId}`,
      {
        method: "DELETE",
      }
    );
    const data = productId;
    resolve({ data });
  });
}

export function deleteWholeCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://vast-erin-katydid-belt.cyclic.app/cart/all/${userId}`,
      {
        method: "DELETE",
      }
    );

    resolve({ status: "deleted successfully" });
  });

  // return new Promise(async (resolve) => {
  //   const response = await fetchItems(userId);
  //   const products = response.data;
  //   console.log(products);
  //   products.forEach(async (el) => await deleteProduct(el.id));

  //   resolve({ status: "deleted successfully" });
  // });
}
