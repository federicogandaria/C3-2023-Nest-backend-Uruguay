import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { AccountEntity, AccountTypeEntity } from 'src/Capa-Data/persistence';
import { AccountService } from 'src/Capa-Negocio/services';
import { CreateAccountDto } from 'src/Capa-Presentacion/dtos/account.dto';
import { baseDto } from 'src/Capa-Presentacion/dtos/base.dto';
import { amountDto } from '../../dtos/amount.dto';



@Controller('account')
export class AccountController {
constructor(private readonly accountService: AccountService) {}

@Get('saludo')
saludar(){
    console.log("hola")
}

@Post('newAccount')
createAccount(@Body() account: CreateAccountDto): AccountEntity {
return this.accountService.createAccount(account);
}

@Get('balance/:accountId')
getBalance(@Param('accountId', ParseUUIDPipe) accountId: string): number {
return this.accountService.getBalance(accountId);
}

@Put('add/:accountId')
addBalance(@Param('accountId', ParseUUIDPipe) accountId: string, @Body() amount: amountDto): void {
this.accountService.addBalance(accountId, amount.amount);
}

@Put('remove/:accountId')
removeBalance(@Param('accountId', ParseUUIDPipe) accountId: string, @Query('amount') amount: number): void {
this.accountService.removeBalance(accountId, amount);
}

@Get('verify/:accountId')
verifyAmountIntoBalance(@Param('accountId', ParseUUIDPipe) accountId: string, @Query('amount') amount: number): boolean {
return this.accountService.verifyAmountIntoBalance(accountId, amount);
}

@Get('state/:accountId')
getState(@Param('accountId', ParseUUIDPipe) accountId: string): boolean {
return this.accountService.getState(accountId);
}

@Put('state/:accountId')
changeState(@Param('accountId', ParseUUIDPipe) accountId: string, @Query('state') state: boolean): void {
this.accountService.changeState(accountId, state);
}

@Get('type/:accountId')
getAccountType(@Param('accountId', ParseUUIDPipe) accountId: string): AccountTypeEntity {
return this.accountService.getAccountType(accountId);
}

@Put('type/:accountId')
changeAccountType(@Param('accountId', ParseUUIDPipe) accountId: string): AccountTypeEntity {
return this.accountService.changeAccountType(accountId);
}

@Delete('delete/:accountId')
deleteAccount(@Param('accountId', ParseUUIDPipe) accountId: string): void {
this.accountService.deleteAccount(accountId);
}

@Get()
getAll(){
  return this.accountService.findALl()
 }


@Put('harddelete/:id')
hardelete(@Param('id', ParseUUIDPipe) accountId: string,
@Body() baseDto: baseDto
): void{
  return this.accountService.deleteAccount(accountId, baseDto.soft);
}}

