import { Meteor } from "meteor/meteor";
// Functions used by the server to execute serverside and REST functions

export function authentifyUser(phoneNumber) {
  return Meteor.isServer ? Accounts.findUserByUsername(phoneNumber) : null;
}
