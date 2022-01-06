import { TasksCollection } from "/imports/db/TasksCollection";

// Core of functions that are used by Methods and Server functions

export function insertTask(text, userId) {
  TasksCollection.insert({
    text,
    createdAt: new Date(),
    userId,
  });
}
