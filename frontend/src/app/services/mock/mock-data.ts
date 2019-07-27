import { ISearchOptions } from "../../models/IRequestOptions";
import { Observable, timer, throwError } from "rxjs";
import { CollectionResponse } from "../../models/IResponse";
import { IArticle } from "../../models/IArticle";
import { tap, mapTo } from "rxjs/operators";

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

export const MockLinkedArticlesResponse: any = {
  "data": [
      {
          "id": "1",
          "provider": "Mindtouch",
          "title": "Issue Reporting",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2019-07-25T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
          "views": 26,
          "author": "Ivan Magalhães",
          "category": "", //1908+
          "upvotes": 23,  //1908+
          "devotes": 0,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
          "id": "2",
          "provider": "Mindtouch",
          "title": "Information Check",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2017-09-07T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
          "views": 400,
          "author": "James Bond",
          "category": "",
          "upvotes": 12,  //1908+
          "devotes": 0,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
          "id": "3",
          "provider": "Mindtouch",
          "title": "Issue Reporting to Responsible Machine Designer in the Team",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2019-06-25T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
          "views": 26,
          "author": "James Bond",
          "category": "",
          "upvotes": 13,  //1908+
          "devotes": 3,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
          "id": "4",
          "provider": "Mindtouch",
          "title": "Machine Learning",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2018-11-02T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
          "views": 234,
          "author": "James Bond",
          "category": "",
          "upvotes": 24,  //1908+
          "devotes": 4,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      }
  ],
  "totalObjectCount": 4
}

export const MockSuggestedArticlesResponse: any = {
  "data": [
      {
          "id": "1",
          "provider": "Mindtouch",
          "title": "Washing Machine",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2017-09-07T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
          "views": 400,
          "author": "Roman Kutepov",
          "category": "", //1908+
          "upvotes": 23,  //1908+
          "devotes": 0,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
          "id": "2",
          "provider": "Mindtouch",
          "title": "Chicken Machine",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2018-11-02T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/test_German?mt-f1=true&mt-view=f1",
          "views": 234,
          "author": "Cayla Brister",
          "category": "",
          "upvotes": 12,  //1908+
          "devotes": 0,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
          "id": "3",
          "provider": "Mindtouch",
          "title": "Learnning Machine",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2019-06-25T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
          "views": 26,
          "author": "Ivan Magalhães",
          "category": "",
          "upvotes": 13,  //1908+
          "devotes": 3,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
          "id": "4",
          "provider": "Mindtouch",
          "title": "Design Machine",
          "content": "This guide provides an overview of product features and related technologies", //1908+
          "lastUpdated": "2016-01-12T06:18:26Z",
          "score": 0.9,
          "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
          "renderType": "IFRAME",
          "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
          "views": 196,
          "author": "Roman Kutepov",
          "category": "",
          "upvotes": 24,  //1908+
          "devotes": 4,  //1908+
          "tag": ["troubleshooting", "coffee maker"],  //1908+
      },
      {
        "id": "5",
        "provider": "Mindtouch",
        "title": "Happy Machine",
        "content": "This guide provides an overview of product features and related technologies", //1908+
        "lastUpdated": "2019-02-12T06:18:26Z",
        "score": 0.9,
        "link": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
        "renderType": "IFRAME",
        "renderValue": "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
        "views": 26,
        "author": "Shinohara Ryoma",
        "category": "",
        "upvotes": 24,  //1908+
        "devotes": 4,  //1908+
        "tag": ["troubleshooting", "coffee maker"],  //1908+
    }
  ],
  "totalObjectCount": 5
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

export function MockLinkedArticles(): Observable<CollectionResponse<IArticle>> {
  let ret = {
    ...MockLinkedArticlesResponse,
  };
  return timer(1000).pipe(tap(()=>{console.log("done.");}),mapTo(ret));
  // return throwError(new Error('Fake error'));
}

export function MockSuggestedArticles(): Observable<CollectionResponse<IArticle>> {
  let ret = {
    ...MockSuggestedArticlesResponse,
  };
  return timer(1000).pipe(tap(()=>{console.log("done.");}),mapTo(ret));
  // return throwError(new Error('Fake error'));
}