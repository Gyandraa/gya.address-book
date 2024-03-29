class AddContact {
    constructor() {
        this.contacts = [
            new Contact("Megan", "megan@grandcircus.co", "+62829238"),
            new Contact("Julie", "julie@grandcircus.co", "+62849382")
        ];
    }
    add(info) {
        const newContact = new Contact(info.name, info.email, info.phone, info.relation);
        this.contacts.push(newContact);
    }
    deleteAt(index) {
        this.contacts.splice(index, 1);
    }
    edite(index) {
        this.contacts.splice(index, 1);
    }
    renderContact() {
        document.getElementById("contacts").innerHTML = "";
        let counter = 0;
        for (let person of this.contacts) {
            const newContactEntry = document.createElement("div");
            newContactEntry.classList.add("newCon");
            newContactEntry.innerHTML = `
            <li>Name: ${person.name}</li>
            <li>Email: ${person.email}</li>
            <li>Phone: ${person.phone}</li>
            <button class="deletebtn" id="${counter}"><i class="material-icons">delete</i></button>
            `
            document.getElementById("contacts").appendChild(newContactEntry);
            counter++;
        }
        for (let button of document.getElementsByClassName("deletebtn")) {
            button.addEventListener("click", deleteContact);
        }
    }
}


// object blueprint to be repeated for each contact
class Contact {
    constructor(name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// adding a contact
document.getElementById("add").addEventListener("click", event => {
    event.preventDefault();
    let info = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };
    newAddContact.add(info);
    newAddContact.renderContact();
    clearFields();
});

// edite a contactnt
function editeContact(event) {
    let index = event.target.parentElement.id;
    newAddContact.edite(index);
    newAddContact.renderContact();
}


// deleting a contact
function deleteContact(event) {
    let index = event.target.parentElement.id;
    newAddContact.deleteAt(index);
    newAddContact.renderContact();
}


// clear input fields
function clearFields() {
    let info = {
        name: document.getElementById("name").value = "",
        email: document.getElementById("email").value = "",
        phone: document.getElementById("phone").value = "",
    };
}

// creating the new addressbook
const newAddContact = new AddContact();
newAddContact.renderContact();