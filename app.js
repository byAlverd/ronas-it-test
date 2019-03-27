const API = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = '&APPID=61e654e7f2978ea062a2c213525e50e4'

new Vue({
  el: '#weatherApp',
  data: {
    sityName: '',
    icon: '',
    currentTemp: '',
    overcast: '',
    pressure: '',
    humidity: '',
    wind: '',
    degWind: '',
    cloudsAll: '',
    show: false,
    searchQuery: '',
    far: '',
    selOrFar: true
  },
  methods: {
    getWeather(url) {
      axios
      .get(url)
      .then(response => {
        this.sityName = response.data.name;
        this.currentTemp = response.data.main.temp;
        this.icon = response.data.weather[0].icon;
        this.overcast = response.data.weather[0].description;
        this.pressure = (response.data.main.pressure / 1.333) + ' мм рт.ст.';
        this.humidity = response.data.main.humidity + ' %'; 
        this.wind = response.data.wind.speed + ' м/с'; 
        this.degWind = response.data.wind.deg;
        this.cloudsAll = response.data.clouds.all + ' %';
        this.far = (response.data.main.temp *(9/5)+32);
      })
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl);
    },
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeather(API + 'units=metric' + '&lang=ru' + '&lat=' + lat + '&lon=' + lon + KEY);
    },
    query: function(){
      this.getWeather(API + 'q=' + this.searchQuery + '&units=metric' + '&lang=ru' + KEY);
    }
  }, 
  filters: {
    currency (value){
      return value.slice(0,6);
    },
    windDeg: function (degWind) {
      if (degWind == 0){
        return "с";
      } else if (degWind < 45){
        return "ссв";
      } else if (degWind  == 45){
        return "св";
      } else if (degWind  < 90){
        return "всв";
      } else if (degWind  == 90){
        return "в";
      } else if (degWind < 135){
        return "вюв";
      } else if (degWind  == 135){
        return "юв";
      } else if (degWind < 180){
        return "ююв";
      } else if (degWind  == 180){
        return "ю";
      } else if (degWind < 225){
        return "ююз";
      } else if (degWind == 225){
        return "юз";
      } else if (degWind < 270){
        return "зюз";
      } else if (degWind == 270){
        return "з";
      } else if (degWind < 315){
        return "зсз";
      } else if (degWind == 315){
        return "сз";
      } else if (degWind < 360){
        return "ссз";
      } else if (degWind == 360){
        return "сс";
      } 
    }
  },
  beforeMount() {
    this.geolocation();
  }
});
