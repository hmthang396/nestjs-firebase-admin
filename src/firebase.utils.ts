import { FIREBASE_MODULE, FIREBASE_MODULE_TOKEN, FIREBASE_OPTIONS_TOKEN } from './firebase.constant';
import { FirebaseAdmin, FirebaseModuleOptions } from './firebase.type';
import * as admin from 'firebase-admin';

export const getFirebaseOptionsToken = (name: string = FIREBASE_MODULE): string => `${name}_${FIREBASE_OPTIONS_TOKEN}`;

export const getFirebaseModuleToken = (name: string = FIREBASE_MODULE): string => `${name}_${FIREBASE_MODULE_TOKEN}`;

const createInstances = (app: admin.app.App): FirebaseAdmin => ({
  auth: app.auth(),
  messaging: app.messaging(),
  db: app.firestore(),
  storage: app.storage(),
});

export const getFirebaseAdmin = (options?: FirebaseModuleOptions): FirebaseAdmin => {
  if (!options || Object.values(options).filter((v) => !!v).length === 0) {
    return createInstances(admin.initializeApp());
  }

  return createInstances(
    admin.apps.length
      ? admin.app()
      : admin.initializeApp({
          ...options,
        }),
  );
};
