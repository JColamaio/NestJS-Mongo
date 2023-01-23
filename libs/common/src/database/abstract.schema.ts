import { Prop, Schema } from '@nestjs/mongoose';
import {Schematypes, Types } from 'mongoose'

@Schema()
export class AbstractDocument {
    @Prop({ type: Schematypes.ObjectId })
    _id: Types.ObjectId
}