class Contacts {
  constructor() {
    const savedContacts = this.loadContacts();
    this.contacts = savedContacts
      ? savedContacts
      : [
          new Contact("Gyan", "gyan@gmail.com", "+62829238"),
          new Contact("naufal", "naufal@gmail.com", "+62849382"),
        ];
  }

  add(info) {
    const newContact = new Contact(info.name, info.email, info.phone);
    this.contacts.push(newContact);
    this.saveContacts(this.contacts);
  }

  editAt(index, info) {
    this.contacts[index] = new Contact(info.name, info.email, info.phone);
    this.saveContacts(this.contacts);
  }

  deleteAt(index) {
    this.contacts.splice(index, 1);
    this.saveContacts(this.contacts);
  }
  //add local storage
  saveContacts(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  loadContacts() {
    const contacts = localStorage.getItem("contacts");
    try {
      return JSON.parse(contacts);
    } catch (error) {
      console.error("Failed to load contacts", error);
      return null;
    }
  }

  loadContactById(id) {
    const contacts = this.loadContacts();
    if (!contacts) return null;
    const contact = contacts.find((contact) => contact.id === id);
    return contact;
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

class Contact {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

document.getElementById("add").addEventListener("click", (event) => {
  event.preventDefault();
  let info = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };
  newContacts.add(info);
  newContacts.renderContact();
  clearFields();
});

function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

const newContacts = new Contacts();
newContacts.renderContact();
