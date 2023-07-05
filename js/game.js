setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"logo.png",
	latar1:"latar.jpg",
	latar2:"latarKemal.jpg",
	startBtn:"tombolStart.png",
	cover:"latarKemal.jpg",
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
	item5:"item5.png",
	musuh1Idle:"enemy1Idle.png",
	musuh1Run:"enemy1Run.png",
	musuh1Hit:"enemy1Hit.png",	
	musuh2Idle:"enemy2Idle.png",
	musuh2Run:"enemy2Run.png",
	musuh2Hit:"enemy2Hit.png",	
	bendera:"flag.png",
	cooming: 'cooming.jpg',
	musuhraja: 'RajaIdle.png',
	musuhrajarun: 'RajaRun.png',
	musuhrajahit: 'RajaHit.png',
	
}
//file suara yang dipakai dalam game
var suara = {
	suaraUtama:'sound.mp3',
	dead:'dead.mp3',
	jump:"jump.wav",
	coin:"coin.wav",
	injek:'injek.wav',
	win:"win.wav",
	endsound:'endsound.mp3',
	cover: 'cover.mp3',
	musiklevel1:'musicmap1.mp3',
	musiklevel2:'05. Map 2 theme.mp3',
	musiklevel3:'06. Map 3 theme.mp3',
	musikraja:'29. Palace Music.mp3',
	rajamati:'13. Map completed.mp3',
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, 	halamanCover);


function halamanCover() {
	
	 hapusLayar('#fffff');


	gambarFull(dataGambar.cover);
	if (!game.musikAktif1) {
		game.musikAktif1 = true;
		game.musik1 = new Sound(dataSuara.cover);
		game.musik1.loop();
		game.musik1.volume(500 / 100);
	}
	game.musik1.play();
	
	
	var playBtn = tombol(dataGambar.playBtn, 600, 460);
	if (tekan(playBtn)) {			
		game.musik1.stop();
		game.musikAktif1 = false;

		setTimeout(musikutama,10)
		setAwal();
		jalankan(gameLoop);
	
	}	
	resizeBtn(1150,50);
}



function musikutama() {
	if (!game.musikAktif2) {
		game.musikAktif2 = true;
	
		game.musik2 = new Sound(dataSuara['musiklevel' + game.level]);
		game.musik2.loop();
		game.musik2.volume(500 / 100);
	}

	game.musik2.play();
}

function setAwal(){
	game.hero = setSprite(dataGambar.idle, 32, 32);
	
	game.skalaSprite = 2;
	game.hero.animDiam = dataGambar.idle;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJalan = dataGambar.run;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	setPlatform(this["map_" + game.level], dataGambar.tileset, 32, game.hero);
	game.gameOver = ulangiPermainan;
	setPlatformItem(1, dataGambar.item1);
	setPlatformItem(2, dataGambar.item2);
	setPlatformItem(5, dataGambar.item5);
	var musuh1 = {};
	musuh1.animDiam = dataGambar.musuh1Idle;
	musuh1.animJalan = dataGambar.musuh1Run;
	musuh1.animMati = dataGambar.musuh1Hit;
	var musuh2 = {};
	musuh2.animDiam = dataGambar.musuh2Idle;
	musuh2.animJalan = dataGambar.musuh2Run;
	musuh2.animMati = dataGambar.musuh2Hit;
	var musuhraja = {};
	musuhraja.animDiam = dataGambar.musuhraja;
	musuhraja.animJalan = dataGambar.musuhrajarun;
	musuhraja.animMati = dataGambar.musuhrajahit;
	setPlatformEnemy(1, musuh1);
	setPlatformEnemy2(2, musuh2);
	setPlatformEnemyraja(5, musuhraja);
	setPlatformTrigger(1, dataGambar.bendera);
	setPlatformTrigger(2, dataGambar.bendera);

	
}

function ulangiPermainan(){
	game.aktif= true;
	game.score = 0;
	game.nyawaraja = 0;
	
	setAwal();
	jalankan(gameLoop);	

	setTimeout(playulang,1000)
}

function playm(){
	game.musik2.play();
}

function playulang() {

	if (!game.musikAktif2) {
	
		game.musikAktif2 = true;
		game.musik2 = new Sound(dataSuara['musiklevel' + game.level]);
		game.musik2.loop();
		game.musik2.volume(500 / 100);
	}

	game.musik2.play();
	game.musikraja.stop();
	latar(dataGambar.cooming)
}



function gameLoop(){
	
	if(game.kanan){
		gerakLevel(game.hero, 3, 0);
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
	}else if (game.spasi) {
		gerakLevel(game.hero, 0, -10);

	} else if (game.esc) {
		resizeBtn(1150,50);
	}

	latar(dataGambar.latar1)	
	buatLevel();
	cekItem();
	teks(game.score, 40, 60);
	
	game.score.style
	
	
	for (var i = 0; i < game.nyawaraja; i++) {
	  var xNyawa = 1000 + i * 50; // Koordinat X teks game.nyawa
	  var yNyawa = 60; // Koordinat Y teks game.nyawa
  
	  teks(game.nyawa, xNyawa, yNyawa);
	}
	
}


function menang(){
	swal.fire({
		title:'SCORE : ' + game.score,
		timer: 3000,
		buttons: false,
		target: '#gameArea	',
		showCancelButton: false,
showConfirmButton: false, 
		customClass: {                      
	  container: 'position-absolute'
	},
	  });
}

function myfunction(){
	location.reload()
}


function lud(){
	jalankanload(refres)
	setTimeout(relud,10000)
}

function relud(){
	location.reload()
}
function menang2(){
	swal.fire({
		title:'SCORE : ' + game.score,
		timer: 3000,
		buttons: false,
		target: '#gameArea	',
		showCancelButton: false,
		showConfirmButton: false, 
		className:'modals'
	  
	  })
	  setTimeout(lud,5000)}


function hapusls(){
	hapusLayar('#fffff');
	comings()
}

function comings(){
	latar(dataGambar.cooming)
}

function cekItem(){
	if (game.itemID > 0 && game.itemID != 5){
		mainkanSuara(dataSuara.coin)
		tambahScore(10);
		game.itemID = 0;

	}

	if (game.itemID == 5) {
		
		game.musik2.stop();
		game.aktif = false;
		game.nyawaraja = 3 
		setTimeout(() => {
			if (!game.musikAktifraja) {
			
					game.musikAktifraja = true;
					game.musikraja = new Sound(dataSuara.musikraja);
					game.musikraja.loop();
					game.musikraja.volume(500 / 100);
				}
			
				game.musikraja.play();
		}, 100);
		const targetCameraX = -650;
		const easing = 0.09;
		const deltaX = targetCameraX - game.cameraX;
		game.cameraX += deltaX * easing;
		if (Math.abs(deltaX) < 0.5) {
			game.cameraX = targetCameraX;
			
			setTimeout(() => {
				game.cameraX = -250
				game.aktif = true
				game.itemID = 0
				
			}, 2000);
			
		}
		
		
	}

	if (game.musuhID != 0){
		tambahScore(25);
	
		game.musuhID = 0;
	}
	if (game.triggerID == 1){
		
		game.triggerID = 0;
		game.aktif = false;
		game.level++;
		game.musikAktif2 = false;

		setTimeout(() => {
			game.musik2.stop();
			game.musikraja.stop();
		}, 100);
		setTimeout(menang,2000)
		mainkanSuara(dataSuara.win)
		setTimeout(ulangiPermainan, 5000)
	}

	if(game.triggerID == 2){
		game.triggerID = 0;
		game.aktif = false;
		game.musik2.stop();
		mainkanSuara(dataSuara.win)
		setTimeout(menang2,2000)
	}

}

function refres(){
	hapusLayar('#fffff');
	gambarFull(dataGambar.cooming);
	game.musik1.play();
}
	


