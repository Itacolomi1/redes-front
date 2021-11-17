const baseURL = 'http://localhost:9090/container/'

function showAll () {
  $('#tabelaContainer').DataTable({
    ajax: {
      url: baseURL + 'list',
      type: 'GET',
      dataSrc: ''
    },
    columns: [
      { data: 'Names' },
      { data: 'Image' },
      { data: 'Status' },
      { data: 'Ports[0].PublicPort' }
    ]
  })
}

function showImages () {
  $('#tabelaImages').DataTable({
    ajax: {
      url: baseURL + 'listimg',
      type: 'GET',
      dataSrc: ''
    },
    columns: [
      { data: 'RepoTags' },
      { data: 'Id'}
    ]
  })
}

function createContainer () {
  const container = {}
  container.name = $('#containername').val()
  container.image = $('#imageNameTag').val()
  container.port = $('#containerPort').val()

  if (container.name != null && container.image != null && container.port != null) {
    $.ajax({
      url: baseURL + 'create',
      type: 'POST',
      data: container
    })
      .done(function (container) {
        alert(container.Name + 'created with sucess')
      })

      .fail(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown)
      })
  }
}

function PullImage () {
  const img = $('#imageName').val()
  var obj ={
    name: img
  };
  debugger;
  if (img != null) {
    $.ajax({
      url: baseURL + 'imagem/pull',
      type: 'POST',
      data: obj
    })
      .done(function (img) {
        alert('created with sucess')
      })

      .fail(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown)
      })
  }
}
function DeleteContainers () {
  $.ajax({
    url: baseURL + '/containers/delete',
    type: 'POST'
  })
    .done(function () {
      alert('All containers were deleted with sucess')
    })

    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(errorThrown)
    })
}
function DeleteImages () {
  $.ajax({
    url: baseURL + '/imagem/deleteAll',
    type: 'POST'
  })
    .done(function () {
      alert('All Images were deleted with sucess')
    })

    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(errorThrown)
    })
}
function DeleteContainer () {
  const id = $('#id_delete_container').val()
  console.log(id)
  $.ajax({
    url: baseURL + '/remove/' + id,
    type: 'DELETE'
  })
    .done(function () {
      alert('the container with the id:' + id + ' was deleted with sucess')
      window.location.reload()
    })

    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(errorThrown)
    })
}
function deleteImage () {
  const id = $('#id_delete_image').val()
  $.ajax({
    url: baseURL + '/imagem/delete/' + id,
    type: 'DELETE'
  })
    .done(function () {
      alert('the Image with the id:' + id + ' was deleted with sucess')
    })

    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown)
    })
}

/*

function showImages () {
  const url = 'https://viacep.com.br/ws/88040400/json'
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText)
    {
      document.getElementById('returnImages').innerHTML = ' <tbody><tr><td>' + response.cep + '</td><td>' + response.bairro + '</td><button type="button" class="btn btn-danger btn-sm ml-1" onclick="deleteContainerById(' + response.bairro + ')">Delete</button></td></tr> </tbody>'
    }
  }
  xhr.send()
} */
