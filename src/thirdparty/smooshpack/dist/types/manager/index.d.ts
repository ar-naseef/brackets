import { Protocol } from 'codesandbox-api';
export interface IManagerOptions {
    /**
     * Location of the bundler.
     */
    bundlerURL?: string;
    /**
     * Width of iframe.
     */
    width?: string;
    /**
     * Height of iframe.
     */
    height?: string;
    /**
     * If we should skip the third step: evaluation.
     */
    skipEval?: boolean;
    /**
     * You can pass a custom file resolver that is responsible for resolving files.
     * We will use this to get all files from the file system.
     */
    fileResolver?: {
        isFile: (path: string) => Promise<boolean>;
        readFile: (path: string) => Promise<string>;
    };
}
export interface IFile {
    code: string;
}
export interface IFiles {
    [path: string]: IFile;
}
export interface IModules {
    [path: string]: {
        code: string;
        path: string;
    };
}
export interface IDependencies {
    [depName: string]: string;
}
export interface ISandboxInfo {
    files: IFiles;
    dependencies?: IDependencies;
    entry?: string;
    /**
     * What template we use, if not defined we infer the template from the dependencies or files.
     *
     * @type {string}
     */
    template?: string;
    showOpenInCodeSandbox?: boolean;
}
export default class PreviewManager {
    selector: string | undefined;
    element: Element;
    iframe: HTMLIFrameElement;
    options: IManagerOptions;
    listener?: Function;
    fileResolverProtocol?: Protocol;
    bundlerURL: string;
    sandboxInfo: ISandboxInfo;
    constructor(selector: string | HTMLIFrameElement, sandboxInfo: ISandboxInfo, options?: IManagerOptions);
    updateOptions(options: IManagerOptions): void;
    updatePreview(sandboxInfo?: ISandboxInfo): void;
    dispatch(message: Object): void;
    /**
     * Get the URL of the contents of the current sandbox
     */
    getCodeSandboxURL(): Promise<{
        sandboxId: string;
        editorUrl: string;
        embedUrl: string;
    }>;
    private getFiles;
    private initializeElement;
}
