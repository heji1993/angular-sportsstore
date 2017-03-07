//module方法值传一个参数表示我们尝试找到sportsStore这个模块,必须先有sportsStore模块,否则会报错
angular.module("sportsStore")
.constant("dataUrl","http://localhost:5500/products")
.constant("orderUrl","http://localhost:5500/orders")
.controller("sportsStoreCtrl",["$scope","$http","$location","dataUrl","orderUrl","cartService",function($scope,$http,$location,dataUrl,orderUrl,cartService){
	$scope.data = {};
	//使用$http服务查询数据
	$http.get(dataUrl)
	.success(function(result){
		$scope.data.products = result;
	})
	.error(function(error){
		$scope.data.error = error;
	});
	//发送订单
	$scope.sendOrder = function(shippingDetails){
		//创建运输详情对象的副本,以便修改不影响程序的其他部分
		var order = angular.copy(shippingDetails);
		//从购物车获取所有商品
		order.products = cartService.getProducts();
		//发送请求提交订单（以post方法提交请求到Deployd服务器并发送数据即完成对象的创建）
		$http.post(orderUrl,order)
		.success(function(data){
			$scope.data.orderId = data.id;
			//清空购物车
			cartService.getProducts().length = 0;
		})
		.error(function(error){
			$scope.data.orderError = error;
		})
		.finally(function(){
			//最后导航到订单完成页面
			$location.path("/complete");
		})
	}
}])