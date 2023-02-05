import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { AccountEntity, AccountTypeEntity } from 'src/Capa-Data/persistence';
import { AccountService } from 'src/Capa-Negocio/services';
import { CreateAccountDto } from 'src/Capa-Presentacion/dtos/account.dto';
import { baseDto } from 'src/Capa-Presentacion/dtos/base.dto';
import { amountDto } from '../../dtos/amount.dto';
import { ObservableHandel } from '../../../obs/observable.handle';
import { NewaccountDto } from '../../dtos/createAccount.dto';



@Controller('account')
export class AccountController extends ObservableHandel{
constructor(private readonly accountService: AccountService) {
  super()
}


@Post('create')
createAccount(@Body() account: NewaccountDto): AccountEntity {
  const newAccount =  this.accountService.newAccountType(account);
  this.handle(account).subscribe(value => {
    console.log(`Nueva cuenta creada: ${ JSON.stringify (account)}`)
  })
  return newAccount
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

@Put('delete/:id')
    deleteAccount(@Param('id') accountId: string): void {
        //deleteAccount(@Param('accountId')accountId: string,  sof?: boolean): void {

        this.accountService.deleteAccount(accountId, false)
    }

@Get()
getAll(){
  return this.accountService.findALl()
 }


@Put('harddelete/:id')
hardelete(@Param('id', ParseUUIDPipe) accountId: string,
@Query('soft') soft?: boolean
): void{
  return this.accountService.deleteAccount(accountId,soft);
}}

