const loadPhones = async(searchText, dataLimit) =>{
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const res = await fetch(url);
    const data = await res.json();
   displayphones(data.data, dataLimit);
} 
 
const displayphones = (phones, dataLimit) =>{
  const phonesContainer = document.getElementById('photo-container');
       phonesContainer.textContent = ''
      //  display 20 phone only\
      const showAll = document.getElementById('show-all');
     if(dataLimit && phones.length > 10) {
      phones = phones.slice(0, 10);
      showAll.classList.remove('d-none')
     }
     else{
      showAll.classList.add('d-none')
     }
      // display no phones
      //  document.getElementById('no phone message');
      //  if(phones.length === (0)){
      //   noPhone.classList.remove('d-none')
      //  }
      //  else{
      //   noPhone.classList.add('d-none');
      //  }

      // display all phones
  phones.forEach(phone =>{
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML =`
    <div class="card">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.brand}</h5>
      <h5>${phone.phone_name}</h5>
      <p class="card-text">${phone.slug}</p>
      <button onclick="loadPhoneDetails('${phone.slug})" href="#" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  // spnsi stop
  toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
  toggleSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}
document.getElementById('btn-search').addEventListener('click', function(){
  // start loder
 processSearch(10);
})

document.getElementById('search-field').addEventListener('keypress', function(e){
  if (e.key === 'Enter') {
    processSearch(10);
  }
})

const toggleSpinner = isLoding => {
  const loderSection = document.getElementById('loder');
  if(isLoding){
    loderSection.classList.remove('d-none')
  }
  else{
    loderSection.classList.add('d-none')
  }
  
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `https://openapi.programing-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

// loadPhones();