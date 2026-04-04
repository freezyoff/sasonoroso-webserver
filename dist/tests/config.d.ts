export declare const EnvEnum: {
    prod: string;
    dev: string;
    test: string;
};
export type EnvType = typeof EnvEnum[keyof typeof EnvEnum];
export declare const type: EnvType;
export declare const filePath: string;
declare const _default: NodeJS.ProcessEnv;
export default _default;
//# sourceMappingURL=config.d.ts.map