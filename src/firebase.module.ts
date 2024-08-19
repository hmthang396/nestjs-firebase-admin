import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseModuleAsyncOptions, FirebaseModuleOptions } from './firebase.type';
import { FirebaseCoreModule } from './firebase.core-module';

@Module({})
export class FirebaseAdminModule {
  public static forRoot(options: FirebaseModuleOptions, connection?: string): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseCoreModule.forRoot(options, connection)],
      exports: [FirebaseCoreModule],
    };
  }

  public static forRootAsync(options: FirebaseModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseCoreModule.forRootAsync(options, connection)],
      exports: [FirebaseCoreModule],
    };
  }
}
