$(function(){



	//arrays
	var poubelleRecycArr = ['boite-de-conserve', 'bouteille-plastique', 'carton', 'cookies', 'journal' , 'Shampoing', 'sirop'];
	var poubelleNormale = ['couche', 'peau-de-banane'];
	var poubelleVerre = ['bouteille-vin', 'pot-de-confiture'];
	var allObjects = ['boite-de-conserve', 'bouteille-plastique', 'carton', 'cookies', 'journal' , 'Shampoing', 'sirop','couche', 'peau-de-banane','bouteille-vin', 'pot-de-confiture'];
	//audio
	var audioPick = new Audio('images/audio/pick_up_glass_bowl.mp3');
	var audioWronAnswer = new Audio('images/audio/udu.mp3');
	var audioTrash = new Audio('images/audio/trash_can_impact.mp3');
	var audiorightAnswer = new Audio('images/audio/twinkling_idea_accent_with_up_scale1.mp3');
	var audioTerminer = new Audio('images/audio/twinkling_idea_accent_with_up_scale.mp3');
	//audioPick.play();

	var compteur = 0;

	(function(){
		initGame();
	})();


	function initGame(){
		callDraggable();
		callDroppable();
	};

	function callDraggable(){

		//draggable elements
		/*
		$( "#draggable" ).draggable({
			revert:true
		});
		*/
		$( ".bouteille-vin" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".peau-de-banane" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".boite-de-conserve" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".bouteille-plastique" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".carton" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".cookies" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".couche" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".journal" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".pot-de-confiture" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".Shampoing" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});
		$( ".sirop" ).draggable({
			zIndex: 2500,
			cursor: "move",
			start : ehDragStart,
			stop  : ehDragStop,
			helper: "clone"
		});

	}

	
	function callDroppable(){

		//droppable elements
		$( ".poubelleRecyclables" ).droppable({
			//accept: '.boite-de-conserve, .bouteille-plastique, .carton, .cookies, .journal , .Shampoing, .sirop',
			drop: ehDropRecyclables,
			hoverClass: "hoverDropRecycle"
		});
		$( ".poubelleNormal" ).droppable({
			//accept : '.couche, .peau-de-banane'
			drop: ehDropNormale,
			hoverClass: "hoverDropNormal"
		});
		$( ".poubelleVerre" ).droppable({
			//accept : '.bouteille-vin, .pot-de-confiture '
			drop: ehDropVerre,
			hoverClass: "hoverDropVerre"
		});

	}

	
	//event handler for droppable pobele recycles
	function ehDropRecyclables(event, ui){
		var draggableElement = ui.draggable;
		
		/*
		*generique
		*/
		var nameClass = draggableElement.attr('class').split(' ')[0];
		if (poubelleRecycArr.indexOf(nameClass) >= 0) {
			draggableElement.css({"background-image":"url(images/imgss/"+nameClass+"_raviver.png)"});
			$("."+nameClass+"").css({"background-image":"url(images/imgss/"+nameClass+"_nb.png)"});
			draggableElement.draggable("disable", 1);//disable draggable for dropped element
			//$("."+nameClass+"").parent().parent().find('.obj').css( {"background-image":"url(images/imgss/tick_success.png)"} );

			//ouvrir modal de notification
			$(".dialogNotif").addClass('dialogText');
			$(".dialogNotif").html("<center><img src='images/dialog_success.png'><br> <strong> Bien Joué ! </strong></center>");
			$(draggableElement).draggable({ revert: false });
			audiorightAnswer.play();

			
			$(".poubelleRecyclables").addClass('scaleUp');

			
			 $( "#dialog" ).dialog({
			 	open : function(eve, ui) {
				    window.setTimeout(function(item) {
				      $('#dialog').dialog('close');
				      }, 
				    2500);
				},
			 	dialogClass: 'noTitleStuff',
			 	show: {effect: 'puff', duration: 350},
			 	position: { my: "top", at: "top", of: window }
			 });
			 compteur++;
			 checkCompteur();

		}else{
			//console.log("'This element cannot be dropped here !'");
			$(draggableElement).draggable({ revert: true });
			//$("."+nameClass+"").parent().parent().find('.obj').css( {"background-image":"url(images/imgss/cross.png)"} );
			$(".dialogNotif").addClass('dialogText');
			$(".dialogNotif").html("<center><img src='images/dialog_failure.png'> <br> <strong> essaye encore !  </strong>  </center>")
			audioWronAnswer.play();
			 $( "#dialog" ).dialog({
			 	open : function(eve, ui) {
				    window.setTimeout(function(item) {
				      $('#dialog').dialog('close');
				      }, 
				    2500);
				},
				dialogClass: 'noTitleStuff',
			 	show: {effect: 'bounce'},
			 	position: { my: "top", at: "top", of: window }
			 });

		}

		/*
		*end generique
		*/

	}//ehDropRecyclables

	//event handler for droppable pobele normale
	function ehDropNormale(event, ui){
		var draggableElement = ui.draggable;
		//var droppableElement = ui.droppable;

		//$('.poubelleRecyclables')

		/*
		*generique
		*/
		

		var nameClass = draggableElement.attr('class').split(' ')[0];
		if (poubelleNormale.indexOf(nameClass) >= 0) {
			draggableElement.css({"background-image":"url(images/imgss/"+nameClass+"_raviver.png)"});
			$("."+nameClass+"").css({"background-image":"url(images/imgss/"+nameClass+"_nb.png)"});
			draggableElement.draggable("disable", 1);//disable draggable for dropped element
			//$("."+nameClass+"").parent().parent().find('.obj').css( {"background-image":"url(images/imgss/tick_success.png)"} );

			//ouvrir modal de notification
			$(".dialogNotif").addClass('dialogText');
			$(".dialogNotif").html("<center><img src='images/dialog_success.png'> <br> <strong> Bien Joué ! </strong> </center>");
			$(draggableElement).draggable({ revert: false });
			audiorightAnswer.play();

			$(".poubelleNormal").addClass('scaleUp');

			 $( "#dialog" ).dialog({
			 	open : function(eve, ui) {
				    window.setTimeout(function(item) {
				      $('#dialog').dialog('close');
				      }, 
				    2500);
				},
			 	dialogClass: 'noTitleStuff',
			 	show: {effect: 'puff'},
			 	position: { my: "top", at: "top", of: window }
			 });
			 compteur++;
			 checkCompteur();

		}else{
			//console.log("'This element cannot be dropped here !'");
			$(draggableElement).draggable({ revert: true });
			//$("."+nameClass+"").parent().parent().find('.obj').css( {"background-image":"url(images/imgss/cross.png)"} );
			$(".dialogNotif").addClass('dialogText');
			$(".dialogNotif").html("<center><img src='images/dialog_failure.png'><br> <strong> essaye encore !  </strong>  </center>");
			audioWronAnswer.play();
			 $( "#dialog" ).dialog({
			 	open : function(eve, ui) {
				    window.setTimeout(function(item) {
				      $('#dialog').dialog('close');
				      }, 
				    2500);
				},
			 	dialogClass: 'noTitleStuff',
			 	show: {effect: 'bounce'},
			 	position: { my: "top", at: "top", of: window }
			 });

		}

		/*
		*end generique
		*/
	}


	function ehDropVerre(event, ui){
		var draggableElement = ui.draggable;

		/*
		*generique
		*/
		var nameClass = draggableElement.attr('class').split(' ')[0];
		if (poubelleVerre.indexOf(nameClass) >= 0) {
			draggableElement.css({"background-image":"url(images/imgss/"+nameClass+"_raviver.png)"});
			$("."+nameClass+"").css({"background-image":"url(images/imgss/"+nameClass+"_nb.png)"});
			draggableElement.draggable("disable", 1);//disable draggable for dropped element
			//$("."+nameClass+"").parent().parent().find('.obj').css( {"background-image":"url(images/imgss/tick_success.png)"} );

			//ouvrir modal de notification
			$(".dialogNotif").addClass('dialogText');
			$(".dialogNotif").html("<center><img src='images/dialog_success.png'><br> <strong> Bien Joué ! </strong>  </center>");
			$(draggableElement).draggable({ revert: false });
			audiorightAnswer.play();

			$(".poubelleVerre").addClass('scaleUp');
			
			 $( "#dialog" ).dialog({
			 	open : function(eve, ui) {
				    window.setTimeout(function(item) {
				      $('#dialog').dialog('close');
				      }, 
				    2500);
				},
			 	dialogClass: 'noTitleStuff',
			 	show: {effect: 'puff'},
			 	position: { my: "top", at: "top", of: window }
			 });
			 compteur++;
			 checkCompteur();

		}else{
			//console.log("'This element cannot be dropped here !'");
			$(draggableElement).draggable({ revert: true });
			//$("."+nameClass+"").parent().parent().find('.obj').css( {"backround-image":"url(images/imgss/cross.png)"} );
			$(".dialogNotif").addClass('dialogText');
			$(".dialogNotif").html("<center><img src='images/dialog_failure.png'><br> <strong> essaye encore !  </strong>  </center>");
			audioWronAnswer.play();
			 $( "#dialog" ).dialog({
			 	open : function(eve, ui) {
				    window.setTimeout(function(item) {
				      $('#dialog').dialog('close');
				      }, 
				    2500);
				},
			 	dialogClass: 'noTitleStuff',
			 	show: {effect: 'bounce'},
			 	position: { my: "top", at: "top", of: window }
			 });

		}

		/*
		*end generique
		*/
	}

	//eventHandler for start
	function ehDragStart(event, ui){

		audioWronAnswer.pause()
		audioWronAnswer.currentTime = 0;
		audiorightAnswer.pause()
		audiorightAnswer.currentTime = 0;

		var draggableElement = ui.helper;

		$(".poubelleRecyclables, .poubelleNormal, .poubelleVerre").removeClass("scaleUp");

		var nameClass = draggableElement.attr('class').split(' ')[0];
		if (allObjects.indexOf(nameClass) >= 0) {

			audioPick.play();

			if ( ui.helper.hasClass( nameClass ) ) {
				ui.helper.css({"background-image":"url(images/imgss/"+nameClass+"_raviver.png)"});
			}

		}
		
	}

	//eventHandler for stop
	function ehDragStop(event, ui){

		var draggableElement = ui.helper;

		var nameClass = draggableElement.attr('class').split(' ')[0];
		if (allObjects.indexOf(nameClass) >= 0) {

			if ( ui.helper.hasClass( nameClass ) ) {
				ui.helper.css({"background-image":"url(images/imgss/"+nameClass+"_raviver.png)"});
			}


		}

	}

	//check compteur
	function checkCompteur(){
		if (compteur == 11) {	
				
				audioTerminer.play();
				window.setTimeout(function(item) {
					$(".dialogNotif").addClass('dialogTextOrange');
					$(".dialogNotifTerminer").html("<center> bravo, <br> tu es expert du tri !<img src='images/gameover.png'>  <br> <a href='index.html' class='btn btn-default'>Re-Jouer</a> </center>");
					   $( "#dialogTerminer" ).dialog({
						 	dialogClass: 'noTitleStuff',
						 	show: {effect: 'explode'},
						 	position: { my: "center", at: "center", of: window }
						 });   
				}, 2500);

				 
			}
	}





});