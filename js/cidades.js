document.addEventListener('DOMContentLoaded', function() {
    const cidades = [
        { 
            nome: "Edimburgo, Escócia", 
            historiaReal: "Edimburgo, a capital da Escócia desde o século XV, é uma cidade com uma rica história que remonta à Idade do Bronze. Seu centro histórico é dividido em Cidade Velha (medieval) e Cidade Nova (georgiana), ambos Patrimônios Mundiais da UNESCO. A cidade é um centro de educação, direito, finanças e cultura.",
            historiaTerror: "Conhecida por seus cofres subterrâneos (Edinburgh Vaults), onde se diz que os fantasmas de vítimas da peste e de criminosos vagueiam. O Castelo de Edimburgo também é um dos lugares mais assombrados do mundo, com relatos de um flautista fantasma e um baterista sem cabeça.",
            fatosCuriosos: "Edimburgo foi a primeira cidade do mundo a ter seu próprio corpo de bombeiros. Além disso, a personagem de ficção Sherlock Holmes foi criada por Sir Arthur Conan Doyle, que estudou medicina na Universidade de Edimburgo."
        },
        { 
            nome: "Nova Orleans, EUA", 
            historiaReal: "Fundada por colonos franceses em 1718, Nova Orleans é famosa por sua arquitetura colonial francesa e espanhola, sua música (especialmente o jazz) e sua culinária distinta. A cidade foi palco de eventos históricos importantes, incluindo a Batalha de Nova Orleans em 1815.",
            historiaTerror: "Famosa por sua cultura vodu e lendas de vampiros. A mansão LaLaurie é notoriamente assombrada pelo fantasma de Delphine LaLaurie, uma socialite que torturou e assassinou escravos em sua casa. Os cemitérios da cidade, com seus túmulos acima do solo, também são focos de atividade paranormal.",
            fatosCuriosos: "Devido ao seu solo pantanoso e lençol freático alto, os mortos em Nova Orleans são tradicionalmente enterrados em túmulos e mausoléus acima do solo, criando 'cidades dos mortos'."
        },
        { 
            nome: "Praga, República Tcheca", 
            historiaReal: "Praga tem sido um centro político, cultural e econômico da Europa Central por mais de 1.100 anos. A cidade floresceu durante as eras gótica, renascentista e barroca. O Castelo de Praga é o maior castelo antigo do mundo.",
            historiaTerror: "Uma cidade cheia de lendas. Diz-se que o fantasma do Cavaleiro Sem Cabeça cavalga pelas ruas da Cidade Velha. A Ponte Carlos é lar de várias estátuas e lendas, incluindo a de São João Nepomuceno, cujo fantasma supostamente aparece.",
            fatosCuriosos: "O Relógio Astronômico de Praga, instalado em 1410, é o terceiro relógio astronômico mais antigo do mundo e o mais antigo ainda em funcionamento."
        },
        { 
            nome: "Cidade do México, México", 
            historiaReal: "Construída sobre as ruínas de Tenochtitlan, a antiga capital do Império Asteca, a Cidade do México é uma das cidades mais antigas das Américas. É um centro vibrante de arte, cultura e história, com inúmeros museus e sítios arqueológicos.",
            historiaTerror: "A Ilha das Bonecas (Isla de las Muñecas) é um dos lugares mais assustadores. Coberta de bonecas velhas e em decomposição penduradas em árvores, a ilha é um memorial a uma menina que se afogou ali. Dizem que as bonecas sussurram e movem os olhos.",
            fatosCuriosos: "A Cidade do México está afundando a uma taxa de até 50 centímetros por ano em algumas áreas, devido à extração de água subterrânea sob a cidade."
        },
        { 
            nome: "Poveglia, Itália", 
            historiaReal: "Poveglia é uma pequena ilha na Lagoa de Veneza. Sua história é marcada pelo isolamento. Foi usada para abrigar comunidades, mas sua população diminuiu gradualmente. No século XX, um hospital para idosos foi construído lá, que mais tarde foi fechado.",
            historiaTerror: "A ilha foi usada como estação de quarentena para vítimas da Peste Negra e mais tarde como um asilo para doentes mentais, onde um médico supostamente realizava experimentos cruéis. A ilha é considerada um dos lugares mais mal-assombrados do planeta, com relatos de gritos e aparições.",
            fatosCuriosos: "A ilha está atualmente desabitada e o acesso público é proibido. Várias tentativas de leiloar a ilha para desenvolvimento falharam."
        },
        { 
            nome: "Bhangarh, Índia", 
            historiaReal: "Bhangarh é uma cidade fortificada no estado de Rajastão, Índia, fundada em 1573. A cidade foi abandonada no século XVIII após uma batalha com invasores mogóis. Hoje é um sítio arqueológico protegido pelo Archaeological Survey of India.",
            historiaTerror: "Segundo a lenda, um mago negro se apaixonou pela princesa Ratnavati e tentou enfeitiçá-la. Quando ela descobriu, o feitiço se voltou contra ele, mas antes de morrer, amaldiçoou a cidade à destruição. É proibido entrar no forte após o pôr do sol, e relatos de vozes, aparições e luzes misteriosas são comuns.",
            fatosCuriosos: "O governo indiano instalou placas oficiais proibindo a entrada no forte entre o pôr do sol e o nascer do sol. É considerado o lugar mais assombrado da Índia."
        },
        { 
            nome: "Aokigahara, Japão", 
            historiaReal: "Aokigahara é uma densa floresta de 35 km² localizada na base do Monte Fuji. Formada por lava vulcânica há mais de mil anos, a floresta é conhecida por sua beleza natural e trilhas desafiadoras. É um local popular para caminhadas.",
            historiaTerror: "Conhecida como a 'Floresta do Suicídio', Aokigahara é o segundo lugar mais comum para suicídios no mundo (depois da Golden Gate Bridge). Visitantes relatam uma sensação opressiva de tristeza, bússolas que não funcionam corretamente e a presença de 'yūrei' (fantasmas) vagando entre as árvores densas.",
            fatosCuriosos: "Devido à densidade da floresta e ao solo rochoso de lava, o som é completamente absorvido, criando um silêncio absoluto e desorientador. Placas ao longo das trilhas encorajam as pessoas a reconsiderarem e procurarem ajuda."
        },
        { 
            nome: "Torre de Londres, Inglaterra", 
            historiaReal: "Construída em 1066 por Guilherme, o Conquistador, a Torre de Londres serviu como fortaleza real, prisão, arsenal e até casa da moeda. É um dos castelos mais famosos do mundo e Patrimônio Mundial da UNESCO.",
            historiaTerror: "Com uma história de 900 anos de tortura e execução, a Torre é assombrada por muitos fantasmas famosos, incluindo Ana Bolena (decapitada em 1536), Lady Jane Grey e os dois jovens príncipes que desapareceram misteriosamente. Guardas e visitantes relatam aparições, sons de correntes e gritos nas torres.",
            fatosCuriosos: "Os corvos da Torre são considerados guardiões do reino. Segundo a lenda, se os corvos deixarem a Torre, a Coroa e a Grã-Bretanha cairão. Por isso, sempre há pelo menos seis corvos no local com suas asas cortadas."
        },
        { 
            nome: "Salem, EUA", 
            historiaReal: "Salem, Massachusetts, foi fundada em 1626 e tornou-se notória pelos julgamentos de bruxas de 1692. Durante esse período, mais de 200 pessoas foram acusadas de bruxaria e 20 foram executadas. Hoje é uma cidade histórica que preserva sua herança colonial.",
            historiaTerror: "A cidade é repleta de locais assombrados. A Casa de Giles Corey, pressionado até a morte por se recusar a fazer um julgamento, é um ponto focal. Dizem que seu fantasma aparece antes de grandes tragédias na cidade. O antigo cemitério tem relatos constantes de aparições de figuras vestidas de época.",
            fatosCuriosos: "Ironicamente, não havia 'bruxas' reais em Salem - os julgamentos foram resultado de histeria em massa. Hoje, Salem abraça sua história sombria e é conhecida como a 'Cidade das Bruxas', com festivais de Halloween elaborados."
        },
        { 
            nome: "Catacumbas de Paris, França", 
            historiaReal: "As Catacumbas de Paris são uma rede de túneis subterrâneos que se estendem por cerca de 300 km sob a cidade. Criadas no final do século XVIII para resolver a superlotação dos cemitérios, elas abrigam os restos mortais de aproximadamente 6 milhões de parisienses.",
            historiaTerror: "Nos túneis escuros e labirínticos, visitantes relatam ter sido tocados por mãos invisíveis, ver sombras que se movem independentemente, ouvir sussurros e vozes desencarnadas. Alguns exploradores ilegais que se aventuraram nas seções fechadas nunca mais foram encontrados.",
            fatosCuriosos: "Apenas uma pequena parte das catacumbas está aberta ao público. Existe uma força policial especial chamada 'Cataflics' dedicada a patrulhar os túneis e impedir exploradores ilegais. Festas secretas e eventos clandestinos acontecem regularmente nas seções proibidas."
        }
    ];

    const listaCidades = document.getElementById('lista-cidades');
    const searchInput = document.getElementById('search-cidades');

    function exibirCidades(cidadesFiltradas) {
        listaCidades.innerHTML = '';
        
        if (cidadesFiltradas.length === 0) {
            listaCidades.innerHTML = '<p style="text-align: center; color: #ff4444; font-size: 1.2rem;">Nenhuma cidade encontrada. Tente outra busca.</p>';
            return;
        }
        
        cidadesFiltradas.forEach((cidade, index) => {
            const div = document.createElement('div');
            div.className = 'cidade';
            div.style.animationDelay = `${index * 0.1}s`;
            div.innerHTML = `
                <h3>${cidade.nome}</h3>
                <div class="botoes-info">
                    <button data-tipo="real" data-index="${index}">📖 História Real</button>
                    <button data-tipo="terror" data-index="${index}">👻 História de Terror</button>
                    <button data-tipo="fatos" data-index="${index}">💡 Fatos Curiosos</button>
                </div>
                <div id="real-${index}" class="info-content">
                    <h4>📖 História Real</h4>
                    <p>${cidade.historiaReal}</p>
                </div>
                <div id="terror-${index}" class="info-content">
                    <h4>👻 História de Terror</h4>
                    <p>${cidade.historiaTerror}</p>
                </div>
                <div id="fatos-${index}" class="info-content">
                    <h4>💡 Fatos Curiosos</h4>
                    <p>${cidade.fatosCuriosos}</p>
                </div>
            `;
            listaCidades.appendChild(div);
        });
        
        // Atualizar contador
        atualizarContador(cidadesFiltradas.length);

        document.querySelectorAll('.botoes-info button').forEach(button => {
            button.addEventListener('click', function() {
                const tipo = this.getAttribute('data-tipo');
                const index = this.getAttribute('data-index');
                const cidadeDiv = this.closest('.cidade');

                // Esconde todos os conteúdos de informação da cidade clicada
                cidadeDiv.querySelectorAll('.info-content').forEach(content => {
                    content.style.display = 'none';
                });

                // Mostra o conteúdo selecionado
                const contentToShow = document.getElementById(`${tipo}-${index}`);
                if (contentToShow) {
                    contentToShow.style.display = 'block';
                }
            });
        });
    }

    function atualizarContador(quantidade) {
        let contador = document.getElementById('contador-cidades');
        if (!contador) {
            contador = document.createElement('div');
            contador.id = 'contador-cidades';
            contador.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.2rem; color: #ff4444;';
            searchInput.parentNode.insertBefore(contador, searchInput.nextSibling);
        }
        contador.innerHTML = `<strong>Exibindo ${quantidade} cidade${quantidade !== 1 ? 's' : ''}</strong>`;
    }

    searchInput.addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        const cidadesFiltradas = cidades.filter(cidade => 
            cidade.nome.toLowerCase().includes(termo)
        );
        exibirCidades(cidadesFiltradas);
    });

    // Exibição inicial
    exibirCidades(cidades);
});