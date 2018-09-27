import { IFiles, IFile, IDependencies } from '../manager';
export declare function getPackageJSON(dependencies?: IDependencies, entry?: string): string;
export default function createMissingPackageJSON(files: IFiles, dependencies?: IDependencies, entry?: string): {
    [x: string]: IFile;
};
