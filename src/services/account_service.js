import prisma from '../../prisma/prisma-client.js';
import { InvalidData, RecordNotFound } from '../error-handler.js';

export const createAccount = async (user_id, currency) => {
  return prisma.$transaction(async (tx) => {
    const name = `user_${user_id}`;

    const validCurrency = /\b[A-Z]{3}\b/g;

    if (!validCurrency.test(currency)) {
      throw new InvalidData("Invalid currency");
    }

    const account = await tx.accounts.create({
      data: {
        name,
        balance: 0,
        currency,
      }
    });

    return account;
  });
};

export const findUserAccount = async (userId, currency, category) => {
  const name = category ? `user_${userId}_${category}` : `user_${userId}`; 

  const account = await prisma.accounts.findUnique({
    where: { name_currency: { name, currency }, deleted_at: null }
  });

  if (!account) {
    throw new RecordNotFound('Account not found');
  }

  return account;
};

export const deleteAccount = async (userId) => {
  return prisma.$transaction(async (tx) => {
    const name = `user_${userId}`;

    const account = await tx.accounts.findFirst({
      where: { 
        name, deleted_at: null
      }
    });

    if (!account) {
      throw new RecordNotFound('Account not found');
    }

    await tx.accounts.updateMany({
      where: { name: { startsWith: name } },
      data: { deleted_at: new Date() }
    });
  });
};
