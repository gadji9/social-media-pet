import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';
import { UserSchema } from '../../../../entities/User';

export interface StateSchema {
    user: UserSchema;
    login?: LoginSchema;
}
