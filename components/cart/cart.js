angular.module("cart",[])
.factory("cartService",function(){
	var cartData = [];
	return {
		//添加产品
		addProduct : function(id,name,price){
			var addToExistingItem = false;
			//如果已经存在相同id的产品,只增加其数量
			for(var i = 0 ; i < cartData.length ; i++){
				if(cartData[i].id == id){
					cartData[i].count ++;
					addToExistingItem = true;
					break;
				}
			}
			if(!addToExistingItem){
				cartData.push({
					count:1,id:id,price:price,name:name
				});
			}
		},
		//移除产品
		removeProduct : function(id){
			for(var i = 0 ; i < cartData.length ; i++){
				if(cartData[i].id == id){
					cartData.splice(i,1);
					break;
				}
			}
		},
		//获取所有产品
		getProducts : function(){
			return cartData;
		},
		//计算购物车商品总价
		total : function(){
			var total = 0;
			for(var i = 0 ; i < cartData.length ; i++){
				total += (cartData[i].count * cartData[i].price);
			}
			return total;
		},
		//计算购物车商品总数
		itemCount : function(){
			var total = 0;
			for (var i = 0 ; i < cartData.length ; i++){
				total += cartData[i].count;
			}
			return total;
		}
	}
})
//自定义cartSummary指令,依赖于cartService服务
.directive("cartSummary",["cartService",function(cartService){
	return {
		restrict : "E",
		templateUrl : "components/cart/cartSummary.html",
		controller : ["$scope",function($scope){
			var cartData = cartService.getProducts();
			//计算购物车商品总价
			$scope.total = cartService.total;
			//计算购物车商品总数
			$scope.itemCount = cartService.itemCount;
		}]
	}
}])