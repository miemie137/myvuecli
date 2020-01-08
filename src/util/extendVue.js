const LHH = (()=> {
    const isFunction = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Function]'
    };
    const isArray = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Array]'
    };
    const isObject = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Object]'
    };
    const isNumber = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Number]'
    };
    const isString = (obj) => {
        return Object.prototype.toString.call(obj) === '[object String]'
    };
    //借鉴jquery的extend
    const extend = (...args)=>{
        var options,name,src,copy,copyIsArray,clone,
        target = args[0] || {},
        i = 1,
        length = args.length,
        deep = false;
        if(typeof target === 'boolean') {
            deep = target;
            target = args[1] || {};
            i = 2;
        }
        if(typeof target !== 'object' && !LHH.isFunction(target)) {
            target = {};
        }
        if(length === i) {
            target = {}
            --i;
        }
        for(; i<length; i++) {
            if((options = args[i]) !== null) {
                for(name in options) {
                    src = target[name];
                    copy = options[name];
                    if(target == copy) {
                        continue;
                    }
                    if(deep && copy && (LHH.isObject(copy) || (copyIsArray = LHH.isArray(copy)))) {
                        if(copyIsArray) {
                            copyIsArray = false;
                            clone = src && LHH.isArray(src) ? src : [];
                        }else {
                            clone = src && LHH.isObject(src) ? src : [];
                        }
                        target[name] = extend(deep,clone,copy)
                    }else {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    return {
        isFunction:isFunction,
        isArray:isArray,
        isObject:isObject,
        isNumber:isNumber,
        isString:isString,
        extend:extend
    }
})();
const extend = (...args)=>{
    var options,name,src,copy,copyIsArray,clone,
    target = args[0] || {},
    i = 1,
    length = args.length,
    deep = false;
    if(typeof target === 'boolean') {
        deep = target;
        target = args[1] || {};
        i = 2;
    }
    if(typeof target !== 'object' && !LHH.isFunction(target)) {
        target = {};
    }
    if(length === i) {
        target = {}
        --i;
    }
    for(; i<length; i++) {
        if((options = args[i]) !== null) {
            for(name in options) {
                src = target[name];
                copy = options[name];
                if(target == copy) {
                    continue;
                }
                if(deep && copy && (LHH.isObject(copy) || (copyIsArray = LHH.isArray(copy)))) {
                    if(copyIsArray) {
                        copyIsArray = false;
                        clone = src && LHH.isArray(src) ? src : [];
                    }else {
                        clone = src && LHH.isObject(src) ? src : [];
                    }
                    target[name] = extend(deep,clone,copy)
                }else {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};
export default extend;
