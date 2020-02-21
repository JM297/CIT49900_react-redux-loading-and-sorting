export const changeSort = (prop,val) =>{
    return{
        type:"CHANGE_SORT",
        val: val,
        prop:prop
    }
};