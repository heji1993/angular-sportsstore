//module方法值传一个参数表示我们尝试找到sportsStore这个模块,必须先有sportsStore模块,否则会报错
angular.module("sportsStore")
.constant("dataUrl","http://localhost:5550/products")
.controller("sportsStoreCtrl",["$scope","$http","dataUrl",function($scope,$http,dataUrl){
	$scope.data = {};
	//使用$http服务查询数据
	$http.get(dataUrl)
	.success(function(result){
		$scope.data.products = result;
	})
	.error(function(error){
		$scope.data.error = error;
	})
}])