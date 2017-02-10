angular.module("sportsStore")
//定义激活添加的类名
.constant("productListActiveClass","btn-primary")
//分页大小
.constant("productListPageCount",3)
.controller("productListCtrl",["$scope","$filter","productListActiveClass","productListPageCount","cartService",function($scope,$filter,productListActiveClass,productListPageCount,cartService){
	var selectedCategory = null;
	$scope.selectedPage = 1;
	$scope.pageSize = productListPageCount;
	
	$scope.selectCategory = function(newCategory){
		selectedCategory = newCategory;
		//选择新的分类时默认显示第一页
		$scope.selectedPage = 1;
	}
	//当没有选中产品分类(显示全部)或者产品所在分类被选中时返回true(显示选择的分类)
	$scope.categoryFilterFn = function(product){
		return selectedCategory == null || product.category == selectedCategory;
	}
	//若当前类别被选中,添加样式
	$scope.getCategoryClass = function(category){
		return selectedCategory == category ? productListActiveClass : "";
	}
	//选择分页
	$scope.selectPage = function(newPage){
		$scope.selectedPage = newPage;
	}
	//选中页的样式
	$scope.getPageClass = function(page){
		return $scope.selectedPage == page ? productListActiveClass : "";
	}
	//往购物车添加商品
	$scope.addProductToCart = function(product){
		cartService.addProduct(product.id,product.name,product.price);
	}
}])