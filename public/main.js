$('document').ready(function(){
  $(".michelinstarSearch").click(function(event){
    var stars = $(this).data("star");
    starLocal(stars);
    //This function will give me back the search for michelin stars
  });

 $(".city").click(function(event){
   var value = $(this).data("loc");
   cityLocal(value);
   // This function will give me back the search of cities
 });
});

function starLocal(value){
  console.log("This is the Value/Stars: "+ value);

var url_1 = "http://apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng?center=-87.63:41.89&nb=100&dist=10000000&source=RESGR&filter=michelin_stars%20eq%20"+value+"%20&charset=UTF-8&ie=UTF-8&authKey=RESTGP20170310222038934049903020";
console.log(url_1);
var url_2 = "http://apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng?center=-73.87:40.72&nb=100&dist=10000000&source=RESGR&filter=michelin_stars%20eq%20"+value+"%20&charset=UTF-8&ie=UTF-8&authKey=RESTGP20170310222038934049903020";

var url_3 = "http://apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng?center=-122.41:37.77&nb=100&dist=10000000&source=RESGR&filter=michelin_stars%20eq%20"+value+"%20&charset=UTF-8&ie=UTF-8&authKey=RESTGP20170310222038934049903020";

  console.log("This is the API URL: "+ url_1);
$.get(url_1)
.then(function(data) {
  var json1 = JSON.parse(data);
  return $.get(url_2);
}).then(function(data) {
  var json2 = JSON.parse(data);
  return $.get(url_3);
}).then (function(data){
  var json = JSON.parse(data);
  appendResult(json);
  appendResult(json1);
  appendResult(json2);
});

}

function cityLocal(value){
  console.log("This is the Value/Lat and Long: "+ value);
  var url = "http://apir.viamichelin.com/apir/2/findPoi.json2/RESTAURANT/eng?center=" + value + "&nb=100&dist=10000000&source=RESGR&filter=michelin_stars%20ge%201%20&charset=UTF-8&ie=UTF-8&authKey=RESTGP20170310222038934049903020"
    console.log("This is the API URL: "+ url);
  $.get(url)
  .then(function(data) {
    var json = JSON.parse(data);
    appendResult(json);
  });
}

function appendResult(json){
  // console.log("I am parsed data", json)
  var list = $("#listRestaurant");
   list.empty();
  // console.log(json.poiList.length)
  for (var i = 0; i <json.poiList.length; i++) {
    var name = json.poiList[i].datasheets[0].name;
    var description = json.poiList[i].datasheets[0].description;
    var image ="";
    if(json.poiList[i].datasheets[0].medias === undefined){
      image = "logo.jpg";
    } else{
      image = json.poiList[i].datasheets[0].medias[0].url_l;
    }
    var cuisine = json.poiList[i].datasheets[0].cooking_lib;
    var cities = json.poiList[i].datasheets[0].city;
    var web = json.poiList[i].datasheets[0].web;

    var stars = json.poiList[i].datasheets[0].michelin_stars;

    if(stars==="1"){
      stars = '&#9733;';
    }else if(stars==="2"){
      stars = '&#9733; &#9733;';
    }else{
      stars = '&#9733; &#9733; &#9733;';
    }
    //Return the amount of stars.

    console.log( description);

    var htmltoAppend = '<article class ="restaurant row"><div class ="resPic col-md-4"> <img src="'+image+'" alt="" class="img-thumbnail"></div><div class="info col-md-3" ><ul class="detail"><li class ="restNames">'+name+'</li><li class ="restCity">'+cities+'</li><li class ="restWeb"><a href="http://'+web+'" target="blank">'+web+'</a></li><li class = "resCook">'+cuisine+'</li><li class = "restStar">'+stars+'</li></ul></div><div class ="restDesc col-md-5">'+description+'</div><hr class="col-md-12"></article>';

    list.append(htmltoAppend);

}
}

//  var city = [{city:"Chicago", location:"-87.63:41.89"},{city:"San Fransisco", location:"-122.41:37.77"},{city:"New York", location:"-73.87:40.72"}];
//
//     function cityName (city, cityChoice){
//       for (var i = 0; i < city.length; i++) {
//         if(cityChoice === city[i].city){
//           return city[i].location;
// }
// }
// }
// cityName (city, "New York");
