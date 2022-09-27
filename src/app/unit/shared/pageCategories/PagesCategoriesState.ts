import {ToastService} from "@/core/service/toast.service";
import {elementScrolledToBottom, WindowLoading} from "@/core/service/utils.service";
import {i18n} from "@/main";
import {UserRepository} from "@/core/repository/user.repository";

export class PagesCategoriesState {

    breadsItem = []
    list = [];
    selectedLevel = null;
    search = '';
    show = false;
    firstSearch = false;
    itsDown = false;
    inPagination = false;
    blocked = false;
    en = false;
    catConfig = {
        step: 1,
        skip: 0,
        id: 0,
        oldSearch: '',
        catName1: null,
        catName2: null,
        catName3: null,
        catName4: null,
        catName5: null,
    }

    constructor(private onCallback) {

    }

    getList(id, level) {
        this.inPagination = false;
        UserRepository.getInstance().getCategoryByLevel(
            {
                body: {
                    id: id,
                    level: level
                },
                onReceive: ((res) => {
                    WindowLoading.value = false;
                    if (Array.isArray(res) && res.length != 0) {
                        this.list = res;
                    } else {
                        this.onCallback({postData: this.catConfig, selectedLevel: this.selectedLevel});
                    }
                }),
                onLoadChange: (load) => this.blocked = load
            }
        )
    }

    getListAndCategoryParents(id, level) {
        UserRepository.getInstance().getCategoryByLevel(
            {
                body: {
                    id: id,
                    level: level
                },
                onReceive: ((res) => {
                    if (res) {
                        this.list = res
                    }
                    this.GetCategoryParents(this.selectedLevel.id, this.selectedLevel.isLevel4);
                    this.onCallback({postData: this.catConfig, selectedLevel: this.selectedLevel})
                }),
                onLoadChange: (load) => this.blocked = load
            }
        )
    }

    onSearch() {
        if (this.search !== '') {
            if (this.firstSearch === false)

                elementScrolledToBottom('pageCategoryDialog', () => {
                    this.down(
                        true
                    );
                });
            this.list = [];
            this.inPagination = true;
            this.blocked = true;
            this.catConfig.skip = 0;
            this.catConfig.oldSearch = this.search;
            this.getListByName(this.catConfig.oldSearch, this.catConfig.skip);
        } else
            ToastService.getInstance().error(i18n.global.tc('noResponse'));
    }


    down(isScroll: boolean) {
        if (this.itsDown === false && this.search !== '' && isScroll === true) {
            this.itsDown = true
            this.blocked = true;
            this.catConfig.skip += 20;
            this.getListByName(this.catConfig.oldSearch, this.catConfig.skip);
        }
    }

    getListByName(name, skip) {
        if (this.catConfig.oldSearch !== this.search)
            this.catConfig.skip = 0;
        this.catConfig.oldSearch = this.search;
        this.catConfig.skip += 20;
        this.catConfig.step = 1;

        UserRepository.getInstance().SearchCategories4And5ByName(
            {
                body: {
                    skip: skip,
                    take: 20,
                    name: name
                },
                onReceive: ((res) => {
                    if (res !== null) {
                        const list1 = this.list;
                        const list2 = res;
                        this.list = []
                        if (list1 !== null)
                            this.list = list1.concat(list2);
                        else
                            this.list = list2;
                        this.itsDown = false
                        this.blocked = false;
                    } else
                        this.catConfig.skip = 0;
                    this.blocked = false;
                }),
                onLoadChange: (load) => this.blocked = load
            }
        )
    }

    back(item, level) {
        this.search = '';
        WindowLoading.value = true;
        this.catConfig.step = level;
        this.selectedLevel = item;
        switch (level) {
            case 1:
                this.blocked = true;
                this.catConfig.step = 2;
                this.catConfig.catName2 = null;
                this.catConfig.catName3 = null;
                this.catConfig.catName4 = null;
                this.catConfig.catName5 = null;
                this.catConfig.id = this.selectedLevel.categoryId;
                this.getList(this.catConfig.id, 2);
                break;
            case 2:
                this.blocked = true;
                this.catConfig.step = 3;
                this.catConfig.id = 0
                this.catConfig.catName3 = null;
                this.catConfig.catName4 = null;
                this.catConfig.catName5 = null;
                this.catConfig.id = this.selectedLevel.categoryId;

                this.getList(this.catConfig.id, 3);
                break;
            case 3:
                this.blocked = true;
                this.catConfig.step = 4;
                this.catConfig.catName4 = null;
                this.catConfig.catName5 = null;
                this.catConfig.id = this.selectedLevel.categoryId;
                this.getList(this.catConfig.id, 4);
                break;
            case 4:
                this.blocked = true;
                this.catConfig.step = 5;
                this.catConfig.catName5 = null;
                this.catConfig.id = this.selectedLevel.categoryId;
                this.getList(this.catConfig.id, 5);
                break;
            default:
                break;
        }
    }

    GetCategoryParents(categoryId, isLevel4) {

        UserRepository.getInstance().getListAndCategoryParents(
            {
                body: {
                    categoryId: categoryId,
                    isLevel4: isLevel4,
                },
                onReceive: ((res) => {
                    if (res) {
                        this.catConfig.catName1 = {
                            categoryId: res.categoryId1,
                            title: res.title1,
                            objectName: res.objectName1
                        }
                        this.catConfig.catName2 = {
                            categoryId: res.categoryId2,
                            title: res.title2,
                            objectName: res.objectName2
                        }
                        this.catConfig.catName3 = {
                            categoryId: res.categoryId3,
                            title: res.title3,
                            objectName: res.objectName3
                        }
                        this.catConfig.catName4 = {
                            categoryId: res.categoryId4,
                            title: res.title4,
                            objectName: res.objectName4
                        }
                        this.catConfig.catName5 = {
                            categoryId: res.categoryId5,
                            title: res.title5,
                            objectName: res.objectName5
                        }
                    }
                }),
                onLoadChange: (load) => this.blocked = load
            }
        )
    }

    getChild(item) {
        this.breadsItem.push(item)
        this.selectedLevel = item;
        if (this.selectedLevel.isLevel4 === true) {
            this.catConfig.step = 4;
            this.getListAndCategoryParents(this.selectedLevel.id, 4)
        } else if (this.selectedLevel.isLevel4 === false) {
            this.GetCategoryParents(this.selectedLevel.id, this.selectedLevel.isLevel4);
            this.onCallback({postData: this.catConfig, selectedLevel: this.selectedLevel})
        } else {
            this.catConfig.step += 1;
            switch (this.catConfig.step) {
                case 1:
                    this.reset();
                    break;
                case 2:
                    this.blocked = true;
                    this.catConfig.catName1 = this.selectedLevel;
                    this.catConfig.catName2 = null;
                    this.catConfig.catName3 = null;
                    this.catConfig.catName4 = null;
                    this.catConfig.catName5 = null;
                    this.getList(this.selectedLevel.categoryId, 2);
                    break;
                case 3:
                    this.blocked = true;
                    this.catConfig.catName2 = this.selectedLevel;
                    this.catConfig.catName3 = null;
                    this.catConfig.catName4 = null;
                    this.catConfig.catName5 = null;
                    this.getList(this.selectedLevel.categoryId, 3);
                    break;
                case 4:
                    this.catConfig.catName3 = this.selectedLevel;
                    this.getList(this.selectedLevel.categoryId, 4);
                    break;
                case 5:
                    this.blocked = true;
                    this.catConfig.catName4 = this.selectedLevel;
                    this.catConfig.catName5 = null;
                    this.getList(this.selectedLevel.categoryId, 5);
                    break;
                default:
                    this.catConfig.step = 5;
                    this.onCallback({postData: this.catConfig, selectedLevel: this.selectedLevel})
                    break;
            }
        }
    }


    reset() {
        this.blocked = true;
        this.getList(1, 1);
        this.search = '';
        this.catConfig.step = 1;
        this.catConfig.skip = 0;
        this.catConfig.oldSearch = '';
        this.catConfig.catName1 = null;
        this.catConfig.catName2 = null;
        this.catConfig.catName3 = null;
        this.catConfig.catName4 = null;
        this.catConfig.catName5 = null;
        WindowLoading.value = false;
    }
}
