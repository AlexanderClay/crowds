/******************************

Boxes of HTML. With words and pictures!

******************************/

function Boxes(){

	var self = this;
	self.dom = $("#slideshow");

	self.boxes = [];

	// Clear
	self.clear = function(){
		self.boxes.forEach(function(box){
			self.dom.removeChild(box);
		});
		self.boxes = [];
	};

	// Add Box
	self.add = function(config, withFade){

		// Add to DOM
		var box = document.createElement("div");
		box.className = "box";
		if(!withFade){
			self.dom.appendChild(box);
		}else{
			fadeIn(self.dom, box);
		}

		// Standard box properties...
		if(config.id) box.id = config.id;
		if(config.x) box.style.left = config.x;
		if(config.y) box.style.top = config.y;
		if(config.w) box.style.width = config.w;
		if(config.h) box.style.height = config.h;
		if(config.hidden) box.style.display = "none";

		// background
		if(config.background){
			box.style.left = "-1000px";
			box.style.top = "-1000px";
			box.style.width = 10000;
			box.style.height = 10000;
			box.style.background = config.background;
		}

		// words:
		if(config.text){
			box.innerHTML = getWords(config.text);
			if(config.align) box.style.textAlign = config.align;
			if(config.color) box.style.color = config.color;
			if(config.fontSize) box.style.fontSize = config.fontSize;
			if(config.lineHeight) box.style.lineHeight = config.lineHeight;
		}

		// pics:
		if(config.img){
			box.classList.add("image");
			box.style.backgroundImage = "url("+config.img+")"
		}

		// Sim UI
		if(config.sim_ui){
			var simUI = new SimUI(box, config.sim_ui);
		}

		// Sandbox UI
		if(config.sandbox){
			var sandboxUI = new SandboxUI(box);
		}

		// Replace "next" buttons!
		var next;
		if(next = box.querySelector("next")){
			
			// Create next button
			var nextButton = document.createElement("div");
			nextButton.className = "next_button";
			nextButton.innerHTML = next.innerHTML;
			nextButton.onclick = function(){
				slideshow.next();
			};

			// Replace it in parent!
			next.parentNode.replaceChild(nextButton, next);

		}

		// Replace bonus boxes...
		// TODO

		// Add to array
		self.boxes.push(box);

	};

	// Update & Draw... nothing
	self.update = function(){};
	self.draw = function(){};

	///////////////////////
	// HELPERS AND STUFF //
	///////////////////////

	self.getChildByID = function(id){
		return self.boxes.find(function(box){
			return box.id==id;
		});
	};
	self.showChildByID = function(id, withFade){
		var toShow = self.getChildByID(id);
		if(!withFade){
			toShow.style.display = "block";
		}else{
			fadeIn(self.dom, toShow);
		}
	};
	self.hideChildByID = function(id){
		var toHide = self.getChildByID(id);
		toHide.style.display = "none";
	};
	self.removeChildByID = function(id, withFade){
		
		var removeBox = self.getChildByID(id);
		if(!withFade){
			self.dom.removeChild(removeBox);
		}else{
			fadeOut(self.dom, removeBox);
		}
		removeFromArray(self.boxes, removeBox);

	};

}