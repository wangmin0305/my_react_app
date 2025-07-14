// 防抖 过一会执行
const debonouce = (fn, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId) // 清空定时器，重新执行一个新的
        timeoutId = setTimeout(function () {
            fn.apply(this, args)
        }, delay)
    }
}

// 节流 一段时间内执行一次
const throttle = (fn, delay) => {
    let isThro = false;
    return function (...args) {
        if (!isThro) {
            isThro = true
            setTimeout(function () {
                fn.apply(this, args)
                isThro = false // 到时间了，执行到这步了把标识改为了false，才能进入判断，否则isThro为true没法进来
            }, delay)
        }

    }
}