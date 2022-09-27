import {PostRepository} from "@/core/repository/post.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {BASE_TAKE, Constant} from "@/core/constant/constant";

export class ExploreState {

    suggestions = [];
    suggestionsReachedMax = false;
    loading = false;
    getSuggestion(isScroll: boolean, tagId: number) {
        if (this.loading) return;
        if (!isScroll && this.suggestionsReachedMax) {
            this.suggestionsReachedMax = false;
        }

        if (this.suggestionsReachedMax) return;

        if (!isScroll) {
            this.suggestions = [];
        }
        if (isNaN(Number(tagId)) || Number(tagId) == 0) {
            PostRepository.getInstance().getSuggestion(this.getRequestBody(tagId));
        } else {
            PostRepository.getInstance().GetExploreWithHashtagId(this.getRequestBody(tagId))
        }
    }

    getRequestBody(tagId) {
        return {
            body: isNaN(Number(tagId)) == null ? {
                pageId: getSelectedPageId(), take: Constant.TAKE_20
            } : {
                skip: this.getLength(),
                take: Constant.TAKE_20,
                hashtagId: tagId,
                pageId: getSelectedPageId()
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    if (res.length < BASE_TAKE) {
                        this.suggestionsReachedMax = true;
                    }
                    this.afterResponseReceived(res);
                } else {
                    this.suggestionsReachedMax = true;
                }

            }
        }
    }

    afterResponseReceived(res: any[]) {
        for (let i = 0; i < res.length; i++) {
            let x = this.suggestions.findIndex(m => m.items.length < 9);
            if (x === -1) {
                this.suggestions.push({items: [res[i]]});
            } else {
                this.suggestions[x].items.push(res[i]);
            }
        }
        localStorage.setItem("exploreitems",JSON.stringify(this.suggestions))
    }

    getLength() {
        let count = 0;
        for (let i = 0; i < this.suggestions.length; i++) {
            count += this.suggestions[i].items.length;
        }
        return count;
    }
}
