import { IsEnum, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3)
    name: string;
    prop: string;
}
