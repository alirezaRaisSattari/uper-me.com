import {PostRepository} from "@/core/repository/post.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {useRoute} from "vue-router";
import { BASE_TAKE_18 } from "@/core/constant/constant";
export class ViewLikeState {
    list = []
    loading = false
    endlist = false
    skipNum : Number

    viewlike() {
        if (this.loading || this.endlist) return
        this.skipNum = this.list.length
        const route = useRoute()
        PostRepository.getInstance().Postlike(

            {

                body: {
                    skip: this.skipNum,
                    take: BASE_TAKE_18,
                    pageId: getSelectedPageId(),
                    postId: Number(route.params.id),
                    requestTime: new Date().toISOString(),
                },
                onReceive: (res) => {
                    if (Array.isArray(res)) {
                    if (res.length < BASE_TAKE_18) this.endlist = true
                    this.list.push(...res)
                } else {
                    this.endlist = true;
                }
                },
                onLoadChange:(load)=>{this.loading = load}
            })
        }

}