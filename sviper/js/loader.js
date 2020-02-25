WebFont.load({
    google: {
      families: ['Faster One','Luckiest Guy','Bree Serif']
    },
    active:e=>{
    	console.log("font loaded!");
    	// pre-load the images
        PIXI.loader.
        add(["/spaceship.png","/explosions.png","/cloud1.png","/cloud2.png","/enemy.png"]).
        on("progress",e=>{console.log(`progress=${e.progress}`)}).
        load(setup);
    }
  });