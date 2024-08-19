import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FirebaseModuleAsyncOptions, FirebaseModuleOptions, FirebaseOptionsFactory } from './firebase.type';
import { getFirebaseAdmin, getFirebaseModuleToken, getFirebaseOptionsToken } from './firebase.utils';

@Module({
  imports: [],
  providers: [],
})
export class FirebaseCoreModule {
  static forRoot(options: FirebaseModuleOptions, name?: string): DynamicModule {
    const firebaseModuleOptions = {
      provide: getFirebaseOptionsToken(name),
      useValue: options,
    };

    const firebaseAuthencationProvider = {
      provide: getFirebaseModuleToken(name),
      useValue: getFirebaseAdmin(options),
    };

    return {
      module: FirebaseCoreModule,
      providers: [firebaseModuleOptions, firebaseAuthencationProvider],
      exports: [firebaseModuleOptions, firebaseAuthencationProvider],
    };
  }

  static forRootAsync(options: FirebaseModuleAsyncOptions, name?: string): DynamicModule {
    const firebaseAuthencationProvider: Provider = {
      inject: [getFirebaseOptionsToken(name)],
      provide: getFirebaseModuleToken(name),
      useFactory: (options: FirebaseModuleOptions) => getFirebaseAdmin(options),
    };

    const asyncFireBaseModuleOptionProviders = this.createAsyncProviders(options);

    return {
      module: FirebaseCoreModule,
      imports: options.imports || [],
      providers: [...asyncFireBaseModuleOptionProviders, firebaseAuthencationProvider],
      exports: [...asyncFireBaseModuleOptionProviders, firebaseAuthencationProvider],
    };
  }

  private static createAsyncProviders(options: FirebaseModuleAsyncOptions, name?: string) {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, name)];
    }

    const providers: Provider[] = [this.createAsyncOptionsProvider(options, name)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(options: FirebaseModuleAsyncOptions, name?: string) {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getFirebaseOptionsToken(name),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getFirebaseOptionsToken(name),
      useFactory: async (optionsFactory: FirebaseOptionsFactory): Promise<FirebaseModuleOptions> =>
        await optionsFactory.createFirebaseOptions(),
      inject: [options.useClass, options.useExisting],
    };
  }
}
