// A mock function to mimic making an async request for data
export function fetchUserOrders(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://vast-erin-katydid-belt.cyclic.app/orders?userId=${id}`
    );
    const data = await response.json();
    resolve({ data });
  });
}
