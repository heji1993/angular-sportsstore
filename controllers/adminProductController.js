angular.module("sportsStoreAdmin")
.constant("productUrl","http://localhost:5500/products/")
.config(function($httpProvider){
	$httpProvider.defaults.withCredentials = true;
})
.controller("productCtrl",["$scope","$resource","productUrl",function($scope,$resource,productUrl){
	$scope.productResource = $resource(productUrl+":id",{id:"@id"});
	//查询列表
	$scope.listProducts = function(){
		$scope.products = $scope.productResource.query();
	}
	//删除指定产品
	$scope.deleteProduct = function(product){
		product.$delete().then(function(){
			$scope.products.splice($scope.products.indexOf(product),1);
		})
	}
	//创建产品
	$scope.createProduct = function(product){
		new $scope.productResource(product).$save().then(function(newProduct){
			$scope.products.push(newProduct);
			$scope.editedProduct = null;
		})
	}
	//更新指定产品
	$scope.updateProduct = function(product){
		product.$save();
		$scope.editedProduct = null;
	}
	//编辑指定产品
	$scope.startEdit = function(product){
		$scope.editedProduct = product;
	}
	//取消编辑
	$scope.cancelEdit = function(){
		$scope.editedProduct = null;
	}
	//默认查询列表数据
	$scope.listProducts();
}]);