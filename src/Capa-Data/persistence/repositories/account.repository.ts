import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';

import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as AccountEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    
    const index = this.database.findIndex((item) => item.id === id);
    
    console.log(id)
    
    if (index == -1) {
      throw new Error('No se encontraron elementos');
    }
    if (!soft) {
      this.softDelete(index)

    } else {
      this.hardDelete(index)
    } 

  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now()

  }



  findAll(): AccountEntity[] {
    return this.database
  }

  findOneById(id: string): AccountEntity {
    const account = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (account) return account;
    else throw new NotFoundException('El id no existe en base de datos');
  }

  findByState(state: boolean): AccountEntity[] {
    const statef = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) => item.state == state && typeof item.deletedAt === 'undefined',
    );
    return statef;
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const accountT = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) =>
        item.customer.id == customerId && typeof item.deletedAt === 'undefined',
    );
    return accountT;
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    const accountT = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) =>
        item.accountType.id == accountTypeId &&
        typeof item.deletedAt === 'undefined',
    );
    return accountT;
  }

  buscarEstado(AccountId: string): boolean {
    const id = this.database.findIndex((objeto) => (objeto.id = AccountId));
    return this.database[id].state; //entro id
  }

  findByCustomer2(customerId: string): AccountEntity {
    const currentEntity = this.database.find(
      (item) => item.customer.id === customerId,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
    
    }
}
