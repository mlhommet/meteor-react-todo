// Implementing Server routes to manage REST access to the application

import { insertTask } from "./tasksFunctions";
import { authentifyUser } from "./serverTools";

// required to access the request body
var bodyParser = require("body-parser");
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route("/sms", (params, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);

  console.log("SMS entry");
  console.log(req.body);

  // Check that the phone number is linked to an account

  const user = authentifyUser(req.body.From);
  if (!user) {
    res.end(JSON.stringify({ status: "unknown user" }));
    console.log("Unknown user");
    return;
  }
  // Check the body contents
  const text = req.body.Body;
  switch (text.toUpperCase()) {
    case "LISTE":
      console.log("return the grocery list");
      break;
    default:
      console.log(`Add ${text} to the grocery list`);
      insertTask(text, user._id);
  }
  res.end(JSON.stringify({ status: "ok" }));
});
