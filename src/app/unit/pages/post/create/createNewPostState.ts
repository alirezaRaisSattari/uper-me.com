import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import router from "@/core/router/router";
import { PostRepository } from "@/core/repository/post.repository";
import { FileUploaderService, ImageUploaderKeys, VideoUploaderKeys } from "@/core/service/fileUploader.service";
import { getSelectedPageId } from "@/core/service/utils.service";

export class createNewPostState {
    hashtagList = []
    hashtagLoading = false
    urlImages = []
    coverIsFinish = false
    uploadFilesIsFinish = false;
    postImgsForUpload = []
    coverImage = null
    postsFile = []
    myPageId = getSelectedPageId()
    captionTxt = ''
    turnOnCommenting = true
    oldHashtags = []
    newHashtags = []
    displaySendLoading = false
    username = ""


    createPost(model) {
        PostRepository.getInstance().createNewPostState({
            body: model,
            onReceive: (res) => {
                setTimeout(() => {
                    ToastService.getInstance().success(i18n.global.tc('success'))
                    router.push(`/page/${this.username}`)
                }, 800)
            }
        })
    }

    findHashtags(model) {
        PostRepository.getInstance().findHashtags({
            body: model,
            onReceive: (res) => {
                this.hashtagList = res ?? []
            },
            onLoadChange: (load) => this.hashtagLoading = load
        })
    }   

    uploadCover(img, onLink: Function) {
        FileUploaderService.getInstance().uploadImage({
            file: img,
            onProgressChange: (progress) => {
            },
            onError: (msg) => {

            },
            onReceive: (res) => {
                onLink(res)
                this.coverImage = res
                this.uploadAll()
            },
        }, ImageUploaderKeys.POST_COVER)
    }

    uploadImage(img, i, onLink: Function) {
        FileUploaderService.getInstance().uploadImage({
            file: img,
            onProgressChange: (progress) => {
                this.postImgsForUpload[i].progress = progress
            },
            onError: (msg) => {

            },
            onReceive: (res) => {
                onLink(res)
                let exist = this.postImgsForUpload.find(val => typeof val.link != 'string');
                if (exist) {
                    return
                }
                this.createModelAndCallCreateAPI()
            },
        }, ImageUploaderKeys.POST_IMAGE)
    }

    uploadVideo(video, i, onLink: Function) {
        FileUploaderService.getInstance().uploadVideo({
            file: video,
            onProgressChange: (progress) => {
                this.postImgsForUpload[i].progress = progress
            },
            onError: (msg) => {
            },
            onReceive: (res) => {
                onLink(res)
                let exist = this.postImgsForUpload.find(val => typeof val.link != 'string');
                if (exist) {
                    return
                }
                this.createModelAndCallCreateAPI()
            },
        }, VideoUploaderKeys.POST)
    }

    uploadAll() {
        for (let i = 0; i < this.postImgsForUpload.length; i++) {
            if (this.postImgsForUpload[i].isImage) {
                this.uploadImage(this.postImgsForUpload[i].base64, i, (link) => {
                    this.postImgsForUpload[i].link = link;
                });
            } else {
                this.uploadVideo(this.postImgsForUpload[i].base64, i, (link) => {
                    this.postImgsForUpload[i].link = link;
                });
            }
        }
    }

    createModelAndCallCreateAPI() {
        this.displaySendLoading = true

        for (let i = 0; i < this.postImgsForUpload.length; i++) {
            this.postsFile.push({
                isImage: this.postImgsForUpload[i].isImage,
                partOfPost: i + 1,
                fileUrl: this.postImgsForUpload[i].link,
            });
        }
        let model = {
            pageId: this.myPageId,
            caption: this.captionTxt,
            mainFileIsImage: this.postsFile[0].isImage,
            coverImageUrl: this.coverImage ?? this.postsFile[0].fileUrl,
            turnOffCommenting: this.turnOnCommenting,
            postFiles: this.postsFile,
            hashTags: this.oldHashtags,
            newHashTags: this.newHashtags,
        };
        this.createPost(model);
    }
}
