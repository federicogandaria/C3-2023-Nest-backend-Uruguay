import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository, AccountEntity, AccountTypeEntity } from 'src/Capa-Data/persistence';
import { CreateAccountDto } from 'src/Capa-Presentacion/dtos/account.dto';
import { NewaccountDto } from 'src/Capa-Presentacion/dtos/createAccount.dto';
import { v4 as uuid } from 'uuid';


@Injectable()
export class AccountService {
  //accountRepositorio(rojo) va a tener todas las funciones de AccountRepository
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: CreateAccountDto): AccountEntity {
    const newAccount = new AccountEntity();
    const newAdditionalAccountType = new AccountTypeEntity()

    
    newAccount.customer = account.customer;
    newAccount.balance = account.balance;
    newAccount.accountType = account.accountType;
    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): AccountEntity {
    
    let accBalance = this.accountRepository.findOneById(accountId);
    accBalance.balance = accBalance.balance + amount;
    return this.accountRepository.update(accountId, accBalance);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): AccountEntity {
    
    let accBalance = this.accountRepository.findOneById(accountId);
    if(accBalance.balance >= amount){
    accBalance.balance = accBalance.balance - amount;
   return this.accountRepository.update(accountId, accBalance);
  }

   else
   {
     throw new NotFoundException ("Account not balance in account")
   }
  }

  /**
   * Verificar la disponibilidad de un monto a retirar en una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    
   let accBalance = this.accountRepository.findOneById(accountId);
    if (accBalance.balance >= amount) {
      return true;
    }
    return false;
  }
  
  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    
    let account = this.accountRepository.findOneById(accountId);
    account.state = state;
    this.accountRepository.update(accountId,account)

  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    
    return this.accountRepository.findOneById(accountId).accountType;
    
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType(accountId: string): AccountTypeEntity {
    const objeto = this.accountRepository.findOneById(accountId);
    objeto.accountType.id = uuid();
    return this.accountRepository.update(accountId, objeto).accountType;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string, sof?: boolean): void {
    this.accountRepository.delete(accountId, sof)
}

  findALl(): AccountEntity[] {
    return this.accountRepository.findAll()
  }

  newAccountType(account: NewaccountDto): AccountEntity {

    const newAccount = new AccountEntity();
    const accountType = new AccountTypeEntity();

    accountType.id = account.accountTypeId;
    accountType.name = account.name
    newAccount.accountType = accountType;

    const customer = this.accountRepository.findOneById(account.accountId)
    newAccount.customer = customer.customer;
    newAccount.balance = 0;
    newAccount.state = true;

    
    return this.accountRepository.register(newAccount);
  }

}
