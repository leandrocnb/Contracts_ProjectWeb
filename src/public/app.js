/*
Leandro Cesar do Nascimento Bertoldi
Engenharia de Computação
Programação Web
*/

$(function () {
    //GET
    $('#listContratos').on('click', function() {
        $.ajax({
            url: '/contracts',
            success: function (contracts) {
                console.log(contracts);
                let tbody = $('tbody');
                tbody.html('');
                contracts.forEach(contract => {
                    tbody.append(`
                        <tr>
                            <td class="id" style="visibility: hidden;">${contract._id}</<td>
                            <td>
                                <input type="text" class="tipo" value="${contract.tipo}"/>
                            </<td>
                            <td>
                                <input type="text" class="ano" value="${contract.ano}"/>
                            </<td>
                            <td>
                                <input type="text" class="inicio" value="${contract.inicio}"/>
                            </<td>
                            <td>
                                <input type="text" class="fim" value="${contract.fim}"/>
                            </<td>
                            <td>
                                <input type="text" class="convenente" value="${contract.convenente}"/>
                            </<td>
                            <td>
                                <input type="text" class="processo" value="${contract.processo}"/>
                            </<td>
                            <td>
                                <a class="editContratos"><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>
                                <a class="delContratos"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a>
                            </td>

                        </tr>
                    `)
                })
            }
        })
    });

    //POST
    $('#cadastroContrato').on('submit', function(e) {
        e.preventDefault();

        let tipo = $('#tipo');
        let ano = $('#ano');
        let inicio = $('#inicio');
        let fim = $('#fim');
        let convenente = $('#convenente');
        let processo = $('#processo');

        $.ajax({
            url: '/contracts',
            method: 'POST',
            data: {
                tipo: tipo.val(),
                ano: ano.val(),
                inicio: inicio.val(),
                fim: fim.val(),
                convenente: convenente.val(),
                processo: processo.val()
            },
            success: function(response) {
                $('#listContratos').click();
                swal("Cadastrado!", "Novo contrato cadastrado com sucesso.", "success");
                //$('#tipo').append('');
                //$('#ano');
                //$('#inicio');
                //$('#fim');
                //$('#convenente');
                //$('#processo');
            }
        })
    })

    //PUT
    $('table').on('click', '.editContratos', function() {
        console.log('entrou aqui');
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        let tipo = row.find('.tipo').val();
        let ano = row.find('.ano').val();
        let inicio = row.find('.inicio').val();
        let fim = row.find('.fim').val();
        let convenente = row.find('.convenente').val();
        let processo = row.find('.processo').val();

        $.ajax({
            url: '/contracts/' + id,
            method: 'PUT',
            data: {
                tipo: tipo,
                ano: ano,
                inicio: inicio,
                fim: fim,
                convenente: convenente,
                processo: processo
            },
            success: function (response) {
                $('#listContratos').click();
                swal("Atualizado!", "Contrato atualizado com sucesso.", "success");
            }
        })
    });

    //DELETE
    $('table').on('click', '.delContratos', function() {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        swal({
            title: "Deseja realmente deletar?",
            text: "Após deletar um contrato não será possivel recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: '/contracts/' + id,
                    method: 'DELETE',
                    success: function (response) {
                        $('#listContratos').click();
                        swal("Deletado!", "Contrato deletado com sucesso.", "success");
                    }
                })
            }
          });
       
    });

});