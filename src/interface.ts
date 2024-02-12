export type LocalData = {
    name: string;
    startts: number;
    endts: number;
    moves: number[];
}[];

export type DisplayList = Record<
    string, // 日期
    Record<
        string, // 名字
        {
            /**
             * 12小时推算
             */
            estimate: number;
            details: {
                /**
                 * 开始时间
                 */
                startts: number;
                /**
                 * 持续时长
                 */
                duration: number;
                /**
                 * 有效胎动
                 */
                realMove: number[];
            }[];
        }
    >
>;
