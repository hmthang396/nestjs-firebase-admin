import { Inject } from '@nestjs/common';
import { getFirebaseModuleToken } from './firebase.utils';

export const InjectFirebaseAdmin = (name?: string) => {
  return Inject(getFirebaseModuleToken(name));
};
