const Contacts = require('./contacts.model');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ContactsController {
  constructor() {
    this.DB = new Contacts()
  }

  addUserToGoogleContacts(email, topics, otherTopic) {
    return new Promise(async (resolve, reject) => {
      try {
        const finalGroups = []; // Will hold all of the resource names for requested topics
        // Find user from database
        const user = await this.DB.findOrCreateContactByEmail(email);

        // Delete user's previous group associations
        for (const groupName of user.sdcGroupResourceNames) {
          const missing = await this.DB.deleteContactfromGroup(user.userResourceName, groupName);
          if (missing) console.error(`Cannot find contact ${missing[0]}`);
        }

        // Add all the new group associations
        for (const topic of topics) {
          let groupResourceName;

          if (['other', 'Other'].includes(topic)) {
            const saveExactName = true
            const { resourceName } = await this.DB.findOrCreateGroupByName('Other', saveExactName);
            // TODO: Send ACM emails of topic requests
            // await Contacts.sendGroupRequest(otherTopic, email)
            console.log(otherTopic)
            groupResourceName = resourceName;
          } else {
            const { resourceName } = await this.DB.findOrCreateGroupByName(topic);
            groupResourceName = resourceName;
          }
          console.log('found/creaotherTopicted group:', groupResourceName);

          await sleep(5000);

          const missing = await this.DB.addContactToGroup(user.userResourceName, groupResourceName);
          if (missing) console.error(missing);
          console.log(`pushing ${groupResourceName} to array`);
          finalGroups.push(groupResourceName);
        }

        // update Contacts Model
        await Contacts.updateContactTopics(email, finalGroups);

        resolve('Contact has been saved and editted successfully');
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = ContactsController;
