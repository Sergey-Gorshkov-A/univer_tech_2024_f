async function methodGetUsers() {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos')
  xhr.send()
  let xhr_other = new XMLHttpRequest()
  xhr_other.open('GET', 'https://jsonplaceholder.typicode.com/users')
  xhr_other.send()

  xhr.onload = function () {
    let response = JSON.parse(xhr.response)
    let response_2 = JSON.parse(xhr_other.response)

    

    if (response && Array.isArray(response) && response.length > 0) {
      response.forEach((user) => {
        let row = '<tr style="border-collapse: collapse;">'
        row += '<td>' + user.id + '</td>'
        response_2.forEach((users) => {
          if (users.id == user.userId) {
            row += '<td>' + users.name + '</td>'
          }
        })
        row += '<td>' + user.title + '</td>'
        if (user.completed == true) {
          row += '<td >' + '<input type="checkbox" id="completed" value=user.completed checked/>' + '</td>'
        }
        else {row += '<td >' + '<input type="checkbox" id="completed" value=user.completed/>' + '</td>'}
        row += '</tr > '

        $('table tbody').append(row)
      })
    }
  }
}