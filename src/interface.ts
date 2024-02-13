export type LocalData = {
    name: string;
    startts: number;
    endts: number;
    moves: number[];
}[];

export type TempData = {
    startts?: number;
    moves?: number[];
}

export type DisplayDetail = {
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
};

export type DisplayInfo = {
    /**
     * 日期
     */
    date: string;
    babies: {
        name: string;
        details: DisplayDetail[];
        /**
         * 12小时推算
         */
        estimate: number;
    }[];
}[];
