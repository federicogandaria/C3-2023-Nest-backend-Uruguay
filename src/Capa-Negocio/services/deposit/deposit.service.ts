import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/Capa-Data/models';
import { DataRangeModel } from 'src/Capa-Data/models/data-range.model';
import { DepositRepository, depositEntity } from 'src/Capa-Data/persistence';
import { DepositDto } from 'src/Capa-Presentacion/dtos/deposit.dto';


@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositDto): depositEntity {
    const newDeposit = new depositEntity(); 
    newDeposit.account = deposit.account;
    return this.depositRepository.register(newDeposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.deleteDeposit(depositId);
    // this.accountRepository.delete(accountId)
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
