export class Drag {
    constructor(el) {
        this.el = el;
        //鼠标按下时的元素位置
        this.startOffset = {};
        //鼠标按下时的鼠标坐标
        this.startPoint = {};
        let move = (e) => {this.move(e)};
        let end = (e) => {
            document.removeEventListener("mousemove",move);
            document.removeEventListener("mouseup",end)
        };
        el.addEventListener("mousedown",(e) => {
            this.start(e)
            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",end)
        })
    }
    start(e) {
       let {el} = this;
       this.startOffset = {
           x: el.offsetLeft,
           y: el.offsetTop
       };
       this.startPoint = {
           x: e.clientX,
           y: e.clientY
       }
    }
    move(e) {
        let {el,startOffset,startPoint} = this;
        let newPoint = {
            x: e.clientX,
            y: e.clientY 
        }     
        el.style.left = `${startOffset.x + (newPoint.x - startPoint.x)}px`;
        el.style.top = `${startOffset.y + (newPoint.y - startPoint.y)}px`;
    }
}