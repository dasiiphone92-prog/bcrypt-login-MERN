const bcrypt = require("bcrypt");

 //Test user credentials
//Email: admin@gmach.com
// Password: admin123

async function getUsersData() {
  const hashedPassword = await bcrypt.hash("Adele0303", 10);
  
  return [
    {
      email: "israelasor7@gmail.com",
      password: hashedPassword,
    },
  ];
}

module.exports = getUsersData;

