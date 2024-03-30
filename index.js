class AddressBook {
    constructor() {
        this.contacts = [
            new Contact(1, "Gya", "gyan@gmail.com", "+62829238"),
            new Contact(2, "Gyagnteng", "gyagn@gmail.com", "+62849382")
        ];
    }

    add(info) {
        const newContact = new Contact(info.id, info.name, info.email, info.phone);
        this.contacts.push(newContact);
    }
    editAt(index) {
        this.contacts.splice(index, 1);

    }
    deleteAt(index) {
        this.contacts.splice(index, 1);
    }

    renderContact() {
        document.getElementById("contacts").innerHTML = "";
        let id = 0;
        for (let person of this.contacts) {
            const newContactEntry = document.createElement("div");
            newContactEntry.classList.add("newCon");
            newContactEntry.innerHTML = `
            <li>Id: ${person.id}</li>
            <li>Name: ${person.name}</li>
            <li>Email: ${person.email}</li>
            <li>Phone: ${person.phone}</li>
            <button class="delete-button" id="${id}"><i class="material-icons">delete</i></button>
            <button class="edite-button" id="${id}"><i class="material-icons">edit</i></button>
            `
            document.getElementById("contacts").appendChild(newContactEntry);
            id++;
        }
        for (let button of document.getElementsByClassName("delete-button")) {
            button.addEventListener("click", deleteContact);
        }
        for (let button of document.getElementsByClassName("edit-button")) {
            button.addEventListener("click", editContact);
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
document.getElementById("add").addEventListener("click", event => {
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
// deleting a contact
function deleteContact(event) {
    let index = event.target.parentElement.id;
    newAddressBook.deleteAt(index);
    newAddressBook.renderContact();
}


// clear input fields
function clearFields() {
    let info = {
        id: document.getElementById("id").value = "",
        name: document.getElementById("name").value = "",
        email: document.getElementById("email").value = "",
        phone: document.getElementById("phone").value = "",
    };
}

// creating the new addressbook
const newAddressBook = new AddressBook();
newAddressBook.renderContact();