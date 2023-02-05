import { Injectable } from '@nestjs/common';
import { CustomerRepository, CustomerEntity, AccountRepository } from 'src/Capa-Data/persistence';
import { CustomerDto } from 'src/Capa-Presentacion/dtos/customer.dto';


@Injectable()
export class CustomerService {
  constructor(private readonly costumerRepository: CustomerRepository, private readonly AccountRepository :AccountRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
  
    return this.costumerRepository.findOneById(customerId);
    
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerDto): CustomerEntity {
    let account = this.AccountRepository.findByCustomer2(id)
    customer.id = account.customer.id
    account.customer =  customer
    return this.costumerRepository.update(id, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */

  unsubscribe(id: string): boolean {
    let account = this.AccountRepository.findByCustomer2(id)
    this.AccountRepository.delete(account.id, true)
    
    this.costumerRepository.delete(id)
    return true
  }

  findALl(): CustomerEntity[] {
    return this.costumerRepository.findAll()
  }

}
