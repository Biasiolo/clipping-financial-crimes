$(document).ready(function () {
    // Palavras-chave iniciais
    var initialQueries = ["ultimas noticias crimes financeiros america latina", "fraudes america latina"]
    // Crie uma string de consulta combinando as palavras-chave
    var initialQuery = initialQueries.join(' ');

    // Chame a função de pesquisa com as palavras-chave iniciais
    searchGoogle(initialQuery);

    $('#search-button').click(function () {
        var query = $('#search-input').val();
        if (query !== '') {
            searchGoogle(query);
        }
    });

    function searchGoogle(query) {
        var apiKey = 'AIzaSyDqzhF6-gMVJHJm10vUqeC5ASVEyKn0bwo';
        var cx = '631901837bab14131'; // Substitua pelo seu ID de CX

        

// Obtém a data atual menos 30 dias (um mês)
    var lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    var formattedDate = lastMonth.toISOString().split('T')[0];

    // Adiciona a restrição de data à consulta
    var url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&dateRestrict=${formattedDate}`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayResults(data.items);
        },
        error: function (error) {
            console.error('Erro na busca:', error);
        }
    });
    }

    function displayResults(results) {
        var resultsContainer = $('#results-container');
        resultsContainer.empty();

        if (results.length > 0) {
            results.forEach(function (result) {
                resultsContainer.append(`<div class="result-item"><p><a href="${result.link}" target="_blank">${result.title}</a></p><p>${result.link}</p><hr></div>`);
            });
        } else {
            resultsContainer.append('<p>Nenhum resultado encontrado.</p>');
        }
    }
});

