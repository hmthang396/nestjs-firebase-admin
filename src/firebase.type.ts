import { ModuleMetadata, Type } from '@nestjs/common';
import * as admin from 'firebase-admin';

export type FirebaseModuleOptions = admin.AppOptions;

export interface FirebaseModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<FirebaseOptionsFactory>;
  useExisting?: Type<FirebaseOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
}

export interface FirebaseOptionsFactory {
  createFirebaseOptions(): Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
}

export interface FirebaseAdmin {
  auth: admin.auth.Auth;
  messaging: admin.messaging.Messaging;
  db: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}
