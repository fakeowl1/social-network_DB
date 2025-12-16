import { PrismaClient } from './generated/prisma/client.ts'
import { mockDeep, mockReset } from 'jest-mock-extended'

import prisma from './prisma-client'

// Jest mock (works because Jest runs in CJS internally)
// jest.unstable_mock('./prisma-client', () => ({
//   __esModule: true,
//   default: mockDeep(),
// }))

export const prismaMock = mockDeep();

// export const prismaMock = prisma;

beforeEach(() => {
  mockReset(prismaMock)
})
