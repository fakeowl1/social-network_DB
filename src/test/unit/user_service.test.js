
// TODO: fix error $transaction is not function
import { createUser, findOneUser, deactivateUser } from '../../services/user_service';
import { prismaMock } from '../../../prisma/singleton.js';
import { hashPassword } from '../../utils';


describe('User Services', () => {
  describe('createUser', () => {
    it('should create a user', async () => {
      const user = {
        firstName: 'X',
        lastName: 'X',
        email: 'hello@gmail.com',
        hashedPassword: hashPassword('qwerty123') 
      }

      prismaMock.user.create.mockResolvedValue(user)
      
      const output = await createUser(user);

      await expect(output).resolves.toEqual({
        frstName: 'X',
        lastName: 'X',
        email: 'hello@gmail.com',
        hashedPassword: hashPassword('qwerty123')
      });
    });
      // const hashedPassword = hashPassword('qwerty123');
      // const input = { prisma: prisma, email: 'test', firstName: 'X', lastName: 'X', password: hashedPassword };
      // await expect(async () => await createUser(input)).rejects.toThrow('Invalid email');
  });

    // it('should throw error if email is used', async () => {
    //   const hashedPassword = hashPassword('qwerty123');
    //   await createUser(prisma, 'test@gmail.com', "X", "X", hashedPassword);
    //
    //   // await expect(async () => await createUser());
    // });
});
