class Model {
  static lastId = 0
  constructor(id = null) {
    if (!id) {
      this.id = ++this.constructor['lastId']
    } else {
      if (id > this.constructor['lastId']) {
        this.id = id
        this.constructor['lastId']++
      } else {
        throw new Error(`id ${id} already exists`)
      }
    }
  }
  printInfo() {
    console.log(`id = ${this.id}`)
  }
}

class Customer extends Model {
  constructor(id, firstName, lastName, age, address) {
    super(null)
    this.firstName = firstName
    this.lastName = lastName
    this.setAge(age)
    this.address = address
  }
  setAge(age) {
    if (age < 18) {
      throw new Error('You must be 18 to buy this item')
    } else {
      this.age = age
    }
  }
}

class Order extends Model {
  constructor(id, itemName, price, quantity, customerId) {
    super(id)
    this.itemName = itemName
    this.price = price
    this.quantity = quantity
    this.customerId = customerId
  }
  getFullOrder() {
    return `${this.itemName} ${this.price} ${this.quantity}`
  }
  printInfo() {
    super.printInfo()
    console.log(this.getFullOrder())
  }
}

const customers = [
  new Customer(1, 'Ivanov', 'Roman', 18, 'Kyiv, Sadova Street, 12'),
  new Customer(2, 'Litvinova', 'Anna', 21, 'Kharkiv, Lisova Street, 46'),
  new Customer(3, 'Riot', 'Mike', 25, 'Odesa, Addova Street, 11')
]

const orders = [
  new Order(1, 'Mobile Phone', '$850', 1, 1),
  new Order(2, 'Smart Watch', '$300', 1, 1),
  new Order(3, 'Harry Potter Book', '$10', 1, 3),
  new Order(4, 'USB', '$8', 2, 1),
  new Order(5, 'E-bike', '$1000', 1, 2),
  new Order(6, 'Helmet', '$30', 2, 2)
]

function totalSum() {
  console.log(this)
  return this.price.replace('$', '') * this.quantity
}

const orderOneTotalSum = totalSum.bind(orders[0])

orders.sort((o1, o2) => o2.price.replace('$', '') - o1.price.replace('$', '')).forEach(o => console.log(o))

/* DOM interactions */
const customersTableElement = document.getElementById('customersTable')
const customersTableBodyElement = customersTableElement.children[1]
customersTableBodyElement.innerHTML = ''
customers.forEach(c => {
  // создание объекта - узла-элементы tr
  const tr = document.createElement('tr')
  // создание объекта - узла-элементы td для вывода идентификатора
  const idTd = document.createElement('td')
  // ... и вставка в него дочернего узла - текста
  idTd.innerText = c.id
  // то же самое - для имени
  const nameTd = document.createElement('td')
  nameTd.innerText = c.firstName
  // то же самое - для фамилии
  const lastNameTd = document.createElement('td')
  lastNameTd.innerText = c.lastName
  // то же самое - для возраста
  const ageTd = document.createElement('td')
  ageTd.innerText = c.age
  // вставка всех элементов-ячеек в элемент-строку
  tr.append(idTd)
  tr.append(nameTd)
  tr.append(lastNameTd)
  tr.append(ageTd)
  // вставка элемента-строки в элемент "тело таблицы"
  customersTableBodyElement.append(tr)
})