const { merchants } = require("../../../mockMerchantData")
const users = require("../../../mockUserData.json")
const fs = require('fs')

const writeUsersToDB = (usersArray) => {
  fs.writeFileSync("mockUserData.json", JSON.stringify(usersArray), (err) => {
    if(err) {
      console.log('error creating file');
    } else {
      console.log('user successfully created');
    }
  })
}

const resolvers = {
  Query: {
    merchants: () => merchants,
    users: () => users,
    user: async (_, { input }) => {
      const user = users.find(user => user.googleId === input)
      return user
    }
  },
  Mutation: {
    createUser: (_, { user }) => {
      const updatedUsers = [...users, user];
      writeUsersToDB(updatedUsers);
      return user
    },
    updateUser: (_, { user }) => {
        const checkExistingUser = users.find(userObj => 
          userObj.googleId === user.googleId
        )
        if(checkExistingUser) {
          const updatedUsers = users.map(userObj => 
            userObj.googleId === user.googleId
            ? user
            : userObj
          )
          writeUsersToDB(updatedUsers);
          return user;
        }
        return undefined
    }
  }      
};

module.exports = resolvers;