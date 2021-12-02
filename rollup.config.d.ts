declare namespace _default {
    const input: string;
    namespace output {
        const dir: string;
        const format: string;
    }
    const plugins: import("rollup").Plugin[];
    const external: string[];
}
export default _default;
