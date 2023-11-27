import { IsEnum, MinLength } from "class-validator";

export class CreateThingDto {
    @MinLength(3)
    name: string;

    @IsEnum(["one", "two", "three"] , {message: "prop must be one of 'one', 'two', or 'three'"} )
    prop: "one" | "two" | "three";   
}
