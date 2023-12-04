// A mock function to mimic making an async request for data
export function fetchUserOrders(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?userId=${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
