export default function PostData(type, userData){
  let baseUrl = "me-api.thisisabad.site";

  return new Promise((resolve, reject) => {
    console.log("----userData-----");
    console.log(userData);
    console.log("----userData-----");

    fetch(baseUrl+type, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      resolve(responseJson);
    })
    .catch((error) => {
      reject(error);
    });

  });
}
