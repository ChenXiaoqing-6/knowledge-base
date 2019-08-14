import { ISearchOptions } from "../../models/IRequestOptions";
import { Observable, timer } from "rxjs";
import { CollectionResponse } from "../../models/IResponse";
import { IArticle } from "../../models/IArticle";
import { IExtendArticleLinkage } from "../../models/IArticleLinkage";
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
      "id": "2001",
      "provider": "Mindtouch",
      "title": "[search] Issue Reporting",
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
      "id": "2002",
      "provider": "Mindtouch",
      "title": "[search] Information Check",
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
      "id": "2003",
      "provider": "Mindtouch",
      "title": "[search] Issue Reporting to Responsible Machine Designer in the Team",
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
      "title": "[linked] Machine Learning",
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
  "pageSize": 20,
  "currentPage": 1,
  "lastPage": 4,
  "totalObjectCount": 4
}

export const MockLinkedArticlesResponse: any = {
  "data": [
    {
      "article":
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
      "articleLinkage": {
        "id": "1",
        "articleId": "1",
        "providerType": "mind touch",
        "objectRef": {
          "objectId": "1",
          "objectType": "CASE"
        }
      }
    },

    {
      "article":
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
      "articleLinkage": {
        "id": "2",
        "articleId": "2",
        "providerType": "mind touch",
        "objectRef": {
          "objectId": "1",
          "objectType": "CASE"
        }
      }
    },
    {
      "article":
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
      "articleLinkage": {
        "id": "3",
        "articleId": "3",
        "providerType": "mind touch",
        "objectRef": {
          "objectId": "1",
          "objectType": "CASE"
        }
      }
    },
    {
      "article":
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
      },
      "articleLinkage": {
        "id": "4",
        "articleId": "4",
        "providerType": "mind touch",
        "objectRef": {
          "objectId": "1",
          "objectType": "CASE"
        }
      }
    },
  ],
  "totalObjectCount": 4
}

export function mockSearch(options: ISearchOptions): Observable<CollectionResponse<IArticle>> {
  let ret = {
    ...MockSearchResponse,
  };
  return timer(2000).pipe(tap(() => { console.log("done."); }), mapTo(ret));
}

export function MockLinkedArticles(): Observable<CollectionResponse<IExtendArticleLinkage>> {
  let ret = {
    ...MockLinkedArticlesResponse,
  };
  return timer(2000).pipe(tap(() => { console.log("done."); }), mapTo(ret));
  // return throwError(new Error('Fake error'));
}