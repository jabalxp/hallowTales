document.addEventListener('DOMContentLoaded', function() {
    const livros = [
        { titulo: "O Iluminado", autor: "Stephen King", resumo: "Jack Torrance, um aspirante a escritor e alcoólatra em recuperação, aceita um emprego como zelador de inverno no isolado Hotel Overlook, nas montanhas do Colorado. Ele se muda com sua esposa, Wendy, e seu filho, Danny, que possui 'o brilho', uma habilidade psíquica. O hotel, assombrado por eventos passados, exerce uma influência malévola sobre Jack, levando-o à loucura e violência." },
        { titulo: "Drácula", autor: "Bram Stoker", resumo: "O romance narra a história do Conde Drácula, um vampiro da Transilvânia que se muda para a Inglaterra em busca de sangue novo e para espalhar sua maldição. Um pequeno grupo, liderado pelo Professor Abraham Van Helsing, luta para detê-lo." },
        { titulo: "Frankenstein", autor: "Mary Shelley", resumo: "Victor Frankenstein, um jovem cientista, cria uma criatura grotesca em um experimento científico pouco ortodoxo. Horrorizado com sua criação, Victor a abandona. A criatura, rejeitada pela sociedade, busca vingança contra seu criador." },
        { titulo: "O Exorcista", autor: "William Peter Blatty", resumo: "Regan MacNeil, uma menina de 12 anos, é possuída por uma entidade demoníaca. Sua mãe, desesperada, busca a ajuda de dois padres para realizar um exorcismo e salvar sua filha." },
        { titulo: "A Assombração da Casa da Colina", autor: "Shirley Jackson", resumo: "Dr. Montague, um investigador do sobrenatural, aluga a Casa da Colina, uma mansão com fama de assombrada, para um estudo. Ele convida três pessoas, incluindo a tímida Eleanor Vance, que desenvolve uma estranha conexão com a casa." },
        { titulo: "Psicose", autor: "Robert Bloch", resumo: "Marion Crane, uma secretária, rouba 40 mil dólares e foge. Durante sua fuga, ela para no Motel Bates, administrado pelo recluso e estranho Norman Bates e sua mãe dominadora. O que acontece a seguir é um dos maiores choques da literatura de suspense." },
        { titulo: "O Chamado de Cthulhu", autor: "H.P. Lovecraft", resumo: "Uma coleção de contos que introduz o panteão de entidades cósmicas conhecidas como os Grandes Antigos. A história principal segue a investigação de um culto que adora a entidade Cthulhu, que dorme em sua cidade submersa de R'lyeh, esperando para despertar e dominar o mundo." },
        { titulo: "O Bebê de Rosemary", autor: "Ira Levin", resumo: "Rosemary Woodhouse e seu marido, Guy, se mudam para um apartamento em Nova York com uma reputação sinistra. Após Rosemary engravidar, ela começa a suspeitar que seus vizinhos idosos e seu próprio marido têm planos malignos para seu bebê." },
        { titulo: "Eu Sou a Lenda", autor: "Richard Matheson", resumo: "Robert Neville é o último homem vivo na Terra... ou assim ele pensa. O resto da humanidade foi transformado em vampiros sedentos de sangue, e Neville deve lutar para sobreviver todas as noites enquanto busca uma cura durante o dia." },
        { titulo: "It: A Coisa", autor: "Stephen King", resumo: "Em Derry, uma pequena cidade no Maine, sete crianças conhecidas como 'O Clube dos Perdedores' enfrentam uma criatura antiga que ressurge a cada 27 anos para se alimentar do medo das crianças, assumindo a forma de seus piores pesadelos, mais comumente o palhaço Pennywise." }
    ];

    const listaLivros = document.getElementById('lista-livros');
    const searchInput = document.getElementById('search-livros');

    function exibirLivros(livrosFiltrados) {
        listaLivros.innerHTML = '';
        
        if (livrosFiltrados.length === 0) {
            listaLivros.innerHTML = '<p style="text-align: center; color: #ff4444; font-size: 1.2rem;">Nenhum livro encontrado. Tente outra busca.</p>';
            return;
        }
        
        livrosFiltrados.forEach((livro, index) => {
            const div = document.createElement('div');
            div.className = 'livro';
            div.style.animationDelay = `${index * 0.1}s`;
            div.innerHTML = `
                <div class="livro-numero">#${index + 1}</div>
                <h3>${livro.titulo}</h3>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p>${livro.resumo}</p>
            `;
            listaLivros.appendChild(div);
        });
        
        // Atualizar contador
        atualizarContador(livrosFiltrados.length);
    }
    
    function atualizarContador(quantidade) {
        let contador = document.getElementById('contador-livros');
        if (!contador) {
            contador = document.createElement('div');
            contador.id = 'contador-livros';
            contador.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.2rem; color: #ff4444;';
            searchInput.parentNode.insertBefore(contador, searchInput.nextSibling);
        }
        contador.innerHTML = `<strong>Exibindo ${quantidade} livro${quantidade !== 1 ? 's' : ''}</strong>`;
    }

    searchInput.addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        const livrosFiltrados = livros.filter(livro => 
            livro.titulo.toLowerCase().includes(termo) || 
            livro.autor.toLowerCase().includes(termo)
        );
        exibirLivros(livrosFiltrados);
    });

    // Exibição inicial
    exibirLivros(livros);
});