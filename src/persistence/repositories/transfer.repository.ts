import { Injectable, NotFoundException } from '@nestjs/common';
import { transferEntity } from '../entities/transfer.entity';

import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces/';

@Injectable()
export class TransferRepository
    extends BaseRepository<transferEntity>
    implements TransferRepositoryInterface {
   
        register(entity: transferEntity): transferEntity {
            this.database.push(entity);
            return this.database.at(-1) ?? entity;
          }

    update(id: string, entity: transferEntity): transferEntity {
          const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as transferEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
    }
    
    delete(id: string, soft?: boolean): void {
        const customer = this.findOneById(id);
        if (soft || soft === undefined) {
          customer.deletedAt = Date.now();
          this.update(id, customer);
        } else {
          const index = this.database.findIndex(
            (item) => item.id === id && (item.deletedAt ?? true) === true,
          );
          this.database.splice(index, 1);
        }
      }
    
    findAll(): transferEntity[] {
        return this.database.filter(
            (item) => typeof item.deletedAt === 'undefined',
          );
    }
    
    findOneById(id: string): transferEntity {
        throw new Error('Method not implemented.');
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): transferEntity[] {
        throw new Error('This method is not implemented');
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): transferEntity[] {
        throw new Error('This method is not implemented');
    }

  
}