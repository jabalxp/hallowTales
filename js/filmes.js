// Dados de Filmes de Terror - HallowTales

const filmesData = [
    {
        id: 'halloween-1978',
        titulo: 'Halloween',
        ano: 1978,
        diretor: 'John Carpenter',
        sinopse: 'Michael Myers escapa de um hospital psiquiátrico e retorna à sua cidade natal para continuar sua matança na noite de Halloween.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
        decada: '1970s',
        tipo: 'classico',
        genero: 'Slasher'
    },
    {
        id: 'exorcista-1973',
        titulo: 'O Exorcista',
        ano: 1973,
        diretor: 'William Friedkin',
        sinopse: 'Uma menina possuída por uma entidade demoníaca e dois padres que tentam salvá-la. Considerado o filme de terror mais assustador de todos os tempos.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtZDY4MTM1ODU4ZjljXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg',
        decada: '1970s',
        tipo: 'classico',
        genero: 'Sobrenatural'
    },
    {
        id: 'iluminado-1980',
        titulo: 'O Iluminado',
        ano: 1980,
        diretor: 'Stanley Kubrick',
        sinopse: 'Um escritor aceita trabalhar como zelador de um hotel isolado no inverno e enlouquece lentamente. Obra-prima do terror psicológico.',
        poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
        decada: '1980s',
        tipo: 'classico',
        genero: 'Psicológico'
    },
    {
        id: 'psicose-1960',
        titulo: 'Psicose',
        ano: 1960,
        diretor: 'Alfred Hitchcock',
        sinopse: 'Uma secretária em fuga encontra abrigo em um motel isolado gerido por Norman Bates. Revolucionou o gênero de suspense e terror.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg',
        decada: '1960s',
        tipo: 'classico',
        genero: 'Thriller Psicológico'
    },
    {
        id: 'alien-1979',
        titulo: 'Alien: O 8º Passageiro',
        ano: 1979,
        diretor: 'Ridley Scott',
        sinopse: 'A tripulação de uma nave espacial enfrenta uma criatura alienígena mortal. Fusão perfeita de terror e ficção científica.',
        poster: 'https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg',
        decada: '1970s',
        tipo: 'classico',
        genero: 'Sci-Fi Horror'
    },
    {
        id: 'massacre-1974',
        titulo: 'O Massacre da Serra Elétrica',
        ano: 1974,
        diretor: 'Tobe Hooper',
        sinopse: 'Jovens encontram uma família de canibais no Texas. Brutal, perturbador e influente. Definiu o slasher moderno com Leatherface.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDQxMzEzNTItMzkzNS00NDNjLWIyNjMtYzJmNDQyNGM0MDg1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
        decada: '1970s',
        tipo: 'classico',
        genero: 'Slasher'
    },
    {
        id: 'bruxa-blair-1999',
        titulo: 'A Bruxa de Blair',
        ano: 1999,
        diretor: 'Daniel Myrick, Eduardo Sánchez',
        sinopse: 'Três estudantes desaparecem investigando a lenda da Bruxa de Blair. Fundou o gênero found footage e aterrorizou uma geração.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzQ1NDBlNDYtNmMwMS00YTVmLTg5NDMtMzkxNTdmOGU2NjkzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
        decada: '1990s',
        tipo: 'moderno',
        genero: 'Found Footage'
    },
    {
        id: 'corra-2017',
        titulo: 'Corra!',
        ano: 2017,
        diretor: 'Jordan Peele',
        sinopse: 'Um jovem negro visita a família de sua namorada branca e descobre segredos aterrorizantes. Terror social com crítica racial brilhante.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Terror Social'
    },
    {
        id: 'hereditario-2018',
        titulo: 'Hereditário',
        ano: 2018,
        diretor: 'Ari Aster',
        sinopse: 'Uma família assombrada por segredos sombrios e rituais ocultos após a morte da matriarca. Terror psicológico perturbador e devastador.',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Sobrenatural'
    },
    {
        id: 'invocacao-2013',
        titulo: 'Invocação do Mal',
        ano: 2013,
        diretor: 'James Wan',
        sinopse: 'Paranormais Ed e Lorraine Warren investigam atividades demoníacas em uma fazenda. Baseado em casos reais, mestria em jump scares.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Sobrenatural'
    },
    {
        id: 'bruxa-2015',
        titulo: 'A Bruxa',
        ano: 2015,
        diretor: 'Robert Eggers',
        sinopse: 'Na Nova Inglaterra do século XVII, uma família puritana é assombrada por forças sobrenaturais na floresta. Atmosfera opressiva e autêntica.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Folk Horror'
    },
    {
        id: 'it-2017',
        titulo: 'It: A Coisa',
        ano: 2017,
        diretor: 'Andy Muschietti',
        sinopse: 'Sete crianças enfrentam seus medos e um palhaço assassino que aterroriza sua cidade. Adaptação moderna do clássico de Stephen King.',
        poster: 'https://m.media-amazon.com/images/M/MV5BZDVkZmI0YzAtNzdjYi00ZjhhLWE1ODEtMWMzMWMzNDA0NmQ4XkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Sobrenatural'
    },
    {
        id: 'midsommar-2019',
        titulo: 'Midsommar',
        ano: 2019,
        diretor: 'Ari Aster',
        sinopse: 'Um grupo de amigos viaja para um festival de verão na Suécia que acontece a cada 90 anos, mas descobrem rituais perturbadores em um culto pagão.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Folk Horror'
    },
    {
        id: 'lugar-silencioso-2018',
        titulo: 'Um Lugar Silencioso',
        ano: 2018,
        diretor: 'John Krasinski',
        sinopse: 'Uma família sobrevive em silêncio absoluto enquanto criaturas alienígenas caçam pelo som. Tensão constante e inovador uso do silêncio.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Suspense'
    },
    {
        id: 'babadook-2014',
        titulo: 'Babadook',
        ano: 2014,
        diretor: 'Jennifer Kent',
        sinopse: 'Uma mãe viúva e seu filho são aterrorizados por uma criatura de um livro infantil sinistro. Metáfora poderosa sobre luto e depressão.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTk0NzMzODc2NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Psicológico'
    },
    {
        id: 'nos-2019',
        titulo: 'Nós',
        ano: 2019,
        diretor: 'Jordan Peele',
        sinopse: 'Uma família é aterrorizada por versões sinistras de si mesmos. Terror psicológico com camadas de significado e crítica social.',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Terror Social'
    },
    {
        id: 'sexta-1980',
        titulo: 'Sexta-Feira 13',
        ano: 1980,
        diretor: 'Sean S. Cunningham',
        sinopse: 'Jovens conselheiros de acampamento são mortos um por um por um assassino misterioso. Criou o icônico Jason Voorhees.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmYyMTNkYmEtYWQyZi00N2MzLThmYWMtNmE4MTRiZDU3NDY3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
        decada: '1980s',
        tipo: 'classico',
        genero: 'Slasher'
    },
    {
        id: 'pesadelo-1984',
        titulo: 'A Hora do Pesadelo',
        ano: 1984,
        diretor: 'Wes Craven',
        sinopse: 'Freddy Krueger ataca adolescentes em seus sonhos. Se você morrer no sonho, morre na vida real. Ícone do horror dos anos 80.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzFjZmM1ODgtMDBkMS00ZmI2LThkYTUtMGZmMGRlN2QxMGQxXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg',
        decada: '1980s',
        tipo: 'classico',
        genero: 'Slasher'
    },
    {
        id: 'panico-1996',
        titulo: 'Pânico',
        ano: 1996,
        diretor: 'Wes Craven',
        sinopse: 'Um assassino mascarado aterroriza uma cidade e conhece todos os clichês do cinema de terror. Meta-referencial e revolucionário.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_FMjpg_UX1000_.jpg',
        decada: '1990s',
        tipo: 'moderno',
        genero: 'Slasher'
    },
    {
        id: 'anabelle-2014',
        titulo: 'Annabelle',
        ano: 2014,
        diretor: 'John R. Leonetti',
        sinopse: 'A origem da boneca possuída mais assustadora do cinema. Spin-off do universo Invocação do Mal.',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTMxYTIwMDMtYjlkYS00MDEwLWEzOGYtMGJmNTI2NjYyNGIzXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg',
        decada: '2010s',
        tipo: 'moderno',
        genero: 'Sobrenatural'
    }
];
