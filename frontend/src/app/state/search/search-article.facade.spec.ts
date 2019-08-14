import { Helper as PaginationHelper } from '../../models/IPagination';
import { SearchArticlesReset, SearchArticles, LoadNextPage } from './search-article.actions';
import { ISearchOptions } from './../../models/IRequestOptions';
import { of, throwError } from 'rxjs';
import { StoreMock } from './../mock/store.mock';
import { KbSearchFacade } from './search-article.facade';
import { fakeAsync } from '@angular/core/testing';
import { KbLinkedListFacadeMock } from '../linkage/mock/linked-article.facade.mock';

describe('KbSearchFacade', () => {
    let storeMock: StoreMock;
    let kbSearchFacade: KbSearchFacade;
    const kbLinkedListFacade = new KbLinkedListFacadeMock();    

    beforeEach(() => {
        storeMock = new StoreMock();
        kbSearchFacade = new KbSearchFacade(<any>storeMock, <any>kbLinkedListFacade);
    });

    it('should return all articles in the state if success', fakeAsync(() => {
        const articles = [{ id: '1' }, { id: '2' }, , { id: '3' }];
        storeMock.pipe.and.returnValue(of(articles));
        kbSearchFacade.getArticles().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(articles);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.getArticles().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should dispatch SearchArticlesReset if the search term is empty', () => {
        kbSearchFacade.searchArticles({
            searchTerm: ' '
        } as ISearchOptions);
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SearchArticlesReset())
    });

    it('should dispatch SearchArticles if the search term is not empty', () => {
        let payload = {
            searchTerm: 'test'
        } as ISearchOptions;
        kbSearchFacade.searchArticles(payload);
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SearchArticles(payload));
    });

    it('should dispatch LoadNextPage if user scroll down to load more articles', () => {
        kbSearchFacade.loadMoreArticles();
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new LoadNextPage());
    });

    it('should dispatch SearchArticlesReset if call resetSearch', () => {
        kbSearchFacade.resetSearch();
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SearchArticlesReset());
    });

    it('should return Pagination in the state if success', fakeAsync(() => {
        const pagination = PaginationHelper.create();
        storeMock.pipe.and.returnValue(of(pagination));
        kbSearchFacade.getPagination().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(pagination);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.getPagination().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return SerachTerm in the state if success', fakeAsync(() => {
        const serachTerm = "search term";
        storeMock.pipe.and.returnValue(of(serachTerm));
        kbSearchFacade.getSerachTerm().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(serachTerm);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.getSerachTerm().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return LastPage in the state if success', fakeAsync(() => {
        const lastPage = 1;
        storeMock.pipe.and.returnValue(of(lastPage));
        kbSearchFacade.getLastPage().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(lastPage);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.getLastPage().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return TotalObjectCount in the state if success', fakeAsync(() => {
        const totalObjectCount = 100;
        storeMock.pipe.and.returnValue(of(totalObjectCount));
        kbSearchFacade.getTotalObjectCount().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(totalObjectCount);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.getTotalObjectCount().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isInit in the state if success', fakeAsync(() => {
        const isInit = true;
        storeMock.pipe.and.returnValue(of(isInit));
        kbSearchFacade.isInit().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isInit);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.isInit().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isSearching in the state if success', fakeAsync(() => {
        const isLoading = true;
        storeMock.pipe.and.returnValue(of(isLoading));
        kbSearchFacade.isSearching().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isLoading);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.isSearching().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return true if not loading and total count is 0', fakeAsync(() => {
        spyOn(kbSearchFacade, 'isSearching').and.returnValue(of(false));
        spyOn(kbSearchFacade, 'getTotalObjectCount').and.returnValue(of(0));

        kbSearchFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(true);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return false if loading', fakeAsync(() => {
        spyOn(kbSearchFacade, 'isSearching').and.returnValue(of(true));
        spyOn(kbSearchFacade, 'getTotalObjectCount').and.returnValue(of(0));

        kbSearchFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(false);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return false if not loading and total count is not 0', fakeAsync(() => {
        spyOn(kbSearchFacade, 'isSearching').and.returnValue(of(false));
        spyOn(kbSearchFacade, 'getTotalObjectCount').and.returnValue(of(2));

        kbSearchFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(false);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(_error).toBe(error);
        });
    }));


    it('should return correct PageSearchOptions if pageIndex <= lastPage', fakeAsync(() => {
        const pagination = {
            pageSize: 10,
            pageIndex: 1
        };
        const searchTerm = "search term";
        spyOn(kbSearchFacade, 'getPagination').and.returnValue(of(pagination));
        spyOn(kbSearchFacade, 'getLastPage').and.returnValue(of(10));
        spyOn(kbSearchFacade, 'getSerachTerm').and.returnValue(of(searchTerm));

        kbSearchFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toEqual({
                pagination: { ...pagination, pageIndex: pagination.pageIndex + 1 },
                searchTerm: searchTerm
            });
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return null if pageIndex > lastPage', fakeAsync(() => {
        spyOn(kbSearchFacade, 'getPagination').and.returnValue(of({
            pageIndex: 5
        }));
        spyOn(kbSearchFacade, 'getLastPage').and.returnValue(of(2));
        spyOn(kbSearchFacade, 'getSerachTerm').and.returnValue(of("search term"));

        kbSearchFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toBeNull();
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(_error).toBe(error);
        });
    }));

    it('should return isError in the state if success', fakeAsync(() => {
        const isError = true;
        storeMock.pipe.and.returnValue(of(isError));
        kbSearchFacade.isError().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isError);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbSearchFacade.isError().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

});