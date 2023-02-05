
import { IsUUID, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";
import { AccountEntity } from "src/Capa-Data/persistence";

import { v4 as uuid } from 'uuid';

export class DepositDto { 
    
     @IsUUID(4, { message: "this must to be uuid" })
    id : string;
    

     @IsNotEmpty({ message: ' is required.' })
    accountId: string;
   
    @IsNumber()
    @IsPositive()
    @Min(0)
    amount: number;
   
}