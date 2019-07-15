export interface IPagination {
    pageSize: number;
    pageIndex: number;
}

export class Helper {

    public static create(): IPagination {
        return {
            pageSize: 5,
            pageIndex: 1
        };
    }

}
