const allMobile = async (searchText = "a", isShow) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    displayData(data.data, isShow);
};


allMobile();


const displayData = (mobilesInformation, isShow) => {
    const phoneCardContainer = document.getElementById('phone-cards-container');
    phoneCardContainer.innerText = '';

    const seeAllContainer = document.getElementById('see-all-container');

    if (mobilesInformation.length <= 9) {
        seeAllContainer.classList.add('hidden');
    } else {
        seeAllContainer.classList.remove('hidden');
    }

    let phones;
    if (!isShow) {
        phones = mobilesInformation.slice(0, 9);
    } else {
        phones = mobilesInformation;
        seeAllContainer.classList.add('hidden');
    }

    document.getElementById('buy-now-button').addEventListener('click', function () {
    document.getElementById('phone-cards-container')
    .scrollIntoView({
         behavior: 'smooth'
        });
    });


    phones.forEach((mobileInfo) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-[#FFFFFF] rounded-lg border border-custom-black w-96">
                <figure class="px-10 pt-10">
                    <img src="${mobileInfo.image}" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${mobileInfo.phone_name}</h2>
                    <p class="text-lg font-normal">
                        There are many variations of passages of available, but the majority have suffered.
                    </p>
                    <h2 class="text-[#403F3F] font-bold text-[25px]">Price: $999</h2>
                    <div class="card-actions">
                       <label for="my_modal_6" class="btn btn-primary" onclick="detailsButton('${mobileInfo.slug}')">Show Details</label>
                    </div>
                </div>
            </div>
        `;
        phoneCardContainer.appendChild(div);
    });

    loading(false);
};


const searchImplement = (isShow) => {
    loading(true);
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;

    if (searchText.length === 0) {
        allMobile('a', isShow);
    } else {
        allMobile(searchText, isShow);
    }
};


const seeAllClick = () => {
    const isShow = true;
    searchImplement(isShow);
};


const detailsButton = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const modalBody = document.getElementById('modal-body');
    modalBody.innerText = '';

    const div = document.createElement('div');
    div.innerHTML = `
       <div>
         <img class=" mb-10 w-[268px] h-[381px] mx-auto" src="${data.data.image}" />
         <h2 class="text-[#403F3F] text-xl font-bold">${data.data.name}</h2>
         <p class="text-sm text-[#706F6F] font-medium">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
         <p class="text-sm font-medium mt-3">Storage : ${data.data.mainFeatures.storage}</p>
        <p class="text-sm font-medium">Display Size : ${data.data.mainFeatures.displaySize}</p>
        <p class="text-sm font-medium">chipSet : ${data.data.mainFeatures.chipSet}</p>
        <p class="text-sm font-medium">Memory : ${data.data.mainFeatures.memory}</p>
        <p class="text-sm font-medium">Slug : ${data.data.slug}</p>
        <p class="text-sm font-medium">Release data : ${data.data.releaseDate}</p>
        <p class="text-sm font-medium">Brand :  ${data.data.brand}</p>
        <p class="text-sm font-medium">GPS : ${data.data.others.GPS}</p>
       </div>
    `;
    modalBody.appendChild(div);
};


const loading = (isLoading) => {
    const loaderContainer = document.getElementById('loader');
    if (isLoading === true) {
        loaderContainer.classList.remove("hidden");
    } else {
        loaderContainer.classList.add("hidden");
    }
};


