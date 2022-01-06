import { check } from "meteor/check";
import { TasksCollection } from "/imports/db/TasksCollection";
import { insertTask } from "/imports/api/tasksFunctions";

// Declare Methods that connect client actions to server code using DDP protocole

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    insertTask(text, this.userId);
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
