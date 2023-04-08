const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityname');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp_real_value');
const datahide = document.querySelector('.middle_layer');

const today = document.getElementById('today');

window.addEventListener("load", function() {
  
   today.innerText = getCurrentDate();
})

const getInfo = async (event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    
    if(cityVal === ""){
        city_name.innerText = 'Please write the name before search';
        datahide.classList.add('data_hide');
    }
    else{

        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=8f01e210bad93f87a669900e85fc4c8f&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            //console.log(response);
            console.log(data);
            const arrData  = [data];
            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}` ;
            temp.innerText = arrData[0].main.temp;
            //temp_status.innerText = arrData[0].weather[0].main;

            const tempMood =  arrData[0].weather[0].main
            if(tempMood == "Clear")
            {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>"; 
            } 
            else if (tempMood == "Clouds") 
            { 
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"; 
            } 
            else if (tempMood == "Rain") 
            {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";  
            } 
            else 
            { 
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #f1f2f6;'></i>";
            }
            
        }
        catch(err)
        {
            city_name.innerText = 'Opps! Something went wrong :(';
            datahide.classList.add('data_hide');

        }
      
    }

};


const getCurrentDate = () =>{
    var now = new Date();
    return now.toDateString();
}

submitBtn.addEventListener('click', getInfo);

