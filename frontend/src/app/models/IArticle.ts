import { RenderType } from './rendertype.enum'

export interface IArticle {
    id: string;
    provider: string,
    title: string,
    content?: string,
    lastUpdated: string,
    score: number,
    link: string,
    renderType: RenderType,
    renderValue: string,
    views: number,
    author: string,
    category?: string,  //TBD: enum or string?
    upvotes?: number,
    devotes?: number,
    tag?: Array<string>
}
