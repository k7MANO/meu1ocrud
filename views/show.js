document.querySelectorAll('.btn-delete').forEach(button => {
  button.addEventListener('click', function () {
    const enderecoId = this.getAttribute('data-id')

    if (confirm('Você tem certeza que deseja excluir este endereço?')) {
      fetch(`/endereco/${enderecoId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            alert(data.message) // Mostra a mensagem de sucesso
            // Remover o elemento da página ou recarregar a página
            location.reload() // Simplesmente recarrega a página para atualizar a lista de endereços
          }
        })
        .catch(error => console.error('Erro ao excluir o endereço:', error))
    }
  })
})

function redirectToEdit(button) {
  const enderecoId = button.getAttribute('data-id')
  window.location.href = `/edit/${enderecoId}`
}

document.querySelectorAll('.btn-edit').forEach(button => {
  button.addEventListener('click', function () {
    const enderecoId = this.getAttribute('data-id')
    window.location.href = `/edit/${enderecoId}`
  })
})
