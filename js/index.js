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
        <img src="${data.data.image}" />
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

