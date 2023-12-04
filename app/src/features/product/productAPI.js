// A mock function to mimic making an async request for data
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");

    const data = await response.json();
    console.log(data, "data");
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");

    const data = await response.json();

    resolve({ data });
  });
}

export function fetchProductDetails(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);

    const data = await response.json();
    console.log(data, "data");
    resolve({ data });
  });
}

export function fetchFilteredProducts({ filter, sort, pagination }) {
  return new Promise(async (resolve, reject) => {
    let filterString = "";
    for (let key in filter) {
      filter[key].forEach((e) => {
        filterString += `${key}=${e}&`;
        console.log(filterString);
      });
      // filterString += `${key}=${filterObj[key]}&`;
    }

    for (let key in sort) {
      filterString += `${key}=${sort[key]}&`;
      console.log(filterString);
    }

    for (let key in pagination) {
      filterString += `${key}=${pagination[key]}&`;
      console.log(filterString);
    }

    const response = await fetch(
      `http://localhost:8080/products?${filterString}`
    );

    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}
