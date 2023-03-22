import ResolveTypeScriptPlugin from "resolve-typescript-plugin";

export default {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        plugins: [new ResolveTypeScriptPlugin()]
    }
};