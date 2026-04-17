import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.juansecu.letsdoit',
  appName: 'lets-do-it',
  webDir: 'src',
  plugins: {
    CapacitorSQLite: {
      androidBiometric: {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
      },
      androidIsEncryption: true,
      electronIsEncryption: true,
      electronLinuxLocation: "Databases",
      electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
      electronWindowsLocation: String.raw`C:\\ProgramData\\CapacitorDatabases`,
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'lets-do-it',
    }
  }
};

export default config;
