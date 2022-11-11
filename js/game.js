setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"logo.png",
	latar:"latar.jpg",
	startBtn:"tombolStart.png",
	cover:"cover2.jpg",
	playBtn:"btn-play.png",
	maxBtn:"maxBtn.png",
	minBtn:"minBtn.png"	,
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall:"Fall.png",
	hit:"Hit.png",
	tileset:"Terrain.png",
	bg:"bg.png",
	item1:"Strawberry.png",
	item2:"Kiwi.png",
	musuh1Idle:"enemy1Idle.png",
	musuh1Run:"enemy1Run.png",
	musuh1Hit:"enemy1Hit.png",	
	musuh2Idle:"enemy2Idle.png",
	musuh2Run:"enemy2Run.png",
	musuh2Hit:"enemy2Hit.png",	
	bendera:"flag.png",
	
	
	

}
//file suara yang dipakai dalam game
var suara = {
	suaraUtama:'sounds.mp3',
	dead:'dead.mp3',
	jump:"jump.wav",
	coin:"coin.wav",
	injek:'injek.wav',
	win:"win.wav"
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, 	halamanCover);


function halamanCover(){
	
	hapusLayar('#fffff');
	gambarFull(dataGambar.cover);
	musik(dataSuara.suaraUtama)
	var playBtn = tombol(dataGambar.playBtn, 1100, 500);
	if (tekan(playBtn)){	
		game.musik.play();
		setAwal();
		jalankan(gameLoop);
	}	
	resizeBtn(1150,50);
}

function setAwal(){
	game.hero = setSprite(dataGambar.idle, 32, 32);
	musik(dataSuara.suaraUtama);
	game.skalaSprite = 2;
	game.hero.animDiam = dataGambar.idle;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJalan = dataGambar.run;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	setPlatform(this ["map_"+game.level], dataGambar.tileset, 32, game.hero);
	game.gameOver = ulangiPermainan;
	setPlatformItem(1, dataGambar.item1);
	setPlatformItem(2, dataGambar.item2);
	var musuh1 = {};
	musuh1.animDiam = dataGambar.musuh1Idle;
	musuh1.animJalan = dataGambar.musuh1Run;
	musuh1.animMati = dataGambar.musuh1Hit;
	var musuh2 = {};
	musuh2.animDiam = dataGambar.musuh2Idle;
	musuh2.animJalan = dataGambar.musuh2Run;
	musuh2.animMati = dataGambar.musuh2Hit;
	setPlatformEnemy(1, musuh1);
	setPlatformEnemy2(2, musuh2);
	setPlatformTrigger(1, dataGambar.bendera);

	
}

function ulangiPermainan(){
	game.aktif= true;
	game. score= 0;
	setAwal();
	jalankan(gameLoop);	
	setTimeout(playm,1000)
}

function playm(){
	game.musik.play();
}

function gameLoop(){
	hapusLayar();	
	if(game.kanan){
		gerakLevel(game.hero, 4, 0);
	}else if(game.kiri){
		gerakLevel(game.hero, -3, 0);
	}else if(game.a){
		gerakLevel(game.hero, -3, 0);
	}else if(game.d){
		gerakLevel(game.hero, 3, 0);
	}
	if(game.atas){
		gerakLevel(game.hero, 0, -10);
		
	}else if(game.w){
		gerakLevel(game.hero, 0, -10);
	}
	latar(dataGambar.latar)
	buatLevel();
	cekItem();
	teks(game.score, 40, 60);
	game.score.style
}


function menang(){
	swal({
		title: "Winner",
		text:'Scor ' + game.hiScore,
		timer: 3000,
		buttons: false,
	  });
}

function cekItem(){
	if (game.itemID > 0){
		mainkanSuara(dataSuara.coin)
		tambahScore(10);
		game.itemID = 0;
		
		
		

	}
	if (game.musuhID != 0){
		tambahScore(25);
		game.musuhID = 0;
		

		
	}
	if (game.triggerID == 1){
		game.triggerID = 0;
		game.aktif = false;
		game.level++;
		game.musik.stop();
		setTimeout(menang,2000)
		mainkanSuara(dataSuara.win)
		setTimeout(ulangiPermainan, 5000)
	}

}
	
