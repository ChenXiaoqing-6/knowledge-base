import { ISearchOptions } from "../../models/IRequestOptions";
import { Observable, timer, throwError } from "rxjs";
import { CollectionResponse } from "../../models/IResponse";
import { IArticle } from "../../models/IArticle";
import { tap, mapTo } from "rxjs/operators";
import { RenderType } from "../../models/RenderType.enum";

export const MockArticleResponse: any = {
    "id": "20001",
    "provider": "Mindtouch",
    "title": "test guide",
    "content": "This guide provides an overview of product features and related technologies", //1908+
    "lastUpdated": "2016-12-16T06:18:26Z",
    "score": 0.9,
    "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
    "renderType": "IFRAME",
    "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_category?mt-f1=true&mt-view=f1",
    "views": 125,
    "author": "James Bond",
    "category": "", //1908+
    "upvotes": 23,  //1908+
    "devotes": 0,  //1908+
    "tag": ["troubleshooting", "coffee maker"],  //1908+
}
export const MockSuggestedResponse: IArticle[] = [
 { 
  "id": "30001",
  "provider": "Mindtouch",
  "title": "Suggested Article1",
  "content": "This guide provides an overview of product features and related technologies", //1908+
  "lastUpdated": new Date("2016-12-16T06:18:26Z"),
  "score": 0.9,
  "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
  "renderType": RenderType.IFRAME,
  "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
  "views": 125,
  "author": "James Bond",
  "category": "", //1908+
  "upvotes": 23,  //1908+
  "devotes": 0,  //1908+
  "tag": ["troubleshooting", "coffee maker"],  //1908+
},
{ 
  "id": "30002",
  "provider": "Mindtouch",
  "title": "Suggested Article2",
  "content": "This guide provides an overview of product features and related technologies", //1908+
  "lastUpdated": new Date("2016-12-16T06:18:26Z"),
  "score": 0.9,
  "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
  "renderType": RenderType.IFRAME,
  "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
  "views": 125,
  "author": "James Bond",
  "category": "", //1908+
  "upvotes": 23,  //1908+
  "devotes": 0,  //1908+
  "tag": ["troubleshooting", "coffee maker"],  //1908+
},
{ 
  "id": "30003",
  "provider": "Mindtouch",
  "title": "Suggested Article3",
  "content": "This guide provides an overview of product features and related technologies", //1908+
  "lastUpdated": new Date("2016-12-16T06:18:26Z"),
  "score": 0.9,
  "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
  "renderType": RenderType.IFRAME,
  "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
  "views": 125,
  "author": "James Bond",
  "category": "", //1908+
  "upvotes": 23,  //1908+
  "devotes": 0,  //1908+
  "tag": ["troubleshooting", "coffee maker"],  //1908+
},
{ 
  "id": "30004",
  "provider": "Mindtouch",
  "title": "Suggested Article4",
  "content": "This guide provides an overview of product features and related technologies", //1908+
  "lastUpdated": new Date("2016-12-16T06:18:26Z"),
  "score": 0.9,
  "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
  "renderType": RenderType.IFRAME,
  "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
  "views": 125,
  "author": "James Bond",
  "category": "", //1908+
  "upvotes": 23,  //1908+
  "devotes": 0,  //1908+
  "tag": ["troubleshooting", "coffee maker"],  //1908+
},
{ 
  "id": "30005",
  "provider": "Mindtouch",
  "title": "Suggested Article5",
  "content": "This guide provides an overview of product features and related technologies", //1908+
  "lastUpdated": new Date("2016-12-16T06:18:26Z"),
  "score": 0.9,
  "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
  "renderType": RenderType.IFRAME,
  "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
  "views": 125,
  "author": "James Bond",
  "category": "", //1908+
  "upvotes": 23,  //1908+
  "devotes": 0,  //1908+
  "tag": ["troubleshooting", "coffee maker"],  //1908+
}
]
export const MockSearchResponse: any = {
    "data": [
        {
            "id": "20001",
            "provider": "Mindtouch",
            "title": "test guide",
            "content": "This guide provides an overview of product features and related technologies", //1908+
            "lastUpdated": "2016-12-16T06:18:26Z",
            "score": 0.9,
            "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
            "renderType": "IFRAME",
            "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
            "views": 125,
            "author": "James Bond",
            "category": "", //1908+
            "upvotes": 23,  //1908+
            "devotes": 0,  //1908+
            "tag": ["troubleshooting", "coffee maker"],  //1908+
        },
        {
            "id": "20002",
            "provider": "Mindtouch",
            "title": "test guide2",
            "content": "This guide provides an overview of product features and related technologies", //1908+
            "lastUpdated": "2016-12-16T06:18:26Z",
            "score": 0.9,
            "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
            "renderType": "IFRAME",
            "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
            "views": 20,
            "author": "James Bond",
            "category": "",
            "upvotes": 12,  //1908+
            "devotes": 0,  //1908+
            "tag": ["troubleshooting", "coffee maker"],  //1908+
        },
        {
            "id": "20003",
            "provider": "Mindtouch",
            "title": "test guide3",
            "content": "This guide provides an overview of product features and related technologies", //1908+
            "lastUpdated": "2016-12-16T06:18:26Z",
            "score": 0.9,
            "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
            "renderType": "IFRAME",
            "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
            "views": 30,
            "author": "James Bond",
            "category": "",
            "upvotes": 13,  //1908+
            "devotes": 3,  //1908+
            "tag": ["troubleshooting", "coffee maker"],  //1908+
        },
        {
            "id": "20004",
            "provider": "Mindtouch",
            "title": "test guide4",
            "content": "This guide provides an overview of product features and related technologies", //1908+
            "lastUpdated": "2016-12-16T06:18:26Z",
            "score": 0.9,
            "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
            "renderType": "IFRAME",
            "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
            "views": 40,
            "author": "James Bond",
            "category": "",
            "upvotes": 24,  //1908+
            "devotes": 4,  //1908+
            "tag": ["troubleshooting", "coffee maker"],  //1908+
        }
    ],
    "pageSize": 20,
    "currentPage": 1,
    "lastPage": 4,
    "totalObjectCount": 100
}


export function mockSearch(options: ISearchOptions): Observable<CollectionResponse<IArticle>>  {
    if (options.searchTerm.indexOf("Error") >= 0) {
        return throwError(new Error('Fake error')); 
      }
  
      let data: Array<IArticle> = [];
      let types: Array<string> = ["Java", "Angular", "Nodejs", "Javascript"];
      for (let i = 1; i <= 100; i++) {
        let tag = types[i % types.length];
        data.push({ ...MockArticleResponse, id: 5000 + i, title: `mockArticle-${i}-tag[${tag}]` });
      }
  
      let typeData:Array<IArticle> = data.filter((article)=> {
        return article.title.indexOf(options.searchTerm) >= 0;
      });
  
      let no = 0;
      let typeDataPages: Array<Array<IArticle>> = [];
      while(no < typeData.length) {
        typeDataPages.push(typeData.slice(no, no+options.pagination.pageSize));
        no += options.pagination.pageSize;
      }
      let ret = {
        ...MockSearchResponse, 
        data: (options.pagination.pageIndex <= typeDataPages.length) ? 
          typeDataPages[options.pagination.pageIndex-1] : [], 
        lastPage: typeDataPages.length || 1,  
        totalObjectCount: typeData.length
      };
      console.log("request server: ", options);
      return timer(1000).pipe(tap(()=>{console.log("done.");}),mapTo(ret));
}