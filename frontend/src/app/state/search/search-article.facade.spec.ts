import { Helper as PaginationHelper } from '../../models/IPagination';
import { SearchArticlesReset, SearchArticles, LoadNextPage } from './search-article.actions';
import { ISearchOptions } from './../../models/IRequestOptions';
import { of, throwError } from 'rxjs';
import { StoreMock } from './../mock/store.mock';
import { KbSearchFacade } from './search-article.facade';
import { fakeAsync } from '@angular/core/testing';

describe('KbSearchFacade', () => {
    function setup() {
        const storeMock = new StoreMock();
        const kbViewFacade = new KbSearchFacade(<any>storeMock);
        return {
            kbViewFacade,
            storeMock
        };
    }
    it('should return all articles in the state if success', fakeAsync(() => {
        const service = setup();
        const articles = [{ id: '1' }, { id: '2' }, , { id: '3' }];
        service.storeMock.pipe.and.returnValue(of(articles));
        service.kbViewFacade.getArticles().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(articles);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.getArticles().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should dispatch SearchArticlesReset if the search term is empty', () => {
        const service = setup();
        service.kbViewFacade.searchArticles({
            searchTerm: ' '
        } as ISearchOptions);
        expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(service.storeMock.dispatch).toHaveBeenCalledWith(new SearchArticlesReset())
    });

    it('should dispatch SearchArticles if the search term is not empty', () => {
        const service = setup();
        let payload = {
            searchTerm: 'test'
        } as ISearchOptions;
        service.kbViewFacade.searchArticles(payload);
        expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(service.storeMock.dispatch).toHaveBeenCalledWith(new SearchArticles(payload));
    });

    it('should dispatch LoadNextPage if user scroll down to load more articles', () => {
        const service = setup();
        service.kbViewFacade.loadMoreArticles();
        expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(service.storeMock.dispatch).toHaveBeenCalledWith(new LoadNextPage());
    });

    it('should dispatch SearchArticlesReset if call resetSearch', () => {
        const service = setup();
        service.kbViewFacade.resetSearch();
        expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(service.storeMock.dispatch).toHaveBeenCalledWith(new SearchArticlesReset());
    });

    it('should return Pagination in the state if success', fakeAsync(() => {
        const service = setup();
        const pagination = PaginationHelper.create();
        service.storeMock.pipe.and.returnValue(of(pagination));
        service.kbViewFacade.getPagination().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(pagination);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.getPagination().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return SerachTerm in the state if success', fakeAsync(() => {
        const service = setup();
        const serachTerm = "search term";
        service.storeMock.pipe.and.returnValue(of(serachTerm));
        service.kbViewFacade.getSerachTerm().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(serachTerm);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.getSerachTerm().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return LastPage in the state if success', fakeAsync(() => {
        const service = setup();
        const lastPage = 1;
        service.storeMock.pipe.and.returnValue(of(lastPage));
        service.kbViewFacade.getLastPage().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(lastPage);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.getLastPage().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return TotalObjectCount in the state if success', fakeAsync(() => {
        const service = setup();
        const totalObjectCount = 100;
        service.storeMock.pipe.and.returnValue(of(totalObjectCount));
        service.kbViewFacade.getTotalObjectCount().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(totalObjectCount);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.getTotalObjectCount().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isInit in the state if success', fakeAsync(() => {
        const service = setup();
        const isInit = true;
        service.storeMock.pipe.and.returnValue(of(isInit));
        service.kbViewFacade.isInit().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isInit);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.isInit().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isSearching in the state if success', fakeAsync(() => {
        const service = setup();
        const isLoading = true;
        service.storeMock.pipe.and.returnValue(of(isLoading));
        service.kbViewFacade.isSearching().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isLoading);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.isSearching().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return data not found if not loading and total count is 0', fakeAsync(() => {
        const service = setup();
        spyOn(service.kbViewFacade, 'isSearching').and.returnValue(of(false));
        spyOn(service.kbViewFacade, 'getTotalObjectCount').and.returnValue(of(0));

        service.kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(true);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return data is found if in loading', fakeAsync(() => {
        const service = setup();
        spyOn(service.kbViewFacade, 'isSearching').and.returnValue(of(true));
        spyOn(service.kbViewFacade, 'getTotalObjectCount').and.returnValue(of(0));

        service.kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(false);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return data is found if total count is not 0', fakeAsync(() => {
        const service = setup();
        spyOn(service.kbViewFacade, 'isSearching').and.returnValue(of(false));
        spyOn(service.kbViewFacade, 'getTotalObjectCount').and.returnValue(of(2));

        service.kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(false);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(_error).toBe(error);
        });
    }));


    it('should return correct PageSearchOptions if pageIndex <= lastPage', fakeAsync(() => {
        const service = setup();
        const pagination = {
            pageSize: 10,
            pageIndex: 1
        };
        const searchTerm = "search term";
        spyOn(service.kbViewFacade, 'getPagination').and.returnValue(of(pagination));
        spyOn(service.kbViewFacade, 'getLastPage').and.returnValue(of(10));
        spyOn(service.kbViewFacade, 'getSerachTerm').and.returnValue(of(searchTerm));

        service.kbViewFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toEqual({
                pagination: { ...pagination, pageIndex: pagination.pageIndex + 1 },
                searchTerm: searchTerm
            });
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return null if pageIndex > lastPage', fakeAsync(() => {
        const service = setup();
        spyOn(service.kbViewFacade, 'getPagination').and.returnValue(of({
            pageIndex: 5
        }));
        spyOn(service.kbViewFacade, 'getLastPage').and.returnValue(of(2));
        spyOn(service.kbViewFacade, 'getSerachTerm').and.returnValue(of("search term"));

        service.kbViewFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toBeNull();
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const service = setup();
        const error = { error: 'TestError' };
        service.storeMock.pipe.and.returnValue(throwError(error));
        service.kbViewFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(_error).toBe(error);
        });
    }));

});