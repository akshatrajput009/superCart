// A mock function to mimic making an async request for data
export function sendSignup(loginData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      resolve({ data });
    } else {
      reject(data.message);
    }
  });
}

export function sendLogin(sentData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/users/auth`, {
      method: "POST",
      body: JSON.stringify(sentData),
      headers: { "content-type": "application/json" },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      window.localStorage.setItem("user", JSON.stringify(data));
      console.log(data, "data");
      resolve({ data });
    } else {
      reject(data.message);
    }
    //   console.log(data.password);
    //   if (data) {
    //     console.log(data.password, "data");
    //     if (data.password === sentData.password) {
    //       const resolvedData = data;

    //       return resolve({ resolvedData });
    //     } else return reject({ message: "Wrong credentials" });
    //   } else return reject({ message: "Wrong credentials" });
  });
}

export function updateAddress(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    window.localStorage.setItem("user", data);
    resolve({ data });
  });
}
