// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerRepository, DocumentTypeEntity, CustomerEntity , AccountEntity, AccountTypeEntity } from 'src/Capa-Data/persistence';
import { SignInDto } from 'src/Capa-Presentacion/dtos/sign-in.dto';
import { SignUpDto } from 'src/Capa-Presentacion/dtos/sign-up.dto';

// Data transfer objects

// Models


// Repositories


// Services
import { AccountService } from '../account';
import { DocumentTypeRepository } from '../../../Capa-Data/persistence/repositories/document-type.repository';

// Entities

import * as jwt from "jsonwebtoken"

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly documentTypeRepository : DocumentTypeRepository
  ) {}


  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
    //'Falta retornar un JWT';
    else throw new UnauthorizedException("User Incorrect");
  }

 
  signUp(user: SignUpDto): string {
    const documentType = new DocumentTypeEntity();

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);
    this.documentTypeRepository.register(documentType)
    if (customer) {
      
      const accountType = new AccountTypeEntity();
      accountType.id = customer.id;
      accountType.name = user.accountTypeName;
      const newAccount = new AccountEntity();
      newAccount.customer = customer;
      newAccount.accountType = accountType;
      newAccount.balance = 0
      const account = this.accountService.createAccount(newAccount);
      console.log(account)

      if (account)
      return jwt.sign({ id: customer.id },   process.env.TOKEN_SECRET || "tokentest");
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    if (!jwt.verify(JWToken, process.env.TOKEN_SECRET || "tokentest"))throw new Error('Method not implemented.'); 

      //localStorage.removeItem('token');
      console.log("Sign Out Complete. ")
      //window.location.href = '/login';

  }
}
