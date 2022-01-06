import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
// import { TasksCollection } from "/imports/db/TasksCollection";
import "/imports/db/tasksMethods";
import "/imports/api/tasksPublications";
import "/imports/api/serverRoutes";

// // User management
// const SEED_USERNAME = "+33782343583";
// const SEED_PASSWORD = "password";

Meteor.startup(() => {
  // if (!Accounts.findUserByUsername(SEED_USERNAME)) {
  //   Accounts.createUser({
  //     username: SEED_USERNAME,
  //     password: SEED_PASSWORD,
  //   });
  // }
  // const user = Accounts.findUserByUsername(SEED_USERNAME);
  // // // If the Tasks collection is empty, add some data.
  // // if (TasksCollection.find().count() === 0) {
  // //   [
  // //     "First Task",
  // //     "Second Task",
  // //     "Third Task",
  // //     "Fourth Task",
  // //     "Fifth Task",
  // //     "Sixth Task",
  // //     "Seventh Task",
  // //     "Eight Task",
  // //   ].forEach((text) => insertTask(text, user));
  // // }
});
