/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Auto } from '../interfaces/auto/auto.interface';

@Injectable()
export class AutosService {
    private readonly autos: Auto[] = [];

    create(auto: Auto) {
        this.autos.push(auto);
    }

    findAll(): Auto[] {
        return this.autos;
    }
}
