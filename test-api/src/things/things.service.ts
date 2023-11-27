import { Injectable } from '@nestjs/common';
import { CreateThingDto } from './dto/create-thing.dto';
import { createTracing } from 'trace_events';
import { UpdateThingDto } from './dto/update-thing.dto';

@Injectable()
export class ThingsService {
    private things = [
        {
            id: 1,
            name: 'First thing',
            prop: "one",
        },
        {
            id: 2,
            name: 'Second thing',
            prop: "two",
        },
        {
            id: 3,
            name: 'Third thing',
            prop: "three",
        },
    ];
    getThings(prop? : "one" | "two" | "three") {
        if (prop) {
            return this.things.filter(thing => thing.prop === prop);
        }
        return this.things;
    }

    getThing(id: number) {
        if(!id) {
            throw new Error('thing not found');
        }
        return this.things.find(thing => thing.id === id);
    }

    addThing(createThingDto: CreateThingDto) {
        const newThing = {
            ...createThingDto,
            id: Date.now(),
        };
        this.things.push(newThing);
        return newThing;
    }

    updateThing(id: number, updateThingDto: UpdateThingDto) {
        this.things = this.things.map((thing) => {
            if (thing.id === id) {
                return { ...thing, ...updateThingDto };
            }
            return thing;
        });
        return this.getThing(id);
    }
    
    deleteThing(id: number) {
        const toBeDeleted = this.getThing(id);
        this.things = this.things.filter(thing => thing.id !== id);
        return toBeDeleted;
    }
}
