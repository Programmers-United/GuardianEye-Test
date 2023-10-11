const fetchdata = () => {
  return fetch("http://localhost:5000/point", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};
export { fetchdata };
