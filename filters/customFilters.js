angular.module("customFilter",[])
.filter("unique",function(){
	return function(data,propertyName){
		//只对数组每个对象的属性过滤,返回对象属性值的集合
		if(angular.isArray(data) && angular.isString(propertyName)){
			var results = [];
			var keys = {};
			for(var i = 0 ; i < data.length ; i++){
				var val = data[i][propertyName];
				if(angular.isUndefined(keys[val])){
					keys[val] = true;
					results.push(val);
				}
			}
			return results;
		}else{
			return data;
		}
	}
})
.filter("range",["$filter",function($filter){
	return function(data,page,size){
		if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
			var start_index = ( page - 1 ) * size;
			if(data.length < start_index){
				return [];
			}else{
				//返回当前页的数据
				return $filter("limitTo")(data.splice(start_index),size);
			}
		}else{
			return data;
		}
	}
}])
.filter("pageCount",function(){
	return function(data,size){
		if(angular.isArray(data)){
			var result = [];
			for(var i = 0 ; i < Math.ceil(data.length/size) ; i++){
				result.push(i);
			}
			return result;
		}else{
			return data;
		}
	}
})