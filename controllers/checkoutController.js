angular.module("sportsStore")
.controller("cartSummaryCtrl",["$scope","cartService",function($scope,cartService){
	//获取购物车所有商品
	$scope.cartData = cartService.getProducts();
	//计算商品总价
	$scope.total = cartService.total;
	//移除商品
	$scope.remove = cartService.removeProduct;
}]);