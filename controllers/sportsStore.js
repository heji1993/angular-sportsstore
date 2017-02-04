//module方法值传一个参数表示我们尝试找到sportsStore这个模块,必须先有sportsStore模块,否则会报错
angular.module("sportsStore")
.controller("sportsStoreCtrl",["$scope",function($scope){
	$scope.data = {
		products : [
			{name:"product1",description:"A product",category:"category#1",price:100},
			{name:"product2",description:"A product",category:"category#1",price:110},
			{name:"product3",description:"A product",category:"category#2",price:210},
			{name:"product4",description:"A product",category:"category#3",price:199}
		]
	}
}])