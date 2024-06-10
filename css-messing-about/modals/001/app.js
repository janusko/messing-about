const dialog = document.querySelector('dialog');
const showDialog = document.querySelector('button');
const closeDialog = dialog.querySelector('button');

const displayModal = () => {
  dialog.showModal();
};

const exitModal = () => {
  dialog.close();
};


showDialog.addEventListener('click', displayModal);
closeDialog.addEventListener('click', exitModal);
