import type { InfoPlistType } from "./ios";
import type {
  AndroidManifestType,
  NetworkSecurityConfigType,
  StringsType,
  StylesType,
} from "./android";

export interface Config<T = unknown> {
  android: Android;
  ios: IOS;
  app: T;
}

export interface IOS {
  /**
   * Application source code name
   */
  name: string;
  /**
   * Application Bundle ID
   */
  bundleId: string;
  /**
   * Application's display name
   */
  displayName: string;
  /**
   * File path to app entitlements
   */
  entitlementsFilePath?: string;
  /**
   * Additional frameworks to embed
   */
  frameworks?: FrameworksConfig[];
  /**
   * iOS compile version target
   */
  deploymentTarget?: string;
  /**
   * Additional Pods needed
   */
  podfile?: Podfile;
  /**
   * Additional Plist values
   */
  plist?: Plist & InfoPlistType.InfoPlist;
  /**
   * Signing configuration
   */
  signing?: IOSSigning;
  /**
   * App target devices
   */
  targetedDevices?: TargetedDevices;
  /**
   * App version Info
   */
  versioning?: IOSVersion;
  /**
   * Optional PrivacyInfo.xcprivacy path to override the default PrivacyInfo.xcprivacy
   *
   * https://developer.apple.com/documentation/bundleresources/privacy_manifest_files
   */
  privacyManifestPath?: string;
}

export interface Plist {
  urlScheme?: UrlScheme;
}

export enum TargetedDevices {
  iPhone = "1",
  iPad = "2",
  Universal = "1,2",
}

export interface IOSVersion {
  /**
   * App version
   */
  version: string;
  /**
   * App build number
   */
  build?: number;
}

export interface Podfile {
  /**
   * Additional podfile configuration
   */
  config?: string[];
  /**
   * Additional required Pods
   */
  pods?: string[];
}

export interface IOSSigning {
  /**
   * Paths to certificates
   */
  appleCert: string;
  distCert: string;
  distP12: string;
  distCertType:
    | "iPhone Development"
    | "iPhone Distribution"
    | "Apple Development"
    | "Apple Distribution";
  /**
   * Export Method
   */
  exportMethod:
    | "app-store"
    | "validation"
    | "ad-hoc"
    | "package"
    | "enterprise"
    | "development"
    | "developer-id"
    | "mac-application";
  /**
   * Development team id.
   */
  exportTeamId: string;
  profilesDir: string;
  /**
   * Provisioning profile name
   */
  provisioningProfileName: string;
}

export interface FrameworksConfig {
  /**
   * iOS Framework to be added to project
   */
  framework: string;
  /**
   * iOS Framework directory path from project root source
   */
  path?: string;
}

// ANDROID
export interface Android {
  /**
   * Application source code name
   */
  name: string;
  /**
   * Android app display name
   */
  displayName: string;
  /**
   * Gradle configuration
   */
  gradle?: Gradle;
  /**
   * AndroidManifest.xml configuration
   */
  manifest?: Manifest;
  /**
   * Android network_security_config.xml configuration
   */
  security?: NetworkSecurityConfigType.NetworkSecurityConfigElements;
  /**
   * Android styles.xml configuration
   */
  styles?: Styles;
  /**
   * Android strings.xml configuration
   */
  strings?: StringsType.StringsElements;
  /**
   * App package name
   */
  packageName: string;
  /**
   * signing config
   */
  signing?: AndroidSigning;
  /**
   * App version
   */
  versioning?: AndroidVersion;
}

export interface AndroidVersion {
  /**
   * App version i.e. versionName
   */
  version: string;
  /**
   * App build i.e. versionCode
   */
  build?: number;
}

export interface AndroidSigning {
  keyAlias: string;
  storeFile: string;
}

export interface AppGradle {
  /**
   * Additional dependencies for app/build.gradle
   */
  dependencies?: string[];
}

export interface ProjectGradle {
  /**
   * Android gradle plugin version.
   */
  androidGradlePluginVersion?: string;
  /**
   * Android build tools version
   */
  buildToolsVersion?: string;
  /**
   * Android compile SDK version
   */
  compileSdkVersion?: number;
  /**
   * Kotlin version
   */
  kotlinVersion?: string;
  /**
   * Min supported Android SDK
   */
  minSdkVersion?: number;
  /**
   * Specified NDK version
   */
  ndkVersion?: string;
  /**
   * Additional repository search paths
   */
  repositories?: string[];
  /**
   * Android target SDK version
   */
  targetSdkVersion?: number;
  /**
   * Ext config
   */
  ext?: string[];
  /**
   * Dependencies
   */
  dependencies?: string[];
  /**
   * Build repositories
   */
  buildRepositories?: string[];
}

export interface Manifest {
  /**
   * Additional Manifest attributes
   */
  manifestAttributes?: Partial<AndroidManifestType.AndroidManifestAttributes>;
  /**
   * Additional MainActivity attributes
   */
  mainActivityAttributes?: Partial<AndroidManifestType.ManifestActivityAttributes>;
  /**
   * Additional Application attributes
   */
  mainApplicationAttributes?: Partial<AndroidManifestType.ManifestApplicationAttributes>;
  /**
   * Url Scheme for intents
   */
  urlScheme?: UrlScheme;
  /**
   * Additional elements to add inside the <manifest> tag
   */
  manifestElements?: AndroidManifestType.AndroidManifestElements;
  /**
   * Additional elements to add inside the <application> tag
   */
  mainApplicationElements?: AndroidManifestType.ManifestApplicationElements;
  /**
   * Additional elements to add inside the main <activity> tag
   */
  mainActivityElements?: AndroidManifestType.ManifestActivityElements;
}

export interface Styles {
  appThemeAttributes?: Partial<StylesType.StyleAttributes>;
  appThemeElements?: StylesType.StyleElements;
}

export interface UrlScheme {
  scheme: string;
  host?: string;
}

export interface Gradle {
  /**
   * app/build.gradle config
   */
  appGradle?: AppGradle;
  /**
   * Gradle wrapper distribution url
   */
  distributionVersion?: string;
  /**
   * jvm args i.e. heap memory
   */
  jvmArgs?: string;
  /**
   * build.gradle config
   */
  projectGradle?: ProjectGradle;
}

export interface PackageManager {
  packageManager?: string;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface PluginType<T> {
  plugin: T;
}

export type Plugin<T, U = unknown> = DeepPartial<Config<U>> & PluginType<T>;
