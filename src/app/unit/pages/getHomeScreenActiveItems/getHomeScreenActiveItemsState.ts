import {PostRepository} from "@/core/repository/post.repository";
import {ProductRepository} from "@/core/repository/product.repository";
import {UserRepository} from "@/core/repository/user.repository";
import {StoryRepository} from "@/core/repository/story.repository";
import {CacheService} from "@/core/service/cache.service";
import {likeAndUnlikePosts, postMainPageCommentModel} from "@/data/city/mainpage/post.model";
import {DateService} from "@/core/service/date.service";
import router from "@/core/router/router";

export class activeItemsState {
    cities = []
    searchResult = []
    banners = []
    items = []
    stories = []
    AmazingProduct = []
    productLoading = false
    itemLoading = false
    itemIsFinished = false
    paginationCount = 1
    commentLoading = false
    likeLoading = false
    unlikeLoading = false
    recentStories = [];

    getCities() {
        this.cities = CacheService.getInstance().getCities();
    }

    serachCity(value, onSearch: Function) {
        if (value == null) {
            this.searchResult = this.cities;
            return
        }
        this.searchResult = this.cities.filter(e => e.cityName.includes(value));
        if (this.searchResult.length != 0) {
            onSearch(this.searchResult)
        } else onSearch(false)
    }

    GetHomeScreenActiveItems(body) {
        if (this.itemIsFinished || this.itemLoading) return
        body.pagination = this.paginationCount
        UserRepository.getInstance().GetHomeScreenActiveItems({
            body: body,
            onLoadChange: (load) => {
                this.itemLoading = load
            },
            onReceive: (res) => {
                if (res != null) {
                    if (res.items.length < 20) {
                        this.itemIsFinished = true
                    } else {
                        this.paginationCount++
                    }
                    if (res.banners != null) {
                        res.banners.forEach(element => {
                            this.banners.push(element)
                        })
                    }
                    if (res.items != null) {
                        res.items.forEach(element => {
                            element.item['newComment'] = ''
                            element.item['commentList'] = []
                            this.items.push(element)
                        });
                    }
                    if (res.stories != null) {
                        res.stories.forEach(element => {
                            this.stories.push(element)
                        })
                    }
                }
            }
        })
    }

    GetAmazingProductByCity(body) {
        ProductRepository.getInstance().GetAmazingProductByCity({
            body: body,
            onLoadChange: (load) => {
                this.productLoading = load
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    for (let i = 0; i < res.length; i++) {
                        res[i]['remainingTime'] = ' ';
                        this.AmazingProduct.push(res[i]);
                        this.countDown(res[i].endAmazingTime, i);
                    }
                }
            }
        })
    }

    countDown(time, index) {
        DateService.getInstance().homeScreenCountDown(
            time,
            (_time) => {
                this.AmazingProduct[index].remainingTime = _time.timer;
                this.AmazingProduct[index].remainingDays = _time.days;
            },
            () => {
            }
        );
    }

    postComment(body) {
        PostRepository.getInstance().createComment({
            body: <postMainPageCommentModel>{...body},
            onLoadChange: (load) => this.commentLoading = load
        })
    }

    likePost(body, liked: Function) {
        PostRepository.getInstance().likePost({
            body: <likeAndUnlikePosts>{...body},
            onLoadChange: (load) => {
                this.likeLoading = load
            },
            onReceive: (res) => {
                liked()
            }
        })
    }

    unlikePost(body, unLiked: Function) {
        PostRepository.getInstance().unlikePost({
            body: <likeAndUnlikePosts>{...body},
            onReceive: (res) => {
                unLiked()
            },
            onLoadChange: (load) => {
                this.unlikeLoading = load
            }
        })
    }

    GetActiveStories(body) {
        StoryRepository.getInstance().GetActiveStories({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.recentStories = res
                }
            }
        })
    }

    checkBannerType(item) {
        switch (item.bannerReferenceType) {
            case 1:
              router.push("/product/" + item.referenceId + "/" + item.pageId);
              break;
            case 2:
              router.push("/page/" + item.pageId);
              break;
            case 3:
                let url:String = item.webUrl;
                if (url.includes('https://')) url.replace('https://' , '');
                if (url.includes('http://')) url.replace('http://' , '');

                Object.assign(document.createElement('a'), {
                    target: '_blank',
                    href: 'https://' + url,
                }).click();
              break;
            case 4:
               router.push("/eventPage?id=" + item.pageId);
              break;
            default:
               router.push("/product/" + item.referenceId + "/" + item.pageId);
              break;
          }
    }


    sliceController(count , list ) {
       
        console.log( count / 10 );
       return list.slice((count / 10 - 2) , count);
    }
}
