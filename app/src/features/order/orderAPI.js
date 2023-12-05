// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://vast-erin-katydid-belt.cyclic.app/orders",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();

    resolve({ data });
  });
}
