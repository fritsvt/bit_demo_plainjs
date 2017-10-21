function sortjsonarray(arr,prop,order, type) {

    if (arr === null) {
      return [];
    }

    if (!Array.isArray(arr)) {
      throw new TypeError('sort-json-array expects an array.');
    }

    if (arguments.length ===1) {
      return arr.sort();
    }

    if (arguments[3] === 'num'){
      return arr.sort(function(a, b){
          return a.id-b.id
      })
    }
    else if (arguments[2] === null || arguments[2] === "asc" ){
      return arr.sort(compare(prop,1));
    }
    else if (arguments[2] === "des"){
      return arr.sort(compare(prop,0));
    }
    else {
      throw new TypeError('Wrong argument.');
    }

};

function compare(attr,value){
  if(value){
    return function(a,b){
      var x = (a[attr] === null) ? "" : "" + a[attr],
      y = (b[attr] === null) ? "" : "" + b[attr];
      return x < y ? -1 :(x > y ? 1 : 0)
    }
  }
  else {
    return function(a,b){
      var x = (a[attr] === null) ? "" : "" + a[attr],
      y = (b[attr] === null) ? "" : "" + b[attr];
      return x < y ? 1 :(x > y ? -1 : 0)
    }
  }
}
