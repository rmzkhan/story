// always write this in every project //
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

// upto here//


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
      members: [
        {
          email_address:email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname,
          }

        }
      ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/1fb4c9cad5";
    const options = {
      method: "POST",
      auth: "raja:885d7e80434e71bde5169d4ddfd6f373-us7"
    }

    const request = https.request(url, options, function(response){
      if (response.statuscode ===200) {
        res.send("Successfully Subscribed!")
      } else {
        res.send("There was an error signing up, Please try again!");
      }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })
    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running at port 3000");
});

// API key
// 885d7e80434e71bde5169d4ddfd6f373-us7

// list id
// 1fb4c9cad5
