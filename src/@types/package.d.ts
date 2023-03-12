declare global {
  namespace File {
    export interface Package {
      readonly version: string;
      readonly name: string;
      readonly description: string;
      readonly main: string;
      readonly license: string;
      readonly keywords: string[];
      readonly author: string[];
      readonly private: boolean;
    }
  }
}

export {};
