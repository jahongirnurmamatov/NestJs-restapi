import {IsEmail, IsEnum,IsNotEmpty,IsString} from 'class-validator';	

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;
    
    @IsEnum(['Intern', 'Engineer', 'Admin'],{
        message: 'Valid role required',
    })
    role: 'Intern' | 'Engineer' | 'Admin';
}