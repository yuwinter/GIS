/**
 * 地图的底图服务模块
 */
var map_source = "wmts"; //地图的服务类型
var map_projection = "EPSG:3857"; //地图坐标系（3857：墨卡托， 4326：经纬度）
//map_url此处使用的是【Portable Basemap Server】作为地图服务
var map_url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
//var map_dataLayer = "layer_tdt_sl"; //地图服务的图层
var map_zoom = 15; //初始化地图缩放级别
var map_minZoom = 14; //地图最小缩放级别
var map_maxZoom = 20; //地图最大缩放级别
var map_x = 11557761.4071486; //地图x坐标（此处以兰州地图作为中心点）
var map_y = 4307993.90607275; //地图y坐标（此处以兰州地图作为中心点）

$(document).ready(function() {
	var baseLayer = new ol.layer.Tile({
		opacity: 1.0,
		source: new ol.source.XYZ({
			url: map_url
		})
	});
	if(baseLayer) {
		var config = {
			center: [map_x, map_y],
			zoom: map_zoom,
			maxZoom: map_maxZoom,
			minZoom: map_minZoom
		};
		//实例化标绘地图
		DRAWMAP.init(baseLayer, config);
	}
	//标绘
	$("#plotBtn").click(function(){
		PLOT.showHideDrawBox();
	});
});

/**
 * 清除全部图层
 */
function clearLayer(){
	if(confirm("要清除所有图层吗？")){
		//清空标绘图层
		for(var i = 0;i < PLOT.plotImgMap.size();i++){
			var id = PLOT.plotImgMap.elements[i].key;
			var layer = PLOT.plotImgMap.get(id);
			var source = layer.getSource();
			source.clear();
		}
		PLOT.plotImgMap.clear();//清空标绘数组
		$("#plotMarker").hide();//隐藏按钮
	}
} 


