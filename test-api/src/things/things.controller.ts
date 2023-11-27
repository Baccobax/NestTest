import { Controller , Get, Put , Post , Delete , Param , Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards} from '@nestjs/common';
import { getDefaultHighWaterMark } from 'stream';
import { CreateThingDto } from './dto/create-thing.dto';
import { UpdateThingDto } from './dto/update-thing.dto';
import { ThingsService } from './things.service';
import { ThingGradeGuard } from '../thing-grade/thing-grade.guard';


@Controller('things')
@UseGuards(ThingGradeGuard)
export class ThingsController {
    constructor(private readonly thingsService: ThingsService) {}

    @Get()
    getThings(@Query('prop') prop: "one" | "two" | "three") {
        return this.thingsService.getThings(prop);
    }

    @Get(':id')
    getThingWithId(@Param('id' , ParseIntPipe) id: number) {
        try {
            return this.thingsService.getThing(id);
        } catch(err){
            throw new NotFoundException();
        }
    }

    @Post()
    addThing(@Body(new ValidationPipe()) createThingDto: CreateThingDto) {
        return this.thingsService.addThing(createThingDto);
    }

    @Put(':id')
    updateThing(@Param('id' , ParseIntPipe) id: number, @Body() updateThingDto: UpdateThingDto) {
        return this.thingsService.updateThing(id , updateThingDto);
    }

    @Delete(':id')
    deleteThing(@Param('id' , ParseIntPipe) id: number) {
        return this.thingsService.deleteThing(id);  
    }
}
