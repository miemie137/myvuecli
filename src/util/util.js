export const getExplore =()=> {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie:([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    if(Sys.ie) return ('IE: ' + Sys.ie);
    if(Sys.edge) return ('EDGE: ' + Sys.edge);
    if(Sys.firefox) return ('FIREFOX: ' + Sys.firefox);
    if(Sys.opera) return ('OPERA: ' + Sys.opera);
    if(Sys.safari) return ('SAFARI: ' + Sys.safari);
    if(Sys.chrome) return ('CHROME: ' + Sys.chrome);
    return 'Unkonwn'
}
