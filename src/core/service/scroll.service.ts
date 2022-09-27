export class ScrollController {

    public static onScroll;

    constructor(private _onScroll) {
    }

    public startListen() {
        ScrollController.onScroll = this._onScroll;
        window.addEventListener('scroll', this.handleScroll);
    }

    public startElementListen(element) {
        ScrollController.onScroll = this._onScroll;
        document.getElementById(element).addEventListener('scroll', this.handleScroll);
    }

    public handleElementScroll() {
        if (
            (document.documentElement.scrollHeight - document.documentElement.scrollTop) >=
            document.documentElement.clientHeight &&
            (document.documentElement.scrollHeight - document.documentElement.scrollTop) <=
            document.documentElement.clientHeight + 100
        ) {
            ScrollController.onScroll();
        }
    }


    public handleScroll(_) {
        if (
            (document.documentElement.scrollHeight - document.documentElement.scrollTop) >=
            document.documentElement.clientHeight &&
            (document.documentElement.scrollHeight - document.documentElement.scrollTop) <=
            document.documentElement.clientHeight + 100
        ) {
            ScrollController.onScroll();
        }
    }

    public removeElementListen(element) {
        document.getElementById(element).removeEventListener('scroll', this.handleScroll);
        ScrollController.onScroll = null;
    }

    public removeListen() {
        window.removeEventListener('scroll', this.handleScroll);
        ScrollController.onScroll = null;
    }
}

export function scrollToTop() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
}
