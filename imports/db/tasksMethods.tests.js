import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { mockMethodCall } from "meteor/quave:testing";
import { assert } from "chai";
import { TasksCollection } from "/imports/db/TasksCollection";
import "/imports/db/tasksMethods";

if (Meteor.isServer) {
  describe("Tasks", () => {
    describe("methods", () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        TasksCollection.remove({});
        taskId = TasksCollection.insert({
          text: "Test Task",
          createdAt: new Date(),
          userId,
        });
      });

      it("can delete owned task", () => {
        mockMethodCall("tasks.remove", taskId, { context: { userId } });

        assert.equal(TasksCollection.find().count(), 0);
      });

      it("cannot delete tasks from another owner", () => {
        const fn = () =>
          mockMethodCall("tasks.remove", taskId, {
            context: { userId: "somebody else" },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(TasksCollection.find().count(), 1);
      });

      it("can change the status of a task", () => {
        const originalTask = TasksCollection.findOne(taskId);
        mockMethodCall("tasks.setIsChecked", taskId, !originalTask.isChecked, {
          context: { userId },
        });
        const updatedTask = TasksCollection.findOne(taskId);
        assert.notEqual(originalTask.isChecked, updatedTask.isChecked);
      });

      it("can insert new tasks", () => {
        const text = "New Task";
        mockMethodCall("tasks.insert", text, {
          context: { userId },
        });
        const tasks = TasksCollection.find({}).fetch();
        assert.equal(tasks.length, 2);
        assert.isTrue(tasks.some((task) => task.text === text));
      });
    });
  });
}
