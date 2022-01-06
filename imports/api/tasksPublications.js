import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";

// Declare the Collections that Clients can subscribe to using DDP
// this code needs to be imported in the Server main.js

Meteor.publish("tasks", function () {
  return TasksCollection.find({ userId: this.userId });
});
