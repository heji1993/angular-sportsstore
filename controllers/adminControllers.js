angular.module("sportsStoreAdmin")
.constant("authUrl","http://localhost:5500/users/login")
.constant("ordersUrl","http://localhost:5500/orders")
.controller("authCtrl",["$scope","$http","$location","authUrl",function($scope,$http,$location,authUrl){
	$scope.authenticate = function(username,password){
		$http.post(authUrl,{
			username:username,
			password:password
		},{
			//设置为true,会企业跨域请求的支持,允许Ajax请求使用cookie处理验证。后面会介绍
			withCredentials : true
		}).success(function(data){
			$location.path("/main");
		}).error(function(error){
			$scope.authenticationError = error;
		});
	}
}])
.controller("mainCtrl",["$scope",function($scope){
	$scope.screens = ["Products","Orders"];
	$scope.current = $scope.screens[0];
	//设置视图
	$scope.setScreen = function(index){
		$scope.current = $scope.screens[index];
	}
	//获取视图
	$scope.getScreen = function(){
		return $scope.current == "Products" ?
				"views/adminProducts.html" : "views/adminOrders.html";
	}
}])
.controller("ordersCtrl",["$scope","$http","ordersUrl",function($scope,$http,ordersUrl){
	$http.get(ordersUrl,{withCredentials:true})
		.success(function(data){
			$scope.orders = data;
		})
		.error(function(error){
			$scope.error = error;
		});
	$scope.selectedOrder;
	//选择订单
	$scope.selectOrder = function(order){
		$scope.selectedOrder = order;
	}
	//计算总价
	$scope.calcTotal = function(order){
		var total = 0;
		for(var i = 0 ; i < order.products.length ; i++){
			total += order.products[i].count * order.products[i].price;
		}
		return total;
	}
}]);