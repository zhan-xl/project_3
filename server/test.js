const bcrypt = require('bcrypt');

pwd = "1245";

async function hashPassword(pwd) {
  const hashedPassword = await bcrypt.hash(pwd, 10);
  console.log(hashedPassword);
}

hashPassword(pwd);