const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {

    const select = dropdown.querySelector('.select');
    const arrow = dropdown.querySelector('.arrow');
    const dropmenu = dropdown.querySelector('.dropmenu');
    const options = dropdown.querySelectorAll('.dropmenu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        arrow.classList.toggle('arrow-rotate');
        dropmenu.classList.toggle('dropmenu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            arrow.classList.remove('arrow-rotate');
            dropmenu.classList.remove('dropmenu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

const optionMenu = document.querySelector('.dropdown-steak'),
        selectBtn = optionMenu.querySelector('.select-btn'),
        options = optionMenu.querySelectorAll('.options li'),
        sBtn_text = optionMenu.querySelector('.sBtn-text');

selectBtn.addEventListener('click', () => optionMenu.classList.toggle('active'));

options.forEach(option => {
    option.addEventListener('click', ()=> {
        let selectedOption = option.querySelector('.option-text').innerText;
        sBtn_text.innerText = selectedOption; 

        optionMenu.classList.remove('active');
    }) 
})