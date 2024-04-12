import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Ichami";
const yourPassword = "Ichami630";
const yourAPIKey = "99e7594e-7f03-4cfc-b4ce-6c183662cd21";
const yourBearerToken = "511fd569-dbfc-43bf-b76c-1a4c48854816";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const response=await axios.get("https://secrets-api.appbrewery.com/random");
    const result=JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs",{content:result});
  }catch(error){
    console.error("Falied to make request",error)
    res.render("index.ejs",{error:error.messsage});
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  const session_url="https://secrets-api.appbrewery.com/all?page=1";
  try{
    const response=await axios.get(session_url,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      }
    })
    const result=JSON.stringify(response.data);
    console.log("Data fetched succesfully");
    res.render("index.ejs",{content:result});
  }catch(error){
    console.error("Failed to authenticate");
    res.render("index.ejs",{error:error.message});
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try{
    const response=await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result=JSON.stringify(response.data);
    console.log("authentication succesful");
    res.render("index.ejs",{content:result})
  }catch(error){
    console.error("Failed to authenticate",error);
    res.render("index.ejs",{error:error.message});
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});
// async function loginUser() {
//   try {
//     const response = await axios.post("https://secrets-api.appbrewery.com/get-auth-token", {
//       username: 'Brandy',
//       password: 'BRANDY630'
//     });
//     console.log("token recieved:",response.data.token)
//     return response.data.token;
//   } catch (error) {
//     console.error("Login Failed", error);
//     return null;
//   }
// }

app.get("/bearerToken", async (req, res) => {
  // const token=await loginUser();
  // console.log(token);

  // if(!token){
  //   res.status(401).send("Authentication failed");
  //   return;
  // }

  try{
    const response=await axios.get("https://secrets-api.appbrewery.com/secrets/42?id=42",{
      headers:{
        'Authorization':`Bearer ${yourBearerToken}`,
      }
    });
    const result=JSON.stringify(response.data);
    res.render("index.ejs",{content:result});
  }catch(error){
    console.error("Login Failed", error.response ? error.response.data : error);
    res.render("index.ejs",{error:error.message});
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
