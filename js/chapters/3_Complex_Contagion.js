// 3 - Complex Contagion

SLIDES.push(

{
	chapter: "Complex",
	clear:true,

	add:[

		// Intro text
		{
			type:"box",
			id:"_3_complex",
			text:"_3_complex",
			x:0, y:0, w:480, h:540
		},

		// Sim
		{
			type:"sim",
			x:0, y:0,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":[[819,90,0],[911,182,0],[905,310,0],[821,413,0],[688,252,0],[551,251,1]],
				"connections":[[4,3,0],[2,4,0],[4,1,0],[4,0,0]]
			},
			options:{
				infectedFrame: 3,
				scale: 1.75
			}
		},

		// UI for the simulation
		{
			type:"box",
			x:520, y:340,
			sim_ui:"red"
		}

	],

	onupdate:function(slideshow, state){

		// Show end if ALL infected
		if(!state.ended){
			var sim = slideshow.simulations.sims[0];
			var peepCount = 0;
			sim.peeps.forEach(function(peep){
				if(peep.infected) peepCount++;
			});
			if(peepCount==sim.peeps.length){
				state.ended = true;
				sim.win();
				slideshow.next();
			}
		}

	}

},

{
	remove:[
		{type:"box", id:"_3_complex"}
	],
	add:[
		{
			type:"box",
			text:"_3_complex_2",
			x:0, y:0, w:480, h:540
		}
	]
},

{
	chapter: "Complex-Cascade",
	clear:true,

	add:[

		// Intro text
		{
			type:"box",
			id:"_3_cascade",
			text:"_3_cascade",
			x:60, y:0, w:840, h:100,
			align: "center"
		},

		// Sim
		{
			type:"sim",
			id:"contagion",
			x:0, y:-40,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":CASCADE_PUZZLE.peeps,
				"connections":CASCADE_PUZZLE.connections
			},
			options:{
				infectedFrame: 3,
				scale: 1.25,
				startUncuttable: true
			}
		},

		// UI for the simulation
		{
			type:"box",
			id:"ui",
			x:380, y:370,
			sim_ui:"red"
		},

		// End text
		{
			id:"end",
			type:"box",
			text:"_3_cascade_end",
			x:330, y:460, w:300, h:100,
			hidden:true
		},

	],

	onupdate:function(slideshow, state){

		// Show end if EVERYONE is infected
		if(!state.ended){
			var sim = slideshow.simulations.sims[0];
			var peepCount = 0;
			sim.peeps.forEach(function(peep){
				if(peep.infected) peepCount++;
			});
			if(peepCount==sim.peeps.length){
				var boxes = slideshow.boxes;
				boxes.showChildByID("end", true);
				state.ended = true;
				sim.win();
			}
		}

	}

},

{
	remove:[
		{type:"box", id:"_3_cascade"},
		{type:"box", id:"end"}
	],
	move:[
		{type:"box", id:"ui", y:360-80},
		{type:"sim", id:"contagion", y:-140}
	],
	add:[
		{
			type:"box",
			text:"_3_post_cascade",
			x:0, y:390, w:650, h:150,
			align: "right"
		},
		{
			type:"box",
			text:"_3_post_cascade_end",
			x:660, y:450, w:300, h:90
		}
	]
},

{
	chapter: "Complex-Prevent",
	clear:true,

	add:[

		// Intro text
		{
			type:"box",
			id:"_3_prevent",
			text:"_3_prevent",
			x:80, y:0, w:800, h:140,
			align: "center"
		},

		// Lil' contagion
		{
			id: "contagion",
			type:"sim",
			x:0, y:80,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":CONTAGION_PUZZLE.peeps,
				"connections":CONTAGION_PUZZLE.connections
			},
			options:{
				infectedFrame: 3,
				scale: 1.25,
				startUncuttable: true
			}
		},

		// UI for the simulation
		{
			type:"box",
			id:"ui",
			x:380, y:140,
			sim_ui:"red"
		},

		// Outro text
		/*{
			id:"end",
			type:"box",
			text:"_3_prevent_end",
			x:660, y:440, w:300, h:100,
			hidden:true
		}*/

	],

	onupdate:function(slideshow, state){

		// Show end if sim is running AND no one left to infect
		// that is, it's stalled... YAY!
		var sim = slideshow.simulations.sims[0];

		if(!state.ended){
			if(Simulations.IS_RUNNING){

				// if it's a new step... 
				if(sim.STEP > state.lastStep){

					// ...but the infected count is the same as last step
					var countInfected = 0;
					sim.peeps.forEach(function(peep){ if(peep.infected) countInfected++; });
					if(state.lastInfected == countInfected){

						// oh, and it's NOT coz ALL of 'em are infected
						if(countInfected!=sim.peeps.length){

							// WIN
							state.ended = true;
							var boxes = slideshow.boxes;
							setTimeout(function(){
								//boxes.showChildByID("end", true);
								sim.win();
							},500);
							setTimeout(function(){
								slideshow.next();
							},1250);

						}

					}else{
						state.lastInfected = countInfected;
					}

				}
				state.lastStep = sim.STEP;

			}else{
				state.lastStep = 0;
				state.lastInfected = 1;
			}

		}

	}

},

{
	remove:[
		{type:"box", id:"_3_prevent"}
	],
	move:[
		{type:"box", id:"ui", y:0},
		{type:"sim", id:"contagion", y:-70}
	],
	add:[
		{
			type:"box",
			text:"_3_prevent_2",
			x:0, y:390, w:650, h:100,
			align: "right"
		},
		{
			type:"box",
			text:"_3_prevent_end",
			x:660, y:450, w:300, h:90
		}
	]
},

{
	chapter: "Complex-Groupthink",
	clear: true,

	add:[

		// Sim
		{
			type:"sim",
			x:-15, y:0,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":[[409,457,1],[157,345,0],[62,221,0],[152,93,0],[301,94,0],[391,218,0],[306,347,0]],
				"connections":[[5,4,0],[4,3,0],[3,2,0],[2,1,0],[1,6,0],[6,5,0],[5,2,0],[2,4,0],[4,1,0],[1,3,0],[3,6,0],[6,2,0],[1,5,0],[5,3,0],[6,4,0],[0,6,0]]
			},
			options:{
				infectedFrame: 3,
				scale: 1.75
			}
		},

		// UI for the simulation
		{
			type:"box",
			id:"ui",
			x:120, y:410,
			sim_ui:"blue"
		},

		// Text
		{
			type:"box",
			text:"_3_groupthink",
			x:460, y:0, w:500, h:540,
			lineHeight:"1.4em"
		},


	]

}

);

