// T = [{id:4}, {id:5}, {id:8}, {id:6}]
export function gnerateId(T:any) {
    let max;
    if (T.length==0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 0; i < T.length; i++) {
        if (T[i].id>max) {
            max=T[i].id;
            
        }
            
        }
    }
    return max+1;
}