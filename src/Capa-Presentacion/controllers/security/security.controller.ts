// Libraries
import { Body, Controller, Param, Post } from '@nestjs/common';
import { SecurityService } from 'src/Capa-Negocio/services';
import { SignInDto } from 'src/Capa-Presentacion/dtos/sign-in.dto';

import { SignUpDto } from '../../dtos/sign-up.dto';


@Controller('security')
export class SecurityController {
    constructor (private readonly securityService : SecurityService) {}


    @Post('signup')
    signUp(@Body() signUp: SignUpDto): string{
        
        return this.securityService.signUp(signUp);
    }

    @Post('signin')
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn);
    }

    @Post('/signout/:JWToken')
    signOut(@Param('JWToken')JWToken: string): void{
        this.securityService.signOut(JWToken)
    }

}
