import { IsNotEmpty, IsUUID } from "class-validator";

export class NewaccountDto{
    
    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountId: string;

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountTypeId: string;
    
    @IsNotEmpty({message:'This value cannot be empty! >:V'})
    name:string
    
    
}