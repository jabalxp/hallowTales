// Dados de Séries de Terror - HallowTales

const seriesData = [
    {
        id: 'stranger-things',
        titulo: 'Stranger Things',
        ano: 2016,
        criador: 'The Duffer Brothers',
        sinopse: 'Um grupo de crianças em uma pequena cidade enfrenta criaturas sobrenaturais e experimentos governamentais nos anos 80.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        temporadas: 4,
        streaming: 'Netflix',
        genero: 'Sci-Fi Horror'
    },
    {
        id: 'arquivo-x',
        titulo: 'Arquivo X',
        ano: 1993,
        criador: 'Chris Carter',
        sinopse: 'Agentes do FBI Mulder e Scully investigam casos paranormais e conspirações governamentais. Série cult que definiu o gênero.',
        poster: 'https://m.media-amazon.com/images/M/MV5BZDA0MmM4YzUtMzYwZC00OGI1LThkMDctNjIxZTZhMGZlYzVlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg',
        temporadas: 11,
        streaming: 'Disney+',
        genero: 'Sci-Fi Mistério'
    },
    {
        id: 'haunting-hill-house',
        titulo: 'A Maldição da Residência Hill',
        ano: 2018,
        criador: 'Mike Flanagan',
        sinopse: 'Uma família confronta memórias assombradas de sua antiga casa e os eventos que os expulsaram. Horror familiar profundo.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTU4NzA4MDEwNF5BMl5BanBnXkFtZTgwMTQxODYzNjM@._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Sobrenatural'
    },
    {
        id: 'haunting-bly-manor',
        titulo: 'A Maldição da Mansão Bly',
        ano: 2020,
        criador: 'Mike Flanagan',
        sinopse: 'Uma babá cuida de duas crianças em uma mansão assombrada na Inglaterra. Romance gótico com fantasmas perturbadores.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzZiMjA5NGYtZjJmYi00ODI5LTk2NWEtNDA1NTk5MDRjNTQ0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Sobrenatural'
    },
    {
        id: 'american-horror-story',
        titulo: 'American Horror Story',
        ano: 2011,
        criador: 'Ryan Murphy, Brad Falchuk',
        sinopse: 'Cada temporada conta uma história diferente de terror: casa assombrada, asilo, bruxas, circo, hotel, e mais.',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTdkN2E2NTgtY2JmYy00M2QzLTgyMzMtMzNmZWZiMzY3MWQ2XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_FMjpg_UX1000_.jpg',
        temporadas: 12,
        streaming: 'Disney+',
        genero: 'Antologia'
    },
    {
        id: 'walking-dead',
        titulo: 'The Walking Dead',
        ano: 2010,
        criador: 'Frank Darabont',
        sinopse: 'Sobreviventes de um apocalipse zumbi lutam contra mortos-vivos e outros humanos. Épico de horror pós-apocalíptico.',
        poster: 'https://m.media-amazon.com/images/M/MV5BZmFlMTA0MmUtNWVmOC00ZmE1LWFmMDYtZTJhYjJhNGVjYTU5XkEyXkFqcGdeQXVyMTAzMDM4MjM0._V1_FMjpg_UX1000_.jpg',
        temporadas: 11,
        streaming: 'Netflix',
        genero: 'Zumbi'
    },
    {
        id: 'black-mirror',
        titulo: 'Black Mirror',
        ano: 2011,
        criador: 'Charlie Brooker',
        sinopse: 'Série antológica que explora o lado sombrio da tecnologia e da sociedade moderna. Terror psicológico e distópico.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        temporadas: 6,
        streaming: 'Netflix',
        genero: 'Sci-Fi Distopia'
    },
    {
        id: 'servant',
        titulo: 'Servant',
        ano: 2019,
        criador: 'Tony Basgallop',
        sinopse: 'Um casal de Filadélfia enlutado contrata uma babá misteriosa para cuidar de seu bebê reborn. M. Night Shyamalan produtor.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjJhZmU0ZTQtYmM4OC00YTVkLTg4ZTUtZjAwNDRiZjY0ZWM2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
        temporadas: 4,
        streaming: 'Apple TV+',
        genero: 'Psicológico'
    },
    {
        id: 'evil',
        titulo: 'Evil',
        ano: 2019,
        criador: 'Robert King, Michelle King',
        sinopse: 'Uma psicóloga cética, um padre em treinamento e um técnico investigam possessões demoníacas e milagres.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjJkZDk0NDgtZjY1Ni00MDI0LWE5YTUtMTU3YTU1ODIxYjYwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
        temporadas: 4,
        streaming: 'Paramount+',
        genero: 'Sobrenatural'
    },
    {
        id: 'marianne',
        titulo: 'Marianne',
        ano: 2019,
        criador: 'Samuel Bodin',
        sinopse: 'Uma escritora de horror descobre que seus livros estão trazendo uma bruxa maligna à vida. Terror francês intenso.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNmYxYWJjNjYtN2Y3NC00MWU3LWFjZWUtZmJiZjdmN2E3MjM0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Sobrenatural'
    },
    {
        id: 'castle-rock',
        titulo: 'Castle Rock',
        ano: 2018,
        criador: 'Sam Shaw, Dustin Thomason',
        sinopse: 'Baseada no universo de Stephen King, a série se passa na fictícia cidade de Castle Rock, Maine.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTYwOWM5MzUtNjI5YS00NjFiLWIyNzYtYWNmZjc5OGVhMDU3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
        temporadas: 2,
        streaming: 'Hulu',
        genero: 'Psicológico'
    },
    {
        id: 'chucky',
        titulo: 'Chucky',
        ano: 2021,
        criador: 'Don Mancini',
        sinopse: 'A boneca assassina Chucky retorna para aterrorizar uma nova geração em uma pequena cidade americana.',
        poster: 'https://m.media-amazon.com/images/M/MV5BNzE0Mzk5MDEtMjk0My00OGE5LWI5MjEtYTBhM2Q2YWRmZDQzXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg',
        temporadas: 3,
        streaming: 'Universal+',
        genero: 'Slasher'
    },
    {
        id: 'midnight-mass',
        titulo: 'Missa da Meia-Noite',
        ano: 2021,
        criador: 'Mike Flanagan',
        sinopse: 'A chegada de um padre carismático traz milagres e eventos sobrenaturais perturbadores a uma ilha isolada.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYjc5NTMwMGEtMDJmZC00NmQzLTgwN2EtMzgzYWY5ZTZhODZkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Sobrenatural'
    },
    {
        id: 'yellowjackets',
        titulo: 'Yellowjackets',
        ano: 2021,
        criador: 'Ashley Lyle, Bart Nickerson',
        sinopse: 'Sobreviventes de um acidente de avião em 1996 lidam com as consequências décadas depois. Mistério e canibalismo.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYmJmNTJhNTctZGM3ZC00ZGJhLTg2NTMtMDc5MzZhZDJhNWE0XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg',
        temporadas: 2,
        streaming: 'Paramount+',
        genero: 'Suspense'
    },
    {
        id: 'penny-dreadful',
        titulo: 'Penny Dreadful',
        ano: 2014,
        criador: 'John Logan',
        sinopse: 'Personagens clássicos da literatura de terror (Drácula, Frankenstein, Dorian Gray) se encontram na Londres vitoriana.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMwOTg2MDE4Nl5BMl5BanBnXkFtZTgwNjA2NDM3NDE@._V1_FMjpg_UX1000_.jpg',
        temporadas: 3,
        streaming: 'Paramount+',
        genero: 'Gótico'
    },
    {
        id: 'lovecraft-country',
        titulo: 'Lovecraft Country',
        ano: 2020,
        criador: 'Misha Green',
        sinopse: 'Um homem negro viaja pelo sul segregado dos EUA dos anos 50 enfrentando racismo e horrores lovecraftianos.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTg3MTE3NTQ3OV5BMl5BanBnXkFtZTgwNjg0MjU5NzE@._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'HBO Max',
        genero: 'Cósmico'
    },
    {
        id: 'terror',
        titulo: 'The Terror',
        ano: 2018,
        criador: 'David Kajganich',
        sinopse: 'Série antológica. Primeira temporada: expedição perdida no Ártico enfrenta criatura sobrenatural e canibalismo.',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjAwOTMxMjI4NV5BMl5BanBnXkFtZTgwNjA3OTA0NTM@._V1_FMjpg_UX1000_.jpg',
        temporadas: 2,
        streaming: 'AMC+',
        genero: 'Histórico'
    },
    {
        id: 'sandman',
        titulo: 'Sandman',
        ano: 2022,
        criador: 'Neil Gaiman',
        sinopse: 'Dream, o Senhor dos Sonhos, escapa após 70 anos de prisão e reconstrói seu reino. Dark fantasy épico.',
        poster: 'https://m.media-amazon.com/images/M/MV5BYzk3Zjk2NWQtYzUyZC00MjhiLWIzOTUtNGY0ZjRlOTZlYjI3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Dark Fantasy'
    },
    {
        id: 'wednesday',
        titulo: 'Wednesday',
        ano: 2022,
        criador: 'Alfred Gough, Miles Millar',
        sinopse: 'Wednesday Addams investiga uma onda de assassinatos enquanto estuda na Academia Nunca Mais. Tim Burton diretor.',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2ZmMjEyZmYtOGM4YS00YTNhLWE3ZDMtNzQxM2RhNjBlODIyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Comédia Sombria'
    },
    {
        id: 'ratched',
        titulo: 'Ratched',
        ano: 2020,
        criador: 'Ryan Murphy',
        sinopse: 'A origem da enfermeira Ratched do filme "Um Estranho no Ninho". Thriller psicológico perturbador.',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2MwOGY4ZjgtY2VhYi00NjNhLWI5NTYtNGJmYjljMDYzYzJkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        temporadas: 1,
        streaming: 'Netflix',
        genero: 'Psicológico'
    }
];
