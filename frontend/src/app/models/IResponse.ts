
export interface CollectionResponse<T> {
    data: Array<T>,
    pageSize: number;
    currentPage: number;
    lastPage: number;
    totalObjectCount: number;
}

export interface BooleanResponse {
    isEnable: boolean
}