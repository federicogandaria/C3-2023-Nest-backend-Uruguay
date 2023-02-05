
import { AccountModel, CustomerModel, AccountTypeModel } from 'src/Capa-Data/models';
import { v4 as uuid } from 'uuid';
import { AccountTypeEntity } from './account-type.entity';

export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeEntity;
  balance: number;
  state: boolean;
  deletedAt?: number | Date;
  accountTypes?: AccountTypeEntity[]
}
