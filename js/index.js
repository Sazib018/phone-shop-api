const allMobail = async (searchText) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    )
    const data = await res.json()
    displayData(data.data)
}

allMobail('a')


const displayData = (mobilesInformation) => {
    const phoneCardContainer = document.getElementById('phone-cards-container')

    phoneCardContainer.innerText = ''

    mobilesInformation.slice(0,9).forEach((mobileInfo) => {
        const div = document.createElement('div');
        div.innerHTML = `
                 <div class="card bg-[#FFFFFF] rounded-lg border border-custom-black w-96 ">
                    <figure class="px-10 pt-10">
                        <img src="${mobileInfo.image}" 
                        class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${mobileInfo.phone_name}</h2>
                        <p class="text-lg font-normal">There are many variations of passages of available, but the
                            majority have suffered</p>

                        <h2 class="text-[#403F3F] font-bold text-[25px]">Price:$999</h2>
                        <div class="card-actions">
                            <button
                                class="text-[#FFFFFF] font-semibold text-xl bg-[#0D6EFD] rounded-lg items-center p-2 px-8">Show
                                Details</button>
                        </div>
                    </div>
                </div>
    `;
    phoneCardContainer.appendChild(div);
    });
}

const search = () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    allMobail(searchText);
}