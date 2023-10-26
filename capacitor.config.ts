import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'registroapp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
  plugins:{
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      iosKeychainPrefix: 'YOUR_APP_NAME',
      iosBiometric: {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
      androidIsEncryption : false,
      androidBiometric : {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
      },
      electronIsEncription: false,
      electronWindowsLocation: "c:\\ProgramData\\CapacitorDatabases",
      electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
      electronLinuxLocation: "Databases"    
    }
  }
};


export default config;
