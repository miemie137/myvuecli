const svg = {
    createTag :(tag,objAttr) => {
        let svgNS = "http://www.w3.org/2000/svg"; 
        let oTag = document.createElementNS(svgNS,tag);
        for(let attr in objAttr){
            oTag.setAttribute(attr,objAttr[attr])
        }
        return oTag;
    }
}
export default svg;