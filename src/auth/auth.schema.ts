import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({})
  email: String;

  @Prop()
  googleId: String;

  @Prop()
  displayName: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
