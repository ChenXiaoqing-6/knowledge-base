
export interface CollectionResponse<T> {
    data: Array<T>,
    currentPage: number;
    lastPage: number;
    totalObjectCount: number;
}