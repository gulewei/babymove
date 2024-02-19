export type LocalDataItem = {
    name: string;
    startts: number;
    endts: number;
    moves: number[];
}
export type LocalData = LocalDataItem[];

export type TempData = {
    startts?: number;
    moves?: number[];
};

export type DisplayInfo = {
    /**
     * 日期
     */
    date: string;
    babies: {
        name: string;
        details: {
            /**
             * 开始时间
             */
            time: string;
            /**
             * 持续时长(分钟)
             */
            duration: number;
            moveTimes: number;
            /**
             * 有效胎动
             */
            realMoveTimes: number;
        }[];
        /**
         * 12小时推算
         */
        estimate: number;
    }[];
}[];
