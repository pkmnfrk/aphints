
export function by(...columns) {
    const ret = (a, b) => {
        if(a === b) {
            return 0;
        }
        
        for(const c of columns) {
            if(a[c] < b[c]) {
                return -1;
            }
            if(a[c] > b[c]) {
                return 1;
            }
        }

        return 0;
    };
    ret.desc = (a, b) => {
        return -1 * ret(a, b);
    };
    ret.asc = (a, b) => {
        return ret(a, b);
    }

    return ret;
}