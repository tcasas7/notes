/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

async function generatePasswordHash() {
  const saltRounds = 10;
  const password = '1234'; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log('Password Hashed:', hashedPassword);
}

generatePasswordHash();
