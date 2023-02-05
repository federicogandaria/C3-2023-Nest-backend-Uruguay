import { Controller, Post, Body, Delete, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { TransferService } from 'src/Capa-Negocio/services';
import { TransferDto } from '../../dtos/transfer.dto';





@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService ){}

   @Post("newTransfer")
 createTransfer(@Body() transfer: TransferDto) {
     return this.transferService.createTransfer(transfer);
   }

  @Delete("/:id")
   deleteTransfer(@Param('id', ParseUUIDPipe) transferId: string){
    return this.transferService.deleteTransfer(transferId);
  }
  // @Get('getHistory/:id')
  // getHistory(
  //   @Param('id', ParseUUIDPipe)
  //   id: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): transferEntity[] {
  //   return this.transferService.getHistory(id, pagination, dataRange);
  // }
  // @Get('getHistoryIn/:id')
  // getHistoryIn(
  //   @Param('id', ParseUUIDPipe)
  //   id: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): transferEntity[] {
  //   return this.transferService.getHistoryIn(id, dataRange);
  // }

  // @Get('getHistoryOut/:id')
  // getHistoryOut(
  //   @Param('id', ParseUUIDPipe)
  //   id: string,
  //   dataRange: DataRangeModel,
  //   pagination?: PaginationDto
  // ): transferEntity[] {
  //   return this.transferService.getHistoryOut(id, pagination, dataRange);
  // }
  
}