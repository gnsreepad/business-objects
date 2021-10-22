import { getManager } from 'typeorm';

/**
 * helper for regulating trasactions
 */
export class TransactionHelper {
  executeTransaction(fn: any, ...args: any[]) {
    return getManager().transaction(async (transactionalEntityManager) => {
      const result = await fn(...args, transactionalEntityManager);
      return result;
    });
  }
}
