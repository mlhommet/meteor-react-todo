import { check } from "meteor/check";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);
    // the user must be authentified
    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);
    // the user must be authentified
    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    // the user must own the task to remove it
    const task = TasksCollection.findOne({ _id: task, userId: this.userId });
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove(taskId);
  },
  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
    // the user must be authentified
    if (!this.userId) {
      throw new Meteor.Error("Not Authorized");
    }

    // the user must own the task to edit it
    const task = TasksCollection.findOne({ _id: task, userId: this.userId });
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.update(taskId, {
      $set: { isChecked },
    });
  },
});
