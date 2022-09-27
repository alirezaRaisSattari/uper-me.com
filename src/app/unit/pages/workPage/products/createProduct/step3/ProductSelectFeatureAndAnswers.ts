import {ProductRepository} from "@/core/repository/product.repository";
import {ToastService} from "@/core/service/toast.service";
import {createFeatureWithAnswerModel} from "@/data/city/product/product.model";
import {i18n} from "@/main";

export class productFeatureAndAnswerState {
    featureLoad = false
    featureList = []
    createFeatureLoading = false
    answerLoading = false

    getFeature(body) {
        ProductRepository.getInstance().getFeatureByCategoryId({
            body: [body],
            onLoadChange: (load) => {
                this.featureLoad = load
            },
            onReceive: (res) => {
                if (res != null) {
                    res.forEach(element => {
                        element['disable'] = true
                        element.answer.forEach(answer => {
                            answer['isSelected'] = false,
                                answer['isShowOuted'] = false
                        });
                        this.featureList.push(element)
                    });
                }
            }
        })
    }

    createFeatureWithAnswer(body, created: Function) {
        ProductRepository.getInstance().createFeatureWithAnswer({
            body: <createFeatureWithAnswerModel>{...body},
            onLoadChange: (load) => {
                this.createFeatureLoading = load
            },
            onReceive: (res) => {
                created()
                ToastService.getInstance().success(i18n.global.tc("addFeatureSuccessfully"));
            }
        })
    }

    createFeatureAnswerMulti(body, created: Function) {
        ProductRepository.getInstance().createFeatureAnswerMulti({
            body: body,
            onLoadChange: (load) => {
                this.answerLoading = load
            },
            onReceive: (res) => {
                created(res)
                ToastService.getInstance().success(i18n.global.tc("addFeatureSuccessfully"));
            }
        })
    }
}
