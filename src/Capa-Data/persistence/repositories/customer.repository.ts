import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface
{
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity;
    //Si lo que viene del if puede entrar a CustomerEntity? 2do check
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    this.database.splice(
      this.database.findIndex((item) => item.id === id),
      1,
    );
  }
  

  findAll(): CustomerEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }


  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Elemento no encontrado');
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const index = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.deletedAt === 'undefined',
    );
    return index >= 0 ? true : false;
  }

  findOneByDocumentTypeAndDocument(
    documentType: string,
    document: string,
  ): boolean {
    const index = this.database.findIndex(
      (item) =>
        item.documentType.id === documentType &&
        item.document === document &&
        typeof item.deletedAt === 'undefined',
    );
    return index >= 0 ? true : false;
  }

  findOneByEmail(email: string): CustomerEntity {
    const emailf = this.database.findIndex((item) => item.email == email);
    return this.database[emailf];
  }

  findOneByPhone(phone: string): CustomerEntity {
    const telefonof = this.database.findIndex(
      (item) => item.phone == phone && typeof item.deletedAt === 'undefined',
    );
    return this.database[telefonof];
  }

  findByState(state: boolean): CustomerEntity[] {
    const stadof = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) => item.state == state && typeof item.deletedAt === 'undefined',
    );
    return stadof;
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const nombrec = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) =>
        item.fullName == fullName && typeof item.deletedAt === 'undefined',
    );
    return nombrec;
  }

  findOneByEmailAndPasswordID(email: string, password: string): string {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password ,
    );

      let customer = this.database[indexCurrentEntity]
    return customer.id 
  }
 }

