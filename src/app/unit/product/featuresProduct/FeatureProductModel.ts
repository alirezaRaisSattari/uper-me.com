import {ProductRepository} from "@/core/repository/product.repository";
import {ToastService} from "@/core/service/toast.service";
import {ProductStore} from "@/core/store/product.store";


export class FeatureProductModel {
    listFeature: { id: number, name: string, isShowFeature: boolean, isDisable: boolean, answer: [] }[]
    listAnswerMulti: { id: number, name: string, isShowOuted: boolean, isSelected }[]
    modelFeature: { featureId: number, answerId: number, isShowOuted: boolean, isSelected: boolean }[];
    nameFeature: string;

    constructor() {
        this.listFeature = [];
        this.listAnswerMulti = [];
        this.modelFeature = [];
    }

    getCategoryFeatureByCategoryId(categoryId: number, callback?: (item) => void) {
        ProductRepository.getInstance().getFeatureByCategoryId({
            body: [categoryId],
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.getFeature(res);
                    callback(this.listFeature);
                } else ToastService.getInstance().error("موردی یاقت نشد");
            }
        })
    }

    createCategoryFeatureMultiAnswer(valueAnswer: string, featureId: number, categoryId: number) {
        ProductRepository.getInstance().createFeatureAnswerMulti({
            body: [
                {
                    answers: [
                        {
                            name: valueAnswer
                        }
                    ],
                    featureId: featureId
                }
            ],
            onReceive: () => {
                this.getCategoryFeatureByCategoryId(categoryId, (item) => {
                    this.getAnswer(featureId, item);
                })
                ToastService.getInstance().success("عملیات با موفقیت انجام شد");
            }
        })
    }

    createCategoryFeatureWithAnswer(model, categoryId: number) {
        ProductRepository.getInstance().createFeatureWithAnswer({
            body: model,
            onReceive: () => {
                this.getCategoryFeatureByCategoryId(categoryId, (item => {
                    ProductStore().listFeatureCreate = item;
                    this.getFeature(item);
                }))
                ToastService.getInstance().success("عملیات با موفقیت انجام شد");
            }
        })
    }

    getAnswer(featureId: number, listFeature) {
        this.listAnswerMulti = [];
        listFeature = listFeature.find(i => i.id === featureId)
        this.nameFeature = listFeature.name;
        listFeature.answer.forEach((item) => {
            this.listAnswerMulti.push({
                id: item.id,
                name: item.name,
                isShowOuted: false,
                isSelected: false
            })
        })
    }

    getFeature(listFeature) {
        this.listFeature = [];
        listFeature.forEach((item) => {
            this.listFeature.push({
                id: item.id,
                name: item.name,
                isShowFeature: false,
                isDisable: true,
                answer: item.answer
            })
        })
    }
}