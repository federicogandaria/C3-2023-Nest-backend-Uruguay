import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/Capa-Data/models';
import { DataRangeModel } from 'src/Capa-Data/models/data-range.model';
import { DepositRepository, depositEntity, AccountEntity } from 'src/Capa-Data/persistence';
import { DepositDto } from 'src/Capa-Presentacion/dtos/deposit.dto';
import { AccountRepository } from '../../../Capa-Data/persistence/repositories/account.repository';
import { AccountService } from '../account/account.service';



@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository,
    private readonly AccountRepository: AccountRepository,
    private readonly AccountService: AccountService) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositDto): depositEntity {
    const newDeposit = new depositEntity();
    const account = this.AccountRepository.findOneById(deposit.accountId)
    newDeposit.account = new AccountEntity()
    newDeposit.account.accountType  = account.accountType
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = new Date();
    newDeposit.state = true;
    newDeposit.account.id  = deposit.accountId

    console.log(newDeposit);
    this.AccountService.addBalance(deposit.accountId, deposit.amount)
    return this.depositRepository.register(newDeposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    
    this.depositRepository.delete(depositId)
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} depositId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  
  
  getHistory(
    depositId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): depositEntity[] {
    let deposit = this.depositRepository.findByAccountType(depositId);

    if (dataRange) {
      let { dateInit, dateEnd = Date.now() } = dataRange;
      deposit = deposit.filter(
        (deposit) =>
          deposit.dateTime >= dateInit &&
          deposit.dateTime <= dateEnd,
      );
    }

    if (pagination) {
      let { offset = 0, limit = 0 } = pagination;
      deposit = deposit.slice(offset, offset + limit);
    }
    return deposit;
  }

}
