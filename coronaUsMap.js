function coronaUsMap(type,country){
  if(country!='USA'){
    $('#coronaUsMap').html('');  $('#coronaUsMapReport').html('');
    return;
  }
  var urlApi = '/coronaserver/coronaTotalReportApi.php?country=USA';
  $.ajax({
    type: 'GET',
    url: urlApi,
    contentType: false,
    data: false,
    processData: false,
    success: function(data) {
      isUploading = false;
      var obj = JSON.parse(data);
      //console.log(data);

      if (obj.result == "success") {
        var dataElmGeo = [];//data Array for Geochart
        var geochartData = ['provinces',   'confirmed'];
        var countryList = obj.data.countryList;
        var countryListLength = countryList != null ? countryList.length :'';

        //가져온 데이터 배열에 저장
        //for (var i = 0; i < countryListLength; i++) {
        for (var i = 0; i <countryListLength; i++) {
          if(countryList[i]['cnt']!=null&&parseInt(countryList[i]['cnt'])>0){
            var tempDataElmGeo = [countryList[i]['ProvinceState'],parseInt(countryList[i]['cnt']!=0?countryList[i]['cnt']:0)];
            dataElmGeo.unshift(tempDataElmGeo);
          }
        }
          dataElmGeo.unshift(geochartData);
        //가져온 데이터 배열에 저장 끝

        //차트그리기 시작
        google.charts.load('current', {
          'packages':['geochart'],
          // Note: you will need to get a mapsApiKey for your project.
          // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
          'mapsApiKey': 'AIzaSyAt4VcYBAuXnbxIiBuE4iVvd2wiSevsxvI'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          var data = google.visualization.arrayToDataTable(dataElmGeo);

          var options = {
            region: 'US', // Africa
            resolution:'provinces',
            colorAxis: {colors: ['#ffbaba', '#ff7b7b', '#ff0000','#a70000']},
            backgroundColor: '#ffffff',
            datalessRegionColor: '#f0f0f0',
            defaultColor: '#f0f0f0',
          };

          var chart = new google.visualization.GeoChart(document.getElementById('coronaUsMap'));
          chart.draw(data, options);
        };
        //차트 그리기 끝
      }
    }
  });
}
