import { Injectable } from '@nestjs/common';
import { TransferRepository, transferEntity } from 'src/Capa-Data/persistence';
import { DataRangeDto } from 'src/Capa-Presentacion/dtos/dataRange.dto';
import { PaginationDto } from 'src/Capa-Presentacion/dtos/pagination.dto';
import { TransferDto } from 'src/Capa-Presentacion/dtos/transfer.dto';
import { AccountService } from '../account';


@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: TransferRepository,private readonly accountService: AccountService) {}
 
   createTransfer(transfer: TransferDto): transferEntity { 
    const newtransfer = new transferEntity();

    newtransfer.outCome = this.accountService.removeBalance(transfer.outcome.id, transfer.transferAmount)
    newtransfer.inCome =  this.accountService.addBalance(transfer.income.id, transfer.transferAmount)
    newtransfer.amount = transfer.transferAmount
    newtransfer.reason = transfer.transferReason
    return this.transferRepository.register(newtransfer);
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */

  getHistoryOut(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
  ): transferEntity[] {
  
    if (!dataRange?.Min || !dataRange?.Max)
      throw new Error('Invalid Value Range');
  
    const transfers = this.transferRepository.findOutcomeByDataRange(accountId,dataRange.Min,dataRange.Max)
    return transfers.filter(transfer => transfer.dateTime >= dataRange.Min && transfer.dateTime <= dataRange.Max)
  }
  

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  
  getHistoryIn(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
  ): transferEntity[] {
  
    if (!dataRange?.Min || !dataRange?.Max)
      throw new Error('Invalid Value Range');
  
    const transfers = this.transferRepository.findOutcomeByDataRange(accountId,dataRange.Min,dataRange.Max)
    return transfers.filter(transfer => transfer.dateTime >= dataRange.Min && transfer.dateTime <= dataRange.Max)
  }
  

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */

  getHistory(
    accountId: string,
    pagination?: PaginationDto,
    dataRange?: DataRangeDto,
  ): transferEntity[] {
  
    if (!dataRange?.Min || !dataRange?.Max)
      throw new Error('Invalid Value Range');
  
    const transfers = this.transferRepository.findOutcomeByDataRange(accountId,dataRange.Min,dataRange.Max)
    return transfers.filter(transfer => transfer.dateTime >= dataRange.Min && transfer.dateTime <= dataRange.Max)
  }

  

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }
}