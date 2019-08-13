export interface IPagination {
    pageSize: number;
    pageIndex: number;
}

export class Helper {

    public static create(): IPagination {
        return {
            pageSize: 10,
            pageIndex: 1
        };
    };

    public static createSuggestedPagination(): IPagination {
        return {
            pageSize: 5,
            pageIndex: 1
        };
    };

    public static createLinkagePagination(): IPagination {
        return {
            pageSize: 50,
            pageIndex: 1
        };
    };

}
