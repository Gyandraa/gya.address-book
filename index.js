class AddressBook {
  constructor() {
    this.contacts = [
      new Contact(1, "Gyan", "gyan@gmail.com", "+62829238"),
      new Contact(2, "naufal", "naufal@gmail.com", "+62849382"),
    ];
  }

  add(info) {
    const newContact = new Contact(info.id, info.name, info.email, info.phone);
    this.contacts.push(newContact);
  }

  editAt(index, info) {
    this.contacts[index] = new Contact(
      info.id,
      info.name,
      info.email,
      info.phone
    );
  }

  deleteAt(index) {
    this.contacts.splice(index, 1);
  }

  renderContact() {
    document.getElementById("contacts").innerHTML = "";
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredContacts = this.contacts.filter(
      (contact) =>
      contact.name.toLowerCase().includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery) ||
      contact.phone.includes(searchQuery)
    );
    let id = 0;
    for (let person of filteredContacts) {
      const newContactEntry = document.createElement("div");
      newContactEntry.classList.add("newCon");
      newContactEntry.innerHTML = `
                <li>Id: ${person.id}</li>
                <li>Name: ${person.name}</li>
                <li>Email: ${person.email}</li>
                <li>Phone: ${person.phone}</li>
                <button class="delete-button" id="delete-${id}"><i class="material-icons">delete</i></button>
                <button class="edit-button" id="edit-${id}"><i class="material-icons">edit</i></button>
            `;
      document.getElementById("contacts").appendChild(newContactEntry);
      id++;
    }
    for (let button of document.getElementsByClassName("delete-button")) {
      button.addEventListener("click", () => {
        let index = button.id.split("-")[1];
        this.deleteAt(index);
        this.renderContact();
      });
    }
    for (let button of document.getElementsByClassName("edit-button")) {
      button.addEventListener("click", () => {
        let index = button.id.split("-")[1];
        let info = {
          id: document.getElementById("id").value,
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
        };
        this.editAt(index, info);
        this.renderContact();
        clearFields();
      });
    }
  }
}

// object blueprint to be repeated for each contact
class Contact {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

// adding a contact
document.getElementById("add").addEventListener("click", (event) => {
  event.preventDefault();
  let info = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };
  newAddressBook.add(info);
  newAddressBook.renderContact();
  clearFields();
});

// clear input fields
function clearFields() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

// creating the new addressbook
const newAddressBook = new AddressBook();
newAddressBook.renderContact();