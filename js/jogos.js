// Dados de Jogos de Terror - HallowTales

const jogosData = [
    {
        id: 'silent-hill-2',
        titulo: 'Silent Hill 2',
        ano: 2001,
        desenvolvedor: 'Team Silent / Konami',
        sinopse: 'James Sunderland viaja para Silent Hill após receber uma carta de sua esposa falecida. Terror psicológico profundo com monstros que representam culpa e trauma.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/9/95/Silent_Hill_2.jpg',
        plataformas: 'PS2, Xbox, PC, PS5 (Remake 2024)',
        categoria: 'Survival Horror',
        nota: 10
    },
    {
        id: 'resident-evil-4',
        titulo: 'Resident Evil 4',
        ano: 2005,
        desenvolvedor: 'Capcom',
        sinopse: 'Leon S. Kennedy investiga o sequestro da filha do presidente em uma vila espanhola infestada por cultistas parasitados. Revolucionou o gênero.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Resident_Evil_4_cover.png',
        plataformas: 'Multi-plataforma',
        categoria: 'Survival Horror',
        nota: 10
    },
    {
        id: 'outlast',
        titulo: 'Outlast',
        ano: 2013,
        desenvolvedor: 'Red Barrels',
        sinopse: 'Jornalista investiga asilo abandonado armado apenas com uma câmera. Sem armas, apenas fuga. Terror intenso e claustrofóbico.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/7/76/Outlast_cover.jpg',
        plataformas: 'PC, PS4, Xbox One, Switch',
        categoria: 'Survival Horror',
        nota: 9
    },
    {
        id: 'amnesia',
        titulo: 'Amnesia: The Dark Descent',
        ano: 2010,
        desenvolvedor: 'Frictional Games',
        sinopse: 'Daniel explora um castelo sombrio tentando recuperar suas memórias enquanto é caçado por criaturas horrendas. Pioneiro do horror de primeira pessoa.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/1/19/Amnesia_The_Dark_Descent_cover.png',
        plataformas: 'PC, PS4, Xbox One, Switch',
        categoria: 'Psychological Horror',
        nota: 9
    },
    {
        id: 'fnaf',
        titulo: 'Five Nights at Freddy\'s',
        ano: 2014,
        desenvolvedor: 'Scott Cawthon',
        sinopse: 'Guarda noturno de pizzaria deve sobreviver 5 noites evitando animatrônicos assassinos. Fenômeno indie de jump scares.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Five_Nights_at_Freddy%27s_game_cover.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Indie Horror',
        nota: 8
    },
    {
        id: 'phasmophobia',
        titulo: 'Phasmophobia',
        ano: 2020,
        desenvolvedor: 'Kinetic Games',
        sinopse: 'Investigadores paranormais identificam fantasmas em locais assombrados usando equipamentos reais. Co-op aterrorizante em VR e PC.',
        poster: 'https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg',
        plataformas: 'PC, VR',
        categoria: 'Co-op Horror',
        nota: 9
    },
    {
        id: 'dead-space',
        titulo: 'Dead Space',
        ano: 2008,
        desenvolvedor: 'Visceral Games / EA',
        sinopse: 'Engenheiro Isaac Clarke luta para sobreviver em uma nave espacial infestada de necromorphs. Terror sci-fi claustrofóbico.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Dead_Space_Box_Art.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Survival Horror',
        nota: 10
    },
    {
        id: 'alien-isolation',
        titulo: 'Alien: Isolation',
        ano: 2014,
        desenvolvedor: 'Creative Assembly / Sega',
        sinopse: 'Amanda Ripley é caçada por um Xenomorfo implacável em uma estação espacial. IA aterrorizante que aprende com o jogador.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/3/32/Alien_Isolation_cover.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Survival Horror',
        nota: 10
    },
    {
        id: 'the-last-of-us',
        titulo: 'The Last of Us',
        ano: 2013,
        desenvolvedor: 'Naughty Dog / Sony',
        sinopse: 'Joel e Ellie atravessam os EUA pós-apocalíptico infestado de infectados por fungo. Narrativa emocional com terror visceral.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg',
        plataformas: 'PlayStation, PC',
        categoria: 'Action Horror',
        nota: 10
    },
    {
        id: 'until-dawn',
        titulo: 'Until Dawn',
        ano: 2015,
        desenvolvedor: 'Supermassive Games / Sony',
        sinopse: 'Oito amigos presos em uma montanha devem sobreviver até o amanhecer. Suas escolhas determinam quem vive ou morre. Terror interativo cinematográfico.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/d/da/Until_Dawn_cover.jpg',
        plataformas: 'PlayStation',
        categoria: 'Interactive Drama',
        nota: 9
    },
    {
        id: 'soma',
        titulo: 'SOMA',
        ano: 2015,
        desenvolvedor: 'Frictional Games',
        sinopse: 'Acordar em uma instalação submarina abandonada e questionar a própria consciência. Terror existencial sci-fi profundo.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Soma_cover_art.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Psychological Horror',
        nota: 9
    },
    {
        id: 'little-nightmares',
        titulo: 'Little Nightmares',
        ano: 2017,
        desenvolvedor: 'Tarsier Studios',
        sinopse: 'Uma menina de capa amarela escapa de um navio sinistro cheio de monstros grotescos. Terror atmosférico e puzzle.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Little_Nightmares_cover_art.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Puzzle Horror',
        nota: 9
    },
    {
        id: 'layers-of-fear',
        titulo: 'Layers of Fear',
        ano: 2016,
        desenvolvedor: 'Bloober Team',
        sinopse: 'Um pintor psicótico tenta completar sua obra-prima enquanto sua mansão se transforma em um pesadelo surrealista.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/5/58/Layers_of_Fear_cover.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Psychological Horror',
        nota: 8
    },
    {
        id: 'the-evil-within',
        titulo: 'The Evil Within',
        ano: 2014,
        desenvolvedor: 'Tango Gameworks / Bethesda',
        sinopse: 'Detetive Sebastian Castellanos luta para sobreviver em um mundo nightmaresco. Dirigido por Shinji Mikami (criador de RE).',
        poster: 'https://upload.wikimedia.org/wikipedia/en/e/e9/The_Evil_Within_cover.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Survival Horror',
        nota: 8
    },
    {
        id: 'resident-evil-7',
        titulo: 'Resident Evil 7: Biohazard',
        ano: 2017,
        desenvolvedor: 'Capcom',
        sinopse: 'Ethan Winters procura sua esposa em uma fazenda do Louisiana e encontra a família Baker. Terror em primeira pessoa claustrofóbico.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Resident_Evil_7_cover_art.jpg',
        plataformas: 'Multi-plataforma, VR',
        categoria: 'Survival Horror',
        nota: 10
    },
    {
        id: 'resident-evil-village',
        titulo: 'Resident Evil Village',
        ano: 2021,
        desenvolvedor: 'Capcom',
        sinopse: 'Ethan busca sua filha sequestrada em uma vila europeia com criaturas sobrenaturais. Mix de ação e terror com Lady Dimitrescu.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png',
        plataformas: 'Multi-plataforma, VR',
        categoria: 'Survival Horror',
        nota: 9
    },
    {
        id: 'visage',
        titulo: 'Visage',
        ano: 2020,
        desenvolvedor: 'SadSquare Studio',
        sinopse: 'Explore uma casa onde famílias foram brutalmente assassinadas. Sucessor espiritual de P.T. com terror psicológico intenso.',
        poster: 'https://cdn.cloudflare.steamstatic.com/steam/apps/594330/header.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Psychological Horror',
        nota: 9
    },
    {
        id: 'dead-by-daylight',
        titulo: 'Dead by Daylight',
        ano: 2016,
        desenvolvedor: 'Behaviour Interactive',
        sinopse: '4 sobreviventes vs 1 assassino em mapas assustadores. Multiplayer assimétrico com killers icônicos (Michael Myers, Freddy, etc).',
        poster: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Dead_by_Daylight_cover_art.png',
        plataformas: 'Multi-plataforma',
        categoria: 'Multiplayer Horror',
        nota: 9
    },
    {
        id: 'lethal-company',
        titulo: 'Lethal Company',
        ano: 2023,
        desenvolvedor: 'Zeekerss',
        sinopse: 'Equipe de trabalhadores coleta sucata em luas abandonadas enquanto evita monstros. Co-op horror indie viral com voicechat.',
        poster: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header.jpg',
        plataformas: 'PC',
        categoria: 'Co-op Horror',
        nota: 9
    },
    {
        id: 'the-quarry',
        titulo: 'The Quarry',
        ano: 2022,
        desenvolvedor: 'Supermassive Games / 2K',
        sinopse: 'Monitores de acampamento enfrentam horrores sobrenaturais na última noite. Sucessor espiritual de Until Dawn.',
        poster: 'https://upload.wikimedia.org/wikipedia/en/2/24/The_Quarry_cover_art.jpg',
        plataformas: 'Multi-plataforma',
        categoria: 'Interactive Drama',
        nota: 8
    }
];
